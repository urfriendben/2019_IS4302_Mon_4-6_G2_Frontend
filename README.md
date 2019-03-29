# IS4302 online shopping website_frontend

## About
Our project is a online shopping website and built on the permissioned Hyperledger Fabric blockchain framework to ensure transparency and non-repudiation in e-commerce application. Our project utilize Hyperledger Composer and Firebase as backend, ReactJS and ExpressJS as front end.

## Deployed websites link
Our project has been deployed on the cloud, you can directly access them through these links below:
Note! Before accessing these link, please install this Chrome extension:
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en <b>(Ensure extension turned on and shows green when testing application, turn off and shows red when not testing to avoid errors in other websites on chrome)</b>
then open the below link in Chrome browser:

Consumer:<br/>
http://customer-is4302.surge.sh

Supplier/Shipping Partner:<br/>
http://admin-is4302.surge.sh<br/>


<b>This website requires login</b><br/>

If you want to login as a supplier<br/>
Username: supplier<br/>
Password: password<br/>

If you want to login as a shipping partner:<br/>
Username: shipping_partner<br/>
Password: password<br/>


## Table of Contents

- [Installation Guild](#installation-guide)
- [Supported Browsers](#supported-browsers)

## Installation Guide
To run the project on the localhost, make sure you have installed the below dependencies:
  npm: version '6.7.0'
The commands to run on the command line:
1. To clone the repository to local: 
```bash
git clone https://github.com/urfriendben/2019_IS4302_Mon_4-6_G2_Frontend.git
```
2. Navigate to the root folder of the repository
```
cd path_to_repository
```
3. To direct to the customer/admin branch
```bash
git checkout customer
```
```bash
git checkout admin
```
4. Use npm to install modules and start the server
```bash
npm install
npm run start
```
5. The default browser will auto open the webpage on localhost:3000

## Supported Browsers

Chrome Version 72.0.3626.121 (Official Build) (64-bit)

