$(document).ready(function() {
	$("form").on("keyup", "input", function(){
		var inputVal = $(this).val();
		inputVal= encodeURIComponent(inputVal.trim());
		dynamicSearch(inputVal);
	});
});
function dynamicSearch(inputText){
	var dataList = "<ul>";
	var formContainer = document.getElementById("formWrapper");

	$.ajax({
	   url: "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputText + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=120&rvprop=timestamp&format=json",
	   type: "POST",
	   dataType: "jsonp",
	   header: {"Api-User-Agent" : "wikiSearch"},
	   success: function(data){
		//console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputText + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp");
		let lists = data.query;
		const inputLength = 0;
		if( inputText.length > 0 ){
			lists =  data.query.pages;  
		}
		lists.forEach(function(item){
			  //find if thumbnail property exists within the pages array of obj
			if(item.thumbnail == null){
				//add objects
				  item.thumbnail = "source";
				  item.thumbnail.source = "";
			     }
			dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + item.pageid + "' target='_blank'>"
				  + "<img src='" + item.thumbnail.source + "'>" + "<h3>" + item.title + "</h3>" + "<p>" + item.extract + "</p>"
				  + "</a>" + "</li>";
		  });
		   dataList += "</ul>";
		   document.getElementById("formWrapper").innerHTML = dataList;      		 }
	});

}  
