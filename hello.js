$(document).ready(function() {
	//call randomQuote function
	//dynamicSearch();
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
	//"https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&srsearch=intitle:" + inputVal + "&format=json"
	   url: "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputText + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=120&rvprop=timestamp&format=json",
	   type: "POST",
	   dataType: "jsonp",
	   header: {"Api-User-Agent" : "wikiSearch"},
	   success: function(data){
		console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputText + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp");

		 const lists = data.query.pages; 
		 /**for(let i = 0; i <= lists.length; i++ ){
			dataList += "<li class='listBg'>" + data.query.pages[i]["extract"] + "</li>";
			//console.log(data.query.allcategories[i]["*"]);
		   }**/
		var arr = [];
		var i;
		var count = 0;
		/**for(i in data.query.pages){
		  if(data.query.pages.hasOwnProperty(i)){
		    arr.push(i);
		    count++;
		  }
		}**/
		  //console.log(data.query.pages.extract);
		  lists.forEach(function(item){
			  //find if thumbnail property exists within the pages array of obj
			if(item.thumbnail == null){
					//console.log("Not Found");
				  item.thumbnail = "source";
					item.thumbnail.source = "";
				  // if not found try to return or create a thumbnail.source obj

				  //return item.thumbnail.source;
			     }
			  //console.log(item.thumbnail.source);
			dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + item.pageid + "' target='_blank'>"
				  + "<img src='" + item.thumbnail.source + "'>" + "<h3>" + item.title + "</h3>" + "<p>" + item.extract + "</p>"
				  + "</a>" + "</li>";
			/**for(var j = 0; j < count; j++){
				dataList += "<li class='listBg'>" + data.query.pages[arr[j]].title + "<p>" + data.query.pages[arr[j]].snippet + "</li>";
			}**/
		  });
		   dataList += "</ul>";
		   document.getElementById("formWrapper").innerHTML = dataList;      		 }
	});

}  
