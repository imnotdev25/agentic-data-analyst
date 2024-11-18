import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface VisualizationType {
  type: string;
  data: {
    labels?: string[];
    x: (number | string)[];
    y?: (number | string)[];
  };
  title: string;
}

interface VisualizationsProps {
  visuals: VisualizationType[];
}

const renderChart = (visual: VisualizationType) => {
  switch (visual.type) {
    case 'bar': {
      const data = visual.data.x.map((x, index) => ({
        name: String(x),
        value: Number(visual.data.y?.[index]) || 0
      }));

      return (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      );
    }
    case 'line': {
      const data = visual.data.x.map((x, index) => ({
        name: String(x),
        value: Number(visual.data.y?.[index]) || 0
      }));

      return (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      );
    }
    case 'pie': {
      const data = visual.data.x.map((value, index) => ({
        name: visual.data.labels?.[index] || String(value),
        value: Number(value)
      }));

      return (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx={200}
            cy={150}
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    }
    default:
      return null;
  }
};

export const AnalysisVisualizations = ({ visuals }: VisualizationsProps) => {
  if (!visuals?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Visualizations</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {visuals.map((visual, index) => (
          <div key={index} className="overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">{visual.title}</h3>
            {renderChart(visual)}
          </div>
        ))}
      </div>
    </div>
  );
};