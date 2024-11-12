// 7. Create library database (using mongodb)
//  List the books of management subjects.
//  List the books whose publication is “Pearson”
//  List the number of journals.
//  List the number of books which price is less than rs.500.
//  Find the total investment for IT dept (IT books)

// 1. Create and use the LibraryDB database
use LibraryDB;

// 2. Create the 'Books' collection and insert sample data
db.Books.insertMany([
    { book_id: 1, title: "Management Principles", subject: "Management", publication: "Pearson", price: 450, type: "book" },
    { book_id: 2, title: "Advanced IT Concepts", subject: "IT", publication: "McGraw-Hill", price: 650, type: "book" },
    { book_id: 3, title: "Finance for Managers", subject: "Management", publication: "Pearson", price: 550, type: "book" },
    { book_id: 4, title: "Modern Marketing", subject: "Management", publication: "SAGE", price: 400, type: "book" },
    { book_id: 5, title: "Computer Networks", subject: "IT", publication: "Pearson", price: 700, type: "book" },
    { book_id: 6, title: "Data Structures", subject: "IT", publication: "O'Reilly", price: 300, type: "book" },
    { book_id: 7, title: "Research Journal of IT", subject: "IT", publication: "Springer", price: 200, type: "journal" },
    { book_id: 8, title: "Journal of Business Management", subject: "Management", publication: "Elsevier", price: 250, type: "journal" },
    { book_id: 9, title: "Organizational Behavior", subject: "Management", publication: "Pearson", price: 480, type: "book" },
    { book_id: 10, title: "Introduction to Algorithms", subject: "IT", publication: "MIT Press", price: 800, type: "book" }
]);

// 3. Execute the required queries

// 3.1 List the books of management subjects
print("Books of Management Subjects:");
db.Books.find({ subject: "Management", type: "book" }).forEach(printjson);

// 3.2 List the books whose publication is "Pearson"
print("Books with Pearson Publication:");
db.Books.find({ publication: "Pearson", type: "book" }).forEach(printjson);

// 3.3 List the number of journals
print("Number of Journals:");
let journalCount = db.Books.countDocuments({ type: "journal" });
print(journalCount);

// 3.4 List the number of books with price less than Rs.500
print("Number of Books with Price Less Than Rs. 500:");
let affordableBooksCount = db.Books.countDocuments({ price: { $lt: 500 }, type: "book" });
print(affordableBooksCount);

// 3.5 Find the total investment for IT department (IT books)
print("Total Investment for IT Department (IT Books):");
let totalInvestmentIT = db.Books.aggregate([
    { $match: { subject: "IT", type: "book" } },
    { $group: { _id: null, totalInvestment: { $sum: "$price" } } }
]).toArray()[0].totalInvestment;
print(totalInvestmentIT);
