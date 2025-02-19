# 🌲 Cypress, from Zero to the Cloud ☁️

[![cypress-do-zero-a-nuvem](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/simple/vzarda&style=flat&logo=cypress)](https://cloud.cypress.io/projects/vzarda/runs)

Sample project for the "Cypress, from Zero to the Cloud" course of the Talking About Testing online school.

## Pre-requirements

It is required to have git, Node.js and npm installed to clone and run this project.

> I've used versions `2.47.1`, `v22.13.1` and `10.9.2` of git, Node.js and npm, respectively. I suggest you use the same or later LTS versions.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

In this project, you can run the tests on a desktop or mobile viewport.

### Desktop

Run `npm test` (or `npm t` for the short version) to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open the Cypress App on a desktop viewport.

### Mobile

Run `npm run test:mobile` to run the test in headless mode on a mobile viewport.

Or, run `npm run cy:open:mobile` to open the Cypress App on a mobile viewport.

___

This project was recreated by me from Walmyr's course (Talking About Testing).