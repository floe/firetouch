function init(e) {

	libtisch_init();

	libtisch_load("Checkbox");
	libtisch_load("Slider");
	libtisch_load("Textbox");

	libtisch_load("Tile");
	libtisch_load("Button");

  // uuuugly trick to delay modification of widgets until
	// loading/replacing of external items has completed
	window.setTimeout( function() {

		obj = document.getElementById( "Button1" );
		obj.ontap = function() { 
			url = document.getElementById("Textbox1").text;
			//console.log(url);
			document.getElementById("iframe").setAttribute("src", url);
		}

		obj = document.getElementById( "Checkbox1" );
		obj.toggle = function() { 
			url = "http://people.mozilla.com/~prouget/demos/resources/videos/billyBrowsers.ogg";
			//console.log(url);
			document.getElementById("iframe").setAttribute("src", url);
		}

		document.getElementById( "Slider1" ).onmove = function() {
			var el = document.getElementsByTagName("text")[0].firstElementChild;
			el.textContent = this.pos.toFixed(2);
		}

	},1000);

	window.setInterval( 'refreshTimer()', 33 );
}


function refreshTimer() {

	libtisch_update();

	// move element in screen coordinates
	if (document.getElementById("Checkbox3").checked == false) return;
	var el = document.getElementById( 'Tile1' );
	var pt = root.createSVGPoint();
	pt.x = 1; pt.y = 0;
	el.move(pt);
}

