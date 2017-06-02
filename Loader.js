// --------------------- //
// FireTouch main loader //
// --------------------- //


// convenience string function
String.prototype.startsWith = function(str) { return (this.match("^"+str)==str) }

// handy reference to document root
var root = document.documentElement;

// SVG widget templates
var templates = [];


// load a secondary Javascript file
function load_script( name, user_onload ) {
	console.log("loading script: "+name);
	var script = document.createElementNS( "http://www.w3.org/2000/svg", "script" );
	script.setAttributeNS( "http://www.w3.org/1999/xlink", "href", name+".js" );
	script.setAttribute( "type", "text/ecmascript" );
	script.onload = function() { console.log("loaded script: "+name); if (user_onload != undefined) user_onload(); }
	root.appendChild( script );
}


// load an SVG template
function load_svg( name ) {

	var request = new XMLHttpRequest();

	request.open( 'GET', name+".svg", false ); request.send( null );
	if ((request.status == 0) || (request.status == 200)) templates[name] = request.responseXML;

	// FIXME: this is a nasty hack, do_replace should only be called once (here)
	do_replace(name);

	console.log("loaded SVG: "+name);
	console.log(templates);

	/*var template = document.implementation.createDocument("","",null);
	template.onload = function() { console.log("loaded SVG: "+name); do_replace(name); }
	template.load(name+".svg");
	templates[name] = template;*/
}


// transform all g elements starting with name into corresponding widgets
function do_replace( name ) {

	var rects = document.getElementsByTagName("g");

	// retrieve the correct "constructor"
	var makewidget = window[name];
	if (makewidget == undefined)
		makewidget = function(obj) { Widget(obj,0xFF); }

	// get the template object
	var templ = templates[name];
	if (templ != undefined) templ = templ.getElementById(name);

	for (var i = 0; i < rects.length; i++) {
		var target = rects[i];
		if (target.id.startsWith(name)) {
			console.log("replacing "+target.id);
			if (templ != undefined) {
				var newnode = templ.cloneNode(true);
				newnode.id = target.id;

				target.parse_transform();
				newnode.ux = target.ux; newnode.uscale = target.uscale;
				newnode.uy = target.uy; newnode.uangle = target.uangle;
				newnode.update_transform();

				target.parentNode.appendChild(newnode);
				target.parentNode.removeChild(target);
				makewidget(newnode);
			} else {
				if (target.action == undefined)
					makewidget(target);
			}
		}
	}
}


// load a specific widget type
function libtisch_load( name ) {
	load_script( name, function() { do_replace(name); } );
}


// initialization: load some companion scripts
function libtisch_init() {
	load_script( "Handlers", function() { libtisch_handlers(); } ); // mouse handlers
	load_script( "Region" );
	load_script( "Widget" );
}

