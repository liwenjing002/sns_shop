<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <title></title>
	<style type="text/css">
	div{
	    width:80%;height:260px;overflow:auto;position:absolute;
	}
	</style>
</head>
<body>
<div>
<?php
    $editor = $_REQUEST["editorcontent"];
    echo "服务器端得到的编辑器的内容为：$editor";
?>
</div>
</body>
</html>