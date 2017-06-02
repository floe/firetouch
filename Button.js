/*********************
* Button functions *
*********************/

// Button widget class
function Button(obj) {
	Widget(obj,321);
	obj.action = Button_action;
	obj.ontap  = Button_ontap;

	tap = new Gesture("tap",1);
	tap.features.push(new BlobCount(123));
	obj.reg.gestures.push(tap);

	/*rel = new Gesture("release",1);
	rel.features.push(new BlobCount(123));
	obj.reg.gestures.push(rel);*/
}

Button_ontap = function() { }

Button_action = function(gst) {
	if (gst.name == "tap") {
		if (gst.features[0].result >= 1) this.ontap();
	}
	/*if (gst.name == "release") {
		if (gst.features[0].result == 0) this.toggle();
	}*/
}

