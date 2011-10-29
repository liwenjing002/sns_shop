说明:
版本:1.1.6
网址:ueditor.baidu.com
qq群:132714357(满)  166914291(满)  177166073(满)  177890741

_examples目录里直接打开index.html即可看到效果（请将项目部署到服务器上，避免对话框图片无法加载等跨域问题）
_src为所有源码，部署时可删除，二次开发使用
dialogs为弹出对话框所引用的页面
themes为样式和图片

editor_ui_all.js 包含全部功能的js文件
editor_ui_all_min.js 包含全部功能的压缩文件，即editor_ui_all.js的压缩版
editor_config.js 项目的配置文件, 主要用于设置ui部分的参数，如果要使用ui，这个脚本需要在其他脚本之前引用

将目录:dialogs,themes和文件:editor_config.js,editor_ui_all.js放到项目中的同级目录下

示例:
<html>
<head>
    <script type="text/javascript" charset="utf-8" src="editor_config.js"></script>   //引入配置文件
    <script type="text/javascript" charset="utf-8" src="editor_ui_all.js"></script>   //引入核心文件
    <link rel="stylesheet" type="text/css" href="themes/default/ueditor.css"/>        //引入样式
</head>
<body>
    <div id="editor"></div>
    <script type="text/javascript">
        var editor = new baidu.editor.ui.Editor();
        editor.render('editor');
    </script>
</body>
</html>

