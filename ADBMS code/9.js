// 9. Create a database Execute at least 10 queries on any suitable MongoDB 
// database that demonstrates following querying techniques: 
// a. find and findOne (specific values) 
// b. Query criteria (Query conditionals, OR queries, $not, Conditional 
// semantics)
//  c. Type-specific queries (Null, Regular expression, Querying arrays)



// 1. Create and use the School database
use School;

// 2. Create the Students collection and insert sample documents
db.Students.insertMany([
    { name: "Amit Sharma", age: 15, class: 10, subjects: ["Math", "Science", "English"], address: { city: "Pune", state: "Maharashtra" }, status: "active" },
    { name: "Sneha Desai", age: 16, class: 11, subjects: ["Math", "Biology"], address: { city: "Mumbai", state: "Maharashtra" }, status: "inactive" },
    { name: "Rakesh Mehta", age: 14, class: 9, subjects: ["History", "Geography", "Math"], address: { city: "Nashik", state: "Maharashtra" }, status: "active" },
    { name: "Priya Kothari", age: 17, class: 12, subjects: ["Physics", "Chemistry", "Math"], address: { city: "Nagpur", state: "Maharashtra" }, status: "active" },
    { name: "Rahul Patil", age: 15, class: 10, subjects: ["English", "Computer Science"], address: { city: "Pune", state: "Maharashtra" }, status: "inactive" }
]);

// Queries

// 3a. find and findOne (specific values)
print("Find all students in class 10:");
db.Students.find({ class: 10 }).pretty();

print("Find one student who is in class 11:");
db.Students.findOne({ class: 11 });

// 3b. Query criteria (Query conditionals, OR queries, $not, Conditional semantics)

// Query with multiple conditions (e.g., students in class 10 or class 12)
print("Students in class 10 or 12:");
db.Students.find({ $or: [{ class: 10 }, { class: 12 }] }).pretty();

// Find students who are not active
print("Find students whose status is not 'active':");
db.Students.find({ status: { $not: { $eq: "active" } } }).pretty();

// Students with age greater than or equal to 16
print("Students with age >= 16:");
db.Students.find({ age: { $gte: 16 } }).pretty();

// Students who are either in class 10 or have 'English' as a subject
print("Students in class 10 or studying English:");
db.Students.find({
    $or: [
        { class: 10 },
        { subjects: "English" }
    ]
}).pretty();

// 3c. Type-specific queries (Null, Regular expression, Querying arrays)

// Find students with 'Math' in their subjects array
print("Students who study Math:");
db.Students.find({ subjects: "Math" }).pretty();

// Use a regular expression to find students whose city starts with 'P'
print("Students from cities starting with 'P':");
db.Students.find({ "address.city": { $regex: /^P/ } }).pretty();

// Find students who don't have an address field (using null)
print("Find students without an address field:");
db.Students.find({ address: null }).pretty();

// 3d. Additional queries for diversity

// Sort students by age in descending order
print("Students sorted by age in descending order:");
db.Students.find().sort({ age: -1 }).pretty();

// Count the number of students in class 10
print("Count of students in class 10:");
let countClass10 = db.Students.countDocuments({ class: 10 });
print("Number of students in class 10:", countClass10);
