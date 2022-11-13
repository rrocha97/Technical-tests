# NodeJS + TypeScript coding exercise

## Introduction

For this exercise, you’ll need to complete a simple NodeJS app using an external REST API. Time is limited, we know it, don't worry if you don't get to complete all the requirements.

Good luck!

## Notes:

The whole exercise will take 1 hour and 40 minutes, each part has a recommended time.

We split this into 3 parts, we expect you commit your changes to each of them.
At the end of the exercises, create a pull-request against the master branch.

- You can use `yarn` or `npm`
- Check `.nvmrc` for node version
- You can use any available package on npm

## Part 1 (recommended time - 30 minutes)

Take a look at the project, you will find some code-smells, architectonical
issues, and some bad practices. Please make all the changes you think are
necessary to resolve these problems.

## Part 2 (recommended time - 60 minutes)

The `/criptos` endpoint makes an HTTP request to the Coin Market API and returns
to the user a list of the 250 latest records.

Considering that the Coin Market API has a rate limit and assuming that our
`/criptos` endpoint will be requested thousands of times per second, we need a
way to reduce the amounts of requests we make to the Coin Market API and make
**only one request every 60 seconds**. Implement and test this optimization.

## Part 3 (recommended time - 10 minutes)

Now suppose that we want to build this project for production and we really care
about some aspects like security and performance. Introduce the changes you
consider are important for that matter.

## Some scripts

Run `yarn build` to build js from typescript source.

Run `yarn test` to run tests.

Run `yarn dev` to start and automatically detect any source-code changes,
restarting the server as well.
