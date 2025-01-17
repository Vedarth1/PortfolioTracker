import React from 'react';

function App() {
  return (
    <div className="container mx-auto mt-8 px-5 flex-col">
      {/* Header */}
      <header className="container bg-dollar mb-6">
        <nav className="flex justify-between">
          <div className="flex">
            <a href="/" className="my-4 ml-6 text-dollar-split_blue font-bold hover:text-dollar-complement cursor-pointer">
              HOME
            </a>
          </div>
          <div className="flex">
            <a href="/auth/login" className="my-4 mr-6 text-dollar-split_blue font-bold hover:text-dollar-complement cursor-pointer">
              LOG IN
            </a>
            <a href="/auth/signup" className="my-4 mr-6 text-dollar-split_blue font-bold hover:text-dollar-complement cursor-pointer">
              SIGN UP
            </a>
          </div>
        </nav>
      </header>

      <main>
        <h1 className="text-center my-16 font-bold text-4xl">The home of the Portfolio tracker</h1>
        <div>
          <img
            src="portfolio_tracker.jpg"
            alt="Portfolio photo"
            className="mx-auto rounded-lg"
          />
        </div>
        <div className="my-24">
          <p className="text-2xl font-bold text-center mb-6">
            Finally, a portfolio tracker you dreamed about! Track your investments in real time.
          </p>
          <p className="text-2xl font-bold text-center mb-6">
            Keep a track of your realized profit/loss from each stock.
          </p>
        </div>
        <p className="text-3xl font-bold text-center">
          Join the club and get control over your investments.
        </p>
        <div className="flex container w-full mt-24 gap-12">
          <div className="flex flex-col items-center w-1/2">
            <div>
              <img
                src="portfolio1.jpg"
                alt="Portfolio tracking"
                className="rounded-lg w-full"
              />
            </div>
            <h2 className="text-lg font-bold text-center my-4">
              Real-time portfolio tracking
            </h2>
            <p className="text-center px-4">
              Record all your transactions and watch your portfolio performance in real-time. Get detailed individual stock and total portfolio value, daily profit/loss, percentage profit/loss, realized profit/loss, and transactions cost.
            </p>
          </div>

          <div className="flex flex-col items-center w-1/2">
            <div>
              <img
                src="portfolio2.jpg"
                alt="Tracking all investments"
                className="rounded-lg w-full"
              />
            </div>
            <h2 className="text-lg font-bold text-center my-4">
              Track all of your investments
            </h2>
            <p className="text-center px-4">
              Create multiple portfolios and track investments in each. See the big picture with your total Net Worth, and track your daily gains as a dollar value and percentage.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mt-24">
          Hurry up and register, it's free!
        </h2>
        <div className="mt-24 flex container flex-col space-between">
          <div className="flex justify-around">
            <div className="flex flex-col w-1/2 items-center">
              <div>
                <img
                  src="https://raw.githubusercontent.com/Hombre2014/Portfolio-tracker/dev/app/assets/images/signup.jpg"
                  alt="Signup"
                  className="rounded-lg mb-12 w-full"
                />
              </div>
              <div>
                <a
                  href="/users/sign_up"
                  className="rounded-lg bg-dollar-split_blue text-center text-3xl font-bold hover:bg-dollar-triad_blue py-1 px-3"
                >
                  So, sign up now
                </a>
              </div>
            </div>
            <div className="flex flex-col w-1/2 items-center">
              <div>
                <img
                  src="https://raw.githubusercontent.com/Hombre2014/Portfolio-tracker/dev/app/assets/images/signin.jpg"
                  alt="Login"
                  className="rounded-lg mb-12 w-full"
                />
              </div>
              <div>
                <a
                  href="/users/sign_in"
                  className="rounded-lg bg-dollar-split_blue py-1 px-3 text-center text-3xl font-bold hover:bg-dollar-triad_blue"
                >
                  Or simply login
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="my-16 flex-col container content-center">
          <p className="text-center text-3xl font-bold">Because did I say ...</p>
          <div>
            <img
              src="https://raw.githubusercontent.com/Hombre2014/Portfolio-tracker/dev/app/assets/images/free.png"
              alt="It is free sign"
              className="w-1/4 mx-auto mt-12"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col justify-center items-center container bg-dollar h-14 my-16 mb-8">
        <div>
          <p>
            Copyright<sup>&copy;</sup> 2024-2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
