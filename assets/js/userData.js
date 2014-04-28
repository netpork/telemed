Telemed.userData = (function(){
	'use strict';

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getUserDataMenu(), menuHandler);
		initBackButton();
	}

	function rotate() {
		TweenLite.to($('.mini-card')[0], 0.5, {rotationX: 360, scale: 1.1, transformOrigin:"center"});
	}

	function menuHandler(oldPage, newPage) {
		// console.log(oldPage, newPage);
		TweenLite.to(oldPage, 0.25, {opacity: 0, onComplete: function() {
			oldPage.hide();
			TweenLite.set(newPage, {opacity: 0});
			TweenLite.to(newPage, 0.25, {opacity: 1, onStart: function() {
				newPage.show();
			}});
		}});
	}

	function initBackButton() {
		$('#backButton').on('click', function(){
			Telemed.getMainContext().redirect('#/');
		});
	}

	return {
		initialize: initialize,
		rotate: rotate
	};

})();