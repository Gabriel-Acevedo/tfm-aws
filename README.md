# TFM - AWS Lambda

Web application created by Acevedoapps that allows you to calculate a budget for the implementation of Oracle NETSuite in your business quickly and easily.

![acevedo.png](documentation/images/logos/acevedo.png) ![oracleNetsuite.png](documentation/images/logos/oracleNetsuite.png)

It is based on an intuitive form, in charge of collecting basic data from the client and his company to store them in an independent database that serves to study the bulk of interested clients, as well as their business characteristics.

This project raises two technological perspectives notably distanced:

- The first alternative is a *Java* project implemented with *Maven* and using *Springboot* as a framework, which offers a REST application with MySQL database deployed in a local *Kubernetes* cluster with *minikube*. [**Linked repository**](https://github.com/Rubru94/tfm-springboot).

- The second option is based on *AWS serverless* technologies, using *API Gateway*, *Lambda* functions, *DynamoDB* database and *SAM*.  **This option is explained in the current repository**.


## AWS Documentation

* ### [Application Content](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/documentation/AWS/AWS-APPLICATION-CONTENTS.md)

* ### [Continuous Integration & Continuous Deployment](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/documentation/AWS/AWS-CI-CD.md)

* ### [Postman Collection](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/documentation/AWS/AWS-POSTMAN-COLLECTION.md)


## API Doumentation

* ### [Rest](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/documentation/API/API-REST.md)

* ### [Web](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/documentation/API/API-WEB.md)


## Development Model

* ### [Trunk Based Development](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/documentation/TBD/TBD.md)


## AWS - Requirements

The following requirements must be taken into account:
  - **AWS Account**: A normal AWS account is required. AWS Educate accounts won´t work due to the temporary credentials.
  - **S3 Bucket**: A S3 Bucket must be created previously and added to the **samconfig.yml** template file.

    ```
    version = 0.1
    [default]
    [default.deploy]
    [default.deploy.parameters]
    stack_name = "tfm-aws-lambda"
    s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-tfm2020"
    s3_prefix = "tfm-aws-lambda"
    region = "us-east-1"
    confirm_changeset = true
    capabilities = "CAPABILITY_IAM"
    ```

## Repository code Analysis

The analysis of the repository code will be done using Sonar Cloud. Sonar Cloud is a service that allows the analysis of project code located in the GitHub repository, performing a thorough analysis of the application and showing a detailed report of the problems encountered.

One of the drawbacks of Sonar Cloud is that in order to analyze free repositories without having a subscription account, the repository must be public and that is why the repository had to be made public so that the code could be analyzed.

