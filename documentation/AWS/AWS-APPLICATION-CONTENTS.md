# AWS-APPLICATION-CONTENTS

  ### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)

The application is composed of different objects which together allow the correct functioning of the AWS LAMBA functions.


* **DynamoDB:** To properly save the information of the different clients and their budgets the best option to chose was DynamoDB which is provided by Amazon Web Services. DynamoDB was choosen due to its large scalability and its absence of administration tasks. 


* **Tables:** Objects where the data will be stored in the database:
    - **customerTable:** Stores the information of the Clients.
    - **companyTable:** Responsible for storing the company information of the customers.
    - **productTable:** Details of the products available which later can be choosen by the Customers.
    - **budgetTable:** Table that will be in charge of storing the information of the different budgets of the clients.


* **LAMBDA Functions & API Gateway:** The application performs a series of actions. To accompish these actions, a series of LAMBDA functions have been created, which will be called through the API Gateway to communicate with the FRONT-END to carry out the different operations with the entities of the application.

    - **customerFunction:**
    ```
        lambdaGetAllCustomers
            > Method: GET
            > Endpoint: /api/customers
        lambdaGetCustomer
            > Method: GET
            > Endpoint: /api/customer/{customerid}
        lambdaAddCustomer
            > Method: POST
            > Endpoint: /api/customer

    ```

    - **companyFunction:**
    ```
        lambdaGetAllCompanies
            > Method: GET
            > Endpoint: /api/companies
        lambdaGetCompany
            > Method: GET
            > Endpoint: /api/company/{vatregnumber}
        lambdaAddCompany
            > Method: POST
            > Endpoint: /api/{customerid}/company
    ```

    - **productFunction:**
    ```
        lambdaGetAllProducts
            > Method: GET
            > Endpoint: /api/products
        lambdaGetProduct
            > Method: GET
            > Endpoint: /api/product/{productid}
        lambdaAddProduct
            > Method: POST
            > Endpoint: /api/product
    ```

    - **budgetFunction:**
    ```
        lambdaGetAllBudgets
            > Method: GET
            > Endpoint: /api/budgets
        lambdaGetBudget
            > Method: GET
            > Endpoint: /api/budget/{budgetid}
        lambdaAddBudget
            > Method: POST
            > Endpoint: /api/Budget
    ```


* **Policies:** Due to AWS security, a number of policies must also be defined to allow DynamoDB tables to access corresponding data from other tables. The following code will show how to set a policy for a table, the only change to be done is to change the value "nameTable" to the name of the table that has to be accessed.

    ```
    -   Version: '2012-10-17'
        Statement: 
            -   Effect: Allow
                Action:
                    -   'dynamodb:Scan'
                    -   'dynamodb:Query'
                    -   'dynamodb:DeleteItem'
                    -   'dynamodb:GetItem'
                    -   'dynamodb:PutItem'
                    -   'dynamodb:UpdateItem'
                Resource:
                    'Fn::Join':
                        -   ''
                        -   -   'arn:aws:dynamodb:'
                            -   Ref: 'AWS::Region'
                            -   ':'
                            -   Ref: 'AWS::AccountId'
                            -   ':table/nameTable'
    ```


* **Source directory:** The source folder contains the code for the lambda functions, which has been developed using NODE JS.

    - **index.js:** A file containing the list of processes to be executed depending on the endpoint called by the API Gateway.
    - **Managers Directory:** Contains the different process files for each entity. For example, the dbCustomerManager contains the processes to manage customer data.


* **CloudFormation template:** This object contains the configuration of all the components mentioned above, which will be created and configured in AWS by creating a CloudFormation stack with a template.

    - **[template.yaml](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/template.yaml)**


* **SAM Configuration** To upload the CloudFormation template into AWS the open source framework SAM (Serverless Application Model) has been used.

    - **[samconfig.toml](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/samconfig.toml)**


  ### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)