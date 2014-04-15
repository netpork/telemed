Telemed.Menu = (function(){
	var badges,
	menuContent,
	app,
	context,

	menuData = {
		userData: {
			text: "Moji podatki", action: "#"
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
	}

	function setUpMenu() {
		context.partial('assets/templates/menu/index.ms', menuData).then(function(){
			menuContent = $('div.menu-content');
			badges = menuContent.find('.badge');
			$('#menu').removeClass('tm-hidden');
		});
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

		return index;
	}

	return {
		initialize: initialize,
		setBadgeOn: setBadgeVisible,
		setBadgeOff: setBadgeHidden,
		setBadgeCount: setBadgeCount,
		resetBadgeCount: resetBadgeCount,
		findCard: findCardIndex,
		isBadgeVisible: isBadgeVisible,

		getMenuContent: function() {
			return menuContent;
		},

		getBadges: function() {
			return badges;
		}
	};

})();