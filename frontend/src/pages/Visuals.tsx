import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import Sidebar from "@/components/Sidebar";

const COLORS = ['#FF4F6E', '#FF8FA3', '#FFB4C0', '#FFD9E0', '#FFE4E6', '#FFE9EB'];

interface ChartData {
  type: string;
  data: {
    labels?: string[];
    x: number[];
    y?: number[];
  };
  title: string;
}

interface AnalysisResponse {
  summary: string;
  dataset: Record<string, unknown>;
  visuals: ChartData[];
}

const Visuals = () => {
  const { data: analysisData, isLoading } = useQuery({
    queryKey: ['analysis', localStorage.getItem('lastQuestion')],
    queryFn: async () => {
      const lastQuestion = localStorage.getItem('lastQuestion');
      if (!lastQuestion) return null;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: lastQuestion }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch analysis data');
      }
      return response.json() as Promise<AnalysisResponse>;
    },
    enabled: Boolean(localStorage.getItem('lastQuestion')),
    gcTime: 0,
    staleTime: 0,
  });

  const renderChart = (visual: ChartData, index: number) => {
    switch (visual.type) {
      case 'pie': {
        const pieData = visual.data.labels?.map((label, i) => ({
          name: label,
          value: visual.data.x[i]
        })) || [];

        return (
          <div key={index} className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{visual.title}</h2>
            <div className="flex justify-center">
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={150}
                  labelLine={false}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        );
      }
      case 'bar': {
        const barData = visual.data.x.map((x, i) => ({
          name: `Value ${i + 1}`,
          value: visual.data.y?.[i] || 0
        }));

        return (
          <div key={index} className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{visual.title}</h2>
            <div className="flex justify-center">
              <BarChart width={400} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        );
      }
      case 'line': {
        const lineData = visual.data.x.map((x, i) => ({
          name: `Point ${i + 1}`,
          value: visual.data.y?.[i] || 0
        }));

        return (
          <div key={index} className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{visual.title}</h2>
            <div className="flex justify-center">
              <LineChart width={400} height={300} data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Data Visualizations</h1>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : analysisData?.visuals ? (
            <div>
              {analysisData.visuals.map((visual, index) => renderChart(visual, index))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No visualizations available. Please run an analysis first.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Visuals;