// 2. Place an order of any five products from computer Shoppe like – keyboard, 
// monitor mouse, printer, processor, switch, modem etc. and prepare a bill for the 
// same.

// Step 1: Create the Database
use ComputerShop;

// Step 2: Create 'Products' Collection and Insert Products
db.Products.insertMany([
    { product_id: 1, name: "Keyboard", price: 500 },
    { product_id: 2, name: "Monitor", price: 8000 },
    { product_id: 3, name: "Mouse", price: 300 },
    { product_id: 4, name: "Printer", price: 5000 },
    { product_id: 5, name: "Processor", price: 15000 },
    { product_id: 6, name: "Switch", price: 1200 },
    { product_id: 7, name: "Modem", price: 2500 }
]);

// Step 3: Create 'Orders' Collection and Place an Order with Five Products
db.Orders.insertOne({
    order_id: 101,
    customer_name: "Amit Verma",
    order_date: new Date(),
    items: [
        { product_id: 1, quantity: 2 },  // Keyboard
        { product_id: 2, quantity: 1 },  // Monitor
        { product_id: 3, quantity: 1 },  // Mouse
        { product_id: 4, quantity: 1 },  // Printer
        { product_id: 5, quantity: 1 }   // Processor
    ]
});

// Step 4: Generate a Bill for the Order
// Fetch the order details along with product information for each item
let order = db.Orders.findOne({ order_id: 101 });
let bill = {
    customer_name: order.customer_name,
    order_date: order.order_date,
    items: [],
    total_amount: 0
};

// Calculate bill amount and display product-wise billing
order.items.forEach(item => {
    let product = db.Products.findOne({ product_id: item.product_id });
    let amount = product.price * item.quantity;
    
    bill.items.push({
        product_name: product.name,
        unit_price: product.price,
        quantity: item.quantity,
        amount: amount
    });
    
    bill.total_amount += amount;
});

// Display the bill
print("Customer Name:", bill.customer_name);
print("Order Date:", bill.order_date);
print("\nItems Purchased:");
bill.items.forEach(item => {
    print("Product:", item.product_name, "| Unit Price:", item.unit_price, "| Quantity:", item.quantity, "| Amount:", item.amount);
});
print("\nTotal Amount:", bill.total_amount);
