var currentTransform = null;
function goto(url) {
	document.getElementById("iframe").setAttribute("src", url);
}

function doload() {

	document.getElementById("handle-top").addEventListener("mousedown", function (evt) { return startTransform(evt, 'move')}, false);

	var elts = ["handle-tl", "handle-tr", "handle-bl", "handle-br"];
	for (var i in elts) {
		document.getElementById(elts[i]).addEventListener("mousedown", function (evt) { return startTransform(evt, 'rotate')}, false);
		document.getElementById(elts[i]).addEventListener("mousemove", onMouseMove, false);
		document.getElementById(elts[i]).addEventListener("mouseup", onMouseUp, false);
	}

	elts = ["handle-tl", "handle-tr", "handle-bl", "handle-br", "surface", "iframe", "background", "handle-top"];
	for (var i in elts) {
		document.getElementById(elts[i]).addEventListener("mousemove", onMouseMove, false);
		document.getElementById(elts[i]).addEventListener("mouseup", onMouseUp, false);
	}

	var g = document.getElementById("target");

	g.vTranslate = [250, 250];
	g.vScale = 0.5;
	g.vRotate = 10;

	setupTransform(g.id);

}


function dwim(bla) {
	// not sure if this is actually needed
	//netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var evt = document.createEvent("MouseEvents");
  var ifr = document.getElementById("iframe"); 
	//console.log(ifr);
	var target = ifr.contentDocument.elementFromPoint(91,71);
	//console.log(target);
  evt.initMouseEvent("click", true, true, ifr.contentWindow, 1, 0, 0, 91, 71, false, false, false, false, 0, null);
	//console.log(evt);
  target.dispatchEvent(evt);
}


// take the transforms saved on the element and turn them into
// svg transform syntax
function setupTransform(s) {
	var g = document.getElementById(s);
	g.setAttribute("transform", "translate(" + g.vTranslate[0] + "," + g.vTranslate[1] + ") " +
			"scale(" + g.vScale + "," + g.vScale + ") " +
			"rotate(" + g.vRotate + ") ");
}

function startTransform(ev, what) {
	// ignore if something else is already going on
	if (currentTransform != null)
		return;

	document.getElementById("surface").setAttribute("fill", "white");
	//document.getElementById("foreignObject").setAttribute("opacity", "0.5");

	var e = "target";
	var g = document.getElementById(e);

	currentTransform = { what: what, el: e, g: g,
		s: g.vScale, r: g.vRotate, t: g.vTranslate,
		x: ev.clientX, y: ev.clientY };
}

function onMouseUp(ev) {
	currentTransform = null;
	document.getElementById("surface").setAttribute("fill", "none");
	//document.getElementById("foreignObject").setAttribute("opacity", "0.9");
}

function onMouseMove(ev) {
	if (!("currentTransform" in window) ||
			currentTransform == null)
		return;

	var ex = ev.clientX;
	var ey = ev.clientY;
	var pos = currentTransform.g.vTranslate;

	if (currentTransform.what == "rotate") {
		var r2d = 360.0 / (2.0 * Math.PI);

		var lastAngle = Math.atan2(currentTransform.y - pos[1],
				currentTransform.x - pos[0]) * r2d;
		var curAngle = Math.atan2(ey - pos[1],
				ex - pos[0]) * r2d;

		currentTransform.g.vRotate += (curAngle - lastAngle);

		var lastLen = Math.sqrt(Math.pow(currentTransform.y - pos[1], 2) +
				Math.pow(currentTransform.x - pos[0], 2));
		var curLen = Math.sqrt(Math.pow(ey - pos[1], 2) +
				Math.pow(ex - pos[0], 2));

		currentTransform.g.vScale = currentTransform.g.vScale * (curLen / lastLen);

	} else if (currentTransform.what == "move") {
		var xd = ev.clientX - currentTransform.x;
		var yd = ev.clientY - currentTransform.y;

		currentTransform.g.vTranslate = [ pos[0] + xd, pos[1] + yd ];
	}

	currentTransform.x = ex;
	currentTransform.y = ey;

	setupTransform(currentTransform.el);
}

window.addEventListener("load", doload, true);
