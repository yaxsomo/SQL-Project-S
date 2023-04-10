SELECT DISTINCT Product.ProductId, Name, CreationDate, Suppliers, Category, CommandId, Command.Total, Rating, Rate.UserId, Invoice.InvoiceId, Invoice.InvoiceDate, Address.Continent FROM Product
INNER JOIN Command ON Product.ProductId = Command.ProductId
INNER JOIN Rate ON Product.ProductId = Rate.ProductId
INNER JOIN Invoice ON Rate.UserId = Invoice.UserId
INNER JOIN Address ON Invoice.AddressId = Address.AddressId
ORDER BY CommandId
