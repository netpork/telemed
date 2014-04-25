Telemed.sidebarMenu = (function(){
	var container,
	cards,
	cardActive,
	currentMenu,
	templatesPath ='assets/templates/',

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

	function initialize(menu) {
		container = $('#sidebar-menu');
		currentMenu = menu; 
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
		console.log($(this).data('card'));
		setActive(this);
	}

	function setActive(el) {
		// resetCards();
		
		TweenLite.to(cardActive, 0.5, {rotationX: 0, ease: Power3.easeOut, onComplete: function(){
			$(cardActive).toggleClass('mini-card-active mini-card-default');
			// $(cardActive).addClass('mini-card-default');
		}});
		
		TweenLite.to(el, 0.5, {rotationX: 360, ease: Power3.easeOut, onComplete: function() {
			$(el).toggleClass('mini-card-active mini-card-default');
			// $(el).removeClass('mini-card-default');
			// $(el).addClass('mini-card-active');
			cardActive = el;
		}});
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

})();