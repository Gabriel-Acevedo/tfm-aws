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

const getProductByCode = (productcode) => {
    const params = {
        TableName: table,        
        KeyConditionExpression: "productcode = :productcode",
        ExpressionAttributeValues: {
            ":productcode": productcode
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
            "description": product.description,
            "unitprice": product.unitprice
        }
    };

    return docClient.put(params).promise();
};


module.exports = {
    getAllProducts,
    getProductByCode,
    addProduct
};