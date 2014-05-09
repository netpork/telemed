Telemed.guiAnim = (function($){
	'use strict';

	var current,
	templatesPath ='assets/templates/',
	panels,
	shelfWidth = 300
	;

	function showPage(page) {
		if (page !== 'menu') {
			// show the content panel
			Telemed.getMainContext().load(templatesPath + page + '/index.ms').appendTo(Telemed.getMainContainer())
			.then(function() {
				getPanels();
				Telemed.getInitCallback()();
				scroll();
			});
		} else {
			// show the menu panel
			Telemed.getMainContext().load(templatesPath + page + '/index.ms').prependTo(Telemed.getMainContainer())
			.then(function() {
				getPanels();
				Telemed.getInitCallback()();
				// if app just launched, fade in the menu, otherwise scroll to menu
				panels.length < 2 ? fadeInMenu() : scrollToMenu();
			});
		}
	}

	function getPanels() {
		panels = Telemed.getMainContainer().find('>div.tm-panel');
	}

	function scroll() {
		
		// instant display for development 
		if (panels.length < 2) {
			$(panels[0]).removeClass('tm-hidden');
			return;
		}

		forceGPU();

		TweenLite.set(panels[1], {x: Telemed.getWidth()});
		$(panels[1]).removeClass('tm-hidden');

		TweenLite.to([panels[0], panels[1]], 0.5, {x: "-=" + Telemed.getWidth(), onComplete: function() {
			panels[0].remove();
			removeShelf();
		}});
	}

	function scrollToMenu() {
		forceGPU();
		TweenLite.set(panels[0], {x: -Telemed.getWidth()});
		$(panels[0]).removeClass('tm-hidden');
		TweenLite.to([panels[0], panels[1]], 0.5, {x: "+=" + Telemed.getWidth(), onComplete: function() {
			panels[1].remove();
		}});
	}

	function forceGPU() {
		TweenLite.set([panels[0], panels[1]], {force3D:true});
	}

	function fadeInMenu() {
		TweenLite.to('#menu', 1, {autoAlpha: 1, delay: 0.5});
	}

	function showShelf(shelf) {
		getPanels();
		$(shelf).toggleClass('tm-hidden');
		TweenLite.to(panels[0], 0.2, {x: "+=" + shelfWidth, opacity: 0.6});
	}

	function hideShelf(shelf) {
		TweenLite.to(panels[0], 0.2, {x: 0, opacity: 1, onComplete: function() {
			$(shelf).toggleClass('tm-hidden');
			// $(Telemed.Menu.getShelfButton()).blur();
			// Telemed.Menu.shelfBlur();
		}});
	}

	function removeShelf() {
		$('.shelf-container').remove();	
	}

	return {
		show: showPage,
		showShelf: showShelf,
		hideShelf: hideShelf
	};
})(jQuery);