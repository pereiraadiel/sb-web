import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { colors } from '@/core/styles/colors';

const COLORS = [colors.green.tertiary, colors.red.tertiary];

interface DataItem {
  name: string;
  value: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
  }[];
}

interface PieChartMoleculeProps {
  data: DataItem[];
}

const PieChartMolecule: React.FC<PieChartMoleculeProps> = ({ data }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
    const getPercentage = (value: number) => {
      return `${((value / total) * 100).toFixed(1)}%`;
    }
  
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-tertiary p-2 z-100">
          {payload.map((item) => (
            <p key={item.name} className="label">{`${item.name}: ${getPercentage(item.value)}`}</p>
          ))}
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className='relative w-60 h-80 z-0'>
      <PieChart width={240} height={320} className='z-100'>
        <Pie
          data={data}
          cx={120}
          cy={120}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          label={true}
          labelLine={false}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip/>} />
        <Legend />
      </PieChart>
			{/* texto abaixo será centralizado no meio do gráfico */}
			<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-10 -mt-9 ml-1 text-center'>
				<div className='text-2xl font-bold'>{total}</div>
				<div className='text-sm'>Total</div>
			</div>
    </div>
  );
};

export default PieChartMolecule;