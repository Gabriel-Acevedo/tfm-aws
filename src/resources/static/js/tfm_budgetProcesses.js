var AWS_ENDPOINT = getAwsEndpoint();
var customerURL = getUrl("custDetailsURL");
var budgid = getUrlVars()["budgid"];

var API_GET_BUDGET = AWS_ENDPOINT + "/api/budget/" + budgid; 


$(document).ready(async function(){
    await loadBudget();
});


function loadBudget(){

    var bcustfullname = document.getElementById('custfullname');
	var bdate = document.getElementById('date');
	var bcustomercompany = document.getElementById('customercompany');
	var bcustomerindustry = document.getElementById('customerindustry');
	var bcustomercountry = document.getElementById('customercountry');
	var btotalhours = document.getElementById('totalhours');

	$.ajax({
	    type: 'GET',
	    url: API_GET_BUDGET,
	
	    success: function(data){
			data.Items.forEach(function(budget){
				bcustfullname.innerText = budget.customer.name + ' ' + budget.customer.lastname;
				bdate.innerText = budget.date;
				bcustomercompany.innerText = budget.customer.company.name;
				bcustomerindustry.innerText = budget.customer.company.industry;
				bcustomercountry.innerText = budget.customer.company.country;
				btotalhours.innerText = budget.total;
			})
	    }
       });
};

function changeUrlToCustomer(){
     window.location.replace(customerURL);
};