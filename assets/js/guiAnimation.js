Telemed.guiAnim = (function($){
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
		TweenLite.set(panels[1], {x: Telemed.getWidth()});
		$(panels[1]).removeClass('tm-hidden');

		TweenLite.to([panels[0], panels[1]], 0.5, {x: "-=" + Telemed.getWidth(), onComplete: function() {
			panels[0].remove();
		}});
	}

	function scrollToMenu() {
		TweenLite.set(panels[0], {x: -Telemed.getWidth()});
		$(panels[0]).removeClass('tm-hidden');
		TweenLite.to([panels[0], panels[1]], 0.5, {x: "+=" + Telemed.getWidth(), onComplete: function() {
			panels[1].remove();
		}});
	}

	function fadeInMenu() {
		TweenLite.to('#menu', 1, {autoAlpha: 1, delay: 0.5});
	}

	function showShelf(shelf) {
		getPanels();
		$(shelf).toggleClass('tm-hidden');
		TweenLite.to(panels[0], 0.2, {x: "+=" + shelfWidth, opacity: 0.2});
	}

	function hideShelf(shelf) {
		TweenLite.to(panels[0], 0.2, {x: 0, opacity: 1, onComplete: function() {
			$(shelf).toggleClass('tm-hidden');
			$(Telemed.Menu.getShelfButton()).blur();
		}});
	}

	return {
		show: showPage,
		showShelf: showShelf,
		hideShelf: hideShelf
	};
})(jQuery);