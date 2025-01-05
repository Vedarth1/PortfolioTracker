import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [portfolioValue, setPortfolioValue] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setUpdateMode] = useState(false);
  const [currentStockId, setCurrentStockId] = useState(null);
  const [form, setForm] = useState({
    ticker: '',
    name: '',
    quantity: '',
    buyPrice: '',
    currentPrice: '',
  });

  const token = localStorage.getItem('Token');

  const fetchPortfolioValue = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/portfolio/value', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPortfolioValue(data.portfolioValue);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch portfolio value');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/portfolio/dashboard', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/stocks/portfolio', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStocks(data);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch stocks');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
    fetchPortfolioValue();
    fetchDashboardData();
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddOrUpdateStock = async () => {
    const url = isUpdateMode
      ? `http://localhost:8080/api/stocks/update/${currentStockId}`
      : 'http://localhost:8080/api/stocks/add';
    const method = isUpdateMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const updatedStock = await response.json();
        if (isUpdateMode) {
          setStocks(stocks.map((stock) => (stock.id === currentStockId ? updatedStock : stock)));
          alert('Stock updated successfully!');
        } else {
          setStocks([...stocks, updatedStock]);
          alert('Stock added successfully!');
        }
        setModalOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save stock');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteStock = async (id) => {
    if (!window.confirm('Are you sure you want to delete this stock?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/stocks/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setStocks(stocks.filter((stock) => stock.id !== id));
        alert('Stock deleted successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete stock');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const openUpdateModal = (stock) => {
    setForm(stock);
    setCurrentStockId(stock.id);
    setUpdateMode(true);
    setModalOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="stocks-page p-6">
      <h1 className="text-3xl font-bold underline mb-6">Stocks Portfolio</h1>
      <div className="mt-4">
        <p className="text-lg">Portfolio Value: ${portfolioValue?.toFixed(2)}</p>
        {dashboardData && (
          <div className="dashboard mt-4">
            <h2 className="text-2xl font-semibold">Dashboard</h2>
            <p><strong>Total Value:</strong> ${dashboardData.totalValue.toFixed(2)}</p>
            <p>
              <strong>Top Stock:</strong> {dashboardData.topStock.name} (
              {dashboardData.topStock.ticker}) - Quantity: {dashboardData.topStock.quantity}, 
              Buy Price: ${dashboardData.topStock.buyPrice.toFixed(2)}, Current Price: $
              {dashboardData.topStock.currentPrice.toFixed(2)}
            </p>
            <h3 className="text-xl mt-2">Distribution:</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={distributionData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                outerRadius={80}
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

            <h3 className="text-xl mt-2">Profit and Loss:</h3>
            <BarChart width={600} height={300} data={profitAndLossData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setForm({ ticker: '', name: '', quantity: '', buyPrice: '', currentPrice: '' });
          setUpdateMode(false);
          setModalOpen(true);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Stock
      </button>

      <table className="table-auto border-collapse border border-gray-300 w-full mt-5">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Ticker</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Buy Price</th>
            <th className="border border-gray-300 px-4 py-2">Current Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td className="border border-gray-300 px-4 py-2">{stock.id}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.ticker}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.name}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.quantity}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.buyPrice}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.currentPrice}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => openUpdateModal(stock)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteStock(stock.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Stock' : 'Add New Stock'}
            </h2>
            <form>
              <input
                type="text"
                name="ticker"
                placeholder="Ticker"
                value={form.ticker}
                onChange={handleFormChange}
                className="block w-full border border-gray-300 px-3 py-2 mb-3 rounded"
              />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleFormChange}
                className="block w-full border border-gray-300 px-3 py-2 mb-3 rounded"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleFormChange}
                className="block w-full border border-gray-300 px-3 py-2 mb-3 rounded"
              />
              <input
                type="number"
                name="buyPrice"
                placeholder="Buy Price"
                value={form.buyPrice}
                onChange={handleFormChange}
                className="block w-full border border-gray-300 px-3 py-2 mb-3 rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddOrUpdateStock}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {isUpdateMode ? 'Update Stock' : 'Add Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StocksPage;