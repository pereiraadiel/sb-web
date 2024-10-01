import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
	{
    name: '04/10',
    vendas: 124,
    "R$": 320,
    amt: 2210,
  },
  {
    name: '05/10',
    vendas: 150,
    "R$": 520,
    amt: 2400,
  },
  {
    name: '06/10',
    vendas: 135,
    "R$": 450,
    amt: 2210,
  },
  
];

export default class LineChartMolecule extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
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
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="vendas" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="R$" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
