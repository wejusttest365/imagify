
//$(".lines-button").click(function() {
//     $(".menubar").slideToggle();  
//	  $(this).toggleClass("close");  
//});
//$(".lines-button.close").click(function() {
//    $(".menubar").slideToggle();  
//	 $(this).toggleClass("close");  
//
//});

document.addEventListener("DOMContentLoaded", function () {

  const button = document.querySelector(".lines-button");
  const menu = document.querySelector(".mainmenubar");

  button.addEventListener("click", function () {

    // toggle class
    this.classList.toggle("close");

    // slide toggle
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }

  });

});

document.getElementById("spanYear").textContent = new Date().getFullYear();
