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
    
    
    const customerData = {
        "customerid": customer.Items[0].customerid,
        "name": customer.Items[0].name,
        "lastname": customer.Items[0].lastname,
        "email": customer.Items[0].email,
        "company": customer.Items[0].company
    };
    
    var totalHours = await getTotalExpenseHours(budgetData.products);

    const budgetId = uuid.v1();
    const params = {
        TableName: tableBudgets,
        Item: {
            "budgetid": budgetId,
            "customer": customerData,
            "products": budgetData.products,
            "date": finalDate,
            "total": totalHours
        }
    };

    const budgetCustomer = {
        "budgetid": budgetId,
        "products": budgetData.products,
        "date": finalDate,
        "total": totalHours
    };

    await setBudgetToCustomer(budgetId, customerid, budgetCustomer);

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


async function setBudgetToCustomer(budgetId, customerid, budgetData){
    return await addBudgetToCustomer(budgetId, customerid, budgetData);
}

const addBudgetToCustomer = (budgetId, customerid, budgetData) => {
    
    const params = {
        TableName: customerTable,
        Key: {
            "customerid": customerid
        },
        UpdateExpression: 'SET budgets.#budgetid = :val',
        ExpressionAttributeNames : {
            '#budgetid' : budgetId
          },
          ExpressionAttributeValues : {
            ':val' : budgetData
        },
        ReturnValues: 'UPDATED_NEW'
    };
    return docClient.update(params).promise();
    
}


module.exports = {
    getAllBudgets,
    getBudget,
    addBudget
};