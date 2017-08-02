$(document).ready(function() {
	//put submit function inside of key event and try to get inputText.
	var inputVal = $("input").val();
	formConHeight();
	submitBtn(inputVal);
	$("form").on("keyup", "input", function(e){
		var inputVal2 = $(this).val();
		inputVal2 = encodeURIComponent(inputVal.trim());
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
//"https://en.wikipedia.org/w/api.php?action=query&formatversion=2&generator=prefixsearch&gpssearch=" + inputText + "&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=120&redirects=&exintro=true&exsentences=2&explaintext=true&rvprop=timestamp&format=json"
	   url: $url,
	   data: {
		action: "query", 
		formatversion: 2, 
		generator: "search", 
		gsrsearch: inputText,
		gsrlimit: 10,
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
		"min-height" : windowHeight + "px"		
	});
}

function submitBtn(search){
	$(".srchBtn").on("click", function(e){
		//$(".centerLayout").removeClass("centerLayout").slideUp();
		e.preventDefault();
		$(".hide").removeClass("hide");
		dynamicSearch(search);
		var $mainContainer = $(this).closest(".mainContainer");
		
		$mainContainer.find(".centerLayout").addClass("hide").slideUp();
		
	});
}
