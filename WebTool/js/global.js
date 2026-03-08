
$(".lines-button").click(function() {
     $(".menubar").slideToggle();  
	  $(this).toggleClass("close");  
});
$(".lines-button.close").click(function() {
    $(".menubar").slideToggle();  
	 $(this).toggleClass("close");  

});

$('#spanYear').html(new Date().getFullYear());
