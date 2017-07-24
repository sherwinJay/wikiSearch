$(document).ready(function() {
	$("form").on("keyup", "input", function(e){
		e.preventDefault();
		var inputVal = $(this).val();
		inputVal= encodeURIComponent(inputVal.trim());
		dynamicSearch(inputVal);
	});
});
function dynamicSearch(inputText){
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
	   {console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true");
			var dataList = "<ul>";
			var formContainer = document.getElementById("formWrapper");
		   	if( result.query == null || result.continue == null )
			{
				result.errors = "Nothing Found";
				dataList += "<li>" + result.errors + "</li>";
			}
			else
			{
				let lists =  result.query.pages;
				console.log(lists);
				for(var i =0; i < lists.length; i++)
				{console.log(lists[i].thumbnail);
					for( key in lists ){
						if(lists[key].thumbnail == undefined ){
							console.log("true");
							lists[key].thumbnail = "source";
							lists[key].thumbnail.source = "images/no-thumbnail.jpg";
						}
					}    
					/**if(lists[i].thumbnail == null)
					{
					lists[i].thumbnail = "source";	
					lists[i].thumbnail.source = "HI";
						console.log(lists[i].thumbnail);
						if(lists[i].thumbnail.source === "undefined"){
						lists[i].thumbnail.source = "images/no-thumbnail.jpg";
						console.log(lists[i].thumbnail.source);	
						}
					}**/
					dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + lists[i].pageid + "' target='_blank'>"
					+ "<img src='" + lists[i].thumbnail.source + "'>" + "<h3>" + lists[i].title + "</h3>"
					+ "<p>" + lists[i].extract + "</p>" + "</a>" + "</li>";
					
				}
			}
		  	dataList += "</ul>";
		   	document.getElementById("formWrapper").innerHTML = dataList;	  		
   		}	 
	});
}
