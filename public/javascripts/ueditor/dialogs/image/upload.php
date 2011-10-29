<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title></title>
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
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>

</head>
<body>
    <?php
        function filter($str) {
           $str=str_replace("&","&amp;",$str);
           $str=str_replace("'","&qpos;",$str);
           $str=str_replace("\"","&quot;",$str);
           $str=str_replace("<","&lt;",$str);
           $str=str_replace(">","&gt;",$str);
           return $str;
        }
        $url = filter($_GET['url']);
     ?>
    <form id="upImg" action="up.php" method="post" enctype="multipart/form-data" style="margin-top:5px;">
        <input type="hidden" id="path" name="path" />
        <input id="filename" name="filename" type="file"  onmouseover="document.getElementById('flag').className='btn1'" onmouseout="document.getElementById('flag').className='btn2'" />
		<input id="url" type="text" name="url" readonly="readonly" value="<?=$url ?>" />
		<input class="btn2" id="flag" name="flag" type="button" value="浏览…" onmouseover="this.className='btn1'" onmouseout="this.className='btn2'" onclick="sub()" />
    </form>
    <script type="text/javascript">

            var url = document.getElementById('url');
            url.onkeydown = function(evt){

                evt = event || evt;
                evt.preventDefault ?evt.preventDefault() : (evt.returnValue = false);
            }

        var form = document.getElementById("upImg");
        document.getElementById("filename").onchange = function(){

            //------------------------------------------
            //如果需要上传功能，请取消以下两行注释即可！！！！
            //alert("由于安全原因，本demo暂不提供图片上传服务！下载包中包含了支持php版上传功能的相关文件，修改后即可使用。");
            //return;
            //------------------------------------------


            document.getElementById('path').value = this.value;
            form.submit();
        }
		function sub(){
            var file = document.getElementById("filename");
            //file.click();
            if(file.click) file.click();
            else if(file.fireEvent) file.fireEvent('onclick');
            else if(document.createEvent){
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, true);
                file.dispatchEvent(evt);
            }
		}
    </script>
</body>
</html>