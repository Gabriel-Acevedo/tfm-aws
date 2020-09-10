# AWS-APPLICATION-CONTENTS

### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)


The application is composed of different objects which together allow the correct functioning of the AWS LAMBA functions.

* **DynamoDB:** To properly save the information of the different clients and their budgets the best option to chose was DynamoDB which is provided by Amazon Web Services. DynamoDB was choosen due to its large scalability and its absence of administration tasks. Each entity has its own table.

* **LAMBDA Functions & API Gateway:** Each database operation is done trough lambda functions, which comunicate with the front-end using the corresponding endpoint defined by API Gateway.

* **Policies:** Due to AWS security, a number of policies must be defined to allow DynamoDB tables access data from other tables. The following code will show how to set a policy for a table.

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


* **Source directory:** The folder _"src"_ contains the code for the lambda functions, which has been developed using NODE JS:

    - **index.js:** A file containing the list of processes to be executed depending on the endpoint called.
    
    - **Managers:** Folder that contains the different  database files for each entity. For example, the dbCustomerManager has the operations to manage customer data.

* **[CloudFormation template](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/template.yaml):** Contains the configuration of all the components mentioned, which will be created and configured in AWS.

* **[SAM Configuration](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/samconfig.toml):** Uploads the CloudFormation template into AWS using the open source framework SAM (Serverless Application Model).

### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)