"use strict";

const { Database } = require('sqlite3').verbose();
const db = new Database('employees.sqlite', () => console.log('Connected!'));
const errorHandler = (err) => {
  if (err) {
    console.log(`Msg: ${err}`);
  };
};

db.run(`DROP TABLE IF EXISTS employees`);

const createEmployeesTable = () => {
	db.run("CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT)");
}
createEmployeesTable();

let list = [
  { id: 0, firstName: 'Fred', lastName: 'Smith', jobTitle: 'Cashier', address: '500 Somewhere Lane' },
  { id: 1, firstName: 'Bob', lastName: 'Smith', jobTitle: 'Dog Walker', address: '501 Somewhere Road' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', jobTitle: 'Lawyer', address: '503 Somewhere Avenue' },
  { id: 3, firstName: 'Alice', lastName: 'Smith', jobTitle: 'Trainer', address: '505 Somewhere Path' },
  { id: 4, firstName: 'Ben', lastName: 'Smith', jobTitle: 'Football Player', address: '507 Somewhere Pike' },
  { id: 5, firstName: 'Nick', lastName: 'Smith', jobTitle: 'Musician', address: '509 Somewhere Street' }
]

list.forEach( (employee) => {
	db.run(`INSERT INTO employees VALUES(
		${employee.id},
    "${employee.firstName}",
    "${employee.lastName}",
    "${employee.jobTitle}",
    "${employee.address}")`
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

