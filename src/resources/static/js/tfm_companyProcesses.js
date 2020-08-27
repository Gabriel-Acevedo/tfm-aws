var AWS_ENDPOINT = getAwsEndpoint();
var productURL = getUrl("custProductsURL");
var custid = getUrlVars()["custid"];

var API_POST_COMPANY = AWS_ENDPOINT + "/api/" + custid + "/company";

function changeToProductUrl(){
	if(!$('#vatregnumber').val() || !$('#name').val()){
		alert ("Please enter a vatregnumber and a name for the Company!");
	}else{
		if(!$('#country').val() || !$('#industry').val()){
			alert ("Please select a company and indsutry from the available options!");
		}else{
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
				window.location.replace(productURL + "?custid="+custid);
			},
			error: function(response){
                alert ("Unexpected error ocurred calling Rest API!!");
            }
			});
			return false;
		}	
	}
};