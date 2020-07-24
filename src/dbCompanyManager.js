const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const tableCompanies = 'companies';


const getAllCompanies = () => {
    const params = {
        TableName: tableCompanies
    };

    return docClient.scan(params).promise();
};


const getCompany = (companyid) => {
    const params = {
        TableName: tableCompanies,        
        KeyConditionExpression: "companyid = :companyid",
        ExpressionAttributeValues: {
            ":companyid": companyid
        },
    };
    return docClient.query(params).promise();
};

module.exports = {
    getAllCompanies,
    getCompany
};