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
        Item: {
            "customerid": uuid.v1(),
            "name": customer.name,
            "lastname": customer.lastname,
            "phone": customer.phone,
            "email": customer.email,
            "company": customer.company,
            "budgets": customer.budgets || {}
        }
    };

    return docClient.put(params).promise();
};


const addBudget = (customerid, data) => {
    const budgetid = uuid.v1();
    const budget = {
        "description": data.description,
        "budgetdetails": data.budgetdetails,
        "totalprice": data.totalprice
    };

    //Calculamos el importe del presupuesto segun los productos elegidos:
    const priceBudget = 0;
    const productPrice = 0;
    for(var price in data.budgetdetails){
        if(data.budgetdetails.hasOwnProperty(price)){
        const product = getProductData(data.budgetdetails.productid);
        productPrice = product.Items.unitprice;
        priceBudget = priceBudget + productPrice;
        }
    }

    budget.totalprice = priceBudget;

    const params = {
        TableName: table,
        Key: {
            "customerid": customerid
        },
        UpdateExpression: 'set budgets.#budgetid = :budget',
        ExpressionAttributeNames: {
            "#budgetid": budgetid
        },
        ExpressionAttributeValues:{
            ":budget": budget
        },
        ReturnValues: "UPDATED_NEW"
    };
    return docClient.update(params).promise();
}


const getProductData = (productid) => {
    const params = {
        TableName: tableProduct,        
        KeyConditionExpression: "productid = :productid",
        ExpressionAttributeValues: {
            ":productid": productid
        },
    };
    return docClient.query(params).promise();
};

module.exports = {
    getAllCustomers,
    getCustomer, 
    addCustomer,
    addBudget
};