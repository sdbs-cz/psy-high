var vid = document.getElementById("bgvid");
if (window.mobilecheck()){
  vid.outerHTML = ""; 
} else {
  var adaptVideo = function(){
    if (window.screen.width / window.screen.height > 1920/1080){
      vid.style.height = "auto";
      vid.style.width = "100%";
    } else {
      vid.style.height = "100%";
      vid.style.width = "auto";
    }
  }
  
  var toResize = false;
  window.addEventListener("resize", function(){
    toResize = true;
  });
  setInterval(function() {
      if ( toResize ) {
          toResize = false;
          adaptVideo();
      }
  }, 250);
  adaptVideo();
}
