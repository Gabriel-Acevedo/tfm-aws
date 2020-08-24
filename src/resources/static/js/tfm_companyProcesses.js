var AWS_ENDPOINT = getAwsEndpoint();

var customerId = getSessionStorageId('CUSTOMERID');

var API_POST_COMPANY = AWS_ENDPOINT + "/api/" + customerId + "/company";



async function addCompany(){
	return await postCompany();
};

function postCompany(){

	$.ajax({
	    	type: 'POST',
			url: API_POST_COMPANY ,
		    data: JSON.stringify({
                                    "vatregnumber": $('#vatregnumber').val(),
                                    "name": $('#name').val(),
                                    "country": $('#country').val(),
                                    "industry": $('#industry').val()
                                }),
					
			success: function(response){
                                setSessionStorageId('COMPANYID', response);
			}
	});

};	