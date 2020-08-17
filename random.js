fetch("https://wger.de/api/v2/exercise/?language=2&status=2", {
	"method": "GET",
	"headers": {
		"Authorization": "Token 98e0bc3f9a6818f516770ec54695cf310c4b63d3"
	}
})
.then(response => response.json())
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});