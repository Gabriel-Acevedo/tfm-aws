const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});


const docClient = new AWS.DynamoDB.DocumentClient();
const tableBudgets = 'budgets';
const customerTable = 'customers';
const productTable = 'products';


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
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var newDate = new Date();
    var finalDate = [pad(newDate.getDate()), pad(newDate.getMonth()+1), newDate.getFullYear()].join('/');
    const customer = await getCustomerData(customerid);
    if(customer == null){
        return new Error("Customer not found");
    }

    var totalHours = await getTotalExpenseHours(budgetData.products);

    const params = {
        TableName: tableBudgets,
        Item: {
            "budgetid": uuid.v1(),
            "customer": customer,
            "products": budgetData.products,
            "date": finalDate,
            "total": totalHours
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


async function getTotalExpenseHours(products){
    let hours;
    let totalHours = 0;

    for(var i = 0; i< products.length; i++){
        var productData = await getProduct(products[i].productid);
        hours = productData.Items[0].expensehours;
        totalHours = totalHours + hours;
    }
    return totalHours;
}


function getProduct(productid){
    const params = {
        TableName: productTable,
        KeyConditionExpression: "productid = :productid",
        ExpressionAttributeValues: {
            ":productid": productid
        },
    };
    return docClient.query(params).promise();
}

module.exports = {
    getAllBudgets,
    getBudget,
    addBudget
};