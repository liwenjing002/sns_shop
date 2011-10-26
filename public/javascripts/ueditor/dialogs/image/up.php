<html><head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<style type="text/css">
    *{margin:0;padding:0}
        html,body{margin-top:-2px;}

      #filename{
            position:absolute;
            z-index:9999;
            left:150px;
			opacity:0;
			filter:alpha(opacity=0);
			width:50px;
			height:21px;
  		}
		#url{
			position:absolute;left:0;
			width:146px;height:21px;background: #FFF;border:1px solid #d7d7d7;padding: 0; margin-top:-1px;
		}
		#flag{
			position:absolute;left:150px;
		}

		.btn2 {
		border:0;
		background: url("../../themes/default/images/button-bg.gif") no-repeat;
		font-size:12px;
		height:23px;
		width:50px;
        text-align: center;
        cursor: pointer;
		}
		.btn1 {
		border:0;
		background: url("../../themes/default/images/button-bg.gif") 0 -27px no-repeat;
		font-size:12px;
		height:23px;
		width:50px;
        text-align: center;
        cursor: pointer;
		}
</style>
</head>
<body>
<form id="upImg" action="up.php" method="post" enctype="multipart/form-data" style="margin-top:5px;">
        <input id="filename" name="filename" type="file"  onmouseover="document.getElementById('flag').className='btn1'" onmouseout="document.getElementById('flag').className='btn2'" />
	</form>

<?php
    $config = array(
        "uploadPath"=>"uploadfiles/",   //保存路径
        "fileType"=>array(".jpg",".jpeg",".gif",".png",".bmp"),   //文件允许格式
        "fileSize"=>1000    //文件大小限制，单位KB
    );
    if(empty($_GET['submit'])){
        $path=$config['uploadPath']; 
		//print_r($_FILES["filename"]);

		if(!file_exists($path)){
			//检查是否有该文件夹，如果没有就创建，并给予最高权限
			mkdir("$path", 0700);
		}

		$current_type = strtolower(strrchr($_FILES["filename"]["name"], '.'));
		if(!in_array($current_type, $config['fileType'])){
			echo "<script type='text/javascript'>alert('只支持gif,jpg,bmp和png文件格式！')</script>";
			echo "<script type='text/javascript'>location.href='upload.php'</script>";
			exit;
		}

		$file_size = 1024 * $config['fileSize'];
		if( $_FILES["filename"]["size"] > $file_size ){
			echo "<script type='text/javascript'>alert('图片大小超出".$config['fileSize']."KB限制，请重新选择！')</script>";
			echo "<script type='text/javascript'>location.href='upload.php'</script>";
			exit;
		}

		//构造文件名并标记成功上传
		if($_FILES["filename"]["name"]){
			$tmp_file=$_FILES["filename"]["name"];
			$file = $path.time().strrchr($tmp_file,'.');
			$flag=1;
		}

		if($flag){
			$result=move_uploaded_file($_FILES["filename"]["tmp_name"],$file);
		}
		if($result){
			//echo "上传成功";
			echo "<script type='text/javascript'>parent.reloadImg('$file');</script>";
			echo "<script type='text/javascript'>location.href='upload.php?url=".$_POST['path']."'</script>";
		}

	}
?>

</body></html>