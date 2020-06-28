'use strict';

const dbManager = require('./dbCustomerManager');


exports.entriesHandler = (event, context, callback) => {
    switch (event.httpMethod) {     
        case 'GET':
            if (event.pathParameters && event.pathParameters.customerid){
                getCustomer(event.pathParameters.customerid, callback);
            }else{
                getAllCustomers(callback);         
            } 
            break;
        case 'POST':
            addCustomer(event.body, callback);
            }
            break;
        default:
            sendResponse(400, `Unsupported method ${event.httpMethod}`, callback);
    }
};


const getAllCustomers = (callback) => {
    dbManager.getAllCustomers()
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


const getCustomer = (customerid, callback) => {
    dbManager.getCustomer(customerid)
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

    dbManager.addCustomer(data)
    .then((res) => {
        sendResponse(200, res, callback);
    })
    .catch((err) => {
        console.log(err);
        sendResponse(200, err, callback);
    });
};


const sendResponse = (statusCode, message, callback) => {
    const res = {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
    callback(null, res);
};