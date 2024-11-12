// 3. Implement aggregation and indexing with suitable example using MongoDB.

// Step 1: Create the Database
use OnlineStore;

// Step 2: Create 'Orders' Collection and Insert Sample Data
db.Orders.insertMany([
    { order_id: 1, customer_name: "Amit Verma", items: [ { product: "Keyboard", quantity: 2, price: 500 }, { product: "Mouse", quantity: 1, price: 300 } ], order_date: new Date("2023-01-10"), location: "Pune" },
    { order_id: 2, customer_name: "Sakshi Patel", items: [ { product: "Monitor", quantity: 1, price: 8000 }, { product: "Mouse", quantity: 1, price: 300 } ], order_date: new Date("2023-01-15"), location: "Mumbai" },
    { order_id: 3, customer_name: "Rajesh Singh", items: [ { product: "Processor", quantity: 1, price: 15000 }, { product: "Keyboard", quantity: 1, price: 500 } ], order_date: new Date("2023-02-10"), location: "Pune" },
    { order_id: 4, customer_name: "Santosh Verma", items: [ { product: "Printer", quantity: 1, price: 5000 } ], order_date: new Date("2023-02-20"), location: "Nagpur" },
    { order_id: 5, customer_name: "Sanya Gupta", items: [ { product: "Modem", quantity: 2, price: 2500 }, { product: "Switch", quantity: 1, price: 1200 } ], order_date: new Date("2023-03-05"), location: "Mumbai" }
]);

// Step 3: Aggregation Examples

// 1) Aggregation to Calculate Total Revenue
db.Orders.aggregate([
    { $unwind: "$items" },
    { $group: { _id: null, total_revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } }
]);

// 2) Aggregation to Calculate Total Orders Per Location
db.Orders.aggregate([
    { $group: { _id: "$location", total_orders: { $sum: 1 } } }
]);

// 3) Aggregation to Calculate Average Order Value per Customer
db.Orders.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$customer_name", total_spent: { $sum: { $multiply: ["$items.quantity", "$items.price"] } } } },
    { $project: { customer_name: "$_id", total_spent: 1, _id: 0 } }
]);

// 4) Aggregation to Find Most Frequently Ordered Product
db.Orders.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$items.product", total_quantity: { $sum: "$items.quantity" } } },
    { $sort: { total_quantity: -1 } },
    { $limit: 1 }
]);

// Step 4: Indexing Examples

// 1) Create an index on the 'location' field to optimize searches based on location
db.Orders.createIndex({ location: 1 });

// 2) Create a compound index on 'customer_name' and 'order_date' to optimize searches by customer and order date
db.Orders.createIndex({ customer_name: 1, order_date: -1 });
