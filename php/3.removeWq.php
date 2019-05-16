<?php
	include 'public.php';
	
	$id = $_GET['id'];
	
	//4. 
	$sql = "DELETE FROM `wqtab` WHERE wid=$id";
	mysql_query($sql);
