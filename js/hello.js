$(document).ready(function() {
	//formConHeight();
	submitBtn();
	$("form").on("keyup", "input", function(e){
		if(e.keyCode == 13){
			submitBtn();
		}			
	}).on("mouseenter", "input", function(){
	$(this).closest(".centerLayout").find("#inputWrap").addClass("inputAnimate");
	});	
	
	$(window).on("resize", function(){
		formConHeight();
	});
});
function dynamicSearch(inputText){
	var $url = "https://en.wikipedia.org/w/api.php?";
	$.ajax({
	   url: $url,
	   data: {
		action: "query", 
		formatversion: 2, 
		generator: "search", 
		gsrsearch: inputText,
		gsrlimit: 10,
		prop: "pageimages|extracts", 
		piprop: "thumbnail", 
		pithumbsize: 100, 
		exintro: "true", 
		exsentences: 1, 
		explaintext: "true",
		format: "json"
	   	},
	   dataType: "jsonp",	
	   type: "POST",
	   header: {"Api-User-Agent" : "wikiSearch"},
	   success: function(result)
	   {
console.log("https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true");
	    console.log(inputText);
		   var dataList = "<ul>";
			var listContainer = document.getElementById("listContainer");
		   	if( result.query == null || result.continue == null)
			{
				result.errors = "Nothing Found";
				dataList += "<li class='nothingFound tc'>" + result.errors + "</li>";
			}
			else
			{
				let lists =  result.query.pages;
				for(var i =0; i < lists.length; i++)
				{
					for( key in lists ){//check if the lists has property of thumbnail
						if(lists[key].thumbnail == undefined ){
							console.log("true");
							lists[key].thumbnail = {};
							lists[key].thumbnail.source = "images/no-thumbnail.jpg";
						}
					} 
				dataList += "<li class='listBg'>"  + "<a href='" + "https://en.wikipedia.org/?curid=" + lists[i].pageid + "' target='_blank'>"
				+ "<div class='imgContainer'>" +  "<img src='" + lists[i].thumbnail.source + "'>" + "</div>" + "<div class='snippet-container'>" 
				+ "<h3>" + lists[i].title + "</h3>" + "<p>" + lists[i].extract + "</p>" + "</div>" + "</a>" + "</li>";	
					
					//try to set-up conditional for the height of snippet
				}
			}
		  	dataList += "</ul>";
		   	listContainer.innerHTML = dataList;	  		
   		}	 
	});
}
/**function formConHeight(){
	let windowHeight = $(window).innerHeight();
	return $(".windowHeight").css({
		"min-height" : windowHeight + "px"		
	});
}**/

function submitBtn(){
	$(".srchBtn").on("click", function(e){
		e.preventDefault();
		var a = $(this).closest(".formContainer").find("input").val();
		dynamicSearch(a, 1);
		$(".hide").removeClass("hide");
		$(".mainContainer").toggleClass("windowHeight");
		var $mainContainer = $(this).closest(".mainContainer");
		$mainContainer.find(".centerLayout").slideUp().addClass("hide");
	});

}
