# **Zendesk Coding Challenge - Derrick Lai**

This app was made as part of the coding assessment for Zendesk's 2021 Software Engineering intern position. The app makes HTTP request to Zendesk's API to retrieve data of all tickets available to the Zendesk account, which are then displayed on the browser for all tickets and each individual ticket, with some information. The app is made with NodeJS and React framework. 

### **Prerequisite/assumption for installation and usage**

- NodeJS v12.19.0 or later versions
- Git 
- Basic knowledge of using terminal/CLI commands e.g. `cd` & `git`
- Copying .env file into application

### **Installation**

#### **Before installation can happen. Ensure corresponding .env file that is attached in the email submission, under folder named `NodeJS env` and `React env` is put into root folder (`zendesk-coding-challenge`) and in the `client` folder (`zendesk-coding-challenge/client`).**

1. Clone the corresponding app from Github to your machine:
```
git clone https://github.com/derricklai33/zendesk-coding-challenge.git
```

2. Navigate/cd into `zendesk-coding-challenge` folder using terminal of choice on your machine.

3. With `zendesk-coding-challenge` being your current directory path, run this command line to install dependencies for NodeJS backend:
```
npm i
```

4. To run the NodeJS backend, run: 
```
npm run server
```

5. Open another new tab in terminal in the current directory `zendesk-coding-challenge`, and then cd into `client` folder.

6. With the current directory being `zendesk-coding-challenge/client`, install dependencies for React by running:
```
npm i
```

7. To start the React app, run:
```
yarn start
```

#### **Tests**

Ensuring that `step 1-3` is done with installation of application and in `zendesk-coding-challenge` directory, run tests using:
```
npm run test
```

### **Usage**

- http://localhost:3000/ - This will display all available tickets


- http://localhost:3000/:id - This will display specific tickets


### **Challenge requirements & Design**

1. **Connect to Zendesk API and request for all tickets**

The initial requirement for the assessment is to be able to connect to Zendeks's API to retrieve all available that is associated to the account. To connect to Zendesk API to retrieve retrieve ticket data, the application uses `axios` to handle HTTP requests and using `Basic Auth` authorization.

2. **Pagination of tickets**

Upon retrieving all the available tickets from the API, the tickets are required to paged through if more than 25 tickets are returned. With the given JSON file to populate the trial account with 100 tickets and the requirement to page through when more than 25 tickets is returned, it is safe to assume that every page is to contain 25 tickets and the user is able to page through them accordingly. 

The application handles pagination using a `do while` loop and calling `/api/v2/tickets.json`, that returns 100 tickets per page, and using `do while` loop to loop through the remaining pages. The tickets are stored and paginated manually using `setTicketsToChunks` function to segment 25 tickets per array element to be sent back to be displayed. 

3. **Display tickets in a list**

Tickets are to be displayed in a list as part of the requirement. Upon sorting and segmenting the tickets, all the tickets are listed in a list on the front end, displaying the ticket's `id` and `subject`. Each ticket is clickable, which navigates to another page that displays details of the specific ticket, using `react-router-dom`.

4. **Display individual ticket details**

Displaying individual tickets and their corresponding detail was handles by displaying the ticket's `subject`, `submitter_id` and `description`. The page also includes a back button, which also utilises `react-router-dom` to navigate back to the main page that displays all tickets.

### **Libraries**

- **Axios**

Axios was used to make HTTP requests to Zendesk API to retrieve data. Axios was used because of how easy it was to use to make a GET request and also passing basic auth to Zendesk API.

- **Express**

Express was used to setup my server and to communicate with the application's frontend (ReactJS) to display in the web browser.

- **dotenv**

dotenv was used to load environment variables into the application. Variables such as `login` and `password` are stored in the environment file for security purposes, as they are used in basic auth to access the API.

- **Jest & Supertest**

Jest and Supertest was used to create `happy path` tests to test against the application. Jest is the testing framework and supertest is incorporated to easily test HTTP requests to the application. 