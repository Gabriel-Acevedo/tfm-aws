const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const productTable = 'products';


const getAllProducts = () => {
    const params = {
        TableName: productTable
    };

    return docClient.scan(params).promise();
};


const getProduct = (productid) => {
    const params = {
        TableName: productTable,        
        KeyConditionExpression: "productid = :productid",
        ExpressionAttributeValues: {
            ":productid": productid
        },
    };
    return docClient.query(params).promise();
};


const addProduct = (productData) => {
    const params = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": productData.code,
            "name": productData.name,
            "description": productData.description,
            "expensehours": productData.expensehours
        }
    };

    return docClient.put(params).promise();
};


module.exports = {
    getAllProducts,
    getProduct, 
    addProduct
};