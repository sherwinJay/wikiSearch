$(document).ready(function() {
	//call randomQuote function
	randomQuote();
	//load the randomQuote function everytime  .button is click
	/**$(".button").on("click", function(e){
		e.preventDefault();
	  $(this).load(randomQuote());
	     //$.getJSON("http://quotes.stormconsultancy.co.uk/random.json").done(randomQuote);
	});**/
	
	function randomQuote(){
		$("form").on("keyup", "input", function(){
			var inputVal = $(this).val();
			inputVal= encodeURIComponent(inputVal.trim());
			$.ajax({
			   url: "https://en.wikipedia.org/w/api.php?action=query&titles="+inputVal+"&prop=revisions&rvprop=content&format=json",//"https://en.wikipedia.org/w/api.php?action=query&list=allcategories&acprefix=" + inputVal,
	           type: "POST",
	           dataType: "jsonp",
		   header: {"Api-User-Agent" : "wikiSearch"},
	           success: function(data){
			console.log("https://en.wikipedia.org/w/api.php?action=query&list=allcategories&acprefix=" + inputVal);
	           }
			});
		});
	}  
});
