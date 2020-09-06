# API WEB - TFM-AWS

### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)

***

## CUSTOMER

_Customer information form._

* ### TEMPLATE: [_customer.html_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/templates/customer.html)

* ### CSS: [_tfm_aws_main.css_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/css/tfm_aws_main.css)

* ### JAVASCRIPT:
    - #### [_tfm_global_variables.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_global_variables.js)
    - #### [_tfm_customerProcesses.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_customerProcesses.js)

![customer.html](../images/webTemplates/customer.png)

***	

## SAVE CUSTOMER INFO

_Saves the information of the form and creates a new Customer._

* ### METHOD: POST

* ### URL:  {AWS_URL}/api/customer 

***


## COMPANY

_Customers Company information form._

* ### TEMPLATE: [_company.html_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/templates/company.html)

* ### CSS: [_tfm_aws_main.css_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/css/tfm_aws_main.css)

* ### JAVASCRIPT:
    - #### [_tfm_global_variables.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_global_variables.js)
    - #### [_tfm_companyProcesses.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_companyProcesses.js)

![company.html](../images/webTemplates/company.png)

***

## SAVE COMPANY INFO

_Saves the information of the form, creates a new Company and adds the new Company to the Customer._

* ### METHOD: POST

* ### URL:  {AWS_URL}/api/{customerid}/company 

***

## PRODUCT

_Product selection form._

* ### TEMPLATE: [_product.html_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/templates/product.html)

* ### CSS: [_tfm_product.css_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/css/tfm_product.css)

* ### JAVASCRIPT:
    - #### [_tfm_global_variables.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_global_variables.js)
    - #### [_tfm_productProcesses.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_productProcesses.js)

![product.html](../images/webTemplates/product.png)

***

## GET PRODUCTS

_Returns the actual products available to be selected by the Customer._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/products

***

## SAVE NEW BUDGET

_Creates a new budget with the information of the selected products by the Customer._

* ### METHOD: POST

* ### URL:  {AWS_URL}/api/{customerid}/budget

***

## BUDGET

_Summary of the Budget._

* ### TEMPLATE: [_budget.html_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/templates/budget.html)

* ### CSS: [_tfm_aws_main.css_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/css/tfm_aws_main.css)

* ### JAVASCRIPT:
    - #### [_tfm_global_variables.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_global_variables.js)
    - #### [_tfm_budgetProcesses.js_](https://github.com/Gabriel-Acevedo/tfm-aws/blob/master/src/resources/static/js/tfm_budgetProcesses.js)

![budget.html](../images/webTemplates/budget.png)

***

## GET BUDGET

_Returns the information of the recently created Budget._

* ### METHOD: GET

* ### URL:  {AWS_URL}/api/budget/{budgetid}

***

### [Go to repository](https://github.com/Gabriel-Acevedo/tfm-aws)