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
    //let totalProductPrice = 0;
    let totalPriceBudget = getProductPrice(data.budgetdetails[0].productid);
    /*
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
            totalProductPrice = priceBudget;
            });
        }
    });
    */


    console.log("Price outside the calculator: " + totalPriceBudget);

    const budgetid = uuid.v1();
    const budget = {
        "description": data.description,
        "budgetdetails": data.budgetdetails,
        "totalprice": totalPriceBudget
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



async function getProductPrice(productid) {

    const productData = {
        TableName: tableProduct,        
        KeyConditionExpression: "productid = :productid",
        ExpressionAttributeValues: {
            ":productid": productid
        },
    };

    const productPrice = await docClient.query(productData, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            return 0;
        } else {
            let priceBudget;
            data.Items.forEach(function(item){
                priceBudget = item.unitprice; 
                console.log("Price of the budget: " + priceBudget);
            });

            return new Promise.resolve(priceBudget);
        }
    });
    productPrice.then((value) => {
      return value;  
    })
    //return await productPrice;
};


module.exports = {
    getAllCustomers,
    getCustomer, 
    addCustomer,
    addBudget
};