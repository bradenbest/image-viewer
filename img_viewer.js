/*
 * Web image viewer script by Braden Best
 * To use: 
 *   inject this script into any page, and click on the image you want to view full-size
 *     while the image is "open", you can drag it around to pan instead of scrolling
 *     There is a close button, and a full URL link above the image
 *     You can press Esc to close the image without the need for clicking the close button
 * Special thanks to Cyberdevil for providing suggestions
 *   Escape key
 *   Provide Direct URL to image
 *   image is draggable
 */
 
(function(){
  function push(url){
    var img = document.createElement('img'),
        img_helper = document.createElement('div');
    // Image
    img.src = url;
    img.style.position = 'absolute';
    img.style.left = '0px';
    img.style.top  = '60px';
    img.style.zIndex = '10000'; // this is to push it above everything else, so the NG navbar doesn't float over it.
    img.className = 'img_viewer';
    img.draggable = 'false';
    img.dragging = 0;
    img.mousepos = [0,0];
    // Image helper
    img_helper.innerHTML = "Click here to close image<hr><a target=\"_blank\" href=\"" + url + "\">Direct URL</a>";
    img_helper.style.position = 'absolute';
    img_helper.style.left = '0px';
    img_helper.style.top  = '0px';
    img_helper.style.margin = '0';
    img_helper.style.padding = '5px 0';
    img_helper.style.width = '100%';
    img_helper.style.height='50px';
    img_helper.style.background = '#fff';
    img_helper.style.color = '#000';
    img_helper.style.fontSize = '12px';
    img_helper.style.textAlign = 'center';
    img_helper.style.zIndex = '10000';
    img_helper.className = 'img_viewer';
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
    img.onmousedown = function(evt){
      this.dragging = 1;
      this.mousepos[0] = (evt.clientX || evt.pageX);
      this.mousepos[1] = (evt.clientY || evt.pageY);
    }
    img.onmouseup = function(evt){
      this.dragging = 0;
    }
    img.onmousemove = function(evt){ // Hoo boy, that was pretty difficult to figure out
      if(this.dragging){
        lastX = this.mousepos[0];
        curX = (evt.clientX || evt.pageX);
        lastY = this.mousepos[1];
        curY = (evt.clientY || evt.pageY);
        if(!(lastX == curX && lastY == curY)){
          console.log("mouse has moved")
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
        imgs[i].onclick = function(){
          push(this.src);
          return false;
        }
      }
    }
  } else {
    console.log("Something has gone wrong!");
  }
  document.body.onkeydown = function(evt){
    if(evt.keyCode == 27){ // Escape key
      clear();
    }
  }
})();
