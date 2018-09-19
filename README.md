# mqtt-service

Background
==========

This app will allow MQTT client IoT devices to create relationship.

A front end to this service will provide the necessary plumbing to setup publish and/or subscribe.

The roles of this service will be:
* store history of subscribed topics
* configurable subscriptions



pre-requisites
--------------
postgres install
grant privileges to api
create database api


    -- standard packages
    npm i --save dotenv
    npm install eslint --save-dev
    npm install --save-dev babel-eslint@latest
    -- babel-eslint suggestion from Dan Abramov. Makes sense that even 
    -- though Node can handle ES6, that eslint may not and needs a little help
    -- with the ES6 and beyond.
    npm install nodemon --save-dev

    npm install babel-cli --save-dev
    npm install babel-preset-env babel-preset-stage-4npm install babel-preset-env babel-preset-stage-2 --save-dev --save-dev
    
    -- database connectivity
    npm i --save knex
    npm i --save pg
    
    -- feathers api server optional
    npm install --save feathers-knex
    npm i --save @feathers/feathers

babel added and config to enable export default / import

knex migrations in root folder.
Shifting to sub folder of your choice requires change to knexfile.js

start server

npm start

Disclaimer
----------

This work is personal experimentation, use at your own risk. The background is that I started as a developer in the late 90s and by 2005 I moved into Data ETL and BI but continued to do some development form time to time. The bulk of that development was in stand alone applications. My web expreience was limited to some early php web applications and some work with server side rendering in JSF and some java to javasript transpilation through GWT.

I have moved onto manage web projects and developed summary knowledge of the technologies. Doing basic tutorials to understand how the technologies work. This started with .Net MVC, then Angular and Vuejs. More recently working on a substantial React/Redux application has exposed me more to API development and associated tech such as Express and GraphQL.

My intent with any work published on github.com is to:
- store my personal work
- create tools and frameworks for resuse
- excercise my developer brain by creating scalable solutions
- version control my work in a persistent way




