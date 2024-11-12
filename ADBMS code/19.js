// 19. Create Instructor collection and execute following queries
// a. Delete details of instructor having salary < 30000
// b. Find instructors with either salary<50000 or deparment is computer
// c. Find out details of instructors who have salary==50000
// d. Find employee id, first name, along with salary where salary>50000



// 1. Use the 'university' database
use UniversityDB;

// 2. Create the 'instructors' collection with sample data (if not already created)
db.instructors.insertMany([
    { instructor_id: 1, name: "Saurabh Gupta", department: "IT", city: "New Delhi", salary: 50000, status: "approved", phone: ["9876543210"] },
    { instructor_id: 2, name: "Anita Desai", department: "Mechanical", city: "Chennai", salary: 35000, status: "approved", phone: ["9887654321"] },
    { instructor_id: 3, name: "Vikram Singh", department: "IT", city: "Bengaluru", salary: 55000, status: "approved", phone: ["9998765432"] },
    { instructor_id: 4, name: "Sandeep Sharma", department: "Mechanical", city: "Mumbai", salary: 45000, status: "not approved", phone: ["9876567890"] },
    { instructor_id: 5, name: "Meera Joshi", department: "Computer", city: "Noida", salary: 38000, status: "approved", phone: ["9834567890"] },
    { instructor_id: 6, name: "Anil Gupta", department: "HR", city: "Pune", salary: 42000, status: "approved", phone: ["9822334455"] },
    { instructor_id: 7, name: "Priya Reddy", department: "IT", city: "Kolkata", salary: 47000, status: "approved", phone: ["9801234567"] }
]);

// 3. Queries

// a. Delete details of instructor having salary < 30000
print("Deleting instructors with salary < 30000:");
db.instructors.deleteMany({
    salary: { $lt: 30000 }
});

// b. Find instructors with either salary < 50000 or department is 'Computer'
print("Instructors with salary < 50000 or department is 'Computer':");
db.instructors.find({
    $or: [
        { salary: { $lt: 50000 } },
        { department: "Computer" }
    ]
}).pretty();

// c. Find out details of instructors who have salary == 50000
print("Instructors with salary == 50000:");
db.instructors.find({
    salary: 50000
}).pretty();

// d. Find employee id, first name, along with salary where salary > 50000
print("Instructors with salary > 50000:");
db.instructors.find({
    salary: { $gt: 50000 }
}, {
    instructor_id: 1,
    name: 1,
    salary: 1
}).pretty();
