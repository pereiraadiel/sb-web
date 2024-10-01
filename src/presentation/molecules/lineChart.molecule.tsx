import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
  [key: string]: string | number;
}

interface LineChartMoleculeProps {
  data: DataItem[];
  dataValues: {
    value: string;
    color: string;
  }[];
}

interface TooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
  }[];
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-tertiary p-2">
        {payload.map((item) => {
          // se o valor for inteiro, não exibir casas decimais, e exibir 2 casas decimais caso contrário usando virgula, 
          const value = Number(item.value) % 1 === 0 ? item.value : Number(item.value).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ',');
          return (
            <p key={item.name} className="label">{`${item.name} : ${value}`}</p>
          )
        })}
      </div>
    );
  }

  return null;
};


const LineChartMolecule: React.FC<LineChartMoleculeProps> = ({ data, dataValues }) => {
  console.warn(dataValues)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        style={{margin: '0 auto'}}
        margin={{
          top: 5,
          right: 5,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip/>} />
        <Legend />
        {dataValues.map(({value, color}) => {
          return <Line key={value} type="monotone" dataKey={value} stroke={color} activeDot={{ r: 8 }} />
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartMolecule;