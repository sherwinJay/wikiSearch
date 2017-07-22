$(document).ready(function() {
	$("form").on("keyup", "input", function(e){
		var inputVal = $(this).val();
		inputVal= encodeURIComponent(inputVal.trim());
		dynamicSearch(inputVal);
	});
});
function dynamicSearch(inputText){
	$.ajax({
	   url: "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputText + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=120&rvprop=timestamp&format=json",
	   type: "POST",
	   dataType: "jsonp",
	   header: {"Api-User-Agent" : "wikiSearch"},
	   success: function(data){
		console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputText + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&piprop=thumbnail&pithumbsize=120&rvprop=timestamp");
		//console.log(inputText.length);
		if( inputText.length == 0 ){
			return false;
		}
		const inputLength = 0;
			
			//lists = data.query.pages;
			var dataList = "<ul>";
			var formContainer = document.getElementById("formWrapper");
			// try for loop
		   	if( data.query == null ){
				//datalist += "";
			return false;
			}
		        let lists =  data.query.pages;
		   	/*for(var i =0; i < data.query.pages.length; i++){
				if( data.query.pages.length > 0 ){
				if(data.query.pages[i].thumbnail == null){
					return false;
					//add objects
					  data.query.pages[i].thumbnail = "source";
					  data.query.pages[i].thumbnail.source = "";
				     }**/
				lists.forEach(function(item){				
			  //find if thumbnail property exists within the pages array of obj
				if(item.thumbnail == null){
					//add objects
					 // item.thumbnail = "source";
					  //item.thumbnail.source = "";
					return false;
				     }
	       dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + item.pageid + "' target='_blank'>"
					  + "<img src='" + item.thumbnail.source + "'>" + "<h3>" + item.title + "</h3>" + "<p>" + item.extract + "</p>"
					  + "</a>" + "</li>";
			/**dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + data.query.pages[i].pageid + "' target='_blank'>"
					  + "<img src='" + data.query.pages[i].thumbnail.source + "'>" + "<h3>" + data.query.pages[i].title + "</h3>" + "<p>" + data.query.pages[i].extract + "</p>"
					  + "</a>" + "</li>";**/
			
			});
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
			
		   /**	dataList += "</ul>";
		   	document.getElementById("formWrapper").innerHTML = dataList; 	**/
	  		
   		 }
	});

}  
