// 5. Implement map reduce operation for super market.

// Step 1: Create the Database
use SupermarketDB;

// Step 2: Create 'Sales' Collection and Insert Sample Data
db.Sales.insertMany([
    { sale_id: 1, product: "Apples", quantity: 10, price_per_unit: 20, sale_date: new Date("2023-01-10") },
    { sale_id: 2, product: "Oranges", quantity: 5, price_per_unit: 15, sale_date: new Date("2023-01-12") },
    { sale_id: 3, product: "Apples", quantity: 8, price_per_unit: 20, sale_date: new Date("2023-01-15") },
    { sale_id: 4, product: "Bananas", quantity: 15, price_per_unit: 10, sale_date: new Date("2023-01-18") },
    { sale_id: 5, product: "Oranges", quantity: 10, price_per_unit: 15, sale_date: new Date("2023-01-20") },
    { sale_id: 6, product: "Apples", quantity: 12, price_per_unit: 20, sale_date: new Date("2023-01-22") }
]);

// Step 3: Define the Map and Reduce Functions

// Map function: Emit the product as the key and the total sale amount as the value
let mapFunction = function() {
    let totalSale = this.quantity * this.price_per_unit;
    emit(this.product, totalSale);
};

// Reduce function: Sum up all sales for each product
let reduceFunction = function(key, values) {
    return Array.sum(values);
};

// Step 4: Perform the MapReduce Operation

// Total revenue per product
db.Sales.mapReduce(
    mapFunction,
    reduceFunction,
    { out: "TotalRevenuePerProduct" }
);

// Step 5: Display the Results
print("Total revenue generated per product:");
db.TotalRevenuePerProduct.find().forEach(printjson);
