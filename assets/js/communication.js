Telemed.communication = (function(){
	'use strict';

	var container,

	zdravnik = {
		name: 'Dr. Zoran Novak',
		sub: 'Moj osebni zdravnik',
		pic: "assets/img/doctor.jpg"
	},

	tone = {
		name: '',
		sub: '',
		pic: "assets/img/Tone.jpg"
	},

	metka = {
		name: 'Metka',
		sub: 'rojstni dan ima čez 7 dni',
		pic: "assets/img/Metka.jpg"
	}

	;

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getCommunicationMenu(), menuHandler);
		container = $('#communicataionContainer');
		loadPage('zdravnik', zdravnik);
		initMenuBackButton();
		console.log('1');
	}

	function initCall() {
		initBackButton();
		initCallButtons();
	}

	function initVideoCall() {
		initBackButton();
		initVideoCallButtons();
	}


	function menuHandler(oldPage, newPage, name) {
		console.log(name);
		var obj;

		switch (name) {
			case 'zdravnik':
				obj = zdravnik;
				break;
			case 'metka':
				obj = metka;
				break;
			case 'tone':
				obj = tone;
				break;
		}
		loadPage(name, obj);
	}

	function loadPage(page, person) {
		container.empty();
		Telemed.getMainContext()
			.render('assets/templates/communication/' + page + '.ms', person)
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
					Telemed.getMainContext().redirect('#/communication/call');
					break;
				case 'chat':
					break;
				case 'videoCall':
					Telemed.getMainContext().redirect('#/communication/videoCall');
					break;
			}
		});
	}

	function initMenuBackButton() {
		$('#backButton').on('click', function(){
			Telemed.guiAnim.setFromBackButton();
			Telemed.getMainContext().redirect('#/');
		});
	}

	function initBackButton() {
		$('#backButton').on('click', function(){
			Telemed.guiAnim.setFromBackButton();
			Telemed.getMainContext().redirect('#/communication');
		});
	}

	function initCallButtons() {
		$('.buttons').on('click', function() {
			var action = $(this).data('button');

			switch(action) {
				case 'videoCall':
				Telemed.guiAnim.setFromBackButton();
				Telemed.getMainContext().redirect('#/communication/videoCall');
					break;
				case 'cancel':
					Telemed.guiAnim.setFromBackButton();
					Telemed.getMainContext().redirect('#/communication');
					break;
			}
		});
	}

	function initVideoCallButtons() {
		$('.buttons').on('click', function() {
			var action = $(this).data('button');

			switch(action) {
				case 'call':
				Telemed.guiAnim.setFromBackButton();
				Telemed.getMainContext().redirect('#/communication/call');
					break;
				case 'cancel':
					Telemed.guiAnim.setFromBackButton();
					Telemed.getMainContext().redirect('#/communication');
					break;
			}
		});
	}


	return {
		initialize: initialize,
		loadPage: loadPage,
		call: initCall,
		videoCall: initVideoCall
	
	};
})();