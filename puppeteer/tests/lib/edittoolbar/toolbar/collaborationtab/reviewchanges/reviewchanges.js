// Include the ReviewChanges library
const { ReviewChanges } = require("lib");

// Open the file new.docx
Tester.createFile("docx");

// Click on default Track Changes button
ReviewChanges.trackChanges();

// Select "ON for me and everyone" option from the list
ReviewChanges.trackChanges("ON for me and everyone");

// Enable track changes for everyone (in modal window)
// if true - click enable else click cancel
ReviewChanges.enableTrackChangesForEveryone(true);

// Input text to the document
Tester.input("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
Tester.keyDown("Enter");
Tester.input("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.");

// Step back 3 times (to the first change)
ReviewChanges.previous();
ReviewChanges.previous();
ReviewChanges.previous();

// Click to accept current change
ReviewChanges.accept("Accept current change");

// Step forward 3 times (to the last change)
ReviewChanges.next();
ReviewChanges.next();
ReviewChanges.next();

// Click to reject current change
ReviewChanges.reject("Reject current change");

// Close the test example
Tester.close();
