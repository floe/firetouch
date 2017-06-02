/*********************
* Checkbox functions *
*********************/

// Checkbox widget class
function Checkbox(obj) {

	Widget(obj,321);
	obj.checked = true;

	obj.action = Checkbox_action;
	obj.toggle = Checkbox_toggle;
	obj.ontap  = Checkbox_ontap;

	tap = new Gesture("tap",1);
	tap.features.push(new BlobCount(123));
	obj.reg.gestures.push(tap);
}

Checkbox_ontap = function() { }

Checkbox_toggle = function() {
	var cross = this.lastElementChild;
	if (cross.getAttribute("visibility") != null) {
		cross.removeAttribute("visibility");
		this.checked = true;
	} else {
		cross.setAttribute("visibility","hidden");
		this.checked = false;
	}
}

Checkbox_action = function(gst) {
	//console.log("Checkbox::action: "+gst.name);
	if (gst.name == "tap") {
		if (gst.features[0].result >= 1) this.toggle();
	}
}

load_svg("Checkbox");

