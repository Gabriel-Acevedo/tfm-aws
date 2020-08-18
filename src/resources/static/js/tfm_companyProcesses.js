var AWS_ENDPOINT = getAwsEndpoint();
var receiveidCustomerId = localStorage["customerid"];

var API_POST_COMPANY = AWS_ENDPOINT + "/api/" + receiveidCustomerId  + "/company";

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
               console.log("Company id: " + response);
			}
	});

};