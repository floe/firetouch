//Tile.prototype = new Widget;

// movable Tile widget
function Tile(obj) {

	Widget(obj,123);

	obj.action = Tile_action;
	obj.onmove = Tile_onmove;
	obj.update = Tile_update;

	obj.vel = root.createSVGPoint();
	obj.slide = false;

	mov = new Gesture("move",  1); mov.features.push(new Motion(123));
	scl = new Gesture("scale", 1); scl.features.push(new Scale(123));
	rot = new Gesture("rotate",1); rot.features.push(new Rotation(123));

	obj.reg.gestures.push(mov);
	obj.reg.gestures.push(scl);
	obj.reg.gestures.push(rot);
}

Tile_onmove = function() { }

Tile_update = function() {

	if (!this.slide) return;
	this.move(this.vel);

	var nx = this.vel.x*0.9;
	var ny = this.vel.y*0.9;

	if (Math.sqrt(nx*nx+ny*ny) < 0.1) {
		nx = 0; ny = 0;
		this.slide = false;
	}

	this.vel.x = nx;	
	this.vel.y = ny;
}

Tile_action = function(gst) {
	//console.log("Tile::action: "+gst.name);
	var changed = false;

	if (gst.name == "tap"    ) { this.slide = false; }
	if (gst.name == "release") { this.slide = true;  }

	if (gst.name == "move") {
		var pt = root.createSVGPoint();
		var res = gst.features[0].result;
		pt.x = res[0];
		pt.y = res[1];
		this.move(pt);
		this.vel = pt;
		changed = true;
	}

	if (gst.name == "rotate") {
		this.rotate(gst.features[0].result);
		changed = true;
	}

	if (gst.name == "scale") {
		this.scale(gst.features[0].result);
		changed = true;
	}

	if (changed == true) {
		//this.parentNode.insertBefore(this,this.parentNode.lastChild); // push to top
		this.onmove();
	}
}

