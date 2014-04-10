var Telemed = (function($){

	var app,
	menu
	;

	function initialize() {
		app = $.sammy('#main', function() {
			
			// routes 
			this.get('#/', function(context) {
				console.log('124');
			});

		});
	}

	// START ------------------------------------------------------------------------------------------------------------------------
	$(function(){
		initialize();
		app.debug = true;
		app.run('#/');

		menu = Telemed.Menu;
		menu.initialize();
		menu.setBadgeCount(3, '3');
		menu.setBadgeOn(3);

	});


	// API ------------------------------------------------------------------------------------------------------------------------
	return {
		initialize: initialize
	};
})(jQuery);