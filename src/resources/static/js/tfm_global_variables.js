//AWS:
const awsEndpoint = "https://r8d74pu122.execute-api.us-east-1.amazonaws.com/Prod";

//Drupal Pages:
const customerDetailPage  = "/drupal/awsCustomerDetails";
const customerCompanyPage = "/drupal/awsCustomerCompany";

function getAwsEndpoint() {
	return awsEndpoint;
};

function getCustomerDetailPage(){
	return customerDetailPage;
};

function getCustomerCompanyPage(){
	return customerCompanyPage;
};