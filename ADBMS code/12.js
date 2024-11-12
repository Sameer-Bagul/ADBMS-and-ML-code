// 12. Create teacher database which contains the information of teacherid, name, 
// department, salary and status of teacher (Approved/not approved). Design and 
// implement any ten queries using mongodb


// 1. Create and use a new database
use UniversityDB;

// 2. Create the Teachers collection with sample data
db.Teachers.insertMany([
    { teacher_id: 1, name: "Anjali Deshmukh", department: "IT", salary: 60000, status: "Approved" },
    { teacher_id: 2, name: "Rakesh Patil", department: "Computer Science", salary: 55000, status: "Not Approved" },
    { teacher_id: 3, name: "Meena Joshi", department: "Math", salary: 45000, status: "Approved" },
    { teacher_id: 4, name: "Amit Shinde", department: "IT", salary: 65000, status: "Approved" },
    { teacher_id: 5, name: "Vijay Kulkarni", department: "Physics", salary: 47000, status: "Not Approved" },
    { teacher_id: 6, name: "Priya Kale", department: "Computer Science", salary: 52000, status: "Approved" },
    { teacher_id: 7, name: "Sunil Pawar", department: "Math", salary: 60000, status: "Approved" },
    { teacher_id: 8, name: "Kiran Jadhav", department: "Physics", salary: 35000, status: "Not Approved" },
    { teacher_id: 9, name: "Rohit Desai", department: "IT", salary: 28000, status: "Approved" },
    { teacher_id: 10, name: "Sneha Naik", department: "Biology", salary: 62000, status: "Approved" },
]);

// Part 3: Queries

// Query 1: Find all teachers in the IT department
print("Teachers in the IT department:");
db.Teachers.find({ department: "IT" }).pretty();

// Query 2: Find all teachers who have a salary greater than 50000
print("Teachers with salary greater than 50000:");
db.Teachers.find({ salary: { $gt: 50000 } }).pretty();

// Query 3: List all teachers in descending order by salary
print("Teachers sorted by salary (descending):");
db.Teachers.find().sort({ salary: -1 }).pretty();

// Query 4: Remove the teachers who have a status of 'Not Approved'
print("Removing teachers with status 'Not Approved':");
db.Teachers.deleteMany({ status: "Not Approved" });
db.Teachers.find().pretty();

// Query 5: Give an increment of 20000 to teachers whose salary is less than 30000
print("Increment salary by 20000 for teachers earning less than 30000:");
db.Teachers.updateMany(
    { salary: { $lt: 30000 } },
    { $inc: { salary: 20000 } }
);
db.Teachers.find({ salary: { $gte: 30000 } }).pretty();

// Query 6: Find a teacher by their teacher_id (e.g., teacher_id = 4)
print("Finding teacher with teacher_id 4:");
db.Teachers.findOne({ teacher_id: 4 });

// Query 7: Count the number of teachers in the Computer Science department
print("Number of teachers in Computer Science department:");
db.Teachers.countDocuments({ department: "Computer Science" });

// Query 8: Find all approved teachers and sort them by name
print("List of approved teachers sorted by name:");
db.Teachers.find({ status: "Approved" }).sort({ name: 1 }).pretty();

// Query 9: Display the total salary expenditure of the IT department
print("Total salary expenditure for IT department:");
db.Teachers.aggregate([
    { $match: { department: "IT" } },
    { $group: { _id: "$department", totalSalary: { $sum: "$salary" } } }
]);

// Query 10: Check if there is any teacher with a salary exactly equal to 45000
print("Checking for any teacher with salary exactly 45000:");
db.Teachers.find({ salary: 45000 }).pretty();
