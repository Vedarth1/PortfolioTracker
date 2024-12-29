import React, { useState, useEffect } from 'react';

function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      const token = localStorage.getItem('Token');
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/stocks/portfolio', {
          method: 'GET',
          credentials: "include",
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
          console.error('Server error:', errorData);
          throw new Error(errorData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="stocks-page">
      <h1 className="text-3xl font-bold underline">Stocks Portfolio</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full mt-5">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Ticker</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Buy Price</th>
            <th className="border border-gray-300 px-4 py-2">Current Price</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StocksPage;
