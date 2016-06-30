# node-user-list

A little node user list that saves to a PostgreSQL database.

After cloning run "npm install".

You need a PostgreSQL database named 'node-hero' and a table named 'users' with 2 columns.

To create DB:
```sql
CREATE DATABASE node_hero;
```

To create Table:
```sql
CREATE TABLE users(  
  name VARCHAR(20),
  age SMALLINT
);
```
