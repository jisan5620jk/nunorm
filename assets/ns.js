


// ************************************************************Button animation 
$( ".button_su_inner" ).mouseenter(function(e) {
   var parentOffset = $(this).offset(); 
  
   var relX = e.pageX - parentOffset.left;
   var relY = e.pageY - parentOffset.top;
   $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
   $(this).prev(".su_button_circle").removeClass("desplode-circle");
   $(this).prev(".su_button_circle").addClass("explode-circle");

});

$( ".button_su_inner" ).mouseleave(function(e) {

     var parentOffset = $(this).offset(); 

     var relX = e.pageX - parentOffset.left;
     var relY = e.pageY - parentOffset.top;
     $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
     $(this).prev(".su_button_circle").removeClass("explode-circle");
     $(this).prev(".su_button_circle").addClass("desplode-circle");

});

// ************************************************************Gyar Button animation 




// *************************************************** before after slider

$("#before-after-slider").on("input change", (e)=>{
  const sliderPos = e.target.value;
  // Update the width of the foreground image
  $('.foreground-img').css('width', `${sliderPos}%`)
  // Update the position of the slider button
  $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`)
});

// *************************************************** accordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

