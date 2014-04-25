Telemed.userData = (function(){

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getUserDataMenu());
	}

	function rotate() {
		TweenLite.to($('.mini-card')[0], 0.5, {rotationX: 360, scale: 1.1, transformOrigin:"center"});
	}

	return {
		initialize: initialize,
		rotate: rotate
	};

})();