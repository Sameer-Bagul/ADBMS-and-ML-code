// 17. Create Instructor collection and execute following queries
// a. Find Instructor with id 1,2,3
// b. Find details of instructor except 1,2,3
// c. Find instructor whose salary is neither < 50000 nor department is 
// computer
// d. Display details of instructor dept has substring e


// 1. Create and use the 'university' database
use UniversityDB;

// 2. Create the 'instructors' collection with sample data (assuming ids are numeric)
db.instructors.insertMany([
    { instructor_id: 1, name: "Saurabh Gupta", department: "IT", salary: 50000, status: "approved", phone: ["9876543210"] },
    { instructor_id: 2, name: "Anita Desai", department: "Comp", salary: 35000, status: "approved", phone: ["9887654321"] },
    { instructor_id: 3, name: "Vikram Singh", department: "IT", salary: 55000, status: "approved", phone: ["9998765432"] },
    { instructor_id: 4, name: "Sandeep Sharma", department: "IT", salary: 45000, status: "not approved", phone: ["9876567890"] },
    { instructor_id: 5, name: "Meera Joshi", department: "Comp", salary: 38000, status: "approved", phone: ["9834567890"] },
    { instructor_id: 6, name: "Anil Gupta", department: "HR", salary: 42000, status: "approved", phone: ["9822334455"] },
    { instructor_id: 7, name: "Priya Reddy", department: "IT", salary: 47000, status: "approved", phone: ["9801234567"] }
]);

// 3. Queries

// a. Find Instructor with id 1,2,3
print("Instructors with id 1, 2, and 3:");
db.instructors.find({ instructor_id: { $in: [1, 2, 3] } }).pretty();

// b. Find details of instructors except 1,2,3
print("Instructors except id 1, 2, and 3:");
db.instructors.find({ instructor_id: { $nin: [1, 2, 3] } }).pretty();

// c. Find instructor whose salary is neither < 50000 nor department is Computer
print("Instructors whose salary is neither < 50000 nor department is Computer:");
db.instructors.find({ 
    salary: { $not: { $lt: 50000 } },
    department: { $ne: "Comp" }
}).pretty();

// d. Display details of instructors whose department has substring 'e'
print("Instructors whose department contains 'e':");
db.instructors.find({
    department: { $regex: "e", $options: "i" }
}).pretty();
