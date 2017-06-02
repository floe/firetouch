// Slider widget
function Slider(obj) {

	Widget(obj,123);
	obj.pos = 0;

	obj.action = Slider_action;
	obj.onmove = Slider_onmove;

	mov = new Gesture("move",  1); mov.features.push(new Motion(123));
	obj.reg.gestures.push(mov);
}

Slider_onmove = function() { }

Slider_action = function(gst) {

	if (gst.name == "move") {

		var pt = root.createSVGPoint();
		var res = gst.features[0].result;
		pt.x = res[0];
		pt.y = res[1];

		var width = this.getBBox().width;
		var child = this.lastElementChild;

		child.parse_transform();
		var delta = child.transform_vec(pt,false);
		var tmp = child.ux + delta.x;
		if ((tmp < width/2) && (tmp > -width/2)) {
			child.ux += delta.x;
			this.pos = child.ux/width + 0.5;
			child.update_transform();
			this.onmove();
		}
	}
}

load_svg("Slider");
