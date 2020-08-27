//AWS:
const awsEndpoint = "https://b05bxujo05.execute-api.us-east-1.amazonaws.com/Prod";

//HTML Pages:
const custDetailsURL  = "https://acevedo.biz/drupal/en/awsCustomerDetails";
const custCompanyURL  = "https://acevedo.biz/drupal/en/awsCustomerCompany";
const custProductsURL = "https://acevedo.biz/drupal/en/awsCustomerProducts";
const custBudgetURL   = "https://acevedo.biz/drupal/en/awsCustomerBudget";

function getAwsEndpoint() {
	return awsEndpoint;
};


function getUrl(urlName){
	if(urlName == "custDetailsURL"){
		return custDetailsURL;
	};
	if(urlName == "custCompanyURL"){
		return custCompanyURL;
	};
	if(urlName == "custProductsURL"){
		return custProductsURL;
	};
	if(urlName == "custBudgetURL"){
		return custBudgetURL;
	};
	return "";
};


function getUrlVars() { 
	var vars = {}; 
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { 
		vars[key] = value; 
	}); 
	return vars; 
};