import React from 'react';
import { BarChart, Bar, Cell, Tooltip, Legend } from 'recharts';
import { colors } from '@/core/styles/colors';

const COLORS = [colors.green.tertiary, colors.red.tertiary];

interface DataItem {
  name: string;
  value: number;
}

interface BarChartMoleculeProps {
  data: DataItem[];
}

const BarChartMolecule: React.FC<BarChartMoleculeProps> = ({ data }) => {
  return (
    <div className='relative w-[480px] h-80'>
      <BarChart width={480} height={300}>
        <Bar
          data={data}
          cx={120}
          cy={120}
          fill="#8884d8"
					color='#8884d8'
          label={'teste'}
					activeBar
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
        <Tooltip />
        <Legend />
      </BarChart>
    </div>
  );
};

export default BarChartMolecule;