Telemed.reminders = (function() {
	'use strict';


	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getRemindersMenu(), menuHandler);

		$('.takenButton').on('click', function() {
			var active = Telemed.sidebarMenu.getActiveSubmenu();

			console.log(active);

			Telemed.sidebarMenu.removeActiveMenu();
		});

	}

	function menuHandler(oldPage, newPage, name) {

	}

	function showConfirm(message) {
		navigator.notification.confirm(
			message,
			onConfirm,
			'Opozorilo',
			['Ne', 'Da']
		);
	}

	function onConfirm(buttonIndex) {

	}

	return {
		initialize: initialize
	};

})();