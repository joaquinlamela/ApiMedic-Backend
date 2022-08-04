# Purpose

This project contains the API for ApiMedic application. This app recieves all the requests from the frontend application and handles them as appropriate. 

ApiMedic is an application that arises with the need to enter the different symptoms that one has, and obtain a list of possible diagnoses. To then be able to observe a history of the consultations carried out and for each of them, once the doctor has visited, confirm the correct diagnosis.

# Description

ApiMedic allows:

- User registration
- User authentication
- Request diagnoses
- View consultations
- Set the diagnosis for specific consultation.

## Installation

1. First, you need to clone or download the repository from GitHub on your computer. 

2. In the root folder, add a `.env` file. This file is used to configure the environment variables. You should add the following variables, with the correspondent values:

- PORT=
- INTERNAL_FORMAT_DATE=
- PRIVATE_KEY=
- PUBLIC_KEY=
- JWT_EXP_TIME=
- JWT_ALGORITHM=
- IV=
- ENCRYPTION_KEY=
- CRIPTOGRAPHY_ALGORITHM=
- MYSQL_DATABASE=
- MYSQL_USER=
- MYSQL_PASSWORD=
- MYSQL_ROOT_PASSWORD=
- MYSQL_HOST=
- URI_AUTH_API=
- SECRET_KEY_AUTH_API=
- USER_AUTH_API=
- URI_HEALTH_API=

3. To run this application, you must have to install the dependencies. To do this you can run the following command:

```
npm i
```

4. And to finish and run the backend, you can run the following command: 

```
node app.js
```

