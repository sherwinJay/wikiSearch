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
			   url: "https://en.wikipedia.org/w/api.php?action=query&generator=search&grsearch=intitle:" + inputVal + "&format=json",
			   type: "POST",
			   dataType: "jsonp",
			   header: {"Api-User-Agent" : "wikiSearch"},
			   success: function(data){
				console.log("https://en.wikipedia.org/w/api.php?action=query&generator=search&grsearch=intitle:" + inputVal);
				//console.log(data.query.pages.hasOwnProperty("title"));   
				  const lists = data.query.search; 
				 /**for(let i = 0; i <= lists.length; i++ ){
					//dataList += "<li class='listBg'>" + data.query.allcategories[0]["*"] + "</li>";
					console.log(data.query.allcategories[i]["*"]);
				   }**/
				   lists.forEach(function(item){
				   	dataList += "<li class='listBg'>" + item.snippet + "</li>";
				   });
				   dataList += "</ul>";
				   document.getElementById("formWrapper").innerHTML = dataList;      		 }
			});
		});
	}  
});
