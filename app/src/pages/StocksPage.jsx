import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const [deletingStockId, setDeletingStockId] = useState(null);
  const [isDeleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);

  const token = localStorage.getItem('Token');
  const navigate = useNavigate();

  const stockOptions = [
    { name: 'Apple', ticker: 'AAPL' },
    { name: 'Google', ticker: 'GOOGL' },
    { name: 'Amazon', ticker: 'AMZN' },
    { name: 'Microsoft', ticker: 'MSFT' },
    { name: 'Tesla', ticker: 'TSLA' },
    { name: 'NVIDIA', ticker: 'NVDA' },
    { name: 'Meta', ticker: 'META' },
    { name: 'Netflix', ticker: 'NFLX' },
    { name: 'Adobe', ticker: 'ADBE' },
    { name: 'Salesforce', ticker: 'CRM' },
  ];

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
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [token]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const selectedStock = stockOptions.find((stock) => stock.name === value);
      setForm({
        ...form,
        name: value,
        ticker: selectedStock ? selectedStock.ticker : '',
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAddOrUpdateStock = async () => {
    const url = isUpdateMode
      ? `http://localhost:8080/api/stocks/update/${currentStockId}`
      : 'http://localhost:8080/api/stocks/add';
    const method = isUpdateMode ? 'PUT' : 'POST';

    setButtonLoading(true);
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
          toast.success('Stock updated successfully!');
        } else {
          setStocks([...stocks, updatedStock]);
          toast.success('Stock added successfully!');
        }
        setModalOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save stock');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleDeleteStock = async () => {
    setButtonLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/stocks/delete/${deletingStockId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setStocks(stocks.filter((stock) => stock.id !== deletingStockId));
        toast.success('Stock deleted successfully!');
        setDeleteConfirmModalOpen(false);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete stock');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setButtonLoading(false);
    }
  };

  const openUpdateModal = (stock) => {
    setForm(stock);
    setCurrentStockId(stock.id);
    setUpdateMode(true);
    setModalOpen(true);
  };

  const openDeleteConfirmModal = (stockId) => {
    setDeletingStockId(stockId);
    setDeleteConfirmModalOpen(true);
  };

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-6">Error: {error}</div>;

  return (
    <div className="stocks-page p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Stocks Portfolio</h1>

      {/* Button Actions */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate('/portfolio')}
          className={`px-4 py-2 rounded transition ${
            stocks.length > 0
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={stocks.length === 0}
        >
          Go to Portfolio Page
        </button>
        <button
          onClick={() => {
            setForm({ ticker: '', name: '', quantity: '', buyPrice: '', currentPrice: '' });
            setUpdateMode(false);
            setModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Stock
        </button>
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
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
                <td className="border border-gray-300 px-4 py-2">{stock.ticker}</td>
                <td className="border border-gray-300 px-4 py-2">{stock.name}</td>
                <td className="border border-gray-300 px-4 py-2">{stock.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">{stock.buyPrice}</td>
                <td className="border border-gray-300 px-4 py-2">{stock.currentPrice}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => openUpdateModal(stock)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openDeleteConfirmModal(stock.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isUpdateMode ? 'Update Stock' : 'Add New Stock'}
            </h2>
            <form>
              <select
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="block w-full border border-gray-300 px-3 py-2 mb-3 rounded"
              >
                <option value="">Select a stock</option>
                {stockOptions.map((stock) => (
                  <option key={stock.ticker} value={stock.name}>
                    {stock.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="ticker"
                placeholder="Ticker"
                value={form.ticker}
                readOnly
                className="block w-full border border-gray-300 px-3 py-2 mb-3 rounded bg-gray-100"
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
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddOrUpdateStock}
                  className={`bg-green-500 text-white px-4 py-2 rounded ${
                    isButtonLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                  }`}
                  disabled={isButtonLoading}
                >
                  {isButtonLoading ? 'Saving...' : isUpdateMode ? 'Update Stock' : 'Add Stock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this stock? This action cannot be undone.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDeleteConfirmModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteStock}
                className={`bg-red-500 text-white px-4 py-2 rounded ${
                  isButtonLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
                disabled={isButtonLoading}
              >
                {isButtonLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StocksPage;
