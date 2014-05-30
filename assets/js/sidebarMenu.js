Telemed.sidebarMenu = (function($){
	'use strict';

	var container,
	cards,
	cardActive,
	currentMenu,
	subPage = 'zdravnik',
	newMenu,
	oldMenu,
	menuHandler,
	templatesPath ='assets/templates/',
	tweenBusy = false,
	menuLocked = false,

	userData = [
		{
			cardInfo: 'personalData',
			text: 'Osebni Podatki',
			active: false
		},
		{
			cardInfo: 'personalDoctors',
			text: 'Moji zdravniki',
			active: true
		},
		{
			cardInfo: 'personalHealthCard',
			text: 'Karton',
			active: false
		}
	],

	measures = [
		{
			cardInfo: 'weight',
			text: 'Teža',
			active: false
		},
		{
			cardInfo: 'sugar',
			text: 'Sladkor',
			active: false
		},
		{
			cardInfo: 'pressure',
			text: 'Tlak',
			active: false
		},
		{
			cardInfo: 'status',
			text: 'Počutje',
			active: false
		}
	],

	reminders = [
		{
			cardInfo: 'aspirin',
			text: 'Aspirin',
			active: false
		},
		{
			cardInfo: 'novonorm',
			text: 'NovoNorm',
			active: false
		},
		{
			cardInfo: 'ampril',
			text: 'Ampril',
			active: false
		}
	],

	communication = [
		{
			cardInfo: 'zdravnik',
			text: 'Zdravnik',
			active: false
		},
		{
			cardInfo: 'metka',
			text: 'Metka',
			active: false
		},
		{
			cardInfo: 'tone',
			text: 'Tone',
			active: false
		}
	]
	;

	function initialize(menu, menuEventHandler) {
		container = $('#sidebar-menu');
		// oldMenu = menu[0].cardInfo;
		newMenu = '';
		currentMenu = menu;
		menuHandler = menuEventHandler;
		injectMenu();
	}

	function injectMenu() {
		Telemed.getMainContext().renderEach(templatesPath + 'userData/minicard.ms', currentMenu)
				.appendTo(container).then(function(){
					prepareMenu();
					initEvents();
					fadeMenu();
				});
	}

	function prepareMenu() {
		cards = container.find('.mini-card');
		if (!cards.length) return;

		// set default classes from code since we are rendering partial
		// TweenLite.set(container, {perspective: 300});

		var action;
		$.each(cards, function(idx, el) {
			action = $(el).data('card');
			if (action === subPage) {
				$(el)
					.removeClass('mini-card-active mini-card-default')
					.addClass('mini-card-active');
				cardActive = el;
				return false;
			}
		});

		// TweenLite.set($(cards[0], {rotationX: -360}));
		oldMenu = $(cardActive).data('card');
	}

	function isMenuEmpty(menu) {
		return menu.length ? false : true;
	}

	function initEvents() {
		cards.on('click', touchMenuHandler);
	}

	function fadeMenu() {
		$(container).transition({opacity: 1, duration: 500});
	}

	function touchMenuHandler(e) {
		if (tweenBusy || menuLocked) return;

		newMenu = $(this).data('card');
		
		// check if clicked menu is the current one
		if (newMenu === oldMenu) return;
		
		if (Telemed.getCurrentPage() === 'reminders') {
			Telemed.reminders.isMedicineTaken();
			return;
		}

		setActive(this);
		menuHandler($('#' + oldMenu), $('#' + newMenu), newMenu, oldMenu);
		oldMenu = newMenu;
	}

	function confirmed(taken) {
		if (!taken) return;

		removeActive();
	}


	function setActive(el) {
		// resetCards();
		
		tweenBusy = true;
		console.log(el, cardActive);

		$(cardActive).transition({
			rotateX: '360deg',
			perspective: '500px',
			duration: 500,
			complete: function() {
				$(cardActive).toggleClass('mini-card-active mini-card-default');
				$(cardActive).removeAttr('style');
			}

		});

		$(el).transition({
			rotateX: '-360deg',
			perspective: '500px',
			duration: 500,
			complete: function() {
				tweenBusy = false;
				$(el).toggleClass('mini-card-active mini-card-default');
				cardActive = el;
				$(el).removeAttr('style');
			}
		});

/*		TweenLite.to(cardActive, 0.25, {
			rotationX: 270,
			ease: Power3.easeOut,
			onStart: function() {
				tweenBusy = true;
			},
			onComplete: function() {
				$(cardActive).toggleClass('mini-card-active mini-card-default');
				// $(cardActive).addClass('mini-card-default');

				TweenLite.to(cardActive, 0.25, {
						rotationX: 0, 
						ease: Power3.easeOut,
						onComplete: function() {
							tweenBusy = false;
						}
					});
			}
		});
		
		TweenLite.to(el, 0.25, {
			rotationX: 90, 
			ease: Power3.easeOut, 
			onComplete: function() {
				$(el).toggleClass('mini-card-active mini-card-default');
				// $(el).removeClass('mini-card-default');
				// $(el).addClass('mini-card-active');
				TweenLite.to(el, 0.25, {
					rotationX: 360, 
					ease: Power3.easeOut,
					onComplete: function() {
						cardActive = el;
					}
				});
			}
		});
*/	
	}

	function getActive() {
		return container.find('.mini-card-active').data('card');
	}

	function removeActive() {
		remove(reminders, oldMenu);

		$(cardActive).transition({
			scale: 0,
			duration: 500,
			easing: 'easeInBack',
			complete: function() {
				cardActive.remove();
				
				if (reminders.length >= 1) {
					Telemed.reminders.switchPage($('#' + oldMenu), $('#' + newMenu));
				}

				if (!reminders.length) {
					// no medicines, redirect to menu
					Telemed.getMainContext().redirect('#/');
				} else {
					prepareMenu();
				}
			}
		});


	}

	function remove(menu, name) {
		var idx = menu.map(function(item) {
			return item.cardInfo;
		}).indexOf(name);

		menu.splice(idx, 1);
	}

	function resetCards() {
		$(cards).removeClass('mini-card-default mini-card-active');
		$(cards).toggleClass('mini-card-default');
	}


	return {
		initialize: initialize,
		
		getUserDataMenu: function() {
			return userData;
		},
		
		getMeasuresMenu: function() {
			return measures;
		},

		getRemindersMenu: function() {
			return reminders;
		},

		getCommunicationMenu: function() {
			return communication;
		},

		getActiveSubmenu: getActive,

		removeActiveMenu: removeActive,

		remove: remove,

		menuOff: function() {
			menuLocked = true;
		},

		menuOn: function() {
			menuLocked = false;
		},

		getOldMenu: function() {
			return oldMenu;
		},

		setOldMenu: function(old) {
			oldMenu = old;
		},

		setNewMenu: function(menu) {
			newMenu = menu;
		},

		setSubPage: function(page) {
			subPage = page;
		},

		getSubPage: function() {
			return subPage;
		},

		isMenuEmpty: isMenuEmpty,

		confirmed: confirmed
	};

})(jQuery);