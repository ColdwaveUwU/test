# Collab

The [**Collab**](/puppeteer/module/collab/README.md) provides functionality for managing and interacting with a group of users in a collaborative environment.

## Functionality

The [**Collab**](/puppeteer/module/collab/README.md) provides the following methods for managing users and their interactions.

### `addUser(userDetails, userFunction)`

```javascript
/**
 * Adds a user to the collaborative environment.
 * @param {object} userDetails - Details of the user to be added.
 * @param {function} userFunction - The function representing the user's actions.
 * @returns {User} - The added user instance.
 */
collab.addUser(userDetails, userFunction);
```

### `wait()`

```javascript
/**
 * Waits for all users to complete their tasks.
 * @returns {Promise<void>}
 */
collab.wait();
```

### `close()`

```javascript
/**
 * Closes all user instances and performs cleanup.
 * @returns {Promise<void>}
 */
collab.close();
```
