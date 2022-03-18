

# Student Workspace

Awesome cloud solution for students


### Screenshots

![Student-workspace-demo](https://user-images.githubusercontent.com/53630264/154989961-e5aafd21-40be-4ef2-a033-934f5bfdd9e1.png)



### Run Locally

Clone the project

```bash
  git clone https://github.com/sugan0tech/student-workspace.git
```

Go to the project directory

```bash
  cd student-workspace
```

### Installation

Install react-core(FrontEnd) dependencies with npm

```bash
  cd react-core
  npm install 
```



Install node(BackEnd) dependencies with npm

```bash
  cd node
  npm install 
```

.env file configuration for node  
directory /node/.env
```txt
    MASTER_KEY="your_key"
    PASSWORD="your_password"
    DB_URL=""
```

run react-core(FrontEnd) by

```bash
  cd react-core
  npm run start
```

Run Server (Node) By

```bash
  cd node
  npm run student-workspace
```

### Features

- Organisation of all study material in one place
- No worry about filling your computer with files
- Cross platform

## Backend Apis guide

### General Auth
- Token validation is done via cookies (token : token)
- format 
  ```js
  // jwt payload
  payload : {
  email: mail,
  password: password,
  }
  ```

### Assignmets 
- /api/addAssignment 
  ```js
     // sample
     body:{
        assignment : {
        subject: 'chemistry',
        assignmentDetails: 'test',
        date: 'Fri Feb 25 2022 22:40:48 GMT+0530 (India Standard Time)',
        isCompleted: false,
        }
     }
   ```
- /api/getAssignmnets
### Books
- /api/getBooks
### Exams
- Exams (/api/getExams)

## Authors

- [@sugan0tech](https://github.com/sugan0tech)
- [@hari-krishna-tech](https://www.github.com/hari-krishna-tech)



## License

[MIT](https://choosealicense.com/licenses/mit/)

