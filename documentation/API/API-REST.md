# API REST - TFM-AWS

### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)

***

## GET ALL CUSTOMERS

_Get a list of all customers including their company and budgets_

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/customers

* ### RESPONSE:
	```
    {
        "Items": [
            {
                "budgets": {
                    "4f4aed80-f04d-11ea-a37d-e18018816fe0": {
                        "date": "06-09-2020 14:29:2",
                        "total": 55,
                        "budgetid": "4f4aed80-f04d-11ea-a37d-e18018816fe0",
                        "products": [
                            {
                                "productid": "c0f61e70-f04b-11ea-945a-e18826a01862"
                            }
                        ]
                    }
                },
                "lastname": "Novillo",
                "company": {
                    "vatregnumber": "G4658394T",
                    "name": "Amazon",
                    "country": "United States",
                    "companyid": "998aad70-f04a-11ea-8465-8795cc65771a",
                    "industry": "Logistics"
                },
                "email": "knovillo@gmail.com",
                "name": "Kathy",
                "customerid": "4e92ef80-f04a-11ea-8d6a-ed9dc9220b39"
            },
            {
                "budgets": {
                    "f8f5a3d0-f04c-11ea-a37d-e18018816fe0": {
                        "date": "06-09-2020 14:26:36",
                        "total": 125,
                        "budgetid": "f8f5a3d0-f04c-11ea-a37d-e18018816fe0",
                        "products": [
                            {
                                "productid": "c0f61e70-f04b-11ea-945a-e18826a01862"
                            },
                            {
                                "productid": "ca9092e0-f04a-11ea-945a-e18826a01862"
                            },
                            {
                                "productid": "c80a0f10-f04a-11ea-945a-e18826a01862"
                            }
                        ]
                    }
                },
                "lastname": "Gordo",
                "company": {
                    "vatregnumber": "A1234567Z",
                    "name": "Acevedo",
                    "country": "SPAIN",
                    "companyid": "d09c8960-f049-11ea-8465-8795cc65771a",
                    "industry": "TECNOLOGY"
                },
                "email": "ggordo@gmail.com",
                "name": "Gabriel",
                "customerid": "f0e17380-f048-11ea-8d6a-ed9dc9220b39"
            }
        ],
        "Count": 2,
        "ScannedCount": 2
    }
	```

***

## GET CUSTOMER BY ID

_Get all the information of a specific Customer._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/customer/{customerid}

* ### RESPONSE:
	```
    {
        "Items": [
            {
                "budgets": {
                    "f8f5a3d0-f04c-11ea-a37d-e18018816fe0": {
                        "date": "06-09-2020 14:26:36",
                        "total": 125,
                        "budgetid": "f8f5a3d0-f04c-11ea-a37d-e18018816fe0",
                        "products": [
                            {
                                "productid": "c0f61e70-f04b-11ea-945a-e18826a01862"
                            },
                            {
                                "productid": "ca9092e0-f04a-11ea-945a-e18826a01862"
                            },
                            {
                                "productid": "c80a0f10-f04a-11ea-945a-e18826a01862"
                            }
                        ]
                    }
                },
                "lastname": "Gordo",
                "company": {
                    "vatregnumber": "A1234567Z",
                    "name": "Acevedo",
                    "country": "SPAIN",
                    "companyid": "d09c8960-f049-11ea-8465-8795cc65771a",
                    "industry": "TECNOLOGY"
                },
                "email": "ggordo@gmail.com",
                "name": "Gabriel",
                "customerid": "f0e17380-f048-11ea-8d6a-ed9dc9220b39"
            }
        ],
        "Count": 1,
        "ScannedCount": 1
    }
	```

***

## CREATE CUSTOMER

_Create new customer_

* ### METHOD: POST

* ### URL:  {AWS_URL}/api/customer

* ### BODY:
	```
    {
        "name": "Gabriel",
        "lastname": "Gordo",
        "email": "ggordo@gmail.com"
    }
	```

* ### RESPONSE:

	```
    "f0e17380-f048-11ea-8d6a-ed9dc9220b39"
	```

***

## GET ALL COMPANIES

_Get a list of all companies._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/companies

* ### RESPONSE:

	```
    {
        "Items": [
            {
                "vatregnumber": "A1234567Z",
                "companyid": "d09c8960-f049-11ea-8465-8795cc65771a",
                "name": "Acevedo",
                "country": "SPAIN",
                "industry": "TECNOLOGY"
            },
            {
                "vatregnumber": "G4658394T",
                "companyid": "998aad70-f04a-11ea-8465-8795cc65771a",
                "name": "Amazon",
                "country": "United States",
                "industry": "Logistics"
            }
        ],
        "Count": 2,
        "ScannedCount": 2
    }
	```

***

## GET COMPANY BY VATREGNUMBER

_Get all the information of a specific company._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/company/{vatregnumber}

* ### RESPONSE:

	```
	{
        "Items": [
            {
                "vatregnumber": "A1234567Z",
                "companyid": "d09c8960-f049-11ea-8465-8795cc65771a",
                "name": "Acevedo",
                "country": "SPAIN",
                "industry": "TECNOLOGY"
            }
        ],
        "Count": 1,
        "ScannedCount": 1
    }
	```

***

## CREATE NEW COMPANY

_Create a new Company and assigns it to Customer._

* ### METHOD: POST

* ### URL:  {AWS_URL}/api/{customerid}/company

* ### BODY:
	```
	{
        "vatregnumber": "A1234567Z",
        "name": "Acevedo",
        "country": "SPAIN",
        "industry": "TECNOLOGY"
    }
	```

* #### RESPONSE:

	```
	"d09c8960-f049-11ea-8465-8795cc65771a"
	```

***

## GET ALL PRODUCTS

_Get a list of all products available._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/products

* ### RESPONSE:

	```
    {
        "Items": [
            {
                "code": "GL",
                "expensehours": 55,
                "description": "With the Multiple Accounting module you will not have to worry if you recorded the movements in the corresponding Books because Netsuite will do it automatically and immediately without creating duplicates that need to be eliminated later.",
                "name": "Ledgers",
                "productid": "c0f61e70-f04b-11ea-945a-e18826a01862"
            },
            {
                "code": "AR",
                "expensehours": 30,
                "description": "Oriented towards companies that require recurring billing to their customers.",
                "name": "Advanced Finance",
                "productid": "c80a0f10-f04a-11ea-945a-e18826a01862"
            },
            {
                "code": "AP",
                "expensehours": 40,
                "description": "The Advanced Purchasing module will help you by taking control of your purchases by relating the authorized price lists to the contracts you have assets.",
                "name": "Advance Purchasing",
                "productid": "ca9092e0-f04a-11ea-945a-e18826a01862"
            }
        ],
        "Count": 3,
        "ScannedCount": 3
    }
	```

***

## GET PRODUCT BY ID

_Get all the information of a specific product._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/product/{productid}

* ### RESPONSE:

	```
	{
        "Items": [
            {
                "code": "AR",
                "expensehours": 30,
                "description": "Orientado hacia empresas que requieran facturación recurrente a sus clientes.",
                "name": "Finanzas Avanzadas",
                "productid": "c80a0f10-f04a-11ea-945a-e18826a01862"
            }
        ],
        "Count": 1,
        "ScannedCount": 1
    }
	```

***

## CREATE NEW PRODUCT

_Create new Product._

* ### METHOD: POST

* ### URL:  {AWS_URL}/api/products

* ### BODY:
	```
    {
        "code": "AR",
        "name": "Finanzas Avanzadas",
        "description": "Orientado hacia empresas que requieran facturación recurrente a sus clientes.",
        "expensehours": 30
    }
	```

* ### RESPONSE:

	```
	"c80a0f10-f04a-11ea-945a-e18826a01862"
	```

***

## GET ALL BUDGETS

_Get a list of all budgets including products they contain and the customer to whom they belong._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/budgets

* ### RESPONSE:

	```
	{
        "Items": [
            {
                "total": 55,
                "budgetid": "4f4aed80-f04d-11ea-a37d-e18018816fe0",
                "date": "06-09-2020 14:29:2",
                "customer": {
                    "customerid": "4e92ef80-f04a-11ea-8d6a-ed9dc9220b39",
                    "name": "Kathy",
                    "company": {
                        "vatregnumber": "G4658394T",
                        "name": "Amazon",
                        "country": "United States",
                        "companyid": "998aad70-f04a-11ea-8465-8795cc65771a",
                        "industry": "Logistics"
                    },
                    "email": "knovillo@gmail.com",
                    "lastname": "Novillo"
                },
                "products": [
                    {
                        "productid": "c0f61e70-f04b-11ea-945a-e18826a01862"
                    }
                ]
            },
            {
                "total": 125,
                "budgetid": "f8f5a3d0-f04c-11ea-a37d-e18018816fe0",
                "date": "06-09-2020 14:26:36",
                "customer": {
                    "customerid": "f0e17380-f048-11ea-8d6a-ed9dc9220b39",
                    "name": "Gabriel",
                    "company": {
                        "vatregnumber": "A1234567Z",
                        "name": "Acevedo",
                        "country": "SPAIN",
                        "companyid": "d09c8960-f049-11ea-8465-8795cc65771a",
                        "industry": "TECNOLOGY"
                    },
                    "email": "ggordo@gmail.com",
                    "lastname": "Gordo"
                },
                "products": [
                    {
                        "productid": "c0f61e70-f04b-11ea-945a-e18826a01862"
                    },
                    {
                        "productid": "ca9092e0-f04a-11ea-945a-e18826a01862"
                    },
                    {
                        "productid": "c80a0f10-f04a-11ea-945a-e18826a01862"
                    }
                ]
            }
        ],
        "Count": 2,
        "ScannedCount": 2
    }
	```

***

## GET BUDGET BY ID

_Get all the information of a specific budget._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/budget/{budgetid}

* ### RESPONSE:

	```
	{
        "Items": [
            {
                "total": 125,
                "budgetid": "f8f5a3d0-f04c-11ea-a37d-e18018816fe0",
                "date": "06-09-2020 14:26:36",
                "customer": {
                    "customerid": "f0e17380-f048-11ea-8d6a-ed9dc9220b39",
                    "name": "Gabriel",
                    "company": {
                        "vatregnumber": "A1234567Z",
                        "name": "Acevedo",
                        "country": "SPAIN",
                        "companyid": "d09c8960-f049-11ea-8465-8795cc65771a",
                        "industry": "TECNOLOGY"
                    },
                    "email": "ggordo@gmail.com",
                    "lastname": "Gordo"
                },
                "products": [
                    {
                        "productid": "c0f61e70-f04b-11ea-945a-e18826a01862"
                    },
                    {
                        "productid": "ca9092e0-f04a-11ea-945a-e18826a01862"
                    },
                    {
                        "productid": "c80a0f10-f04a-11ea-945a-e18826a01862"
                    }
                ]
            }
        ],
        "Count": 1,
        "ScannedCount": 1
    }
	```

***

## CREATE NEW BUDGET

_Create a new budget and assigns it to Customer._

* ### METHOD: POST

* ### URL:  {AWS_URL}/api/{customerid}/budget

* ### BODY:
	```
	{
        "products": [
            {"productid": "c0f61e70-f04b-11ea-945a-e18826a01862"},
            {"productid": "ca9092e0-f04a-11ea-945a-e18826a01862"},
            {"productid": "c80a0f10-f04a-11ea-945a-e18826a01862"}
        ]
    }
	```

* ### RESPONSE:

	```
    "f8f5a3d0-f04c-11ea-a37d-e18018816fe0"
	```

***

### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)