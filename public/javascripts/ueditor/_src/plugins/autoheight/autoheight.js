///import core
///commands 当输入内容超过编辑器高度时，编辑器自动增高
/**
 * @description 自动伸展
 * @author zhanyi
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils;

    baidu.editor.plugins['autoheight'] = function() {
        var editor = this;
        //提供开关，就算加载也可以关闭
        editor.autoHeightEnabled = this.options.autoHeightEnabled;
        
        var timer;
        var bakScroll;
        var bakOverflow,
            span,tmpNode;
       
        editor.enableAutoHeight = function (){
            var iframe = editor.iframe,
                doc = editor.document;


            this.autoHeightEnabled = true;
            bakScroll = iframe.scroll;
            bakOverflow = doc.body.style.overflowY;
            iframe.scroll = 'no';
            doc.body.style.overflowY = 'hidden';
            timer = setInterval(function(){
                if (editor.queryCommandState('source') != 1) {
                        if(!span){
                            span = editor.document.createElement('span');
                            span.style.cssText = 'margin:0;padding:0;border:0;clear:both;display:block;';
                            span.innerHTML ='.';

                        }
                        tmpNode = span.cloneNode(true);
                        editor.body.appendChild(tmpNode);


                        editor.setHeight(Math.max(domUtils.getXY(tmpNode).y + tmpNode.offsetHeight,editor.options.minFrameHeight));
                        baidu.editor.dom.domUtils.remove(tmpNode)
                    }
            },50);
            
            editor.fireEvent('autoheightchanged', this.autoHeightEnabled);
        };
        editor.disableAutoHeight = function (){
            var iframe = editor.iframe,
                doc = editor.document;
            iframe.scroll = bakScroll;
            doc.body.style.overflowY = bakOverflow;
            clearInterval(timer);
            this.autoHeightEnabled = false;
            editor.fireEvent('autoheightchanged', this.autoHeightEnabled);
        };
        editor.addListener( 'ready', function() {
            
            if(this.autoHeightEnabled){
              
                editor.enableAutoHeight();
               
            }

        });
    }

})();
