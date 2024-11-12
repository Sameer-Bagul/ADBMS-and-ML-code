// 11. Implement the aggregation and indexing with suitable example in MongoDB. 
// Demonstrate the following: Aggregation framework Create and drop different types 
// of indexes and explain () to show the advantage of the indexes


// 1. Create and use a new database
use ShopDB;

// 2. Create the Orders collection with sample data
db.Orders.insertMany([
    { order_id: 1, customer_name: "Rahul Sharma", product: "Laptop", quantity: 2, price: 50000, order_date: new Date("2023-01-15"), category: "Electronics" },
    { order_id: 2, customer_name: "Neha Singh", product: "Phone", quantity: 1, price: 30000, order_date: new Date("2023-01-18"), category: "Electronics" },
    { order_id: 3, customer_name: "Amit Gupta", product: "Headphones", quantity: 3, price: 2000, order_date: new Date("2023-01-20"), category: "Electronics" },
    { order_id: 4, customer_name: "Priya Mehta", product: "Shoes", quantity: 2, price: 3000, order_date: new Date("2023-02-01"), category: "Fashion" },
    { order_id: 5, customer_name: "Rohit Verma", product: "Bag", quantity: 1, price: 1500, order_date: new Date("2023-02-05"), category: "Fashion" },
    { order_id: 6, customer_name: "Sneha Patel", product: "Laptop", quantity: 1, price: 50000, order_date: new Date("2023-02-10"), category: "Electronics" },
]);

// Part 1: Aggregation Framework

// 3. Calculate total sales for each product category
print("Total sales for each product category:");
db.Orders.aggregate([
    { $group: { _id: "$category", totalSales: { $sum: { $multiply: ["$quantity", "$price"] } } } }
]).pretty();

// 4. Find the average quantity ordered for each product
print("Average quantity ordered per product:");
db.Orders.aggregate([
    { $group: { _id: "$product", avgQuantity: { $avg: "$quantity" } } }
]).pretty();

// 5. List all orders sorted by the highest price (descending order)
print("Orders sorted by highest price:");
db.Orders.aggregate([
    { $sort: { price: -1 } }
]).pretty();

// 6. Count total orders per month
print("Total orders per month:");
db.Orders.aggregate([
    { $group: { _id: { $month: "$order_date" }, totalOrders: { $sum: 1 } } },
    { $sort: { "_id": 1 } }
]).pretty();

// 7. Find total revenue by customer
print("Total revenue by customer:");
db.Orders.aggregate([
    { $group: { _id: "$customer_name", totalSpent: { $sum: { $multiply: ["$quantity", "$price"] } } } },
    { $sort: { totalSpent: -1 } }
]).pretty();


// Part 2: Indexing in MongoDB

// 8. Create a single-field index on the `customer_name` field
print("Creating index on customer_name:");
db.Orders.createIndex({ customer_name: 1 });

// 9. Query with and without an index to demonstrate the advantage
print("Query without index (use db.Orders.find() without explain first, then after index):");
db.Orders.find({ customer_name: "Neha Singh" }).explain("executionStats");

// 10. Create a compound index on `category` and `order_date` to optimize queries based on both fields
print("Creating compound index on category and order_date:");
db.Orders.createIndex({ category: 1, order_date: 1 });

// 11. Query to demonstrate the advantage of the compound index
print("Query with compound index:");
db.Orders.find({ category: "Electronics" }).sort({ order_date: -1 }).explain("executionStats");

// 12. Create a text index on `product` field for text search
print("Creating text index on product:");
db.Orders.createIndex({ product: "text" });

// 13. Use text search with the text index
print("Text search on 'Laptop' in product field:");
db.Orders.find({ $text: { $search: "Laptop" } }).pretty();

// 14. Drop indexes after use to demonstrate flexibility
print("Dropping all indexes:");
db.Orders.dropIndexes();
print("All indexes dropped.");


