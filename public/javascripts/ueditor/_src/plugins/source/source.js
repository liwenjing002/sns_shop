///import core
///import plugins/serialize/serialize.js
///import plugins/undo/undo.js
///commands 查看源码
(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd;

    function SourceFormater(config){
        config = config || {};
        this.indentChar = config.indentChar || '    ';
        this.breakChar = config.breakChar || '\n';
        this.selfClosingEnd = config.selfClosingEnd || ' />';
    }
    var unhtml1 = function (){
        var map = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
        function rep( m ){ return map[m]; }
        return function ( str ) {
            str = str + '';
            return str ? str.replace( /[<>"']/g, rep ) : '';
        };
    }();
    
    function printAttrs(attrs){
        var buff = [];
        for (var k in attrs) {
            buff.push(k + '="' + unhtml1(attrs[k]) + '"');
        }
        return buff.join(' ');
    }
    SourceFormater.prototype = {
        format: function (html){
            var node = baidu.editor.serialize.parseHTML(html);
            this.buff = [];
            this.indents = '';
            this.indenting = 1;
            this.visitNode(node);
            return this.buff.join('');
        },
        visitNode: function (node){
            if (node.type == 'fragment') {
                this.visitChildren(node.children);
            } else if (node.type == 'element') {
                var selfClosing = dtd.$empty[node.tag];
                this.visitTag(node.tag, node.attributes, selfClosing);

                this.visitChildren(node.children);

                if (!selfClosing) {
                    this.visitEndTag(node.tag);
                }
            } else if (node.type == 'comment') {
                this.visitComment(node.data);
            } else {
                this.visitText(node.data,dtd.$notTransContent[node.parent.tag]);
            }
        },
        visitChildren: function (children){
            for (var i=0; i<children.length; i++) {
                this.visitNode(children[i]);
            }
        },
        visitTag: function (tag, attrs, selfClosing){
            if (this.indenting) {
                this.indent();
            } else if (!dtd.$inline[tag] && tag != 'a') { // todo: 去掉a, 因为dtd的inline里面没有a
                this.newline();
                this.indent();
            }
            this.buff.push('<', tag);
            var attrPart = printAttrs(attrs);
            if (attrPart) {
                this.buff.push(' ', attrPart);
            }
            if (selfClosing) {
                this.buff.push(this.selfClosingEnd);
                if (tag == 'br') {
                    this.newline();
                }
            } else {
                this.buff.push('>');
                this.indents += this.indentChar;
            }
            if (!dtd.$inline[tag]) {
                this.newline();
            }
        },
        indent: function (){
            this.buff.push(this.indents);
            this.indenting = 0;
        },
        newline: function (){
            this.buff.push(this.breakChar);
            this.indenting = 1;
        },
        visitEndTag: function (tag){
            
            this.indents = this.indents.slice(0, -this.indentChar.length);
            if (this.indenting) {
                this.indent();
            } else if (!dtd.$inline[tag]) {
                this.newline();
                this.indent();
            }
            this.buff.push('</', tag, '>');
        },
        visitText: function (text,notTrans){
            if (this.indenting) {
                this.indent();
            }
      
            if(!notTrans){
                 text = text.replace(/&nbsp;/g, ' ').replace(/[ ][ ]+/g, function (m){
                    return new Array(m.length + 1).join('&nbsp;');
                }).replace(/(?:^ )|(?: $)/g, '&nbsp;');
            }
            
            this.buff.push(text);

        },
        visitComment: function (text){
            if (this.indenting) {
                this.indent();
            }
            this.buff.push('<!--', text, '-->');
        }
    };

    var sourceEditors = {
        textarea: function (editor, holder){
            var textarea = holder.ownerDocument.createElement('textarea');
            textarea.style.cssText = 'position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;';
            // todo: IE下只有onresize属性可用... 很纠结
            if (baidu.editor.browser.ie && baidu.editor.browser.version < 8) {
                textarea.style.width = holder.offsetWidth + 'px';
                textarea.style.height = holder.offsetHeight + 'px';
                holder.onresize = function (){
                    textarea.style.width = holder.offsetWidth + 'px';
                    textarea.style.height = holder.offsetHeight + 'px';
                };
            }
            holder.appendChild(textarea);
            return {
                setContent: function (content){
                    textarea.value = content;
                },
                getContent: function (){
                    return textarea.value;
                },
                select: function (){
                    var range;
                    if (baidu.editor.browser.ie) {
                        range = textarea.createTextRange();
                        range.collapse(true);
                        range.select();
                    } else {
                        //todo: chrome下无法设置焦点
                        textarea.setSelectionRange(0, 0);
                        textarea.focus();
                    }
                },
                dispose: function (){
                    holder.removeChild(textarea);
                    // todo
                    holder.onresize = null;
                    textarea = null;
                    holder = null;
                }
            };
        },
        codemirror: function (editor, holder){
            var options = {
                mode: "text/html",
                tabMode: "indent",
                lineNumbers: true
            };
            var codeEditor = window.CodeMirror(holder, options);
            var dom = codeEditor.getWrapperElement();
            dom.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';
            codeEditor.getScrollerElement().style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;';
            codeEditor.refresh();
            return {
                setContent: function (content){
                    codeEditor.setValue(content);
                },
                getContent: function (){
                    return codeEditor.getValue();
                },
                select: function (){
                    codeEditor.focus();
                },
                dispose: function (){
                    holder.removeChild(dom);
                    dom = null;
                    codeEditor = null;
                }
            };
        }
    };

    baidu.editor.plugins['source'] = function (){
        var editor = this,utils = baidu.editor.utils;
        editor.initPlugins(['serialize']);

        var formatter = new SourceFormater(editor.options.source);
        var sourceMode = false;
        var sourceEditor;

        function createSourceEditor(holder){
            var useCodeMirror = editor.options.sourceEditor == 'codemirror' && window.CodeMirror;
            return sourceEditors[useCodeMirror ? 'codemirror' : 'textarea'](editor, holder);
        }

        var bakCssText;
        editor.commands['source'] = {
            execCommand: function (){
                sourceMode = !sourceMode;
                if (sourceMode) {
                    editor.undoManger && editor.undoManger.save();
                    this.currentSelectedArr && domUtils.clearSelectedArr(this.currentSelectedArr);
                    if(browser.gecko)
                        editor.body.contentEditable = false;
                    
                    bakCssText = editor.iframe.style.cssText;
                    editor.iframe.style.cssText += 'position:absolute;left:-32768px;top:-32768px;';

                    

                    var content = formatter.format(editor.hasContents() ? editor.getContent() : '');
                    sourceEditor = createSourceEditor(editor.iframe.parentNode);

                    sourceEditor.setContent(content);
                    setTimeout(function (){
                        sourceEditor.select();
                    });
                } else {
                    
                    editor.iframe.style.cssText = bakCssText;
                    
                    editor.setContent(sourceEditor.getContent().replace(new RegExp(formatter.breakChar + '?(' + formatter.indentChar + '){0,}<','g'),'<') || '<p>' + (browser.ie ? '' : '<br/>')+'</p>');
                    sourceEditor.dispose();
                    sourceEditor = null;
                    setTimeout(function(){
                        
                        var first = editor.body.firstChild;
                        //trace:1106 都删除空了，下边会报错，所以补充一个p占位
                        if(!first){
                            editor.body.innerHTML = '<p>'+(browser.ie?'':'<br/>')+'</p>';
                            first = editor.body.firstChild;
                        }
                        //要在ifm为显示时ff才能取到selection,否则报错
                        editor.undoManger && editor.undoManger.save();

                        while(first && first.firstChild){

                            first = first.firstChild;
                        }
                        var range = editor.selection.getRange();
                        if(first.nodeType == 3 || baidu.editor.dom.dtd.$empty[first.tagName]){
                            range.setStartBefore(first)
                        }else{
                            range.setStart(first,0);
                        }

                        if(baidu.editor.browser.gecko){

                            var input = document.createElement('input');
                            input.style.cssText = 'position:absolute;left:0;top:-32768px';

                            document.body.appendChild(input);

                            editor.body.contentEditable = false;
                            setTimeout(function(){
                                domUtils.setViewportOffset(input, { left: -32768, top: 0 });
                                input.focus();
                                setTimeout(function(){
                                    editor.body.contentEditable = true;
                                    range.setCursor(false,true);
                                    baidu.editor.dom.domUtils.remove(input)
                                })

                            })
                        }else{
                            range.setCursor(false,true);
                        }

                    })
                }
                this.fireEvent('sourcemodechanged', sourceMode);
            },
            queryCommandState: function (){
                return sourceMode|0;
            }
        };
        var oldQueryCommandState = editor.queryCommandState;
        editor.queryCommandState = function (cmdName){
            cmdName = cmdName.toLowerCase();
            if (sourceMode) {
                return cmdName == 'source' ? 1 : -1;
            }
            return oldQueryCommandState.apply(this, arguments);
        };
        //解决在源码模式下getContent不能得到最新的内容问题
        var oldGetContent = editor.getContent;
        editor.getContent = function (){

            if(sourceMode && sourceEditor ){
                var html = sourceEditor.getContent();
                if (this.serialize) {
                    var node = this.serialize.parseHTML(html);
                    node = this.serialize.filter(node);
                    html = this.serialize.toHTML(node);
                }
                return html;
            }else{
                return oldGetContent.apply(this, arguments)
            }
        };
        editor.addListener("ready",function(){
            if(editor.options.sourceEditor == "codemirror"){
                var jsobj = {
                    src : editor.options.UEDITOR_HOME_URL+"third-party/codemirror2.15/codemirror.js",
                    tag : "script",
                    type : "text/javascript",
                    defer : "defer"
                };
                var cssobj = {
                    tag : "link",
                    rel : "stylesheet",
                    type : "text/css",
                    href : editor.options.UEDITOR_HOME_URL+"third-party/codemirror2.15/codemirror.css"
                }
                utils.loadFile(document,jsobj);
                utils.loadFile(document,cssobj);
            }
        });
    };

})();