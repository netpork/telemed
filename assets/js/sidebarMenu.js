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
				});
	}

	function prepareMenu() {
		cards = container.find('.mini-card');
		cards.on('click', touchMenuHandler);
		
		// set default classes from code since we are rendering partial
		TweenLite.set(container, {perspective: 300});
		$(cards[0]).toggleClass('mini-card-active mini-card-default');
		// TweenLite.set($(cards[0], {rotationX: -360}));
		cardActive = cards[0];
	}

	function touchMenuHandler(e) {
		if (tweenBusy) return;

		newMenu = $(this).data('card');
		
		// check if clicked menu is the current one
		if (newMenu === oldMenu) return;
		
		setActive(this);
		menuHandler($('#' + oldMenu), $('#' + newMenu));
		oldMenu = newMenu;
	}

	function setActive(el) {
		// resetCards();
		
		TweenLite.to(cardActive, 0.25, {
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
	}

	function resetCards() {
		$(cards).removeClass('mini-card-default mini-card-active');
		$(cards).toggleClass('mini-card-default');
	}


	return {
		initialize: initialize,
		
		getUserDataMenu: function() {
			return userData;
		}
	};

})(jQuery);