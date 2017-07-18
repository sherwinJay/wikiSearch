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
			var dataList = "<ul>";
			var formContainer = document.getElementById("formWrapper");
			inputVal= encodeURIComponent(inputVal.trim());
			$.ajax({
			   url: "https://en.wikipedia.org/w/api.php?action=query&list=allcategories&acfrom|acprefix="+ inputVal +"&prop=revisions&format=json",
			   type: "POST",
			   dataType: "jsonp",
			   header: {"Api-User-Agent" : "wikiSearch"},
			   success: function(data){
				//console.log("https://en.wikipedia.org/w/api.php?action=query&list=allcategories&acprefix=" + inputVal);
				   
				  const lists = data.query.allcategories; 
				 /**for(let i = 0; i <= lists.length; i++ ){
					//dataList += "<li class='listBg'>" + data.query.allcategories[0]["*"] + "</li>";
					console.log(data.query.allcategories[i]["*"]);
				   }**/
				   lists.forEach(function(item){
				   	dataList += "<li class='listBg'>" + item["*"] + "</li>";
				   });
				   dataList += "</ul>";
				   document.getElementById("formWrapper").innerHTML = dataList;      		 }
			});
		});
	}  
});
