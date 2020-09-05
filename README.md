# TFM - AWS Lambda

## Modelo

![](https://www.planttext.com/api/plantuml/png/Z971IWCn48RlUOgSbRx07gJOKl0W27eJ3saoh85aPaacOX6Vp8EFr5TekfisQtSfvX32_vEPR-RV__mk8wl0oJiX15js85ysZqBcqr_QgHZbAaKc3-6hruxdrff6FY1N0PM7HZvpiDXMDN_dUGUyicugQ_ATmbqZLyEZTxulWPu2cQJv6eycCzDrdiL0rC5sR0bdG3yxm0Zlb4AiFIP8XVSQqeVY02qcluNmNpHD2JdifeP5arEvS2PKzycqy7TFezebrkOSSFMwOSDvuhBhrxVHlXHdr7M-gyR4AkUvfhHrC8OvrPOtYyNTELOna1Nnr7uibhv34R64FAzt1m000F__0m00)

## Requisitos

Se deberán de tener en cuenta los siguientes requisitios:
  **Cuenta AWS**: Se tendra que tener una cuenta normal de AWS. Las cuentas AWS educate no funcionan debido a las credenciales temporales que tienen estas.
  **S3_Bucket**: Hay que tener previamente creado el S3 bucket en la cuenta AWS con el mismo nombre que aparece en el fichero **samconfig.yml**.

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



## Otros datos

Se ha añadido una coleccion de postman para la ejecucion de los endpoints de las API REST. Esta coleccion contiene una serie de variables:
  - **{{URL}}**: URL de la la API REST, sin el endpoint.
  - **{{AWS_ACCESS}}**: Credencial AWS de acceso.
  - **{{AWS_SECRET}}**: Credencial AWS secreta de acceso.
  - **{{AWS_REGION}}**: Region de AWS en donde se deplegara la funcion LAMBDAS.
  - **{{AWS_SESSION}}**: Valor del token de sesion del AWS, se puede dejar sin rellenar.