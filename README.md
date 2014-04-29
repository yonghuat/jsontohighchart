jsontohighchart
===============

highchart wrapper to make simple highcharts from JSON url.

Server side codes querying data from a database often return data in an associative data array. The server code needs only to print the array in JSON format whereas this wrapper specifies the fields to use for chart creation.

```php
<?php
//testserver.php
//example for associative array 
$dataArray=array( 
					array('date'=>'2013-10-20', 'product'=>'Spam', 'category'=>'canned food', 'customer'=>3, 'quantity'=>10, 'revenue'=>100),
		  			array('date'=>'2013-10-21', 'product'=>'Spam', 'category'=>'canned food', 'customer'=>5, 'quantity'=>20, 'revenue'=>180),
		  			array('date'=>'2013-10-22', 'product'=>'Spam', 'category'=>'canned food', 'customer'=>2, 'quantity'=>15, 'revenue'=>160),
		  			array('date'=>'2013-10-23', 'product'=>'Spam', 'category'=>'canned food', 'customer'=>5, 'quantity'=>18, 'revenue'=>180),
		  			array('date'=>'2013-10-24', 'product'=>'Spam', 'category'=>'canned food', 'customer'=>7, 'quantity'=>25, 'revenue'=>250),
		  			array('date'=>'2013-10-25', 'product'=>'Spam', 'category'=>'canned food', 'customer'=>4, 'quantity'=>22, 'revenue'=>210),
		  			
		  			array('date'=>'2013-10-20', 'product'=>'Bacon', 'category'=>'delicatessen', 'customer'=>6, 'quantity'=>13, 'revenue'=>70),
		  			array('date'=>'2013-10-21', 'product'=>'Bacon', 'category'=>'delicatessen', 'customer'=>2, 'quantity'=>12, 'revenue'=>70),
		  			array('date'=>'2013-10-22', 'product'=>'Bacon', 'category'=>'delicatessen', 'customer'=>5, 'quantity'=>10, 'revenue'=>60),
		  			array('date'=>'2013-10-23', 'product'=>'Bacon', 'category'=>'delicatessen', 'customer'=>6, 'quantity'=>14, 'revenue'=>70),
		  			array('date'=>'2013-10-24', 'product'=>'Bacon', 'category'=>'delicatessen', 'customer'=>3, 'quantity'=>15, 'revenue'=>80),
		  			array('date'=>'2013-10-25', 'product'=>'Bacon', 'category'=>'delicatessen', 'customer'=>4, 'quantity'=>18, 'revenue'=>100),
		  			
		  			array('date'=>'2013-10-21', 'product'=>'Sausage', 'category'=>'delicatessen','customer'=>4,  'quantity'=>8, 'revenue'=>20),
		  			array('date'=>'2013-10-22', 'product'=>'Sausage', 'category'=>'delicatessen', 'customer'=>3, 'quantity'=>5, 'revenue'=>16),
		  			array('date'=>'2013-10-24', 'product'=>'Sausage', 'category'=>'delicatessen', 'customer'=>2, 'quantity'=>8, 'revenue'=>20),
		  			
		  			array('date'=>'2013-10-20', 'product'=>'Tuna', 'category'=>'canned food', 'customer'=>6, 'quantity'=>12, 'revenue'=>80),
		  			array('date'=>'2013-10-21', 'product'=>'Tuna', 'category'=>'canned food','customer'=>8,  'quantity'=>13, 'revenue'=>100),
		  			array('date'=>'2013-10-22', 'product'=>'Tuna', 'category'=>'canned food', 'customer'=>2, 'quantity'=>14, 'revenue'=>110),
		  			array('date'=>'2013-10-23', 'product'=>'Tuna', 'category'=>'canned food', 'customer'=>4, 'quantity'=>15, 'revenue'=>110),
		  			array('date'=>'2013-10-24', 'product'=>'Tuna', 'category'=>'canned food', 'customer'=>2, 'quantity'=>16, 'revenue'=>150),
		  			array('date'=>'2013-10-25', 'product'=>'Tuna', 'category'=>'canned food', 'customer'=>5, 'quantity'=>19, 'revenue'=>180)
);	
     
echo json_encode($dataArray);
?>

```


USAGE EXAMPLES:
=================================================
```html
<html>

<body>

<div id='container1'></div> <!-- chart will be created by calling the name eg: $('#container').drawchart()-->
<div id='container2'></div>
<div id='container3'></div>
<div id='container4'></div>
<div id='container5'></div>
<div id='container6'></div>

</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="http://code.highcharts.com/highcharts.js"></script>

<script src="http://code.highcharts.com/highcharts-more.js"></script> <!-- for bubble charts only-->

<script src='jsontohighchart.js'></script>

<!-- call chart drawing function -->
<script></script>

</html>
```
```javascript
   
   
//simple column chart   
$('#container1').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'category',  //category variable (x axis label), use date field name for time series 
		seriesname: 'product', //series name variable
		variable: 'revenue',  //data variable 
		label: 'Revenue ($)', //label for variable　(optional)
		
		stack: 'normal',  //'normal', 'percent' or  null
		type: 'column', //column, line, bar or an array of column/line combination ['column', 'line']
		title: 'column chart by category', 
		
		decimal : 0,   // decimal point
		
		datatable: 'yes'  // to display a data table below the chart
		
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


//daily data
$('#container2').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'date',  //category variable (x axis label), use date field name for time series 
		seriesname: 'product', //series name variable
		variable: ['quantity','revenue'],  //data variable 
		label: ['Sold Qty','Revenue($)'],

		stack: 'normal',  //'normal', 'percent' or  null
		type: ['column', 'line'],
		title: 'time series', 
		decimal : 0,   // decimal point
		
		ymin: [0,50],  //starting point for 1st and 2nd Y axis
		
		xaxistype: 'datetime',  //datetime, category
		interval: 'daily',   //for time series chart  only daily is available now
		mindate: '2013-10-20', //yyyy-mm-dd
		maxdate: '2013-10-25',
		
		
});

//pie chart
$('#container3').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'category',  //category variable (x axis label), use date field name for time series 
		variable: 'revenue',  //data variable 
		
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

//scatter chart
$('#container4').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'product',  
		variable: ['quantity', 'revenue'],  //data variable ,  x, y
		label: ['Sold Qty','Revenue($)'],
		
		type: 'scatter',
		title: 'scatter chart', 
		decimal :  0,  // decimal point
		
		ymin: 0,  //min for first variable
		  // to display data table
		
});

//scattered chart with size indication of z
$('#container5').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'product',  //category variable (x axis label)
		variable: ['quantity', 'revenue', 'customer'],  //data variable  x, y, z
		
		type: 'scatter',
		title: 'Scatter bubble chart', 
		decimal :  0  
		
});


//bubble chart , require highchart-more.js
$('#container6').drawchart({
		URL: 'testserver.php', // server that return JSON
		
		category: 'product',  //category variable (x axis label)
		variable: ['quantity', 'revenue', 'customer'],  //data variable  x, y, z
		
		type: 'bubble',
		title: 'bubble chart'
});
```
