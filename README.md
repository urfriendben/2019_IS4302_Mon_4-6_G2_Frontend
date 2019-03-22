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

