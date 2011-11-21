///import editor.js
///import core/utils.js
///import core/browser.js
///import core/dom/dom.js
///import core/dom/dtd.js
/**
 * @class baidu.editor.dom.domUtils    dom工具类
 */
baidu.editor.dom.domUtils = baidu.editor.dom.domUtils || {};
(function() {
    var editor = baidu.editor,
        browser = editor.browser,
        dtd = editor.dom.dtd,
        utils = editor.utils,
        // for domUtils.remove
        orphanDiv;

    function fixColor(name, value) {
        if (/color/i.test(name) && /rgba?/.test(value)) {
            var array = value.split(",");
            if (array.length > 3)
                return "";
            value = "#";
            for (var i = 0, color; color = array[i++];) {
                color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                value += color.length == 1 ? "0" + color : color;
            }

            value = value.toUpperCase();
        }
        return  value;
    }

    //for getNextDomNode getPreviousDomNode
    function getDomNode(node, start, ltr, startFromChild, fn, guard) {
        var tmpNode = startFromChild && node[start],
            parent;

        !tmpNode && (tmpNode = node[ltr]);

        while (!tmpNode && (parent = (parent || node).parentNode)) {
            if (parent.tagName == 'BODY')
                return null;
            if (guard && !guard(parent))
                return null;
            tmpNode = parent[ltr];
        }

        if (tmpNode && fn && !fn(tmpNode)) {
            return  getDomNode(tmpNode, start, ltr, false, fn)
        }
        return tmpNode;
    }

    var attrFix = browser.ie && browser.version < 9 ? {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder"
    } : {
        tabindex: "tabIndex",
        readonly: "readOnly"
    };

    var domUtils = baidu.editor.dom.domUtils = {
        //节点常量
        NODE_ELEMENT : 1,
        NODE_DOCUMENT : 9,
        NODE_TEXT : 3,
        NODE_COMMENT : 8,
        NODE_DOCUMENT_FRAGMENT : 11,

        //位置关系
        POSITION_IDENTICAL : 0,
        POSITION_DISCONNECTED : 1,
        POSITION_FOLLOWING : 2,
        POSITION_PRECEDING : 4,
        POSITION_IS_CONTAINED : 8,
        POSITION_CONTAINS : 16,
        //ie6使用其他的会有一段空白出现
        fillChar : browser.ie && browser.version == '6' ? '\ufeff' : '\u200B',
        //-------------------------Node部分--------------------------------

        keys : {
            /*Backspace*/ 8:1, /*Delete*/ 46:1,
            /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
            37:1, 38:1, 39:1, 40:1,
            13:1 /*enter*/
        },
        /**
         * 获取两个节点的位置关系
         * @function
         * @param {Node} nodeA     节点A
         * @param {Node} nodeB     节点B
         * @returns {Number}       返回位置关系
         */
        getPosition : function (nodeA, nodeB) {
            // 如果两个节点是同一个节点
            if (nodeA === nodeB) {
                // domUtils.POSITION_IDENTICAL
                return 0;
            }
//            //chrome在nodeA,nodeB都不在树上时，会有问题
//            if (browser.gecko) {
//                return nodeA.compareDocumentPosition(nodeB);
//            }

            var node,
                parentsA = [nodeA],
                parentsB = [nodeB];


            node = nodeA;
            while (node = node.parentNode) {
                // 如果nodeB是nodeA的祖先节点
                if (node === nodeB) {
                    // domUtils.POSITION_IS_CONTAINED + domUtils.POSITION_FOLLOWING
                    return 10;
                }
                parentsA.push(node);

            }


            node = nodeB;
            while (node = node.parentNode) {
                // 如果nodeA是nodeB的祖先节点
                if (node === nodeA) {
                    // domUtils.POSITION_CONTAINS + domUtils.POSITION_PRECEDING
                    return 20;
                }
                parentsB.push(node);

            }

            parentsA.reverse();
            parentsB.reverse();

            if (parentsA[0] !== parentsB[0])
            // domUtils.POSITION_DISCONNECTED
                return 1;

            var i = -1;
            while (i++,parentsA[i] === parentsB[i]) ;
            nodeA = parentsA[i];
            nodeB = parentsB[i];

            while (nodeA = nodeA.nextSibling) {
                if (nodeA === nodeB) {
                    // domUtils.POSITION_PRECEDING
                    return 4
                }
            }
            // domUtils.POSITION_FOLLOWING
            return  2;
        },

        /**
         * 返回节点索引，zero-based
         * @function
         * @param {Node} node     节点
         * @returns {Number}      节点的索引
         */
        getNodeIndex : function (node) {
            var childNodes = node.parentNode.childNodes,
                i = 0;
            while (childNodes[i] !== node) i++;
            return i;
        },

//        /**
//         * 判断节点是否在树上
//         * @param node
//         */
//        inDoc: function (node, doc){
//            while (node = node.parentNode) {
//                if (node === doc) {
//                    return true;
//                }
//            }
//            return false;
//        },

        /**
         * 查找祖先节点
         * @function
         * @param {Node}     node        节点
         * @param {Function} tester      以函数为规律
         * @param {Boolean} includeSelf 包含自己
         * @returns {Node}      返回祖先节点
         */
        findParent : function (node, tester, includeSelf) {
            if (!this.isBody(node)) {
                node = includeSelf ? node : node.parentNode;
                while (node) {

                    if (!tester || tester(node) || this.isBody(node)) {

                        return tester && !tester(node) && this.isBody(node) ? null : node;
                    }
                    node = node.parentNode;

                }
            }

            return null;
        },
        /**
         * 查找祖先节点
         * @function
         * @param {Node}     node        节点
         * @param {String}   tagName      标签名称
         * @param {Boolean} includeSelf 包含自己
         * @returns {Node}      返回祖先节点
         */
        findParentByTagName : function(node, tagName, includeSelf,excludeFn) {
            if (node && node.nodeType && !this.isBody(node) && (node.nodeType == 1 || node.nodeType)) {
                tagName = !utils.isArray(tagName) ? [tagName] : tagName;
                node = node.nodeType == 3 || !includeSelf ? node.parentNode : node;
                while (node && node.tagName && node.nodeType != 9) {
                    if(excludeFn && excludeFn(node))
                        return null;
                    if (utils.indexOf(tagName, node.tagName.toLowerCase()) > -1)
                        return node;
                    node = node.parentNode;
                }
            }

            return null;
        },
        /**
         * 查找祖先节点集合
         * @param {Node} node               节点
         * @param {Function} tester         函数
         * @param {Boolean} includeSelf     是否从自身开始找
         * @param {Boolean} closerFirst
         * @returns {Array}     祖先节点集合
         */
        findParents: function (node, includeSelf, tester, closerFirst) {
            var parents = includeSelf && ( tester && tester(node) || !tester ) ? [node] : [];
            while (node = domUtils.findParent(node, tester)) {
                parents.push(node);
            }
            if (!closerFirst) {
                parents.reverse();
            }
            return parents;
        },

        /**
         * 往后插入节点
         * @function
         * @param  {Node}     node            基准节点
         * @param  {Node}     nodeToInsert    要插入的节点
         * @return {Node}     返回node
         */
        insertAfter : function (node, nodeToInsert) {
            return node.parentNode.insertBefore(nodeToInsert, node.nextSibling);
        },

        /**
         * 删除该节点
         * @function
         * @param {Node} node            要删除的节点
         * @param {Boolean} keepChildren 是否保留子节点不删除
         * @return {Node} 返回要删除的节点
         */
        remove :  function (node, keepChildren) {
            var parent = node.parentNode,
                child;
            if (parent) {
                if (keepChildren && node.hasChildNodes()) {
                    while (child = node.firstChild) {
                        parent.insertBefore(child, node);
                    }
                }
//                if ( browser.ie ) {
//                    if ( orphanDiv == null ) {
//                        orphanDiv = node.ownerDocument.createElement( 'div' );
//                    }
//                    orphanDiv.appendChild( node );
//                    orphanDiv.innerHTML = '';
//                } else {
//                    parent.removeChild( node );
//                }
                parent.removeChild(node);
            }
            return node;
        },

        /**
         * 取得node节点在dom树上的下一个节点
         * @function
         * @param {Node} node       节点
         * @param {Boolean} startFromChild 为true从子节点开始找
         * @param {Function} fn fn为真的节点
         * @return {Node}    返回下一个节点
         */
        getNextDomNode : function(node, startFromChild, filter, guard) {
            return getDomNode(node, 'firstChild', 'nextSibling', startFromChild, filter, guard);

        },

        /**
         * 取得node节点在dom树上的上一个节点
         * @param {Node} node
         * @param {Boolean} startFromChild 为true从子节点开始找
         * @param {Function} fn 找到fn为真的节点
         * @return {Node}    返回上一个节点
         */
        getPreviousDomNode : function(node, startFromChild, fn) {
            return getDomNode(node, 'lastChild', 'previousSibling', startFromChild, fn);

        },
        /**
         * 是bookmark节点
         * @param {Node} node        判断是否为书签节点
         * @return {Boolean}        返回是否为书签节点
         */
        isBookmarkNode : function(node) {
            return node.nodeType == 1 && node.id && /^_baidu_bookmark_/i.test(node.id);
        },
        /**
         * 获取节点所在window对象
         * @param {Node} node     节点
         * @return {window}    返回window对象
         */
        getWindow : function (node) {
            var doc = node.ownerDocument || node;
            return doc.defaultView || doc.parentWindow;
        },
        /**
         * 得到公共的祖先节点
         * @param   {Node}     nodeA      节点A
         * @param   {Node}     nodeB      节点B
         * @return {Node} nodeA和nodeB的公共节点
         */
        getCommonAncestor : function(nodeA, nodeB) {
            if (nodeA === nodeB)
                return nodeA;
            var parentsA = [nodeA] ,parentsB = [nodeB], parent = nodeA,
                i = -1;


            while (parent = parent.parentNode) {

                if (parent === nodeB)
                    return parent;
                parentsA.push(parent)
            }
            parent = nodeB;
            while (parent = parent.parentNode) {
                if (parent === nodeA)
                    return parent;
                parentsB.push(parent)
            }

            parentsA.reverse();
            parentsB.reverse();
            while (i++,parentsA[i] === parentsB[i]);
            return i == 0 ? null : parentsA[i - 1];

        },
        /**
         * 清除该节点左右空的inline节点
         * @function
         * @param {Node}     node
         * @param {Boolean} ingoreNext   默认为false清除右边为空的inline节点。true为不清除右边为空的inline节点
         * @param {Boolean} ingorePre    默认为false清除左边为空的inline节点。true为不清除左边为空的inline节点
         * @exmaple <b></b><i></i>xxxx<b>bb</b> --> xxxx<b>bb</b>
         */
        clearEmptySibling : function(node, ingoreNext, ingorePre) {
            function clear(next, dir) {
                var tmpNode;
                if (next && (!domUtils.isBookmarkNode(next) && domUtils.isEmptyInlineElement(next) || domUtils.isWhitespace(next) )) {
                    tmpNode = next[dir];
                    domUtils.remove(next);
                    tmpNode && clear(tmpNode, dir);
                }
            }

            !ingoreNext && clear(node.nextSibling, 'nextSibling');
            !ingorePre && clear(node.previousSibling, 'previousSibling');
        },

        //---------------------------Text----------------------------------

        /**
         * 将一个文本节点拆分成两个文本节点
         * @param {TextNode} node          文本节点
         * @param {Integer} offset         拆分的位置
         * @return {TextNode}   拆分后的后一个文本节
         */
        split: function (node, offset) {
            var doc = node.ownerDocument;
            if (browser.ie && offset == node.nodeValue.length) {
                var next = doc.createTextNode('');
                return domUtils.insertAfter(node, next);
            }

            var retval = node.splitText(offset);


            //ie8下splitText不会跟新childNodes,我们手动触发他的更新

            if (browser.ie8) {
                var tmpNode = doc.createTextNode('');
                domUtils.insertAfter(retval, tmpNode);
                domUtils.remove(tmpNode);

            }

            return retval;
        },

        /**
         * 判断是否为空白节点
         * @param {TextNode}   node   节点
         * @return {Boolean}      返回是否为文本节点
         */
        isWhitespace : function(node) {
            var reg = new RegExp('[^ \t\n\r' + domUtils.fillChar + ']');
            return !reg.test(node.nodeValue);
        },

        //------------------------------Element-------------------------------------------
        /**
         * 获取元素相对于viewport的像素坐标
         * @param {Element} element      元素
         * @returns {Object}             返回坐标对象{x:left,y:top}
         */
        getXY : function (element) {
            var x = 0,y = 0;
            while (element.offsetParent) {
                y += element.offsetTop;
                x += element.offsetLeft;
                element = element.offsetParent;
            }

            return {
                'x': x,
                'y': y
            };
        },
        /**
         * 绑原生DOM事件
         * @param {Element|Window|Document} target     元素
         * @param {Array|String} type                  事件类型
         * @param {Function} handler                   执行函数
         */
        on : function (obj, type, handler) {
            var types = type instanceof Array ? type : [type],
                k = types.length;
            var d;
            if (!obj.addEventListener) {
                //绑定obj 为this
                d = function(evt) {
                    evt = evt || window.event;
                    var el = evt.srcElement;
                    return handler.call(el, evt);
                };
                handler._d = d;
            }
            if (k) while (k --) {
                type = types[k];
                if (obj.addEventListener) {
                    obj.addEventListener(type, handler, false);
                } else {
                    obj.attachEvent('on' + type, d);
                }
            }
            obj = null;
        },

        /**
         * 解除原生DOM事件绑定
         * @param {Element|Window|Document} obj         元素
         * @param {Array|String} type                   事件类型
         * @param {Function} handler                    执行函数
         */
        un : function (obj, type, handler) {
            var types = type instanceof Array ? type : [type],
                k = types.length;
            if (k) while (k --) {
                type = types[k];
                if (obj.removeEventListener) {
                    obj.removeEventListener(type, handler, false);
                } else {
                    obj.detachEvent('on' + type, handler._d || handler);
                }
            }
        },

        /**
         * 比较两个节点是否tagName相同且有相同的属性和属性值
         * @param {Element}   nodeA              节点A
         * @param {Element}   nodeB              节点B
         * @return {Boolean}     返回两个节点的标签，属性和属性值是否相同
         * @example
         * &lt;span  style="font-size:12px"&gt;ssss&lt;/span&gt;和&lt;span style="font-size:12px"&gt;bbbbb&lt;/span&gt; 相等
         *  &lt;span  style="font-size:13px"&gt;ssss&lt;/span&gt;和&lt;span style="font-size:12px"&gt;bbbbb&lt;/span&gt; 不相等
         */
        isSameElement : function(nodeA, nodeB) {

            if (nodeA.tagName != nodeB.tagName)
                return false;

            var thisAttribs = nodeA.attributes,
                otherAttribs = nodeB.attributes;


            if (!browser.ie && thisAttribs.length != otherAttribs.length)
                return false;

            var k = thisAttribs.length,
                specLen = 0;
            if (k) while (k --) {
                var thisAttr = thisAttribs[k];
                if (!browser.ie || thisAttr.specified) {
                    specLen ++;
                    if (thisAttr.nodeName == 'style') continue;
                    // ie6 下必须用getAttribute("className")才能取到class属性
//                    if ( nodeB.getAttribute( thisAttr.nodeName ) != thisAttr.nodeValue ) {
                    var attr = nodeB.attributes[thisAttr.nodeName];
                    if (attr == null || attr.nodeValue != thisAttr.nodeValue) {
                        return false;
                    }
                }
            }

            if (!domUtils.isSameStyle(nodeA, nodeB)) {
                return false;
            }

            // 如果是IE，不能通过attributes.length判断属性是否一样多，需要单独判断
            if (browser.ie) {
                k = otherAttribs.length;
                if (k) while (k --) {
                    if (otherAttribs[k].specified) {
                        specLen --;
                    }
                }
                return !specLen;
            }

            return true;
        },
        /**
         * 判断是否为多余的span标签，该span没有显式定义的属性
         * @param {Node}    node       节点
         * @return   {boolean}     是否为多余的span标签
         * @example
         * 如&lt;span&gt;hello&lt;/span&gt;，这个span就是多余的
         */
        isRedundantSpan : function(node) {
            if (node.nodeType == 3 || node.tagName.toLowerCase() != 'span')
                return 0;
            if (browser.ie) {
                //ie 下判断实效，所以只能简单用style来判断
                return node.style.cssText == '' ? 1 : 0;
//                var attrs = node.attributes;
//                if ( attrs.length ) {
//                    for ( var i = 0,l = attrs.length; i<l; i++ ) {
//                        if ( attrs[i].specified ) {
//                            return 0;
//                        }
//                    }
//                    return 1;
//                }
            }
            return !node.attributes.length
        },
        /**
         * 判断两个元素的style属性是不是一致
         * @param {Element} elementA       元素A
         * @param {Element} elementB       元素B
         * @return   {boolean}   返回判断结果，true为一致
         */
        isSameStyle : function (elementA, elementB) {
            var styleA = elementA.style.cssText,
                styleB = elementB.style.cssText;
//            if ( browser.ie && browser.version <= 8 ) {
//                styleA = styleA.toLowerCase();
//                styleB = styleB.toLowerCase();
//            }
            if (!styleA && !styleB) {
                return true;
            } else if (!styleA || !styleB) {
                return false;
            }
            var styleNameMap = {},
                record = [],
                exit = {};
            styleA.replace(/[\w-]+\s*(?=:)/g, function (name) {
                styleNameMap[name] = record.push(name);
            });
            try {
                styleB.replace(/[\w-]+\s*(?=:)/g, function (name) {
                    var index = styleNameMap[name];
                    if (index) {
//                        var valA, valB;
                        name = utils.cssStyleToDomStyle(name);
//                        if ( browser.ie ) {
//                            valA = elementA.style.getAttribute( name );
//                            valB = elementB.style.getAttribute( name );
//                        } else {
//                            valA = elementA.style[name];
//                            valB = elementB.style[name];
//                        }
                        if (elementA.style[name] !== elementB.style[name]) {
                            throw exit;
                        }
                        record[index - 1] = '';
                    } else {
                        throw exit;
                    }
                });
            } catch(ex) {
                if (ex === exit) {
                    return false;
                }
            }
            return !record.join('');
        },

        /**
         * 检查是否为块元素
         * @function
         * @param {Element} node       元素
         * @param {String} customNodeNames 自定义的块元素的tagName
         * @return {Boolean} 是否为块元素
         */
        isBlockElm : function () {
            var blockBoundaryDisplayMatch = ['block' ,'list-item' ,'table' ,'table-row-group' ,'table-header-group','table-footer-group' ,'table-row' ,'table-column-group' ,'table-column' ,'table-cell' ,'table-caption'],
                blockBoundaryNodeNameMatch = { hr : 1 };
            return function(node, customNodeNames) {
                return node.nodeType == 1 && (utils.indexOf(blockBoundaryDisplayMatch, domUtils.getComputedStyle(node, 'display')) != -1 ||
                    utils.extend(blockBoundaryNodeNameMatch, customNodeNames || {})[ node.tagName.toLocaleLowerCase() ]) && !dtd.$nonChild[node.tagName];
            }
        }(),

        /**
         * 判断是否body
         * @param {Node} 节点
         * @return {Boolean}   是否是body节点
         */
        isBody : function(node) {
            return  node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
        },
        /**
         * 以node节点为中心，将该节点的父节点拆分成2块
         * @param {Element} node       节点
         * @param {Element} parent 要被拆分的父节点
         * @example <div>xxxx<b>xxx</b>xxx</div> ==> <div>xxx</div><b>xx</b><div>xxx</div>
         */
        breakParent : function(node, parent) {
            var tmpNode, parentClone = node, clone = node, leftNodes, rightNodes;
            do {
                parentClone = parentClone.parentNode;

                if (leftNodes) {
                    tmpNode = parentClone.cloneNode(false);
                    tmpNode.appendChild(leftNodes);
                    leftNodes = tmpNode;

                    tmpNode = parentClone.cloneNode(false);
                    tmpNode.appendChild(rightNodes);
                    rightNodes = tmpNode;

                } else {
                    leftNodes = parentClone.cloneNode(false);
                    rightNodes = leftNodes.cloneNode(false);
                }


                while (tmpNode = clone.previousSibling) {
                    leftNodes.insertBefore(tmpNode, leftNodes.firstChild);
                }

                while (tmpNode = clone.nextSibling) {
                    rightNodes.appendChild(tmpNode);
                }

                clone = parentClone;
            } while (parent !== parentClone);

            tmpNode = parent.parentNode;
            tmpNode.insertBefore(leftNodes, parent);
            tmpNode.insertBefore(rightNodes, parent);
            tmpNode.insertBefore(node, rightNodes);
            domUtils.remove(parent);
            return node;
        },

        /**
         * 检查是否是空inline节点
         * @param   {Node}    node      节点
         * @return {Boolean}  返回1为是，0为否
         * @example
         * &lt;b&gt;&lt;i&gt;&lt;/i&gt;&lt;/b&gt; //true
         * <b><i></i><u></u></b> true
         * &lt;b&gt;&lt;/b&gt; true  &lt;b&gt;xx&lt;i&gt;&lt;/i&gt;&lt;/b&gt; //false
         */
        isEmptyInlineElement : function(node) {

            if (node.nodeType != 1 || !dtd.$removeEmpty[ node.tagName ])
                return 0;

            node = node.firstChild;
            while (node) {
                //如果是创建的bookmark就跳过
                if (domUtils.isBookmarkNode(node))
                    return 0;
                if (node.nodeType == 1 && !domUtils.isEmptyInlineElement(node) ||
                    node.nodeType == 3 && !domUtils.isWhitespace(node)
                    ) {
                    return 0;
                }
                node = node.nextSibling;
            }
            return 1;

        },

        /**
         * 删除空白子节点
         * @param   {Element}   node    需要删除空白子节点的元素
         */
        trimWhiteTextNode : function(node) {

            function remove(dir) {
                var child;
                while ((child = node[dir]) && child.nodeType == 3 && domUtils.isWhitespace(child))
                    node.removeChild(child)

            }

            remove('firstChild');
            remove('lastChild');

        },

        /**
         * 合并子节点
         * @param    {Node}    node     节点
         * @param    {String}    tagName     标签
         * @param    {String}    attrs     属性
         * @example &lt;span style="font-size:12px;"&gt;xx&lt;span style="font-size:12px;"&gt;aa&lt;/span&gt;xx&lt;/span  使用后
         * &lt;span style="font-size:12px;"&gt;xxaaxx&lt;/span
         */
        mergChild : function(node, tagName, attrs) {

            var list = domUtils.getElementsByTagName(node, node.tagName.toLowerCase());
            for (var i = 0,ci; ci = list[i++];) {

                if (!ci.parentNode || domUtils.isBookmarkNode(ci)) continue;
                //span单独处理
                if (ci.tagName.toLowerCase() == 'span') {
                    if (node === ci.parentNode) {
                        domUtils.trimWhiteTextNode(node);
                        if (node.childNodes.length == 1) {
                            node.style.cssText = ci.style.cssText + ";" + node.style.cssText;
                            domUtils.remove(ci, true);
                            continue;
                        }
                    }
                    ci.style.cssText = node.style.cssText + ';' + ci.style.cssText;
                    if (attrs) {
                        var style = attrs.style;
                        if (style) {
                            style = style.split(';');
                            for (var j = 0,s; s = style[j++];) {
                                ci.style[utils.cssStyleToDomStyle(s.split(':')[0])] = s.split(':')[1];
                            }
                        }
                    }
                    if (domUtils.isSameStyle(ci, node)) {

                        domUtils.remove(ci, true)
                    }
                    continue;
                }
                if (domUtils.isSameElement(node, ci)) {
                    domUtils.remove(ci, true);
                }
            }

            if (tagName == 'span') {
                var as = domUtils.getElementsByTagName(node, 'a');
                for (var i = 0,ai; ai = as[i++];) {

                    ai.style.cssText = ';' + node.style.cssText;

                    ai.style.textDecoration = 'underline';

                }
            }
        },

        /**
         * 封装原生的getElemensByTagName
         * @param  {Node}    node       根节点
         * @param  {String}   name      标签的tagName
         * @return {Array}      返回符合条件的元素数组
         */
        getElementsByTagName : function(node, name) {
            var list = node.getElementsByTagName(name),arr = [];
            for (var i = 0,ci; ci = list[i++];) {
                arr.push(ci)
            }
            return arr;
        },
        /**
         * 将子节点合并到父节点上
         * @param {Element} node    节点
         * @example &lt;span style="color:#ff"&gt;&lt;span style="font-size:12px"&gt;xxx&lt;/span&gt;&lt;/span&gt; ==&gt; &lt;span style="color:#ff;font-size:12px"&gt;xxx&lt;/span&gt;
         */
        mergToParent : function(node) {
            var parent = node.parentNode;

            while (parent && dtd.$removeEmpty[parent.tagName]) {
                if (parent.tagName == node.tagName || parent.tagName == 'A') {//针对a标签单独处理
                    domUtils.trimWhiteTextNode(parent);
                    //span需要特殊处理  不处理这样的情况 <span stlye="color:#fff">xxx<span style="color:#ccc">xxx</span>xxx</span>
                    if (parent.tagName.toLowerCase() == 'span' && !domUtils.isSameStyle(parent, node) || (parent.tagName == 'A' && node.tagName == 'SPAN')) {
                        if (parent.childNodes.length > 1 || parent !== node.parentNode) {
                            node.style.cssText = parent.style.cssText + ";" + node.style.cssText;
                            parent = parent.parentNode;
                            continue;
                        } else {

                            parent.style.cssText += ";" + node.style.cssText;
                            //trace:952 a标签要保持下划线
                            if (parent.tagName == 'A') {
                                parent.style.textDecoration = 'underline';
                            }

                        }
                    }
                    parent.tagName != 'A' && domUtils.remove(node, true);

                }
                parent = parent.parentNode;
            }

        },
        /**
         * 合并左右兄弟节点
         * @function
         * @param {Node}     node
         * @param {Boolean} ingoreNext   默认为false合并上一个兄弟节点。true为不合并上一个兄弟节点
         * @param {Boolean} ingorePre    默认为false合并下一个兄弟节点。true为不合并下一个兄弟节点
         * @example &lt;b&gt;xxxx&lt;/b&gt;&lt;b&gt;xxx&lt;/b&gt;&lt;b&gt;xxxx&lt;/b&gt; ==> &lt;b&gt;xxxxxxxxxxx&lt;/b&gt;
         */
        mergSibling : function(node, ingorePre, ingoreNext) {
            function merg(rtl, start, node) {
                var next;
                if ((next = node[rtl]) && !domUtils.isBookmarkNode(next) && next.nodeType == 1 && domUtils.isSameElement(node, next)) {
                    while (next.firstChild) {
                        if (start == 'firstChild') {
                            node.insertBefore(next.lastChild, node.firstChild);
                        } else {
                            node.appendChild(next.firstChild)
                        }

                    }
                    domUtils.remove(next);
                }
            }

            !ingorePre && merg('previousSibling', 'firstChild', node);
            !ingoreNext && merg('nextSibling', 'lastChild', node);
        },

        /**
         * 使得元素及其子节点不能被选择
         * @function
         * @param   {Node}     node      节点
         */
        unselectable :
            browser.gecko ?
                function(node) {
                    node.style.MozUserSelect = 'none';
                }
                : browser.webkit ?
                function(node) {
                    node.style.KhtmlUserSelect = 'none';
                }
                :
                function(node) {
                    //for ie9
                    node.onselectstart = function () { return false; };
                    node.onclick = node.onkeyup = node.onkeydown = function(){return false};
                    node.unselectable = 'on';
                    node.setAttribute("unselectable","on");
                    for (var i = 0,ci; ci = node.all[i++];) {
                        switch (ci.tagName.toLowerCase()) {
                            case 'iframe' :
                            case 'textarea' :
                            case 'input' :
                            case 'select' :

                                break;
                            default :
                                ci.unselectable = 'on';
                                node.setAttribute("unselectable","on");
                        }
                    }
                },
        //todo yuxiang
        /**
         * 删除元素上的属性，可以删除多个
         * @function
         * @param {Element} element      元素
         * @param {Array} attrNames      要删除的属性数组
         */
        removeAttributes : function (element, attrNames) {
            var k = attrNames.length;
            if (k) while (k --) {
                var attr = attrNames[k];
                attr = attrFix[attr] || attr;
                //for ie className
                if(attr == 'className'){
                    element[attr] = '';
                }
                element.removeAttribute(attr);

            }
        },
        /**
         * 给节点添加属性
         * @function
         * @param {Node} node      节点
         * @param {Object} attrNames     要添加的属性名称，采用json对象存放
         */
        setAttributes : function(node, attrs) {
            for (var name in attrs) {
                switch (name.toLowerCase()) {
                    case 'class' :
                        node.className = attrs[name];
                        break;
                    case 'style' :
                        node.style.cssText = attrs[name];
                        break;
                    default:
                        node.setAttribute(name.toLowerCase(), attrs[name]);
                }
            }

            return node;
        },

        /**
         * 获取元素的样式
         * @function
         * @param {Element} element    元素
         * @param {String} styleName    样式名称
         * @return  {String}    样式值
         */
        getComputedStyle : function (element, styleName) {
            function fixUnit(key, val) {
                if (key == 'font-size' && /pt$/.test(val)) {
                    val = Math.round(parseFloat(val) / 0.75) + 'px';
                }
                return val;
            }
            if(element.nodeType == 3){
                element = element.parentNode;
            }

            //ie下font-size若body下定义了font-size，则从currentStyle里会取到这个font-size. 取不到实际值，故此修改.
            if (browser.ie && browser.version < 9 && styleName == 'font-size' && !element.style.fontSize &&
                !dtd.$empty[element.tagName] && !dtd.$nonChild[element.tagName]) {
                var span = element.ownerDocument.createElement('span');
                span.style.cssText = 'padding:0;border:0;font-family:simsun;';
                span.innerHTML = '.';
                element.appendChild(span);
                var result = span.offsetHeight;
                element.removeChild(span);
                span = null;
                return result + 'px';
            }

            try {
                var value = domUtils.getStyle(element, styleName) ||
                    (window.getComputedStyle ? domUtils.getWindow(element).getComputedStyle(element, '').getPropertyValue(styleName) :
                        ( element.currentStyle || element.style )[utils.cssStyleToDomStyle(styleName)]);

            } catch(e) {
                return null;
            }

            return fixUnit(styleName, fixColor(styleName, value));
        },

        /**
         * 删除cssClass，可以支持删除多个class，需以空格分隔
         * @param {Element} element         元素
         * @param {Array} classNames        删除的className
         */
        removeClasses : function (element, classNames) {
            element.className = (' ' + element.className + ' ').replace(
                new RegExp('(?:\\s+(?:' + classNames.join('|') + '))+\\s+', 'g'), ' ');
        },
        /**
         * 删除元素的样式
         * @param {Element} element元素
         * @param {String} name        删除的样式名称
         */
        removeStyle : function(node, name) {
            node.style[utils.cssStyleToDomStyle(name)] = '';
            if (node.style.removeAttribute)
                node.style.removeAttribute(utils.cssStyleToDomStyle(name));

            if (!node.style.cssText)
                node.removeAttribute('style');
        },
        /**
         * 判断元素属性中是否包含某一个classname
         * @param {Element} element    元素
         * @param {String} className    样式名
         * @returns {Boolean}       是否包含该classname
         */
        hasClass : function (element, className) {
            return ( ' ' + element.className + ' ' ).indexOf(' ' + className + ' ') > -1;
        },

        /**
         * 阻止事件默认行为
         * @param {Event} evt    需要组织的事件对象
         */
        preventDefault : function (evt) {
            evt.preventDefault  ? evt.preventDefault() : (evt.returnValue = false);
        },
        /**
         * 获得元素样式
         * @param {Element} element    元素
         * @param {String}  name    样式名称
         * @return  {String}   返回元素样式值
         */
        getStyle : function(element, name) {
            var value = element.style[ utils.cssStyleToDomStyle(name) ];
            return fixColor(name, value);
        },
        setStyle: function (element, name, value) {
            element.style[utils.cssStyleToDomStyle(name)] = value;
        },
        setStyles: function (element, styles) {
            for (var name in styles) {
                if (styles.hasOwnProperty(name)) {
                    domUtils.setStyle(element, name, styles[name]);
                }
            }
        },
        /**
         * 删除_moz_dirty属性
         * @function
         * @param {Node}    node    节点
         */
        removeDirtyAttr : function(node) {
            for (var i = 0,ci,nodes = node.getElementsByTagName('*'); ci = nodes[i++];) {
                ci.removeAttribute('_moz_dirty')
            }
            node.removeAttribute('_moz_dirty')
        },
        /**
         * 返回子节点的数量
         * @function
         * @param {Node}    node    父节点
         * @param  {Function}    fn    过滤子节点的规则，若为空，则得到所有子节点的数量
         * @return {Number}    符合条件子节点的数量
         */
        getChildCount : function (node, fn) {
            var count = 0,first = node.firstChild;
            fn = fn || function() {
                return 1
            };
            while (first) {
                if (fn(first))
                    count++;
                first = first.nextSibling;
            }
            return count;
        },
        /**
         * 清除冗余的inline标签
         * @param node node下的冗余子孙节点
         * @param tags 清除的节点的tagname
         * @example <div><b><i></i></b></div> ==> <div></div>
         */
        clearReduent : function(node, tags) {

            var nodes,
                reg = new RegExp(domUtils.fillChar, 'g'),
                _parent;
            for (var t = 0,ti; ti = tags[t++];) {
                nodes = node.getElementsByTagName(ti);

                for (var i = 0,ci; ci = nodes[i++];) {
                    if (ci.parentNode && ci[browser.ie ? 'innerText' : 'textContent'].replace(reg, '').length == 0 && ci.children.length == 0) {

                        _parent = ci.parentNode;

                        domUtils.remove(ci);
                        while (_parent.childNodes.length == 0 && new RegExp(tags.join('|'), 'i').test(_parent.tagName)) {
                            ci = _parent;
                            _parent = _parent.parentNode;
                            domUtils.remove(ci)

                        }

                    }
                }
            }

        },
        /**
         * 判断是否为空节点
         * @function
         * @param {Node}    node    节点
         * @return {Boolean}    是否为空节点
         */
        isEmptyNode : function(node) {
            var first = node.firstChild;
            return !first || domUtils.getChildCount(node, function(node) {
                return  !domUtils.isBr(node) && !domUtils.isBookmarkNode(node) && !domUtils.isWhitespace(node)
            }) == 0
        },
        /**
         * 清空节点所有的className
         * @function
         * @param {Array}    nodes    节点数组
         */
        clearSelectedArr : function(nodes) {
            var node;
            while (node = nodes.pop()) {
                domUtils.removeAttributes(node,['class']);

            }
        },


        /**
         * 将显示区域滚动到显示节点的位置
         * @funciton
         * @param    {Node}   node    节点
         * @param    {window}   win      window对象
         * @param    {Number}    offsetTop    距离上方的偏移量
         */
        scrollToView : function(node, win, offsetTop) {
            var
                getViewPaneSize = function() {
                    var doc = win.document,
                        mode = doc.compatMode == 'CSS1Compat';

                    return {
                        width : ( mode ? doc.documentElement.clientWidth : doc.body.clientWidth ) || 0,
                        height : ( mode ? doc.documentElement.clientHeight : doc.body.clientHeight ) || 0
                    };

                },
                getScrollPosition = function(win) {

                    if ('pageXOffset' in win) {
                        return {
                            x : win.pageXOffset || 0,
                            y : win.pageYOffset || 0
                        };
                    }
                    else {
                        var doc = win.document;
                        return {
                            x : doc.documentElement.scrollLeft || doc.body.scrollLeft || 0,
                            y : doc.documentElement.scrollTop || doc.body.scrollTop || 0
                        };
                    }
                };


            var winHeight = getViewPaneSize().height,offset = winHeight * -1 + offsetTop;


            offset += (node.offsetHeight || 0);

            var elementPosition = domUtils.getXY(node);
            offset += elementPosition.y;

            var currentScroll = getScrollPosition(win).y;

            // offset += 50;
            if (offset > currentScroll || offset < currentScroll - winHeight)
                win.scrollTo(0, offset + (offset < 0 ? -20 : 20));
        },
        /**
         * 判断节点是否为br
         * @function
         * @param {Node}    node   节点
         */
        isBr : function(node) {
            return node.nodeType == 1 && node.tagName == 'BR';
        },
        /**
         *  判断range中是否包含特定的html标签，有的话，返回第一个找到的dom节点
         * @param range
         * @param tags tagname数组
         */
        findTagNamesInSelection: function(range, tags ){
            var as,
                ps,
                pe,
                node,
                start,
                end,
                common;

            if(range.collapsed){
                node = range.startContainer;
                if ( node && (node = domUtils.findParentByTagName( node, tags, true )) ) {
                    return node;
                }
            }else{
                range.shrinkBoundary();
                start = range.startContainer.nodeType  == 3 || !range.startContainer.childNodes[range.startOffset] ? range.startContainer : range.startContainer.childNodes[range.startOffset];
                end =  range.endContainer.nodeType == 3 || range.endOffset == 0 ? range.endContainer : range.endContainer.childNodes[range.endOffset-1];

                common = domUtils.getCommonAncestor(start, end);

                for( var j = 0, t; t = tags[j++]; ){
                    //找特定的tag
                    node = domUtils.findParentByTagName( common, t, true );
                    if ( !node && common.nodeType == 1){

                        as = common.getElementsByTagName( t );

                        for ( var i = 0,ci; ci = as[i++]; ) {
                            if(start == ci || end  == ci){
                                node = ci;
                                break;
                            }
                            ps = domUtils.getPosition( ci, start ),pe = domUtils.getPosition( ci,end);
                            if ( (ps & domUtils.POSITION_FOLLOWING || ps & domUtils.POSITION_CONTAINS)
                                &&
                                (pe & domUtils.POSITION_PRECEDING || pe & domUtils.POSITION_CONTAINS)
                                ) {
                                node =  ci;
                                break;
                            }
                        }
                    }
                    if( node ){
                        return node;
                    }
                }
            }
             return null;
        },
        isFillChar : function(node){
            var reg = new RegExp( domUtils.fillChar );
            return node.nodeType == 3 && !node.nodeValue.replace(reg,'').length
        },
        isStartInblock : function(range){
            
            var tmpRange = range.cloneRange(),
                flag = 0,
                start = tmpRange.startContainer;

            if(domUtils.isFillChar(start)){
                tmpRange.setStartBefore(start);
            }

            while(!tmpRange.startOffset){
                start = tmpRange.startContainer;


                if(domUtils.isBlockElm(start)||domUtils.isBody(start)){
                    flag = 1;
                    break;
                }
                var pre = tmpRange.startContainer.previousSibling,
                    tmpNode;
                if(!pre){
                    tmpRange.setStartBefore(tmpRange.startContainer);
                }else{
                    while(pre && domUtils.isFillChar(pre)){
                        tmpNode = pre;
                        pre = pre.previousSibling;

                    }
                    if(tmpNode){
                        tmpRange.setStartBefore(tmpNode);
                    }else
                        tmpRange.setStartBefore(tmpRange.startContainer);
                }



            }
           
            return flag && !domUtils.isBody(tmpRange.startContainer) ? 1 : 0;
        },
        isEmptyBlock : function(node){
            var reg = new RegExp( '[ \t\r\n' + domUtils.fillChar+']', 'g' );

            if(node[browser.ie?'innerText':'textContent'].replace(reg,'').length >0)
                return 0;

            for(var n in dtd.$isNotEmpty){
                if(node.getElementsByTagName(n).length)
                    return 0;
            }
           
            return 1;
        },
        findStartElement: function (range, tester){
            var node = range.startContainer;
            if (node.hasChildNodes()) {
                node = node.childNodes[range.startOffset] ||  node;
            } else if (node.nodeType == 3){
                if (range.startOffset == 0) {
                    node = node.previousSibling || node.parentNode;
                } else if (range.startOffset >= node.nodeValue.length) {
                    node = node.nextSibling || node.parentNode;
                }
            }
            if (node.nodeType != 1) {
                node = node.parentNode;
            }
            while (node != null) {
                if (matchSelector(node)) {
                    return node;
                }
                node = node.parentNode;
            }
            return null;
            function matchSelector(node){
                if (typeof tester == 'string') {
                    return node.nodeName == tester;
                } else if (typeof tester == 'function') {
                    return tester(node);
                } else {
                    return tester.test(node.nodeName);
                }
            }
        },
        setViewportOffset: function (element, offset){
            var left = parseInt(element.style.left) | 0;
            var top = parseInt(element.style.top) | 0;
            var rect = element.getBoundingClientRect();
            var offsetLeft = offset.left - rect.left;
            var offsetTop = offset.top - rect.top;
            if (offsetLeft) {
                element.style.left = left + offsetLeft + 'px';
            }
            if (offsetTop) {
                element.style.top = top + offsetTop + 'px';
            }
        },
        fillNode : function(doc,node){
            if(browser.ie){
                node.appendChild(doc.createTextNode(domUtils.fillChar))
            }else{
                node.innerHTML = '<br/>'
            }
        }


    }; 
})();
