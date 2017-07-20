$(document).ready(function() {
	//call randomQuote function
	dynamicSearch();	
	function dynamicSearch(){
		$("form").on("keyup", "input", function(){
			var inputVal = $(this).val();
			var dataList = "<ul>";
			var formContainer = document.getElementById("formWrapper");
			inputVal= encodeURIComponent(inputVal.trim());
			$.ajax({
			//"https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&srsearch=intitle:" + inputVal + "&format=json"
			   url: "https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputVal + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp&format=json",
			   type: "POST",
			   dataType: "jsonp",
			   header: {"Api-User-Agent" : "wikiSearch"},
			   success: function(data){
				console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=search&gsrsearch=" + inputVal + "&prop=extracts|pageimages&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp");
				//console.log(data.query.pages.hasOwnProperty("title"));   
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
						  item  = item.thumbnail;
						  if(item.thumbnail.source == null){
						  // if not found try to return or create a thumbnail.source obj
						  console.log("Not Found");
						  return item  = item.thumbnail.source;
					  		} 
					     }else{
					  //console.log(item.thumbnail.source);
					dataList += "<a href='" + "https://en.wikipedia.org/?curid=" + item.pageid + "' target='_blank'>" + "<li class='listBg'>" + "<img src='" + item.thumbnail.source + "'>" + item.title + "<p>" + item.extract + "</p>" + "</li>" + "</a>";
					/**for(var j = 0; j < count; j++){
				   		dataList += "<li class='listBg'>" + data.query.pages[arr[j]].title + "<p>" + data.query.pages[arr[j]].snippet + "</li>";
					}**/
					     }
				  });
				   dataList += "</ul>";
				   document.getElementById("formWrapper").innerHTML = dataList;      		 }
			});
		});
	}  
});
