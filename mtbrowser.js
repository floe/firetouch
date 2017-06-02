function init(e) {

	libtisch_init();

	libtisch_load("Textbox");
	libtisch_load("Tile");
	libtisch_load("Button");

  // uuuugly trick to delay modification of widgets until
	// loading/replacing of external items has completed
	window.setTimeout( function() {

	obj = document.getElementById( "Button1" );
	obj.ontap = function() { 
		url = this.parentNode.getChildByID("Textbox1").text;
		this.parentNode.getElementsByTagName("html:iframe")[0].setAttribute("src", url);
	}

	obj = document.getElementById( "Button2" );
	obj.ontap = function() {
		par = this.parentNode.parentNode;
		par.removeChild(this.parentNode);
	}

	obj = document.getElementById( "Button3" );
	obj.ontap = function() { 
		tab = document.getElementById("Tile123");
		newtab = tab.cloneNode(true);
		newtab.id = newtab.id+"_";
		tab.parentNode.appendChild(newtab);
		Tile(newtab);
	}

	window.setInterval( 'libtisch_update()', 33 );

	},1000);
}

