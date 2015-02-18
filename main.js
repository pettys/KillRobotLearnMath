
var ls = document.getElementById('landscape');
var vp = document.getElementById('viewport');
var lastFrameTick = 0;
var keys = {};
document.addEventListener('keydown', function(e) {
	keys[e.keyCode.toString()] = true;
});
document.addEventListener('keyup', function(e) {
	keys[e.keyCode.toString()] = false;
});

ls.style.opacity = 0;
ls.style.display = '';

setTimeout(function() {
	vp.scrollTop = 100;
	vp.scrollLeft = 800;
	ls.style.opacity = 1;
	lastFrameTick = new Date().getTime();
	setInterval(gameLoop, 1);
}, 1000);

function gameLoop() {
	var ticks = (new Date().getTime() - lastFrameTick);
	lastFrameTick += ticks;

	var newLeft = null;
	var leftDelta = ticks * .8;
	if(keys['37']) {
		newLeft = vp.scrollLeft - leftDelta;
	} else if(keys['39']) {
		newLeft = vp.scrollLeft + leftDelta;
	}
	if(newLeft) {
		if(newLeft < 0) newLeft = 0;
		if(newLeft > 1600) newLeft = 1600;
		vp.scrollLeft = newLeft;
	}
	
}