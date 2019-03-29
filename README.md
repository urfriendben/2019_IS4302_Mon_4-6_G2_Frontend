# IS4302 online shopping website_frontend

## About
Our project is a online shopping website and built on the permissioned Hyperledger Fabric blockchain framework to ensure transparency and non-repudiation in e-commerce application. Our project utilize Hyperledger Composer and Firebase as backend, ReactJS and ExpressJS as front end.

## Deployed websites link
Our project has been deployed on the cloud, you can directly access them through these links below:
Note! Before accessing these link, please install this Chrome extension:
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
then open the below link in Chrome browser:

Consumer:
customer-is4302.surge.sh

Supplier/Shipping Partner:
admin-is4302.surge.sh
This website requires login
If you want to login as a supplier
Username: supplier
Password: password
If you want to login as a shipping partner:
Username: shipping_partner
Password: password

## Table of Contents

- [Installation Guild](#installation-guide)
- [Folder Structure](#folder-structure)
- [Supported Browsers](#supported-browsers)

## Installation Guide
To run the project on the localhost, make sure you have installed the below dependencies:
  npm: version '6.7.0'
The commands to run on the command line:
1. To clone the repository to local: 
```bash
git clone https://github.com/urfriendben/is4302_ecomm.git
```
2. Navigate to the root folder of the repository
```
cd path_to_repository
```
3. To direct to the customer branch
```bash
git checkout customer
```
4. Use npm to install modules and start the server
```bash
npm install
npm run build
npm run start
```
5. The default browser will auto open the webpage on localhost:3000

## Folder Structure
The Customer branch looks like this

```
is4302-ecomm/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    ├── app
│   ├── App.jsx
│   ├── App.test.js
│   └── components
│       ├── AppFooter.jsx
│       ├── AppNavbar.jsx
│       ├── Error404.jsx
│       ├── Home.jsx
│       └── customerComponents
│           ├── Carousell.jsx
│           ├── CustomerHome.jsx
│           ├── MakeOrder.jsx
│           ├── OrderDetail.jsx
│           ├── OrderListing.jsx
│           ├── ProductDetail.jsx
│           ├── ProductListing.jsx
│           ├── ShoppingCart.jsx
│           └── SupplierProduct.jsx
├── img
│   ├── card1.jpg
│   ├── card2.jpg
│   ├── card3.jpg
│   ├── carousell1.jpg
│   ├── carousell2.jpeg
│   └── logo.png
├── index.js
├── registerServiceWorker.js
├── router
│   └── RouterOutlet.jsx
└── sass
    ├── app.scss
    ├── base
    │   ├── _breakpoints.scss
    │   ├── _helpers.scss
    │   └── _vars.scss
    ├── components
    │   ├── _home.scss
    │   ├── _index.scss
    │   └── customerComponents
    │       ├── appNavbar.scss
    │       ├── components.scss
    │       ├── home.scss
    │       └── menu.scss
    ├── example.scss
    ├── main.scss
    └── vendors
        ├── _index.scss
        └── bootstrap
            ├── _index.scss
            └── _vars.scss
```

## Supported Browsers

Chrome Version 72.0.3626.121 (Official Build) (64-bit)

