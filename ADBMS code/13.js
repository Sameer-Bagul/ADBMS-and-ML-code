// 13. Createdatabase of 'restaurants' collection(Using mongodb)
//  To display the fields restaurant_id, name and cuisine for all the documents 
// in the collection restaurant.
//   To find the restaurants that do not prepare any cuisine of 'London' and 
// their grade score more than 70
//   to find the restaurant Id, name, and cuisine for those restaurants which 
// contain 'esh' as last three letters for its name
//   To display all the documents in the collection restaurants.

// 1. Create and use the 'restaurants' database
use RestaurantsDB;

// 2. Create the 'restaurants' collection with sample data
db.restaurants.insertMany([
    { restaurant_id: "R101", name: "Spices and Delights", cuisine: "Indian", location: "Mumbai", grades: [{ score: 85 }] },
    { restaurant_id: "R102", name: "London Treats", cuisine: "Italian", location: "London", grades: [{ score: 90 }] },
    { restaurant_id: "R103", name: "Ocean Fish", cuisine: "Seafood", location: "New York", grades: [{ score: 75 }] },
    { restaurant_id: "R104", name: "Fresh Bites", cuisine: "Fast Food", location: "London", grades: [{ score: 65 }] },
    { restaurant_id: "R105", name: "Nourish", cuisine: "Vegan", location: "California", grades: [{ score: 80 }] },
    { restaurant_id: "R106", name: "Bites and More", cuisine: "Mexican", location: "Chicago", grades: [{ score: 82 }] },
    { restaurant_id: "R107", name: "Taste of Esh", cuisine: "Turkish", location: "Berlin", grades: [{ score: 78 }] },
    { restaurant_id: "R108", name: "Pure Refresh", cuisine: "Italian", location: "Paris", grades: [{ score: 88 }] },
]);

// Part 3: Queries

// Query 1: Display the fields restaurant_id, name, and cuisine for all documents in the collection
print("Displaying restaurant_id, name, and cuisine for all documents:");
db.restaurants.find({}, { restaurant_id: 1, name: 1, cuisine: 1, _id: 0 }).pretty();

// Query 2: Find restaurants that do not prepare any cuisine in 'London' and their grade score is more than 70
print("Restaurants not in London with grade score > 70:");
db.restaurants.find({
    location: { $ne: "London" },
    "grades.score": { $gt: 70 }
}).pretty();

// Query 3: Find restaurant_id, name, and cuisine for those restaurants with names ending in 'esh'
print("Restaurants with names ending in 'esh':");
db.restaurants.find(
    { name: { $regex: "esh$", $options: "i" } },
    { restaurant_id: 1, name: 1, cuisine: 1, _id: 0 }
).pretty();

// Query 4: Display all documents in the 'restaurants' collection
print("Displaying all documents in the restaurants collection:");
db.restaurants.find().pretty();
