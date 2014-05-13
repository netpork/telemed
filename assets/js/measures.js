Telemed.measures = (function(){
	'use strict';

	var container,
	insertButton
	;

	function initialize() {
		Telemed.sidebarMenu.initialize(Telemed.sidebarMenu.getMeasuresMenu(), menuHandler);
		initBackButton();
		container = $('#graph');
		insertButton = $('#insertButton');
		showWeightGraph();
	}

	function menuHandler(oldPage, newPage, name) {
		container.highcharts().destroy();
		TweenLite.to(insertButton, 0.5, {autoAlpha: 0});
		
		switch(name) {
			case 'weight':
				showWeightGraph();
				break;
			case 'sugar':
				showSugarGraph();
				break;
			case 'pressure':
				showPressureGraph();
				break;
			case 'status':
				showPieStatus()

				TweenLite.set(insertButton, {opacity: 0});
				TweenLite.to(insertButton, 1.0, {autoAlpha: 1, delay: 1});
				break;
		}
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
				}

				// plotLines: [{
				// 	value: 140,
				// 	color: 'red',
				// 	width: 2,
				// }]
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

	function showSugarGraph() {
		container.highcharts({
			chart: {
				type: 'column',
			},
			title: {
				text: 'Sladkor'
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
				min: 0,
				max: 10,
				tickInterval: 2,
				title: {
					text: 'mmol/L'
				},

				plotLines: [{
					value: 7.1,
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
					data: [[getMyDate(-3), 4.5], [getMyDate(-2), 5], [getMyDate(-1), 4.4], [getMyDate(0), 4.7]]
				},
				{
					name: 'Zvečer',
					data: [[getMyDate(-3), 5.8], [getMyDate(-2), 5.5], [getMyDate(-1), 5.3], [getMyDate(0), 6.1]]
				}
			]
		});
	}

	function showPieStatus() {
		container.highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			credits: {
				enabled: false
			},
			title: {
				text: 'Obdobje: April, 2014'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Počutje',
				data: [
					{
						name: 'Dobro',
						y: 62.8,
						sliced: true,
						selected: true
					},
					['Slabo',    100 - 62.8],
				]
			}]
		});
	}

	function getMyDate(dayDelta) {
		var myDate = new Date();
		myDate.setTime(myDate.getTime() + dayDelta * 86400000);
		return myDate.getTime();
	}

	function initBackButton() {
		$('#backButton').on('click', function(){
			// Telemed.getMainContext().redirect('#/');
			var chart = container.highcharts();
			chart.series[0].addPoint([getMyDate(1), 120]);
			chart.series[1].addPoint([getMyDate(1), 130]);
		});
	}

	return {
		initialize: initialize
	};

})();