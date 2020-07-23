const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const customerTable = 'customers';
const companyTable = 'companies'


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
        TableName: customerTable,
        Key: {
            "customerid": customerid
        },
        UpdateExpression: 'set company = :company',
        ExpressionAttributeValues:{
            ":company": company
        },
        ReturnValues: "UPDATED_NEW"
    };

    //Create insert to company 
    addCompany(company);

    return docClient.update(params).promise();
}
//END Customer APIs


//Company APIs
const addCompany = (companyData) => {
   
    const params = {
        TableName: companyTable,
        Item: {
            "companyid": companyData.companyid,
            "vatregnumber": companyData.vatregnumber,
            "name": companyData.name,
            "country": companyData.country,
            "industry": companyData.industry
        }
    };
    return docClient.put(params).promise();
}


const getCompany = (companyid) => {
    const params = {
        TableName: companyTable,        
        KeyConditionExpression: "companyid = :companyid",
        ExpressionAttributeValues: {
            ":companyid": companyid
        },
    };
    return docClient.query(params).promise();
};


const getAllCompanies = () => {
    const params = {
        TableName: companyTable
    };
    return docClient.scan(params).promise();
};

//END Company APIs


module.exports = {
    getAllCustomers,
    getCustomer, 
    addCustomer,
    addCompanyToCustomer,
    //
    addCompany,
    getCompany,
    getAllCompanies
};