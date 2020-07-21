'use strict';

const dbCustomerManager = require('./dbCustomerManager');
const dbProductManager = require('./dbProductManager');


exports.customerHandler = (event, context, callback) => {
    switch (event.httpMethod) {     
        case 'GET':
            if (event.pathParameters && event.pathParameters.customerid){
                getCustomer(event.pathParameters.customerid, callback);
            }else{
                getAllCustomers(callback);         
            } 
            break;
        case 'POST':
            if(event.pathParameters && event.pathParameters.customerid){
                addCompanyToCustomer(event.pathParameters.customerid, event.body, callback) 
            }else{
                addCustomer(event.body, callback);
            }
            break;
        default:
            sendResponse(400, `Unsupported method ${event.httpMethod}`, callback);
    }
};


exports.productHandler = (event, context, callback) => {
    switch (event.httpMethod) {     
        case 'GET':
            if (event.pathParameters && event.pathParameters.productid){
                getProduct(event.pathParameters.productid, callback);
            }else{
                getAllProducts(callback);         
            } 
            break;
        case 'POST':
            addProduct(event.body, callback);            
            break;
        default:
            sendResponse(400, `Unsupported method ${event.httpMethod}`, callback);
    }
};

//Customer Functions
const getAllCustomers = (callback) => {
    dbCustomerManager.getAllCustomers()
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


const getCustomer = (customerid, callback) => {
    dbCustomerManager.getCustomer(customerid)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


const addCustomer = (data, callback) => {
    data = JSON.parse(data);

    dbCustomerManager.addCustomer(data)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


const addCompanyToCustomer = (customerid, company, callback) => {
    data = JSON.parse(data);

    dbCustomerManager.addCompanyToCustomer(customerid, company)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


//End Customer Functions


//Product Functions
const getAllProducts = (callback) => {
    dbProductManager.getAllProducts()
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


const getProduct = (productid, callback) => {
    dbProductManager.getProduct(productid)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


const addProduct = (data, callback) => {
    data = JSON.parse(data);

    dbProductManager.addProduct(data)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};
//End Product Functions



const sendResponse = (statusCode, message, callback) => {
    const res = {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
    callback(null, res);
};