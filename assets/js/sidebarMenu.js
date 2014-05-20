Telemed.sidebarMenu = (function($){
	'use strict';

	var container,
	cards,
	cardActive,
	currentMenu,
	newMenu,
	oldMenu,
	menuHandler,
	templatesPath ='assets/templates/',
	tweenBusy = false,
	menuLocked = false,

	userData = [
		{
			cardInfo: 'personalData',
			text: 'Osebni Podatki'
		},
		{
			cardInfo: 'personalDoctors',
			text: 'Moji zdravniki'
		},
		{
			cardInfo: 'personalHealthCard',
			text: 'Karton'
		}
	],

	measures = [
		{
			cardInfo: 'weight',
			text: 'Teža'
		},
		{
			cardInfo: 'sugar',
			text: 'Sladkor'
		},
		{
			cardInfo: 'pressure',
			text: 'Tlak'
		},
		{
			cardInfo: 'status',
			text: 'Počutje'
		}
	],

	reminders = [
		{
			cardInfo: 'aspirin',
			text: 'Aspirin'
		},
		{
			cardInfo: 'novonorm',
			text: 'NovoNorm'
		},
		{
			cardInfo: 'ampril',
			text: 'Ampril'
		}
	]

	;

	function initialize(menu, menuEventHandler) {
		container = $('#sidebar-menu');
		oldMenu = 'personalData';
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
		
		// set default classes from code since we are rendering partial
		// TweenLite.set(container, {perspective: 300});
		$(cards[0]).toggleClass('mini-card-active mini-card-default');

		// TweenLite.set($(cards[0], {rotationX: -360}));
		cardActive = cards[0];
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
		
		setActive(this);
		menuHandler($('#' + oldMenu), $('#' + newMenu), newMenu);
		oldMenu = newMenu;
	}

	function setActive(el) {
		// resetCards();
		
		tweenBusy = true;

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
		$(cardActive).transition({
			scale: 0,
			duration: 500,
			complete: function() {
				cardActive.remove();
				prepareMenu();
			}
		});
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

		getActiveSubmenu: getActive,

		removeActiveMenu: removeActive,

		menuOff: function() {
			menuLocked = true;
		},

		menuOn: function() {
			menuLocked = false;
		}
	};

})(jQuery);