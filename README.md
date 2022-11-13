# Chat demo for PASHA Bootcamp

## About

Demo application developed for introduction to the web development module of [PASHA Coding Bootcamp](https://pasha-holding.az/en/press-media/news/pasha-coding-bootcamp/) in 2020. The goal was to implement a real-life application and make it as small as possible so students can investigate the source code to get familiar with HTML, CSS, and JavaScript. Another requirement was to make this application usable from mobile and desktop devices.

The overall application took 3 evenings to implement. The first evening is for business logic, the second evening is for design, and the last one is for testing and bug fixing.

Later the application was used on Bootcamp for some funny stuff, such as a “goose” API:

```
ЗАПУСКАЕМ
    ░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░
    ▄███▀░◐░░░▌░░░░░░░
    ░░░░▌░░░░░▐░░░░░░░
    ░░░░▐░░░░░▐░░░░░░░
    ░░░░▌░░░░░▐▄▄░░░░░
    ░░░░▌░░░░▄▀▒▒▀▀▀▀▄
    ░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄
    ░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄
    ░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄
    ░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄
    ░░░░░░░░░░░▌▌▌▌░░░░░
    ░░░░░░░░░░░▌▌░▌▌░░░░░
    ░░░░░░░░░▄▄▌▌▄▌▌░░░░░
```

## Live version

Available at Heroku: <https://bolta.herokuapp.com/> (deployed from the `master` branch)

## Running locally

If you want to run the application locally, you can do the following:

1. `git clone` the repository
2. Run `npm install`
3. Start project with `npm run start`

After the successful execution the local instance should be available at <http://localhost:3000>

## How to use

It’s a simple chat. Just send and receive messages. There is no authentication, just write your name and share the link with your friends. Everybody will see all messages that you see.

## Used technologies

- HTML5
- CSS3
- JavaScript ES6
- Express 4.17 ([documentation](https://expressjs.com/en/4x/api.html))
- [Heroku](https://heroku.com/)
