Telemed.Menu = (function(){
	var badges,
	shelfButton,
	shelfContainer,
	shelfVisible = false,
	menuContent,
	app,
	context,
	first = true,

	menuData = {
		userData: {
			text: "Moji podatki"
		},
		measures: {
			text: "Meritve", action: "#"
		},
		reminders: {
			text: "Opomniki", action: "#"
		},
		communication: {
			text: "Komunikacija", action: "#"
		},
		info: {
			text: "Informacije", action: "#"
		}
	};

	function initialize() {
		app = Telemed.getApp();
		context = Telemed.getMainContext();
		setUpMenu();
		Telemed.Menu.setBadgeCount('measures', '3');
		Telemed.Menu.setBadgeOn('measures');
	}

	function setUpMenu() {
		menuContent = $('div.menu-content');
		badges = menuContent.find('.badge');
		shelfButton = menuContent.find('#shelf');
		shelfContainer = $('.shelf-container');
		menuContent.find('.card').on('click', touchHandler);
		shelfButton.on('click', shelfHandler);

		// context.partial('assets/templates/menu/index.ms', menuData).then(function(){
		// 	menuContent = $('div.menu-content');
		// 	badges = menuContent.find('.badge');
		// 	// $('#menu').removeClass('tm-hidden');
		// });
	}

	function setBadgeCount(name, count) {
		$(badges[findCardIndex(name)]).html(count);
	}

	function resetBadgeCount(name, count) {
		$(badges[findCardIndex(name)]).html('0');
	}

	function setBadgeVisible(name) {
		$(badges[findCardIndex(name)])
		.removeClass('badge-hidden')
		.addClass('badge-visible');
	}

	function setBadgeHidden(name) {
		$(badges[findCardIndex(name)])
		.removeClass('badge-visible')
		.addClass('badge-hidden');
	}

	function isBadgeVisible(name) {
		return $(badges[findCardIndex(name)])
		.hasClass('badge-visible');
	}

	function findCardIndex(name) {
		var index = 0;
		
		$.each(menuData, function(k, v) {
			if (name === k) return false;
			index++;
		});

		console.log(name, index);
		return index;
	}

	function shelfFocus() {
		shelfButton.focus();
	}

	function shelfBlur() {
		shelfButton.blur();
	}

	function touchHandler(e) {
		// var obj = $(e.target).data();
		// if (Object.keys(obj)[0] === 'card') {
		// 	var dataName = obj[Object.keys(obj)[0]];

			var cardName = $(e.target).data('card');
			context.redirect('#/' + cardName);
			
			// setCurrentPage(dataName);
			// Telemed.Menu.isBadgeVisible(dataName) ? Telemed.Menu.setBadgeOff(dataName) : Telemed.Menu.setBadgeOn(dataName);
			// TweenLite.to(mainContainer, 0.5, {x: 1440});

			// mainContext.load('assets/templates/userData/index.ms').appendTo(mainContainer);

			// Telemed.guiAnim.show(dataName);
		// }
	}

	function shelfHandler(e) {
		(shelfVisible) ? Telemed.guiAnim.hideShelf(shelfContainer) : Telemed.guiAnim.showShelf(shelfContainer);
 		shelfVisible = !shelfVisible;
	}

	return {
		initialize: initialize,
		setBadgeOn: setBadgeVisible,
		setBadgeOff: setBadgeHidden,
		setBadgeCount: setBadgeCount,
		resetBadgeCount: resetBadgeCount,
		findCard: findCardIndex,
		isBadgeVisible: isBadgeVisible,
		touch: touchHandler,

		getMenuContent: function() {
			return menuContent;
		},

		getBadges: function() {
			return badges;
		},

		getShelfButton: function() {
			return shelfButton;
		}
	};

})();