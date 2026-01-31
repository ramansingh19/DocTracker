import React, { useEffect, useState } from 'react';

const DataVisualization = ({ type = 'dashboard', userRole = 'admin' }) => {
  const [data, setData] = useState({});
  const [timeRange, setTimeRange] = useState('24h');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);

    setTimeout(() => {
      const mockData = generateMockData();
      setData(mockData);
      setIsLoading(false);
    }, 1000);
  }, [type, userRole, timeRange]);

  const generateMockData = () => {
    const baseData = {
      patientFlow: {
        labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
        datasets: [
          {
            label: 'Patients',
            data: [12, 45, 78, 65, 42, 18],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }
        ]
      },
      doctorEfficiency: {
        labels: ['Dr. Smith', 'Dr. Johnson', 'Dr. Brown', 'Dr. Davis', 'Dr. Wilson'],
        datasets: [
          {
            label: 'Patients/Hour',
            data: [4.2, 3.8, 4.5, 3.2, 4.1],
            backgroundColor: [
              '#10b981',
              '#3b82f6',
              '#f59e0b',
              '#ef4444',
              '#8b5cf6'
            ]
          }
        ]
      },
      waitTimes: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Avg Wait Time (min)',
            data: [15, 18, 12, 22, 16, 8, 5],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4
          }
        ]
      },
      satisfaction: {
        labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
        datasets: [
          {
            label: 'Patient Satisfaction',
            data: [45, 35, 12, 5, 3],
            backgroundColor: [
              '#10b981',
              '#34d399',
              '#fbbf24',
              '#f87171',
              '#ef4444'
            ]
          }
        ]
      }
    };

    return baseData;
  };

  const renderChart = (chartType, chartData) => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[200px] text-slate-500">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
          <p className="m-0">Loading chart data...</p>
        </div>
      );
    }

    switch (chartType) {
      case 'line':
        return <LineChart data={chartData} />;
      case 'bar':
        return <BarChart data={chartData} />;
      case 'doughnut':
        return <DoughnutChart data={chartData} />;
      default:
        return <LineChart data={chartData} />;
    }
  };

  const LineChart = ({ data }) => (
    <div>
      <div className="w-full h-[200px] flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={data.datasets[0].backgroundColor} />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y, i) => (
            <line
              key={i}
              x1="40"
              y1={40 + (y / 100) * 120}
              x2="360"
              y2={40 + (y / 100) * 120}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Area under curve */}
          <path
            d={`M 40 ${160 - (data.datasets[0].data[0] / 100) * 120} ${data.datasets[0].data.map((value, i) => 
              `L ${60 + i * 50} ${160 - (value / 100) * 120}`
            ).join(' ')} L 360 160 L 40 160 Z`}
            fill="url(#lineGradient)"
          />
          
          {/* Line */}
          <path
            d={`M 40 ${160 - (data.datasets[0].data[0] / 100) * 120} ${data.datasets[0].data.map((value, i) => 
              `L ${60 + i * 50} ${160 - (value / 100) * 120}`
            ).join(' ')}`}
            stroke={data.datasets[0].borderColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.datasets[0].data.map((value, i) => (
            <circle
              key={i}
              cx={60 + i * 50}
              cy={160 - (value / 100) * 120}
              r="4"
              fill={data.datasets[0].borderColor}
              stroke="white"
              strokeWidth="2"
            />
          ))}
          
          {/* Labels */}
          {data.labels.map((label, i) => (
            <text
              key={i}
              x={60 + i * 50}
              y="190"
              textAnchor="middle"
              className="fill-slate-500 text-xs"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );

  const BarChart = ({ data }) => (
    <div className="bar-chart">
      <div className="w-full h-[200px] flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {data.datasets[0].data.map((value, i) => (
            <g key={i}>
              <rect
                x={50 + i * 60}
                y={160 - (value / 5) * 120}
                width="40"
                height={(value / 5) * 120}
                fill={data.datasets[0].backgroundColor[i]}
                rx="4"
              />
              <text
                x={70 + i * 60}
                y={150 - (value / 5) * 120}
                textAnchor="middle"
                className="fill-gray-700 text-xs font-medium"
              >
                {value}
              </text>
              <text
                x={70 + i * 60}
                y="190"
                textAnchor="middle"
                className="fill-slate-500 text-xs"
              >
                {data.labels[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );

  const DoughnutChart = ({ data }) => (
    <div>
      <div className="w-full h-[200px] flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
          />
          {data.datasets[0].data.map((value, i) => {
            const percentage = value / 100;
            const startAngle = i === 0 ? 0 : data.datasets[0].data.slice(0, i).reduce((a, b) => a + b, 0) / 100 * 360;
            const endAngle = startAngle + percentage * 360;
            
            return (
              <path
                key={i}
                d={`M 100 100 L ${100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180)} ${100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180)} A 80 80 0 ${percentage > 0.5 ? 1 : 0} 1 ${100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180)} ${100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180)} Z`}
                fill={data.datasets[0].backgroundColor[i]}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          <text
            x="100"
            y="100"
            textAnchor="middle"
            className="fill-gray-700 text-sm font-semibold"
          >
            {data.datasets[0].data.reduce((a, b) => a + b, 0)}%
          </text>
        </svg>
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {data.labels.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded flex-shrink-0" 
              style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}
            ></div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const getChartConfig = () => {
    switch (type) {
      case 'patientFlow':
        return { chartType: 'line', data: data.patientFlow, title: 'Patient Flow', subtitle: 'Patients per hour' };
      case 'doctorEfficiency':
        return { chartType: 'bar', data: data.doctorEfficiency, title: 'Doctor Efficiency', subtitle: 'Patients per hour' };
      case 'waitTimes':
        return { chartType: 'line', data: data.waitTimes, title: 'Average Wait Times', subtitle: 'Minutes' };
      case 'satisfaction':
        return { chartType: 'doughnut', data: data.satisfaction, title: 'Patient Satisfaction', subtitle: 'Survey results' };
      default:
        return { chartType: 'line', data: data.patientFlow, title: 'Analytics', subtitle: 'Data overview' };
    }
  };

  const chartConfig = getChartConfig();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.08)] border border-black/5 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
      <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
        <div>
          <h3>{chartConfig.title}</h3>
          <p>{chartConfig.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 cursor-pointer transition-all duration-300 focus:outline-none focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        {renderChart(chartConfig.chartType, chartConfig.data)}
      </div>
      
      <div className="flex gap-6 flex-wrap">
        {chartConfig.data.datasets[0].data && (
          <div className="flex-1 min-w-[120px] p-4 bg-slate-50 rounded-xl">
            <span className="block text-xs text-slate-500 font-medium uppercase mb-1">Average</span>
            <span className="text-lg font-bold text-gray-900">
              {(chartConfig.data.datasets[0].data.reduce((a, b) => a + b, 0) / chartConfig.data.datasets[0].data.length).toFixed(1)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-[120px] p-4 bg-slate-50 rounded-xl">
          <span className="block text-xs text-slate-500 font-medium uppercase mb-1">Peak</span>
          <span className="text-lg font-bold text-gray-900">
            {Math.max(...chartConfig.data.datasets[0].data)}
          </span>
        </div>
        <div className="flex-1 min-w-[120px] p-4 bg-slate-50 rounded-xl">
          <span className="block text-xs text-slate-500 font-medium uppercase mb-1">Low</span>
          <span className="text-lg font-bold text-gray-900">
            {Math.min(...chartConfig.data.datasets[0].data)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
