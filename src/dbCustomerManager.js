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

    //Calculamos el importe del presupuesto segun los productos elegidos:
    let priceBudget = 0;
   
    const productData = {
        TableName: tableProduct,        
        KeyConditionExpression: "productid = :productid",
        ExpressionAttributeValues: {
            ":productid": data.budgetdetails[0].productid
        },
    };
 
    docClient.query(productData, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item){
                priceBudget = item.unitprice; 
            console.log("Price of the budget: " + priceBudget);
            });
        }
    });

    console.log("Price outside the calculator: " + priceBudget);

    const budgetid = uuid.v1();
    const budget = {
        "description": data.description,
        "budgetdetails": data.budgetdetails,
        "totalprice": priceBudget
    };

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




module.exports = {
    getAllCustomers,
    getCustomer, 
    addCustomer,
    addBudget
};