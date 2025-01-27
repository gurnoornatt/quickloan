import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  required_docs: string[];
  is_completed: boolean;
}

interface Workflow {
  id: string;
  title: string;
  steps: WorkflowStep[];
  created_at: string;
  updated_at: string;
}

export function WorkflowView({ workflow }: { workflow: Workflow }) {
  const [steps, setSteps] = useState(workflow.steps);

  const handleStepComplete = async (stepId: string, isCompleted: boolean) => {
    try {
      const response = await fetch(`/api/workflow/${workflow.id}/step/${stepId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_completed: isCompleted }),
      });

      if (!response.ok) {
        throw new Error('Failed to update step');
      }

      setSteps(steps.map(step => 
        step.id === stepId ? { ...step, is_completed: isCompleted } : step
      ));
    } catch (error) {
      console.error('Error updating step:', error);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{workflow.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold">Step {index + 1}</span>
                  <h3 className="text-lg font-medium">{step.title}</h3>
                </div>
                <Checkbox
                  checked={step.is_completed}
                  onCheckedChange={(checked) => 
                    handleStepComplete(step.id, checked as boolean)
                  }
                />
              </div>
              <p className="mt-2 text-gray-600">{step.description}</p>
              {step.required_docs.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium">Required Documents:</h4>
                  <ul className="list-disc list-inside mt-2">
                    {step.required_docs.map((doc, i) => (
                      <li key={i} className="text-gray-600">{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 