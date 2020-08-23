var AWS_ENDPOINT = getAwsEndpoint();

var customerId = getCustomerId();
var companyId = getCompanyId();

var API_GET_PRODUCTS = AWS_ENDPOINT + "/api/products"; 

var API_POST_BUDGET  = AWS_ENDPOINT + "/api/" + customerId  + "/budget";


var productsSelected = [];

$(document).ready(async function(){
    await loadProducts();
});

function loadProducts(){
    var contador = 0;  

	$.ajax({
	    type: 'GET',
	    url: API_GET_PRODUCTS,
	
	    success: function(data){
			data.Items.forEach(function(product){
                contador++;
 
                var prodname = document.getElementById('prodname' + contador);
	            var prodid = document.getElementById('prodid'+ contador);
	            var prodcode = document.getElementById('prodcode' + contador);
	            var proddesc = document.getElementById('proddesc' + contador);

				prodname.innerText = product.name;
				prodid.innerText = product.productid;
				prodcode.innerText = product.code;
				proddesc.innerText = product.description;
			})
		}
    });
};

function selectProduct(product, button) {
		var singleProductId = document.getElementById(product);
	
		var addProduct = '{\"productid\": \"' + singleProductId.textContent +'\"}';

        if(button.innerText == '+ Add'){
            productsSelected.push(addProduct);
		
		    button.innerText = '+ Remove';
		    button.style.backgroundColor = "#af5454";
	
        }else{
            productsSelected.splice(productsSelected.indexOf(addProduct),1);	
		    button.innerText = '+ Add';
		    button.style.backgroundColor = "#616161";
        }

	    if(productsSelected.length > 0){
		    document.getElementById("next-button").disabled = false;
		    document.getElementById("next-button").style.backgroundColor = "#00E098";
	    }else{
		    document.getElementById("next-button").disabled = true;
		    document.getElementById("next-button").style.backgroundColor = "#b7b7b7";
	    }
		

};

async function addBudget(){
	return await createBudget();
};

function createBudget(){
	$.ajax({
            type: 'POST',
			url: API_POST_BUDGET,
			data: '{\"products\": [' + productsSelected + ']}',		
			success: function(response){
				setBudgetId(response);
			}
	});
};