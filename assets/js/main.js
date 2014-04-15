var Telemed = (function($){

	var app,
	currentPage = 'menu',
	previousPage,
	mainContext,
	mainContainer,
	menu,
	hammer,
	width, height
	;

	function initialize() {
		mainContainer = $('#main');
		setResizeEvent();
		setBrowserDimensions();

		hammer = Hammer(mainContainer, {
			prevent_default: true
		})
		.on('touch', function(e) {
			handleHammer(e);
		});
		
		Hammer.plugins.showTouches();

		app = $.sammy('#main', function() {
			
			// mustache
			this.use('Mustache', 'ms');
			
			// routes 
			this.get('#/', function() {
				mainContext = this;
				menu = Telemed.Menu;
				menu.initialize();
				// menu.setBadgeCount(3, '3');
				// menu.setBadgeOn(3);
			});
		});
	}

	// START ------------------------------------------------------------------------------------------------------------------------
	$(function(){
		initialize();
		app.debug = true;
		app.run('#/');
	});

	// METHODS ------------------------------------------------------------------------------------------------------------------------
	function handleHammer(e) {
		if (e.type === 'touch') {
			
			switch(currentPage) {

				case 'menu':
					//  main menu events
					var obj = $(e.target).data();
					if (Object.keys(obj)[0] === 'card') {
						var dataName = obj[Object.keys(obj)[0]];

						setCurrentPage(dataName);

						Telemed.Menu.isBadgeVisible(dataName) ? Telemed.Menu.setBadgeOff(dataName) : Telemed.Menu.setBadgeOn(dataName);
						// TweenLite.to(mainContainer, 0.5, {x: 1440});

						// mainContext.load('assets/templates/userData/index.ms').appendTo(mainContainer);

						Telemed.guiAnim.show(dataName);

					}
					break;

				case 'userData':
					Telemed.guiAnim.show('menu');
					break;
			}
		}
	}

	function setResizeEvent() {
		var resizeTimer;
		
		$(window).resize(function() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(setBrowserDimensions, 500);
		});
	}

	function setBrowserDimensions() {
		width = $(window).width();
		height = $(window).height();
	}

	function setCurrentPage(page) {
		currentPage = page;
	}

	function getCurrentPage() {
		return currentPage;
	}

	// API ------------------------------------------------------------------------------------------------------------------------
	return {
		getApp: function() {
			return app;
		},

		getMainContainer: function() {
			return mainContainer;
		},

		getWidth: function() {
			return width;
		},

		getHeight: function() {
			return height;
		},

		getMainContext: function() {
			return mainContext;
		},

		getCurrentPage: getCurrentPage(),
		
		initialize: initialize
	};
})(jQuery);