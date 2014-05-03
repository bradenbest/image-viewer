/*
 * Web image viewer script by Braden Best
 * To use: inject this script into any page, and click on the image you want to view full-size
 */
 
(function(){
  function push(url){
    var img = document.createElement('img'),
        img_helper = document.createElement('div');
    // Image
    img.src = url;
    img.style.position = 'absolute';
    img.style.left = '0px';
    img.style.top  = '40px';
    img.style.zIndex = '10000'; // this is to push it above everything else, so the NG navbar doesn't float over it.
    // Image helper
    img_helper.innerHTML = "Click here to close image";
    img_helper.style.position = 'absolute';
    img_helper.style.left = '0px';
    img_helper.style.top  = '0px';
    img_helper.style.margin = '0';
    img_helper.style.padding = '5px 0';
    img_helper.style.width = '100%';
    img_helper.style.height='30px';
    img_helper.style.background = '#fff';
    img_helper.style.color = '#000';
    img_helper.style.fontSize = '24px';
    img_helper.style.textAlign = 'center';
    img_helper.style.zIndex = '10000';
    // append to body
    document.body.appendChild(img);
    document.body.appendChild(img_helper);
    document.body.scrollTop = 0;
    // helper on-click
    img_helper.onclick = function(){
      document.body.removeChild(img);
      document.body.removeChild(img_helper);
      img_helper.onclick = null;
    }
  }
  var imgs = document.querySelectorAll('img[src]'), i;
  if(imgs[0]){
    for(i = 0; i < imgs.length; i++){
      if(imgs[i].src){
        imgs[i].onclick = function(){
          push(this.src);
          return false;
        }
      }
    }
  } else {
    console.log("Something has gone wrong!");
  }
})();