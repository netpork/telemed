Telemed.communication = (function(){
	'use strict';

	var container
	;

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getCommunicationMenu(), menuHandler);
		container = $('#communicataionContainer');
		loadPage('zdravnik');
		console.log('1');
	}

	function initialize2() {
		console.log('2');
	}

	function menuHandler(oldPage, newPage, name) {
		console.log(name);
		loadPage(name);
	}

	function loadPage(page) {
		container.empty();
		Telemed.getMainContext()
			.load('assets/templates/communication/' + page + '.ms')
			.appendTo(container)
			.then(function() {
				initButtons();
			});
	}

	function initButtons() {
		$('.comm-buttons').on('click', function() {
			var button = $(this).data('button');
			switch(button) {
				case 'call':
					Telemed.getMainContext().redirect('#/communication/tone');
					break;
				case 'chat':
					break;
				case 'videoCall':
					break;
			}
		});
	}

	return {
		initialize: initialize,
		initialize2: initialize2,
		loadPage: loadPage
	};
})();