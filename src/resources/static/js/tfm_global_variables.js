//AWS:
const awsEndpoint = "https://e69r1txiva.execute-api.us-east-1.amazonaws.com/Prod";


function getAwsEndpoint() {
	return awsEndpoint;
};


function setCustomerId(p_customerId){
	sessionStorage.setItem('CUSTOMERID', p_customerId);
};


function getCustomerId(){
	var customerid = sessionStorage.getItem('CUSTOMERID');
	return customerid;
};



function setCompanyId(p_companyId){
	sessionStorage.setItem('COMPANYID', p_companyId);
};
function getCompanyId(){
	var companyid = sessionStorage.getItem('COMPANYID');
	return companyid;
};



function setBudgetId(p_budgetId){
	sessionStorage.setItem('BUDGETID', p_budgetId);
};
function getBudgetId(){
	var budgetid = sessionStorage.getItem('BUDGETID');
	return budgetid;
};