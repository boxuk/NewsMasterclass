function OpenPlatformClient(apiKey) {
	this.apiKey = apiKey;
}

/**
 * Queries for content items within the given section
 * 
 * @param {Object} sectionId
 * @param {Object} success
 * @param {Object} failure
 * @param {Object} scope
 */
OpenPlatformClient.prototype.getItemsInSection = function (sectionId, success, failure, scope) {
	var url = "http://content.guardianapis.com/search?section="
	        + sectionId +
	        "&format=json&show-fields=thumbnail%2Cheadline%2Cbody&api-key=" 
	        + this.apiKey;
	        
	var client = Ti.Network.createHTTPClient({
	    // function called when the response data is available
        onload : function(e) {
            Ti.API.debug(this.responseText);
	        var data = JSON.parse(this.responseText);
	        success.apply(scope, [data]);
	    },
	    // function called when an error occurs, including a timeout
	    onerror : function(e) {
            Ti.API.debug(e.error);
	        failure.apply(scope, [e.error]);
	    },
	    timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send();
}

module.exports = OpenPlatformClient;