// ==UserScript==
// @name       Image Viewer
// @namespace  https://gist.github.com/bradenbest/04bd0fc2d57ec650449f
// @downloadURL https://gist.githubusercontent.com/bradenbest/04bd0fc2d57ec650449f/raw/img_viewer.user.js
// @version    1.5.1
// @description  inject this script into any page, and RIGHT-CLICK on the image you want to view full-size
// @copyright  2014 - present, Braden Best
// ==/UserScript==
 
(function initialize(init){
  var init = init || 0;
  var firefox = /Firefox/i.test(navigator.userAgent);
  function push(url){
    var img = document.createElement('img'),
        img_helper = document.createElement('div'),
        img_helper_link = document.createElement('a');
    // Image
    img.src = url;
    img.style.position = 'absolute';
    img.style.left = '0px';
    img.style.top  = (80 + document.body.scrollTop) + 'px';
    img.style.zIndex = '2147483647'; // this is to push it above everything else, so the NG navbar doesn't float over it.
    img.className = 'img_viewer';
    img.draggable = 'false';
    img.dragging = 0;
    img.mousepos = [0,0];
    img.tabIndex = 0;
    // Image helper
    img_helper.innerHTML = "Click here to close image";
    img_helper.style.position = 'fixed';
    img_helper.style.left = '0px';
    img_helper.style.top  = '0px';
    img_helper.style.margin = '0';
    img_helper.style.padding = '5px 0';
    img_helper.style.width = '100%';
    img_helper.style.height='50px';
    img_helper.style.background = '#fff';
    img_helper.style.borderBottom = '1px solid #ccc';
    img_helper.style.color = '#000';
    img_helper.style.fontSize = '12px';
    img_helper.style.textAlign = 'center';
    img_helper.style.zIndex = '2147483647'; // The absolute maximum
    img_helper.className = 'img_viewer';
    // Image helper link
    img_helper_link.innerHTML = 'Direct URL';
    img_helper_link.href = url;
    img_helper_link.target = '_blank';
    img_helper_link.style.margin = '0';
    img_helper_link.style.padding = '0';
    img_helper_link.style.background = '#fff';
    img_helper_link.style.borderBottom = '1px solid #ccc';
    img_helper_link.style.display = 'block';
    img_helper_link.style.width = '100%';
    img_helper_link.style.height = '20px';
    img_helper_link.style.position = 'fixed';
    img_helper_link.style.left = '0';
    img_helper_link.style.top = '50px';
    img_helper_link.style.fontSize = '12px';
    img_helper_link.style.textAlign = 'center';
    img_helper_link.style.zIndex = '2147483647';
    img_helper_link.className = 'img_viewer';
    // append to body
    document.body.appendChild(img_helper);
    document.body.appendChild(img_helper_link);
    document.body.appendChild(img);
    // helper on-click
    img_helper.onclick = function(){
      document.body.removeChild(img);
      document.body.removeChild(img_helper);
      document.body.removeChild(img_helper_link);
    }
    if(firefox){ // I hate browser sniffing, but my hand is forced
      img.onmousedown = function(evt){
        this.dragging = !this.dragging;
        this.mousepos[0] = (evt.clientX || evt.pageX);
        this.mousepos[1] = (evt.clientY || evt.pageY);
      }
      img.onmouseup = null;
    } else {
      img.onmousedown = function(evt){
        this.dragging = 1;
        this.mousepos[0] = (evt.clientX || evt.pageX);
        this.mousepos[1] = (evt.clientY || evt.pageY);
      }
      img.onmouseup = function(evt){
        this.dragging = 0;
      }
    }
    img.onmousemove = function(evt){ // Hoo boy, that was pretty difficult to figure out
      if(this.dragging){
        lastX = this.mousepos[0];
        curX = (evt.clientX || evt.pageX);
        lastY = this.mousepos[1];
        curY = (evt.clientY || evt.pageY);
        if(!(lastX == curX && lastY == curY)){
          console.log("mouse has moved");
          if(curX > lastX){
            this.style.left = (parseInt(this.style.left) + (curX - lastX)) + 'px';
          }
          if(curX < lastX){
            this.style.left = (parseInt(this.style.left) - (lastX - curX)) + 'px';
          }
          if(curY > lastY){
            this.style.top = (parseInt(this.style.top) + (curY - lastY)) + 'px';
          }
          if(curY < lastY){
            this.style.top = (parseInt(this.style.top) - (lastY - curY)) + 'px';
          }
        }
        this.mousepos[0] = curX;
        this.mousepos[1] = curY;
      }
      return false;
    }
    img.onkeydown = function(evt){
      var temp_width;
      if(evt.keyCode == 38) { // Up
        temp_width = parseInt(this.width) + 10;
        this.width = temp_width;
      } else if(evt.keyCode == 40) { // Down
        temp_width = parseInt(this.width) - 10;
        this.width = temp_width;
      } else {
        console.log("Key: " + evt.keyCode);
      }
      return false;
    }
  }

  function clear(){
    var imgs = document.querySelectorAll('.img_viewer');
    if(imgs[0]) {
      for(var i = 0; i < imgs.length; i++){
        document.body.removeChild(imgs[i]);
      }
    } else {
      console.log("No images generated by this script were found");
    }
  }

  var imgs = document.querySelectorAll('img[src]'), i;
  if(imgs[0]){
    for(i = 0; i < imgs.length; i++){
      if(imgs[i].src){
        imgs[i].oncontextmenu = function(){
          push(this.src);
          return false;
        }
      }
    }
  } else {
    console.log("Something has gone wrong!");
  }
  if(!firefox){
    document.body.onmouseup = function(evt){
      var imgs = document.querySelectorAll('.img_viewer');
      if(imgs[0]){
        for(var i = 0; i < imgs.length; i++){
           imgs[i].dragging = 0;
        }
      }
    }
  }
  document.body.onkeydown = function(evt){
    if(evt.keyCode == 27){ // Escape key
      clear();
    }
    if(evt.keyCode == 17){ // Ctrl
      //clear();
      initialize(1);
    }
  }
  if(!init){
    console.log("Image Viewer successfully started up!");
    console.log("Try right-clicking an image");
  }else{
    console.log("Queue updated");
  }
})();
