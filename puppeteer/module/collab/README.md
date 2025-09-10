# Collab

This library provides a set of functions for creating users and simulating collaborative editing.

## How to Include

```javascript
const { Collab } = require("lib");
```

## Functionality

For more detailed information on the functionality, please refer to the [**Collab Functionality documentation**](/puppeteer/module/collab/FUNCTIONALITY.md).

## User

The user library simulates user editing. Users are created using collab.addUser(UserDetails, userFunction).

## Events

User events are created to transmit messages from one user to another. To create an event, you first need to define it using `attachEvent(eventName, eventFunction)`, and then trigger it using `dispatchEvent(eventName, data)`.

## About 'wait'

Using 'wait' with this library can be distinguished as follows:

1. `collab.wait()` - Using 'wait' in conjunction with Collab runs user scripts in parallel (scripts run simultaneously).
2. `user.wait()` - Using 'wait' with User starts the script specified first, i.e., the script for 'user1' is executed before 'user2' waits for the previous script to finish.

## Example Usage

Here's an example demonstrating how to use the functions provided by this module:

```javascript
// Opening a file for editing
Tester.openFile("docx/new.docx");
// Launching Collaborative Editing
let collab = Tester.startCollaboration();
// Add 'user1'
let user1 = collab.addUser(
    {
        name: "user1",
        firstName: "John",
        lastName: "Doe",
    },
    async function () {
        // Editing scenario for 'user1'
        Tester.input("Test1");
        Tester.keyDown("Shift");
        for (let i = 0; i < 5; i++) {
            Tester.keyPress("ArrowLeft");
        }
        // Triggering an event for 'user1' (event creation is marked *)
        Tester.dispatchEvent("onInputHW", {
            data: "hello",
        });
        Tester.keyUp("Shift");
        Tester.input("Test1");
        Tester.keyDown("Shift");
        for (let i = 0; i < 5; i++) {
            Tester.keyPress("ArrowLeft");
        }
        Tester.keyUp("Shift");
    }
);
// Add 'user2'
let user2 = collab.addUser(
    {
        name: "user2",
        firstName: "Jane",
        lastName: "Smith",
    },
    async function () {
        // Editing scenario for 'user2'
        Tester.input("Test2");
        Tester.keyDown("Shift");
        for (let i = 0; i < 5; i++) {
            Tester.keyPress("ArrowLeft");
        }
        Tester.keyUp("Shift");
        Tester.input("Test2");
        Tester.keyDown("Shift");
        for (let i = 0; i < 5; i++) {
            Tester.keyPress("ArrowLeft");
        }
        Tester.keyUp("Shift");
    }
);
//* Creating an event for 'user1'
user1.attachEvent("onInputHW", function (data) {
    user2.dispatchEvent("onInputHW", data);
});
//* Creating an event for 'user2'
user2.attachEvent("onInputHW", function (data) {
    console.log(data.data);
});

// Waiting for 'user1' scenario to complete
user1.wait();
// Waiting for 'user2' scenario to complete
user2.wait();
// Waiting for both 'user1' and 'user2' scenarios to complete
collab.wait();
// Closing the general test scenario
Tester.close();
```
