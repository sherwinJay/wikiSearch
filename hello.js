$(document).ready(function() {
	$("form").on("keyup", "input", function(e){
		var inputVal = $(this).val();
		inputVal= encodeURIComponent(inputVal.trim());
		dynamicSearch(inputVal);
	});
});
function dynamicSearch(inputText){
	//try to make the full url into objects!
	//"https://en.wikipedia.org/w/api.php?
	var $url = "https://en.wikipedia.org/w/api.php?";
	$.ajax({//"https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp&format=json"
	   url: $url,
	   data: {
	   		action: "query", 
	   		formatversion: 2, 
	   		generator: "prefixsearch", 
	   		gpssearch: inputText, 
		   	prop: "pageimages|extracts", 
	   		piprop: "thumbnail", 
	   		pithumbsize: 120, 
	   		exintro: "true", 
	   		exsentences: 2, 
	   		explaintext: "true",
	   		format: "json"
	   	},
	   dataType: "jsonp",	
	   type: "POST",
	   header: {"Api-User-Agent" : "wikiSearch"},
	   success: function(result)
	   {
		//console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp");
		//console.log(inputText.length);
		const inputLength = 0;
			
			//lists = data.query.pages;
			var dataList = "<ul>";
			var formContainer = document.getElementById("formWrapper");
			// try for loop
		   	if( result.query == null )
		   		{
				//dataList += "";
				console.log("true");
				result.errors = "message";
				result.errors.message = "Nothing Found";
				dataList += "<li>" + result.errors.message + "</li>";
				}
			else
			{
	        	let lists =  result.query.pages;
	   			console.log(lists);
	   			for(var i =0; i < result.query.pages.length; i++)
	   			{
					if(result.query.pages[i].thumbnail == null)
					{
						//add objects
					  	result.query.pages[i].thumbnail = "source";
					  	result.query.pages[i].thumbnail.source = "";
				    }
					dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + result.query.pages[i].pageid + "' target='_blank'>"
				  	+ "<img src='" + result.query.pages[i].thumbnail.source + "'>" + "<h3>" + result.query.pages[i].title + "</h3>" + "<p>" 
				  	+ result.query.pages[i].extract + "</p>" + "</a>" + "</li>";
				}
			}
		   dataList += "</ul>";
		   	document.getElementById("formWrapper").innerHTML = dataList;	  		
   		}	 
	});
}
