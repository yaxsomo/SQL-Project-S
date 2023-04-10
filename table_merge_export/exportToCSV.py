import pandas as pd
import sqlite3

db_file = './EcomDB.db'


query = "SELECT DISTINCT Product.ProductId, Name, CreationDate, Suppliers, Category, CommandId, Command.Total, Rating, Rate.UserId, Invoice.InvoiceId, Invoice.InvoiceDate, Address.Continent FROM Product INNER JOIN Command ON Product.ProductId = Command.ProductId INNER JOIN Rate ON Product.ProductId = Rate.ProductId INNER JOIN Invoice ON Rate.UserId = Invoice.UserId INNER JOIN Address ON Invoice.AddressId = Address.AddressId ORDER BY CommandId"

conn = sqlite3.connect(db_file, isolation_level=None,
                       detect_types=sqlite3.PARSE_COLNAMES)
db_df = pd.read_sql_query(query, conn)
db_df.to_csv('database.csv', index=False)