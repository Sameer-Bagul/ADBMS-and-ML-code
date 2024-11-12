// 6. Create university database (using mongodb)
//   Find the list of teachers in IT dept.
//   Find the list of teachers who have salary greater than 50000.
//   Find the teacher’s list in descending order.
//   Remove the teacher whose status is not approved.
//   Give the increment of rs.20000 who has salary less than 30000

// Step 1: Create the Database
use UniversityDB;

// Step 2: Create 'Teachers' Collection and Insert Sample Data
db.Teachers.insertMany([
    { teacher_id: 1, name: "Dr. Ankit Sharma", department: "IT", salary: 45000, status: "approved" },
    { teacher_id: 2, name: "Prof. Priya Verma", department: "Maths", salary: 52000, status: "approved" },
    { teacher_id: 3, name: "Dr. Rajeev Kumar", department: "IT", salary: 35000, status: "not approved" },
    { teacher_id: 4, name: "Dr. Neha Agarwal", department: "IT", salary: 60000, status: "approved" },
    { teacher_id: 5, name: "Prof. Sandeep Joshi", department: "Physics", salary: 48000, status: "approved" },
    { teacher_id: 6, name: "Dr. Rina Patel", department: "IT", salary: 28000, status: "approved" },
    { teacher_id: 7, name: "Prof. Karan Desai", department: "Chemistry", salary: 55000, status: "approved" }
]);

// Step 3: Execute Queries

// 1) Find the list of teachers in the IT department
let itDeptTeachers = db.Teachers.find({ department: "IT" });
print("Teachers in IT Department:");
itDeptTeachers.forEach(printjson);

// 2) Find the list of teachers who have salary greater than 50000
let highSalaryTeachers = db.Teachers.find({ salary: { $gt: 50000 } });
print("Teachers with salary greater than 50000:");
highSalaryTeachers.forEach(printjson);

// 3) Find the teacher’s list in descending order by salary
let descendingSalaryTeachers = db.Teachers.find().sort({ salary: -1 });
print("Teachers sorted by salary (Descending):");
descendingSalaryTeachers.forEach(printjson);

// 4) Remove the teacher whose status is not approved
db.Teachers.deleteMany({ status: "not approved" });
print("Teachers with 'not approved' status have been removed.");

// 5) Give an increment of rs.20000 to teachers who have salary less than 30000
db.Teachers.updateMany(
    { salary: { $lt: 30000 } },
    { $inc: { salary: 20000 } }
);
print("Salary increment of Rs. 20000 has been applied to teachers with salary less than 30000.");
