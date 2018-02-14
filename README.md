# Atlas Listings
CRUD RESTful API built with Node.js and Redis for database

## Feature List
* Seed Database
* View listing
* Create listing with `id, name and description`.
* Update Listing.
* Delete listing


## Built With
- [Git](https://git-scm.com/) - Version Control
- [Node.js](https://nodejs.org/) - JS Runtime Environment
- [Redis](https://redis.io/download)
- [Yarn](https://yarnpkg.com) - Package Manager
- [Express](https://expressjs.com/en/starter/installing.html) - Web Framework
- [ESLint](https://eslint.org/) - Linting Tool
- [VS Code](https://code.visualstudio.com/) - Code Editor
- [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)


## Setup
#### Local Copy
To create a local copy, run the following in your terminal:
```bash
git clone https://github.com/ajibs/atlas-listings.git
```
Then change into the local directory, run the following in your terminal:
```bash
cd atlas-listings
```

#### Install Node.js and Yarn
If you don't have Node.js installed, please go ahead and grab it [here](https://nodejs.org/). This project uses ES6+ features and requires Node version `8.9.4`

Yarn is a package manager for Node.js and can be installed from [here](https://yarnpkg.com/en/docs/install).

To confirm that you have Node.js installed, run the following in your terminal:
```bash
node -v
```
You should get something like `v8.9.4`.

To confirm that you have Yarn installed, run the following in your terminal:
```bash
yarn -v
```
You should get something like `1.3.2`.

#### Setup Redis and .env file
Download and install [Redis](https://redis.io/download). 

You should also create a `.env` file, type the following command in your terminal:
```bash
cp .env.sample .env
```

#### Install Node.js Modules
To install all dependencies, run the following in your terminal:
```bash
yarn
```

## Development
To kickstart the application, run the following in your terminal:
```bash
npm run start
```


### Using Postman:
 - Install [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
 - In the postman window, populate the url window with the API endpoint you want to take for a test run.

You can use any of the endpoints below:

### SEED Database:
Make a `GET` request via
  ```bash
  http://localhost:3000/seed
  ```

### CREATE Listing
Make a `POST` request to
```bash
  http://localhost:3000/create-listing
```
  Populate the body of the request with:
  - id
  - name
  - description

### VIEW Listing:
Make a `GET` request via
  ```bash
  http://localhost:3000/listing/:id
  ```

### UPDATE Listing:
Make a `PUT` request via
  ```bash
  http://localhost:3000/update-listing/:id
  ```

### DELETE Listing:
Make a `DELETE` request via
  ```bash
  http://localhost:3000/delete-listing/:id
  ```


## Author
* [Bolu Ajibawo](https://github.com/ajibs)
