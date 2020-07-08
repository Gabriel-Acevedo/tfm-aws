# TFM - AWS Lambda

## CI - GitHub Actions

Para la integración continua de este proyecto se utiliza **GitHub Actions**, configurando una serie de [workflows] (.github/workflows), para los diferentes eventos de interacción que se utilizaran en este repositorio.

- [**push.yml**](.github/workflows/push.yml): Se ejecutará por cada *push* realizado en la rama *master*, y esta dividido en los siguientes jobs:

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
		
		- *--no-confirm-changeset*: Se utiliza para confirmar automaticamente los cambios nuevos que se vayan realizando en el stack de CloudFormation.
		
		- *--no-fail-on-empty-changeset*: Es utilizado para que la ejecucion de los nuevos cambios del CloudFormation no acabe con codigo de error cuando no haya ningun cambio por realizar.

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

- [**pull_request.yml**](.github/workflows/pull_request.yml): Se ejecutará por cada *merge* realizado en la rama *master* y contiene los mismos jobs que el fichero **push.yml**.