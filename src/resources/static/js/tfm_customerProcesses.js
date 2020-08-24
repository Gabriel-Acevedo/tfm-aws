var AWS_ENDPOINT = getAwsEndpoint();
var API_POST_CUSTOMER = AWS_ENDPOINT + "/api/customer";

setSessionStorageId('CUSTOMERID', '');
setSessionStorageId('COMPANYID', '');
setSessionStorageId('BUDGETID', '');


async function addCustomer(){
   return await postCustomer();
};

function postCustomer(){
    $.ajax({
            type: 'POST',
			url: API_POST_CUSTOMER,
			data: JSON.stringify({
								    "name": $('#name').val(),
								    "lastname": $('#lastname').val(),
									"email": $('#email').val()
								}),			
			success: function(response){
				setSessionStorageId('CUSTOMERID', response);
			}
	});
};		