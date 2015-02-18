
var ls = document.getElementById('landscape');
var vp = document.getElementById('viewport');
var lastFrameTick = 0;
var keys = {};
var enemyCountDown = 1000;
var enemy = null;

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
	
	if(!enemy) {
		enemyCountDown -= ticks;
		if(enemyCountDown <= 0) {
			enemy = spawnEnemy();
		}
	} else {
		enemy.sprite.tick(ticks);
	}
	
}

function spawnEnemy() {
	var div = document.createElement('div');
	div.className = 'wall-crusher';
	div.sprite = {
		x: 1200,
		dist: 1000,
		tick: function(ticks) {
			var dist = div.sprite.dist - ticks * .02;
			if(dist < 0) dist = 0;
			div.sprite.dist = dist;
			
			div.style.left = div.sprite.x + 'px';
			var ratio = (1000-dist)*(1000-dist)/1000000;
			div.style.top = 220 + (350 * ratio) + 'px';
			var scale = .01 + .5 * ratio;
			div.style.transform = 'scale(' + scale + ', ' + scale + ')';
		}
	};
	div.sprite.tick(0);
	ls.appendChild(div);
	return div;
}
