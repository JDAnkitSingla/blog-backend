## Initialize the NodeJs Project

> Initialize node: `npm init`

`npm init -y`

> Install express.js: `npm i -s express`

> Install babel packages: `npm i --save-dev @babel/core @babel/node @babel/preset-env`

## Run NodeJs Server app

> Run node server: `npx babel-node src/server.js`

> Install nodeamon: `npm i --save-dev nodemon`

> Command to run in auto reload: `npx nodemon --exec npx babel-node src/server.js`

## Install Mongo DB

> Install brew using the official Homebrew installation instructions.
> [Homebrew Official Site](https://brew.sh/#install)

> Tap into mongo db: `brew tap mongodb/brew`

> Search for Mongodb: `brew tap | grep mongodb`

> Install community edition for mongodb: `brew install mongodb-community@4.4`

> Change mongodb data path: `mongod --dbpath <new path for mongo db files>` // Default is /data/db

> Prermission for data dir: ` sudo chown -R ``id -un`` <path> `

> To run mongodb: `mongo`
