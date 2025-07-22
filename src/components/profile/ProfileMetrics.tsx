
import React from 'react';

interface ProfileMetricsProps {
  metrics: Array<{ label: string; value: string | number; change?: string }>;
}

export const ProfileMetrics: React.FC<ProfileMetricsProps> = ({ metrics }) => {
  return (
    <div className="w-full mt-5 grid grid-cols-3 gap-2">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-xs text-green-600">{metric.label}</p>
          <p className="text-lg font-semibold text-green-800">{metric.value}</p>
          {metric.change && (
            <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-amber-600'}`}>
              {metric.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
