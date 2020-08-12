const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const customerTable = 'customers';


//Customer APIs
const getAllCustomers = () => {
    const params = {
        TableName: customerTable
    };
    return docClient.scan(params).promise();
};


const getCustomer = (customerid) => {
    const params = {
        TableName: customerTable,        
        KeyConditionExpression: "customerid = :customerid",
        ExpressionAttributeValues: {
            ":customerid": customerid
        },
    };
    return docClient.query(params).promise();
};


const addCustomer = (customerData) => {
    const params = {
        TableName: customerTable,
        Item: {
            "customerid": uuid.v1(),
            "name": customerData.name,
            "lastname": customerData.lastname,
            "email": customerData.email,
            "company": customerData.company,
            "budgets": customerData.budgets || {}
        }
    };
    return docClient.put(params).promise();
};
//END Customer APIs


module.exports = {
    getAllCustomers,
    getCustomer, 
    addCustomer
};