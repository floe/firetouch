/*********************************
* mouse & touch handler routines *
*********************************/

function libtisch_handlers() {

	// drag-and-drop emulation
	root.onmousemove = libtisch_mousemove;
	root.onmousedown = libtisch_mousedown;
	root.onmouseup   = libtisch_mouseup;

	root.addEventListener( "MozTouchDown", libtisch_touchdown, false ); // event.streamId = touch point id
	root.addEventListener( "MozTouchMove", libtisch_touchmove, false );
	root.addEventListener( "MozTouchUp",   libtisch_touchup,   false );

	root.addEventListener( "DOMMouseScroll", libtisch_scroll, false );
	root.action = function(gst) { } // do nothing
}


var lastclientx = [];
var lastclienty = [];
var clicked = false;
var use_mouse = true;

function disable_mouse() {
	if (use_mouse == false) return;
	root.onmousemove = null;
	root.onmousedown = null;
	root.onmouseup   = null;
	use_mouse = false;
}


function libtisch_mousedown(evt) { clicked = true; libtisch_enter(evt,-1); }
function libtisch_touchdown(evt) { disable_mouse(); libtisch_enter(evt,evt.streamId); }

function libtisch_mousemove(evt) { if (clicked) libtisch_move(evt,-1); }
function libtisch_touchmove(evt) { libtisch_move(evt,evt.streamId); }

function libtisch_mouseup(evt)   { clicked = false; libtisch_leave(evt,-1); }
function libtisch_touchup(evt)   { libtisch_leave(evt,evt.streamId); }


function libtisch_enter(evt,id) {

	lastclientx[id] = evt.clientX;
	lastclienty[id] = evt.clientY;

	var target = evt.target;
	while (target.action == undefined) target = target.parentNode;

	tap = new Gesture("tap",1);
	bc = new BlobCount(123);
	bc.result = 1;
	tap.features.push(bc);

	target.action(tap,evt.target);
	evt.cancelBubble = true;
	evt.preventDefault();
}

function libtisch_leave(evt,id) {

	var target = evt.target;
	while (target.action == undefined) target = target.parentNode;

	/*if (evt.target.parentNode.outline != undefined) {
		evt.target.parentNode.outline();
		console.log(JSON.stringify(evt.target.parentNode.reg));
	}*/
	rel = new Gesture("release",1);
	bc = new BlobCount(123);
	bc.result = 0;
	rel.features.push(bc);
	target.action(rel);
	evt.cancelBubble = true;
}

function libtisch_move(evt,id) {

	var x = evt.clientX - lastclientx[id]; lastclientx[id] = evt.clientX;
	var y = evt.clientY - lastclienty[id]; lastclienty[id] = evt.clientY;

	var target = evt.target;
	while (target.action == undefined) target = target.parentNode;

	mov = new Gesture("move",1);
	motion = new Motion(123);
	motion.result[0] = x;
	motion.result[1] = y;
	mov.features.push(motion);

	target.action(mov);
	evt.cancelBubble = true;
}

// same for mousewheel
function libtisch_scroll(evt) {

	var scroll = evt.detail;
	var target = evt.target;
	while (target.action == undefined) target = target.parentNode;

	if (evt.altKey) {
		gst = new Gesture("scale",1);
		scale = new Scale(123);
		scale.result = 1 + (0.1*scroll);
		gst.features.push(scale);
	} else {
		gst = new Gesture("rotate",1);
		rotation = new Rotation(123);
		rotation.result = scroll;
		gst.features.push(rotation);
	}

	target.action(gst);
	evt.cancelBubble = true;
}

function libtisch_update() {

	// a little animation
	var tiles = document.getElementsByTagName("g");
	for (var i = 0; i < tiles.length; i++) {
		var target = tiles[i];
		if (target.update != undefined) target.update();
	}
}

