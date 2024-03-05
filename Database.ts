import { Database } from 'sqlite3';
const db: Database = new Database('TradingData.db');
const TimezoneOffset = -new Date().getTimezoneOffset() / 60;

function SqliteCreate() {
    db.run(`CREATE TABLE IF NOT EXISTS TradingData (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        TransactionType TEXT,
        CurrentPrice REAL,
        VWAP24h REAL,
        RSI5min REAL,
        RSI15min REAL,
        TransactionTime DateTime)`
    );
};

function SqliteInsert(TransactionType: string, CurrentPrice: number, VWAP24h: number, LatestRSI5: string, LatestRSI15:string){
    db.run(`INSERT INTO TradingData (TransactionType, CurrentPrice, VWAP24h, RSI5min, RSI15min, TransactionTime)
    VALUES (?, ?, ?, ?, ?, datetime(CURRENT_TIMESTAMP, '+${TimezoneOffset} hours'))`,
    [TransactionType, CurrentPrice, VWAP24h, LatestRSI5, LatestRSI15]);  
};

export { SqliteCreate, SqliteInsert };