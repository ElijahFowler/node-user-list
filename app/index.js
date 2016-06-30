// index.js
'use strict'

const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const pg = require('pg')
const bodyParser = require('body-parser')

const app = express()
const conString = 'postgres://node-hero_user:P@ssword1@localhost/node_hero'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
	layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')

app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res, next) => {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			// pass the error to the express error handler
			return next(err)
		}

		client.query('SELECT name, age FROM users;', [], function(err, result) {
			done()

			if (err) {
				// pass the error to the express error handler
				return next(err)
			}

			res.render('home', {
				rows: result.rows
			})
		})
	})
})

app.post('/users', function(req, res, next) {
	const user = req.body

	pg.connect(conString, function(err, client, done) {
		if (err) {
			// pass the error to the express error handler
			return next(err)
		}

		client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function(err, result) {
			done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

			if (err) {
				// pass the error to the express error handler
				return next(err)
			}

			res.send({
				name: user.name,
				age: user.age
			})
		})
	})
})

app.delete('/users', function(req, res, next) {
	const user = req.body

	pg.connect(conString, function(err, client, done) {
		if (err) {
			// pass the error to the express error handler
			return next(err)
		}

		client.query('DELETE FROM users WHERE name = $1;', [user.name], function(err, result) {
			done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

			if (err) {
				// pass the error to the express error handler
				return next(err)
			}

			res.send({
				name: user.name
			})
		})
	})
})

app.get('/users', function(req, res, next) {
	pg.connect(conString, function(err, client, done) {
		if (err) {
			// pass the error to the express error handler
			return next(err)
		}

		client.query('SELECT name, age FROM users;', [], function(err, result) {
			done()

			if (err) {
				// pass the error to the express error handler
				return next(err)
			}

			res.render('users', {
				rows: result.rows
			})
		})
	})
})

console.log('App running at port :3000')

app.listen(3000);
