// 18. Create Instructor collection and execute following queries
// a. Display details of instructor whose City has substring n
//  b. Find details of instructor whose Dept has substring mec and h
//  c. Find out instructor id, first name, department name along with salary 
// where salary< 50000 and status is approved
//  d. Find out details of instructors who have salary<30000


// 1. Create and use the 'university' database
use UniversityDB;

// 2. Create the 'instructors' collection with sample data (assuming ids are numeric and City, Dept are added)
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

// a. Display details of instructor whose City has substring 'n'
print("Instructors whose city has 'n' as substring:");
db.instructors.find({
    city: { $regex: "n", $options: "i" }
}).pretty();

// b. Find details of instructor whose Dept has substring 'mec' and 'h'
print("Instructors whose department has 'mec' and 'h' as substrings:");
db.instructors.find({
    department: { $regex: "mec.*h", $options: "i" }
}).pretty();

// c. Find out instructor id, first name, department name along with salary where salary< 50000 and status is approved
print("Instructors with salary < 50000 and status 'approved':");
db.instructors.find({
    salary: { $lt: 50000 },
    status: "approved"
}, {
    instructor_id: 1,
    name: 1,
    department: 1,
    salary: 1
}).pretty();

// d. Find out details of instructors who have salary < 30000
print("Instructors with salary < 30000:");
db.instructors.find({
    salary: { $lt: 30000 }
}).pretty();
