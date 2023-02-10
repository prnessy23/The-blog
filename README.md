## The B-Log (using the MVC structure)
___
#### What is M-V-C
____
MVC stands for Model-View-Controller, and it's a software design pattern used in web development to separate the application logic into three interconnected components:

1. Model: The Model component is responsible for managing the data and business logic of the application. It retrieves and stores data from the database and handles the processing of that data.

2. View: The View component is responsible for presenting the data to the user. It defines how the data should be displayed and interacts with the user by accepting inputs and providing feedback.

3. Controller: The Controller component acts as an intermediary between the Model and the View. It receives user input from the View, processes that input, and updates the Model as necessary. The Controller also provides the data from the Model to the View.

By separating the application logic into these three components, the MVC pattern makes it easier to manage and maintain the code, as well as allows for a more flexible and modular architecture. Additionally, the separation of concerns between the Model, View, and Controller enables teams to work more efficiently, as different developers can work on different components without affecting each other's work.
____

#### Description
___
Following the MVC structure, this application allows users to publish their blog posts to the site and also comment on other users` blog posts. It uses Handlebars.js for the templating language,Sequelize as the Object-Relational-Mapping tool and the express-session npm package for authentication purposes. 

#### Usage
_____
The application will allow new users to the site to sign up and existing users to sign in. Once logged onto the site users will be able to view, add, edit or delete their blog posts in their own dashboard. They will also have the ability to comment on other blog posts on the site. 
The site can be viewed here on [Heroku].

 
