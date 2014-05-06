var Telemed = (function($){
	'use strict';
	
	var app,
	currentPage = 'menu',
	initCallback, touchCallback,
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

/*		hammer = Hammer(mainContainer, {
			prevent_default: true
		})
		.on('touch', function(e) {
			handleHammer(e);
		});
		// for development and testing
		Hammer.plugins.showTouches();
*/		

		app = $.sammy('#main', function() {
			
			// mustache
			this.use('Mustache', 'ms');
			
			// menu route 
			this.get('#/', function() {
				mainContext = this;
				setCurrentPage('menu');
				setInitCallback(Telemed.Menu.initialize);
				Telemed.guiAnim.show('menu');
			});

			// user data route			
			this.get('#/userData', function() {
				mainContext = this;
				setCurrentPage('userData');
				setInitCallback(Telemed.userData.initialize);
				Telemed.guiAnim.show('userData');
			});
		});
	}

	// START ------------------------------------------------------------------------------------------------------------------------
/*	$(function(){
		initialize();
		app.debug = true;
		app.run('#/');
	});
*/
	document.addEventListener('deviceready', function() {
		alert('123');
		initialize();
		app.debug = true;
		app.run('#/');
	});

	// METHODS ------------------------------------------------------------------------------------------------------------------------
/*	function handleHammer(e) {
		if (e.type === 'touch') {

			// call setted touch handler 
			touchCallback(e);

		}
	}
*/
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

	function setInitCallback(fn) {
		initCallback = fn;
	}

	function setTouchCallback(fn) {
		touchCallback = fn;
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

		getInitCallback: function() {
			return initCallback;
		},

		getTouchCallback: function() {
			return touchCallback;
		},

		getCurrentPage: getCurrentPage(),
		
		initialize: initialize
	};
})(jQuery);