const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";
const tableProduct = 'products'

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
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


const addCustomer = (customerData) => {
    const params = {
        TableName: table,
        Item: {
            "customerid": uuid.v1(),
            "name": customerData.name,
            "lastname": customerData.lastname,
            "email": customerData.email,
            "company": customerData.company
        }
    };
    return docClient.put(params).promise();
};


const addCompanyToCustomer = (customerid, companyData) => {

    const company = {
        "companyid": uuid.v1(),
        "vatregnumber": companyData.vatregnumber,
        "name": companyData.name,
        "country": companyData.country,
        "industry": companyData.industry
    };

    const params = {
        TableName: table,
        Key: {
            "customerid": customerid
        },
        UpdateExpression: 'set company = :company',
        ExpressionAttributeValues:{
            ":company": company
        },
        ReturnValues: "UPDATED_NEW"
    };
    return docClient.update(params).promise();
}


module.exports = {
    getAllCustomers,
    getCustomer, 
    addCustomer,
    addCompanyToCustomer
};