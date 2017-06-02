// Region class
function Region(_name,_flags) {
	this.name = _name;
	this.outline = [];
	this.gestures = [];
	this.flags = (_flags == null) ? 0xFF : _flags;
}

// Gesture class
function Gesture(_name,_flags) {
	this.name = _name;
	this.features = [];
	this.flags = (_flags == null) ? 0 : _flags;
}

// Feature class
function Feature(_flags) {
	this.bounds = [];
	this.result = 0;
	this.flags = (_flags == null) ? 0 : _flags;
}
//Feature.prototype.toJSON = function() { return "{name:"+this.name+","+JSON.stringify(this.bounds)+","+JSON.stringify(this.result)+",flags:"+this.flags+"}"; }


// Motion feature
Motion.prototype = new Feature;
//Motion.prototype.name = "Motion"; // prototype members are ignored by JSON

function Motion(_flags) {
	this.name = "Motion";
	Feature.call(this,_flags);
	this.result = [0, 0, 0];
}

// Rotation feature
Rotation.prototype = new Feature;

function Rotation(_flags) {
	this.name = "Rotation";
	Feature.call(this,_flags);
	this.result = 0;
}

// Scale feature
Scale.prototype = new Feature;

function Scale(_flags) {
	this.name = "Scale";
	Feature.call(this,_flags);
	this.result = 1;
}

// BlobCount feature
BlobCount.prototype = new Feature;

function BlobCount(_flags) {
	this.name = "BlobCount";
	Feature.call(this,_flags);
	this.result = 0;
}

