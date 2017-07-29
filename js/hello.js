$(document).ready(function() {
	submitBtn();
	formConHeight();	
	$(window).on("resize", function(){
		formConHeight();
	});
	$("form").on("keyup", "input", function(e){
		var inputVal = $(this).val();
		inputVal= encodeURIComponent(inputVal.trim());
		if(e.keyCode == 13){
			submitBtn();
		}			
	});
	
});
function dynamicSearch(inputText){
	var $url = "https://en.wikipedia.org/w/api.php?";
	$.ajax({
//"https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp&format=json"
	   url: $url,
	   data: {
		action: "query", 
		formatversion: 2, 
		generator: "search", 
		gsrsearch: $(".formContainer").find("input").val(),
		gsrlimit: 5,
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
console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true");
		//put css new layout here!!
		/**
		var $mainContainer = $(this).closest(".mainContainer");
			$(".centerLayout").removeClass("centerLayout");
			$mainContainer.find(".formContainer").addClass(".topLayout");
		**/	

	    var dataList = "<ul>";
			var listContainer = document.getElementById("listContainer");
		   	if( result.query == null || result.continue == null)
			{
				result.errors = "Nothing Found";
				dataList += "<li>" + result.errors + "</li>";
			}
			else
			{
				let lists =  result.query.pages;
				for(var i =0; i < lists.length; i++)
				{
					for( key in lists ){
						if(lists[key].thumbnail == undefined ){
							console.log("true");
							lists[key].thumbnail = {};
							lists[key].thumbnail.source = "images/no-thumbnail.jpg";
						}
					}   
				dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + lists[i].pageid + "' target='_blank'>"
				+ "<img src='" + lists[i].thumbnail.source + "'>" + "<div class='snippet-container'>" + "<h3>" + lists[i].title + "</h3>"
				+ "<p>" + lists[i].extract + "</p>" + "</div>" + "</a>" + "</li>";
					
				}
			}
		  	dataList += "</ul>";
		   	listContainer.innerHTML = dataList;	  		
   		}	 
	});
}
function formConHeight(){
	let windowHeight = $(window).innerHeight();
	return $(".centerLayout").css({
		"min-height" : windowHeight		
	});
}
function submitBtn(){
	//put dynamic height function here..
	$(".srchBtn").on("click", function(e){
		e.preventDefault();
		dynamicSearch();
		var $mainContainer = $(this).closest(".mainContainer");
		$mainContainer.find(".centerLayout").css({
			"margin-top" : "-100px",
			"opacity" : "0",
			"min-height": "0"
		});
		$mainContainer.find(".topLayout").css({
			"padding" : "10px",
			"opacity" : "1",
			"height" : "100%",
			"display" : "block",
			"position" : "relative",
			"z-index" " "1"
		});
		
	});
}
