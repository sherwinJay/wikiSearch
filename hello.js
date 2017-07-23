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
	var url = "https://en.wikipedia.org/w/api.php?";
	$.ajax({
		//"https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp&format=json"
	   url: "https://en.wikipedia.org/w/api.php?",
	   data: {
	   		action: "query", 
	   		formatversion: 2, 
	   		generator: "prefixsearch", 
	   		gpssearch: inputText, 
	   		prop: "pageimages|extracts", 
	   		piprop: "thumbnails", 
	   		pithumbsize: 120, 
	   		exintro: true, 
	   		exsentences: 2, 
	   		explaintext: true, 
	   		format: "json"
	   	},
	   type: "POST",
	   dataType: "jsonp",
	   header: {"Api-User-Agent" : "wikiSearch"},
	   success: function(result){
		//console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp");
		//console.log(inputText.length);
		const inputLength = 0;
			
			//lists = data.query.pages;
			var dataList = "<ul>";
			var formContainer = document.getElementById("formWrapper");
			// try for loop
		   	if( result.query == null ){
				//dataList += "";
					return dynamicSearch();
				}
		        let lists =  result.query.pages;
		   	for(var i =0; i < result.query.pages.length; i++){
				console.log(result.query.pages[i].title);
				if( result.query == null ){
					return false;
				}else{
				if(result.query.pages[i].thumbnail == null){
					//add objects
					  result.query.pages[i].thumbnail = "source";
					  result.query.pages[i].thumbnail.source = "";
				     }
				
			dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + result.query.pages[i].pageid + "' target='_blank'>"
					  + "<img src='" + result.query.pages[i].thumbnail.source + "'>" + "<h3>" + result.query.pages[i].title + "</h3>" + "<p>" 
					  + result.query.pages[i].extract + "</p>" + "</a>" + "</li>";
				}
				/**lists.forEach(function(item){
				if(item != "" ){
				  //find if thumbnail property exists within the pages array of obj
				if(item.thumbnail == null){
					//add objects
					  item.thumbnail = "source";
					  item.thumbnail.source = "";
				     }
				dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + item.pageid + "' target='_blank'>"
					  + "<img src='" + item.thumbnail.source + "'>" + "<h3>" + item.title + "</h3>" + "<p>" + item.extract + "</p>"
					  + "</a>" + "</li>";
					}else{
				dataList += "";
					}
				});**/
			}
		   dataList += "</ul>";
		   	document.getElementById("formWrapper").innerHTML = dataList;
	  		
   	}	 
	});

}  
