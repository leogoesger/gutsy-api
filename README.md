`This starts the sequelize`
$ sequelize init

Create a new model:
`$ sequelize model:create --name TodoItem --attributes content:string,complete:boolean'

To enter Postgres CLI from terminal:
`psql`

Show database:
`\list;`

Drop database:
`DROP DATABASE name;`

Create database;
`CREATE DATABASE rockyard_development;`

Connect database;
`\connect database_name;`

Exist psql
`\q`


Start the server on port 8000:
`yarn/npm start`


```
$ sequelize db:migrate        # Run pending migrations.
$ sequelize db:migrate:undo   # Revert the last migration run.
$ sequelize help              # Display this help text.
$ sequelize init              # Initializes the project.
$ sequelize migration:create  # Generates a new migration file.
$ sequelize version           # Prints the version number.
```
