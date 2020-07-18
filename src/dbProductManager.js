const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const table = 'products';


const getAllProducts = () => {
    const params = {
        TableName: table
    };

    return docClient.scan(params).promise();
};


const getProduct = (productid) => {
    const params = {
        TableName: table,        
        KeyConditionExpression: "productid = :productid",
        ExpressionAttributeValues: {
            ":productid": productid
        },
    };
    return docClient.query(params).promise();
};


const addProduct = (product) => {
    const params = {
        TableName: table,
        Item: {
            "productid": uuid.v1(),
            "productcode": product.productcode,
            "name": product.name,
            "description": customer.description,
            "unitprice": customer.unitprice
        }
    };

    return docClient.put(params).promise();
};


module.exports = {
    getAllProducts,
    getProduct, 
    addProduct
};