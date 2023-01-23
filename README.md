<div align="center">
    <img width="150px" src="https://github.com/Brandon-Schefstad/ESEAtAGlance/blob/71251b5ecadc27ceb2422b057358d8507030434a/public/assets/favicon.png" />
    <h1>ESE-At-A-Glance</h1>
    <p>A dashboard for ESE student accommodations and IEP goals.</p>
</div>

# [Live Site](https://ese-at-a-glance.netlify.app/)
# [Video Preview](https://youtu.be/RdijkKT18xY)

#### README.md Sections:

- [Introduction](#introduction)
- [Project Installation](#project-installation)
- [Project Dependencies](#project-dependencies)
- [Report a Bug](#report-a-bug)

## Introduction

ESE-At-A-Glance is a central hub for submitting, reviewing, and viewing ESE student data. This full stack app allows teachers to keep track of previous IEP goals as well as current accommodations for their students. The end-goal is to make this information more easily accessible for educators, therefore increasing support for ESE students overall. As a previous ESE teacher, making this information available to general education teachers was my largest hurdle and required many hours of individualized work so this app seeks to solve that problem!

Student data is enterable into the database and retrievable using the search features. The cards on the teacher's dashboard (which load in after the first student is submitted) link to that student's profile page.

<video src="https://raw.githubusercontent.com/Brandon-Schefstad/ESEAtAGlance/main/client/src/assets/ESEAAG-vid.mp4"> </video>

### Project Installation

1. Fork this repository
2. Navigate to a local directory where you would like the project to be cloned to
3. Clone the repository to your local environment (`git clone <link here>`)
4. Install all of our dependencies (`npm install` or `npm i`)
5. Create a `.env` file and add the following variables:
   - MONGO_URI = `mongodb connection URI`.
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
- tailwind - used to add inline styling
- validator - used for validating user input.

## Report a Bug

If you have encountered a bug, please provide as much information as you can to help us replicate the issue on our own end. Depending on the issue, it may be useful to communicate your browser, screen width, and/or anything that relates to your specific encounter. Send your error to [my email address](mailto:bschefstad@gmail.com). Thank you!
