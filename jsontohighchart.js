
///////////////////////////////////////////////
//require  highchart 3.x/4.x

/////////////////////////////////
var testData;
(function ( $ ) {
 
    $.fn.drawchart = function( options ) {


		var settings = $.extend({
            // These are the defaults.
            decimal: 0
        }, options );


		var chartContainer = this;
 
		if(typeof options['HCoptions'] == 'undefined') options['HCoptions'] = {};

		if(!$.isArray(options['variable'])){
			options['variable'] = options['variable'].split(','); //convert to an array for double axis purpose
		}

		if(typeof options['label'] == 'undefined') options['label'] = [];
		if(!$.isArray(options['label'])){
			options['label'] = String(options['label']).split(','); //convert to an array for double axis purpose
		}


		options['type']= (typeof options['type'] == "undefined")? 'line': options['type'];
		if(!$.isArray(options['type'])){
			options['type'] =  options['type'].split(','); //convert to an array for double axis purpose
		}

		var variableCount = options['variable'].length;

		if(variableCount >1  && options['type'][0]!='scatter' && options['type'][0]!='pie'){
			//add variable name to tooltip if more than 1 variable, not applicable to pie chart
			if(typeof options['HCoptions']['tooltip'] == 'undefined') options['HCoptions']['tooltip'] = {};
			options['HCoptions']['tooltip']['headerFormat']  = '<span style="font-size: 10px">{point.key} </span><br/>{series.yAxis.axisTitle.text}<br/>';
		}

		options['stack']= (typeof options['stack'] == "undefined")? null: options['stack'];


		//plot option for stacking
		if(options['stack']){
			if(!$.isArray(options['stack'])){
				options['stack'] = options['stack'].split(','); //convert to an array for double axis purpose
			}
			if(typeof options['HCoptions']['plotOptions'] == 'undefined') options['HCoptions']['plotOptions'] = {};
			$.each(options['type'], function(i, thisType){
				if(typeof options['HCoptions']['plotOptions'][thisType] == 'undefined') options['HCoptions']['plotOptions'][thisType] = {};
				if(options['stack'][i]) options['HCoptions']['plotOptions'][thisType]['stacking'] = options['stack'][i];
			});
		}



		$.getJSON(
			options.URL,
			function(callback){

				var thisConfig = {
					//default highchart options
					chart: {
						zoomType: 'x',
						type: options['type'][0]
					},
					title: {
						text: (typeof options['title'] == "undefined")? '': options['title']
					},
					legend: {
						maxHeight: 60, 
						enabled: true
					},
					xAxis: {

					},
					credits : { enabled:false}
				};
				
				thisConfig['yAxis'] = [];
				for(var x=0; x<options['variable'].length; x++){

					options['label'][x] = options['label'][x] || options['variable'][x];

					if( (options['type'][0] == 'scatter' || options['type'][0] == 'bubble') && x!=1 ) continue;
					//if(  options['type'][0] == 'bubble' && x!=1) continue;
					var thisAxis = {
								title: {
									text: options['label'][x]
								}
							};

					if(x>0 && options['type'][0] != 'scatter' && options['type'][0] != 'bubble'){
						thisAxis['opposite'] = true;
					}
					//if min y is specified
					if(typeof options['ymin'] !== 'undefined'){
						if(!$.isArray(options['ymin'])){
							options['ymin'] =  String(options['ymin']).split(','); //convert to an array for double axis purpose
						}
						if(typeof options['ymin'][x] !== 'undefined'){
							thisAxis['min'] = options['ymin'][x];
						}
					}
					thisConfig['yAxis'].push(thisAxis);
				}

				for (var prop in options['HCoptions']) {
					thisConfig[prop]= options['HCoptions'][prop];
				};

				var categoryList = [];
				var seriesData = {};
				var categoryObj = {}; //for pie chart
				var scatterObj = {}; //for scatterplot

				$.each(options['variable'], function(key, value){
						seriesData[value] = {};
				});

				
				$.each(callback,function(n,row){

					var thisCat = row[options['category']];
					
					if($.inArray(thisCat, categoryList)==-1){
						//create distinct list of category
						categoryList.push(thisCat);
					}
					
					if((options['type'][0]=='scatter' || options['type'][0]=='bubble') && variableCount >1){
						if(typeof scatterObj[thisCat] == "undefined"){
							scatterObj[thisCat] = [];
							if(options['type'][0]=='bubble'){
								//initialize for bubble chart
								scatterObj[thisCat] = {x:0, y:0, z:0};	
							}
						}
						var xData = parseFloat(row[options['variable'][0]],10);
						var yData = parseFloat(row[options['variable'][1]],10);

						if(typeof row[options['variable'][2]] !== 'undefined'){
							var zData = parseFloat(row[options['variable'][2]],10);
						}

						if(options['type'][0]=='bubble'){

							scatterObj[thisCat]['x'] += xData ;
							scatterObj[thisCat]['y'] += yData ;
							scatterObj[thisCat]['z'] += zData ;
						}else{
							xData =Math.round(xData * Math.pow(10, settings.decimal))/Math.pow(10, settings.decimal);
							yData =Math.round(yData * Math.pow(10, settings.decimal))/Math.pow(10, settings.decimal);
							if(typeof row[options['variable'][2]] !== 'undefined'){
								zData =Math.round(zData * Math.pow(10, settings.decimal))/Math.pow(10, settings.decimal);
								scatterObj[thisCat].push([xData, yData, zData]);
							}else{
								scatterObj[thisCat].push([xData, yData]);
							}
						}
					}	
					
					$.each(options['variable'], function(key, value){
						//if series is not specified use variable to name series
						var thisSeries = row[options['seriesname']] || value;
							if(typeof categoryObj[value] == "undefined"){
								categoryObj[value] = {};
							}
							if(typeof categoryObj[value][thisCat] == "undefined"){
								categoryObj[value][thisCat] = 0;
							}
							categoryObj[value][thisCat] += parseFloat(row[value]);	

						//initialize with 0
						if(typeof seriesData[value][thisSeries] == "undefined"){
							seriesData[value][thisSeries] = {};
						}
						if(typeof seriesData[value][thisSeries][thisCat] == "undefined"){
							seriesData[value][thisSeries][thisCat] = 0;
						}
						
						//sum up
						seriesData[value][thisSeries][thisCat] += parseFloat(row[value]);

					});

				});
				
				//make series data 
				var chartData = [];

				var xaxistype = options['xaxistype'] || 'category'; 
				if(xaxistype == 'datetime'){

					var minDate = (typeof options['mindate'] == "undefined")? '' : new Date(options['mindate']);
					var maxDate = (typeof options['maxdate'] == "undefined")? '' : new Date(options['maxdate']);
					var interval = options['interval'] || ''; 

					switch(interval)
					{	
						case 'hourly':
							var timeStep =   1000 * 60 * 60 ; //1 hours
							break;
						case 'daily':
							var timeStep =   1000 * 60 * 60 * 24; //24 hours
							break;
						case 'weekly':
							var timeStep =   1000 * 60 * 60 * 24 * 7 ; //1 hours
							break;
						case 'monthly':
							var timeStep =   1000 * 60 * 60 * 24 * 30 ; //Monthly
							break;

						default: 
							var timeStep =   1000 * 60 * 60 * 24; //24 hours
					}


					if(minDate == '' || maxDate == ''){
						//if minimum date or maximum date is not specified
						var dateList = [];
						$.each(categoryList, function(n, dateStr){
							dateList.push(new Date(dateStr));

						});
						if(minDate == '') minDate = new Date(Math.min.apply(null, dateList));
						if(maxDate == '') maxDate = new Date(Math.max.apply(null, dateList));
					}

					var startTime = minDate.getTime(); //x axis start time stamp



					for(var key = 0; key< variableCount; key++){
						value = options['variable'][key];
						//loop date by day

						for (var dateCounter = startTime; dateCounter <= maxDate.getTime(); dateCounter = dateCounter + timeStep) {
							var date = new Date(dateCounter);
							var d  = date.getDate();
							var day = (d < 10) ? '0' + d : d;
							var m = date.getMonth() + 1;
							var month = (m < 10) ? '0' + m : m;
							var yy = date.getYear();
							var year = (yy < 1000) ? yy + 1900 : yy;
							var thisDate = year + '-' + month + '-' + day;
							$.each(seriesData[value], function(name, data){

								if(typeof seriesData[value][name]['dailydata'] == 'undefined') seriesData[value][name]['dailydata'] = [];
								if(typeof data[thisDate] == "undefined"){
									seriesData[value][name]['dailydata'].push(null);
								}else{
									var roundedData=Math.round(data[thisDate]* Math.pow(10, settings.decimal))/Math.pow(10, settings.decimal);
									seriesData[value][name]['dailydata'].push(roundedData);
								}
							});
						} //end of date loop



						$.each(seriesData[value], function(name, data){
							var thisSeries = {
										name: name,
										pointInterval: 24 * 3600 * 1000,
										pointStart: startTime,
										data:seriesData[value][name]['dailydata']
									};

							if(key>0){
								thisSeries['yAxis'] = key;
								thisSeries['type'] = options['type'][key] ||  options['type'][0];
							}

							chartData.push(thisSeries);

						});

					}//end of variable loop
					thisConfig['xAxis']['type']= xaxistype;

					//end of time series
				}else{
					//if not a time series
					if(options['type'][0]=='pie'){
						//if is a pie chart
						//series will be ignore, use only category
						var thisSeries = {name: options['variable'][0], data: []};
						$.each(categoryObj[options['variable'][0]], function(k,v){
							thisSeries.data.push([k, v]);
						});
						chartData.push(thisSeries);
						if(typeof thisConfig['plotOptions'] == 'undefined') thisConfig['plotOptions'] = {};
						thisConfig['plotOptions'] =  {
								pie: {
									allowPointSelect: true,
									cursor: 'pointer',
									dataLabels: {
										//enabled: true,
										//format: '<span style="color:{point.color}">{point.name}</span>: {point.percentage:.1f} %',
										formatter: function(){
											if(this.percentage>=1){
												//label if > 1%
												return '<span style="color:' + this.point.color + '">' + this.point.name + '</span>: ' + Highcharts.numberFormat(this.point.percentage,1) + '%';
											}
										}
									},
									showInLegend: true
								}
							};
						if(typeof thisConfig['tooltip'] == 'undefined') thisConfig['tooltip'] = {};	
						//thisConfig['tooltip']['headerFormat']  = '<span style="color:{series.color}">{point.key}</span><br/>';
						thisConfig['tooltip']['pointFormat']  =  options['label'][0] + ': <b>{point.y:,.' + settings.decimal + 'f}</b><br/>';

						var extLegend = {
										layout: 'vertical',
										align: 'right'
										//,maxHeight: '200'
									};
						$.extend(thisConfig['legend'], extLegend);
					}else if(options['type'][0]=='scatter' || options['type'][0]=='bubble'){	
						//scatter chart or bubble chart
						
						
						//change color alpha
						Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
							return Highcharts.Color(color).setOpacity(0.7).get('rgba');
						});


						$.each(scatterObj, function(k,v){
							if(options['type'][0]=='bubble'){
								var thisSeries= {name: k, data:[[]]};
								$.each(scatterObj[k],function(i, val){
									scatterObj[k][i]=Math.round(scatterObj[k][i] * Math.pow(10, settings.decimal))/Math.pow(10, settings.decimal);
									thisSeries['data'][0].push(scatterObj[k][i]);
								});

							}else{
								var thisSeries = {name: k, data: v};
							}
							chartData.push(thisSeries);	
						});

						if(typeof thisConfig['plotOptions'] == 'undefined') thisConfig['plotOptions'] = {};
							var scatterXaxis =  {
										 title: {
									enabled: true,
									text: options['label'][0]  //x axis first variable
								},
								startOnTick: true,
								endOnTick: true,
								showLastLabel: true

							};
							if(typeof options['ymin']!=='undefined'){
								if(typeof options['ymin'][0] !== 'undefined'){
									scatterXaxis['min'] = options['ymin'][0];
								}
							}
							$.extend(thisConfig['xAxis'], scatterXaxis);

						//format tooltip

							if(options['type'][0]=='scatter' && variableCount ==3){
								//convert to bubble if 3 variables
								options['type'][0]='bubble';
								thisConfig['chart']['type']='bubble';
							}

							if(typeof thisConfig['plotOptions'][options['type'][0]] == 'undefined') thisConfig['plotOptions'][options['type'][0]] = {};
							if(typeof thisConfig['plotOptions'][options['type'][0]]['tooltip'] == 'undefined') thisConfig['plotOptions'][options['type'][0]]['tooltip'] = {};



							//scatter tooltip
							if(options['type'][0]=='scatter'){
									var scatterTooltip = {  //headerFormat: '<b>{series.name}</b><br>',
													pointFormat: options['label'][0] + ': {point.x:,.' + settings.decimal + 'f} <br/>' + options['label'][1] + ': {point.y:,.' + settings.decimal + 'f}',
											
											
											};
							}else{
									thisConfig['credits'] = {
													enabled: true,
													text: 'bubble area: ' + options['label'][2]
												};

									var scatterTooltip = {  headerFormat: '<b>{series.name}</b><br>',
													pointFormat:  options['label'][0] + ': {point.x:,.' + settings.decimal + 'f} <br/>' + options['label'][1] + ': {point.y:,.' + settings.decimal + 'f}<br/>' + options['label'][2]
													+ ': {point.z:,.' + settings.decimal + 'f}',
											};
							}


							$.extend(thisConfig['plotOptions'][options['type'][0]]['tooltip'], scatterTooltip);

					}else{
						//default
						$.each(options['variable'], function(key, value){
							$.each(seriesData[value], function(name, data){
								//loop through seriesData
								var thisSeries = {name: name, data: []};
								if(key>0){
									thisSeries['yAxis'] = key;
									thisSeries['type'] = options['type'][key] ||  options['type'][0];
								}
								$.each(categoryList, function(n, catName){
									if(typeof data[catName] == "undefined"){
										thisSeries.data.push(null);
									}else{
										var roundedData=Math.round(data[catName]* Math.pow(10, settings.decimal))/Math.pow(10, settings.decimal);
										thisSeries.data.push(roundedData);
									}
								});
								chartData.push(thisSeries);
							});

						});
						thisConfig['xAxis']['categories'] = categoryList;
						thisConfig['xAxis']['type']= xaxistype;
					}
				}
				thisConfig['series'] = chartData;
				//display callback table below the chart container
				var dataTable = options['datatable'] || '';
				if(dataTable == 'yes') chartContainer.after(convertJsonToTable(callback));
				
				return  chartContainer.highcharts(thisConfig);
			}
		);
    };
}( jQuery ));

function convertJsonToTable(data){
	var tbl_head = '<thead><tr><th>' + Object.keys(data[0]).join('</th><th>') + '</th></tr></thead>';

	var tbl_body = "";
    $.each(data, function() {
        var tbl_row = "";
        $.each(this, function(k , v) {
            tbl_row += "<td>"+v+"</td>";
        })
        tbl_body += "<tr>"+tbl_row+"</tr>";                 
    })
	return '<table class="table highcharttable">' + tbl_head + '<tbody>' + tbl_body + '</tbody></table>';
}
