import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";
import { AnalysisVisualizations } from "./analysis/AnalysisVisualizations";
import { AnalysisDataset } from "./analysis/AnalysisDataset";

interface AnalysisResponse {
  summary: string;
  dataset?: {
    labels: string[];
    values: any[];
  };
  visuals?: {
    type: string;
    data: {
      labels?: string[];
      x: (number | string)[];
      y?: (number | string)[];
    };
    title: string;
  }[];
}

const AnalysisInput = () => {
  const [question, setQuestion] = useState(() => {
    return localStorage.getItem('lastQuestion') || "";
  });
  const { toast } = useToast();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['analysis', question],
    queryFn: async () => {
      if (!question) return null;
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        });
        
        if (!response.ok) {
          throw new Error('Analysis request failed');
        }
        return response.json() as Promise<AnalysisResponse>;
      } catch (error) {
        console.error('Error fetching analysis:', error);
        throw error;
      }
    },
    enabled: false,
  });

  const handleAnalyze = async () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question to analyze",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('lastQuestion', question);

    try {
      await refetch();
      toast({
        title: "Analysis Complete",
        description: "Your results are ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze data",
        variant: "destructive",
      });
    }
  };

  const isValidVisuals = data?.visuals?.every(visual => 
    visual.type && 
    visual.data && 
    Array.isArray(visual.data.x) && 
    visual.data.x.length > 0 &&
    visual.title
  );

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-8">Multi-Agents Employee Salaries Analysis</h1>
      <div className="space-y-2">
        <label className="text-sm text-gray-600">What do you want to analyze?</label>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your analysis question here..."
          className="w-full p-3 bg-gray-50"
        />
      </div>
      <Button 
        onClick={handleAnalyze}
        className="bg-primary hover:bg-primary/90 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </Button>

      {data && (
        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
            <p className="text-gray-600">{data.summary}</p>
          </div>

          {data.dataset && (
            <AnalysisDataset 
              labels={data.dataset.labels} 
              values={data.dataset.values} 
            />
          )}

          {isValidVisuals && data.visuals && data.visuals.length > 0 && (
            <AnalysisVisualizations visuals={data.visuals} />
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisInput;