## TCG-Project-3-Space Saving Furniture Systems (Express.js)
The name of this project is called React-Space Saving Furniture Systems and is an eCommerce platform for selling space-saving wall beds. The project is aimed at home owners, backbacker hotels, student domoritories, office owners who have a relatively small place or users who want more space in their rooms. This will solve these consumer needs by also freeing up more space in their bedrooms or study rooms so that they have place for more items in their rooms or to allow for better cleaning and maintenance of their rooms.

## My goal/motivation for creating this project:
I have observed how small and compact flats are here.  Built-to-order (BTO) flats are getting more compact with each project. Thus, the need for effective usage of space is in demand. People are finding ways to minimize space usage when in reality, the solution is to maximize what you have. How? By introducing space saving furniture to users to purchase.

## Context: 
Space-saving furniture is designed to make full use of limited spaces by incorporating folding mechanisms to keep furniture such as bed in stowed position when not in use. The space saving beds can also be designed to add on other furniture function such as desk or sitting sofa to form a multi-functional furniture system. The site provides users the option to purchase these beds as well as dual and multi-functional wall beds with desk or sofa, bunk beds, and many more. This concept allows users to maximize the space they already have without the worry of purchasing separate bulky furniture, shelves, or tables and taking up a lot of space.
Current and future homeowners should consider purchasing space-saving furniture as a cost-effective method and an efficient way to maximize their living space.

![Space-Saving Furniture Systems backend](https://res.cloudinary.com/dtrwtlldr/image/upload/v1639143470/backend_final_tgessp.jpg "Space-Saving Furniture Systems")

## Index:
1. [Project Design](#a)
2. [Deployment](#b)
3. [Website Features and Navigation](#c)
4. [Technologies Used](#d)
5. [Design](#e)
6. [Testing](#f)
7. [Acknowledgements](#g) sas
 
## <a name="a">1. Project Design </a>
There are two parts to this project. The front-end of this project is done with React.js and the back-end of this project is done with Node.js, mySQL database and Express.js for which the code can be found [here.](https://github.com/Vincelee78/Project-3-Express-mySQL)

The schema diagram for mySQL database can be found [here.](https://res.cloudinary.com/dtrwtlldr/image/upload/v1639099995/mySQL_relationship_final_tq5zw7.jpg)

## <a name="b">2. Deployment</a>
This backend website is deployed on Heroku. This website for the site owner can be accessed at the following link:

https://wallbeds-project3.herokuapp.com/

The backend express.js uses tailwindcss, bootstrap and css. The react.js frontend uses bootstrap and css. The tailwindcss is complied using the inline css feature under the <style> tag in the base.hbs of the backend express.js.
 
 ## <a name="c">3. Website Features and Navigation</a>
 This backend website is used to manage the products and orders. Besides the main page of the website, only registered users such as the website owner can access the rest of the routes of the website. The features of this website are listed below:
 
 * Product management
 <br/> A registered vendor can list products on the website by creating a new product. The listed products' individual fields can be edited by the vendor and can also be removed on the condition that the product is not in a consumer's cart or order. The features of the product management is as follows:
 * Add a product
 * Update a product fields
 * Delete a product
 
 * User management
 <br/>Only registered vendors such as the website owner can access routes in this website for product management. The features of the user management is as follows:
 * Register new vendor
 * Login a registered vendor
 * Logout 

 * Order management
 <br/>A registered vendor can view the product orders made by the consumer and its individual fields(for easier processing of the purchased product). By referencing the order reference ID, the vendor can look up the shipping details and user details of the consumer who bought the particular product. The registered vendor can click on the complete order button under the shipping details to complete the order once the order has been shipped out. The order status of the consumer will be updated and the consumer can see its status under the account page in the frontend website. The features of the order management is as follows:
 * View product orders
 * View the respective consumer shipping details
 * Complete the order under the consumer shipping details
 
 * Product Search
 <br/>There is search feature implemented to allow the vendor to filer for products based on name, minimum and maximum cost, and its respective categories.
 
### 3.1 Navigation
The following tree shows a general direction in which one might navigate through the website:
 
#### 3.2.1 Home
This is the landing page of the website. All the products are displayed here as default. There is a search feature which allows the vendor the filter through the products based on name, minimum and maximum cost, and its respective categories. 

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
 
 The vendor can also search the shgipping details based on the payment status and the payment reference.
 
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
<br> This project uses CSS to add visual colors, adjust the size of the features and also positioning and animation of the features, and ensure it is mobile responsive.

 ## <a name="e">5. Design</a>
5.1 UI/UX
The UI/UX design for this project was catered for the ease of use for the user. The design process for the website are as follows:

### 5.1.1 User Interface
#### Structure:
The organization of the site content will contain the landing page with the navigation bar in the top and site’s logo on the top left. The headings in the navigation bar are self-explainatory and easy to use.

### Skeleton:
#### Layout:
*	The user login, logout and register is at the top right of the screen for easy reference.
*	Clicking on the shopping cart icon will show all the items added to the cart by all the users in the front end with the name and email of the user who added the product to the cart on the top left side of the cart item.

### Surface:
#### Colours:
White background with dark blue header with white fonts in the landing page for better contrast and easy visualization. 
Usage of [coolors](https://coolors.co/) to select my colour scheme.
Images used will not be too bright colours as I am using a white background.
Usage of traditional fonts such as 'Stencil Std, Fantasy' and 'Times New Roman, Times, serif'.
Adequate white spaces between characters and lines in description for easy reading.


5.2.2 User Experience
Although the website makes use of tables in the backend and uses tailwindcss to create a responsive design. The default tailwind font family can be found in the documentation [here](https://tailwindcss.com/docs/font-family)
 
 
 ## <a name="f">6.Testing</a>
 Based on the user's needs and objectives, these are the guidelines for the features that were implemented.
| User Stories| Features|
| ------ | ------ |
 | I navigate over the Home option on the navigation bar and click on the directions option | A map will be shown in the box with a message explaining the location of the company's showroom. Clicking on the top marker of the nearest MRT station will cause a popup to show up 'MountBatten MRT' and  the bottom marker will show 'Space-Saving Furniture Systems' where the showroom of the company is located. |
 | I click on the catalogue page in the navigation bar| I am directed to the about page where it will explain what is space-saving furniture and the background information of the company.|
 | I click on the About page in the navigation bar| I am directed to the catalogue page where the images of the products and its respective names are shown. A search filter feature is also shown on the left side of the page.|
| I log in with my email and password| I am directed to the catalogue page where the images of the products are with an confirmation message 'Login sucessful, (myemail)'). If my entered my email or password wrongly, I would get an error message saying 'login failed!'|
| I enter search fields 'Cozy' name , maximum cost $2000,  | The products  |
| I click on the Cozy Wall Bed Desk Single | I am directed to the Cozy Wall Bed Desk Single details page, with Walnut colour and its respective features, single bed, foam mattress, Horizontal bed orientation, Aluminium frame colour etc, |
| I click on the Add to cart-$2000| A success message is shown saying 'Item added to cart'  and I am directed to the shopping cart page with the name, description, its respective fields options, the total unit cost $2000 on the right and the subtotal $2000 on the bottom.|
| I click Catalogue and click on Revolving Wall Bed and Add to Cart | I will be directed to the shopping cart with the same success message. The Cozy Wall Bed Desk Single and Revolving Wall Bed will be in the cart with their respective images and options. The subtotal will now be $4500. |
| I update the quantity of the revolving wall bed to 3 and click on Update Quantity | A alert popbox will show' Cart Updated!. The total unit price for revolving wall bed is now $7500 and the subtotal is $9500. |
| I click on Remove from cart 'Cozy Wall Bed Desk Single' | A success message showing 'Item removed from cart'. The revolving wall bed will have be left in the cart with  quantity of 3 and subtotal of $7500.|
| I click on Check Out with the remaining 3 revolving wall bed in the cart| I am directed to the stripe checkout website where it will show the total cost, $7500, I am paying on the left side with the name of the product, 'Revolving Wall Bed' and quantity 3. |
| I fill in the fields in the stripe checkout website and click pay| I am redirected to the successful payment page of my website showing, Payment successful! Thank you for ypur order and your order is being processed. |
| I click on the 'account' in the navigation bar | The order items: Relvolving Wall Bed, Quantity 3, Total unit cost $7500 will be shown. The date ordered: 10th December 2021, Order Reference: c8da6950-599c-11ec-910b-c35d93746f41, Order Status: Paid, will be shown.|
| I click on logout | A message showing 'Are you sure you want to log out?' I click on yes and a success message 'Logout successful' is shown, I am redirected to the Login page.|


 ### <a name="g">7. Credits and Acknowledgement</a>
* Credits to https://www.qoo10.sg/shop/spacesaving for the company's vision and wall beds data.
* Credits to https://shop.smartbeds.it for their wall bed images and their descriptions.
* All code snippets and templates used in this project are attributed in the source code where applicable.
