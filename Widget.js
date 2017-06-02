// create a new widget and attach to svg object
function Widget(obj,flags) {

	obj.ux = 0;
	obj.uy = 0;
	obj.uscale = 1;
	obj.uangle = 0;

	//if (obj == null) return;
	obj.reg = new Region(obj.id,flags);

	//this.obj = obj;
	//obj.widget = this;
}

//SVGGElement.prototype.action = function(gst) { }

// find child widgets with ID
SVGGElement.prototype.getChildByID = function(sid) {
	var children = this.childNodes;
	for (var i = 0; i < children.length; i++)
		if (children[i].id == sid)
			return children[i];
	return undefined;
}
	
// calculate the outline and put into region
SVGGElement.prototype.outline = function() {

	// get the target - this should be a <path id="Outline"/>. otherwise, use bbox.
	var target = this.firstElementChild;
	var CTM = target.getScreenCTM();
	var p0 = root.createSVGPoint();

	if (target.id == "Outline") {
		var points = target.pathSegList;
		for (var i = 0; i < points.numberOfItems; i++) {
			var item = points.getItem(i);
			p0.x = item.x;
			p0.y = item.y;
			var p1 = p0.matrixTransform(CTM);
			this.reg.outline[i] = [ p1.x.toFixed(2), p1.y.toFixed(2) ];
		}
	} else {
		var bbox = target.getBBox();
		p0.x = bbox.x;            p0.y = bbox.y;             p1 = p0.matrixTransform(CTM); this.reg.outline[0] = [ p1.x.toFixed(2), p1.y.toFixed(2) ];
		p0.x = bbox.x+bbox.width; p0.y = bbox.y;             p1 = p0.matrixTransform(CTM); this.reg.outline[1] = [ p1.x.toFixed(2), p1.y.toFixed(2) ];
		p0.x = bbox.x+bbox.width; p0.y = bbox.y+bbox.height; p1 = p0.matrixTransform(CTM); this.reg.outline[2] = [ p1.x.toFixed(2), p1.y.toFixed(2) ];
		p0.x = bbox.x;            p0.y = bbox.y+bbox.height; p1 = p0.matrixTransform(CTM); this.reg.outline[3] = [ p1.x.toFixed(2), p1.y.toFixed(2) ];
	}
}

// transform vector for application to element (abs = true: assume absolute screen coords, else relative)
SVGGElement.prototype.transform_vec = function(point,abs) {
	var ptm = this.parentNode.getScreenCTM();
	//console.log("parent ctm:\n" + ptm.a + " " + ptm.c + " " + ptm.e + "\n"+ ptm.b + " " + ptm.d + " " + ptm.f );
	if (abs == false) { ptm.e = 0; ptm.f = 0; }
	ptm = ptm.inverse();
	//console.log("inverse ptm:\n" + ptm.a + " " + ptm.c + " " + ptm.e + "\n"+ ptm.b + " " + ptm.d + " " + ptm.f );
	var newpt = point.matrixTransform(ptm);
	return newpt;
}

// transform the string in the "transform" attribute into numbers
SVGGElement.prototype.parse_transform = function() {

	var xfs = this.getAttribute("transform");

	this.ux = 0;
	this.uy = 0;

	this.uscale = 1;
	this.uangle = 0;

	var re = /translate\(([-.0-9]+)\)/;
	var res = re.exec(xfs);
	if (res != null) {
		this.ux = parseFloat(res[1]);
	}

	re = /translate\(([-.0-9]+), ([-.0-9]+)\)/;
	res = re.exec(xfs);
	if (res != null) {
		this.ux = parseFloat(res[1]);
		this.uy = parseFloat(res[2]);
	}

	re = /scale\(([-.0-9]+)\)/;
	res = re.exec(xfs);
	if (res != null) {
		this.uscale = parseFloat(res[1]);
	}

	re = /rotate\(([-.0-9]+)\)/;
	res = re.exec(xfs);
	if (res != null) {
		this.uangle = parseFloat(res[1]);
	}
}

// create a new transform attribute from ux,uy,uscale,uangle
SVGGElement.prototype.update_transform = function() {
	this.setAttribute(
		"transform", "translate(" + this.ux + ", " + this.uy + ") " +
		"scale(" + this.uscale + ") " +
		"rotate(" + this.uangle + ")"
	);
}

// move object by delta
SVGGElement.prototype.move = function(delta) {
	this.parse_transform();
	//console.log("vector: " + pt.x + ", " + pt.y );
	//console.log("before: " + el.ux + "," + el.uy + " " + el.uscale + " " + el.uangle);
	delta = this.transform_vec(delta,false);
	//console.log("vector: " + pt.x + ", " + pt.y );
	this.ux += delta.x;
	this.uy += delta.y;
	this.update_transform();
	//console.log("after: " + el.ux + "," + el.uy + " " + el.uscale + " " + el.uangle);
}

// rotate object by angle
SVGGElement.prototype.rotate = function(angle) {
	this.parse_transform();
	this.uangle += angle;
	this.update_transform();
}

// scale object by factor
SVGGElement.prototype.scale = function(factor) {
	this.parse_transform();
	this.uscale *= factor;
	this.update_transform();
}

