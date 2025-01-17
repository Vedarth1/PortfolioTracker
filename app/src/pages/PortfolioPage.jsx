import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PortfolioPage() {
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('Token');

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/portfolio/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPortfolioValue(data.totalValue);
          setDashboardData(data);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch portfolio data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [token]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;

  const distributionData = dashboardData
    ? Object.entries(dashboardData.distribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const profitAndLossData = dashboardData
    ? Object.entries(dashboardData.profitAndLoss).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

    const COLORS = [
      '#0088FE',
      '#00C49F', 
      '#FFBB28', 
      '#FF8042', 
      '#A569BD',
      '#5DADE2', 
      '#F1948A',
      '#52BE80', 
      '#AF7AC5',
      '#F5B041',
    ];

  return (
    <div className="portfolio-page p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Overview</h1>

      {/* Portfolio Value */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Portfolio Value</h2>
        <p className="text-lg">Total Portfolio Value: ${portfolioValue.toFixed(2)}</p>
      </div>

      {/* Dashboard */}
      <div className="dashboard mb-6">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <p>
          <strong>Top Stock:</strong> {dashboardData.topStock.name} (
          {dashboardData.topStock.ticker}) - Quantity: {dashboardData.topStock.quantity}, Buy Price: $
          {dashboardData.topStock.buyPrice.toFixed(2)}, Current Price: $
          {dashboardData.topStock.currentPrice.toFixed(2)}
        </p>
      </div>

      {/* Charts Section */}
      <div className="charts grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribution Chart */}
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-center">Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Profit and Loss Chart */}
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-center">Profit and Loss</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={profitAndLossData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
