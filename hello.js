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
			   url: "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + inputVal + "&format=json",
			   type: "POST",
			   dataType: "jsonp",
			   header: {"Api-User-Agent" : "wikiSearch"},
			   success: function(data){
				console.log("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + inputVal);
				//console.log(data.query.pages.hasOwnProperty("title"));   
				 const lists = data.query.pages; 
				 /**for(let i = 0; i <= lists.length; i++ ){
					//dataList += "<li class='listBg'>" + data.query.allcategories[0]["*"] + "</li>";
					console.log(data.query.allcategories[i]["*"]);
				   }**/
				var arr = [];
				var i;
				var count = 0;
				for(i in data.query.pages){
				  if(data.query.pages.hasOwnProperty(i)){
				    arr.push(i);
				    count++;
				  }
				}
				   lists.forEach(function(item){
					for(var j = 0; j < count; j++){
				   		dataList += "<li class='listBg'>" + item[arr[j]].title + "</li>";
					}
				   });
				   dataList += "</ul>";
				   document.getElementById("formWrapper").innerHTML = dataList;      		 }
			});
		});
	}  
});
