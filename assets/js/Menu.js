Telemed.Menu = (function(){
	var badges,
	menuContent
	;

	function initialize() {
		console.log('Menu.init');
		menuContent = $('div.menu-content');
		badges = menuContent.find('.badge');
	}

	function setBadgeCount(index, count) {
		$(badges[index - 1]).html(count);
	}

	function resetBadgeCount(index, count) {
		$(badges[index - 1]).html('0');
	}

	function setBadgeVisible(index) {
		$(badges[index - 1])
		.removeClass('badge-hidden')
		.addClass('badge-visible');
	}

	function setBadgeHidden(index) {
		$(badges[index - 1])
		.removeClass('badge-visible')
		.addClass('badge-hidden');
	}

	return {
		initialize: initialize,
		setBadgeOn: setBadgeVisible,
		setBadgeOff: setBadgeHidden,
		setBadgeCount: setBadgeCount,
		resetBadgeCount: resetBadgeCount,

		getMenuContent: function() {
			return menuContent;
		},

		getBadges: function() {
			return badges;
		}
	};

})();