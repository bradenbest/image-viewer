# Web Image Viewer by Braden Best

## Version 1.5.1

This userscript is hosted at https://greasyfork.org/scripts/631-image-viewer

Which is synced with this gist.

## Usage

To use this script, inject it into any page, and RIGHT-CLICK on the image you want to view full-size

This can be accomplished by

* visiting the its [greasyfork user-script page](https://greasyfork.org/scripts/631-image-viewer) and installing it
* pasting the code directly into a broswer console.

### Controls / Features

#### Drag 'n Drop -- mouse

while the image is "open", you can drag it around with the mouse to pan instead of scrolling

In Firefox, it's a little different. You have to click the image to toggle the dragging functionality on and off

#### Image controls -- mouse

There is a close button, and a full URL link at the top of the page

#### Clear all images -- Esc

You can press Esc to close the image without the need for clicking the close button

#### Refresh Queue -- Ctrl

You can press Ctrl to re-initialize the script, for when dynamically generated images don't respond to right-clicking

#### Resizing images -- Mouse and Up/Down

If you left click an image spawned by the script, and press up/down, you can resize the image

## Special Thanks

Special thanks to Cyberdevil for providing suggestions

* Escape key
* Provide Direct URL to image
* Image should be draggable
* Don't let it interfere with default click events
