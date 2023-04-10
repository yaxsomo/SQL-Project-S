CREATE TABLE User ( 
	UserId               INTEGER NOT NULL  PRIMARY KEY  ,
	FirstName            VARCHAR(100) NOT NULL    ,
	LastName             VARCHAR(100) NOT NULL    ,
	Email                VARCHAR(50) NOT NULL    ,
	Phone                VARCHAR(25) NOT NULL    
 );

CREATE TABLE Address ( 
	AddressId            INTEGER NOT NULL  PRIMARY KEY  ,
	UserId               INTEGER NOT NULL    ,
	UserAddress          VARCHAR(60) NOT NULL    ,
	City                 VARCHAR(30) NOT NULL    ,
	PostalCode           VARCHAR(10) NOT NULL    ,
	Country              CHAR(5) NOT NULL    ,
	Continent            CHAR(7) NOT NULL    ,
	FOREIGN KEY ( UserId ) REFERENCES User( UserId )
 );

CREATE TABLE Product ( 
	ProductId            INTEGER NOT NULL  PRIMARY KEY  ,
	Name                 VARCHAR(100) NOT NULL    ,
	Price                FLOAT(10,2) NOT NULL    ,
	CreationDate         DATE NOT NULL    ,
	Quantity             INTEGER NOT NULL    ,
	Suppliers            VARCHAR(100) NOT NULL    ,
	Category             VARCHAR(30) NOT NULL    
 );

CREATE TABLE Cart ( 
	CartId               INTEGER NOT NULL  PRIMARY KEY  ,
	UserId               INTEGER NOT NULL    ,
	TotalPrice           FLOAT(10,2)     ,
	FOREIGN KEY ( UserId ) REFERENCES User( UserId )
	ON UPDATE CASCADE ON DELETE CASCADE  
 );

CREATE TABLE Command ( 
	CommandId            INTEGER NOT NULL  PRIMARY KEY  ,
	ProductId            INTEGER     ,
	Price                FLOAT(10,2) NOT NULL    ,
	Quantity             INTEGER NOT NULL    ,
	Total                FLOAT(10,2) NOT NULL    ,
	CartId               INTEGER NOT NULL    ,
	FOREIGN KEY ( ProductId ) REFERENCES Product( ProductId )  ON UPDATE CASCADE ON DELETE CASCADE  ,
	FOREIGN KEY ( CartId ) REFERENCES Cart( CartId )  ON UPDATE CASCADE ON DELETE CASCADE  
 );

CREATE TABLE CommandHistory ( 
	HistoryId            INTEGER NOT NULL  PRIMARY KEY  ,
	ProductId            INTEGER     ,
	Price                FLOAT(10,2)     ,
	Quantity             INTEGER     ,
	Total                FLOAT(10,2)     ,
	FOREIGN KEY ( ProductId ) REFERENCES Product( ProductId ) 
	ON UPDATE CASCADE ON DELETE CASCADE  
 );

CREATE TABLE Payement ( 
	PayementId           INTEGER NOT NULL  PRIMARY KEY  ,
	UserId               INTEGER NOT NULL    ,
	CardNumber           VARCHAR(20)     ,
	IBAN                 VARCHAR(34)     ,
	FOREIGN KEY ( UserId ) REFERENCES User( UserId ) 
	ON UPDATE CASCADE ON DELETE CASCADE  
 );

CREATE TABLE Photo ( 
	PhotoId              INTEGER NOT NULL  PRIMARY KEY  ,
	UserId               INTEGER     ,
	ProductId            INTEGER     ,
	PhotoBlob            VARCHAR(100) NOT NULL    ,
	FOREIGN KEY ( ProductId ) REFERENCES Product( ProductId )  ON UPDATE CASCADE ON DELETE CASCADE  ,
	FOREIGN KEY ( UserId ) REFERENCES User( UserId ) ON UPDATE CASCADE ON DELETE CASCADE    
 );

CREATE TABLE Rate ( 
	RateId               INTEGER NOT NULL  PRIMARY KEY  ,
	ProductId            INTEGER NOT NULL    ,
	UserId               INTEGER NOT NULL    ,
	Rating               FLOAT(2,1)     ,
	FOREIGN KEY ( ProductId ) REFERENCES Product( ProductId )  ON UPDATE CASCADE ON DELETE CASCADE  ,
	FOREIGN KEY ( UserId ) REFERENCES User( UserId ) ON UPDATE CASCADE ON DELETE CASCADE   
 );

CREATE TABLE Invoice ( 
	InvoiceId            INTEGER NOT NULL  PRIMARY KEY  ,
	UserId               INTEGER NOT NULL    ,
	InvoiceDate          DATE NOT NULL    ,
	PayementId           INTEGER NOT NULL    ,
	Total                INTEGER NOT NULL    ,
	AddressId            INTEGER NOT NULL    ,
	HistoryId            INTEGER NOT NULL    ,
	FOREIGN KEY ( UserId ) REFERENCES User( UserId )  ON UPDATE CASCADE ON DELETE CASCADE  ,
	FOREIGN KEY ( AddressId ) REFERENCES Address( AddressId )  ON UPDATE CASCADE ON DELETE CASCADE  ,
	FOREIGN KEY ( HistoryId ) REFERENCES CommandHistory( HistoryId ) ON UPDATE CASCADE ON DELETE CASCADE  ,
	FOREIGN KEY ( PayementId ) REFERENCES Payement( PayementId ) ON UPDATE CASCADE ON DELETE CASCADE   
 );

