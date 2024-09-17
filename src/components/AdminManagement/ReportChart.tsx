import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportChart = ({ data, label, color }) => {
  const chartData = [{ name: label, value: data }];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={color} label={{ position: 'top' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReportChart;