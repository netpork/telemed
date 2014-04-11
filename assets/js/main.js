var Telemed = (function($){

	var app,
	mainContainer,
	menu,
	hammer
	;

	function initialize() {
		mainContainer = $('#main');
		
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
			this.get('#/', function(context) {
				menu = Telemed.Menu;
				menu.initialize(context);
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
			// console.log($(e.target).data());
			
			var obj = $(e.target).data();
			if (Object.keys(obj)[0] === 'card') {
				var dataName = obj[Object.keys(obj)[0]];
				Telemed.Menu.isBadgeVisible(dataName) ? Telemed.Menu.setBadgeOff(dataName) : Telemed.Menu.setBadgeOn(dataName);
			}
		}
	}

	// API ------------------------------------------------------------------------------------------------------------------------
	return {
		getApp: function() {
			return app;
		},

		getMainContainer: function() {
			return mainContainer;
		},
		
		initialize: initialize
	};
})(jQuery);