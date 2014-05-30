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
		initMenuBackButton();
		initCallButtons();
	}

	function initVideoCall() {
		initMenuBackButton();
		initVideoCallButtons();
	}

	function initChat() {
		initMenuBackButton();
		initButtons();
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
		loadPage(name, obj, name);
	}

	function loadPage(page, person, name) {
		container.empty();
		Telemed.getMainContext()
			.render('assets/templates/communication/' + page + '.ms', person)
			.appendTo(container)
			.then(function() {
				initButtons(name);
			});
	}

	function initButtons(name) {
		$('.buttons').on('click', function() {
			var button = $(this).data('button');
			var name = button.split('_');
			switch(button) {
				case name[0] + '_call':
					Telemed.getMainContext().redirect('#/communication/' + name[0] + '_call');
					break;
				case name[0] + '_chat':
					Telemed.getMainContext().redirect('#/communication/' + name[0] + '_chat');
					break;
				case name[0] + '_videoCall':
					Telemed.getMainContext().redirect('#/communication/' + name[0] + '_videoCall');
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
			var name = action.split('_');
			console.log(name);
			switch(action) {
				case name[0] + '_videoCall':
				Telemed.guiAnim.setFromBackButton();
				Telemed.getMainContext().redirect('#/communication/' + name[0] + '_videoCall');
					break;
				case name[0] + '_cancel':
					Telemed.guiAnim.setFromBackButton();
					Telemed.getMainContext().redirect('#/communication');
					break;
			}
		});
	}

	function initVideoCallButtons() {
		$('.buttons').on('click', function() {
			var action = $(this).data('button');
			var name = action.split('_');

			switch(action) {
				case name[0] + '_call':
				Telemed.guiAnim.setFromBackButton();
				Telemed.getMainContext().redirect('#/communication/' + name[0] + '_call');
					break;
				case name[0] + '_cancel':
					Telemed.guiAnim.setFromBackButton();
					Telemed.getMainContext().redirect('#/communication');
					break;
			}
		});
	}


	return {
		initialize: initialize,
		loadPage: loadPage,
		zdravnik_call: initCall,
		zdravnik_videoCall: initVideoCall,
		zdravnik_chat: initChat,
		metka_call: initCall,
		metka_videoCall: initVideoCall,
		metka_chat: initChat,
		tone_call: initCall,
		tone_videoCall: initVideoCall,
		tone_chat: initChat
	};
})();