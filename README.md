## TCG-Project-3-Space Saving Furniture Systems (Express.js and React.js)
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
7. [Acknowledgements](#g)
 
## <a name="a">1. Project Design </a>
There are two parts to this project. The front-end of this project is done with React.js and the back-end of this project is done with Node.js, mySQL database and Express.js for which the code can be found [here.](https://github.com/Vincelee78/Project-3-Express-mySQL)

The schema diagram for mySQL database can be found [here.](https://res.cloudinary.com/dtrwtlldr/image/upload/v1639099995/mySQL_relationship_final_tq5zw7.jpg)


### Functional requirements:
#### Features: 
There are different categories of wall beds the user can click on and check the description, the photos, the dimensions of the wall bed according to the mattress size, the materials the bed is made from and their prices.
There is an add to cart option for users to purchase the wall bed they want. They also can pay by credit card to checkout their cart items.
Content: Each category of wall bed has a brief description and their key features, the delivery information and the price for each wall bed according to mattress size.
Non-functional requirements:
•	Page should load fast for users to easy navigate between the different wall beds
•	It should look good visually on most mobile sizes as mobile users can purchase the beds using their mobiles
•	Site’s language is in English as most people in Singapore use English as their mode of communication
•	We do not store passwords and credit card numbers as a privacy requirement
•	We have access Tokens, and verified signatures and other security protection to protect sensitive data and also against hacking.
•	Selling wall beds are legal as all the furniture sold is safe to use and complies with the Government regulations.


## <a name="b">2. Deployment</a>
This project is deployed on Netlify. The front end(react.js) website for consumers can be accessed at the following link:

https://www

The backend website for the site owner can be accessed at the following link:

https://www

The backend express.js uses tailwindcss, bootstrap and css. The react.js frontend uses bootstrap and css. The tailwindcss is complied using the inline css feature under the <style> tag in the base.hbs of the backend express.js.
 

 ## <a name="c">3. Website Features and Navigation</a>
 The website is free to browse for everyone, however user accounts need to be created to access cart and do checkout. The features of this website are listed below:
 
 * Product Listing, searching, sorting, filtering and browsing.
 <br/>The website supports searching, sorting, filtering and browsing products. The products are listed in a card graphical view. It can be filtered by their different category options, maximum and minimum cost, name, etc.
 
 * Cart, Checkout, Order Details
 <br/>A logged in user can add products to cart, checkout and view their order details.

 * Directions
 <br/>There is directions page on the website. The user can locate the location of the company's showroom on the marker in the map and the nearest mrt station to our showroom.
 
 * About
 <br/>There is an about page where it will provide background information to the user about space-saving furniture and our company.
 
### 3.1 Navigation
The following tree shows a general direction in which one might navigate through the website:
 
 ![Image](https://res.cloudinary.com/dtrwtlldr/image/upload/v1639123199/New_save_final_wuye4v.jpg)
 
 
 ## <a name="d">4. Technologies Used</a>

 * [React 17.0.2](https://reactjs.org/)
<br> This project uses React as a frontend application for building user interfaces.
* [Bootstrap 5.1.3](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
<br> This project uses Bootstrap to structure the layout of the website such as my Navbar. It is also used in positioning the text and features.
* [React Bootstrap](https://react-bootstrap.github.io/)
<br> This project uses React Bootstrap for added features such as the Carousel feature
* [date-fns](https://date-fns.org/)
<br> This project uses date-fns toolset to change the datetime format in mySQL to a more readable date format in React.
* [FontAwesome 5.15.4](https://fontawesome.com/v5/changelog/latest)
<br> This project uses FontAwesome to add custom icons such as icons in the wall bed detailed option page.
* [Axios 0.21.1](https://www.npmjs.com/package/axios/v/0.21.1) 
<br> This project uses the axios plugin for Promise based HTTP client for the browser and make requests to an API, return data from the API.
* [mySQL](https://www.mysql.com/)
<br> This project uses mySQL to store documents in the collections which the backend user has uploaded in express.js. 
* [ExpressJS 4.17.1](https://expressjs.com/)
<br> This project uses ExpressJS in the backend to provide methods to specify what function is called for a particular HTTP verb ( GET , POST , PUT , DELETE) and URL pattern and to retrieve data from mySQL and send them to React or vice versa.
* [Animate css](https://animate.style/)
<br> A library for creating animations for the fonts sliding in out out in Carousel.
* [React Hook Form](https://react-hook-form.com/)
<br> A library for building forms with React.js.
* [React Router dom](https://react-hook-form.com/)
<br> A library for routing.
* [React-toastify](https://github.com/fkhadra/react-toastify)
<br> React components library for displaying toast notifications.
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
The organization of the site content will contain the landing page with the navigation bar and site’s logo on the top. The landing page will show the hero image of the open and closed image of a featured wall bed, and clicking on 'shop all beds' will bring the user to another page where it show the different wall bed categories and their respective images. In this page, filtering the wall beds is possible using a search feature. Clicking on the wall beds' categories will show their respective options, their description and the add to cart feature.
* The total unit price and subtotal will be shown when the user selects the wall bed he/she wants to purchase. This website caters to the local residents in Singapore so there are no additional shipping costs as it is included in the unit cost price.
*	Refund is allowed when the furniture arrives in a damaged condition. User has 3 days to file a claim after they receive the bed and provide photo evidence under at the bottom of the landing page where our contact details, location and email can be found.
*	The database will store the user's shipping and order details and will be shown in their user account in the front end.
*	The order status will also be shown in the user account.

### Skeleton:
#### Layout:
*	The user login, logout and register is at the top right of the screen for easy reference.
*	Checking out button will be done in the shopping cart. It is located on the top right of the navigation bar where it can be seen easily as a blue shopping cart icon. Total and subtotal price will be shown in the shopping cart, including shipping.
*	Search function will be in the catalogue page of the site with the image and name of the wall beds.
*	In the navigation bar at the top, will be home, catalogue, about and account pages. Within the 'home' option of the navigation bar, it will have a dropdown bar consisting of the 'home page' and 'directions' option. Clicking on the 'directions' option will open a map showing the marker with the location of our showroom and an marker of the nearest MRT station to our showroom.
*	The company logo is at the left of the navigation bar at the top.

### Surface:
#### Colours:
White background with black and dark brown fonts in the landing page for better contrast and easy visualization. 
Usage of [coolors](https://coolors.co/) to select my colour scheme.
Images used will not be too bright colours as I am using a white background.
Usage of traditional fonts such as 'Stencil Std, Fantasy' and 'Times New Roman, Times, serif'.
Adequate white spaces between characters and lines in description for easy reading.


5.2.2 User Experience
Although the website makes prolific use of tables in the backend , most components except the tables are mobile-friendly. The frontend react features are mobile responsive. The backend express.js uses tailwindcss to create a responsive design. The default tailwind font family can be found in the documentation [here](https://tailwindcss.com/docs/font-family)
 
 
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


#### (i) Known Bugs
- When clicking on the radio button to filter the criteria in all cases, if there are more than 1 case result, the radio button will not be checked on the first click. The results will be filtered on the first click though.
- If this happens, clicking on the radio button again will check it.

### 6.1 Future Features To Implement
- A embedded video feature for users to watch how the wall bed is opened in its closed position.
- The test results can be found [here](https://search.google.com/test/mobile-friendly/result?id=84WEjVlEU9HRktwiAVtipg). 
- Test results were done on 3 mobile devices
1. [Iphone SE 2020](https://drive.google.com/file/d/1B06e0L3hfUrrEeajgfzpnTTRQsVkN9NI/view?usp=sharing)
2. [Iphone SE 2020](https://drive.google.com/file/d/1jlnrQgIrxTtGkpZ26uqcvULjYThx2won/view?usp=sharing)
3. [Iphone7](https://drive.google.com/file/d/17JSsa8ndR0jqm9YPSC4i6wlzV6iq9ueP/view?usp=sharing)
4. [Iphone7](https://drive.google.com/file/d/1i-CZn-8A3UUucZ7DTT-Ph3HM76dxyXoy/view?usp=sharing)
5. [Oppo R17 pro](https://drive.google.com/file/d/1lqkfbubAylYw5RjCdXd7EkBEhw-S28CS/view?usp=sharing)
6. [Oppo R17 pro](https://drive.google.com/file/d/1tOywxp3MgakxsQFZ-tI2SM-UOcrHR4CN/view?usp=sharing)
- The web application is mobile responsive.

 ### <a name="g">7. Credits and Acknowledgement</a>
* Credits to https://www.qoo10.sg/shop/spacesaving for the company's vision and wall beds data.
* Credits to https://shop.smartbeds.it for their wall bed images and their descriptions.
* Credits to https://www.amazingspace.sg for their page on 'What is space saving furniture' and their wall bed image.
* All code snippets and templates used in this project are attributed in the source code where applicable.
