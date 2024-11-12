// 16. Create Instructor collection and execute following queries
//  a. Display the documents in ascending order
//  b. Display the details of instructor whose first name is Saurabh
//  c. Display first 5 documents of instructor collection
//  d. Add one more phone to id 1 (AddtoSet)

// 1. Create and use the 'university' database
use UniversityDB;

// 2. Create the 'instructors' collection with sample data
db.instructors.insertMany([
    { instructor_id: "I001", name: "Saurabh Gupta", department: "IT", salary: 50000, status: "approved", phone: ["9876543210"] },
    { instructor_id: "I002", name: "Anita Desai", department: "Comp", salary: 35000, status: "approved", phone: ["9887654321"] },
    { instructor_id: "I003", name: "Vikram Singh", department: "IT", salary: 55000, status: "approved", phone: ["9998765432"] },
    { instructor_id: "I004", name: "Sandeep Sharma", department: "IT", salary: 45000, status: "not approved", phone: ["9876567890"] },
    { instructor_id: "I005", name: "Meera Joshi", department: "Comp", salary: 38000, status: "approved", phone: ["9834567890"] },
    { instructor_id: "I006", name: "Anil Gupta", department: "HR", salary: 42000, status: "approved", phone: ["9822334455"] },
    { instructor_id: "I007", name: "Priya Reddy", department: "IT", salary: 47000, status: "approved", phone: ["9801234567"] }
]);

// 3. Queries

// a. Display the documents in ascending order based on the instructor's name
print("Instructors in ascending order by name:");
db.instructors.find().sort({ name: 1 }).pretty();

// b. Display the details of instructor whose first name is Saurabh
print("Instructor with first name 'Saurabh':");
db.instructors.find({ name: /^Saurabh/ }).pretty();

// c. Display the first 5 documents of the instructor collection
print("First 5 instructors:");
db.instructors.find().limit(5).pretty();

// d. Add one more phone number to the instructor with instructor_id "I001" (using $addToSet to avoid duplicates)
print("Adding phone to instructor I001:");
db.instructors.updateOne(
    { instructor_id: "I001" },
    { $addToSet: { phone: "9911223344" } }
);

// Verify the updated document for instructor I001
print("Updated details of instructor I001:");
db.instructors.find({ instructor_id: "I001" }).pretty();
