/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */
var T,
    baidu = T = baidu || {version: "1.3.9"};
baidu.guid = "$BAIDU$";
window[baidu.guid] = window[baidu.guid] || {};
baidu.flash = baidu.flash || {};
baidu.dom = baidu.dom || {};
baidu.dom.g = function (id) {
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};
baidu.g = baidu.G = baidu.dom.g;
baidu.array = baidu.array || {};
baidu.each = baidu.array.forEach = baidu.array.each = function (source, iterator, thisObject) {
    var returnValue, item, i, len = source.length;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            //TODO
            //此处实现和标准不符合，标准中是这样说的：
            //If a thisObject parameter is provided to forEach, it will be used as the this for each invocation of the callback. If it is not provided, or is null, the global object associated with callback is used instead.
            returnValue = iterator.call(thisObject || source, item, i);
    
            if (returnValue === false) {
                break;
            }
        }
    }
    return source;
};
baidu.lang = baidu.lang || {};
baidu.lang.isFunction = function (source) {
    // chrome下,'function' == typeof /a/ 为true.
    return '[object Function]' == Object.prototype.toString.call(source);
};
baidu.lang.isString = function (source) {
    return '[object String]' == Object.prototype.toString.call(source);
};
baidu.isString = baidu.lang.isString;

baidu.swf = baidu.swf || {};
baidu.swf.version = (function () {
    var n = navigator;
    if (n.plugins && n.mimeTypes.length) {
        var plugin = n.plugins["Shockwave Flash"];
        if (plugin && plugin.description) {
            return plugin.description
                    .replace(/([a-zA-Z]|\s)+/, "")
                    .replace(/(\s)+r/, ".") + ".0";
        }
    } else if (window.ActiveXObject && !window.opera) {
        for (var i = 12; i >= 2; i--) {
            try {
                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                if (c) {
                    var version = c.GetVariable("$version");
                    return version.replace(/WIN/g,'').replace(/,/g,'.');
                }
            } catch(e) {}
        }
    }
})();

baidu.string = baidu.string || {};
baidu.string.encodeHTML = function (source) {
    return String(source)
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
};

baidu.encodeHTML = baidu.string.encodeHTML;

baidu.swf.createHTML = function (options) {
    options = options || {};
    var version = baidu.swf.version, 
        needVersion = options['ver'] || '6.0.0', 
        vUnit1, vUnit2, i, k, len, item, tmpOpt = {},
        encodeHTML = baidu.string.encodeHTML;
    
    // 复制options，避免修改原对象
    for (k in options) {
        tmpOpt[k] = options[k];
    }
    options = tmpOpt;
    
    // 浏览器支持的flash插件版本判断
    if (version) {
        version = version.split('.');
        needVersion = needVersion.split('.');
        for (i = 0; i < 3; i++) {
            vUnit1 = parseInt(version[i], 10);
            vUnit2 = parseInt(needVersion[i], 10);
            if (vUnit2 < vUnit1) {
                break;
            } else if (vUnit2 > vUnit1) {
                return ''; // 需要更高的版本号
            }
        }
    } else {
        return ''; // 未安装flash插件
    }
    
    var vars = options['vars'],
        objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];
    
    // 初始化object标签需要的classid、codebase属性值
    options['align'] = options['align'] || 'middle';
    options['classid'] = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
    options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
    options['movie'] = options['url'] || '';
    delete options['vars'];
    delete options['url'];
    
    // 初始化flashvars参数的值
    if ('string' == typeof vars) {
        options['flashvars'] = vars;
    } else {
        var fvars = [];
        for (k in vars) {
            item = vars[k];
            fvars.push(k + "=" + encodeURIComponent(item));
        }
        options['flashvars'] = fvars.join('&');
    }
    
    // 构建IE下支持的object字符串，包括属性和参数列表
    var str = ['<object '];
    for (i = 0, len = objProperties.length; i < len; i++) {
        item = objProperties[i];
        str.push(' ', item, '="', encodeHTML(options[item]), '"');
    }
    str.push('>');
    var params = {
        'wmode'             : 1,
        'scale'             : 1,
        'quality'           : 1,
        'play'              : 1,
        'loop'              : 1,
        'menu'              : 1,
        'salign'            : 1,
        'bgcolor'           : 1,
        'base'              : 1,
        'allowscriptaccess' : 1,
        'allownetworking'   : 1,
        'allowfullscreen'   : 1,
        'seamlesstabbing'   : 1,
        'devicefont'        : 1,
        'swliveconnect'     : 1,
        'flashvars'         : 1,
        'movie'             : 1
    };
    
    for (k in options) {
        item = options[k];
        k = k.toLowerCase();
        if (params[k] && (item || item === false || item === 0)) {
            str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />');
        }
    }
    
    // 使用embed时，flash地址的属性名是src，并且要指定embed的type和pluginspage属性
    options['src']  = options['movie'];
    options['name'] = options['id'];
    delete options['id'];
    delete options['movie'];
    delete options['classid'];
    delete options['codebase'];
    options['type'] = 'application/x-shockwave-flash';
    options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer';
    
    
    // 构建embed标签的字符串
    str.push('<embed');
    // 在firefox、opera、safari下，salign属性必须在scale属性之后，否则会失效
    // 经过讨论，决定采用BT方法，把scale属性的值先保存下来，最后输出
    var salign;
    for (k in options) {
        item = options[k];
        if (item || item === false || item === 0) {
            if ((new RegExp("^salign\x24", "i")).test(k)) {
                salign = item;
                continue;
            }
            
            str.push(' ', k, '="', encodeHTML(item), '"');
        }
    }
    
    if (salign) {
        str.push(' salign="', encodeHTML(salign), '"');
    }
    str.push('></embed></object>');
    
    return str.join('');
};
baidu.swf.create = function (options, target) {
    options = options || {};
    var html = baidu.swf.createHTML(options) 
               || options['errorMessage'] 
               || '';
                
    if (target && 'string' == typeof target) {
        target = document.getElementById(target);
    }
    
    if (target) {
        target.innerHTML = html;
    } else {
        document.write(html);
    }
};
baidu.browser = baidu.browser || {};

baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;

baidu.array.remove = function (source, match) {
    var len = source.length;
        
    while (len--) {
        if (len in source && source[len] === match) {
            source.splice(len, 1);
        }
    }
    return source;
};

baidu.lang.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};

baidu.lang.toArray = function (source) {
    if (source === null || source === undefined)
        return [];
    if (baidu.lang.isArray(source))
        return source;

    // The strings and functions also have 'length'
    if (typeof source.length !== 'number' || typeof source === 'string' || baidu.lang.isFunction(source)) {
        return [source];
    }

    //nodeList, IE 下调用 [].slice.call(nodeList) 会报错
    if (source.item) {
        var l = source.length, array = new Array(l);
        while (l--)
            array[l] = source[l];
        return array;
    }

    return [].slice.call(source);
};

baidu.swf.getMovie = function (name) {
	//ie9下, Object标签和embed标签嵌套的方式生成flash时,
	//会导致document[name]多返回一个Object元素,而起作用的只有embed标签
	var movie = document[name], ret;
    return baidu.browser.ie == 9 ?
    	movie && movie.length ? 
    		(ret = baidu.array.remove(baidu.lang.toArray(movie),function(item){
    			return item.tagName.toLowerCase() != "embed";
    		})).length == 1 ? ret[0] : ret
    		: movie
    	: movie || window[name];
};


baidu.flash._Base = (function(){
   
    var prefix = 'bd__flash__';

    /**
     * 创建一个随机的字符串
     * @private
     * @return {String}
     */
    function _createString(){
        return  prefix + Math.floor(Math.random() * 2147483648).toString(36);
    };
   
    /**
     * 检查flash状态
     * @private
     * @param {Object} target flash对象
     * @return {Boolean}
     */
    function _checkReady(target){
        if(typeof target !== 'undefined' && typeof target.flashInit !== 'undefined' && target.flashInit()){
            return true;
        }else{
            return false;
        }
    };

    /**
     * 调用之前进行压栈的函数
     * @private
     * @param {Array} callQueue 调用队列
     * @param {Object} target flash对象
     * @return {Null}
     */
    function _callFn(callQueue, target){
        var result = null;
        
        callQueue = callQueue.reverse();
        baidu.each(callQueue, function(item){
            result = target.call(item.fnName, item.params);
            item.callBack(result);
        });
    };
    function _createFunName(fun){
        var name = '';

        if(baidu.lang.isFunction(fun)){
            name = _createString();
            window[name] = function(){
                fun.apply(window, arguments);
            };

            return name;
        }else if(baidu.lang.isString){
            return fun;
        }
    };


    function _render(options){
        if(!options.id){
            options.id = _createString();
        }
        
        var container = options.container || '';
        delete(options.container);
        
        baidu.swf.create(options, container);
        
        return baidu.swf.getMovie(options.id);
    };

    return function(options, callBack){
        var me = this,
            autoRender = (typeof options.autoRender !== 'undefined' ? options.autoRender : true),
            createOptions = options.createOptions || {},
            target = null,
            isReady = false,
            callQueue = [],
            timeHandle = null,
            callBack = callBack || [];

        /**
         * 将flash文件绘制到页面上
         * @public
         * @return {Null}
         */
        me.render = function(){
            target = _render(createOptions);
            
            if(callBack.length > 0){
                baidu.each(callBack, function(funName, index){
                    callBack[index] = _createFunName(options[funName] || new Function());
                });    
            }
            me.call('setJSFuncName', [callBack]);
        };

        /**
         * 返回flash状态
         * @return {Boolean}
         */
        me.isReady = function(){
            return isReady;
        };

        me.call = function(fnName, params, callBack){
            if(!fnName) return;
            callBack = callBack || new Function();
    
            var result = null;
    
            if(isReady){
                result = target.call(fnName, params);
                callBack(result);
            }else{
                callQueue.push({
                    fnName: fnName,
                    params: params,
                    callBack: callBack
                });
    
                (!timeHandle) && (timeHandle = setInterval(_check, 200));
            }
        };

        me.createFunName = function(fun){
            return _createFunName(fun);    
        };

        function _check(){
            if(_checkReady(target)){
                clearInterval(timeHandle);
                timeHandle = null;
                _call();

                isReady = true;
            }               
        };

        function _call(){
            _callFn(callQueue, target);
            callQueue = [];
        }

        autoRender && me.render(); 
    };
})();
baidu.flash.imageUploader = baidu.flash.imageUploader || function(options){
   
    var me = this,
        options = options || {},
        _flash = new baidu.flash._Base(options, [
            'selectFileCallback', 
            'exceedFileCallback', 
            'deleteFileCallback', 
            'startUploadCallback',
            'uploadCompleteCallback',
            'uploadErrorCallback',
            'allCompleteCallback',
            'changeFlashHeight'
        ]);

    me.upload = function(){
        _flash.call('upload');
    };

    me.pause = function(){
        _flash.call('pause');
    };
};
