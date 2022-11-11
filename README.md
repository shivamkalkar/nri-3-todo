# todo App

Let's create and assign tasks and delete them once completed

## Objectives

- Be able to setup a RESTful CRUD API using `express`
- Get more comfortable working with multiple files
- Learn a new library (`chai-http`) to help you with testing `express` endpoints
- Re-inforce the importance of TDD by forcing you to write your own tests

## API description
There are four requests and they do the following

| Function | Type | Input | Output | 
| ----- | ----- | ----- | ----- |
| Get all items | GET | - | Array of items |
| Get item by Id | GET | id | item |
| Add new item | POST | item | success/ failure |
| Update item assignee | PUT | assignee | success/ failure |
| Delete item | DELETE | id | success/ failure |
| Mark item as completed | PUT | id | success/ failure |

The table has the following values: 
| Value | Type | Example |
| ----- | ----- | ----- |  
| id | primary key | 1 |
| title | string | "Water the plants" |
| assignee | string | "dad" |
| completed | boolean | true |

