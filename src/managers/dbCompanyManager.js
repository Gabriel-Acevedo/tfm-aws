const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const companyTable = 'companies';
const customerTable = 'customers';


const getAllCompanies = () => {
    const params = {
        TableName: companyTable
    };

    return docClient.scan(params).promise();
};


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


const addCompany = (customerid, companyData) => {

    const params = {
        TableName: companyTable,
        Item: {
            "companyid": uuid.v1(),
            "vatregnumber": companyData.vatregnumber,
            "name": companyData.name,
            "country": companyData.country,
            "industry": companyData.industry
        }
    };

    setCompany(customerid, params);

    return docClient.put(params).promise();
};


async function setCompany(customerid, companyData){
    return await addCompanyToCustomer(customerid, companyData);
}

const addCompanyToCustomer = (customerid, companyData) => {
    
    const params = {
        TableName: customerTable,
        Key: {
            "customerid": customerid
        },
        UpdateExpression: 'set company = :company',
        ExpressionAttributeValues:{
            ":company": companyData
        },
        ReturnValues: "UPDATED_NEW"
    };
    return docClient.update(params).promise();
}


module.exports = {
    getAllCompanies,
    getCompany,
    addCompany
};