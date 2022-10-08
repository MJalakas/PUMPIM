const pool = require('../../db');
const queries = require('./queries');

const getProducts = (req, res) => {
    pool.query(queries.getProducts, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addProduct = (req, res) => {
    const { name, brand, price } = req.body;
    pool.query(queries.addProduct, [name, brand, price], (error, results) => {
        if (error) throw error;
        res.status(201).send("Product added!");
    });
};

module.exports = {
    getProducts,
    addProduct,
};

/*
const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already in use");
        };

        // add student to db if email doesnt exist
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send("Student created successfully!");
        });
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database");
        };
        
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Student id ${id} has been deleted!`);
        });
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (!results.rows.length) {
            res.send("Student does not exist");
        };

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student updated!")
        });
    });

};
*/