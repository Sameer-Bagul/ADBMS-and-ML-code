// 15. Create Instructor collection and execute following queries
//  a. Find out details of instructors working in IT department
//  b. Find out details of instructors who have salary>40000
//  c. Give count of inst in comp dept
//  d. Give incrementof 10000 to instructor whose status is approved


// 1. Create and use the 'university' database
use UniversityDB;

// 2. Create the 'instructors' collection with sample data
db.instructors.insertMany([
    { instructor_id: "I001", name: "Rajesh Kumar", department: "IT", salary: 50000, status: "approved" },
    { instructor_id: "I002", name: "Anita Desai", department: "Comp", salary: 35000, status: "approved" },
    { instructor_id: "I003", name: "Vikram Singh", department: "IT", salary: 55000, status: "approved" },
    { instructor_id: "I004", name: "Sandeep Sharma", department: "IT", salary: 45000, status: "not approved" },
    { instructor_id: "I005", name: "Meera Joshi", department: "Comp", salary: 38000, status: "approved" },
    { instructor_id: "I006", name: "Anil Gupta", department: "HR", salary: 42000, status: "approved" },
    { instructor_id: "I007", name: "Priya Reddy", department: "IT", salary: 47000, status: "approved" }
]);

// 3. Queries

// a. Find out details of instructors working in IT department
print("Instructors in IT department:");
db.instructors.find({ department: "IT" }).pretty();

// b. Find out details of instructors who have salary > 40000
print("Instructors with salary greater than 40000:");
db.instructors.find({ salary: { $gt: 40000 } }).pretty();

// c. Give count of instructors in Comp department
print("Count of instructors in Comp department:");
db.instructors.countDocuments({ department: "Comp" });

// d. Give increment of 10000 to instructor whose status is approved
print("Giving increment of 10000 to instructors with 'approved' status:");
db.instructors.updateMany(
    { status: "approved" },
    { $inc: { salary: 10000 } }
);

// Verify the increment (you can check specific instructors or all)
print("Updated salary details:");
db.instructors.find({ status: "approved" }).pretty();
