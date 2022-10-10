<div align="center">
    <img width="150px" src="https://github.com/Brandon-Schefstad/ESEAtAGlance/blob/71251b5ecadc27ceb2422b057358d8507030434a/public/assets/favicon.png" />
    <h1>ESE-At-A-Glance</h1>
    <p>A dashboard for ESE student accommodations and IEP goals.</p>
</div>

# [Live Site](https://ese-at-a-glance.herokuapp.com/)
#### README.md Sections:
- [Introduction](#introduction)
- [Project Installation](#project-installation)
- [Project Dependencies](#project-dependencies)
- [Report a Bug](#report-a-bug)

## Introduction
ESE-At-A-Glance allows teachers to keep track of previous IEP goals as well as current accommodations for their students. The end-goal being to make this information more easily accessible for educators, therefore increasing support for ESE students overall. As a previous ESE teacher, making this information available to general education teachers was my largest hurdle, so this app seeks to solve that problem! 

<div align="center">
    <img width="1440" src="https://github.com/Brandon-Schefstad/ESEAtAGlance/blob/f8b6004a4930c10c742c1a060f99665dada72a41/public/assets/preview-login.png">
    <img width="1440" src="https://github.com/Brandon-Schefstad/ESEAtAGlance/blob/f8b6004a4930c10c742c1a060f99665dada72a41/public/assets/preview.png">
</div>

### Project Installation
1. Fork this repository
2. Navigate to a local directory where you would like the project to be cloned to
3. Clone the repository to your local environment (`git clone <link here>`)
4. Install all of our dependencies (`npm install` or `npm i`)
5. Create a `.env` file and add the following variables:
    - DB_STRING = `mongodb connection URI`.
    - SECRET_SESSION = `string secret to pass into express-session instance`.
    - PORT = `Port you would like localhost to grab onto`

### Project Dependencies

 - bcrypt - used to encrypt user password information.
 - connect-mongo - used for creating connection to mongodb database.
 - dotenv - used to process environment variables
 - express - used for routing and handling request / response operations.
 - express-flash - used to display error information to user when logging or signing up.
 - express-session - used to maintain user state (such as if they are currently logged in or not).
 - mongodb - database used to store web application data.
 - mongoose - used for creating models and schemas for storing data properly.
 - morgan - used for displaying request information in testing environment.
 - nodemon - used for testing and speeding up development process.
 - passport - used for user authentication.
 - passport-local - passport strategy used.
 - pug - used as a templating engine
 - sass - used as a CSS preprocessor
 - validator - used for validating user input.

## Report a Bug

If you encounter a bug and/or have any suggestions for our team, please visit our [issues page](https://github.com/devv-work/timeato/issues) and create a new issue. If you wish to implement a feature on your own, please visit our <a href="https://github.com/devv-work/timeato/blob/main/CONTRIBUTING.md">Contributing Guidelines</a> and follow our requirements.

If you have encountered a bug, please provide as much information as you can to help us replicate the issue on our own end. Depending on the issue, it may be useful to communicate your browser, screen width, and/or anything that relates to your specific encounter.

