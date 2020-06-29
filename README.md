<h1 align="center">Welcome to kickstarter-rewards-service 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D6.14.5-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D12.16.3-blue.svg" />
  <a href="https://team-iroh.github.io/pledge-rewards/index.html" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/team-iroh/pledge-rewards/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/team-iroh/pledge-rewards/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/zjayers/kickstarter-rewards-service" />
  </a>
</p>

> This is the client & server side code for the rewards/pledges microservice that mocks the rewards component of the Kickstarter site.

### 🏠 [Homepage](https://github.com/team-iroh/pledge-rewards#readme)

## Server Documentation
https://team-iroh.github.io/pledge-rewards/index.html

## API Documentation
### /api/projects
https://documenter.getpostman.com/view/11644172/SzzkcH2w?version=latest

### /api/rewards
https://documenter.getpostman.com/view/11644172/SzzkcHBk?version=latest

## Prerequisites

- npm >=6.14.5
- node >=12.16.3

## Mounting Points in index.html
- Rewards module mounts to the div with id of 'rewards'
- Rewards modal window mounts to the div with id of 'modal-root'
```html
<div id="rewards"></div>
<div id="modal-root"></div>
```

## Install

```sh
npm install
```

## Usage - Start & Seed Database

```sh
npm run start:database
```

## Usage - Start WITHOUT Seeding Database

```sh
npm run start
```

## Usage - Seed Database Script

```sh
cd server
npm run seed:database
```

## Run tests

```sh
npm run test
```
