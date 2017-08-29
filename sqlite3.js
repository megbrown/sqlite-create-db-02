"use strict";

const { Database } = require('sqlite3').verbose();
const db = new Database('employees.sqlite', () => console.log('Connected!'));
const { list } = require('./employees.json');
const errorHandler = (err) => {
  if (err) {
    console.log(`Msg: ${err}`);
  };
};

db.run(`DROP TABLE IF EXISTS employees`);

const createEmployeesTable = () => {
	db.run("CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT, salary INT)");
}
createEmployeesTable();

list.forEach( (employee) => {
	db.run(`INSERT INTO employees VALUES(
		${employee.id},
    "${employee.firstName}",
    "${employee.lastName}",
    "${employee.jobTitle}",
    "${employee.address}",
    ${employee.salary})`
  )
});

db.each('SELECT * FROM employees', (err, record) => {
  console.log('record', record);
  if (err) {
    return console.log('err', err.toString());
 	}
});

db.each(`SELECT jobTitle
				FROM employees`, (err, record) => {
					console.log(record);
				if (err) {
					return console.log('err', err.toString());
				}
});

db.each('SELECT firstName, lastName, address FROM employees', (err, {firstName, lastName, address}) => {
	if (err) {
		return console.log('err', err.toString());
	}
	console.log(`${firstName} ${lastName}, address: ${address}`);
});

db.each(`SELECT jobTitle, firstName, lastName
				FROM employees
				WHERE jobTitle = "Football Player"`, (err, {jobTitle, firstName, lastName}) => {
					if (err) {
						return console.log('err', err.toString());
					}
					console.log(`job title: ${jobTitle}, ${firstName} ${lastName}`)
				})

