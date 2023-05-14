# Task: ExpressJS Task API
This project is a simple ExpressJS task API that allows users to create, retrieve, update, and delete tasks. The API is built using ExpressJS and MongoDB for data storage.

## Expectations
## TASK 1
The project is expected to have the following API endpoints:

- Retrieve all tasks (GET _/api/tasks_)
- Create a task (POST _/api/tasks_)
- Retrieve a single task (GET _/api/tasks/:id_)
- Update a task (PATCH _/api/tasks/:id_)
- Delete a task (DELETE _/api/tasks/:id_)
- Mark task as completed (PATCH _/api/tasks/:id/completed_)

**Note** - Only for the more experienced developer
- Update the (GET _/api/tasks_) to allow user filter task either by dueDate, status or title. 

## TASK 2
 Complete the two question in the `controller/indes.js`. The `getMaxSum` and `uniqueChars` function
## Question 1 - getMaxSum
Write a function called `getMaxSum` that takes an array of integers as input and returns the maximum sum of any contiguous subarray of the given array. If the array is empty or contains only negative integers, the function should return 0. 
 The getMaxSum function takes an array of integers as input and returns the maximum sum of any contiguous subarray of the given array. If the array is empty or contains only negative integers, the function should return 0.

 ### Example Input and Output
 **Example 1**
 
 Input
```javascript
 getMaxSum([1, -3, 2, 1, -1]);
```

output
```javascript
 3
```

## Question 2 - uniqueChars
Complete the `uniqueChars` that takes a _string_ as input and returns a new string containing only the unique characters in the input string, in the order that they first appear. If the input string is empty or contains only whitespaces, the function should return an empty string.

// For example, if the input string is "hello world", the function should return "helo wrd".

 ### Example Input and Output
 **Example 1**
 
 Input
```javascript
 uniqueChars("hello world");
```

output
```javascript
 "helo wrd"
```
**Example 2**
 
 Input
```javascript
 uniqueChars("");
```

output
```javascript
 ""
```

## Instructions
To run the project, follow the steps below:

- Clone the repository and navigate to the project root directory.
- Run `npm install` to install the project dependencies.
- Run `npm start` to start the development server.
- Use a tool such as Postman or Insomnia to test the API endpoints.
## Tests
Tests have been provided to ensure that the API endpoints function correctly. To run the tests, follow the steps below:

- Run `npm install` to install the project dependencies.
- Run `npm test` to run the tests.
## Contributors
[Owoputi Kehinde](https://github.com/sirkenedy)

License
NIL
