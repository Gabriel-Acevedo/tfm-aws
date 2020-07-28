const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const productTable = 'products';

const init = () => {
    const prod1 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": productData.code,
            "name": productData.name,
            "description": productData.description,
            "expensehours": productData.expensehours
        }
    };

    const prod2 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": productData.code,
            "name": productData.name,
            "description": productData.description,
            "expensehours": productData.expensehours
        }
    };

    const prod3 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": productData.code,
            "name": productData.name,
            "description": productData.description,
            "expensehours": productData.expensehours
        }
    };

    const prod4 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": productData.code,
            "name": productData.name,
            "description": productData.description,
            "expensehours": productData.expensehours
        }
    };

    docClient.put(prod1).promise();
    docClient.put(prod2).promise();
    docClient.put(prod3).promise();
    docClient.put(prod4).promise();

    return docClient.put(prod5).promise();
};


module.exports = {
    init
};