# Roommee Front-end

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with [Material UI](https://material-ui.com/) as the base. 

To visit and test the website go to [Roommee](https://roommee-front-end.herokuapp.com/)

# Getting Started
When you visit the website, you will land on the login page. You must first register an account before anything else. 
The register button is on the top right corner or at the center of the website. Pressing it will send you to the register page

## Completed Front-end Core Functionality 

* Login + Register
* Profile + Questionare + Matching 

### Register Page
https://roommee-front-end.herokuapp.com/register

On this page you'll be asked to fill in your First name, Surname, email, password and agree to the terms and conditions. You must fill in all the fields to continue. The website will not allow you register an account until all fields are filled. Once filled in, press the Sign up button. 

Following this, a verification link will be sent to your email. You must click on it to be verified. 

### Login Page 
https://roommee-front-end.herokuapp.com/

Once verified, you can login through this page. Fill in both the email and password field and press login. This will send you to the Home Page. 

### Home Page
https://roommee-front-end.herokuapp.com/home

Here, there are two scenarios. If you are a new user, you will be guided to click the Profile button which will take you to the Profile Page. Otherwise, if you are an existing user, you will see the Find Roommee button which will take you to the Matching Page.

### Profile Page 
https://roommee-front-end.herokuapp.com/profile

You can fill in/update your information such as age, nationality, gender, hobbies and the suburb you would like to live in. Clicking update will save all the changes made. There is also a Go To Questionnaire button which will take you to the Questionnaire Page (intended for new users as a guide).

### Questionare Page
https://roommee-front-end.herokuapp.com/questionaire

In this page you will have to fill the form so that the website can match you with potential roomates. Clicking update will save all the changes. There is also a Go To Matching button which will take you to the Matching Page (intended for new users as a guide).

### Matching Page
https://roommee-front-end.herokuapp.com/matching

Here you can go through all the profiles you have been matched with, one by one. You can view their information, hobbies, where they want to live, etc. By clicking the Ring Rommee button, you will be matched on the server. There is also a See Your Matching Status button which will take you to the Matching Status Page.

### Matching Status Page
https://roommee-front-end.herokuapp.com/matching-status

In this page you will see all your current matching status. If you already have a match, you will see the Chat button which (supposedly) will take you to the Chat window with your Roommee (but for now the chat functionality is not ready yet). If you change your mind and want to remove a match from your list, you can do so by clicking the Yes button beside the 'Remove Roommee?' question.

### Additional information
In the app bar, there will be a navlink to Home page, and if the user already have a match, there will be a navlink to Matching Status page.
For existing users, there will be a menu bar at the top left of the window containing a navlink to Profile and Questionnaire page. But for new users, the menu bar will be hidden so that they will have to do the process step by step as guided. They can see the menu bar only after the profile and questionnaire are completely filled.


## Authors

* Nathanael Luira Yoewono
* Kartika waluyo
* Shawn Elmo Samudra
* Eldar Kurmakaev 
* Zill-e Rahim




