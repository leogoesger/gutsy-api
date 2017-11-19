# gutsy-api

[ ![Codeship Status for leogoesger/gutsy-api](https://app.codeship.com/projects/50c67ac0-af86-0135-f821-4af399b34749/status?branch=master)](https://app.codeship.com/projects/257499)
>

## About

This project uses [NodeJS](https://nodejs.org/), [ExpressJS](https://expressjs.com/), [Sequelize](http://docs.sequelizejs.com/), and [Postgres](https://www.postgresql.org/).

## Getting Started

1. Install [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/en/) and [Postgres](https://postgresapp.com/).
2. Create `dev` and `test` database in Postgres

    ```
    psql;
    CREATE DATABASE gutsy_development;
    CREATE DATABASE gutsy_test;
    ```

3. Install your dependencies

    ```
    cd path/to/gutsy-api; yarn
    ```

4. Start your app

    ```
    yarn start
    ```

## Testing

Simply run `yarn test` and all your tests in the `test/` directory will be run.

## Sequelize CLI

```
$ npm install -g sequelize-cli            

$ sequelize model:create --name TodoItem --attributes content:string,complete:boolean #Generate a model
```

## Help

For more information on all the things you can do with Sequelize CLI visit [sequelize cli ](https://github.com/sequelize/cli).

## Options

[Postico](https://eggerapps.at/postico/): A Modern PostgreSQL Client for the Mac

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
