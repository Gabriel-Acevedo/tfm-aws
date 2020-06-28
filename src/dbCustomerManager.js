const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'customers';


const getAllCustomers = () => {
    const params = {
        TableName: table
    };

    return docClient.scan(params).promise();
};


const getCustomer = (customerid) => {
    const params = {
        TableName: table,        
        KeyConditionExpression: "customerid = :customerid",
        ExpressionAttributeValues: {
            ":customerid": customerid
        },
    };
    return docClient.query(params).promise();
};


const addCustomer = (data) => {
    const params = {
        TableName: table,
        Item: {
            "customerid": uuid.v1(),
            "name": data.name,
            "age": data.age
        }
    };

    return docClient.put(params).promise();
};


module.exports = {
    getAllCustomers,
    getCustomer, 
    addCustomer
};