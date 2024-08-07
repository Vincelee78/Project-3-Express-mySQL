## TCG-Project-3-Space Saving Furniture Systems (Express.js)
This project is called Space Saving Furniture Systems and it is an eCommerce platform for selling space-saving wall beds. The project is aimed at home owners, backbacker hotel owners, student domoritory owners, office owners who have a relatively small place or users who just want more space in their rooms. By providing these target consumers with these wall beds, it will solve their needs by freeing up more space in their rooms.

This backend website serves as a platform for the company owner or vendor to add their products or to manage the consumer's shipping details and orders.

![Space-Saving Furniture Systems backend](https://res.cloudinary.com/dtrwtlldr/image/upload/v1639143470/backend_final_tgessp.jpg "Space-Saving Furniture Systems")

## Index:
1. [Project Design](#a)
2. [Deployment](#b)
3. [Website Features and Navigation](#c)
4. [Technologies Used](#d)
5. [Design](#e)
6. [Testing](#f)
7. [Acknowledgements](#g)
 
## <a name="a">1. Project Design </a>
There are two parts to this project. The front-end of this project is done with React.js and the back-end of this project is done with Node.js, mySQL database and Express.js.
The schema diagram for mySQL database can be found [here.](https://res.cloudinary.com/dtrwtlldr/image/upload/v1639099995/mySQL_relationship_final_tq5zw7.jpg)

## <a name="b">2. Deployment</a>
This backend website is deployed on Heroku. This website for the site owner can be accessed at the following link:

https://wallbeds-project3.herokuapp.com/

The admin login details are:
* Login email: test@gmail.com
* Login password: 1234

The backend express.js uses tailwindcss, bootstrap and css. The react.js frontend uses bootstrap and css. The tailwindcss is complied using the inline css feature under the <style> tag in the base.hbs of the backend express.js.
 
 ## <a name="c">3. Website Features and Navigation</a>
 This backend website is used to manage the products and orders. Besides the main page of the website, only registered users such as the website owner can access the rest of the routes of the website. The features of this website are listed below:
 
 1. Product management: A registered vendor can list products on the website by creating a new product. The listed products' individual fields can be edited by the vendor and 
 can also be removed on the condition that the product is not in a consumer's cart or purchased order. The features of the product management is as follows:
 * Add a product
 * Update a product fields
 * Delete a product
 
 2. User management: Only registered vendors such as the website owner can access routes in this website for product management. The features of the user management is as 
 follows:
 * Register new vendor
 * Login a registered vendor
 * Logout 

 3. Order management: A registered vendor can view the product orders made by the consumer and its individual fields(for easier processing of the purchased product). By 
 referencing the order reference ID, the vendor can look up the shipping details and user details of the consumer who bought the particular product. The registered vendor can 
 click on the complete order button under the shipping details to complete the order once the order has been shipped out. The order status of the consumer will be updated and 
 the consumer can see its status under the account page in the frontend website. The features of the order management is as follows:
 * View product orders
 * View the respective consumer shipping details
 * Complete the order under the consumer shipping details
 
 4. Product Search: There is search feature implemented in the catalogue, product orders and shipping details page to allow the vendor to filer for products and orders based on name, minimum and maximum cost, and its respective categories.
 
### 3.1 Navigation
The following shows a general direction in which one might navigate through the website:
 
#### 3.2.1 Home
This is the landing page of the website. All the products are displayed here as default. There is a search feature which allows the vendor to filter through the products based on name, minimum and maximum cost, and its respective categories. 

#### 3.2.2 Login
Vendor can use this login page to login to access all the other pages in the website.

#### 3.2.3 Register
Vendor can use this register page if they are new to the website. After registering, the vendor is redirected to the login page. After logging in, the vendor is redirected to the catalogue page.

#### 3.2.4 Add wall Bed 
From the catalogue page, vendor can click on the add wall bed to add a new product. If the catalogue already has products, the vendor can edit the product or remove it provided the product is not in any orders or in the user's cart.
 
Each product is displayed in a table with the headings:
 * ID
 * Name
 * Weight
 * Description
 * Stock
 * Date created
 * Bed Size
 * Mattress Type
 * Bed Orientation
 * Frame Colour
 * Wood Panel Colours
 * Cost in Dollars
 * Image
 
#### 3.2.5 Product Orders
A registered vendor can view the product orders made by the consumer and its individual fields(for easier processing of the purchased product). The vendor can also search for orders in the search order bar.
 
Each product order is displayed in a table with the headings:
 * Order ID
 * Orders Reference ID
 * Name of Bed
 * Bed Size
 * Frame Colour
 * Bed Orientation
 * Mattress Type
 * Quantity
 * Cost
 * Wood Panel Colours
 
#### 3.2.6 Shipping Details
By referencing the order reference ID, the vendor can look up the shipping details and user details of the consumer who bought the particular product. The registered vendor can 
click on the complete order button under the payment status in shipping details to complete the order once the order has been shipped out. The order status of the consumer will be updated and the consumer can see its status under the account page in the frontend website.
 
Under the shipping details, each order reference ID is displayed in a table with the headings:
 * Orders Reference ID
 * Payment Reference
 * Date ordered
 * Customer Name
 * Email
 * Billing address
 * Shipping address
 * Phone number
 * Payment status
 
 The vendor can also search the shipping details based on the payment status and the payment reference.
 
 ## <a name="d">4. Technologies Used</a>

* [Express](https://reactjs.org/)
<br> This project uses ExpressJS in the backend to provide methods to specify what function is called for a particular HTTP verb ( GET , POST , PUT , DELETE) and URL pattern and 
to retrieve data from mySQL and send them to React or vice versa.
* [Bootstrap 5.1.3](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
<br> This project uses Bootstrap to structure the layout of the website such as my Navbar. It is also used in positioning the text and features.
* [date-fns](https://date-fns.org/)
<br> This project uses date-fns toolset to change the datetime format in mySQL to a more readable date format.
* [mySQL](https://www.mysql.com/)
<br> This project uses mySQL to store documents in the collections which the backend user has uploaded in express.js. 
* [Tailwindcss](https://tailwindcss.com/)
<br> A utility-first CSS framework for rapidly build modern websites without ever leaving your HTML.
* [morgan](https://github.com/expressjs/morgan)
<br> A logger for Express.js for creating log files for the API.
* [bookshelf](https://bookshelfjs.org/)
<br> ORM for Node.js.
* [cloudinary](https://cloudinary.com/)
<br> Cloud image hosting service.
* [Cors](https://github.com/expressjs/cors)
<br> Middleware for Express.js to enable cross-origin resource sharing.
* [Connect-flash](https://github.com/jaredhanson/connect-flash)
<br> A middleware for Express.js to manage flash messages.
* [db-migrate](https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/)
<br> This project uses db-migrate, a database migration tool for Node.js.
* [db-migrate-mysql](https://github.com/db-migrate/mysql)
<br> This project uses db-migrate-mysql, a database migration tool for MySQL.
* [express-session](https://github.com/expressjs/session)
<br> Middleware for Express.js to manage sessions.
* [dotenv](https://github.com/motdotla/dotenv)
<br> A library for loading environment variables from a .env file.
* [forms](https://github.com/caolan/forms)
<br> Caolan's forms library for Node.js.
* [hbs](https://github.com/pillarjs/hbs)
<br> Express.js view engine for handlebars.js
 * [handlebars-helpers](https://github.com/helpers/handlebars-helpers)
<br> Handlebars helpers for Node.js.
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
<br> An implementation of JSON Web Tokens in Node.js.
* [stripe](https://stripe.com/en-sg)
<br> A payment processing API for the Internet.
* [Wax-on](https://github.com/keithws/wax-on)
<br> 	Wax on adds support to Handlebars for template inheritance with the block and extends helpers.
* [Uuid](https://github.com/uuidjs/uuid)
<br> Javascript used in express.js for generating unique identifiers.
* [Yup](https://github.com/jquense/yup)
<br> JS library for validating data.
* [HTML 5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
<br> This project uses HTML5 to structure the content and to insert buttons and images.
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
<br> This project uses CSS to add visual colors, adjust the size of the features and also positioning and animation of the features.

 ## <a name="e">5. Design</a>
### 5.1 UI/UX
The UI/UX design for this project was catered for the ease of use for the user. The design process for the website are as follows:

### 5.1.1 User Interface
#### Structure:
The organization of the site content will contain the landing page with the navigation bar in the top and site’s logo on the top left. The headings in the navigation bar are self-explainatory and easy to use.

#### Skeleton:
#### Layout:
*	The user login, logout and register is at the top right of the screen for easy reference.
*	Clicking on the shopping cart icon will show all the items added to the cart by all the users in the front end with the name and email of the user who added the product to the cart on the top left side of the cart item.

#### Surface:
#### Colours:
* White background with dark blue header with white fonts in the landing page for better contrast and easy visualization. 
* Usage of [coolors](https://coolors.co/) to select my colour scheme.
* Images used will not be too bright colours as I am using a white background.
* Usage of traditional fonts such as 'Stencil Std, Fantasy' and 'Times New Roman, Times, serif'.
* Adequate white spaces between characters and lines in description for easy reading.


#### 5.2.2 User Experience
The website makes use of tables in the backend and uses tailwindcss to create a responsive design. The default tailwind font family can be found in the documentation [here](https://tailwindcss.com/docs/font-family)
 
 
 ## <a name="f">6. Testing</a>
 Based on the owner's needs and objectives, these are the testing guidelines for the features that were implemented.
| User Stories| Features|
| ------ | ------ |
| I'm at the home page. I see a search feature on the left and the list of all of the products on the right | I enter the search field 'classic' for name, '2050' for maximum cost, 'single bed' for bed sizes, 'horizontal' for bed orientation, 'spring' for mattress type, 'aluminium' for bed frame colour, 'walnut' for wood panel colours and click on filter wall beds. The search results will show 'classic wall bed single' as the wall bed being filtered. |
| I log in with my email and password under the 'Login' link in the navigation bar | I am redirected to the profile page with a successful flash message saying 'Welcome back,'my name' where I can see my username and email. If I enter my email or password wrongly, an error message will show 'Sorry, the authentication details you provided does not work.' |
| After logging in, I click on the Catalogue link in the navigation bar| I am directed to the catalogue page where the images of nine products and its respective fields are shown. There is an update and delete button on the right side of the end field of each product. |
| I click on the update button under the 'bunk bed aluminum frame' wall bed at the end of its table| I am directed to the editing page of the product. I change the 'weight in kg' field from '106' to '110' and click on 'update wall bed' at the bottom of the page. A success message showing 'bunk bed aluminum frame has been updated' and the product weight has been changed to 110 kg. |
| I click on the 'Add Wall Bed' link in the navigation bar | I am directed to the add product page with a form. I fill up the form fields and click on 'Add Product'. A success message saying "New Wall Bed 'name' has been created". The new product will appear at the bottom of the product listing in the catalogue page. |
| I click on the 'product orders' link in the navigation bar | I am directed to the page with all the orders made so far. There are 2 product orders 'bunk bed wood frame' and 'classic wall bed double' made so far in the database. |
| I click on the 'shipping details' link in the navigation bar | I am directed to the page with all the shipping details of users who made purchases. There is one current user 'Vincenttest' who made two product purchases. |
| I click on the 'complete order' button under the payment status in the shipping details link of the navigation bar | A success message saying 'Complete order has been updated' and the status will change from 'paid' to 'completed'. |
| I click on logout | A success message saying' Goodbye' will be shown and I am redirected to the login page. | 
 

 ### <a name="g">7. Credits and Acknowledgement</a>
* Credits to https://www.qoo10.sg/shop/spacesaving for the company's vision and wall beds data.
* Credits to https://shop.smartbeds.it for their wall bed images and their descriptions.
* All code snippets and templates used in this project are attributed in the source code where applicable.
// Trigger new build
