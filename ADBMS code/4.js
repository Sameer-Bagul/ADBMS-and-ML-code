// 4. For student database execute following queries:----
// Find the record of the students who has got the highest marks in DBMS 
// subject.
// Find the average result of TOC subject.
// Find the record of the students who has got the lowest marks in CNT subject.
// Find the total number of students who scored first class.

// Step 1: Create the Database
use StudentDB;

// Step 2: Create 'Students' Collection and Insert Sample Data
db.Students.insertMany([
    { student_id: 1, name: "Amit Verma", marks: { DBMS: 85, TOC: 75, CNT: 60 }, class: "First Class" },
    { student_id: 2, name: "Sakshi Patel", marks: { DBMS: 92, TOC: 80, CNT: 55 }, class: "First Class" },
    { student_id: 3, name: "Rajesh Singh", marks: { DBMS: 78, TOC: 65, CNT: 70 }, class: "Second Class" },
    { student_id: 4, name: "Santosh Verma", marks: { DBMS: 88, TOC: 85, CNT: 62 }, class: "First Class" },
    { student_id: 5, name: "Sanya Gupta", marks: { DBMS: 68, TOC: 70, CNT: 50 }, class: "Second Class" }
]);

// Step 3: Execute Queries

// 1) Find the record of the student who has got the highest marks in DBMS
let highestDBMSMark = db.Students.find().sort({ "marks.DBMS": -1 }).limit(1);
print("Student with the highest marks in DBMS:");
highestDBMSMark.forEach(printjson);

// 2) Find the average result of TOC subject
let avgTOC = db.Students.aggregate([
    { $group: { _id: null, avgTOC: { $avg: "$marks.TOC" } } },
    { $project: { _id: 0, avgTOC: 1 } }
]);
print("Average result in TOC subject:");
avgTOC.forEach(printjson);

// 3) Find the record of the student who has got the lowest marks in CNT
let lowestCNTMark = db.Students.find().sort({ "marks.CNT": 1 }).limit(1);
print("Student with the lowest marks in CNT:");
lowestCNTMark.forEach(printjson);

// 4) Find the total number of students who scored first class
let firstClassCount = db.Students.find({ class: "First Class" }).count();
print("Total number of students who scored first class:", firstClassCount);
