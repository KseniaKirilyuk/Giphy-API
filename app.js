
var client = "F9jiANSteshZDE6i9jhilQpE7EdPpcZS";
var topics=["bear", "horse", "skunk", "deer", "wolf", "rabbit"];


function renderButtons(){ 
//creating static buttons
for(var i =0; i<topics.length; i++){
	var topicButton =$("<button>");
	topicButton.addClass('topic-btn');
	topicButton.attr("data-name", topics[i]);
	topicButton.text(topics[i]);
	$("#button-view").append(topicButton);
	}	
};
//click on search button creates a new item in array topics
$("#add-topic").on("click", function(event){
	event.preventDefault();
	var topicSrch = $("#topic-input").val().trim();
	topics.push(topicSrch);

	var topicSrchBtn = $("<button>");
	topicSrchBtn.attr("data-name", topicSrch);
	topicSrchBtn.addClass('topic-btn');
	topicSrchBtn.text(topicSrch);
	$("#button-view").prepend(topicSrchBtn);


})
renderButtons();

function clean(){
	$("#gif-view").empty();
}

function showGifs(){
	var gif = $(this).attr("data-name");
	console.log(gif);
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+client+"&q="+gif+"&limit=10&offset=0&rating=G&lang=en";
	$.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        	for (var g = 0; g < response.data.length; g++){
        	gifUrl = response.data[g].images.fixed_height_still.url;
        	//newGifFigure =$("<figure>");
        	newGif= $("<img>");
        	newGif.addClass("gifStill");
        	newGif.attr("src",gifUrl);
        	//gifElement = $("<figure>" + newGif + "</figure>");
        	$("#gif-view").append($("<figure>").append(newGif));
        	//$(newGif).wrap( "<figure class='imgWrap'></figure>" );
        }
        	    
        });

}
// $(".gifStill").on("click", function(event){
// 	var gifUrlActive = this.response.data.images.fixed_height.url;
// 	newGif.attr("src",gifUrlActive);
// });

$(".topic-btn").on("click",clean);
$(document).on("click", ".topic-btn", showGifs);