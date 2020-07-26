const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";
var wait = ms => new Promise((r, j)=>setTimeout(r, ms));

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const tableBudgets = 'budgets';
const customerTable = 'customers';


const getAllBudgets = () => {
    const params = {
        TableName: tableBudgets
    };

    return docClient.scan(params).promise();
};


const getBudget = (budgetid) => {
    const params = {
        TableName: tableBudgets,        
        KeyConditionExpression: "budgetid = :budgetid",
        ExpressionAttributeValues: {
            ":budgetid": budgetid
        },
    };
    return docClient.query(params).promise();
};


const addBudget = async (customerid, budgetData) => {
    const customer = await getCustomerData(customerid);
    //await wait(5000);
    var newDate = new Date();
    var finalDate = newDate.toString();
    //Pending calculate total budget amount

    const params = {
        TableName: tableBudgets,
        Item: {
            "budgetid": uuid.v1(),
            "customer": customer,
            "products": budgetData.products,
            "date": finalDate,
            "total": budgetData.total
        }
    };
    return docClient.put(params).promise();
};


async function getCustomerData (customerid){
    const customerData = await getCustomer(customerid);
    return customerData;
};

function getCustomer(customerid){
    const params = {
        TableName: customerTable,        
        KeyConditionExpression: "customerid = :customerid",
        ExpressionAttributeValues: {
            ":customerid": customerid
        },
    };
    return docClient.query(params).promise();
}

module.exports = {
    getAllBudgets,
    getBudget,
    addBudget
};