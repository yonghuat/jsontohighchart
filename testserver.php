<?php

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
