//AWS:
const awsEndpoint = "https://do51n87nb6.execute-api.us-east-1.amazonaws.com/Prod";


function getAwsEndpoint() {
	return awsEndpoint;
};


function setSessionStorageId(p_name, p_value){
        sessionStorage.setItem(p_name, p_value);
};

function getSessionStorageId(p_name){
        return sessionStorage.getItem(p_name);
};