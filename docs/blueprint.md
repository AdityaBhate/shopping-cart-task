# **App Name**: ShopEasy

## Core Features:

- User Registration: User registration with validation (email, first name, last name, password) using Formik.
- User Login: User login using registered credentials with error handling.
- Product Listing: Display products fetched from the fakestoreapi.com API.
- Product Details: Display detailed information for a selected product.
- Shopping Cart Management: Add, update, and delete products in the cart using Redux/LocalStorage.

## Style Guidelines:

- Primary color: Material UI's default blue for a professional look.
- Secondary color: Light grey for backgrounds and subtle UI elements.
- Accent: Teal (#008080) for buttons and highlights to give a modern feel.
- Clean and readable typography using Material UI's default font.
- Use Material UI icons for common actions like add to cart, user profile, etc.
- Responsive layout using Material UI's Grid and Container components.

## Original User Request:
Tech stack that you have to use in order to build this assignment is :-  
React (Javascript ), Formik (To build forms), Redux (to store the data) , Material UI. 
 
In order to store the data you can use Redux + Localstorage. 
 
Details:  
1. Create a user signup page and validate the fields as per below rules:  
    i.   Email: required and must be a valid email  
    ii.  First Name: required and min 2 characters  
    iii. Last Name: required and min 2 characters 
    iv. Password: required, 8 < length < 16, one uppercase, one lowercase and must have at               
        least one number and one special character.  
 
2. Create a login page and use the previously registered credentials to login.  
    Check if the name and password are matching. If the name and password are matching,                                   
    then move to the next screen, else show an “Invalid Credentials” message to the user.  
 
3. Upon successful login, open a new page, call the below API to show the products. 
 
4. Users can view single product details and can add the product in cart (USE Redux/localstorage  
    to store the data). 
 
Integrate this API to fetch sample products.   
https://fakestoreapi.com/docs 
 
Please note that the following conditions need to be fulfilled. 
 
1. Ability to view all products.  
2. Ability to view a particular product along with its attributes.  
3. Ability to log in, log out, register a user. 
4. Ability to add/update/delete an item to cart and update a particular product’s quantity.  
5. Ability to have smooth error handling. (It’s fine to just have plain alerts).
  