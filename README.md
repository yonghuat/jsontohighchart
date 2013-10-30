jsontohighchart
===============

highchart wrapper to make simple highcharts from JSON url



USAGE EXAMPLES:
=================================================

$('#container1').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'campaignid',  //category variable (x axis label), use date field name for time series 
		seriesname: 'mediacat', //series name variable
		variable: 'cost',  //data variable 
		label: 'コスト', //label for variable　(optional)
		
		stack: 'normal',  //'normal', 'percent' or  null
		type: 'column',
		title: 'column chart by category', 
		decimal : 0,   // decimal point
		
			
		HCoptions: {
			//Highcharts Options here
			xAxis: {
				labels: {
					rotation: 90,
					y: 20
				}
			}
	
		}
});

$('#container2').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'reportdate',  //category variable (x axis label), use date field name for time series 
		seriesname: 'campaignid', //series name variable
		variable: ['install','cost'],  //data variable 
		label: ['インストール','コスト'],

		stack: 'normal',  //'normal', 'percent' or  null
		type: ['column', 'line'],
		title: 'time series', 
		decimal : 0,   // decimal point
		
		ymin: [5000,0],
		
		xaxistype: 'datetime',  //datetime, category
		interval: 'daily',   //for time series chart
		mindate: '2013-10-20', //yyyy-mm-dd
		maxdate: '2013-10-25',
		
		
});



$('#container3').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'campaignid',  //category variable (x axis label), use date field name for time series 
		variable: 'cost',  //data variable 
		
		type: 'pie',
		title: 'pie chart', 
		decimal : 0,   // decimal point
		
		
		HCoptions: {
			//Highcharts Options here
			legend: {
				maxHeight: '200'
				}
			
		}
});


$('#container4').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'mediacat',  //category variable (x axis label), use date field name for time series 
		variable: ['cost', 'install'],  //data variable ,  x, y
		label: ['コスト','インストール'],
		
		type: 'scatter',
		title: 'scatter chart', 
		decimal :  0,  // decimal point
		
		ymin: 0,  //min for first variable
		  // to display data table
		
});


$('#container5').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'mediacat',  //category variable (x axis label), use date field name for time series 
		variable: ['install', 'cost', 'newreg'],  //data variable  x, y, z
		
		type: 'scatter',
		title: 'Scatter bubble chart', 
		decimal :  0  
		
});


$('#container6').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'mediacat',  //category variable (x axis label), use date field name for time series 
		//seriesname: 'campaignid', //series name variable
		variable: ['install', 'cost', 'newreg'],  //data variable  x, y, z
		label: ['インストール','コスト','新規登録'],
		//variable: 'install',
		
		type: 'bubble',
		title: 'bubble chart', 
		decimal :  0, // decimal point
		ymin: [0,0],
		datatable: 'yes'  // to display data table
		
});
