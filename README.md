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

## CI - GitHub Actions

Para la integración continua de este proyecto se utiliza **GitHub Actions**, configurando una serie de [workflows] (.github/workflows), para los diferentes eventos de interacción que se utilizaran en este repositorio.

- [**main.yml**](.github/workflows/main.yml): Se ejecutará por cada *push* o *merge* realizado en la rama *master*, y esta dividido en los siguientes jobs:

	- ***Setup Node 12***: Descarga las librerias necesarias para ejecutar la aplicacion node.
	
	```
	setup_node:
      name: Setup Node 12
      runs-on: ubuntu-latest
      steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup Node 12
        uses: actions/setup-node@v1
        with:
          node-version: '12'
      - name: Run npm install
        run: |
          cd src
          npm install
          cd ..
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
    ```      
	
	- ***Build and Deploy SAM***: Construye el stack de CloudFormation para la creacion de las funciones LAMBDAS y la tabla de la DynamoDB. Posteriormente mediante el comando *sam deploy* se permite la ejecucion del CloudFormation en la cuenta de amazon utilizando las credenciales previamente definidas en la seccion SECRETS del repositorio.
	
	Los parametros del comando *sam deploy* son utilizados para lo siguiente:
		
	- **no-confirm-changeset**: Se utiliza para confirmar automaticamente los cambios nuevos que se vayan realizando en el stack de CloudFormation.
		
	- **no-fail-on-empty-changeset**: Es utilizado para que la ejecucion de los nuevos cambios del CloudFormation no acabe con codigo de error cuando no haya ningun cambio por realizar.

	```
    execute_sam:
      name: Build and Deploy SAM
      runs-on: ubuntu-latest
      needs: [setup_node]
      steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Build and Deploy SAM
        run: |
          /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
          sam build
          sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
     ```


	- ***Testing Endpoints***: Se encarga de realizar un comando curl al endpoint de la API en AWS para verificar que la LAMBDA esta ejecutandose y funcionando.

	```
    testing_endpoint:
      name: Testing Endpoints
      runs-on: ubuntu-latest
      needs: [execute_sam]
      steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Testing API REST
        run: |
          ls 
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
	```
