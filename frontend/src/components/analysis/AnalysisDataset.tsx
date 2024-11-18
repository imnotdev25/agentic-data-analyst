interface DatasetProps {
  labels?: string[];
  values?: any[];
}

export const AnalysisDataset = ({ labels, values }: DatasetProps) => {
  if (!labels?.length || !values?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h2 className="text-2xl font-semibold mb-4">Dataset</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {labels.map((label, index) => (
                <th key={index} className="px-4 py-2 text-left">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2">{String(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};