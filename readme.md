# Introduction

Welcome to this project! The software you are about to see is a web scraper for the popular website https://news.ycombinator.com/. 

It scrapes each article and extracts its title, link, age, creator, number of comments, and points earned by that article. The data is stored in a JSON file with an array containing each article inside an object.

Here's an example of what the JSON file will look like:

```{[
{
"title": "Show HN: Plus – Self Updating Screenshots",
"url": "https://www.plusdocs.com/",
"points": 74,
"user": "alixaxel",
"age": "1 hour",
"comments": 34
},
{...},
{...}
]
```
## How to run it with Docker:

Just pull the image and run it.

 - ` docker pull sergiorubio99/node_scraper `
 - ` docker container run --rm -it -p [DESIRED PORT]:3000 --name node sergiorubio99/node_scraper `

Inside the container, just run `npm run start` to lift the server, or `npm run test` to run the tests.

## How to run it in your local machine: 

To use the app, you will need to install the dependencies listed in the `package.json` file. You can do this by running `npm i` in the terminal. 

Here are the available commands to use the app:
- `npm run start` - starts the server
- `npm run start_dev` - starts the server in developer mode
- `npm run test` - runs the tests

## Modules used
- **Express**: a minimalistic back-end javascript framework
- **Axios**: a JS library for sending HTTP requests
- **jsdom**: a JS library for parsing an HTTP response containing HTML into a manageable DOM
- **Express Router**: a router library by Express
- **node-cache**: a cache library made for NodeJS
- **Mocha**: Minimalistic testing library
- **Supertest**: Library for testing HTTP servers
- **Chai**: Testing assertion library.
