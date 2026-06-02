require("dotenv").config();

const express =
  require(
    "express"
  );

const connectDB =
  require(
    "./config/db"
  );

const loadCSV =
  require(
    "./services/csvService"
  );

const routes =
  require(
    "./routes/reportRoutes"
  );

const app =
  express();

connectDB();

app.use(
  express.json()
);

app.use(routes);

(async () => {
  await loadCSV(
    "./data/user_transactions.csv",
    "user"
  );

  await loadCSV(
    "./data/exchange_transactions.csv",
    "exchange"
  );
})();

app.listen(
  process.env.PORT,
  () =>
    console.log(
      "Server running"
    )
);