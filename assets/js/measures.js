Telemed.measures = (function(){
	'use strict';

	var container
	;

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getMeasuresMenu(), menuHandler);
		container = $('#graph');
		// showPressureGraph();
		showWeightGraph();
	}

	function menuHandler(oldPage, newPage) {
		console.log(oldPage, newPage);
	}

	function showPressureGraph() {
		container.highcharts({
			chart: {
				type: 'column',
			},
			title: {
				text: 'Sistolični krvni tlak'
			},
			credits: {
				enabled: false
			},
			xAxis: {
				type: 'datetime',
				tickInterval: 24 * 3600 * 1000,
				tickmarkPlacement: 'on',
				dateTimeLabelFormats: {
					day: '%e. %b'
				}
			},
			yAxis: {
				min: 60,
				max: 180,
				tickInterval: 20,
				title: {
					text: 'mm Hg'
				},

				plotLines: [{
					value: 140,
					color: 'red',
					width: 2,
				}]
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						color: '#FFFFFF',
						align: 'center',
						x: 0,
						y: 20,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif',
							textShadow: '0 0 3px black'
						}
					}
				}
			},
			series: [
				{
					name: 'Zjutraj',
					data: [[getMyDate(-3), 130], [getMyDate(-2), 120], [getMyDate(-1), 120], [getMyDate(0), 135]]
				},
				{
					name: 'Zvečer',
					data: [[getMyDate(-3), 125], [getMyDate(-2), 135], [getMyDate(-1), 125], [getMyDate(0), 120]]
				}
			]
		});
	}

	function showWeightGraph() {
		container.highcharts({
			chart: {
				type: 'column',
			},
			title: {
				text: 'Teža'
			},
			credits: {
				enabled: false
			},
			xAxis: {
				type: 'datetime',
				tickInterval: 24 * 3600 * 1000,
				tickmarkPlacement: 'on',
				dateTimeLabelFormats: {
					day: '%e. %b'
				}
			},
			yAxis: {
				min: 20,
				max: 100,
				tickInterval: 20,
				title: {
					text: 'kg'
				},

				plotLines: [{
					value: 140,
					color: 'red',
					width: 2,
				}]
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						color: '#FFFFFF',
						align: 'center',
						x: 0,
						y: 20,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif',
							textShadow: '0 0 3px black'
						}
					}
				}
			},
			series: [
				{
					name: 'Zjutraj',
					data: [[getMyDate(-3), 80], [getMyDate(-2), 81], [getMyDate(-1), 80], [getMyDate(0), 80]]
				},
				{
					name: 'Zvečer',
					data: [[getMyDate(-3), 82], [getMyDate(-2), 82], [getMyDate(-1), 82], [getMyDate(0), 82]]
				}
			]
		});
	}





	function getMyDate(dayDelta) {
		var myDate = new Date();
		myDate.setTime(myDate.getTime() + dayDelta * 86400000);
		return myDate.getTime();
	}

	return {
		initialize: initialize
	};

})();