# Transaction Reconciliation Engine

## Overview

A Node.js-based backend application that reconciles cryptocurrency transaction records between user-exported and exchange-exported CSV files. The system identifies matched, unmatched, and flagged transactions while generating reconciliation reports through REST APIs.

---

## Features

- CSV transaction ingestion
- MongoDB storage using Mongoose
- Transaction normalization
- Asset alias handling (bitcoin → BTC)
- Transfer direction mapping (TRANSFER_IN → TRANSFER_OUT)
- Timestamp tolerance matching
- Quantity tolerance matching
- Reconciliation report generation
- Unmatched transaction tracking
- REST API endpoints
- Invalid data flagging

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- csv-parser
- dotenv
- UUID

---

## Project Structure

```text
transaction-reconciliation-engine/

├── config/
│   └── db.js

├── data/
│   ├── user_transactions.csv
│   └── exchange_transactions.csv

├── models/
│   ├── Transaction.js
│   └── Report.js

├── routes/
│   └── reportRoutes.js

├── services/
│   ├── csvService.js
│   └── reconcileService.js

├── utils/
│   ├── normalize.js
│   └── matcher.js

├── .env
├── package.json
├── README.md
└── server.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/transaction-reconciliation-engine.git

cd transaction-reconciliation-engine
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/reconciliation

TIMESTAMP_TOLERANCE_SECONDS=300
QUANTITY_TOLERANCE_PCT=0.01
```

---

## MongoDB Setup

Create database folder:

```powershell
mkdir C:\data
mkdir C:\data\db
```

Start MongoDB:

```powershell
& "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath C:\data\db
```

---

## Run Application

Start the server:

```bash
node server.js
```

Expected output:

```text
MongoDB connected
Server running
```

---

## Matching Logic

Transactions are matched using:

### Transaction Type

Both records must have the same normalized transaction type.

Example:

```text
TRANSFER_IN → TRANSFER_OUT
```

### Asset Matching

Asset aliases are normalized.

Example:

```text
bitcoin → BTC
```

### Timestamp Matching

Transactions match if the timestamp difference is within:

```env
TIMESTAMP_TOLERANCE_SECONDS=300
```

Default tolerance: 5 minutes

### Quantity Matching

Transactions match if quantity difference is within:

```env
QUANTITY_TOLERANCE_PCT=0.01
```

Default tolerance: 1%

---

## Data Quality Handling

Invalid records are not removed.

Flagged records contain:

```json
{
  "flagged": true,
  "flagReason": "Invalid timestamp"
}
```

Examples:

- Invalid timestamp
- Missing values
- Malformed data

---

## API Endpoints

### Run Reconciliation

```http
POST /reconcile
```

Response:

```json
{
  "runId": "05e40bf9-f6d8-4b4a-840c-3dc88574be06"
}
```

---

### Get Full Report

```http
GET /report/:runId
```

Example:

```http
GET /report/05e40bf9-f6d8-4b4a-840c-3dc88574be06
```

---

### Get Summary

```http
GET /report/:runId/summary
```

Example Response:

```json
{
  "Matched": 22,
  "Unmatched User": 4,
  "Unmatched Exchange": 3
}
```

---

### Get Unmatched Transactions

```http
GET /report/:runId/unmatched
```

Returns all unmatched transactions and their reasons.

---

## Reconciliation Categories

### Matched

Transactions successfully matched between datasets.

### Unmatched User

Transaction exists only in the user dataset.

### Unmatched Exchange

Transaction exists only in the exchange dataset.

### Flagged

Transaction contains invalid or incomplete data.

---

## Example Output

```json
{
  "Matched": 22,
  "Unmatched User": 4,
  "Unmatched Exchange": 3
}
```

---

## Design Decisions

- MongoDB used for transaction and report storage
- Configurable matching tolerances using environment variables
- Asset alias normalization implemented
- Transaction type mapping implemented
- Invalid records preserved and flagged
- REST API architecture for report access
- Modular folder structure for scalability

---

## Future Improvements

- Deployment using Render or Railway
- Swagger API documentation
- Authentication and authorization
- Advanced fuzzy matching algorithms
- Report export in CSV/PDF format
- Docker containerization

---

## Author

Neerugatti Karthik

Backend Developer | Node.js | MongoDB | REST APIs

GitHub:
https://github.com/karthiktcs387
