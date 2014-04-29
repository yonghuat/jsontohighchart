jsontohighchart
===============

highchart wrapper to make simple highcharts from JSON url.

Server side codes querying data from a database often return data in an associative data array. The server code needs only to print the array in JSON format whereas this wrapper specifies the fields to use for chart creation.

```php
<?php
//testserver.php
//example for associative array 
$dataArray=array( 
					array('month'=>'Jan', 'city'=>'Tokyo', 'temperature'=>7.0),
		  			array('month'=>'Feb', 'city'=>'Tokyo', 'temperature'=>6.9),
		  			array('month'=>'Mar', 'city'=>'Tokyo', 'temperature'=>9.5),
		  			array('month'=>'Apr', 'city'=>'Tokyo', 'temperature'=>14.5),
		  			array('month'=>'May', 'city'=>'Tokyo', 'temperature'=>18.2),
		  			array('month'=>'Jun', 'city'=>'Tokyo', 'temperature'=>21.5),
		  			array('month'=>'Jul', 'city'=>'Tokyo', 'temperature'=>25.2),
		  			array('month'=>'Aug', 'city'=>'Tokyo', 'temperature'=>26.5),
		  			array('month'=>'Sep', 'city'=>'Tokyo', 'temperature'=>23.3),
		  			array('month'=>'Oct', 'city'=>'Tokyo', 'temperature'=>18.3),
		  			array('month'=>'Nov', 'city'=>'Tokyo', 'temperature'=>13.9),
		  			array('month'=>'Dec', 'city'=>'Tokyo', 'temperature'=>9.6),
		  			
		  			array('month'=>'Jan', 'city'=>'New York', 'temperature'=>-0.2),
		  			array('month'=>'Feb', 'city'=>'New York', 'temperature'=>0.8),
		  			array('month'=>'Mar', 'city'=>'New York', 'temperature'=>5.7),
		  			array('month'=>'Apr', 'city'=>'New York', 'temperature'=>11.3),
		  			array('month'=>'May', 'city'=>'New York', 'temperature'=>17.0),
		  			array('month'=>'Jun', 'city'=>'New York', 'temperature'=>22.0),
		  			array('month'=>'Jul', 'city'=>'New York', 'temperature'=>24.8),
		  			array('month'=>'Aug', 'city'=>'New York', 'temperature'=>24.1),
		  			array('month'=>'Sep', 'city'=>'New York', 'temperature'=>20.1),
		  			array('month'=>'Oct', 'city'=>'New York', 'temperature'=>14.1),
		  			array('month'=>'Nov', 'city'=>'New York', 'temperature'=>8.6),
		  			array('month'=>'Dec', 'city'=>'New York', 'temperature'=>2.5),
		  			
		  			array('month'=>'Jan', 'city'=>'Berlin', 'temperature'=>-0.9),
		  			array('month'=>'Feb', 'city'=>'Berlin', 'temperature'=>0.6),
		  			array('month'=>'Mar', 'city'=>'Berlin', 'temperature'=>3.5),
		  			array('month'=>'Apr', 'city'=>'Berlin', 'temperature'=>8.4),
		  			array('month'=>'May', 'city'=>'Berlin', 'temperature'=>13.5),
		  			array('month'=>'Jun', 'city'=>'Berlin', 'temperature'=>17.0),
		  			array('month'=>'Jul', 'city'=>'Berlin', 'temperature'=>18.6),
		  			array('month'=>'Aug', 'city'=>'Berlin', 'temperature'=>17.9),
		  			array('month'=>'Sep', 'city'=>'Berlin', 'temperature'=>14.3),
		  			array('month'=>'Oct', 'city'=>'Berlin', 'temperature'=>9.0),
		  			array('month'=>'Nov', 'city'=>'Berlin', 'temperature'=>3.9),
		  			array('month'=>'Dec', 'city'=>'Berlin', 'temperature'=>1.0)
		  		);
                
echo json_encode($dataArray);
?>

```


USAGE EXAMPLES:
=================================================
```javascript

$('#container1').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'month',  //category variable (x axis label), use date field name for time series 
		seriesname: 'city', //series name variable
		variable: 'temperature',  //data variable 
		label: 'Temperature (°C)', //label for variable　(optional)
		
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
```

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
