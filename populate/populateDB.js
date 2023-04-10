const { faker, Faker, RandomModule } = require('@faker-js/faker');
const { Users, Product, Address, Cart,display,getRandomFloat, randomNumber, Command, CommandHistory, Payement, Photo, Rate, Invoice } = require('./Collection.js');
const generate = faker
const sqlite3 = require('sqlite3').verbose();


//Generating specific data for our tables
function generateUsers(sampleCount) {
  let usersArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleFirstName = generate.name.firstName()                               
        let sampleLastName = generate.name.lastName()                                     
        let sampleEmail = generate.internet.email()                                  
        let samplePhoneNumber = generate.phone.number('###-###-###')   
        let sample = new Users(index,sampleFirstName,sampleLastName,sampleEmail,samplePhoneNumber)
        usersArray.push(sample)
    }
    return usersArray
}

function generateProducts(sampleCount) {
  let productsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {                           
        let sampletName = generate.commerce.product()                                     
        let samplePrice = generate.commerce.price()                                  
        let sampleCreationDate = generate.date.between('2014-01-01T00:00:00.000Z','2022-05-01T00:00:00.000Z')
        let sampleQuantity = randomNumber(5,150)
        let sampleSupplier = generate.company.name() + " " + generate.company.companySuffix()
        let sampleCategory = generate.commerce.department()     
        let sample = new Product(index,sampletName,samplePrice,sampleCreationDate,sampleQuantity,sampleSupplier,sampleCategory)
        productsArray.push(sample)
    }
    return productsArray
}

function generateAddresses(sampleCount) {
  let addressesArray = new Array()
  continents = ['Europe', 'Asia', 'America','Africa','Oceania']
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)                               
        let sampleUserAddress = generate.address.streetAddress()                                    
        let sampleCity = generate.address.city()                                  
        let samplePostalCode = generate.address.zipCode()
        let sampleCountry = generate.address.country()
        let sampleContinent = continents[Math.floor(Math.random() * continents.length)];
        let sample = new Address(index,sampleUserId,sampleUserAddress,sampleCity,samplePostalCode,sampleCountry,sampleContinent)
        addressesArray.push(sample)
    }
    return addressesArray
}



function generateCarts(sampleCount) {
  let cartsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)                               
        let sampleTotalPrice = generate.commerce.price(min=40,max=150) + '€'
        let sample = new Cart(index,sampleUserId,sampleTotalPrice)
        cartsArray.push(sample)
    }
    return cartsArray
}


function generateCommands(sampleCount) {
  let commandsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleProductId = randomNumber(min=1,max=1000)                               
        let samplePrice = generate.commerce.price(min=40,max=150) + '€'
        let sampleQuantity = randomNumber(min=1,max=100)   
        let sampleTotal = parseInt(samplePrice) * sampleQuantity + '€';                               
        let sampleCartId = randomNumber(min=1,max=1000)                               
        let sample = new Command(index,sampleProductId,samplePrice,sampleQuantity,sampleTotal,sampleCartId)
        commandsArray.push(sample)
    }
    return commandsArray
}




function generateCommandsHistory(sampleCount) {
  let commandsHistoryArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleProductId = randomNumber(min=1,max=1000)                               
        let samplePrice = generate.commerce.price(min=40,max=150) + '€'
        let sampleQuantity = randomNumber(min=1,max=100)   
        let sampleTotal = parseInt(samplePrice) * sampleQuantity + '€';                                                           
        let sample = new CommandHistory(index,sampleProductId,samplePrice,sampleQuantity,sampleTotal)
        commandsHistoryArray.push(sample)
    }
    return commandsHistoryArray
}

function generatePayements(sampleCount) {
  let payementsArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)                               
        let sampleCardNumber = generate.finance.creditCardNumber()
        let sampleIban = generate.finance.iban()
        let sample = new Payement(index,sampleUserId,sampleCardNumber,sampleIban)
        payementsArray.push(sample)
    }
    return payementsArray
}

function generatePhotos(sampleCount) {
let photosArray = new Array()
  for (let index = 1; index <= sampleCount; index++) {
      let sampleUserId = randomNumber(min=1,max=1000)                               
      let sampleProductId = randomNumber(min=1,max=1000)
      let samplePhotoBlob = "/server/pictures/" + generate.system.fileName('jpg')
      let sample = new Photo(index,sampleUserId,sampleProductId,samplePhotoBlob)
      photosArray.push(sample)
  }
  return photosArray
}

function generateRates(sampleCount) {
  let ratesArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleProductId = randomNumber(min=1,max=1000) 
        let sampleUserId = randomNumber(min=1,max=1000)                                                          
        let sampleRating = getRandomFloat(0.0, 5.0, 2)
        let sample = new Rate(index,sampleProductId,sampleUserId,sampleRating)
        ratesArray.push(sample)
    }
    return ratesArray
}
          
function generateInvoices(sampleCount) {
  let invoicesArray = new Array()
    for (let index = 1; index <= sampleCount; index++) {
        let sampleUserId = randomNumber(min=1,max=1000)
        let sampleInvoiceDate = generate.date.between('2014-01-01T00:00:00.000Z','2022-05-01T00:00:00.000Z')
        let samplePayementId = randomNumber(min=1,max=1000)                             
        let sampleTotal = generate.commerce.price(min=40,max=150) + '€'
        let sampleAddressId = randomNumber(min=1,max=1000)
        let sampleHistoryId = randomNumber(min=1,max=1000)
        let sample = new Invoice(index,sampleUserId,sampleInvoiceDate,samplePayementId,sampleTotal,sampleAddressId,sampleHistoryId)
        invoicesArray.push(sample)
    }
    return invoicesArray
}




function insertDataToDB(db, nbRows){


  for (let i = 0; i < nbRows; i++) {

    generatedUsers = generateUsers(1)
    generatedProducts = generateProducts(1)
    generatedAddresses = generateAddresses(1)
    generatedCarts = generateCarts(1)
    generatedCommands = generateCommands(1)
    generatedCommandsHistory = generateCommandsHistory(1)
    generatedPayements = generatePayements(1)
    generatedPhotos = generatePhotos(1)
    generatedRatings = generateRates(1)
    generatedInvoices = generateInvoices(1)


    db.run(`insert into User (FirstName, LastName, Email, Phone) values (?, ?, ?, ?)`, [generatedUsers[0].firstName,generatedUsers[0].lastName,generatedUsers[0].email,generatedUsers[0].phone], function(err) {
      if (err) {
        return console.log(err.message);
      }

    });

    db.run(`insert into Product (Name, Price, CreationDate, Quantity, Suppliers, Category) values (?, ?, ?, ?, ?, ?)`,[generatedProducts[0].name,generatedProducts[0].price,generatedProducts[0].creationDate,generatedProducts[0].quantity,generatedProducts[0].suppliers,generatedProducts[0].category], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into Address (UserId, UserAddress, City, PostalCode, Country, Continent) values (?, ?, ?, ?, ?, ?)`,[generatedAddresses[0].userId,generatedAddresses[0].userAddress, generatedAddresses[0].city,generatedAddresses[0].postalCode,generatedAddresses[0].country, generatedAddresses[0].continent], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into Cart (UserId, TotalPrice) values (?,?)`, [generatedCarts[0].userId,generatedCarts[0].totalPrice], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into Command (ProductId, Price, Quantity, Total, CartId) values (?, ?, ?, ?, ?)`,[generatedCommands[0].productId,generatedCommands[0].price,generatedCommands[0].quantity,generatedCommands[0].total,generatedCommands[0].commandCartId], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into CommandHistory (ProductId, Price, Quantity, Total) values (?, ?, ?, ?)`, [generatedCommandsHistory[0].productId,generatedCommandsHistory[0].price,generatedCommandsHistory[0].quantity,generatedCommandsHistory[0].total], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into Payement (UserId, CardNumber, IBAN) values (?,?,?)`, [generatedPayements[0].userId,generatedPayements[0].cardNumber,generatedPayements[0].iban], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into Photo (UserId, ProductId, PhotoBlob) values (?, ?, ?)`, [generatedPhotos[0].userId,generatedPhotos[0].productId,generatedPhotos[0].photoBlob], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into Rate (UserId, ProductId, Rating) values (?, ?, ?)`, [generatedRatings[0].productId,generatedRatings[0].userId,generatedRatings[0].rating], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

    db.run(`insert into Invoice (UserId, InvoiceDate, PayementId, Total, AddressId, HistoryId) values (?, ?, ?, ?, ?, ?)`, [generatedInvoices[0].invoiceUserId,generatedInvoices[0].invoiceDate,generatedInvoices[0].invoicePayementId,generatedInvoices[0].total,generatedInvoices[0].addressId,generatedInvoices[0].historyId], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });
} //END FOR  

console.log(`Tables updated!`);
    // close the database connection
    db.close();
    
}


function connectAndExecute(){
  let dbBase = new sqlite3.Database('./EcomDB.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the Ecommerce Database database.');
    insertDataToDB(dbBase,1000)
  });


}

connectAndExecute()


// console.log(Date.now() + Math.random())


// function randomDate(start, end, startHour, endHour) {
//   var date = new Date(+start + Math.random() * (end - start));
//   var hour = startHour + Math.random() * (endHour - startHour) | 0;
//   date.setHours(hour);
//   return date;
// }

// display(randomDate('2014-01-01','2020-01-01'))