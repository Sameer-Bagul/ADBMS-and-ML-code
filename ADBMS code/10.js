// 10. Execute at least 10 queries on any suitable MongoDB database that demonstrates 
// following:    a. $ where queries 
// b. Cursors (Limits, skips, sorts, advanced query options)
//  c.
//  Database commands

// 1. Create and use the Employees database
use Employees;

// 2. Create the Employee collection and insert sample documents
db.Employee.insertMany([
    { name: "Ankit Gupta", age: 30, position: "Software Engineer", salary: 70000, department: "IT", joining_date: new Date("2018-02-15"), active: true },
    { name: "Megha Sharma", age: 40, position: "Project Manager", salary: 90000, department: "IT", joining_date: new Date("2017-07-10"), active: true },
    { name: "Raj Patel", age: 28, position: "Data Analyst", salary: 65000, department: "Analytics", joining_date: new Date("2019-09-25"), active: true },
    { name: "Priya Desai", age: 35, position: "HR Manager", salary: 80000, department: "HR", joining_date: new Date("2015-03-18"), active: false },
    { name: "Suresh Kumar", age: 29, position: "Marketing Specialist", salary: 60000, department: "Marketing", joining_date: new Date("2020-05-20"), active: true }
]);

// Queries

// a. $where Queries (using JavaScript expressions)

// 3. Find employees older than 30 using $where
print("Employees older than 30:");
db.Employee.find({ $where: "this.age > 30" }).pretty();

// 4. Find employees whose names start with "P" using $where and regex
print("Employees whose names start with 'P':");
db.Employee.find({ $where: "this.name.startsWith('P')" }).pretty();

// 5. Find employees with salaries greater than their age * 2000 using $where
print("Employees with salaries greater than twice their age * 1000:");
db.Employee.find({ $where: "this.salary > this.age * 2000" }).pretty();


// b. Cursors (Limits, Skips, Sorts, and Advanced Options)

// 6. Retrieve the first 3 employees (using limit)
print("First 3 employees:");
db.Employee.find().limit(3).pretty();

// 7. Skip the first 2 employees and display the next set
print("Skip the first 2 employees and display the next:");
db.Employee.find().skip(2).pretty();

// 8. Sort employees by salary in descending order
print("Employees sorted by salary in descending order:");
db.Employee.find().sort({ salary: -1 }).pretty();

// 9. Combine limit, skip, and sort - display the top 2 highest-paid employees after skipping the first
print("Top 2 highest-paid employees after skipping the first:");
db.Employee.find().sort({ salary: -1 }).skip(1).limit(2).pretty();


// c. Database Commands

// 10. Count total number of employees in the IT department
print("Count of employees in the IT department:");
let countIT = db.Employee.countDocuments({ department: "IT" });
print("IT Department Employee Count:", countIT);

// 11. Get distinct positions held by employees
print("Distinct positions held by employees:");
db.Employee.distinct("position");

// 12. Calculate the average salary of all employees
print("Average salary of all employees:");
db.Employee.aggregate([
    { $group: { _id: null, averageSalary: { $avg: "$salary" } } }
]);

// 13. Rename the 'position' field to 'job_title' in the Employee collection
print("Renaming 'position' field to 'job_title':");
db.Employee.updateMany({}, { $rename: { "position": "job_title" } });
print("Field renamed successfully!");

// 14. Check the storage size of the Employee collection
print("Storage size of Employee collection:");
db.runCommand({ collStats: "Employee" }).storageSize;

// 15. Create an index on the department field
print("Creating index on department field:");
db.Employee.createIndex({ department: 1 });
print("Index created on department field.");

// 16. Drop the index created on the department field
print("Dropping index on department field:");
db.Employee.dropIndex("department_1");
print("Index dropped successfully.");
