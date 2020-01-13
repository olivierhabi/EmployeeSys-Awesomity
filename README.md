# EmployeeSys-Awesomity

<a href="https://codeclimate.com/github/olivierhabi/EmployeeSys-Awesomity/maintainability"><img src="https://api.codeclimate.com/v1/badges/82ba7148b4c56e2536f1/maintainability" /></a>

Here is a list of all API Endpoints that you will find:

- POST /api/auth/signup | Signup
- POST /api/employees | Create Employee
- PUT /api/employees/:id | Edit Employee
- PUT /api/employees/:id/activate | Activate Account
- PUT /api/employees/:id/suspend | Suspend Account
- DEL /api/employees/:id | Delete Employee
- GET /api/employees/search/6 | Search By Id
- POST /api/auth/signin/manager | Signin

### Tools used:

- Server side Framework : **Node/Express**
- Linting Library: **ESLint**
- Style Guide: **Airbnb**
- Testing Framework: **Mocha**
- Database: **Postgresql**
- Hosting API: **Heroku**

## Code style

The style-guide is ESlint-airbnb, and it uses prettier for formatting code. To enable `VS Code + ESLint + prettier` follow the steps below:

- `cd root_directory`
- `yarn add -D prettier eslint eslint eslint-config-prettier eslint-plugin-prettier`
- Create `.eslintrc.json`:`{ "extends": "plugin:prettier/recommended" }`
- In VS Code, `Ctrl + Shift + X`
- Search and install _ESLint_
- Search and install _Prettier Code Formatter_
- Restart VS Code.

### Getting Started

### Clone the latest version of the repository

`https://github.com/olivierhabi/EmployeeSys-Awesomity.git` or `git@github.com:olivierhabi/EmployeeSys-Awesomity.git`

### Change directory

`cd into the project directory`

### Install the project's dependencies with

`yarn install` or `npm install`

# POSTMAN documentation

[API Documentation](https://documenter.getpostman.com/view/8274199/SWLiYkPg?version=latest)

# HEROKU API Link

[Heroku API Link ](https://employee56.herokuapp.com/)
