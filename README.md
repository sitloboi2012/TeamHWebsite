# TeamHWebsite
Web Programming Group Assignment 2

# How to run on local-host
1. Install packages in the __package.json__ file using __npm install__
2. To start the website, please run __npm start__
3. Connect your MongoDB Cloud URI to the __database.js__ file.
    - Currently, I already created 4 tables:
        - __username-info__: contains all the username and role of all user
        - __shipper-info__: contains all the information of the shipper role
        - __customer-info__: contains all the information of the customer role
        - __vendor-info__: contains all the information of the vendor role
4. First page you should go to registration page as you need to have account or else you wont be able to log into other page.
5. Create account then login in and then you are free to go

# Folder Structure
~~~
/main: contains original static code
/models: contains the mongodb database model structure
/public: contains the static files like css, js, images
/views: contains the EJS file. File at the root level is the router HTML
    /partials: the __main__ function of each page
    /layouts: the whole EJS file included different small part
~~~

# Current Available Router
~~~
localhost:3000/ : login page
/registration: Registration First Page
/vendor-registration: Vendor Registration Form
/customer-registration: Customer Registration Form
/shipper-registration: Shipper Registration Form
-------------
/shipper-page: the main shipper page
/shipper-profile: the shipper profile page
-------------
/vendor-page: the main vendor page
/vendor-profile: the vendor profile page
/vendor-page/all-product: vendor all product page
/vendor-page/add-product: vendor add product page
-------------
/customer-page: the main customer page
/customer-profile: the customer profile page
~~~

# Link Github
- https://github.com/sitloboi2012/TeamHWebsite

# Current Account (username / password)
- Shipper: shipper1 / mypassword
- Vendor: great_phone_case / mypassword
- Customer: testing1 / 123456
