/********************
* Textbox functions *
********************/

// Textbox widget class
function Textbox(obj) {

	Widget(obj,321);
	obj.firstElementChild.action = Textbox_top_action;
	obj.lastElementChild.action = Textbox_kbd_action;
	obj.toggle = Textbox_toggle;
	obj.ontap  = Textbox_ontap;

	// get text object - <g> -> <text> -> <tspan>
	obj.textbox = obj.firstElementChild.lastElementChild.firstElementChild;
	obj.text = "";
	obj.bbox = obj.firstElementChild.getBBox();

	tap = new Gesture("tap",1);
	tap.features.push(new BlobCount(123));
	obj.reg.gestures.push(tap);
}

Textbox_ontap = function() { }

Textbox_toggle = function() {
	var cross = this.lastElementChild;
	if (cross.getAttribute("visibility") != null) {
		cross.removeAttribute("visibility");
		this.checked = true;
	} else {
		cross.setAttribute("visibility","hidden");
		this.checked = false;
	}
}

Textbox_top_action = function(gst) {
	//console.log("Textbox::action: "+gst.name);
	if (gst.name == "tap") {
		if (gst.features[0].result >= 1) this.parentNode.toggle();
	}
}

Textbox_kbd_action = function(gst,target) {
	if (gst.name == "tap") {
		if (gst.features[0].result < 1) return;
		var key = "";
		if (target.firstChild != null) key = target.firstChild.textContent;
		else key = target.nextElementSibling.firstChild.textContent;
		if (key == "←") {
			this.parentNode.text = this.parentNode.text.substr(0,this.parentNode.text.length-1);
		} else {
			this.parentNode.text += key;
		}
		var text = this.parentNode.textbox;
		var pos = this.parentNode.text.length-21; if (pos < 0) pos = 0;
		text.textContent = this.parentNode.text.substr(pos,21) + "|";
	}
}

load_svg("Textbox");

