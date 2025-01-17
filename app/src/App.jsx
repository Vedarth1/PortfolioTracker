import React from 'react';

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4 py-3">
        <a href="/" className="text-2xl font-bold hover:text-gray-200">
          Portfolio Tracker
        </a>
        <div className="space-x-4">
          <a
            href="/auth/login"
            className="text-white font-semibold hover:underline"
          >
            Log In
          </a>
          <a
            href="/auth/signup"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500"
          >
            Sign Up
          </a>
        </div>
      </nav>
    </header>

      <main className="container mx-auto mt-8 px-5 flex-grow">
        <h1 className="text-center my-16 font-bold text-4xl text-gray-800">
          Welcome to the Portfolio Tracker
        </h1>
        <div className="flex justify-center mb-16">
          <img
            src="portfolio_tracker.jpg"
            alt="Portfolio tracker illustration"
            className="rounded-lg shadow-lg w-full max-w-xl"
          />
        </div>

        <div className="text-center my-24">
          <p className="text-2xl font-bold mb-6 text-gray-700">
            A portfolio tracker you dreamed about!
          </p>
          <p className="text-lg text-gray-600">
            Track your investments in real-time, monitor profits and losses, and gain full control
            over your financial portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
          <div className="text-center bg-white shadow-md rounded-lg p-6">
            <img
              src="portfolio1.jpg"
              alt="Portfolio tracking"
              className="rounded-lg w-full mb-6"
            />
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Real-time Portfolio Tracking
            </h2>
            <p className="text-gray-600">
              Record all your transactions and watch your portfolio performance in real-time. Get
              detailed reports, including individual stock and total portfolio value, daily
              profit/loss, and transaction costs.
            </p>
          </div>

          <div className="text-center bg-white shadow-md rounded-lg p-6">
            <img
              src="portfolio2.jpg"
              alt="Tracking all investments"
              className="rounded-lg w-full mb-6"
            />
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Track All Investments
            </h2>
            <p className="text-gray-600">
              Create multiple portfolios and monitor investments in each. See the big picture with
              your total Net Worth, daily gains, and more.
            </p>
          </div>
        </div>

        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to take control? Join us for free!
          </h2>
          <div className="flex justify-center space-x-6">
            <a
              href="/auth/signup"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700"
            >
              Sign Up Now
            </a>
            <a
              href="/auth/login"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700"
            >
              Log In
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-3">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Portfolio Tracker. All rights
          reserved.
        </p>
      </div>
    </footer>
    </div>
  );
}

export default App;
