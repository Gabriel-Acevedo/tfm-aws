const uuid = require('uuid');
const AWS = require('aws-sdk');
const REGION = "us-east-1";

AWS.config.update({
    endpoint: "https://dynamodb." + REGION + ".amazonaws.com"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const productTable = 'products';
const customerTable = 'customers';

const init = () => {
    const prod1 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": "AR",
            "name": "Finanzas Avanzadas",
            "description": "Orientado hacia empresas que requieran facturación recurrente a sus clientes.",
            "expensehours": 30
        }
    };

    const prod2 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": "AP",
            "name": "Compras Avanzadas",
            "description": "El módulo de Compras Avanzadas le ayudará llevando el control de sus compras relacionando las listas de precios autorizadas con los contratos que tiene activos.",
            "expensehours": 40
        }
    };

    const prod3 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": "GL",
            "name": "Libros Contables",
            "description": "Con el módulo de Contabilidad Múltiple no tendrá que preocuparse si registró los movimientos en los Libros correspondientes porque Netsuite lo hará de manera automática e inmediata sin crear duplicidades que deban ser eliminadas posteriormente.",
            "expensehours": 55
        }
    };

    const prod4 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": "ADMINISTRATION",
            "name": "Gestión de Sistemas",
            "description": "Despliegue las mejoras que ha creado y comparta por medio de la solución documentos e información electrónica con el módulo de Gestión de Software.",
            "expensehours": 75
        }
    };

    const prod5 = {
        TableName: productTable,
        Item: {
            "productid": uuid.v1(),
            "code": "RRHH",
            "name": "Asignación de Recursos",
            "description": "El módulo de Asignación de Recursos le permite medir la ocupación de sus recursos y las actividades en las que están comprometidos con fechas de inicio y fin.",
            "expensehours": 25
        }
    };

    docClient.put(prod1).promise();
    docClient.put(prod2).promise();
    docClient.put(prod3).promise();
    docClient.put(prod4).promise();

    for(var contador = 1; contador<=3; contador++){
        var customerid = uuid.v1();
        createCustomer(contador, customerid);
    }

    return docClient.put(prod5).promise();
};


async function createCustomer(contador, customerid){
    return await addCustomer(contador, customerid);
}

const addCustomer = (contador, customerid) => {
    if(contador == 1){
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
    if(contador == 2){
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
    if(contador == 3){
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

module.exports = {
    init
};