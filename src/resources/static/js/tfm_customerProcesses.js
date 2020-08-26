var AWS_ENDPOINT = getAwsEndpoint();
var API_POST_CUSTOMER = AWS_ENDPOINT + "/api/customer";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function changeUrl(){
	
	 if(!$('#name').val() || !$('#lastname').val() || !$('#email').val()){
		alert ("Please enter a name, lastname and email!");
	 }else{
            if(validateEmail($('#email').val())){
                $.ajax({
                        type: 'POST',
			url: API_POST_CUSTOMER,
			data: JSON.stringify({
									"name": $('#name').val(),
									"lastname": $('#lastname').val(),
									"email": $('#email').val()
									}),			
			success: function(response){
                             window.location.replace("https://acevedo.biz/drupal/en/awsCustomerCompany?custid="+response);
			},
			error: function(response){
					alert ("Unexpected error ocurred calling Rest API!!");
			}
		});
                
            }else{
                alert ("Please enter a valid email!");
            }
	 }
		 return false;
		 
}