// 20. Create Instructor collection and execute following queries
// a. Find out details of instructors having salary >40000 and < 80000
// b. Display the details of instructors who are living in Maharashtra
// c. Find out details of instructors working in AIML department
// d. Find instructor id along with department and salary where department 
// has substring o


// 1. Use the 'university' database
use UniversityDB;

// 2. Create the 'instructors' collection with sample data (if not already created)
db.instructors.insertMany([
    { instructor_id: 1, name: "Saurabh Gupta", department: "IT", city: "New Delhi", salary: 50000, status: "approved", phone: ["9876543210"], state: "Delhi" },
    { instructor_id: 2, name: "Anita Desai", department: "Mechanical", city: "Chennai", salary: 35000, status: "approved", phone: ["9887654321"], state: "Tamil Nadu" },
    { instructor_id: 3, name: "Vikram Singh", department: "IT", city: "Bengaluru", salary: 55000, status: "approved", phone: ["9998765432"], state: "Karnataka" },
    { instructor_id: 4, name: "Sandeep Sharma", department: "Mechanical", city: "Mumbai", salary: 45000, status: "not approved", phone: ["9876567890"], state: "Maharashtra" },
    { instructor_id: 5, name: "Meera Joshi", department: "AIML", city: "Pune", salary: 38000, status: "approved", phone: ["9834567890"], state: "Maharashtra" },
    { instructor_id: 6, name: "Anil Gupta", department: "HR", city: "Pune", salary: 42000, status: "approved", phone: ["9822334455"], state: "Maharashtra" },
    { instructor_id: 7, name: "Priya Reddy", department: "AIML", city: "Mumbai", salary: 65000, status: "approved", phone: ["9801234567"], state: "Maharashtra" },
    { instructor_id: 8, name: "Rajesh Kumar", department: "IT", city: "Noida", salary: 70000, status: "approved", phone: ["9701234567"], state: "Uttar Pradesh" }
]);

// 3. Queries

// a. Find out details of instructors having salary > 40000 and < 80000
print("Instructors with salary > 40000 and < 80000:");
db.instructors.find({
    salary: { $gt: 40000, $lt: 80000 }
}).pretty();

// b. Display the details of instructors who are living in Maharashtra
print("Instructors living in Maharashtra:");
db.instructors.find({
    state: "Maharashtra"
}).pretty();

// c. Find out details of instructors working in AIML department
print("Instructors working in AIML department:");
db.instructors.find({
    department: "AIML"
}).pretty();

// d. Find instructor id along with department and salary where department has substring 'o'
print("Instructors with department containing 'o':");
db.instructors.find({
    department: { $regex: /o/, $options: "i" }
}, {
    instructor_id: 1,
    department: 1,
    salary: 1
}).pretty();
