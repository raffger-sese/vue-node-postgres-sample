# Introduction
This is a sample web app that provides Covid cases result

# How to run?

1. Clone Project 
2. Setup local postgres, Create DB and table schema
3. Start backend server (Node.js)
4. Start web app (Vue.js)

## Clone Project 

git clone https://github.com/raffger-sese/vue-node-postgres-sample.git

## Setup local Postgres db
 
1. Sample Config (used in the project):
    user: 'rms'
    database: 'rms'
    password: 'admin'
    port: 5432
    
2. Create db 'rms' and table named 'covid_observations'

CREATE TABLE covid_observations(S_NO INT NOT NULL, OBSERVATION_DATE VARCHAR(255), PROVINCE_STATE VARCHAR(255), COUNTRY_REGION VARCHAR(255), LAST_UPDATE VARCHAR(255), CONFIRMED INT, DEATHS INT, RECOVERED INT, PRIMARY KEY(S_NO));


## Star backend server

1. Go to ROOT/backend folder
2. npm install
3. node index.js
4. Verify that the server is running with this console log:
  App listening at http://localhost:3000
5. At this point, the latest data from a CSV file, will be inserted into the DB. Verify with console log:
  Processed CSV file
    

## Star web app
1. Go to ROOT folder
2. npm install
3. npm run serve
4. Open browser and visit: http://localhost:8080/


## How does the app work?

1. User can view a report witha list of countries detailing the # of confimed covid cases , deaths and recovered.
2. Records are shows in descending order from the country with the highest # of confirmed cases
3. User should select a specific date to generate the report from
4. User has to specify the limit of records as well (i.e. If selected 5, the report will show top 5 countries. If user selected 100, app will show maximum of 100 records or less depending on the retrieve records.)
5. User can trigger the refreshing of data in the backend (i.e. If user wasnts to see updated records). This is the same function in step#5 of 'Star backend server' section


    
   
    
  
