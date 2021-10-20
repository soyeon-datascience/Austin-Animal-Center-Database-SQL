const routes = require('express').Router();

routes.get('', (req, res) => {
    res.render('index');
});

// routes.get('/tables/in_out_mega', (req, res) => {
//     const getData = require('../services/get_data');
//     const url = 'http://localhost:3000/api/in_out_mega';
//     getData(url, (err, results) => {
//         const columns = Object.keys(results.body.results[0]);
//         console.log(columns.length);
//         res.render('table-data', { title: 'Table Data', columns: columns, tableData: results.body.results});
//     });
// });
 
routes.get('/tables/in_out_mega', (req, res) => {
    const getData = require('../services/get_data');
    const page = isNaN(parseInt(req.query.page)) ? 0 : parseInt(req.query.page);
    const limit = isNaN(parseInt(req.query.limit)) ? 10 : parseInt(req.query.limit);
    const url = 'http://localhost:3000/api/in_out_mega/pagination?page=' + page + '&limit='+ limit;
    getData(url, (err, results) => {
        if (err){
            res.status(404);
            throw err;
        }
        const columns = Object.keys(results.body.data.data[0]);
        console.log(columns.length);
        res.render('table-data', { title: 'Table Data', 
                                    columns: columns, 
                                    tableData: results.body.data.data, 
                                    totalPages: results.body.data.totalPages, 
                                    currentPageNumber: results.body.data.currentPageNumber,
                                    limit: limit,
                                    tableName: "in_out_mega"
                                });
    });
}); 

routes.get('/tables/customers', (req, res) => {
    const getData = require('../services/get_data');
    const page = isNaN(parseInt(req.query.page)) ? 0 : parseInt(req.query.page);
    const limit = isNaN(parseInt(req.query.limit)) ? 10 : parseInt(req.query.limit);
    const url = 'http://localhost:3000/api/customers/pagination?page=' + page + '&limit='+ limit;
    getData(url, (err, results) => {
        if (err){
            res.status(404);
            throw err;
        }
        const columns = Object.keys(results.body.data.customers[0]);
        console.log(columns.length);
        res.render('table-data', { title: 'Table Data', 
                                    columns: columns, 
                                    tableData: results.body.data.customers, 
                                    totalPages: results.body.data.totalPages,
                                    currentPageNumber: results.body.data.currentPageNumber,
                                    limit: limit,
                                    tableName: "customers"
                                });
    });
}); 

module.exports = routes;