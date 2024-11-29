# Home Library Service REST API

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## 1. Downloading

1. ```git clone https://github.com/idkwhttsay/nodejs2024Q3-service.git``` - clone the repository
2. ```git checkout typeORM-Docker``` - go to branch typeORM-Docker
3. ```npm install``` - install npm packages
4. ```cp .env.example .env``` - create a .env file based on the .env.example

## 2. Running application using Docker
Make sure you have Docker app installed on your computer. 
After that, type in following commands into your console one by one:
1. ```docker-compose up```
2. Open new terminal window and run tests with ```npm run test```
3. To exit from the container, terminate the terminal and run ```docker-compose down```

### Docker Scout
You can easily scan built images of this program for vulnerabilities by typing following into console:
1. ```npm run docker:scout``` - to scan images of both database and app.
2. ```docker scout cves d4ntatar/homelibraryservice_app``` - to scan image of the app
3. ```docker scout cves d4ntatar/homelibraryservice_db``` - to scan image of the database

## 3. Running application without Docker
Make sure you have PostgreSQL (or any other database provider app installed) app installed on your computer.
Start the server with the following properties:
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=home_music_library
POSTGRES_USER=home_music_library
POSTGRES_PASSWORD=home_music_library
```

After that, run ```npm run start:prod```. This command will build the program, migrate the database, and start the build.

## 4. Migrating the database

1. ```npm run typeorm:generate -- <link-to-save-migration>``` - to generate a migration
2. ```npm run typeorm:migrate``` - to run migration, so the database will be created on your computer 
(requires PostgreSQL)

## 5. Running application

1. ```npm run start``` - to run application in "development" mode
2. ```npm run start:dev``` - to run application in "development" mode
3. ```npm run start:prod``` - to run application in "production" mode

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/docs.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all tests with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
