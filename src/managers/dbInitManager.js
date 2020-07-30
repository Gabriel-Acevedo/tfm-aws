const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const productTable = 'products';
const customerTable = 'customers';
const companyTable = 'companies';
const budgetTable = 'budgets'

const init = async () => {
    var productid;
    var customerid
    for(var numberProd = 1; numberProd<=5; numberProd++){
        productid = uuid.v1();
        await createProduct(numberProd, productid);
    }

    for(var number = 1; number<=3; number++){
        customerid = uuid.v1();
        await createCustomer(number, customerid);
        await createCompany(number, customerid);
    }


    const customerInfo = await getCustomerData(customerid);
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var newDate = new Date();
    var finalDate = [pad(newDate.getDate()), pad(newDate.getMonth()+1), newDate.getFullYear()].join('/');
    let jsonProd = JSON.parse("[{\"productid\": \"" + productid + "\"}]");
    const params = {
        TableName: budgetTable,
        Item: {
            "budgetid": uuid.v1(),
            "customer": customerInfo,
            "products": jsonProd,
            "date": finalDate,
            "total": 25
        }
    };
    return docClient.put(params).promise();
};

async function createProduct(number, productid){
    return await addProduct(number, productid);
}


const addProduct = (number, productid) => {
    if(number == 1){
        const params = {
            TableName: productTable,
            Item: {
                "productid": productid,
                "code": "AR",
                "name": "Finanzas Avanzadas",
                "description": "Orientado hacia empresas que requieran facturación recurrente a sus clientes.",
                "expensehours": 30
            }
        };
        return docClient.put(params).promise(); 
    }

    if(number == 2){
        const params = {
            TableName: productTable,
            Item: {
                "productid": productid,
                "code": "AP",
                "name": "Compras Avanzadas",
                "description": "El módulo de Compras Avanzadas le ayudará llevando el control de sus compras relacionando las listas de precios autorizadas con los contratos que tiene activos.",
                "expensehours": 40
            }
        };
        return docClient.put(params).promise();
    }

    if(number == 3){
        const params = {
            TableName: productTable,
            Item: {
                "productid": productid,
                "code": "GL",
                "name": "Libros Contables",
                "description": "Con el módulo de Contabilidad Múltiple no tendrá que preocuparse si registró los movimientos en los Libros correspondientes porque Netsuite lo hará de manera automática e inmediata sin crear duplicidades que deban ser eliminadas posteriormente.",
                "expensehours": 55
            }
        };
        return docClient.put(params).promise();
    }

    if(number == 4){
        const params = {
            TableName: productTable,
            Item: {
                "productid": productid,
                "code": "ADMINISTRATION",
                "name": "Gestión de Sistemas",
                "description": "Despliegue las mejoras que ha creado y comparta por medio de la solución documentos e información electrónica con el módulo de Gestión de Software.",
                "expensehours": 75
            }
        };
        return docClient.put(params).promise();
    }

    if(number == 5){
        const params = {
            TableName: productTable,
            Item: {
                "productid": productid,
                "code": "RRHH",
                "name": "Asignación de Recursos",
                "description": "El módulo de Asignación de Recursos le permite medir la ocupación de sus recursos y las actividades en las que están comprometidos con fechas de inicio y fin.",
                "expensehours": 25
            }
        };
        return docClient.put(params).promise();
    }
    return null;
}


async function createCustomer(number, customerid){
    return await addCustomer(number, customerid);
}

const addCustomer = (number, customerid) => {
    if(number == 1){
        const params = {
            TableName: customerTable,
            Item: {
                "customerid": customerid,
                "name": "Saray",
                "lastname": "Gomez",
                "email": "saray@gmail.com",
                "company": ""
            }
        };
        return docClient.put(params).promise(); 
    }

    if(number == 2){
        const params = {
            TableName: customerTable,
            Item: {
                "customerid": customerid,
                "name": "David",
                "lastname": "Sanchez",
                "email": "david@gmail.com",
                "company": ""
            }
        }; 
        return docClient.put(params).promise();
    }

    if(number == 3){
        const params = {
            TableName: customerTable,
            Item: {
                "customerid": customerid,
                "name": "Helio",
                "lastname": "Artano",
                "email": "helio@gmail.com",
                "company": ""
            }
        }; 
        return docClient.put(params).promise();
    }
    return null;
}


async function createCompany(number, customerid){
    return await addCompany(number, customerid);
}


const addCompany = (number, customerid) => {
    var companyid = uuid.v1();
    if(number == 1){
        const params = {
            TableName: companyTable,
            Item: {
                "companyid": companyid,
                "vatregnumber": "A1234567Z",
                "name": "ACEVEDO",
                "country": "SPAIN",
                "industry": "TECNOLOGY"
            }
        };
        setCompany(customerid, params);
        return docClient.put(params).promise();
    }

    if(number == 2){
        const params = {
            TableName: companyTable,
            Item: {
                "companyid": companyid,
                "vatregnumber": "H2465784C",
                "name": "AMAZON",
                "country": "AMERICA",
                "industry": "LOGISTIC"
            }
        };
        setCompany(customerid, params);
        return docClient.put(params).promise();
    }

    if(number == 3){
        const params = {
            TableName: companyTable,
            Item: {
                "companyid": companyid,
                "vatregnumber": "W8749267L",
                "name": "CARREFOUR",
                "country": "FRANCE",
                "industry": "FEEDING"
            }
        };
        setCompany(customerid, params);
        return docClient.put(params).promise();
    }
    return null;
}

const setCompany = (customerid, companyData) => {
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
    init
};