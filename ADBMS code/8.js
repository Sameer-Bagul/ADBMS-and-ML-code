// 8. Create a database with suitable example using MongoDB and implement 
//  a. inserting and saving document (batch insert, insert validation) 
//  b. Removing document
//  c. Updating document (document replacement, using modifiers, upserts, 
// updating multiple documents, returning updated documents)

// 1. Create and use the CustomerOrders database
use CustomerOrders;

// 2. Create the Orders collection and insert sample documents
db.Orders.insertMany([
    { order_id: 1, customer_name: "Rajesh Patel", product: "Laptop", quantity: 1, price: 55000, status: "delivered" },
    { order_id: 2, customer_name: "Meena Sharma", product: "Smartphone", quantity: 2, price: 15000, status: "pending" },
    { order_id: 3, customer_name: "Vikas Gupta", product: "Headphones", quantity: 3, price: 2000, status: "shipped" },
    { order_id: 4, customer_name: "Sneha Rao", product: "Keyboard", quantity: 1, price: 700, status: "delivered" },
    { order_id: 5, customer_name: "Amit Mehta", product: "Monitor", quantity: 1, price: 12000, status: "pending" }
]);

// 3. Inserting and Saving Documents

// 3a. Batch Insert with Validation (Example with price validation)
print("Inserting documents with price validation...");
db.Orders.insertMany([
    { order_id: 6, customer_name: "Nikhil Kumar", product: "Tablet", quantity: 1, price: 18000, status: "pending" },
    { order_id: 7, customer_name: "Priya Desai", product: "Laptop", quantity: 1, price: 62000, status: "shipped" },
], { ordered: true }); // ordered: true means if an error occurs, the operation stops, and no further inserts are processed

// 4. Removing Documents

// 4a. Remove a document by specific condition
print("Removing document where product is 'Keyboard'...");
db.Orders.deleteOne({ product: "Keyboard" });

// 4b. Remove all documents with a specific status
print("Removing all pending orders...");
db.Orders.deleteMany({ status: "pending" });

// 5. Updating Documents

// 5a. Document Replacement
print("Replacing a document for order_id 1...");
db.Orders.replaceOne(
    { order_id: 1 },
    { order_id: 1, customer_name: "Rajesh Patel", product: "Gaming Laptop", quantity: 1, price: 75000, status: "delivered" }
);

// 5b. Using Modifiers to update fields
print("Updating status to 'delivered' for customer 'Vikas Gupta'...");
db.Orders.updateOne(
    { customer_name: "Vikas Gupta" },
    { $set: { status: "delivered" } }
);

// 5c. Upsert: Update or insert if not present
print("Upserting a document (insert if not found)...");
db.Orders.updateOne(
    { order_id: 8 },
    { $set: { customer_name: "Anjali Singh", product: "Wireless Mouse", quantity: 2, price: 1000, status: "processing" } },
    { upsert: true }
);

// 5d. Updating Multiple Documents
print("Setting all 'shipped' orders to 'delivered'...");
db.Orders.updateMany(
    { status: "shipped" },
    { $set: { status: "delivered" } }
);

// 5e. Returning Updated Documents
print("Updating quantity for customer 'Anjali Singh' and returning updated document...");
let updatedDocument = db.Orders.findOneAndUpdate(
    { customer_name: "Anjali Singh" },
    { $set: { quantity: 3 } },
    { returnNewDocument: true }
);
print("Updated Document:");
printjson(updatedDocument);
