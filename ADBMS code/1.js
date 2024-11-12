// 1. Create table Tutorial(
//     MongoDB
//     tutorial_id,tut_title,author,submission_date) using 
//    Implement following operation on above table
//     1)Insert
//     2)Update
//     3)Delete
//     4)Display all the tutorial details
//     5)Find specific tutorial_id and author of respective tutorial.
//     6)Display all the records of tutorial where author name starts with”Sa”
//     7)Display all tutorials in Ascending and Descending order according to 
//    tutorial_id or author name.


// Step 1: Create the Database
use TutorialDB;  // This will switch to TutorialDB database or create it if it doesn’t exist

// Step 2: Create and Insert Initial Data into the 'Tutorial' Collection
db.Tutorial.insertMany([
    { tutorial_id: 1, tut_title: "Introduction to MongoDB", author: "Sameer Kumar", submission_date: new Date("2023-01-10") },
    { tutorial_id: 2, tut_title: "Advanced MongoDB Queries", author: "Sakshi Patel", submission_date: new Date("2023-02-15") },
    { tutorial_id: 3, tut_title: "MongoDB Aggregation", author: "Rajesh Singh", submission_date: new Date("2023-03-12") },
    { tutorial_id: 4, tut_title: "NoSQL Basics", author: "Santosh Verma", submission_date: new Date("2023-04-18") },
    { tutorial_id: 5, tut_title: "Database Design", author: "Sanya Gupta", submission_date: new Date("2023-05-25") }
]);

// Step 3: Perform the Required Operations

// 1) Insert a New Tutorial Document
db.Tutorial.insertOne({
    tutorial_id: 6,
    tut_title: "MongoDB Indexing",
    author: "Sara Shah",
    submission_date: new Date("2023-06-30")
});

// 2) Update a Tutorial Document (Update title of tutorial with tutorial_id 2)
db.Tutorial.updateOne(
    { tutorial_id: 2 },
    { $set: { tut_title: "Advanced MongoDB Features" } }
);

// 3) Delete a Tutorial Document (Delete document with tutorial_id 5)
db.Tutorial.deleteOne({ tutorial_id: 5 });

// 4) Display All Tutorial Details
db.Tutorial.find().pretty();

// 5) Find Specific tutorial_id and author for a Given Tutorial Title
db.Tutorial.find(
    { tut_title: "MongoDB Aggregation" },
    { tutorial_id: 1, author: 1, _id: 0 }
);

// 6) Display All Records Where Author Name Starts with "Sa"
db.Tutorial.find(
    { author: { $regex: "^Sa", $options: "i" } }
);

// 7) Display All Tutorials in Ascending and Descending Order
// a) Ascending order by tutorial_id
db.Tutorial.find().sort({ tutorial_id: 1 });

// b) Descending order by tutorial_id
db.Tutorial.find().sort({ tutorial_id: -1 });

// c) Ascending order by author name
db.Tutorial.find().sort({ author: 1 });

// d) Descending order by author name
db.Tutorial.find().sort({ author: -1 });
