// 14. Create author database(Using Mongodb)-Using author_id, title, name, 
// description, url,likes.
//   To display a list stating how many tutorials are written by each user
//   To display author names where the author field equals “Kahate”
//   To display all author names in ascending & descending order
//   To calculate maximum& minimum value of book title

// 1. Create and use the 'author' database
use AuthorDB;

// 2. Create the 'authors' collection with sample data
db.authors.insertMany([
    { author_id: "A001", title: "MongoDB Basics", name: "Rajesh Kumar", description: "Introduction to MongoDB and its basics.", url: "https://example.com/mongodb-basics", likes: 120 },
    { author_id: "A002", title: "Advanced MongoDB", name: "Anita Kahate", description: "Detailed insights into advanced MongoDB features.", url: "https://example.com/advanced-mongodb", likes: 200 },
    { author_id: "A003", title: "Web Development with MongoDB", name: "Sandeep Sharma", description: "Using MongoDB for full-stack web development.", url: "https://example.com/webdev-mongodb", likes: 150 },
    { author_id: "A004", title: "Data Modeling in MongoDB", name: "Vikram Singh", description: "Comprehensive guide to data modeling in MongoDB.", url: "https://example.com/data-modeling", likes: 95 },
    { author_id: "A005", title: "MongoDB Performance Tuning", name: "Anita Kahate", description: "Optimizing MongoDB performance for large datasets.", url: "https://example.com/performance-tuning", likes: 180 },
    { author_id: "A006", title: "MongoDB Security Best Practices", name: "Rajesh Kumar", description: "A guide on securing MongoDB databases.", url: "https://example.com/security-best-practices", likes: 160 }
]);

// 3. Queries

// Query 1: Display a list of how many tutorials are written by each user
print("Number of tutorials written by each user:");
db.authors.aggregate([
    { $group: { _id: "$name", tutorial_count: { $sum: 1 } } },
    { $project: { _id: 0, author: "$_id", tutorial_count: 1 } }
]).pretty();

// Query 2: Display author names where the name is "Kahate"
print("Authors with the last name Kahate:");
db.authors.find({ name: { $regex: "Kahate$", $options: "i" } }, { name: 1, _id: 0 }).pretty();

// Query 3: Display all author names in ascending order
print("Authors in ascending order:");
db.authors.find({}, { name: 1, _id: 0 }).sort({ name: 1 }).pretty();

// Query 3: Display all author names in descending order
print("Authors in descending order:");
db.authors.find({}, { name: 1, _id: 0 }).sort({ name: -1 }).pretty();

// Query 4: Calculate the maximum and minimum value of book titles (alphabetically)
print("Maximum and minimum values of book titles:");
db.authors.aggregate([
    {
        $group: {
            _id: null,
            maxTitle: { $max: "$title" },
            minTitle: { $min: "$title" }
        }
    },
    { $project: { _id: 0, maxTitle: 1, minTitle: 1 } }
]).pretty();
