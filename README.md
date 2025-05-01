# task tracker
## Backend API Documentation

This is a backend API for taskTracker application, built using Node.js, Express, and MongoDB. It supports user registration, login, project and tasks.

## Base URL

```
https://task-tracker-rms3.onrender.com/
```

---

## Endpoints

### `/user`

#### `POST /users/register`
Register a new user, require min 3 character for all fields.

**Request Body:**
```json
{
    "name":"name",
    "email":"email@gmail.com",
    "password":"pass",
    "country":"country name"
}
```

#### `POST /users/login`
Login as a user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword"
}
```

#### `GET /users/profile`
Get user profile (requires authentication).

#### `GET /users/logout`
Logout the user.

---



### `/project`

#### `POST /project/create`
 (requires authentication)
 one user can create upto 4 projects only
**Request Body:**
```json
{
  "name": "My second Project",
  "description": "This is my second project."
}
```


#### `get /project/:projectId/`
**Auth Required**
**Query Params:** `projectId`.
know all info about the project and total task available on that project
 

#### `patch /project/:projectId/`
**Auth Required**
**Query Params:** `projectId`.
update the status 
**Request Body:**
```json
{
    "status" : "Completed"
}
```



### `/task`

#### `POST /task/create`
**Auth Required**
Create a task.

**Request Body:**
```json
{
  "projectId": "6811dfa8ec051c3ab8466378" ,
  "title": "first Task",
  "description": "This is the second task in the project."
}
```

#### `GET /task/:taskId`
**Auth Required**
**Query Params:** `taskId`.`  
read the task 

#### `patch /task/:taskId`
**Auth Required**
**Query Params:** `taskId`.`
**Request Body:**
```json
{
    "status" : "Completed"
}
```

#### `patch /task/update/:taskId`
**Auth Required**
**Query Params:** `taskId`.`
**Request Body:**
```json
    {
    "title" :"updated one",
    "discription" : "know it is working fine"
}

```

#### `delete /task/:taskId`
**Auth Required**
**Query Params:** `taskId`.`

## Tech Stack

- Node.js
- Express.js
- MongoDB
