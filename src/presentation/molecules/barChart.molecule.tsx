import React, { useState } from 'react';
import { BarChart, Bar, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, Rectangle } from 'recharts';
import { colors } from '@/core/styles/colors';

const COLORS = [colors.green.tertiary, colors.red.tertiary];
const HOVER_COLOR = colors.dark.secondary;

interface DataItem {
  name: string;
  value: number;
}

interface BarChartMoleculeProps {
  data: DataItem[];
}

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: { name: string, value: number }[] }) => {
  if (active && payload && payload.length) {
    console.log('payload: ',payload)
    return (
      <div className="bg-dark-tertiary p-2">
        {payload.map((item) => (
          <p key={item.name} className="label">{`${item.name}: ${item.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
}

const BarChartMolecule: React.FC<BarChartMoleculeProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleMouseOver = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0);
  };

  return (
    <div className='relative w-[480px] h-80'>
      <ResponsiveContainer width={'100%'} height={'100%'} >
        <BarChart 
          width={480} 
          height={300} 
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}

        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip/>} />
          <Bar
            dataKey="value"
            onMouseOver={(_, index) => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            activeIndex={activeIndex}
            activeBar={<Rectangle fill={COLORS[activeIndex]} />}
          >
            {data.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === activeIndex ? HOVER_COLOR : COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartMolecule;