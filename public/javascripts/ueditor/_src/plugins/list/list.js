///import core
///commands 有序列表,无序列表
/**
 * 有序列表
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     insertorderlist插入有序列表
 * @param   {String}   style               值为：decimal,lower-alpha,lower-roman,upper-alpha,upper-roman
 * @author zhanyi
 */
/**
 * 无序链接
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     insertunorderlist插入无序列表
 * * @param   {String}   style            值为：circle,disc,square
 * @author zhanyi
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
      
        dtd = baidu.editor.dom.dtd,
       
        notExchange = {
            'TD':1,
            'PRE':1,
            'BLOCKQUOTE':1
        };
    baidu.editor.plugins['list'] = function(){
        var me = this;
        me.addListener('keydown', function(type, evt) {
            function preventAndSave(){
                evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false)
                me.undoManger && me.undoManger.save()
            }
            
            var keyCode = evt.keyCode || evt.which;
            if (keyCode == 13) {//回车
                
                var range = me.selection.getRange(),
                    start = domUtils.findParentByTagName(range.startContainer, ['ol','ul'], true,function(node){return node.tagName == 'TABLE'}),
                    end = domUtils.findParentByTagName(range.endContainer, ['ol','ul'], true,function(node){return node.tagName == 'TABLE'});
                if (start && end && start === end) {
                    
                    if(!range.collapsed){
                        start = domUtils.findParentByTagName(range.startContainer, 'li', true);
                        end = domUtils.findParentByTagName(range.endContainer, 'li', true);
                        if(start && end && start === end){
                            range.deleteContents();
                            li =  domUtils.findParentByTagName(range.startContainer, 'li', true);
                            if(li && domUtils.isEmptyBlock(li)){
                               
                                pre = li.previousSibling;
                                next = li.nextSibling;
                                p = me.document.createElement('p');
                              
                                domUtils.fillNode(me.document,p);
                                parentList = li.parentNode;
                                if(pre && next){
                                    range.setStart(next,0).collapse(true).select(true);
                                    domUtils.remove(li);

                                }else{
                                    if(!pre && !next || !pre){

                                        parentList.parentNode.insertBefore(p,parentList);



                                    } else{
                                        li.parentNode.parentNode.insertBefore(p,parentList.nextSibling);
                                    }
                                    domUtils.remove(li);
                                    if(!parentList.firstChild){
                                        domUtils.remove(parentList)
                                    }
                                    range.setStart(p,0).setCursor();


                                }
                                preventAndSave();
                                return;

                            }
                        }else{
                            var tmpRange = range.cloneRange(),
                                bk = tmpRange.collapse(false).createBookmark();

                            range.deleteContents();
                            tmpRange.moveToBookmark(bk);
                            var li = domUtils.findParentByTagName(tmpRange.startContainer, 'li', true),
                                pre = li.previousSibling,
                                next = li.nextSibling;

                            if (pre ) {
                                li = pre;
                                if(pre.firstChild && domUtils.isBlockElm(pre.firstChild)){
                                    pre = pre.firstChild;

                                }
                                if(domUtils.isEmptyNode(pre))
                                    domUtils.remove(li);
                            }
                            if (next ) {
                                li = next;
                                if(next.firstChild && domUtils.isBlockElm(next.firstChild)){
                                    next = next.firstChild;
                                }
                                if(domUtils.isEmptyNode(next))
                                    domUtils.remove(li);
                            }
                            tmpRange.select();
                            preventAndSave();
                            return;
                        }
                    }


                    li = domUtils.findParentByTagName(range.startContainer, 'li', true);

                    if (li) {
                        if(domUtils.isEmptyBlock(li)){
                            bk = range.createBookmark();
                            var parentList = li.parentNode;
                            if(li!==parentList.lastChild){
                                domUtils.breakParent(li,parentList);
                            }else{

                                parentList.parentNode.insertBefore(li,parentList.nextSibling)
                                if(domUtils.isEmptyNode(parentList)){
                                    domUtils.remove(parentList);
                                }
                            }
                            //嵌套不处理
                            if(!dtd.$list[li.parentNode.tagName]){
                                if(!domUtils.isBlockElm(li.firstChild)){
                                    p = me.document.createElement('p');
                                    li.parentNode.insertBefore(p,li);
                                    while(li.firstChild){
                                        p.appendChild(li.firstChild);
                                    }
                                    domUtils.remove(li);
                                }else{
                                    domUtils.remove(li,true);
                                }
                            }
                            range.moveToBookmark(bk).select();


                        }else{
//                             var first = domUtils.isBlockElm(li.firstChild) ? li.firstChild : li;
                            var first = li.firstChild;
                            if(!first || !domUtils.isBlockElm(first)){
                                 var p = me.document.createElement('p');
                                
                                !li.firstChild && domUtils.fillNode(me.document,p);
                                while(li.firstChild){

                                    p.appendChild(li.firstChild);
                                }
                                li.appendChild(p);
                                first = p;
                            }

//                            if (domUtils.isEmptyNode(first)) {
//                                var list = li.parentNode;
//                                if (li.nextSibling) {
//                                    list = li.parentNode;
//                                    domUtils.breakParent(li, list);
//                                    list = li.previousSibling;
//                                }
//                                var p = me.document.createElement('p');
//                                p.innerHTML = browser.ie ? '' : '<br/>';
//                                domUtils.remove(li);
//                                list.parentNode.insertBefore(p, list.nextSibling);
//                                range.setStart(p, 0).setCursor();
//
//                            } else {


                                var span = me.document.createElement('span');

                                range.insertNode(span);
                                domUtils.breakParent(span, li);

                                var nextLi = span.nextSibling;
                                first = nextLi.firstChild;

                                if (!first) {
                                    p = me.document.createElement('p');
                                    
                                    domUtils.fillNode(me.document,p);
                                    nextLi.appendChild(p);
                                    first = p;
                                }
                                if (domUtils.isEmptyNode(first)) {
                                    
                                    domUtils.fillNode(me.document,first);
                                }

                                range.setStart(first, 0).collapse(true).shrinkBoundary().select();
                                domUtils.remove(span);
                                pre = nextLi.previousSibling;
                                if(pre && domUtils.isEmptyBlock(pre)){
                                    pre.innerHTML = '<p></p>';
                                    domUtils.fillNode(me.document,pre.firstChild);
                                }

                            }
//                        }

                        preventAndSave();
                    }


                }
            }
        });
        baidu.editor.commands['insertorderedlist'] =
        baidu.editor.commands['insertunorderedlist'] = {
            execCommand : function( command, style ) {
                if(!style){
                    style = command.toLowerCase() == 'insertorderedlist' ? 'decimal' : 'disc'
                }
                var me = this,
                    range = this.selection.getRange(),
                    filterFn = function( node ) {
                        return   node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace( node )
                    },
                    tag =  command.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul',
                    frag = me.document.createDocumentFragment();
                range.shrinkBoundary().adjustmentBoundary();
                var bko = range.createBookmark(true),
                    start = domUtils.findParentByTagName(me.document.getElementById(bko.start),'li'),
                    modifyStart = 0,
                    end = domUtils.findParentByTagName(me.document.getElementById(bko.end),'li'),
                    modifyEnd = 0,
                    startParent,endParent,
                    list,tmp;

                if(start || end){
                    start && (startParent = start.parentNode);
                    if(!bko.end){
                        end = start;
                    }
                    end && (endParent = end.parentNode);

                    if(startParent === endParent){
                        while(start !== end){
                            tmp = start;
                            start = start.nextSibling;
                            if(!domUtils.isBlockElm(tmp.firstChild)){
                                var p = me.document.createElement('p');
                                while(tmp.firstChild){
                                    p.appendChild(tmp.firstChild)
                                }
                                tmp.appendChild(p);
                            }
                            frag.appendChild(tmp);
                        }
                        tmp = me.document.createElement('span');
                        startParent.insertBefore(tmp,end);
                        if(!domUtils.isBlockElm(end.firstChild)){
                            p = me.document.createElement('p');
                            while(end.firstChild){
                                p.appendChild(end.firstChild)
                            }
                            end.appendChild(p);
                        }
                        frag.appendChild(end);
                        domUtils.breakParent(tmp,startParent);
                        if(domUtils.isEmptyNode(tmp.previousSibling)){
                            domUtils.remove(tmp.previousSibling)
                        }
                        if(domUtils.isEmptyNode(tmp.nextSibling)){
                            domUtils.remove(tmp.nextSibling)
                        }
                        if(startParent.tagName.toLowerCase() == tag && domUtils.getComputedStyle( startParent, 'list-style-type' ) == style){
                            for(var i=0,ci;ci=frag.childNodes[i++];){
                                domUtils.remove(ci,true);
                            }
                            tmp.parentNode.insertBefore(frag,tmp);
                        }else{
                            list = me.document.createElement(tag);
                            domUtils.setStyle(list,'list-style-type',style);
                            list.appendChild(frag);
                            tmp.parentNode.insertBefore(list,tmp);
                        }

                        domUtils.remove(tmp);
                        range.moveToBookmark(bko).select();
                        return;
                    }
                    //开始
                    if(start){
                        while(start){
                            tmp = start.nextSibling;
                            var tmpfrag = me.document.createDocumentFragment(),
                                hasBlock = 0;
                            while(start.firstChild){
                                if(domUtils.isBlockElm(start.firstChild))
                                    hasBlock = 1;
                                tmpfrag.appendChild(start.firstChild);
                            }
                            if(!hasBlock){
                                var tmpP = me.document.createElement('p');
                                tmpP.appendChild(tmpfrag);
                                frag.appendChild(tmpP)
                            }else{
                                frag.appendChild(tmpfrag);
                            }
                            domUtils.remove(start);
                            start = tmp;
                        }
                        startParent.parentNode.insertBefore(frag,startParent.nextSibling);
                        if(domUtils.isEmptyNode(startParent)){
                            range.setStartBefore(startParent);
                            domUtils.remove(startParent)
                        }else{
                           range.setStartAfter(startParent);
                        }


                         modifyStart = 1;
                    }

                    if(end){
                        //结束
                        start = endParent.firstChild;
                        while(start !== end){
                           tmp = start.nextSibling;

                           tmpfrag = me.document.createDocumentFragment(),
                           hasBlock = 0;
                            while(start.firstChild){
                                if(domUtils.isBlockElm(start.firstChild))
                                    hasBlock = 1;
                                tmpfrag.appendChild(start.firstChild);
                            }
                            if(!hasBlock){
                                tmpP = me.document.createElement('p');
                                tmpP.appendChild(tmpfrag);
                                frag.appendChild(tmpP)
                            }else{
                                frag.appendChild(tmpfrag);
                            }
                            domUtils.remove(start);
                            start = tmp;
                        }
                        frag.appendChild(end.firstChild);
                        domUtils.remove(end);
                        endParent.parentNode.insertBefore(frag,endParent);
                        range.setEndBefore(endParent);
                        if(domUtils.isEmptyNode(endParent)){
                            domUtils.remove(endParent)
                        }

                         modifyEnd = 1;
                    }



                }

                if(!modifyStart){
                    range.setStartBefore(me.document.getElementById(bko.start))
                }
                if(bko.end && !modifyEnd){
                    range.setEndAfter(me.document.getElementById(bko.end))
                }
                range.enlarge(true,function(node){return notExchange[node.tagName] });

                frag = me.document.createDocumentFragment();

                var bk = range.createBookmark(),
                    current = domUtils.getNextDomNode( bk.start, false, filterFn ),
                    tmpRange = range.cloneRange(),
                    tmpNode,
                    block = domUtils.isBlockElm;

                while ( current && current !== bk.end && (domUtils.getPosition( current, bk.end ) & domUtils.POSITION_PRECEDING)  ) {

                    if ( current.nodeType == 3 || dtd.li[current.tagName] ) {
                        if(current.nodeType == 1 && dtd.$list[current.tagName]){
                            while(current.firstChild){
                                frag.appendChild(current.firstChild)
                            }
                            tmpNode = domUtils.getNextDomNode( current, false, filterFn );
                            domUtils.remove(current);
                            current = tmpNode;
                            continue;

                        }
                        tmpNode = current;
                        tmpRange.setStartBefore( current );

                        while ( current && current !== bk.end && (!block(current) || domUtils.isBookmarkNode(current) )) {
                            tmpNode = current;
                            current = domUtils.getNextDomNode( current, false, null, function( node ) {
                                return !notExchange[node.tagName]
                            } );
                        }

                        if(current && block(current)){
                            tmp = domUtils.getNextDomNode( tmpNode, false, filterFn );
                            if(tmp && domUtils.isBookmarkNode(tmp)){
                                current = domUtils.getNextDomNode( tmp, false, filterFn );
                                tmpNode = tmp;
                            }
                        }
                        tmpRange.setEndAfter( tmpNode );

                        current = domUtils.getNextDomNode( tmpNode, false, filterFn );

                        var li = range.document.createElement( 'li' );

                        li.appendChild(tmpRange.extractContents());
                        frag.appendChild(li);



                    } else {

                        current = domUtils.getNextDomNode( current, true, filterFn );
                    }
                }
                range.moveToBookmark(bk).collapse(true);
                list = me.document.createElement(tag);
                domUtils.setStyle(list,'list-style-type',style);
                list.appendChild(frag);
                range.insertNode(list).moveToBookmark(bko).select();

            },
            queryCommandState : function( command ) {
                if(this.highlight){
                       return -1;
                   }
                var startNode = this.selection.getStart();

                return domUtils.findParentByTagName( startNode, command.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul', true ) ? 1 : 0;
            },
            queryCommandValue : function( command ) {
    
                var startNode = this.selection.getStart(),
                    node = domUtils.findParentByTagName( startNode, command.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul', true );

                return node ? domUtils.getComputedStyle( node, 'list-style-type' ) : null;
            }
        }
    }



})();
