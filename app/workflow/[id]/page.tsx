import { createClient } from '@supabase/supabase-js';
import { WorkflowView } from '@/components/WorkflowView';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

export default async function WorkflowPage({
  params
}: {
  params: { id: string }
}) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Fetch workflow data
  const { data: workflow } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <WorkflowView workflow={workflow} />;
} 