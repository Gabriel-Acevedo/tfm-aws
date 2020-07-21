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


const addCustomer = (customer) => {
    const params = {
        TableName: table,
        Customer: {
            "customerid": uuid.v1(),
            "name": customer.name,
            "lastname": customer.lastname,
            "email": customer.email,
            "company": customer.company,
        }
    };
    return docClient.put(params).promise();
};


const addCompanyToCustomer = (customerid, company) => {

    const company = {
        "companyid": uuid.v1(),
        "vatregnumber": company.vatregnumber,
        "name": company.name,
        "country": company.country,
        "industry": company.industry
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