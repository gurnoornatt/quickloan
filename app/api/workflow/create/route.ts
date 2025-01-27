import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create Python-compatible scenario type
    const scenarioType = data.loanType === 'crypto_backed' ? 'CRYPTO_BACKED' :
                        data.loanType === 'conventional' ? 'CONVENTIONAL' :
                        data.loanType.toUpperCase();

    // Make request to FastAPI backend
    const response = await fetch('http://localhost:8000/api/workflow/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scenario: scenarioType,
        user_inputs: {
          loan_type: data.loanType,
          property_type: data.propertyType,
          property_location: data.propertyLocation,
          financial_info: data.financialInfo,
          employment_type: data.employmentType,
          additional_details: data.additionalDetails,
        }
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create workflow');
    }

    const workflow = await response.json();
    return NextResponse.json(workflow);
  } catch (error) {
    console.error('Error creating workflow:', error);
    return NextResponse.json(
      { error: 'Failed to create workflow' },
      { status: 500 }
    );
  }
} 