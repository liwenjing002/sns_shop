UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
var baidu = baidu || {};

/**
 * @namespace baidu.editor
 */
baidu.editor = baidu.editor || {};

/**
 * @class baidu.editor.commands
 */
baidu.editor.commands = {};
/**
 * @class baidu.editor.plugins
 */
baidu.editor.plugins = {};



///import editor.js
/**
 * @class baidu.editor.browser     判断浏览器
 */

baidu.editor.browser = function(){
    var agent = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        browser = {
        /**
         * 检测浏览器是否为IE
         * @name baidu.editor.browser.ie
         * @property    检测浏览器是否为IE
         * @grammar     baidu.editor.browser.ie
         * @return     {Boolean}    返回是否为ie浏览器
         */
        ie		: !!window.ActiveXObject,

        /**
         * 检测浏览器是否为Opera
         * @name baidu.editor.browser.opera
         * @property    检测浏览器是否为Opera
         * @grammar     baidu.editor.browser.opera
         * @return     {Boolean}    返回是否为opera浏览器
         */
        opera	: ( !!opera && opera.version ),

        /**
         * 检测浏览器是否为WebKit内核
         * @name baidu.editor.browser.webkit
         * @property    检测浏览器是否为WebKit内核
         * @grammar     baidu.editor.browser.webkit
         * @return     {Boolean}    返回是否为WebKit内核
         */
        webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),

        /**
         * 检测是否为Adobe AIR
         * @name baidu.editor.browser.air
         * @property    检测是否为Adobe AIR
         * @grammar     baidu.editor.browser.air
         * @return     {Boolean}    返回是否为Adobe AIR
         */
        air		: ( agent.indexOf( ' adobeair/' ) > -1 ),

        /**
         * 检查是否为Macintosh系统
         * @name baidu.editor.browser.mac
         * @property    检查是否为Macintosh系统
         * @grammar     baidu.editor.browser.mac
         * @return     {Boolean}    返回是否为Macintosh系统
         */
        mac	: ( agent.indexOf( 'macintosh' ) > -1 ),

        /**
         * 检查浏览器是否为quirks模式
         * @name baidu.editor.browser.quirks
         * @property    检查浏览器是否为quirks模式
         * @grammar     baidu.editor.browser.quirks
         * @return     {Boolean}    返回是否为quirks模式
         */
        quirks : ( document.compatMode == 'BackCompat' )
    };

    /**
     * 检测浏览器是否为Gecko内核，如Firefox
     * @name baidu.editor.browser.gecko
     * @property    检测浏览器是否为Gecko内核
     * @grammar     baidu.editor.browser.gecko
     * @return     {Boolean}    返回是否为Gecko内核
     */
    browser.gecko = ( navigator.product == 'Gecko' && !browser.webkit && !browser.opera );

    var version = 0;

    // Internet Explorer 6.0+
    if ( browser.ie )
    {
        version = parseFloat( agent.match( /msie (\d+)/ )[1] );

        /**
         * 检测浏览器是否为 IE8 浏览器
         * @name baidu.editor.browser.IE8
         * @property    检测浏览器是否为 IE8 浏览器
         * @grammar     baidu.editor.browser.IE8
         * @return     {Boolean}    返回是否为 IE8 浏览器
         */
        browser.ie8 = !!document.documentMode;

        /**
         * 检测浏览器是否为 IE8 模式
         * @name baidu.editor.browser.ie8Compat
         * @property    检测浏览器是否为 IE8 模式
         * @grammar     baidu.editor.browser.ie8Compat
         * @return     {Boolean}    返回是否为 IE8 模式
         */
        browser.ie8Compat = document.documentMode == 8;

        /**
         * 检测浏览器是否运行在 兼容IE7模式
         * @name baidu.editor.browser.ie7Compat
         * @property    检测浏览器是否为兼容IE7模式
         * @grammar     baidu.editor.browser.ie7Compat
         * @return     {Boolean}    返回是否为兼容IE7模式
         */
        browser.ie7Compat = ( ( version == 7 && !document.documentMode )
                || document.documentMode == 7 );

        /**
         * 检测浏览器是否IE6模式或怪异模式
         * @name baidu.editor.browser.ie6Compat
         * @property    检测浏览器是否IE6 模式或怪异模式
         * @grammar     baidu.editor.browser.ie6Compat
         * @return     {Boolean}    返回是否为IE6 模式或怪异模式
         */
        browser.ie6Compat = ( version < 7 || browser.quirks );

    }

    // Gecko.
    if ( browser.gecko )
    {
        var geckoRelease = agent.match( /rv:([\d\.]+)/ );
        if ( geckoRelease )
        {
            geckoRelease = geckoRelease[1].split( '.' );
            version = geckoRelease[0] * 10000 + ( geckoRelease[1] || 0 ) * 100 + ( geckoRelease[2] || 0 ) * 1;
        }
    }
    /**
     * 检测浏览器是否为chrome
     * @name baidu.editor.browser.chrome
     * @property    检测浏览器是否为chrome
     * @grammar     baidu.editor.browser.chrome
     * @return     {Boolean}    返回是否为chrome浏览器
     */
    if (/chrome\/(\d+\.\d)/i.test(agent)) {
        browser.chrome = + RegExp['\x241'];
    }
    /**
     * 检测浏览器是否为safari
     * @name baidu.editor.browser.safari
     * @property    检测浏览器是否为safari
     * @grammar     baidu.editor.browser.safari
     * @return     {Boolean}    返回是否为safari浏览器
     */
    if(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)){
    	browser.safari = + (RegExp['\x241'] || RegExp['\x242']);
    }


    // Opera 9.50+
    if ( browser.opera )
        version = parseFloat( opera.version() );

    // WebKit 522+ (Safari 3+)
    if ( browser.webkit )
        version = parseFloat( agent.match( / applewebkit\/(\d+)/ )[1] );

    /**
     * 浏览器版本
     *
     * gecko内核浏览器的版本会转换成这样(如 1.9.0.2 -> 10900).
     *
     * webkit内核浏览器版本号使用其build号 (如 522).
     * @name baidu.editor.browser.version
     * @grammar     baidu.editor.browser.version
     * @return     {Boolean}    返回浏览器版本号
     * @example
     * if ( baidu.editor.browser.ie && <b>baidu.editor.browser.version</b> <= 6 )
     *     alert( "Ouch!" );
     */
    browser.version = version;

    /**
     * 是否是兼容模式的浏览器
     * @name baidu.editor.browser.isCompatible
     * @grammar     baidu.editor.browser.isCompatible
     * @return     {Boolean}    返回是否是兼容模式的浏览器
     * @example
     * if ( baidu.editor.browser.isCompatible )
     *     alert( "Your browser is pretty cool!" );
     */
    browser.isCompatible =
        !browser.mobile && (
        ( browser.ie && version >= 6 ) ||
        ( browser.gecko && version >= 10801 ) ||
        ( browser.opera && version >= 9.5 ) ||
        ( browser.air && version >= 1 ) ||
        ( browser.webkit && version >= 522 ) ||
        false );
    return browser;
}();

///import editor.js
///import core/utils.js
/**
 * @class baidu.editor.utils     工具类
 */

(function (){
    baidu.editor.utils = {};
    var noop = new Function();
    var utils = baidu.editor.utils = /**@lends baidu.editor.utils.prototype*/{
        /**
         * 以obj为原型创建实例
         * @public
         * @function
         * @param {Object} obj
         * @return {Object} 返回新的对象
         */
        makeInstance : function ( obj ) {
            noop.prototype = obj;
            obj = new noop;
            noop.prototype = null;
            return obj;
        },
        /**
         * 判断是否为数组
         * @public
         * @function
         * @param {Object} array
         * @return {Boolean} true：为数组，false：不为数组
         */
        isArray : function (array){
            return array && array.constructor === Array;
        },
        /**
         * 判断是否为字符串
         * @public
         * @function
         * @param {Object} str
         * @return {Boolean} true：为字符串。 false：不为字符串
         */
        isString : function(str){
            return typeof str == 'string' || str.constructor == String;
        },
        /**
         * 遍历元素执行迭代器
         * @public
         * @function
         * @param {Array|Object} eachable    要迭代的对象
         * @param {Function} iterator        迭代函数
         * @param {Object} this_             传入对象
         */
        each: function (eachable, iterator, this_){
            if (utils.isArray(eachable)) {
                for (var i=0; i<eachable.length; i++) {
                    iterator.call(this_, eachable[i], i, eachable);
                }
            } else {
                for (var k in eachable) {
                    iterator.call(this_, eachable[k], k, eachable);
                }
            }
        },
        /**
         * subClass继承superClass
         * @public
         * @function
         * @param {Object} subClass       子类
         * @param {Object} superClass    超类
         * @return    {Object}    扩展后的新对象
         */
        inherits : function ( subClass, superClass ) {
            var oldP = subClass.prototype;
            var newP = utils.makeInstance( superClass.prototype );
            utils.extend( newP, oldP, true );
            subClass.prototype = newP;
            return ( newP.constructor = subClass );
        },

        /**
         * 为对象绑定函数
         * @public
         * @function
         * @param {Function} fn        函数
         * @param {Object} this_       对象
         * @return {Function}  绑定后的函数
         */
        bind : function ( fn, this_ ) {
            return function () {
                return fn.apply( this_, arguments );
            };
        },

        /**
         * 创建延迟执行的函数
         * @public
         * @function
         * @param {Function} fn       要执行的函数
         * @param {Number} delay      延迟时间，单位为毫秒
         * @param {Boolean} exclusion 是否互斥执行，true则执行下一次defer时会先把前一次的延迟函数删除
         * @return {Function}    延迟执行的函数
         */
        defer : function ( fn, delay, exclusion ){
            var timerID;
            return function () {
                if ( exclusion ) {
                    clearTimeout( timerID );
                }
                timerID = setTimeout( fn, delay );
            };
        },

        /**
         * 将s对象中的属性扩展到t对象上
         * @public
         * @function
         * @param {Object} t
         * @param {Object} s
         * @param {Boolean} b 是否保留已有属性
         * @returns {Object}  t 返回扩展了s对象属性的t
         */
        extend : function ( t, s, b ) {
            if (s) {
                for ( var k in s ) {
                    if (!b || !t.hasOwnProperty(k)) {
                        t[k] = s[k];
                    }
                }
            }
            return t;
        },

        /**
         * 查找元素在数组中的索引, 若找不到返回-1
         * @public
         * @function
         * @param {Array} array     要查找的数组
         * @param {*} item          查找的元素
         * @param {Number} at       开始查找的位置
         * @returns {Number}        返回在数组中的索引
         */
        indexOf : function ( array, item, at ) {
            at = at || 0;
            while ( at < array.length ) {
                if ( array[at] === item ) {
                    return at;
                }
                at ++;
            }
            return -1;
        },

        /**
         * 移除数组中的元素
         * @public
         * @function
         * @param {Array} array       要删除元素的数组
         * @param {*} item            要删除的元素
         */
        removeItem : function ( array, item ) {
            var k = array.length;
            if ( k ) while ( k -- ) {
                if ( array[k] === item ) {
                    array.splice(k, 1);
                    break;
                }
            }
        },

        /**
         * 删除字符串首尾空格
         * @public
         * @function
         * @param {String} str        字符串
         * @return {String} str       删除空格后的字符串
         */
        trim : function () {
            // "non-breaking spaces" 就是&nbsp;不能被捕获，所以不用\s
            var trimRegex = /(^[ \t\n\r]+)|([ \t\n\r]+$)/g;
            return function ( str ) {
                return str.replace( trimRegex, '' ) ;
            };
        }(),

        /**
         * 将字符串转换成hashmap
         * @public
         * @function
         * @param {String} list       字符串，以‘，’隔开
         * @returns {Object}          转成hashmap的对象
         */
        listToMap : function ( list ) {
            if ( !list ) {
                return {};
            }
            var array = list.split( /,/g ),
                k = array.length,
                map = {};
            if ( k ) while ( k -- ) {
                map[array[k]] = 1;
            }
            return map;
        },

        /**
         * 将str中的html符号转义
         * @public
         * @function
         * @param {String} str      需要转义的字符串
         * @returns {String}        转义后的字符串
         */
        unhtml: function () {
            var map = { '<': '&lt;', '&': '&amp', '"': '&quot;', '>': '&gt;' };
            function rep( m ){ return map[m]; }
            return function ( str ) {
                return str ? str.replace( /[&<">]/g, rep ) : '';
            };
        }(),

        /**
         * 将css样式转换为驼峰的形式。如font-size -> fontSize
         * @public
         * @function
         * @param {String} cssName      需要转换的样式
         * @returns {String}        转换后的样式
         */
        cssStyleToDomStyle : function(){
			var test = document.createElement( 'div' ).style,
				cssFloat =  test.cssFloat != undefined  ? 'cssFloat'
				: test.styleFloat != undefined ? 'styleFloat'
				: 'float',
                cache = { 'float': cssFloat };
            function replacer( match ){ return match.charAt( 1 ).toUpperCase(); }
			return function( cssName ) {
                return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace( /-./g, replacer ) );
			};
		}()
    };
})();

///import editor.js
///import core/utils.js
(function () {
    baidu.editor.EventBase = EventBase;

    var utils = baidu.editor.utils;

    /**
     * 事件基础类
     * @public
     * @class
     * @name baidu.editor.EventBase
     */
    function EventBase() {

    }

    EventBase.prototype = /**@lends baidu.editor.EventBase.prototype*/{
        /**
         * 注册事件监听器
         * @public
         * @function
         * @param {String} type 事件名
         * @param {Function} listener 监听器数组
         */
        addListener : function ( type, listener ) {
            getListener( this, type, true ).push( listener );
        },
        /**
         * 移除事件监听器
         * @public
         * @function
         * @param {String} type 事件名
         * @param {Function} listener 监听器数组
         */
        removeListener : function ( type, listener ) {
            var listeners = getListener( this, type );
            listeners && utils.removeItem( listeners, listener );
        },
        /**
         * 触发事件
         * @public
         * @function
         * @param {String} type 事件名
         * 
         */
        fireEvent : function ( type ) {
            var listeners = getListener( this, type ),
                r, t, k;
            if ( listeners ) {

                k = listeners.length;
                while ( k -- ) {

                    t = listeners[k].apply( this, arguments );
                    if ( t !== undefined ) {
                        r = t;
                    }

                }
                
            }
            if ( t = this['on' + type.toLowerCase()] ) {
                r = t.apply( this, arguments );
            }
            return r;
        }
    };
    /**
     * 获得对象所拥有监听类型的所有监听器
     * @public
     * @function
     * @param {Object} obj  查询监听器的对象
     * @param {String} type 事件类型
     * @param {Boolean} force  为true且当前所有type类型的侦听器不存在时，创建一个空监听器数组
     * @returns {Array} 监听器数组
     */
    function getListener( obj, type, force ) {
        var allListeners;
        type = type.toLowerCase();
        return ( ( allListeners = ( obj.__allListeners || force && ( obj.__allListeners = {} ) ) )
            && ( allListeners[type] || force && ( allListeners[type] = [] ) ) );
    }
})();

///import editor.js
//注册命名空间
/**
 * @class baidu.editor.dom
 */
baidu.editor.dom = baidu.editor.dom || {};
///import editor.js
///import core/dom/dom.js
/**
 * dtd html语义化的体现类
 * @constructor
 * @namespace dtd
 */
baidu.editor.dom.dtd = (function() {
    function _( s ) {
        for (var k in s) {
            s[k.toUpperCase()] = s[k];
        }
        return s;
    }
    function X( t ) {
        var a = arguments;
        for ( var i=1; i<a.length; i++ ) {
            var x = a[i];
            for ( var k in x ) {
                if (!t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    }
    var A = _({isindex:1,fieldset:1}),
        B = _({input:1,button:1,select:1,textarea:1,label:1}),
        C = X( _({a:1}), B ),
        D = X( {iframe:1}, C ),
        E = _({hr:1,ul:1,menu:1,div:1,blockquote:1,noscript:1,table:1,center:1,address:1,dir:1,pre:1,h5:1,dl:1,h4:1,noframes:1,h6:1,ol:1,h1:1,h3:1,h2:1}),
        F = _({ins:1,del:1,script:1,style:1}),
        G = X( _({b:1,acronym:1,bdo:1,'var':1,'#':1,abbr:1,code:1,br:1,i:1,cite:1,kbd:1,u:1,strike:1,s:1,tt:1,strong:1,q:1,samp:1,em:1,dfn:1,span:1}), F ),
        H = X( _({sub:1,img:1,embed:1,object:1,sup:1,basefont:1,map:1,applet:1,font:1,big:1,small:1}), G ),
        I = X( _({p:1}), H ),
        J = X( _({iframe:1}), H, B ),
        K = _({img:1,embed:1,noscript:1,br:1,kbd:1,center:1,button:1,basefont:1,h5:1,h4:1,samp:1,h6:1,ol:1,h1:1,h3:1,h2:1,form:1,font:1,'#':1,select:1,menu:1,ins:1,abbr:1,label:1,code:1,table:1,script:1,cite:1,input:1,iframe:1,strong:1,textarea:1,noframes:1,big:1,small:1,span:1,hr:1,sub:1,bdo:1,'var':1,div:1,object:1,sup:1,strike:1,dir:1,map:1,dl:1,applet:1,del:1,isindex:1,fieldset:1,ul:1,b:1,acronym:1,a:1,blockquote:1,i:1,u:1,s:1,tt:1,address:1,q:1,pre:1,p:1,em:1,dfn:1}),

        L = X( _({a:0}), J ),//a不能被切开，所以把他
        M = _({tr:1}),
        N = _({'#':1}),
        O = X( _({param:1}), K ),
        P = X( _({form:1}), A, D, E, I ),
        Q = _({li:1}),
        R = _({style:1,script:1}),
        S = _({base:1,link:1,meta:1,title:1}),
        T = X( S, R ),
        U = _({head:1,body:1}),
        V = _({html:1});

    var block = _({address:1,blockquote:1,center:1,dir:1,div:1,dl:1,fieldset:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,hr:1,isindex:1,menu:1,noframes:1,ol:1,p:1,pre:1,table:1,ul:1}),
        empty =  _({area:1,base:1,br:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1});
    
    return  _({

        // $ 表示自定的属性

        // body外的元素列表.
        $nonBodyContent: X( V, U, S ),

        //块结构元素列表
        $block : block,

        //内联元素列表
        $inline : L,

        $body : X( _({script:1,style:1}), block ),

        $cdata : _({script:1,style:1}),

        //自闭和元素
        $empty : empty,

        //不是自闭合，但不能让range选中里边
        $nonChild : _({iframe:1}),
        //列表元素列表
        $listItem : _({dd:1,dt:1,li:1}),

        //列表根元素列表
        $list: _({ul:1,ol:1,dl:1}),

        //不能认为是空的元素
        $isNotEmpty : _({table:1,ul:1,ol:1,dl:1,iframe:1,area:1,base:1,col:1,hr:1,img:1,embed:1,input:1,link:1,meta:1,param:1}),

        //如果没有子节点就可以删除的元素列表，像span,a
        $removeEmpty : _({a:1,abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1}),

        //在table元素里的元素列表
        $tableContent : _({caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1,table:1}),

        html: U,
        head: T,
        style: N,
        script: N,
        body: P,
        base: {},
        link: {},
        meta: {},
        title: N,
        col : {},
        tr : _({td:1,th:1}),
        img : {},
        embed: {},
        colgroup : _({thead:1,col:1,tbody:1,tr:1,tfoot:1}),
        noscript : P,
        td : P,
        br : {},
        th : P,
        center : P,
        kbd : L,
        button : X( I, E ),
        basefont : {},
        h5 : L,
        h4 : L,
        samp : L,
        h6 : L,
        ol : Q,
        h1 : L,
        h3 : L,
        option : N,
        h2 : L,
        form : X( A, D, E, I ),
        select : _({optgroup:1,option:1}),
        font : L,
        ins : L,
        menu : Q,
        abbr : L,
        label : L,
        table : _({thead:1,col:1,tbody:1,tr:1,colgroup:1,caption:1,tfoot:1}),
        code : L,
        tfoot : M,
        cite : L,
        li : P,
        input : {},
        iframe : P,
        strong : L,
        textarea : N,
        noframes : P,
        big : L,
        small : L,
        span :{'#':1},
        hr : L,
        dt : L,
        sub : L,
        optgroup : _({option:1}),
        param : {},
        bdo : L,
        'var' : L,
        div : P,
        object : O,
        sup : L,
        dd : P,
        strike : L,
        area : {},
        dir : Q,
        map : X( _({area:1,form:1,p:1}), A, F, E ),
        applet : O,
        dl : _({dt:1,dd:1}),
        del : L,
        isindex : {},
        fieldset : X( _({legend:1}), K ),
        thead : M,
        ul : Q,
        acronym : L,
        b : L,
        a : X( _({a:1}), J ),
        blockquote :X(_({td:1,tr:1,tbody:1,li:1}),P),
        caption : L,
        i : L,
        u : L,
        tbody : M,
        s : L,
        address : X( D, I ),
        tt : L,
        legend : L,
        q : L,
        pre : X( G, C ),
        p : X(_({'a':1}),L),
        em :L,
        dfn : L
    });
})();

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
        findParentByTagName : function(node, tagName, includeSelf) {
            if (node && node.nodeType && !this.isBody(node) && (node.nodeType == 1 || node.nodeType)) {
                tagName = !utils.isArray(tagName) ? [tagName] : tagName;
                node = node.nodeType == 3 || !includeSelf ? node.parentNode : node;
                while (node && node.tagName && node.nodeType != 9) {

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
                    var attrValue = attr && attr.nodeValue || null;
                    if (attrValue != thisAttr.nodeValue) {
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
                    utils.extend(blockBoundaryNodeNameMatch, customNodeNames || {})[ node.tagName.toLocaleLowerCase() ]);
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
                    node.unselectable = 'on';
                    for (var i = 0,ci; ci = node.all[i++];) {
                        switch (ci.tagName.toLowerCase()) {
                            case 'iframe' :
                            case 'textarea' :
                            case 'input' :
                            case 'select' :

                                break;
                            default :
                                ci.unselectable = 'on';
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
            if (browser.ie && styleName == 'font-size' && !dtd.$empty[element.tagName] && !dtd.$nonChild[element.tagName]) {
                var span = element.ownerDocument.createElement('span');
                span.style.cssText = 'padding:0;border:0;';
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
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
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
                node.className = ''
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
                while(pre && domUtils.isFillChar(pre)){
                    tmpNode = pre;
                    pre = pre.previousSibling;

                }
                if(tmpNode){
                    tmpRange.setStartBefore(tmpNode);
                }else
                    tmpRange.setStartBefore(tmpRange.startContainer);

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
        }

    };
})();

///import editor.js
///import core/utils.js
///import core/browser.js
///import core/dom/dom.js
///import core/dom/dtd.js
///import core/dom/domUtils.js
/**
 * @class baidu.editor.dom.Range    Range类
 */
baidu.editor.dom.Range = baidu.editor.dom.Range || {};
/**
 * @description Range类实现
 * @author zhanyi
 */
(function() {
    var editor = baidu.editor,
        browser = editor.browser,
        domUtils = editor.dom.domUtils,
        dtd = editor.dom.dtd,
        utils = editor.utils,
        guid = 0,
        fillChar = domUtils.fillChar;


    /**
     * 更新range的collapse状态
     * @param  {Range}   range    range对象
     */
    var updateCollapse = function( range ) {
        range.collapsed =
            range.startContainer && range.endContainer &&
                range.startContainer === range.endContainer &&
                range.startOffset == range.endOffset;
    },
    
    setEndPoint = function( toStart, node, offset, range ) {
        //如果node是自闭合标签要处理
        if ( node.nodeType == 1 && (dtd.$empty[node.tagName] || dtd.$nonChild[node.tagName])) {
            offset = domUtils.getNodeIndex( node ) + (toStart ? 0 : 1);
            node = node.parentNode;
        }
        if ( toStart ) {
            range.startContainer = node;
            range.startOffset = offset;
            if ( !range.endContainer ) {
                range.collapse( true );
            }
        } else {
            range.endContainer = node;
            range.endOffset = offset;
            if ( !range.startContainer ) {
                range.collapse( false );
            }
        }
        updateCollapse( range );
        return range;
    },
    execContentsAction = function( range, action ) {
        //调整边界
        //range.includeBookmark();

        var start = range.startContainer,
            end = range.endContainer,
            startOffset = range.startOffset,
            endOffset = range.endOffset,
            doc = range.document,
            frag = doc.createDocumentFragment(),
            tmpStart,tmpEnd;

        if ( start.nodeType == 1 ) {
            start = start.childNodes[startOffset] || (tmpStart = start.appendChild( doc.createTextNode( '' ) ));
        }
        if ( end.nodeType == 1 ) {
            end = end.childNodes[endOffset] || (tmpEnd = end.appendChild( doc.createTextNode( '' ) ));
        }

        if ( start === end && start.nodeType == 3 ) {

            frag.appendChild( doc.createTextNode( start.substringData( startOffset, endOffset - startOffset ) ) );
            //is not clone
            if ( action ) {
                start.deleteData( startOffset, endOffset - startOffset );
                range.collapse( true );
            }

            return frag;
        }


        var current,currentLevel,clone = frag,
            startParents = domUtils.findParents( start, true ),endParents = domUtils.findParents( end, true );
        for ( var i = 0; startParents[i] == endParents[i]; i++ );


        for ( var j = i,si; si = startParents[j]; j++ ) {
            current = si.nextSibling;
            if ( si == start ) {
                if ( !tmpStart ) {
                    if ( range.startContainer.nodeType == 3 ) {
                        clone.appendChild( doc.createTextNode( start.nodeValue.slice( startOffset ) ) );
                        //is not clone
                        if ( action ) {
                            start.deleteData( startOffset, start.nodeValue.length - startOffset );

                        }
                    } else {
                        clone.appendChild( !action ? start.cloneNode( true ) : start );
                    }
                }

            } else {
                currentLevel = si.cloneNode( false );
                clone.appendChild( currentLevel );
            }


            while ( current ) {
                if ( current === end || current === endParents[j] )break;
                si = current.nextSibling;
                clone.appendChild( !action ? current.cloneNode( true ) : current );


                current = si;
            }
            clone = currentLevel;

        }


        clone = frag;

        if ( !startParents[i] ) {
            clone.appendChild( startParents[i - 1].cloneNode( false ) );
            clone = clone.firstChild;
        }
        for ( var j = i,ei; ei = endParents[j]; j++ ) {
            current = ei.previousSibling;
            if ( ei == end ) {
                if ( !tmpEnd && range.endContainer.nodeType == 3 ) {
                    clone.appendChild( doc.createTextNode( end.substringData( 0, endOffset ) ) );
                    //is not clone
                    if ( action ) {
                        end.deleteData( 0, endOffset );

                    }
                }


            } else {
                currentLevel = ei.cloneNode( false );
                clone.appendChild( currentLevel );
            }
            //如果两端同级，右边第一次已经被开始做了
            if ( j != i || !startParents[i] ) {
                while ( current ) {
                    if ( current === start )break;
                    ei = current.previousSibling;
                    clone.insertBefore( !action ? current.cloneNode( true ) : current, clone.firstChild );


                    current = ei;
                }

            }
            clone = currentLevel;
        }


        if ( action ) {
            range.setStartBefore( !endParents[i] ? endParents[i - 1] : !startParents[i] ? startParents[i - 1] : endParents[i] ).collapse( true )
        }
        tmpStart && domUtils.remove( tmpStart );
        tmpEnd && domUtils.remove( tmpEnd );
        return frag;
    };


    /**
     * Range类
     * @param {Document} document 编辑器页面document对象
     */
    var Range = baidu.editor.dom.Range = function( document ) {
        var me = this;
        me.startContainer =
            me.startOffset =
                me.endContainer =
                    me.endOffset = null;
        me.document = document;
        me.collapsed = true;
    };
    /**
     * 删除内容为空的祖先节点
     * @function
     * @param    {Node}    node     节点
     */
    function removeFillDataWithEmptyParentNode(node){
         var parent = node.parentNode,
            tmpNode;
            domUtils.remove( node );
            while(parent && dtd.$removeEmpty[parent.tagName] && parent.childNodes.length == 0){
                tmpNode = parent;
                domUtils.remove(parent);
                parent = tmpNode.parentNode;
            }
    }
    Range.prototype = {
        /**
         * 克隆选中的内容到一个fragment里
         * @public
         * @function
         * @name    baidu.editor.dom.Range.cloneContents
         * @return {Fragment}    frag|null 返回选中内容的文本片段或者空
         */
        cloneContents : function() {
            return this.collapsed ? null : execContentsAction( this, 0 );
        },
        /**
         * 删除所选内容
         * @public
         * @function
         * @name    baidu.editor.dom.Range.deleteContents
         * @return {Range}    删除选中内容后的Range
         */
        deleteContents : function() {
            if ( !this.collapsed )
                execContentsAction( this, 1 );
            if(browser.webkit){
                var txt = this.startContainer;
                if(txt.nodeType == 3 && !txt.nodeValue.length){

                    this.setStartBefore(txt).collapse(true);
                    domUtils.remove(txt)
                }
            }
            return this;
        },
        /**
         * 取出内容
         * @public
         * @function
         * @name    baidu.editor.dom.Range.extractContents
         * @return {String}    获得Range选中的内容
         */
        extractContents : function() {
            return this.collapsed ? null : execContentsAction( this, 2 );
        },
        /**
         * 设置range的开始位置
         * @public
         * @function
         * @name    baidu.editor.dom.Range.setStart
         * @param    {Node}     node     range开始节点
         * @param    {Number}   offset   偏移量
         * @return   {Range}    返回Range
         */
        setStart : function( node, offset ) {
            return setEndPoint( true, node, offset, this );
        },
        /**
         * 设置range结束点的位置
         * @public
         * @function
         * @name    baidu.editor.dom.Range.setEnd
         * @param    {Node}     node     range结束节点
         * @param    {Number}   offset   偏移量
         * @return   {Range}    返回Range
         */
        setEnd : function( node, offset ) {
            return setEndPoint( false, node, offset, this );
        },
        /**
         * 将开始位置设置到node后
         * @public
         * @function
         * @name    baidu.editor.dom.Range.setStartAfter
         * @param    {Node}     node     节点
         * @return   {Range}    返回Range
         */
        setStartAfter : function( node ) {
            return this.setStart( node.parentNode, domUtils.getNodeIndex( node ) + 1 );
        },
        /**
         * 将开始位置设置到node前
         * @public
         * @function
         * @name    baidu.editor.dom.Range.setStartBefore
         * @param    {Node}     node     节点
         * @return   {Range}    返回Range
         */
        setStartBefore : function( node ) {
            return this.setStart( node.parentNode, domUtils.getNodeIndex( node ) );
        },
        /**
         * 将结束点位置设置到node后
         * @public
         * @function
         * @name    baidu.editor.dom.Range.setEndAfter
         * @param    {Node}     node     节点
         * @return   {Range}    返回Range
         */
        setEndAfter : function( node ) {
            return this.setEnd( node.parentNode, domUtils.getNodeIndex( node ) + 1 );
        },
        /**
         * 将结束点位置设置到node前
         * @public
         * @function
         * @name    baidu.editor.dom.Range.setEndBefore
         * @param    {Node}     node     节点
         * @return   {Range}    返回Range
         */
        setEndBefore : function( node ) {
            return this.setEnd( node.parentNode, domUtils.getNodeIndex( node ) );
        },
        /**
         * 选中指定节点
         * @public
         * @function
         * @name    baidu.editor.dom.Range.selectNode
         * @param    {Node}     node     节点
         * @return   {Range}    返回Range
         */
        selectNode : function( node ) {
            return this.setStartBefore( node ).setEndAfter( node );
        },
        /**
         * 选中node下的所有节点
         * @public
         * @function
         * @name    baidu.editor.dom.Range.selectNodeContents
         * @param {Element} node 要设置的节点
         * @return   {Range}    返回Range
         */
        selectNodeContents : function( node ) {
            return this.setStart( node, 0 ).setEnd( node, node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length );
        },

        /**
         * 克隆range
         * @public
         * @function
         * @name    baidu.editor.dom.Range.cloneRange
         * @return {Range} 克隆的range对象
         */
        cloneRange : function() {
            var me = this,range = new Range( me.document );
            return range.setStart( me.startContainer, me.startOffset ).setEnd( me.endContainer, me.endOffset );

        },

        /**
         * 让选区闭合
         * @public
         * @function
         * @name    baidu.editor.dom.Range.collapse
         * @param {Boolean} toStart 是否在选区开始位置闭合选区，true在开始位置闭合，false反之
         * @return {Range}  range对象
         */
        collapse : function( toStart ) {
            var me = this;
            if ( toStart ) {
                me.endContainer = me.startContainer;
                me.endOffset = me.startOffset;
            }
            else {
                me.startContainer = me.endContainer;
                me.startOffset = me.endOffset;
            }

            me.collapsed = true;
            return me;
        },
        /**
         * 调整range的边界，“缩”到合适的位置
         * @public
         * @function
         * @name    baidu.editor.dom.Range.shrinkBoundary
         * @param    {Boolean}     ignoreEnd      是否考虑前面的元素
         */
        shrinkBoundary : function( ignoreEnd ) {
            var me = this,child,
                collapsed = me.collapsed;
            while ( me.startContainer.nodeType == 1 //是element
                && (child = me.startContainer.childNodes[me.startOffset]) //子节点也是element
                && child.nodeType == 1  && !domUtils.isBookmarkNode(child)
                && !dtd.$empty[child.tagName] && !dtd.$nonChild[child.tagName] ) {
                me.setStart( child, 0 );
            }
            if ( collapsed )
                return me.collapse( true );
            if ( !ignoreEnd ) {
                while ( me.endContainer.nodeType == 1//是element
                    && me.endOffset > 0 //如果是空元素就退出 endOffset=0那么endOffst-1为负值，childNodes[endOffset]报错
                    && (child = me.endContainer.childNodes[me.endOffset - 1]) //子节点也是element
                    && child.nodeType == 1 && !domUtils.isBookmarkNode(child)
                    && !dtd.$empty[child.tagName] && !dtd.$nonChild[child.tagName]) {
                    me.setEnd( child, child.childNodes.length );
                }
            }

            return me;
        },
        /**
         * 找到startContainer和endContainer的公共祖先节点
         * @public
         * @function
         * @name    baidu.editor.dom.Range.getCommonAncestor
         * @param {Boolean} includeSelf 是否包含自身
         * @param {Boolean} ignoreTextNode 是否忽略文本节点
         * @return   {Node}   祖先节点
         */
        getCommonAncestor : function( includeSelf, ignoreTextNode ) {
            var start = this.startContainer,
                end = this.endContainer;
            if ( start === end ) {
                if ( includeSelf && start.nodeType == 1 && this.startOffset == this.endOffset - 1 ) {
                    return start.childNodes[this.startOffset];
                }
                //只有在上来就相等的情况下才会出现是文本的情况
                return ignoreTextNode && start.nodeType == 3 ? start.parentNode : start;
            }
            return domUtils.getCommonAncestor( start, end );

        },
        /**
         * 切割文本节点，将边界扩大到element
         * @public
         * @function
         * @name    baidu.editor.dom.Range.trimBoundary
         * @param {Boolean}  ignoreEnd    为真就不处理结束边界
         * @return {Range}    range对象
         * @example <b>|xxx</b>
         * startContainer = xxx; startOffset = 0
         * 执行后
         * startContainer = <b>;  startOffset = 0
         * @example <b>xx|x</b>
         * startContainer = xxx;  startOffset = 2
         * 执行后
         * startContainer = <b>; startOffset = 1  因为将xxx切割成2个节点了
         */
        trimBoundary : function( ignoreEnd ) {
            this.txtToElmBoundary();
            var start = this.startContainer,
                offset = this.startOffset,
                collapsed = this.collapsed,
                end = this.endContainer;
            if ( start.nodeType == 3 ) {
                if ( offset == 0 ) {
                    this.setStartBefore( start )
                } else {
                    if ( offset >= start.nodeValue.length ) {
                        this.setStartAfter( start );
                    } else {
                        var textNode = domUtils.split( start, offset );
                        //跟新结束边界
                        if ( start === end )
                            this.setEnd( textNode, this.endOffset - offset );
                        else if ( start.parentNode === end )
                            this.endOffset += 1;
                        this.setStartBefore( textNode );
                    }
                }
                if ( collapsed ) {
                    return this.collapse( true );
                }
            }
            if ( !ignoreEnd ) {
                offset = this.endOffset;
                end = this.endContainer;
                if ( end.nodeType == 3 ) {
                    if ( offset == 0 ) {
                        this.setEndBefore( end );
                    } else {
                        if ( offset >= end.nodeValue.length ) {
                            this.setEndAfter( end );
                        } else {
                            domUtils.split( end, offset );
                            this.setEndAfter( end );
                        }
                    }

                }
            }
            return this;
        },
        /**
         * 如果选区在文本的边界上，就扩展选区到文本的父节点上
         * @public
         * @function
         * @name    baidu.editor.dom.Range.txtToElmBoundary
         * @return {Range}    range对象
         * @example <b> |xxx</b>
         * startContainer = xxx;  startOffset = 0
         * 执行后
         * startContainer = <b>; startOffset = 0
         * @example <b> xxx| </b>
         * startContainer = xxx; startOffset = 3
         * 执行后
         * startContainer = <b>; startOffset = 1
         */
        txtToElmBoundary : function() {
            function adjust( r, c ) {
                var container = r[c + 'Container'],
                    offset = r[c + 'Offset'];
                if ( container.nodeType == 3 ) {
                    if ( !offset ) {
                        r['set' + c.replace( /(\w)/, function( a ) {
                            return a.toUpperCase()
                        } ) + 'Before']( container )
                    } else if ( offset >= container.nodeValue.length ) {
                        r['set' + c.replace( /(\w)/, function( a ) {
                            return a.toUpperCase()
                        } ) + 'After' ]( container )
                    }
                }
            }

            if ( !this.collapsed ) {
                adjust( this, 'start' );
                adjust( this, 'end' );
            }

            return this;
        },

        /**
         * 在当前选区的开始位置前插入一个节点或者fragment
         * @public
         * @function
         * @name    baidu.editor.dom.Range.insertNode
         * @param {Node/DocumentFragment}    node    要插入的节点或fragment
         * @return  {Range}    返回range对象
         */
        insertNode : function( node ) {
            var first = node,length = 1;
            if ( node.nodeType == 11 ) {
                first = node.firstChild;
                length = node.childNodes.length;
            }


            this.trimBoundary( true );

            var start = this.startContainer,
                offset = this.startOffset;

            var nextNode = start.childNodes[ offset ];

            if ( nextNode ) {
                start.insertBefore( node, nextNode );

            }
            else {
                start.appendChild( node );
            }


            if ( first.parentNode === this.endContainer ) {
                this.endOffset = this.endOffset + length;
            }


            return this.setStartBefore( first );
        },
        /**
         * 设置光标位置
         * @public
         * @function
         * @name    baidu.editor.dom.Range.setCursor
         * @param {Boolean}   toEnd   true为闭合到选区的结束位置后，false为闭合到选区的开始位置前
         * @return  {Range}    返回range对象
         */
        setCursor : function( toEnd ,notFillData) {
            return this.collapse( toEnd ? false : true ).select(notFillData);
        },
        /**
         * 创建书签
         * @public
         * @function
         * @name    baidu.editor.dom.Range.createBookmark
         * @param {Boolean}   serialize    true：为true则返回对象中用id来分别表示书签的开始和结束节点
         * @param  {Boolean}   same        true：是否采用唯一的id，false将会为每一个标签产生一个唯一的id
         * @returns {Object} bookmark对象
         */
        createBookmark : function( serialize, same ) {
            var endNode,
                startNode = this.document.createElement( 'span' );
            startNode.style.cssText = 'display:none;line-height:0px;';
            startNode.appendChild( this.document.createTextNode( '\uFEFF' ) );
            startNode.id = '_baidu_bookmark_start_' + (same ? '' : guid++);

            if ( !this.collapsed ) {
                endNode = startNode.cloneNode( true );
                endNode.id = '_baidu_bookmark_end_' + (same ? '' : guid++);
            }
            this.insertNode( startNode );

            if ( endNode ) {
                this.collapse( false ).insertNode( endNode );
                this.setEndBefore( endNode )
            }
            this.setStartAfter( startNode );

            return {
                start : serialize ? startNode.id : startNode,
                end : endNode ? serialize ? endNode.id : endNode : null,
                id : serialize
            }
        },
        /**
         *  移动边界到书签，并删除书签
         *  @public
         *  @function
         *  @name    baidu.editor.dom.Range.moveToBookmark
         *  @params {Object} bookmark对象
         *  @returns {Range}    Range对象
         */
        moveToBookmark : function( bookmark ) {
            var start = bookmark.id ? this.document.getElementById( bookmark.start ) : bookmark.start,
                end = bookmark.end && bookmark.id ? this.document.getElementById( bookmark.end ) : bookmark.end;
            this.setStartBefore( start );
            domUtils.remove( start );
            if ( end ) {
                this.setEndBefore( end );
                domUtils.remove( end )
            } else {
                this.collapse( true );
            }

            return this;
        },
        /**
         * 调整边界到一个block元素上，或者移动到最大的位置
         * @public
         * @function
         * @name    baidu.editor.dom.Range.enlarge
         * @params {Boolean}  toBlock    扩展到block元素
         * @params {Function} stopFn      停止函数，若返回true，则不再扩展
         * @return   {Range}    Range对象
         */
        enlarge : function( toBlock, stopFn ) {
            var isBody = domUtils.isBody,
                pre,node,tmp = this.document.createTextNode( '' );
            if ( toBlock ) {
                node = this.startContainer;
                if ( node.nodeType == 1 ) {
                    if ( node.childNodes[this.startOffset] ) {
                        pre = node = node.childNodes[this.startOffset]
                    } else {
                        node.appendChild( tmp );
                        pre = node = tmp;
                    }
                } else {
                    pre = node;
                }

                while ( 1 ) {
                    if ( domUtils.isBlockElm( node ) ) {
                        node = pre;
                        while ( (pre = node.previousSibling) && !domUtils.isBlockElm( pre ) ) {
                            node = pre;
                        }
                        this.setStartBefore( node );

                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                node = this.endContainer;
                if ( node.nodeType == 1 ) {
                    if(pre = node.childNodes[this.endOffset]) {
                        node.insertBefore( tmp, pre );
                    }else{
                        node.appendChild(tmp)
                    }

                    pre = node = tmp;
                } else {
                    pre = node;
                }

                while ( 1 ) {
                    if ( domUtils.isBlockElm( node ) ) {
                        node = pre;
                        while ( (pre = node.nextSibling) && !domUtils.isBlockElm( pre ) ) {
                            node = pre;
                        }
                        this.setEndAfter( node );

                        break;
                    }
                    pre = node;
                    node = node.parentNode;
                }
                if ( tmp.parentNode === this.endContainer ) {
                    this.endOffset--;
                }
                domUtils.remove( tmp )
            }

            // 扩展边界到最大
            if ( !this.collapsed ) {
                while ( this.startOffset == 0 ) {
                    if ( stopFn && stopFn( this.startContainer ) )
                        break;
                    if ( isBody( this.startContainer ) )break;
                    this.setStartBefore( this.startContainer );
                }
                while ( this.endOffset == (this.endContainer.nodeType == 1 ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) ) {
                    if ( stopFn && stopFn( this.endContainer ) )
                        break;
                    if ( isBody( this.endContainer ) )break;

                    this.setEndAfter( this.endContainer )
                }
            }

            return this;
        },
        /**
         * 调整边界
         * @public
         * @function
         * @name    baidu.editor.dom.Range.adjustmentBoundary
         * @return   {Range}    Range对象
         * @example
         * <b>xx[</b>xxxxx] ==> <b>xx</b>[xxxxx]
         * <b>[xx</b><i>]xxx</i> ==> <b>[xx</b>]<i>xxx</i>
         *
         */
        adjustmentBoundary : function() {
            if(!this.collapsed){
                while ( !domUtils.isBody( this.startContainer ) &&
                    this.startOffset == this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length
                ) {
                    this.setStartAfter( this.startContainer );
                }
                while ( !domUtils.isBody( this.endContainer ) && !this.endOffset ) {
                    this.setEndBefore( this.endContainer );
                }
            }
            return this;
        },
        /**
         * 给选区中的内容加上inline样式
         * @public
         * @function
         * @name    baidu.editor.dom.Range.applyInlineStyle
         * @param {String} tagName 标签名称
         * @param {Object} attrObj 属性
         * @return   {Range}    Range对象
         */
        applyInlineStyle : function( tagName, attrs ,list) {
            
            if(this.collapsed)return this;
            this.trimBoundary().enlarge( false,
                function( node ) {
                    return node.nodeType == 1 && domUtils.isBlockElm( node )
                } ).adjustmentBoundary();


            var bookmark = this.createBookmark(),
                end = bookmark.end,
                filterFn = function( node ) {
                    return node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace( node )
                },
                current = domUtils.getNextDomNode( bookmark.start, false, filterFn ),
                node,
                pre,
                range = this.cloneRange();

            while ( current && (domUtils.getPosition( current, end ) & domUtils.POSITION_PRECEDING) ) {


                if ( current.nodeType == 3 || dtd[tagName][current.tagName] ) {
                    range.setStartBefore( current );
                    node = current;
                    while ( node && (node.nodeType == 3 || dtd[tagName][node.tagName]) && node !== end ) {

                        pre = node;
                        node = domUtils.getNextDomNode( node, node.nodeType == 1, null, function( parent ) {
                            return dtd[tagName][parent.tagName]
                        } )
                    }

                    var frag = range.setEndAfter( pre ).extractContents(),elm;
                    if(list && list.length > 0){
                        var level,top;
                        top = level = list[0].cloneNode(false);
                        for(var i=1,ci;ci=list[i++];){

                            level.appendChild(ci.cloneNode(false));
                            level = level.firstChild;

                        }
                        elm = level;

                    }else{
                        elm = range.document.createElement( tagName )
                    }
                    
                    if ( attrs ) {
                        domUtils.setAttributes( elm, attrs )
                    }
                    elm.appendChild( frag );
                    //去除子节点相同的
                    domUtils.mergChild( elm, tagName,attrs );
                    range.insertNode( list ?  top : elm );
                    //处理下滑线在a上的情况
                    var aNode;
                    if(tagName == 'span' && attrs.style && /text\-decoration/.test(attrs.style) && (aNode = domUtils.findParentByTagName(elm,'a',true)) ){

                            domUtils.setAttributes(aNode,attrs);
                            domUtils.remove(elm,true);
                            elm = aNode;



                    }else{
                        domUtils.mergSibling( elm );
                        domUtils.clearEmptySibling( elm );
                    }

                    current = domUtils.getNextDomNode( elm, false, filterFn );
                    domUtils.mergToParent( elm );
                    if ( node === end )break;
                } else {
                    current = domUtils.getNextDomNode( current, true, filterFn )
                }
            }

            return this.moveToBookmark( bookmark );
        },
        /**
         * 去掉inline样式
         * @public
         * @function
         * @name    baidu.editor.dom.Range.removeInlineStyle
         * @param  {String/Array}    tagName    要去掉的标签名
         * @return   {Range}    Range对象
         */
        removeInlineStyle : function( tagName ) {
            if(this.collapsed)return this;
            tagName = utils.isArray( tagName ) ? tagName : [tagName];

            this.shrinkBoundary().adjustmentBoundary();

            var start = this.startContainer,end = this.endContainer;

            while ( 1 ) {

                if ( start.nodeType == 1 ) {
                    if ( utils.indexOf( tagName, start.tagName.toLowerCase() ) > -1 ) {
                        break;
                    }
                    if ( start.tagName.toLowerCase() == 'body' ) {
                        start = null;
                        break;
                    }


                }
                start = start.parentNode;

            }

            while ( 1 ) {
                if ( end.nodeType == 1 ) {
                    if ( utils.indexOf( tagName, end.tagName.toLowerCase() ) > -1 ) {
                        break;
                    }
                    if ( end.tagName.toLowerCase() == 'body' ) {
                        end = null;
                        break;
                    }

                }
                end = end.parentNode;
            }


            var bookmark = this.createBookmark(),
                frag,
                tmpRange;
            if ( start ) {
                tmpRange = this.cloneRange().setEndBefore( bookmark.start ).setStartBefore( start );
                frag = tmpRange.extractContents();
                tmpRange.insertNode( frag );
                domUtils.clearEmptySibling( start, true );
                start.parentNode.insertBefore( bookmark.start, start );

            }

            if ( end ) {
                tmpRange = this.cloneRange().setStartAfter( bookmark.end ).setEndAfter( end );
                frag = tmpRange.extractContents();
                tmpRange.insertNode( frag );
                domUtils.clearEmptySibling( end, false, true );
                end.parentNode.insertBefore( bookmark.end, end.nextSibling );


            }

            var current = domUtils.getNextDomNode( bookmark.start, false, function( node ) {
                return node.nodeType == 1
            } ),next;

            while ( current && current !== bookmark.end ) {

                next = domUtils.getNextDomNode( current, true, function( node ) {
                    return node.nodeType == 1
                } );
                if ( utils.indexOf( tagName, current.tagName.toLowerCase() ) > -1 ) {

                    domUtils.remove( current, true );


                }
                current = next;
            }



            return this.moveToBookmark( bookmark );
        },
        /**
         * 得到一个自闭合的节点
         * @public
         * @function
         * @name    baidu.editor.dom.Range.getClosedNode
         * @return  {Node}    闭合节点
         * @example
         * <img />,<br />
         */
        getClosedNode : function() {

            var node;
            if ( !this.collapsed ) {
                var range = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                if ( range.startContainer.nodeType == 1 && range.startContainer === range.endContainer && range.endOffset - range.startOffset == 1 ) {
                    var child = range.startContainer.childNodes[range.startOffset];
                    if ( child && child.nodeType == 1 && dtd.$empty[child.tagName] ) {
                        node = child;
                    }
                }
            }
            return node;
        },
        /**
         * 根据range选中元素
         * @public
         * @function
         * @name    baidu.editor.dom.Range.select
         * @param  {Boolean}    notInsertFillData        true为不加占位符
         */
        select : browser.ie ? function( notInsertFillData ) {

            var collapsed = this.collapsed,
                nativeRange;

            if ( !collapsed )
                this.shrinkBoundary();
            var node = this.getClosedNode();
            if ( node ) {
                try {
                    nativeRange = this.document.body.createControlRange();
                    nativeRange.addElement( node );
                    nativeRange.select();
                } catch( e ) {
                }
                return this;
            }

            var bookmark = this.createBookmark(),
                start = bookmark.start,
                end;

            nativeRange = this.document.body.createTextRange();
            nativeRange.moveToElementText( start );
            nativeRange.moveStart( 'character', 1 );
            if ( !collapsed ) {
                var nativeRangeEnd = this.document.body.createTextRange();
                end = bookmark.end;
                nativeRangeEnd.moveToElementText( end );
                nativeRange.setEndPoint( 'EndToEnd', nativeRangeEnd );

            } else {
                if ( !notInsertFillData && this.startContainer.nodeType != 3 ) {

                    //使用<span>|x<span>固定住光标
                    var fillData = editor.fillData,
                        tmpText,
                        tmp = this.document.createElement( 'span' );

                    try {
                        if ( fillData && fillData.parentNode && !fillData.nodeValue.replace( new RegExp( domUtils.fillChar, 'g' ), '' ).length) {


                            removeFillDataWithEmptyParentNode(fillData)

                        }

                    } catch( e ) {
                    }

                    tmpText = editor.fillData = this.document.createTextNode( fillChar );
                    tmp.appendChild( this.document.createTextNode( fillChar) );
                    start.parentNode.insertBefore( tmp, start );
                    start.parentNode.insertBefore( tmpText, start );

                    nativeRange.moveStart( 'character', -1 );
                    nativeRange.collapse( true );

                }
            }

            this.moveToBookmark( bookmark );
            tmp && domUtils.remove( tmp );
            nativeRange.select();
            return this;

        } : function( notInsertFillData ) {

            var win = domUtils.getWindow( this.document ),
                sel = win.getSelection(),
                txtNode,child;
           
            browser.gecko ?  this.document.body.focus() : win.focus();
            function mergSibling(node){
                if(node && node.nodeType == 3 && !node.nodeValue.replace( new RegExp( domUtils.fillChar, 'g' ), '' ).length){
                    domUtils.remove(node);
                }
            }
            if ( sel ) {
                sel.removeAllRanges();
              
                // trace:870 chrome/safari后边是br对于闭合得range不能定位 所以去掉了判断
                // this.startContainer.nodeType != 3 &&! ((child = this.startContainer.childNodes[this.startOffset]) && child.nodeType == 1 && child.tagName == 'BR'
                if ( this.collapsed && !notInsertFillData  ){

                    var fillData = editor.fillData;

                    txtNode =  this.document.createTextNode( fillChar );
                    editor.fillData = txtNode;
                    //跟着前边走
                    this.insertNode( txtNode );
                    //todo fillData有时会失效，不能关联到上一次的文本节点
                    if ( fillData &&  fillData.parentNode  ) {

                        if(!fillData.nodeValue.replace( new RegExp( domUtils.fillChar, 'g' ), '' ).length)
                            removeFillDataWithEmptyParentNode(fillData)
                        else
                            fillData.nodeValue = fillData.nodeValue.replace( new RegExp( domUtils.fillChar, 'g' ), '' )

                    }
                    mergSibling(txtNode.previousSibling);
                    mergSibling(txtNode.nextSibling);
                    this.setStart( txtNode, browser.webkit ? 1 : 0 ).collapse( true );

                }
                var nativeRange = this.document.createRange();
                nativeRange.setStart( this.startContainer, this.startOffset );
                nativeRange.setEnd( this.endContainer, this.endOffset );

                sel.addRange( nativeRange );

            }
            return this;
        },
        /**
         * 滚动到可视范围
         * @public
         * @function
         * @name    baidu.editor.dom.Range.scrollToView
         * @param    {Boolean}   win       操作的window对象，若为空，则使用当前的window对象
         * @param    {Number}   offset     滚动的偏移量
         * @return   {Range}    Range对象
         */
        scrollToView : function(win,offset){

            win = win ? window : domUtils.getWindow(this.document);

            var span = this.document.createElement('span');
            //trace:717
            span.innerHTML = '&nbsp;';
            var tmpRange = this.cloneRange();
            tmpRange.insertNode(span);
            domUtils.scrollToView(span,win,offset);

            domUtils.remove(span);
            return this;
        }

    };
})();
///import editor.js
///import core/browser.js
///import core/dom/dom.js
///import core/dom/dtd.js
///import core/dom/domUtils.js
///import core/dom/Range.js
/**
 * @class baidu.editor.dom.Selection    Selection类
 */
baidu.editor.dom.Selection = baidu.editor.dom.Selection || {};
(function () {
    baidu.editor.dom.Selection = Selection;

    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd,
        ie = baidu.editor.browser.ie;

    function getBoundaryInformation( range, start ) {

        var getIndex = domUtils.getNodeIndex;

        range = range.duplicate();
        range.collapse( start );


        var parent = range.parentElement();

        //如果节点里没有子节点，直接退出
        if ( !parent.hasChildNodes() ) {
            return  {container:parent,offset:0};
        }

        var siblings = parent.children,
            child,
            testRange = range.duplicate(),
            startIndex = 0,endIndex = siblings.length - 1,index = -1,
            distance;

        while ( startIndex <= endIndex ) {
            index = Math.floor( (startIndex + endIndex) / 2 );
            child = siblings[index];
            testRange.moveToElementText( child );
            var position = testRange.compareEndPoints( 'StartToStart', range );


            if ( position > 0 ) {

                endIndex = index - 1;
            } else if ( position < 0 ) {

                startIndex = index + 1;
            } else {
                //trace:1043
                return  {container:parent,offset:getIndex( child )};
//                return  dtd.$empty[child.tagName.toLowerCase()] ?
//                {container:parent,offset:getIndex( child )} :
//                {container:child,offset:0}

            }
        }

        if ( index == -1 ) {
            testRange.moveToElementText( parent );
            testRange.setEndPoint( 'StartToStart', range );
            distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
            siblings = parent.childNodes;
            if ( !distance ) {
                child = siblings[siblings.length - 1];
                return  {container:child,offset:child.nodeValue.length};
            }

            var i = siblings.length;
            while ( distance > 0 )
                distance -= siblings[ --i ].nodeValue.length;

            return {container:siblings[i],offset:-distance}
        }

        testRange.collapse( position > 0 );
        testRange.setEndPoint( position > 0 ? 'StartToStart' : 'EndToStart', range );
        distance = testRange.text.replace( /(\r\n|\r)/g, '\n' ).length;
        if ( !distance ) {
            return  dtd.$empty[child.tagName] || dtd.$nonChild[child.tagName]?

            {container : parent,offset:getIndex( child ) + (position > 0 ? 0 : 1)} :
            {container : child,offset: position > 0 ? 0 : child.childNodes.length}
        }

        while ( distance > 0 ) {
            try{
                var pre = child;
                child = child[position > 0 ? 'previousSibling' : 'nextSibling'];
                distance -= child.nodeValue.length;
            }catch(e){
                return {container:parent,offset:getIndex(pre)};
            }

        }
        return  {container:child,offset:position > 0 ? -distance : child.nodeValue.length + distance}
    }

    /**
     * 将ieRange转换为Range对象
     * @param {Range}   ieRange    ieRange对象
     * @param {Range}   range      Range对象
     * @return  {Range}  range       返回转换后的Range对象
     */
    function transformIERangeToRange( ieRange, range ) {
        if ( ieRange.item ) {
            range.selectNode( ieRange.item( 0 ) );
        } else {
            var bi = getBoundaryInformation( ieRange, true );
            range.setStart( bi.container, bi.offset );
            if ( ieRange.compareEndPoints( 'StartToEnd',ieRange ) != 0 ) {
                bi = getBoundaryInformation( ieRange, false );
                range.setEnd( bi.container, bi.offset );
            }
        }
        return range;
    }

    /**
     * 获得ieRange
     * @param {Selection} sel    Selection对象
     * @return {ieRange}    得到ieRange
     */
    function _getIERange(sel){
        var ieRange = sel.getNative().createRange();
        var el = ieRange.item ? ieRange.item( 0 ) : ieRange.parentElement();
        if ( ( el.ownerDocument || el ) === sel.document ) {
            return ieRange;
        }
    }
    function Selection( doc ) {
        var me = this, iframe;
        me.document = doc;

        if ( ie ) {
            iframe = domUtils.getWindow(doc).frameElement;
            domUtils.on( iframe, 'beforedeactivate', function () {

                me._bakIERange = me.getIERange();
            } );
            domUtils.on( iframe, 'activate', function () {
                try {
                    if ( !_getIERange(me) && me._bakIERange ) {
                        me._bakIERange.select();
                    }
                } catch ( ex ) {
                }
                me._bakIERange = null;
            } );
        }
        iframe = doc = null;
    }

    Selection.prototype = {
        /**
         * 获取原生seleciton对象
         * @public
         * @function
         * @name    baidu.editor.dom.Selection.getNative
         * @return {Selection}    获得selection对象
         */
        getNative : function () {
            if ( ie ) {
                return this.document.selection;
            } else {
                return domUtils.getWindow( this.document ).getSelection();
            }
        },



        /**
         * 获得ieRange
         * @public
         * @function
         * @name    baidu.editor.dom.Selection.getIERange
         * @return {ieRange}    返回ie原生的Range
         */
        getIERange : function () {

            var ieRange = _getIERange(this);
            if ( !ieRange ) {
                if ( this._bakIERange ) {
                    return this._bakIERange;
                }
            }
            return ieRange;
        },

        /**
         * 缓存当前选区的range和选区的开始节点
         * @public
         * @function
         * @name    baidu.editor.dom.Selection.cache
         */
        cache : function () {
            this.clear();
            this._cachedRange = this.getRange();
            this._cachedStartElement = this.getStart();
        },

        /**
         * 清空缓存
         * @public
         * @function
         * @name    baidu.editor.dom.Selection.clear
         */
        clear : function () {
            this._cachedRange = this._cachedStartElement = null;
        },

        /**
         * 获取选区对应的Range
         * @public
         * @function
         * @name    baidu.editor.dom.Selection.getRange
         * @returns {baidu.editor.dom.Range}    得到Range对象
         */
        getRange : function () {
            var me = this;
            
            function optimze(range){
                var child = me.document.body.firstChild,
                    collapsed = range.collapsed;
                while(child && child.firstChild){
                    range.setStart(child,0);
                    child = child.firstChild;
                }
                if(!range.startContainer){
                    range.setStart(me.document.body,0)
                }
                if(collapsed){
                    range.collapse(true);
                }
            }
            if ( me._cachedRange != null ) {
                return this._cachedRange;
            }
            var range = new baidu.editor.dom.Range( me.document );

            if ( ie ) {
                var nativeRange = me.getIERange();
                if(nativeRange){
                    transformIERangeToRange( nativeRange, range );
                }else{
                    optimze(range)
                }

            } else {
                var sel = me.getNative();
                if ( sel && sel.rangeCount ) {
                    var firstRange = sel.getRangeAt( 0 );
                    var lastRange = sel.getRangeAt( sel.rangeCount - 1 );
                    range.setStart( firstRange.startContainer, firstRange.startOffset ).setEnd( lastRange.endContainer, lastRange.endOffset );
                    if(range.collapsed && domUtils.isBody(range.startContainer) && !range.startOffset){
                        optimze(range)
                    }
                } else {
                    
                    optimze(range)
                        
                }
                
            }

            return range;
        },

        /**
         * 获取开始元素，用于状态反射
         * @public
         * @function
         * @name    baidu.editor.dom.Selection.getStart
         * @return {Element}     获得开始元素
         */
        getStart : function () {
            if ( this._cachedStartElement ) {
                return this._cachedStartElement;
            }
            var range = ie ? this.getIERange()  : this.getRange(),
                tmpRange,
                start,tmp,parent;

            if (ie) {
                if(!range){
                    //todo 给第一个值可能会有问题
                   return this.document.body.firstChild;
                }
                //control元素
                if (range.item)
                    return range.item(0);

                tmpRange = range.duplicate();
                //修正ie下<b>x</b>[xx] 闭合后 <b>x|</b>xx
                tmpRange.text.length > 0 && tmpRange.moveStart('character',1);
                tmpRange.collapse(1);
                start = tmpRange.parentElement();


                parent = tmp = range.parentElement();
                while (tmp = tmp.parentNode) {
                    if (tmp == start) {
                        start = parent;
                        break;
                    }
                }

            } else {
                range.shrinkBoundary();
                start = range.startContainer;

                if (start.nodeType == 1 && start.hasChildNodes())
                    start = start.childNodes[Math.min(start.childNodes.length - 1, range.startOffset)];

                if (start.nodeType == 3)
                    return start.parentNode;


            }
            return start;

        },
        /**
         * 得到选区中的文本
         * @public
         * @function
         * @name    baidu.editor.dom.Selection.getText
         * @return  {String}    选区中包含的文本
         */
        getText : function(){
            var nativeSel = this.getNative(),
                nativeRange = baidu.editor.browser.ie ? nativeSel.createRange() : nativeSel.getRangeAt(0);

            return nativeRange.text || nativeRange.toString();
        }
    };


})();
///import editor.js
///import core/utils.js
///import core/EventBase.js
///import core/browser.js
///import core/dom/dom.js
///import core/dom/domUtils.js
///import core/dom/Selection.js
///import core/dom/dtd.js
(function () {
    baidu.editor.Editor = Editor;

    var editor = baidu.editor,
        utils = editor.utils,
        EventBase = editor.EventBase,
        domUtils = editor.dom.domUtils,
        Selection = editor.dom.Selection,
        ie = editor.browser.ie,
        uid = 0,
        browser = editor.browser,
        dtd = editor.dom.dtd;

    /**
     * 编辑器类
     * @public
     * @class
     * @extends baidu.editor.EventBase
     * @name baidu.editor.Editor
     * @param {Object} options
     * @config {String}         id     将编辑器渲染到容器的id
     * @config {String}         initialStyle     编辑器内部样式
     * @config {String}         initialContent   初始化编辑器的内容
     * @config {String}         iframeCssUrl   要引入css的url
     * @config {String}         removeFormatTags   清除格式删除的标签
     * @config {String}         removeFormatAttributes   清除格式删除的属性
     * @config {String}         enterTag   编辑器回车标签。p或br
     * @config {Number}         maxUndoCount   最多可以回退的次数
     * @config {Number}         maxInputCount   当输入的字符数超过该值时，保存一次现场
     * @config {String}         selectedTdClass   设定选中td的样式名称
     * @config {Boolean}         pasteplain   是否纯文本粘贴。false为不使用纯文本粘贴，true为使用纯文本粘贴
     * @config {String}         textarea   提交表单时，服务器获取编辑器提交内容的所用的参数
     * @config {Boolean}         focus   初始化时，是否让编辑器获得焦点true或false
     * @config {String}         indentValue   初始化时，首行缩进距离
     */
    function Editor( options ) {
        var me = this;
        me.uid = uid ++;
        EventBase.call( me );
        me.commands = {};
        me.options = utils.extend( options || {}, UEDITOR_CONFIG, true );
        me.initPlugins();
    }

   
    Editor.prototype = /**@lends baidu.editor.Editor.prototype*/{

        /**
         * 渲染编辑器的DOM到指定容器，必须且只能调用一次
         * @public
         * @function
         * @param {Element|String} container
         */
        render : function ( container ) {
            if (container.constructor === String) {
                container = document.getElementById(container);
            }
            var iframeId = 'baidu_editor_' + this.uid;
            container.innerHTML = '<iframe id="' + iframeId + '"' +
             'width="100%" height="100%" scroll="no" frameborder="0"></iframe>';
            // firefox4 getComputedStyle不能在domReady之前使用
//            if (domUtils.getComputedStyle(container, 'position') != 'absolute') {
//                container.style.position = 'relative';
//            }
            container.style.overflow = 'hidden';
            var iframe = document.getElementById( iframeId ),
                doc = iframe.contentWindow.document;
            this._setup( doc );
        },

        _setup: function ( doc ) {
            var options = this.options,
                me = this;
            doc.open();
            var html = ( ie ? '' : '<!DOCTYPE html>' ) +
                '<html xmlns="http://www.w3.org/1999/xhtml"><head><title></title>' +
                ( options.iframeCssUrl ? '<link rel="stylesheet" type="text/css" href="' + utils.unhtml( options.iframeCssUrl ) + '"/>' : '' ) +
                '<style type="text/css">' +
                ( ie && browser.version < 9 ? 'body' : 'html' ) + '{ word-wrap: break-word;word-break: break-all;cursor: text; height: 100%; font-size:'+this.options.defaultFontSize+';font-family:'+this.options.defaultFontFamily+';}\n' + ( options.initialStyle ||' ' ) +
                '</style></head><body></body></html>';
            doc.write( html );
            doc.close();
            if ( ie ) {
                doc.body.disabled = true;
                doc.body.contentEditable = true;
                doc.body.disabled = false;
            } else {
                doc.body.contentEditable = true;
                doc.body.spellcheck = false;
            }
            this.document = doc;
            this.window = doc.defaultView || doc.parentWindow;

            this.iframe = this.window.frameElement;
            if (this.options.minFrameHeight) {
                this.setHeight(this.options.minFrameHeight);
            }
            this.body = doc.body;
            this.selection = new Selection( doc );
            this._initEvents();
            if(this.options.initialContent){
                if(me.options.autoClearinitialContent){
                    var oldExecCommand = me.execCommand;
                    me.execCommand = function(){
                        me.fireEvent('firstBeforeExecCommand');
                        oldExecCommand.apply(me,arguments)
                    };
                    this.setDefaultContent(this.options.initialContent);
                }else
                    this.setContent(this.options.initialContent);
            }
            //为form提交提供一个隐藏的textarea
              for(var form = this.iframe.parentNode;!domUtils.isBody(form);form = form.parentNode){
                    
                    if(form.tagName == 'FORM'){
                        domUtils.on(form,'submit',function(){
                            
                            var textarea = document.getElementById('ueditor_textarea_' + me.options.textarea);
                            
                            if(!textarea){
                                textarea = document.createElement('textarea');
                                textarea.setAttribute('name',me.options.textarea);
                                textarea.id = 'ueditor_textarea_' + me.options.textarea;
                                textarea.style.display = 'none';
                                this.appendChild(textarea);
                            }
                            textarea.value = me.getContent();
    
                        });
                        break;
                    }
                }
            //编辑器不能为空内容
            
            if(domUtils.getChildCount(this.body,function(node){return !domUtils.isBr(node)}) == 0){
                this.body.innerHTML = '<p>'+(browser.ie?'':'<br/>')+'</p>';
            }
            //如果要求focus, 就把光标定位到内容的最后
            if(me.options.focus){
                
                var range = this.selection.getRange(),
                    first = this.body.firstChild;

             
                setTimeout(function(){
                    range.setStartBefore(first).setCursor(false,true);
                    me._selectionChange()
                });


            }

            
            this.fireEvent( 'ready' );


        },
        /**
         * 创建textarea,同步编辑的内容到textarea,为后台获取内容做准备
         * @public
         * @function
         */

        sync : function(){
             for(var form = this.iframe.parentNode;!domUtils.isBody(form);form = form.parentNode){
                if(form.tagName == 'FORM'){

                        var textarea = document.getElementById('ueditor_textarea_' + this.options.textarea);

                        if(!textarea){
                            textarea = document.createElement('textarea');
                            textarea.setAttribute('name',this.options.textarea);
                            textarea.id = 'ueditor_textarea_' + this.options.textarea;
                            textarea.style.display = 'none';
                            form.appendChild(textarea);
                        }
                        textarea.value = this.getContent();

                    break;
                }
            }
        },
        /**
         * 设置编辑器高度
         * @public
         * @function
         * @param {Number} height    高度
         */
        setHeight: function (height){
            if (height !== parseInt(this.iframe.parentNode.style.height)){
                this.iframe.parentNode.style.height = height + 'px';
            }
        },

        /**
         * 获取编辑器内容
         * @public
         * @function
         * @returns {String}
         */
        getContent : function () {
            this.fireEvent( 'beforegetcontent' );
            var reg = new RegExp( domUtils.fillChar, 'g' ),
                html = this.document.body.innerHTML.replace(reg,'');
            this.fireEvent( 'aftergetcontent' );
            if (this.serialize) {
                var node = this.serialize.parseHTML(html);
                node = this.serialize.transformOutput(node);
                html = this.serialize.toHTML(node);
            }
            return html;
        },

        /**
         * 获取编辑器中的文本内容
         * @public
         * @function
         * @returns {String}
         */
        getContentTxt : function(){
            var reg,space_str;
            space_str = browser.ie ? "\r\t\n":"&#nbsp;\r\t\n";
            reg = new RegExp( '['+ space_str + domUtils.fillChar + ']', 'g' );
            return this.document.body[browser.ie ? 'innerText':'textContent'].replace(reg,'')
        },
        /**
         * 设置编辑器内容
         * @public
         * @function
         * @param {String} html
         */
        setContent : function ( html ) {
            var me = this;
            me.fireEvent( 'beforesetcontent' );
            var serialize = this.serialize;
            if (serialize) {
                var node = serialize.parseHTML(html);
                node = serialize.transformInput(node);
                node = serialize.filter(node);
                html = serialize.toHTML(node);
            }
            this.document.body.innerHTML = html;
            //给文本或者inline节点套p标签
            if(me.options.enterTag == 'p'){
                var child = this.body.firstChild,
                    p = me.document.createElement('p'),
                    tmpNode;

                while(child){
                    if(child.nodeType ==3 || child.nodeType == 1 && dtd.p[child.tagName]){
                        tmpNode = child.nextSibling;

                        p.appendChild(child);
                        child = tmpNode;
                        if(!child){
                            me.body.appendChild(p)
                        }
                    }else{
                        if(p.firstChild){
                            me.body.insertBefore(p,child);
                            p = me.document.createElement('p')

                            
                        }
                        child = child.nextSibling
                    }


                }   
            }
            me.adjustTable && me.adjustTable(me.body);
            me.fireEvent( 'aftersetcontent' );
            me._selectionChange();
        },

        /**
         * 让编辑器获得焦点
         * @public
         * @function
         */
        focus : function () {

            domUtils.getWindow( this.document ).focus();

        },

        /**
         * 加载插件
         * @private
         * @function
         * @param {Array} plugins
         */
        initPlugins : function ( plugins ) {
            var fn,originals = baidu.editor.plugins;
            if ( plugins ) {
                for ( var i = 0,pi; pi = plugins[i++]; ) {
                    if ( utils.indexOf( this.options.plugins, pi ) == -1 && (fn = baidu.editor.plugins[pi]) ) {
                        this.options.plugins.push( pi );
                        fn.call( this )
                    }
                }
            } else {

                plugins = this.options.plugins;

                if ( plugins ) {
                    for ( i = 0; pi = originals[plugins[i++]]; ) {
                        pi.call( this )
                    }
                } else {
                    this.options.plugins = [];
                    for ( pi in originals ) {
                        this.options.plugins.push( pi );
                        originals[pi].call( this )
                    }
                }
            }


        },
         /**
         * 初始化事件，绑定selectionchange
         * @private
         * @function
         */
        _initEvents : function () {
            var me = this,
                doc = this.document,
                win = domUtils.getWindow( doc );

           // var _selectionChange = utils.defer( utils.bind( me._selectionChange, me ), 250, true );
            me._proxyDomEvent = utils.bind( me._proxyDomEvent, me );
            domUtils.on( doc, ['click',  'contextmenu','mousedown','keydown', 'keyup','keypress', 'mouseup', 'mouseover', 'mouseout', 'selectstart'], me._proxyDomEvent );

            domUtils.on( win, ['focus', 'blur'], me._proxyDomEvent );

            domUtils.on( doc, ['mouseup','keydown'], function(evt){

                //特殊键不触发selectionchange
                if(evt.type == 'keydown' && (evt.ctrlKey || evt.metaKey || evt.shiftKey || evt.altKey)){
                    return;
                }
                if(evt.button == 2)return;
                me._selectionChange(250, true);
            });

             //处理拖拽
            //ie ff不能从外边拖入
            //chrome只针对从外边拖入的内容过滤
            var innerDrag = 0,source = browser.ie ? me.body : me.document,dragoverHandler;

            domUtils.on(source,'dragstart',function(){
                innerDrag = 1;
            });

            domUtils.on(source,browser.webkit ? 'dragover' : 'drop',function(){
                return browser.webkit ?
                    function(){
                        clearTimeout( dragoverHandler );
                        dragoverHandler = setTimeout( function(){
                            if(!innerDrag){
                                var sel = me.selection,
                                    range = sel.getRange();
                                if(range){
                                    var common = range.getCommonAncestor();
                                    if(common && me.serialize){
                                        var f = me.serialize,
                                            node =
                                                f.filter(
                                                    f.transformInput(
                                                        f.parseHTML(
                                                            f.word(common.innerHTML)
                                                        )
                                                    )
                                                )
                                        common.innerHTML = f.toHTML(node)
                                    }

                                }
                            }
                            innerDrag = 0;
                        }, 200 );
                    } :
                    function(e){

                        if(!innerDrag){
                            e.preventDefault ? e.preventDefault() :(e.returnValue = false) ;

                        }
                        innerDrag = 0;
                    }

            }());

        },
        _proxyDomEvent: function ( evt ) {

            return this.fireEvent( evt.type.replace( /^on/, '' ), evt );
        },

        _selectionChange : function ( delay ,byUser) {

            var me = this;
            clearTimeout(this._selectionChangeTimer);
            this._selectionChangeTimer = setTimeout(function(){
                me.selection.cache();
                if ( me.selection._cachedRange && me.selection._cachedStartElement ) {
                    me.fireEvent( 'beforeselectionchange' );
                    // true代表由用户交互造成的selectionchange.
                    me.fireEvent( 'selectionchange', byUser );
                    me.selection.clear();
                }
            }, delay || 50);

        },

        _callCmdFn: function ( fnName, args ) {
            var cmdName = args[0].toLowerCase(),
                cmd, cmdFn;
            cmdFn = ( cmd = this.commands[cmdName] ) && cmd[fnName] ||
                ( cmd = baidu.editor.commands[cmdName]) && cmd[fnName];
            if ( cmd && !cmdFn && fnName == 'queryCommandState' ) {
                return false;
            } else if ( cmdFn ) {
                return cmdFn.apply( this, args );
            }
        },

        /**
         * 执行命令
         * @public
         * @function
         * @param {String} cmdName 执行的命令名
         * 
         */
        execCommand : function ( cmdName ) {
            cmdName = cmdName.toLowerCase();
            var me = this,
                result,
                cmd = me.commands[cmdName] || baidu.editor.commands[cmdName];
            if ( !cmd || !cmd.execCommand ) {
                return;
            }

            if ( !cmd.notNeedUndo && !me.__hasEnterExecCommand ) {
                me.__hasEnterExecCommand = true;
                me.fireEvent( 'beforeexeccommand', cmdName );
                result = this._callCmdFn( 'execCommand', arguments );
                me.fireEvent( 'afterexeccommand', cmdName );
                me.__hasEnterExecCommand = false;
            } else {
                result = this._callCmdFn( 'execCommand', arguments );
            }
            me._selectionChange();
            return result;
        },

        /**
         * 查询命令的状态
         * @public
         * @function
         * @param {String} cmdName 执行的命令名
         * @returns {Number|*} -1 : disabled, false : normal, true : enabled.
         * 
         */
        queryCommandState : function ( cmdName ) {
            return this._callCmdFn( 'queryCommandState', arguments );
        },

        /**
         * 查询命令的值
         * @public
         * @function
         * @param {String} cmdName 执行的命令名
         * @returns {*}
         */
        queryCommandValue : function ( cmdName ) {
            return this._callCmdFn( 'queryCommandValue', arguments );
        },
        /**
         * 检查编辑区域中是否有内容
         * @public
         * @function
         * @returns {Boolean} true 有,false 没有
         */
        hasContents : function(){
            var cont = this.body[browser.ie ? 'innerText' : 'textContent'],
                reg = new RegExp('[ \t\n\r'+domUtils.fillChar+']','g');

            return !!cont.replace(reg,'').length
        },
        /**
         * 从新设置
         * @public
         * @function
         */
        reset : function(){
            this.fireEvent('reset');
        },
        /**
         * 设置默认内容
         * @function
         * @param    {String}    cont     要存入的内容
         */
        setDefaultContent : function(){
             function clear(type){
                var me = this;
                
                if(me.document.getElementById('initContent')){
                    me.document.body.innerHTML = '<p>'+(baidu.editor.browser.ie ? '' : '<br/>')+'</p>';
                    var range = me.selection.getRange();

                    me.removeListener('firstBeforeExecCommand',clear);
                    me.removeListener('focus',clear);
                    setTimeout(function(){
                        range.setStart(me.document.body.firstChild,0).collapse(true).select(true);
                        me._selectionChange();
                    })


                }
            }
            return function (cont){
                var me = this;
                me.document.body.innerHTML = '<p id="initContent">'+cont+'</p>';
                me.addListener('firstBeforeExecCommand',clear);
                me.addListener('mousedown',clear);
            }


        }()

    };
    utils.inherits( Editor, EventBase );
})();

///import core
///commands 插入内容
///commands 插入框架
/**
 * @description 插入内容
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     inserthtml插入内容的命令
 * @param   {String}   html                要插入的内容
 * @author zhanyi
    */
(function(){
    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd,
        utils = baidu.editor.utils,
        browser = baidu.editor.browser;
    baidu.editor.commands['inserthtml'] = {
        execCommand: function (command,html){
            var editor = this,
                range,deletedElms, i,ci,
                div,
                tds = editor.currentSelectedArr;

            range = editor.selection.getRange();

            div = range.document.createElement( 'div' );
            div.style.display = 'inline';
            div.innerHTML = utils.trim( html );

            try{
                editor.adjustTable && editor.adjustTable(div);
            }catch(e){}


            if(tds && tds.length){
                for(var i=0,ti;ti=tds[i++];){
                    ti.className = ''
                }
                tds[0].innerHTML = '';
                range.setStart(tds[0],0).collapse(true);
                editor.currentSelectedArr = [];
            }

            if ( !range.collapsed ) {

                range.deleteContents();
                if(range.startContainer.nodeType == 1){
                    var child = range.startContainer.childNodes[range.startOffset],pre;
                    if(child && domUtils.isBlockElm(child) && (pre = child.previousSibling) && domUtils.isBlockElm(pre)){
                        range.setEnd(pre,pre.childNodes.length).collapse();
                        while(child.firstChild){
                            pre.appendChild(child.firstChild);

                        }
                        domUtils.remove(child);
                    }
                }

            }


            var child,parent,pre,tmp,hadBreak = 0;
            while ( child = div.firstChild ) {
                range.insertNode( child );
                if ( !hadBreak && child.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm( child ) ){

                    parent = domUtils.findParent( child,function ( node ){ return domUtils.isBlockElm( node ); } );
                    if ( parent && parent.tagName.toLowerCase != 'body' && !(dtd[parent.tagName][child.nodeName] && child.parentNode === parent)){
                        if(!dtd[parent.tagName][child.nodeName]){
                            pre = parent;
                        }else{
                            tmp = child.parentNode;
                            while (tmp !== parent){
                                pre = tmp;
                                tmp = tmp.parentNode;
    
                            }    
                        }
                        
                       
                        domUtils.breakParent( child, pre || tmp );
                        //去掉break后前一个多余的节点  <p>|<[p> ==> <p></p><div></div><p>|</p>
                        var pre = child.previousSibling;
                        domUtils.trimWhiteTextNode(pre);
                        if(!pre.childNodes.length){
                            domUtils.remove(pre);
                        }
                        hadBreak = 1;
                    }
                }
                var next = child.nextSibling;
                if(!div.firstChild && next && domUtils.isBlockElm(next)){

                    range.setStart(next,0).collapse(true);
                    break;
                }
                range.setEndAfter( child ).collapse();

            }
//            if(!range.startContainer.childNodes[range.startOffset] && domUtils.isBlockElm(range.startContainer)){
//                next = editor.document.createElement('br');
//                range.insertNode(next);
//                range.collapse(true);
//            }
            //block为空无法定位光标

            child = range.startContainer;
            //用chrome可能有空白展位符
            if(domUtils.isBlockElm(child) && domUtils.isEmptyNode(child)){
                child.innerHTML = baidu.editor.browser.ie ? '' : '<br/>'
            }
            //加上true因为在删除表情等时会删两次，第一次是删的fillData
            range.select(true);


            setTimeout(function(){
                range.scrollToView(editor.autoHeightEnabled,editor.autoHeightEnabled ? domUtils.getXY(editor.iframe).y:0);
            },200)



            
        }
    };
}());

///import core
///import commands\inserthtml.js
///commands 图片
/**
 * Created by .
 * User: zhuwenxuan
 * Date: 11-8-25
 * Time: 下午2:03
 * To change this template use File | Settings | File Templates.
 */

/*
* for(o in opt){
                    str += o +&quot;=&#39;&quot;+opt[o]+&quot;&#39; &quot;;
                }
                str += &quot;/&gt;&quot;;
                this.execCommand(&quot;inserthtml&quot;,str);
* */
(function (){
    var domUtils = baidu.editor.dom.domUtils;
    baidu.editor.commands['insertimage'] = {
        execCommand : function (cmd, opt){
            var range = this.selection.getRange(),
                    img = range.getClosedNode();
            if(img && /img/ig.test( img.tagName )){
                if(img.className != "edui-faked-video" ){
                    domUtils.setAttributes(img,opt);
                }
            }else{
                var str = "<img ",o;
                for(o in opt){
                    str += o +"='"+opt[o]+"' ";
                }
                str += "/>";
                this.execCommand("inserthtml",str);
            }
        }
    };
})();

///import core
///commands 段落格式,居左,居右,居中,两端对齐
/**
 * @description 居左右中
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     justify执行对齐方式的命令
 * @param   {String}   align               对齐方式：left居左，right居右，center居中，justify两端对齐
 * @author zhanyi
 */
(function(){
    var domUtils = baidu.editor.dom.domUtils,
        block = domUtils.isBlockElm,
        defaultValue = {
            left : 1,
            right : 1,
            center : 1,
            justify : 1
        },
        utils = baidu.editor.utils,
        doJustify = function(range,style){
            var bookmark = range.createBookmark(),
                filterFn = function( node ) {
                    return node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' &&  !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace( node )
                };

            range.enlarge(true);
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode(bookmark2.start,false,filterFn),
                tmpRange = range.cloneRange(),
                tmpNode;
            while(current &&  !(domUtils.getPosition(current,bookmark2.end)&domUtils.POSITION_FOLLOWING)){
                if(current.nodeType == 3 || !block(current)){
                    tmpRange.setStartBefore(current);
                    while(current && current!==bookmark2.end &&  !block(current)){
                        tmpNode = current;
                        current = domUtils.getNextDomNode(current,false,null,function(node){
                            return !block(node)
                        });
                    }
                    tmpRange.setEndAfter(tmpNode);
                    var common = tmpRange.getCommonAncestor();
                    if( !domUtils.isBody(common) && block(common)){
                        domUtils.setStyles(common,utils.isString(style) ? {'text-align':style} : style);
                        current = common;
                    }else{
                        var p = range.document.createElement('p');
                         domUtils.setStyles(p,utils.isString(style) ? {'text-align':style} : style);
                        var frag = tmpRange.extractContents();
                        p.appendChild(frag);
                        tmpRange.insertNode(p);
                        current = p;
                    }
                    current = domUtils.getNextDomNode(current,false,filterFn);
                }else{
                    current = domUtils.getNextDomNode(current,true,filterFn);
                }
            }
            return range.moveToBookmark(bookmark2).moveToBookmark(bookmark)
        };
    baidu.editor.commands['justify'] =  {
        execCommand : function( cmdName,align ) {
            
            var range = new baidu.editor.dom.Range(this.document);
            if(this.currentSelectedArr && this.currentSelectedArr.length > 0){
                for(var i=0,ti;ti=this.currentSelectedArr[i++];){
                    doJustify(range.selectNode(ti),align);
                }
                range.selectNode(this.currentSelectedArr[0]).select()
            }else{
                range = this.selection.getRange();
                //闭合时单独处理
                if(range.collapsed){
                    var txt = this.document.createTextNode('p');
                    range.insertNode(txt);
                }
                doJustify(range,align);
                if(txt){
                    range.setStartBefore(txt).collapse(true);
                    domUtils.remove(txt);
                }

                range.select();

            }
            return true;
        },
        queryCommandValue : function() {
            var startNode = this.selection.getStart(),
                value = domUtils.getComputedStyle(startNode,'text-align');
            return defaultValue[value] ? value : 'left';
        }
    }


})();

///import core
///import commands\removeformat.js
///commands 字体颜色,背景色,字号,字体,下划线,删除线
/**
 * @description 字体
 * @name baidu.editor.execCommand
 * @param {String}     cmdName    执行的功能名称
 * @param {String}    value             传入的值
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
        fonts = {
            'forecolor':'color',
            'backcolor':'background-color',
            'fontsize':'font-size',
            'fontfamily':'font-family',
           
            'underline':'text-decoration',
            'strikethrough':'text-decoration'
        },
        reg = new RegExp(domUtils.fillChar,'g'),
        browser = baidu.editor.browser,
        flag = 0;

    for ( var p in fonts ) {
        (function( cmd, style ) {
            baidu.editor.commands[cmd] = {
                execCommand : function( cmdName, value ) {
                    value = value || (this.queryCommandState(cmdName) ? 'none' : cmdName == 'underline' ? 'underline' : 'line-through');
                    var me = this,
                        range = this.selection.getRange(),
                        text;
                    //执行了上述代码可能产生冗余的html代码，所以要注册 beforecontent去掉这些冗余的代码
                    if(!flag){
                        me.addListener('beforegetcontent',function(){
                            domUtils.clearReduent(me.document,['span'])
                        });
                        flag = 1;
                    }
                    if ( value == 'default' ) {

                        if(range.collapsed){
                            text = me.document.createTextNode('font');
                            range.insertNode(text).select()

                        }
                        me.execCommand( 'removeFormat', 'span,a', style);
                        if(text){
                            range.setStartBefore(text).setCursor();
                            domUtils.remove(text)
                        }


                    } else {
                        if(me.currentSelectedArr && me.currentSelectedArr.length > 0){
                            for(var i=0,ci;ci=me.currentSelectedArr[i++];){
                                range.selectNodeContents(ci);
                                range.applyInlineStyle( 'span', {'style':style + ':' + value} );

                            }
                            range.selectNodeContents(this.currentSelectedArr[0]).select();
                        }else{
                            if ( !range.collapsed ) {
                                if((cmd == 'underline'||cmd=='strikethrough') && me.queryCommandValue(cmd)){
                                     me.execCommand( 'removeFormat', 'span,a', style );
                                }
                                range = me.selection.getRange();

                                range.applyInlineStyle( 'span', {'style':style + ':' + value} ).select();
                            } else {
                                
                                var span = domUtils.findParentByTagName(range.startContainer,'span',true);
                                text = me.document.createTextNode('font');
                                if(span && !span.children.length && !span[browser.ie ? 'innerText':'textContent'].replace(reg,'').length){
                                    //for ie hack when enter
                                    range.insertNode(text);
                                     if(cmd == 'underline'||cmd=='strikethrough'){
                                         range.selectNode(text).select();
                                         me.execCommand( 'removeFormat','span,a', style, null );

                                         span = domUtils.findParentByTagName(text,'span',true);
                                         range.setStartBefore(text)

                                    }
                                    span.style.cssText = span.style.cssText +  ';' + style + ':' + value;
                                    range.collapse(true).select();


                                }else{


                                    range.insertNode(text);
                                    range.selectNode(text).select();
                                    span = range.document.createElement( 'span' );

                                    if(cmd == 'underline'||cmd=='strikethrough'){
                                        //a标签内的不处理跳过
                                        if(domUtils.findParentByTagName(text,'a',true)){
                                            range.setStartBefore(text).setCursor();
                                             domUtils.remove(text);
                                             return;
                                         }
                                         me.execCommand( 'removeFormat','span,a', style );
                                    }

                                    span.style.cssText = style + ':' + value;


                                    text.parentNode.insertBefore(span,text);
                                    //修复，span套span 但样式不继承的问题
                                    if(!browser.ie){
                                         var spanParent = span.parentNode;
                                        while(!domUtils.isBlockElm(spanParent)){
                                            if(spanParent.tagName == 'SPAN'){
                                                span.style.cssText = spanParent.style.cssText + span.style.cssText;
                                            }
                                            spanParent = spanParent.parentNode;
                                        }
                                    }



                                    range.setStart(span,0).setCursor();
                                    //trace:981
                                    //domUtils.mergToParent(span)


                                }
                                domUtils.remove(text)
                            }
                        }

                    }
                    return true;
                },
                queryCommandValue : function (cmdName) {
                    var startNode = this.selection.getStart();
                    //trace:946
                    if(cmdName == 'underline'||cmdName=='strikethrough' ){
                        var tmpNode = startNode,value;
                        while(tmpNode && !domUtils.isBlockElm(tmpNode) && !domUtils.isBody(tmpNode)){
                            if(tmpNode.nodeType == 1){
                                value = domUtils.getComputedStyle( tmpNode, style );

                                if(value != 'none'){
                                    return value;
                                } 
                            }

                            tmpNode = tmpNode.parentNode;
                        }
                        return 'none'
                    }
                    return  domUtils.getComputedStyle( startNode, style );
                },
                queryCommandState : function(cmdName){
                    if(!(cmdName == 'underline'||cmdName=='strikethrough'))
                        return 0;
                    return this.queryCommandValue(cmdName) == (cmdName == 'underline' ? 'underline' : 'line-through')
                }
            }
        })( p, fonts[p] );
    }
})();
///import core
///commands 超链接,取消链接
/**
 * 超链接
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     link插入超链接
 * @param   {Object}  options         url地址，title标题，target是否打开新页
 * @author zhanyi
 */
/**
 * 取消链接
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     unlink取消链接
 * @author zhanyi
 */
(function() {
    var dom = baidu.editor.dom,
        domUtils = dom.domUtils,
        browser = baidu.editor.browser;

    function optimize( range ) {
        var start = range.startContainer,end = range.endContainer;

        if ( start = domUtils.findParentByTagName( start, 'a', true ) ) {
            range.setStartBefore( start )
        }
        if ( end = domUtils.findParentByTagName( end, 'a', true ) ) {
            range.setEndAfter( end )
        }
    }

    baidu.editor.commands['unlink'] = {
        execCommand : function() {
            var as,
                range = new baidu.editor.dom.Range(this.document),
                tds = this.currentSelectedArr,
                bookmark;
            if(tds && tds.length >0){
                for(var i=0,ti;ti=tds[i++];){
                    as = domUtils.getElementsByTagName(ti,'a');
                    for(var j=0,aj;aj=as[j++];){
                        domUtils.remove(aj,true);
                    }
                }
                if(domUtils.isEmptyNode(tds[0])){
                    range.setStart(tds[0],0).setCursor();
                }else{
                    range.selectNodeContents(tds[0]).select()
                }
            }else{
                range = this.selection.getRange();
                if(range.collapsed && !domUtils.findParentByTagName( range.startContainer, 'a', true )){
                    return;
                }
                bookmark = range.createBookmark();
                optimize( range );
                range.removeInlineStyle( 'a' ).moveToBookmark( bookmark ).select();
            }
        },
        queryCommandState : function(){
            return this.queryCommandValue('link') ?  0 : -1;
        }

    };
    function doLink(range,opt){

        optimize( range = range.adjustmentBoundary() );
        var start = range.startContainer;
        if(start.nodeType == 1){
            start = start.childNodes[range.startOffset];
            if(start && start.nodeType == 1 && start.tagName == 'A' && /^(?:https?|ftp|file)\s*:\s*\/\//.test(start[browser.ie?'innerText':'textContent'])){
                start.innerHTML = opt.href;
            }
        }
        range.removeInlineStyle( 'a' );
        if ( range.collapsed ) {
            var a = range.document.createElement( 'a' );
            domUtils.setAttributes( a, opt );
            a.innerHTML = opt.href;
            range.insertNode( a ).selectNode( a );
        } else {
            range.applyInlineStyle( 'a', opt )

        }
    }
    baidu.editor.commands['link'] = {
        execCommand : function( cmdName, opt ) {
            var range = new baidu.editor.dom.Range(this.document),
                tds = this.currentSelectedArr;
            
            if(tds && tds.length){
                for(var i=0,ti;ti=tds[i++];){
                    if(domUtils.isEmptyNode(ti)){
                        ti.innerHTML = opt.href
                    }
                    doLink(range.selectNodeContents(ti),opt)
                }
                range.selectNodeContents(tds[0]).select()

               
            }else{
                doLink(range=this.selection.getRange(),opt);

                range.collapse().select(browser.gecko ? true : false);

            }
        },
        queryCommandValue : function() {
            
            var range = new baidu.editor.dom.Range(this.document),
                tds = this.currentSelectedArr,
                as,
                node;
            if(tds && tds.length){
                for(var i=0,ti;ti=tds[i++];){
                    as = ti.getElementsByTagName('a');
                    if(as[0])
                        return as[0]
                }
            }else{
                range = this.selection.getRange();



                if ( range.collapsed ) {
                    node = this.selection.getStart();
                    if ( node && (node = domUtils.findParentByTagName( node, 'a', true )) ) {
                        return node;
                    }
                } else {
                    //trace:1111  如果是<p><a>xx</a></p> startContainer是p就会找不到a
                    range.shrinkBoundary();
                    var start = range.startContainer.nodeType  == 3 || !range.startContainer.childNodes[range.startOffset] ? range.startContainer : range.startContainer.childNodes[range.startOffset],
                        end =  range.endContainer.nodeType == 3 || range.endOffset == 0 ? range.endContainer : range.endContainer.childNodes[range.endOffset-1],

                        common = range.getCommonAncestor();


                    node = domUtils.findParentByTagName( common, 'a', true );
                    if ( !node && common.nodeType == 1){

                        var as = common.getElementsByTagName( 'a' ),
                            ps,pe;

                        for ( var i = 0,ci; ci = as[i++]; ) {
                            ps = domUtils.getPosition( ci, start ),pe = domUtils.getPosition( ci,end);
                            if ( (ps & domUtils.POSITION_FOLLOWING || ps & domUtils.POSITION_CONTAINS)
                                &&
                                (pe & domUtils.POSITION_PRECEDING || pe & domUtils.POSITION_CONTAINS)
                                ) {
                                node = ci;
                                break;
                            }
                        }
                    }

                    return node;
                }
            }


        }
    };


})();

///import core
///commands 清除格式
/**
 * @description 清除格式
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     removeformat清除格式命令
 * @param   {String}   tags                以逗号隔开的标签。如：span,a
 * @param   {String}   style               样式
 * @param   {String}   attrs               属性
 * @param   {String}   notIncluedA    是否把a标签切开
 * @author zhanyi
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd;
    baidu.editor.commands['removeformat'] = {
        execCommand : function( cmdName, tags, style, attrs,notIncludeA ) {
            var tagReg = new RegExp( '^(?:' + (tags || this.options.removeFormatTags).replace( /,/g, '|' ) + ')$', 'i' ) ,
                removeFormatAttributes = style ? [] : (attrs || this.options.removeFormatAttributes).split( ',' ),
                range = new baidu.editor.dom.Range( this.document ),
                bookmark,node,parent,
                filter = function( node ) {
                    return node.nodeType == 1;
                };

            function doRemove( range ) {
                
                var bookmark1 = range.createBookmark();
                if ( range.collapsed ) {
                    range.enlarge( true );
                }

             //不能把a标签切了
                if(!notIncludeA){
                    var aNode = domUtils.findParentByTagName(range.startContainer,'a',true);
                    if(aNode){
                        range.setStartBefore(aNode)
                    }

                    aNode = domUtils.findParentByTagName(range.endContainer,'a',true);
                    if(aNode){
                        range.setEndAfter(aNode)
                    }

                }
              
                
                bookmark = range.createBookmark();

                node = bookmark.start;
                
                //切开始
                while ( (parent = node.parentNode) && !domUtils.isBlockElm( parent ) ) {
                    domUtils.breakParent( node, parent );

                    domUtils.clearEmptySibling( node );
                }
                if ( bookmark.end ) {
                    //切结束
                    node = bookmark.end;
                    while ( (parent = node.parentNode) && !domUtils.isBlockElm( parent ) ) {
                        domUtils.breakParent( node, parent );
                        domUtils.clearEmptySibling( node );
                    }

                    //开始去除样式
                    var current = domUtils.getNextDomNode( bookmark.start, false, filter ),
                        next;
                    while ( current ) {
                        if ( current == bookmark.end ) {
                            break;
                        }

                        next = domUtils.getNextDomNode( current, true, filter );

                        if ( !dtd.$empty[current.tagName.toLowerCase()] && !domUtils.isBookmarkNode( current ) ) {
                            if ( tagReg.test( current.tagName ) ) {
                                if ( style ) {
                                    domUtils.removeStyle( current, style );
                                    if ( domUtils.isRedundantSpan( current ) && style != 'text-decoration')
                                        domUtils.remove( current, true );
                                } else {
                                    domUtils.remove( current, true )
                                }
                            } else {
                                //trace:939  不能把list上的样式去掉
                                if(!dtd.$tableContent[current.tagName] && !dtd.$list[current.tagName]){
                                    domUtils.removeAttributes( current, removeFormatAttributes );
                                    if ( domUtils.isRedundantSpan( current ) )
                                        domUtils.remove( current, true );
                                }

                            }
                        }
                        current = next;
                    }
                }
                //trace:1035
                //trace:1096 不能把td上的样式去掉，比如边框
                var pN = bookmark.start.parentNode;
                if(domUtils.isBlockElm(pN) && !dtd.$tableContent[pN.tagName] && !dtd.$list[pN.tagName]){
                    domUtils.removeAttributes(  pN,removeFormatAttributes );
                }
                pN = bookmark.end.parentNode;
                if(bookmark.end && domUtils.isBlockElm(pN) && !dtd.$tableContent[pN.tagName]&& !dtd.$list[pN.tagName]){
                    domUtils.removeAttributes(  pN,removeFormatAttributes );
                }
                range.moveToBookmark( bookmark ).moveToBookmark(bookmark1);
                //清除冗余的代码 <b><bookmark></b>
                var node = range.startContainer,
                    tmp,
                    collapsed = range.collapsed;
                while(node.nodeType == 1 && domUtils.isEmptyNode(node) && dtd.$removeEmpty[node.tagName]){
                    tmp = node.parentNode;
                    range.setStartBefore(node);
                    //trace:937
                    //更新结束边界
                    if(range.startContainer === range.endContainer){
                        range.endOffset--;
                    }
                    domUtils.remove(node);
                    node = tmp;
                }
             
                if(!collapsed){
                    node = range.endContainer;
                    while(node.nodeType == 1 && domUtils.isEmptyNode(node) && dtd.$removeEmpty[node.tagName]){
                        tmp = node.parentNode;
                        range.setEndBefore(node);
                        domUtils.remove(node);

                        node = tmp;
                    }


                }
            }

            if ( this.currentSelectedArr && this.currentSelectedArr.length ) {
                for ( var i = 0,ci; ci = this.currentSelectedArr[i++]; ) {
                    range.selectNodeContents( ci );
                    doRemove( range );
                }
                range.selectNodeContents( this.currentSelectedArr[0] ).select();
            } else {
                
                range = this.selection.getRange();
                doRemove( range );
                range.select();
            }
        }

    }
//    baidu.editor.contextMenuItems.push({
//        label : '清除样式',
//        cmdName : 'removeformat'
//    })
})();
///import core
///commands 引用
/**
 * 
 * 引用模块实现
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     blockquote引用
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd,
        getObj = function(editor){
            var startNode = editor.selection.getStart();
            return domUtils.findParentByTagName( startNode, 'blockquote', true )
        };

    baidu.editor.commands['blockquote'] = {
        execCommand : function( cmdName, attrs ) {
          
            var range = this.selection.getRange(),
                obj = getObj(this),
                blockquote = dtd.blockquote,
                bookmark = range.createBookmark(),
                tds = this.currentSelectedArr;


            if ( obj ) {
                if(tds && tds.length){
                    domUtils.remove(obj,true)
                }else{
                    var start = range.startContainer,
                        startBlock = domUtils.isBlockElm(start) ? start : domUtils.findParent(start,function(node){return domUtils.isBlockElm(node)}),

                        end = range.endContainer,
                        endBlock = domUtils.isBlockElm(end) ? end :  domUtils.findParent(end,function(node){return domUtils.isBlockElm(node)});

                    //处理一下li
                    startBlock = domUtils.findParentByTagName(startBlock,'li',true) || startBlock;
                    endBlock = domUtils.findParentByTagName(endBlock,'li',true) || endBlock;


                    if(startBlock.tagName == 'LI' || startBlock.tagName == 'TD' || startBlock === obj){
                        domUtils.remove(obj,true)
                    }else{
                        domUtils.breakParent(startBlock,obj);
                    }

                    if(startBlock !== endBlock){
                        obj = domUtils.findParentByTagName(endBlock,'blockquote');
                        if(obj){
                            if(endBlock.tagName == 'LI' || endBlock.tagName == 'TD'){
                                domUtils.remove(obj,true)
                            }else{
                                 domUtils.breakParent(endBlock,obj);
                            }
    
                        }
                    }

                    var blockquotes = domUtils.getElementsByTagName(this.document,'blockquote');
                    for(var i=0,bi;bi=blockquotes[i++];){
                        if(!bi.childNodes.length){
                            domUtils.remove(bi)
                        }else if(domUtils.getPosition(bi,startBlock)&domUtils.POSITION_FOLLOWING && domUtils.getPosition(bi,endBlock)&domUtils.POSITION_PRECEDING){
                            domUtils.remove(bi,true)
                        }
                    }
                }



            } else {

                var tmpRange = range.cloneRange(),
                    node = tmpRange.startContainer.nodeType == 1 ? tmpRange.startContainer : tmpRange.startContainer.parentNode,
                    preNode = node,
                    doEnd = 1;

                //调整开始
                while ( 1 ) {
                    if ( domUtils.isBody(node) ) {
                        if ( preNode !== node ) {
                            if ( range.collapsed ) {
                                tmpRange.selectNode( preNode );
                                doEnd = 0;
                            } else {
                                tmpRange.setStartBefore( preNode );
                            }
                        }else{
                            tmpRange.setStart(node,0)
                        }

                        break;
                    }
                    if ( !blockquote[node.tagName] ) {
                        if ( range.collapsed ) {
                            tmpRange.selectNode( preNode )
                        } else
                            tmpRange.setStartBefore( preNode);
                        break;
                    }

                    preNode = node;
                    node = node.parentNode;
                }
                
                //调整结束
               if ( doEnd ) {
                    preNode = node =  node = tmpRange.endContainer.nodeType == 1 ? tmpRange.endContainer : tmpRange.endContainer.parentNode;
                    while ( 1 ) {

                        if ( domUtils.isBody( node ) ) {
                            if ( preNode !== node ) {

                                    tmpRange.setEndAfter( preNode );
                                
                            } else {
                                tmpRange.setEnd( node, node.childNodes.length )
                            }

                            break;
                        }
                        if ( !blockquote[node.tagName] ) {
                            tmpRange.setEndAfter( preNode );
                            break;
                        }

                        preNode = node;
                        node = node.parentNode;
                    }

                }


                node = range.document.createElement( 'blockquote' );
                domUtils.setAttributes( node, attrs );
                node.appendChild( tmpRange.extractContents() );
                tmpRange.insertNode( node );
                //去除重复的
                var childs = domUtils.getElementsByTagName(node,'blockquote');
                for(var i=0,ci;ci=childs[i++];){
                    if(ci.parentNode){
                        domUtils.remove(ci,true)
                    }
                }

            }
            range.moveToBookmark( bookmark ).select()
        },
        queryCommandState : function() {
            return getObj(this) ? 1 : 0;
        }
    };
//    baidu.editor.contextMenuItems.push({
//        label : '引用',
//        cmdName : 'blockquote'
//    })

})();


///import core
///import commands\paragraph.js
///commands 首行缩进
/**
 * 首行缩进
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     outdent取消缩进，indent缩进
 */
(function (){
    var domUtils = baidu.editor.dom.domUtils;
    baidu.editor.commands['outdent'] = baidu.editor.commands['indent'] = {
        execCommand : function(cmd) {
             var me = this,
                 value = cmd.toLowerCase() == 'outdent' ? '0em' : (me.options.indentValue || '2em');
             me.execCommand('Paragraph','p',{'textIndent':value});
        }

    };
})();

///import core
///commands 打印
/**
 * @description 打印
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     print打印编辑器内容
 * @author zhanyi
 */
(function() {
    baidu.editor.commands['print'] = {
        execCommand : function(){
            this.window.print();
        },
        notNeedUndo : 1
    }
//    baidu.editor.contextMenuItems.push({
//        label : '打印',
//        cmdName : 'print'
//    })
})();


///import core
///commands 预览
/**
 * 预览
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     preview预览编辑器内容
 */
baidu.editor.commands['preview'] = {
    execCommand : function(){
        var me = this;
        var w = window.open('', '_blank', "");
        var d = w.document,
            utils = baidu.editor.utils;
        d.open();
        d.write('<html><head><link rel="stylesheet" type="text/css" href="' + utils.unhtml( this.options.iframeCssUrl ) + '"/><title></title></head><body>' +
            me.getContent() +
            '</body></html>');
        d.close();
    },
    notNeedUndo : 1
};
//baidu.editor.contextMenuItems.push({
//    label : '预览',
//    cmdName : 'preview'
//});

///import core
///commands 全选
/**
 * 选中所有
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName    selectall选中编辑器里的所有内容
 * @author zhanyi
*/
(function() {
    var browser = baidu.editor.browser;
    baidu.editor.commands['selectall'] = {
        execCommand : function(){
            this.document.execCommand('selectAll',false,null);
            //trace 1081
            !browser.ie && this.focus();
        },
        notNeedUndo : 1
    }
//    baidu.editor.contextMenuItems.push({
//        label : '全选',
//        cmdName : 'selectall'
//    })
})();


///import core
///commands 格式
/**
 * 段落样式
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     paragraph插入段落执行命令
 * @param   {String}   style               标签值为：'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
 * @param   {String}   attrs               标签的属性
 * @author zhanyi
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
        block = domUtils.isBlockElm,
        notExchange = ['TD','LI','PRE'],
        utils = baidu.editor.utils,
        browser = baidu.editor.browser,
        
        doParagraph = function(range,style,attrs){
            var bookmark = range.createBookmark(),
                filterFn = function( node ) {
                    return   node.nodeType == 1 ? node.tagName.toLowerCase() != 'br' &&  !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace( node )
                },
                para;

            range.enlarge( true );
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode( bookmark2.start, false, filterFn ),
                tmpRange = range.cloneRange(),
                tmpNode;
            while ( current && !(domUtils.getPosition( current, bookmark2.end ) & domUtils.POSITION_FOLLOWING) ) {
                if ( current.nodeType == 3 || !block( current ) ) {
                    tmpRange.setStartBefore( current );
                    while ( current && current !== bookmark2.end && !block( current ) ) {
                        tmpNode = current;
                        current = domUtils.getNextDomNode( current, false, null, function( node ) {
                            return !block( node )
                        } );
                    }
                    tmpRange.setEndAfter( tmpNode );
                    
                    para = range.document.createElement( style );
                    if(attrs){
                        for(var pro in attrs){
                            para.style[pro] = attrs[pro];
                        }
                    }
                    para.appendChild( tmpRange.extractContents() );

                    tmpRange.insertNode( para );

                    var parent = para.parentNode;
                    //如果para上一级是一个block元素且不是body,td就删除它
                    if ( block( parent ) && !domUtils.isBody( para.parentNode ) && utils.indexOf(notExchange,parent.tagName)==-1) {
                        //存储dir,style

                        parent.getAttribute('dir') && para.setAttribute('dir',parent.getAttribute('dir'));
                        //trace:1070
                        parent.style.cssText && (para.style.cssText = parent.style.cssText + ';' + para.style.cssText);
                        //trace:1030
                        parent.style.textAlign && !para.style.textAlign && (para.style.textAlign = parent.style.textAlign);
                        parent.style.textIndent && !para.style.textIndent && (para.style.textIndent = parent.style.textIndent);
                        parent.style.padding && !para.style.padding && (para.style.padding = parent.style.padding);
                        if(attrs && /h\d/i.test(parent.tagName)){
                           for(var pro in attrs){
                                parent.style[pro] = attrs[pro];
                           }
                            domUtils.remove(para,true);
                            para = parent;
                        }else
                            domUtils.remove( para.parentNode, true );

                    }
                    if(  utils.indexOf(notExchange,parent.tagName)!=-1){
                        current = parent;
                    }else{
                       current = para;
                    }


                    current = domUtils.getNextDomNode( current, false, filterFn );
                } else {
                    current = domUtils.getNextDomNode( current, true, filterFn );
                }
            }
            return range.moveToBookmark( bookmark2 ).moveToBookmark( bookmark );
        };

    baidu.editor.commands['paragraph'] = {
        execCommand : function( cmdName, style,attrs ) {
            var range = new baidu.editor.dom.Range(this.document);
            if(this.currentSelectedArr && this.currentSelectedArr.length > 0){
                for(var i=0,ti;ti=this.currentSelectedArr[i++];){
                    //trace:1079 不显示的不处理，插入文本，空的td也能加上相应的标签
                    if(ti.style.display == 'none') continue;
                    if(!domUtils.getChildCount(ti,function(node){return !domUtils.isBr(node) && !domUtils.isWhitespace(node)})){

                        var tmpTxt = this.document.createTextNode('paragraph');
                        ti.insertBefore(tmpTxt,ti.firstChild);
                    }
                    doParagraph(range.selectNodeContents(ti),style,attrs);
                    if(tmpTxt){
                        var pN = tmpTxt.parentNode;
                        domUtils.remove(tmpTxt);
                        //ie下空的block 不显示
                        if(browser.ie && !pN.firstChild){
                            pN.innerHTML = '&nbsp;'
                        }    
                    }


                }
                range.selectNode(this.currentSelectedArr[0]).select()
            }else{
                range = this.selection.getRange();
                 //闭合时单独处理
                if(range.collapsed){
                    var txt = this.document.createTextNode('p');
                    range.insertNode(txt);
                }
                range = doParagraph(range,style,attrs)
                if(txt){
                    range.setStartBefore(txt).collapse(true);
                    domUtils.remove(txt);
                }

                if(browser.gecko && range.collapsed && range.startContainer.nodeType == 1){
                    var child = range.startContainer.childNodes[range.startOffset];
                    if(child && child.nodeType == 1 && child.tagName.toLowerCase() == style){
                        range.setStart(child,0).collapse(true)
                    }
                }
                //trace:1097 原来有true，原因忘了，但去了就不能清除多余的占位符了
                range.select()

            }
            return true;
        },
        queryCommandValue : function() {
            var startNode = this.selection.getStart(),
                parent =  domUtils.findParentByTagName( startNode, ['p','h1','h2','h3','h4','h5','h6'], true );

            return  parent && parent.tagName.toLowerCase();
        }
    }


})();

///import core
///commands 输入的方向
/**
 * 输入的方向
 * @function
 * @name baidu.editor.execCommand
 * @param {String}   cmdName    directionality执行函数的参数
 * @param {String}    forward    ltr从左向右输入，rtl从右向左输入
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils,
        block = domUtils.isBlockElm ,
        getObj = function(editor){
            var startNode = editor.selection.getStart(),
                parents;
            if ( startNode ) {
                //查找所有的是block的父亲节点
                parents = domUtils.findParents( startNode, true, block, true );
                for ( var i = 0,ci; ci = parents[i++]; ) {
                    if ( ci.getAttribute( 'dir' ) ) {
                        return ci;
                    }

                }
            }
        },
        doDirectionality = function(range,editor,forward){
            
            var bookmark,
                filterFn = function( node ) {
                    return   node.nodeType == 1 ? !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace(node)
                },

                obj = getObj( editor );

            if ( obj && range.collapsed ) {
                obj.setAttribute( 'dir', forward );
                return range;
            }
            bookmark = range.createBookmark();
            range.enlarge( true );
            var bookmark2 = range.createBookmark(),
                current = domUtils.getNextDomNode( bookmark2.start, false, filterFn ),
                tmpRange = range.cloneRange(),
                tmpNode;
            while ( current &&  !(domUtils.getPosition( current, bookmark2.end ) & domUtils.POSITION_FOLLOWING) ) {
                if ( current.nodeType == 3 || !block( current ) ) {
                    tmpRange.setStartBefore( current );
                    while ( current && current !== bookmark2.end && !block( current ) ) {
                        tmpNode = current;
                        current = domUtils.getNextDomNode( current, false, null, function( node ) {
                            return !block( node )
                        } );
                    }
                    tmpRange.setEndAfter( tmpNode );
                    var common = tmpRange.getCommonAncestor();
                    if ( !domUtils.isBody( common ) && block( common ) ) {
                        //遍历到了block节点
                        common.setAttribute( 'dir', forward );
                        current = common;
                    } else {
                        //没有遍历到，添加一个block节点
                        var p = range.document.createElement( 'p' );
                        p.setAttribute( 'dir', forward );
                        var frag = tmpRange.extractContents();
                        p.appendChild( frag );
                        tmpRange.insertNode( p );
                        current = p;
                    }

                    current = domUtils.getNextDomNode( current, false, filterFn );
                } else {
                    current = domUtils.getNextDomNode( current, true, filterFn );
                }
            }
            return range.moveToBookmark( bookmark2 ).moveToBookmark( bookmark );
        };


    baidu.editor.commands['directionality'] = {
        execCommand : function( cmdName,forward ) {
            var range = new baidu.editor.dom.Range(this.document);
            if(this.currentSelectedArr && this.currentSelectedArr.length > 0){
                for(var i=0,ti;ti=this.currentSelectedArr[i++];){
                    if(ti.style.display != 'none')
                        doDirectionality(range.selectNode(ti),this,forward);
                }
                range.selectNode(this.currentSelectedArr[0]).select()
            }else{
                range = this.selection.getRange();
                //闭合时单独处理
                if(range.collapsed){
                    var txt = this.document.createTextNode('d');
                    range.insertNode(txt);
                }
                doDirectionality(range,this,forward);
                if(txt){
                    range.setStartBefore(txt).collapse(true);
                    domUtils.remove(txt);
                }

                range.select();
                

            }
            return true;
        },
        queryCommandValue : function() {
            var node = getObj(this);
            return node ? node.getAttribute('dir') : 'ltr'
        }
    }
})();


///import core
///import commands\inserthtml.js
///commands 分割线
/**
 * 分割线
 * @function
 * @name baidu.editor.execCommand
 * @param {String}     cmdName    horizontal插入分割线
 */
(function (){
    var domUtils = baidu.editor.dom.domUtils;
    baidu.editor.commands['horizontal'] = {
        execCommand : function( cmdName ) {
            if(this.queryCommandState(cmdName)!==-1){
                this.execCommand('insertHtml','<hr>');
                var range = this.selection.getRange(),
                    start = range.startContainer;
                if(start.nodeType == 1 && !start.childNodes[range.startOffset] ){

                    var tmp;
                    if(tmp = start.childNodes[range.startOffset - 1]){
                        if(tmp.nodeType == 1 && tmp.tagName == 'HR'){
                            if(this.options.enterTag == 'p'){
                                tmp = this.document.createElement('p');
                                range.insertNode(tmp);
                                range.setStart(tmp,0).setCursor();
        
                            }else{
                                tmp = this.document.createElement('br');
                                range.insertNode(tmp);
                                range.setStartBefore(tmp).setCursor();
                            }
                        }
                    }

                }
                return true;
            }

        },
        //边界在table里不能加分隔线
        queryCommandState : function() {
            var range = this.selection.getRange();
            return domUtils.findParentByTagName(range.startContainer,'table') ||
                domUtils.findParentByTagName(range.endContainer,'table') ? -1 : 0;
        }
    };
})();

///import core
///commands 日期,时间
/**
 * 插入日期
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName    date插入日期
 * @author zhuwenxuan
*/
/**
 * 插入时间
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName    time插入时间
 * @author zhuwenxuan
*/

baidu.editor.commands['time'] = {
    execCommand : function() {
        var date = new Date,
            min = date.getMinutes(),
            sec = date.getSeconds(),
            arr = [date.getHours(),min<10 ? "0"+min : min,sec<10 ? "0"+sec : sec];
        this.execCommand('insertHtml',arr.join(":"));
        return true;
    }
};
baidu.editor.commands['date'] = {
    execCommand : function() {
        var date = new Date,
            month = date.getMonth()+1,
            day = date.getDate(),
            arr = [date.getFullYear(),month<10 ? "0"+month : month,day<10?"0"+day:day];
        this.execCommand('insertHtml',arr.join("-"));
        return true;
    }
};




///import core
///commands 插入内容
///commands 插入框架
/**
 * @description 插入内容
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     inserthtml插入内容的命令
 * @param   {String}   html                要插入的内容
 * @author zhanyi
    */
(function(){
    var domUtils = baidu.editor.dom.domUtils,
        dtd = baidu.editor.dom.dtd,
        utils = baidu.editor.utils,
        browser = baidu.editor.browser;
    baidu.editor.commands['inserthtml'] = {
        execCommand: function (command,html){
            var editor = this,
                range,deletedElms, i,ci,
                div,
                tds = editor.currentSelectedArr;

            range = editor.selection.getRange();

            div = range.document.createElement( 'div' );
            div.style.display = 'inline';
            div.innerHTML = utils.trim( html );

            try{
                editor.adjustTable && editor.adjustTable(div);
            }catch(e){}


            if(tds && tds.length){
                for(var i=0,ti;ti=tds[i++];){
                    ti.className = ''
                }
                tds[0].innerHTML = '';
                range.setStart(tds[0],0).collapse(true);
                editor.currentSelectedArr = [];
            }

            if ( !range.collapsed ) {

                range.deleteContents();
                if(range.startContainer.nodeType == 1){
                    var child = range.startContainer.childNodes[range.startOffset],pre;
                    if(child && domUtils.isBlockElm(child) && (pre = child.previousSibling) && domUtils.isBlockElm(pre)){
                        range.setEnd(pre,pre.childNodes.length).collapse();
                        while(child.firstChild){
                            pre.appendChild(child.firstChild);

                        }
                        domUtils.remove(child);
                    }
                }

            }


            var child,parent,pre,tmp,hadBreak = 0;
            while ( child = div.firstChild ) {
                range.insertNode( child );
                if ( !hadBreak && child.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm( child ) ){

                    parent = domUtils.findParent( child,function ( node ){ return domUtils.isBlockElm( node ); } );
                    if ( parent && parent.tagName.toLowerCase != 'body' && !(dtd[parent.tagName][child.nodeName] && child.parentNode === parent)){
                        if(!dtd[parent.tagName][child.nodeName]){
                            pre = parent;
                        }else{
                            tmp = child.parentNode;
                            while (tmp !== parent){
                                pre = tmp;
                                tmp = tmp.parentNode;
    
                            }    
                        }
                        
                       
                        domUtils.breakParent( child, pre || tmp );
                        //去掉break后前一个多余的节点  <p>|<[p> ==> <p></p><div></div><p>|</p>
                        var pre = child.previousSibling;
                        domUtils.trimWhiteTextNode(pre);
                        if(!pre.childNodes.length){
                            domUtils.remove(pre);
                        }
                        hadBreak = 1;
                    }
                }
                var next = child.nextSibling;
                if(!div.firstChild && next && domUtils.isBlockElm(next)){

                    range.setStart(next,0).collapse(true);
                    break;
                }
                range.setEndAfter( child ).collapse();

            }
//            if(!range.startContainer.childNodes[range.startOffset] && domUtils.isBlockElm(range.startContainer)){
//                next = editor.document.createElement('br');
//                range.insertNode(next);
//                range.collapse(true);
//            }
            //block为空无法定位光标

            child = range.startContainer;
            //用chrome可能有空白展位符
            if(domUtils.isBlockElm(child) && domUtils.isEmptyNode(child)){
                child.innerHTML = baidu.editor.browser.ie ? '' : '<br/>'
            }
            //加上true因为在删除表情等时会删两次，第一次是删的fillData
            range.select(true);


            setTimeout(function(){
                range.scrollToView(editor.autoHeightEnabled,editor.autoHeightEnabled ? domUtils.getXY(editor.iframe).y:0);
            },200)



            
        }
    };
}());

///import core
///import commands\rowspacing.js
///commands 行间距
/**
 * @description 设置行距
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     rowspacing设置行间距
 * @param   {String}   value              值，以px为单位
 * @author zhanyi
 */
(function(){
    
    var domUtils = baidu.editor.dom.domUtils;
    baidu.editor.commands['rowspacing'] =  {
        execCommand : function( cmdName,value ) {
            this.execCommand('paragraph','p',{'padding' : value + 'px 0'});
            return true;
        },
        queryCommandValue : function() {
            var startNode = this.selection.getStart(),
                pN = domUtils.findParent(startNode,function(node){return domUtils.isBlockElm(node)},true),
                value;
            //trace:1026
            if(pN){
                value = domUtils.getComputedStyle(pN,'padding-top').replace(/[^\d]/g,'');
                return value*1 <= 10 ? 0 : value;
            }
            return 0;
             
        }
    }

})();

///import core
///commands 清空文档
/**
 *
 * 清空文档
 * @function
 * @name baidu.editor.execCommand
 * @param   {String}   cmdName     cleardoc清空文档
 */
(function(){
    function setRange(range,node){
        range.setStart(node,0).setCursor();
    }
    baidu.editor.commands['cleardoc'] = {
        execCommand : function( cmdName) {
            var me = this,
                enterTag = me.options.enterTag,
                browser = baidu.editor.browser,
                range = this.selection.getRange();
            if(enterTag == "br"){
                this.body.innerHTML = "<br/>";
                setRange(range,this.body);
            }else{
                //不用&nbsp;也能定位，所以去掉，chrom也可以不要br,ff不行再想定位回去不行了，需要br
                this.body.innerHTML = "<p>"+(browser.ie ? "" : "<br/>")+"</p>";
                me.focus();
                setRange(range,me.body.firstChild);
            }
        }
    };
})();

///import core
///commands 锚点
/**
 * 锚点
 * @function
 * @name baidu.editor.execCommands
 * @param    {String}    cmdName     cmdName="anchor"插入锚点
 */
(function (){
    var domUtils = baidu.editor.dom.domUtils;
    baidu.editor.commands['anchor'] = {
        execCommand : function (cmd, name){
            var range = this.selection.getRange();
            var img = range.getClosedNode();
            if(img && img.getAttribute('anchorname')){
                if(name){
                    img.setAttribute('anchorname',name);
                }else{
                    range.setStartBefore(img).setCursor();
                    domUtils.remove(img);
                }
            }else{
                if(name){
                    //只在选区的开始插入
                    var anchor = this.document.createElement('img');
                    range.collapse(true);
                    anchor.setAttribute('anchorname',name);
                    anchor.className = 'anchorclass';

                    range.insertNode(anchor).setStartAfter(anchor).collapse(true).select(true);
                    //baidu.editor.browser.gecko && anchor.parentNode.insertBefore(this.document.createElement('br'),anchor.nextSibling)
                }
            }
        }
    };
})();

///import core
///commands 删除
/**
 * 删除
 * @function
 * @name baidu.editor.execCommand
 * @param  {String}    cmdName    delete删除
 */
(function (){
    var domUtils = baidu.editor.dom.domUtils,
        browser = baidu.editor.browser;
    baidu.editor.commands['delete'] = {
        execCommand : function (){
            
            var range = this.selection.getRange(),
            
                mStart = 0,
                mEnd = 0,
                me = this;
            if(range.collapsed)
                return;
            while(!range.startOffset &&  !domUtils.isBody(range.startContainer) ){
                mStart = 1;
                range.setStartBefore(range.startContainer);
            }

            while(!domUtils.isBody(range.endContainer)){
                var child,endContainer = range.endContainer,endOffset = range.endOffset;
                if(endContainer.nodeType == 3 &&  endOffset == endContainer.nodeValue.length){
                    range.setEndAfter(endContainer);
                    continue;
                }
                child = endContainer.childNodes[endOffset];
                if(!child || domUtils.isBr(child) && endContainer.lastChild === child){
                    range.setEndAfter(endContainer);
                    continue;
                }
                break;

            }
            if(mStart){
                var start = me.document.createElement('span');
                start.innerHTML = 'start';
                start.id = '_baidu_cut_start';
                range.insertNode(start).setStartBefore(start)
            }
            if(mEnd){
                var end = me.document.createElement('span');
                end.innerHTML = 'end';
                end.id = '_baidu_cut_end';
                range.cloneRange().collapse(false).insertNode(end);
                range.setEndAfter(end)

            }



            range.deleteContents();


            if(domUtils.isBody(range.startContainer) && domUtils.isEmptyNode(me.body)){
                me.body.innerHTML = '<p>'+(browser.ie?'':'<br/>')+'</p>';
                range.setStart(me.body.firstChild,0).collapse(true);
            }

            range.select(true)
        },
        queryCommandState : function(){
            return this.selection.getRange().collapsed ? -1 : 0;
        }
    };
})();

///import core
///commands 添加分页功能
/**
 * @description 添加分页功能
 * @author zhanyi
 */
(function() {

    var editor = baidu.editor,
        domUtils = editor.dom.domUtils,
        notBreakTags = ['td'];

    baidu.editor.plugins['pagebreak'] = function() {
        var me = this;
        me.commands['pagebreak'] = {
            execCommand:function(){
                
                var range = me.selection.getRange();

                var div = me.document.createElement('div');
                div.className = 'pagebreak';
                domUtils.unselectable(div);
                //table单独处理
                var node = domUtils.findParentByTagName(range.startContainer,notBreakTags,true),
                 
                    parents = [],pN;
                if(node){
                    switch (node.tagName){
                        case 'TD':
                            pN = node.parentNode;
                            if(!pN.previousSibling){
                                var table = domUtils.findParentByTagName(pN,'table');
                                table.parentNode.insertBefore(div,table);
                                parents = domUtils.findParents(div,true);
                                
                            }else{
                                pN.parentNode.insertBefore(div,pN);
                                parents = domUtils.findParents(div);

                            }
                            pN = parents[1];
                            if(div!==pN){
                                domUtils.breakParent(div,pN);
                            }
                            
                            range.moveToBookmark(bk).select();
                            domUtils.clearSelectedArr(me.currentSelectedArr);
                    }
                    
                }else{

                    if(!range.collapsed){
                        range.deleteContents();
                        var start = range.startContainer;
                        while(domUtils.isBlockElm(start) && domUtils.isEmptyNode(start)){
                            range.setStartBefore(start).collapse(true);
                            domUtils.remove(start);
                            start = range.startContainer;
                        }
                        
                    }
                    parents = domUtils.findParents(range.startContainer,true);
                    pN = parents[1];
                    range.insertNode(div);
                    pN && domUtils.breakParent(div,pN);
                    range.setEndAfter(div).setCursor(true,true)

                }
                
            }
        }

     
    }

})();

///import core
///commands 撤销和重做
/**
 * @description 回退
 * @author zhanyi
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils,
        fillchar = new RegExp(baidu.editor.dom.domUtils.fillChar + '|<\/hr>','gi'),// ie会产生多余的</hr>
        browser = baidu.editor.browser;
    baidu.editor.plugins['undo'] = function() {
        var me = this,
            maxUndoCount = me.options.maxUndoCount,
            maxInputCount = me.options.maxInputCount,
            //在比较时，需要过滤掉这些属性
            specialAttr = /\b(?:href|src|name)="[^"]*?"/gi;

        function UndoManager() {

            this.list = [];
            this.index = 0;
            this.hasUndo = false;
            this.hasRedo = false;
            this.undo = function() {

                if ( this.hasUndo ) {
                    var currentScene = this.getScene(),
                        lastScene = this.list[this.index];
                    if ( lastScene.content.replace(specialAttr,'') != currentScene.content.replace(specialAttr,'') ) {
                        this.save();
                    }
                                        if(!this.list[this.index - 1] && this.list.length == 1){
                        this.reset();
                        return;
                    }
                    while ( this.list[this.index].content == this.list[this.index - 1].content ) {
                        this.index--;
                        if ( this.index == 0 ) {
                            return this.restore( 0 )
                        }
                    }
                    this.restore( --this.index );
                }
            };
            this.redo = function() {
                if ( this.hasRedo ) {
                    while ( this.list[this.index].content == this.list[this.index + 1].content ) {
                        this.index++;
                        if ( this.index == this.list.length - 1 ) {
                            return this.restore( this.index )
                        }
                    }
                    this.restore( ++this.index );
                }
            };

            this.restore = function() {

                var scene = this.list[this.index];
                //trace:873
                //去掉展位符
                me.document.body.innerHTML = scene.bookcontent.replace(fillchar,'');
                var range = new baidu.editor.dom.Range( me.document );
                range.moveToBookmark( {
                    start : '_baidu_bookmark_start_',
                    end : '_baidu_bookmark_end_',
                    id : true
                //去掉true 是为了<b>|</b>，回退后还能在b里
                //todo safari里输入中文时，会因为改变了dom而导致丢字
                } ).select(!browser.gecko);
                 setTimeout(function(){
                    range.scrollToView(me.autoHeightEnabled,me.autoHeightEnabled ? domUtils.getXY(me.iframe).y:0);
                },200)

                this.update();
                //table的单独处理
                if(me.currentSelectedArr){
                    me.currentSelectedArr = [];
                    var tds = me.document.getElementsByTagName('td');
                    for(var i=0,td;td=tds[i++];){
                        if(td.className == me.options.selectedTdClass){
                             me.currentSelectedArr.push(td);
                        }
                    }
                }
                 this.clearKey();
            };

            this.getScene = function() {
                var range = me.selection.getRange(),
                    cont = me.body.innerHTML.replace(fillchar,'');
                baidu.editor.browser.ie && (cont = cont.replace(/>&nbsp;</g,'><').replace(/\s*</g,'').replace(/>\s*/g,'>'));
                var bookmark = range.createBookmark( true, true ),
                    bookCont = me.body.innerHTML.replace(fillchar,'');
                
                range.moveToBookmark( bookmark ).select( true );
                return {
                    bookcontent : bookCont,
                    content : cont
                }
            };
            this.save = function() {

                var currentScene = this.getScene(),
                    lastScene = this.list[this.index];
                //内容相同位置相同不存
                if ( lastScene && lastScene.content == currentScene.content &&
                        lastScene.bookcontent == currentScene.bookcontent
                ) {
                    return;
                }

                this.list = this.list.slice( 0, this.index + 1 );
                this.list.push( currentScene );
                //如果大于最大数量了，就把最前的剔除
                if ( this.list.length > maxUndoCount ) {
                    this.list.shift();
                }
                this.index = this.list.length - 1;
                this.clearKey();
                //跟新undo/redo状态
                this.update()
            };
            this.update = function() {
                this.hasRedo = this.list[this.index + 1] ? true : false;
                this.hasUndo = this.list[this.index - 1] || this.list.length == 1 ? true : false;

            };
            this.reset = function() {
                this.list = [];
                this.index = 0;
                this.hasUndo = false;
                this.hasRedo = false;
                this.clearKey();

            };
            this.clearKey = function(){
                 keycont = 0;
                lastKeyCode = null;
            }
        }

        me.undoManger = new UndoManager();
        function saveScene() {

            this.undoManger.save()
        }

        me.addListener( 'beforeexeccommand', saveScene );
        me.addListener( 'afterexeccommand', saveScene );
        
        me.addListener('reset',function(){
            me.undoManger.reset();
        });
        me.commands['redo'] = me.commands['undo'] = {
            execCommand : function( cmdName ) {
                me.undoManger[cmdName]();
            },
            queryCommandState : function( cmdName ) {

                return me.undoManger['has' + (cmdName.toLowerCase() == 'undo' ? 'Undo' : 'Redo')] ? 0 : -1;
            },
            notNeedUndo : 1
        };

        var keys = {
             //  /*Backspace*/ 8:1, /*Delete*/ 46:1,
                /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1,
                37:1, 38:1, 39:1, 40:1,
                13:1 /*enter*/
            },
            keycont = 0,
            lastKeyCode;

        me.addListener( 'keydown', function( type, evt ) {
            var keyCode = evt.keyCode || evt.which;

            if ( !keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey ) {

                if ( me.undoManger.list.length == 0 || ((keyCode == 8 ||keyCode == 46) && lastKeyCode != keyCode) ) {

                    me.undoManger.save();
                    lastKeyCode = keyCode;
                    return

                }
                //trace:856
                //修正第一次输入后，回退，再输入要到keycont>maxInputCount才能在回退的问题
                if(me.undoManger.list.length == 2 && me.undoManger.index == 0 && keycont == 0){
                    me.undoManger.list.splice(1,1);
                    me.undoManger.update();
                }
                lastKeyCode = keyCode;
                keycont++;
                if ( keycont > maxInputCount ) {

                    setTimeout( function() {
                        me.undoManger.save();
                    }, 0 );

                }
            }
        } )
    };
})();

///import core
///import commands/inserthtml.js
///import plugins/undo/undo.js
///import plugins/serialize/serialize.js
///commands 粘贴
/*
 ** @description 粘贴
 * @author zhanyi
 */
(function() {

	var domUtils = baidu.editor.dom.domUtils,
        browser = baidu.editor.browser;

    function getClipboardData( callback ) {

        var doc = this.document;

        if ( doc.getElementById( 'baidu_pastebin' ) ) {
            return;
        }

        var range = this.selection.getRange(),
            bk = range.createBookmark(),
            //创建剪贴的容器div
            pastebin = doc.createElement( 'div' );

        pastebin.id = 'baidu_pastebin';

        // Safari 要求div必须有内容，才能粘贴内容进来
        browser.webkit && pastebin.appendChild( doc.createTextNode( domUtils.fillChar + domUtils.fillChar ) );
        doc.body.appendChild( pastebin );
        //trace:717 隐藏的span不能得到top
        //bk.start.innerHTML = '&nbsp;';
        bk.start.style.display = '';
        pastebin.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" +
            //要在现在光标平行的位置加入，否则会出现跳动的问题
            domUtils.getXY( bk.start ).y + 'px';

        range.selectNodeContents( pastebin ).select( true );

        setTimeout( function() {
            if (browser.webkit) {
                // webkit/chrome可能会粘贴出两个pastebin来. 原始的那个可能里面为空.
                // 真正有内容的那个始终是后面的那个，所以直接取后面的
                var pastebins = doc.querySelectorAll('#baidu_pastebin');
                var lastPastebin = pastebins[pastebins.length - 1];
                if (pastebin !== lastPastebin) {
                    pastebin.parentNode.removeChild(pastebin);
                    pastebin = lastPastebin;
                }
            }
			pastebin.parentNode.removeChild(pastebin);
            range.moveToBookmark( bk ).select(true);
            callback( pastebin );
        }, 0 );


    }

    baidu.editor.plugins['paste'] = function() {
        var me = this;

        var pasteplain = me.options.pasteplain;
        var modify_num = {flag:""};
        me.commands['pasteplain'] = {
            queryCommandState: function (){
                return pasteplain;
            },
            execCommand: function (){
                pasteplain = !pasteplain|0;
            },
            notNeedUndo : 1
        };

        function filter(div){
            var html;
            if ( div.firstChild ) {
                    //去掉cut中添加的边界值
                    var nodes = domUtils.getElementsByTagName(div,'span');
                    for(var i=0,ni;ni=nodes[i++];){
                        if(ni.id == '_baidu_cut_start' || ni.id == '_baidu_cut_end'){
                            domUtils.remove(ni)
                        }
                    }


                    if(browser.webkit){
                        var divs = div.querySelectorAll('div #baidu_pastebin'),p;
                        for(var i=0,di;di=divs[i++];){
                            p = me.document.createElement('p');
                            while(di.firstChild){
                                p.appendChild(di.firstChild)
                            }
                            di.parentNode.insertBefore(p,di);
                            domUtils.remove(di,true)
                        }
                        var spans = div.querySelectorAll('span.Apple-style-span');
                        for(var i=0,ci;ci=spans[i++];){
                            domUtils.remove(ci,true);
                        };
                        var metas = div.querySelectorAll('meta');
                        for(var i=0,ci;ci=metas[i++];){
                            domUtils.remove(ci);
                        };
                        //<div><br></div>会造成多余的空行
                        var brs = div.querySelectorAll('div br');
                        for(var i=0,bi;bi=brs[i++];){
                            var pN = bi.parentNode;
                            if(pN.tagName == 'DIV' && pN.childNodes.length ==1){
                                domUtils.remove(pN)
                            }
                        }

                    }
                    if(browser.gecko){
                        var dirtyNodes = div.querySelectorAll('[_moz_dirty]')
                        for(i=0;ci=dirtyNodes[i++];){
                            ci.removeAttribute( '_moz_dirty' )
                        }
                    }


                    html = div.innerHTML;

                    var f = me.serialize;
                    if(f){
                        try{
                            var node =  f.transformInput(
                                        f.parseHTML(
                                            f.word(html), true
                                        )
                                    );
                            //trace:924
                            //纯文本模式也要保留段落
                            node = f.filter(node,pasteplain ? {
                                whiteList: {
                                    'p': {$:{}}
                                },
                                blackList: {
                                    'style':1,
                                    'script':1,
                                    'object':1
                                }
                            } : null, modify_num);

                            if(browser.webkit){
                                var length = node.children.length,
                                    child;
                                while((child = node.children[length-1]) && child.tag == 'br'){
                                    node.children.splice(length-1,1);
                                    length = node.children.length;
                                }
                            }
                            html = f.toHTML(node)

                        }catch(e){}

                    }

                    //自定义的处理
                    me.fireEvent('beforepaste',html);
                    me.execCommand( 'insertHtml',html);

                }
        }

        me.addListener('ready',function(){
            domUtils.on(me.body,'cut',function(){

                var range = me.selection.getRange();
                if(!range.collapsed && me.undoManger){
                    me.undoManger.save()
                }
                //这个先注销了，有很多问题
//                //修正剪切不能把整个元素剪切出来
//                range = me.selection.getRange();
//                if( !range.collapsed){
//                    var mStart = 0,
//                        mEnd = 0;
//                    while(!range.startOffset && !domUtils.isBody(range.startContainer)){
//                        mStart = 1;
//                        range.setStartBefore(range.startContainer);
//                    }
//                    while(!domUtils.isBody(range.endContainer) && range.endOffset == (range.endContainer.nodeType == 1 ? range.endContainer.childNodes.length : range.endContainer.nodeValue.length)){
//                        mEnd = 1;
//                        range.setEndAfter(range.endContainer);
//                        if(browser.webkit){
//                            var child = range.endContainer.childNodes[range.endOffset];
//                            if(child && child.nodeType == 1 && child.tagName == 'BR' && range.endContainer.lastChild === child){
//                                range.setEndAfter(child);
//                            }
//                        }
//
//                    }
//                    if(mStart){
//                        var start = me.document.createElement('span');
//                        start.innerHTML = 'start';
//                        start.id = '_baidu_cut_start';
//                        range.insertNode(start).setStartBefore(start)
//                    }
//                    if(mEnd){
//                        var end = me.document.createElement('span');
//                        end.innerHTML = 'end';
//                        end.id = '_baidu_cut_end';
//                        range.cloneRange().collapse(false).insertNode(end);
//                        range.setEndAfter(end)
//
//                    }
//                    range.select();
//                    if(browser.ie){
//                        setTimeout(function(){
//                            var node = me.document.getElementById('_baidu_cut_end');
//                            node && domUtils.remove(node)
//                        },50)
//                    }
//
//                }
            });
            //ie下beforepaste在点击右键时也会触发，所以用监控键盘才处理

            domUtils.on(me.body, browser.ie ? 'keydown' : 'paste',function(e){
                if(browser.ie && (!e.ctrlKey || e.keyCode != '86'))
                    return;
                getClipboardData.call( me, function( div ) {
                    filter(div);
                    function hideMsg(){
                         me.ui.hideToolbarMsg();
                         me.removeListener("selectionchange",hideMsg);
                    }
                    if ( modify_num.flag && me.ui){
                        me.ui.showToolbarMsg( me.options.messages.pasteMsg );
                        modify_num.flag = "";
                        //trance:为了解决fireevent  (selectionchange)事件的延时
                        setTimeout(function(){
                            me.addListener("selectionchange",hideMsg);
                        },100);

                    }
                } );


            })
        });

    }

})();


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
        },
        browser = baidu.editor.browser;
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
                    start = domUtils.findParentByTagName(range.startContainer, ['ol','ul'], true),
                    end = domUtils.findParentByTagName(range.endContainer, ['ol','ul'], true);
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
                                p.innerHTML = browser.ie ? '' : '<br/>';
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
                                    domUtils.remove(li,true)
                                }
                            }
                            range.moveToBookmark(bk).select();


                        }else{
//                             var first = domUtils.isBlockElm(li.firstChild) ? li.firstChild : li;
                            var first = li.firstChild;
                            if(!first || !domUtils.isBlockElm(first)){
                                 var p = me.document.createElement('p');
                                 p.innerHTML = browser.ie || li.firstChild ? '' : '<br/>';
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
                                    p.innerHTML = browser.ie ? '' : '<br/>';
                                    nextLi.appendChild(p);
                                    first = p;
                                }
                                if (domUtils.isEmptyNode(first)) {
                                    first.innerHTML = browser.ie ? '' : '<br/>';
                                }

                                range.setStart(first, 0).collapse(true).shrinkBoundary().select();
                                domUtils.remove(span);
                                pre = nextLi.previousSibling;
                                if(pre && domUtils.isEmptyBlock(pre)){
                                    pre.innerHTML = '<p>'+(browser.ie ? '' : '<br/>')+'</p>'
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
        this.indentChar = config.indentChar || '  ';
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
                this.visitText(node.data);
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
            } else if (!dtd.$inline[tag] && !(dtd[tag] && dtd[tag]['#'])) {
                this.newline();
                this.indent();
            }
            this.buff.push('</', tag, '>');
        },
        visitText: function (text){
            if (this.indenting) {
                this.indent();
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

    function selectTextarea(textarea){
        var range;
        if (browser.ie) {
            range = textarea.createTextRange();
            range.collapse(true);
            range.select();
        } else {
            //todo: chrome下无法设置焦点
            textarea.setSelectionRange(0, 0);
            textarea.focus();
        }
    }
    function createTextarea(container){

        var textarea = document.createElement('textarea');
        textarea.style.cssText = 'resize:none;width:100%;height:100%;border:0;padding:0;margin:0;';
        container.appendChild(textarea);
        return textarea;
    }

    baidu.editor.plugins['source'] = function (){
        var editor = this;
        editor.initPlugins(['serialize']);

        var formatter = new SourceFormater(editor.options.source);
        var sourceMode = false;
        var textarea;

        editor.addListener('ready', function (){
            var container = editor.iframe.parentNode;
            //textarea = createTextarea(container);
            if (browser.ie && browser.version < 8) {
                container.onresize = function (){
                    if(textarea){
                        textarea.style.width = this.offsetWidth + 'px';
                        textarea.style.height = this.offsetHeight + 'px';
                    }

                };
            }
            container = null;
        });

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
                    var content = formatter.format(editor.getContent());
                    textarea = createTextarea(editor.iframe.parentNode);

                    textarea.value = content;
                    if (browser.ie && browser.version < 8) {
                        textarea.style.height = editor.iframe.parentNode.offsetHeight + 'px';
                        textarea.style.width = editor.iframe.parentNode.offsetWidth + 'px';
                    }
                        setTimeout(function (){
                        selectTextarea(textarea);
                    });
                } else {
                    

                    editor.iframe.style.cssText = bakCssText;
                    editor.setContent(textarea.value|| '<p><br/></p>');
                    domUtils.remove(textarea);
                    textarea = null;
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

                            document.body.appendChild(input);

                            editor.body.contentEditable = false;
                            setTimeout(function(){

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
        if(browser.ie){
            editor.addListener('fullscreenchanged',function(type,fullscreen){
                if(fullscreen && textarea){
                    textarea.style.height = editor.iframe.parentNode.offsetHeight + 'px';
                    textarea.style.width = editor.iframe.parentNode.offsetWidth + 'px';
                }
            })
        }
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

            if(sourceMode && textarea ){
                var html = textarea.value;
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
    };

})();
///import core
///commands 快捷键
//配置快捷键
baidu.editor.plugins['shortcutkeys'] = function(){
    var editor = this,
        shortcutkeys =  baidu.editor.utils.extend({
    		 "ctrl+66" : "Bold" //^B
        	,"ctrl+90" : "Undo" //undo
        	,"ctrl+89" : "Redo" //redo
       		,"ctrl+73" : "Italic" //^I
       		,"ctrl+85" : "Underline:Underline" //^U
        	,"ctrl+shift+67" : "removeformat" //清除格式
        	,"ctrl+shift+76" : "justify:left" //居左
        	,"ctrl+shift+82" : "justify:right" //居右
        	,"ctrl+65" : "selectAll"
//        	,"9"	   : "indent" //tab
    	},editor.options.shortcutkeys);
    editor.addListener('keydown',function(type,e){

        var keyCode = e.keyCode || e.which,value;
		for ( var i in shortcutkeys ) {
		    if ( /^(ctrl)(\+shift)?\+(\d+)$/.test( i.toLowerCase() ) || /^(\d+)$/.test( i ) ) {
		        if ( ( (RegExp.$1 == 'ctrl' ? (e.ctrlKey||e.metaKey) : 0)
                        && (RegExp.$2 != "" ? e[RegExp.$2.slice(1) + "Key"] : 1)
                        && keyCode == RegExp.$3
                    ) ||
                     keyCode == RegExp.$1
                ){

                    value = shortcutkeys[i].split(':');
                    editor.execCommand( value[0],value[1]);
                    e.preventDefault ? e.preventDefault() : (e.returnValue = false);

		        }
		    }
		}
    });

};
///import core
///import plugins/undo/undo.js
///commands 设置回车标签p或br
/**
 * @description 处理回车
 * @author zhanyi
 */
(function() {

    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils,
        hTag;
    baidu.editor.plugins['enterkey'] = function() {
        var me = this,
            tag = me.options.enterTag;

        me.addListener('keyup', function(type, evt) {

            var keyCode = evt.keyCode || evt.which;
            if (keyCode == 13) {
                var range = me.selection.getRange(),
                    start = range.startContainer,
                    doSave;

                //修正在h1-h6里边回车后不能嵌套p的问题
                if (!browser.ie) {

                    if (/h\d/i.test(hTag)) {
                        if (browser.gecko) {
                            var h = domUtils.findParentByTagName(start, [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6','blockquote'], true);
                            if (!h) {
                                me.document.execCommand('formatBlock', false, '<p>');
                                doSave = 1;
                            }
                        } else {
                            //chrome remove div
                            if (start.nodeType == 1) {
                                var tmp = me.document.createTextNode(''),div;
                                range.insertNode(tmp);
                                div = domUtils.findParentByTagName(tmp, 'div', true);
                                if (div) {
                                    var p = me.document.createElement('p');
                                    while (div.firstChild) {
                                        p.appendChild(div.firstChild);
                                    }
                                    div.parentNode.insertBefore(p, div);
                                    domUtils.remove(div);
                                    range.setStartBefore(tmp).setCursor();
                                    doSave = 1;
                                }
                                domUtils.remove(tmp);

                            }
                        }

                        if (me.undoManger && doSave) {
                            me.undoManger.save()
                        }
                    }

                }
                range = me.selection.getRange();
                setTimeout(function() {
                    range.scrollToView(me.autoHeightEnabled, me.autoHeightEnabled ? domUtils.getXY(me.iframe).y : 0);
                }, 50)

            }
        });

        me.addListener('keydown', function(type, evt) {

            var keyCode = evt.keyCode || evt.which;
            if (keyCode == 13) {//回车
                if (me.undoManger) {
                    me.undoManger.save()
                }
                hTag = '';


                var range = me.selection.getRange();

                if (!range.collapsed) {
                    //跨td不能删
                    var start = range.startContainer,
                        end = range.endContainer,
                        startTd = domUtils.findParentByTagName(start, 'td', true),
                        endTd = domUtils.findParentByTagName(end, 'td', true);
                    if (startTd && endTd && startTd !== endTd || !startTd && endTd || startTd && !endTd) {
                        evt.preventDefault ? evt.preventDefault() : ( evt.returnValue = false);
                        return;
                    }
                }
                me.currentSelectedArr && domUtils.clearSelectedArr(me.currentSelectedArr);

                if (tag == 'p') {


                    if (!browser.ie) {

                        start = domUtils.findParentByTagName(range.startContainer, ['ol','ul','p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6','blockquote'], true);


                        if (!start) {

                            me.document.execCommand('formatBlock', false, '<p>');
                            if (browser.gecko) {
                                range = me.selection.getRange();
                                start = domUtils.findParentByTagName(range.startContainer, 'p', true);
                                start && domUtils.removeDirtyAttr(start);
                            }
                            

                        } else {
                            hTag = start.tagName;
                            start.tagName.toLowerCase() == 'p' && browser.gecko && domUtils.removeDirtyAttr(start);
                        }

                    }

                } else {
                    evt.preventDefault ? evt.preventDefault() : ( evt.returnValue = false);
                    
                    if (!range.collapsed) {
                        range.deleteContents();
                        start = range.startContainer;
                        if (start.nodeType == 1 && (start = start.childNodes[range.startOffset])) {
                            while (start.nodeType == 1) {
                                if (baidu.editor.dom.dtd.$empty[start.tagName]) {
                                    range.setStartBefore(start).setCursor();
                                    if (me.undoManger) {
                                        me.undoManger.save()
                                    }
                                    return false;
                                }
                                if (!start.firstChild) {
                                    var br = range.document.createElement('br');
                                    start.appendChild(br);
                                    range.setStart(start, 0).setCursor();
                                    if (me.undoManger) {
                                        me.undoManger.save()
                                    }
                                    return false;
                                }
                                start = start.firstChild
                            }
                            if (start === range.startContainer.childNodes[range.startOffset]) {
                                br = range.document.createElement('br');
                                range.insertNode(br).setCursor();

                            } else {
                                range.setStart(start, 0).setCursor();
                            }


                        } else {
                            br = range.document.createElement('br');
                            range.insertNode(br).setStartAfter(br).setCursor();
                        }


                    } else {
                        br = range.document.createElement('br');
                        range.insertNode(br);
                        var parent = br.parentNode;
                        if (parent.lastChild === br) {
                            br.parentNode.insertBefore(br.cloneNode(true), br);
                            range.setStartBefore(br)
                        } else {
                            range.setStartAfter(br)
                        }
                        range.setCursor();

                    }
                    
                }

            }
        });
    }

})();

/*
 *   处理特殊键的兼容性问题
 */
(function() {
    var domUtils = baidu.editor.dom.domUtils,
        browser = baidu.editor.browser,
        dtd = baidu.editor.dom.dtd,
        utils = baidu.editor.utils,
        flag = 0,
        keys = domUtils.keys,
        trans = {
            'B' : 'strong',
            'I' : 'em',
            'FONT' : 'span'
        },
        sizeMap = [0, 10, 12, 16, 18, 24, 32, 48],
        listStyle = {
            'OL':['decimal','lower-alpha','lower-roman','upper-alpha','upper-roman'],

            'UL':[ 'circle','disc','square']
        };

    baidu.editor.plugins['keystrokes'] = function() {
        var me = this;
        me.addListener('keydown', function(type, evt) {
            var keyCode = evt.keyCode || evt.which;


            //处理backspace/del
            if (keyCode == 8 || keyCode == 46) {


                var range = me.selection.getRange(),
                    tmpRange,
                    start,end;

                //当删除到body最开始的位置时，会删除到body,阻止这个动作
                if(range.collapsed){
                    start = range.startContainer;
                    //有可能是展位符号
                    if(domUtils.isWhitespace(start)){
                        start = start.parentNode;
                    }
                    if(domUtils.isEmptyNode(start) && start === me.body.firstChild){
                        if(start.tagName != 'P'){
                            p = me.document.createElement('p');
                            me.body.insertBefore(p,start);
                            p.innerHTML = browser.ie ? '' : '<br/>';
                            range.setStart(p,0).setCursor();

                        }
                        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                        return;

                    }
                }

                if (range.collapsed && range.startContainer.nodeType == 3 && range.startContainer.nodeValue.replace(new RegExp(domUtils.fillChar, 'g'), '').length == 0) {
                    range.setStartBefore(range.startContainer).collapse(true)
                }
                //解决选中control元素不能删除的问题
                if (start = range.getClosedNode()) {
                    me.undoManger && me.undoManger.save();
                    range.setStartBefore(start);
                    domUtils.remove(start);
                    range.setCursor();
                    me.undoManger && me.undoManger.save();
                    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                    return;
                }
                //阻止在table上的删除
                if (!browser.ie) {

                    start = domUtils.findParentByTagName(range.startContainer, 'table', true);
                    end = domUtils.findParentByTagName(range.endContainer, 'table', true);
                    if (start && !end || !start && end || start !== end) {
                        evt.preventDefault();
                        return;
                    }
                    if (browser.webkit && range.collapsed && start) {
                        tmpRange = range.cloneRange().txtToElmBoundary();
                        start = tmpRange.startContainer;

                        if (domUtils.isBlockElm(start) && start.nodeType == 1 && !dtd.$tableContent[start.tagName] && !domUtils.getChildCount(start, function(node) {
                            return node.nodeType == 1 ? node.tagName !== 'BR' : 1;
                        })) {

                            tmpRange.setStartBefore(start).setCursor();
                            domUtils.remove(start, true);
                            evt.preventDefault();
                            return;
                        }
                    }
                }
                //修中ie中li下的问题
                if (range.collapsed && !range.startOffset) {
                    tmpRange = range.cloneRange().trimBoundary();
                    var li = domUtils.findParentByTagName(range.startContainer, 'li', true),pre;


                    //要在li的最左边，才能处理
                    if (li && !tmpRange.startOffset) {

                        if (li && (pre = li.previousSibling)) {
                            if (keyCode == 46 && li.childNodes.length)
                                return;
                            me.undoManger && me.undoManger.save();
                            var first = li.firstChild;
                            if (domUtils.isBlockElm(first)) {
                                if (domUtils.isEmptyNode(first)) {
                                    range.setEnd(pre, pre.childNodes.length).shrinkBoundary().collapse().select(true);

                                } else {
                                    span = me.document.createElement('span');
                                    range.insertNode(span);
                                    if (domUtils.isBlockElm(pre.firstChild)) {

                                        pre.firstChild.appendChild(span);
                                        while (first.firstChild) {
                                            pre.firstChild.appendChild(first.firstChild);
                                        }

                                    } else {
                                        while (first.firstChild) {
                                            pre.appendChild(first.firstChild);
                                        }
                                    }

                                    range.setStartBefore(span).collapse(true).select(true);

                                    domUtils.remove(span)

                                }
                            } else {
                                if (domUtils.isEmptyNode(li)) {

                                    range.setEnd(pre, pre.childNodes.length).shrinkBoundary().collapse().select(true);
                                } else {
                                    range.setEnd(pre, pre.childNodes.length).collapse().select(true);
                                    while (li.firstChild) {
                                        pre.appendChild(li.firstChild)
                                    }


                                }
                            }

                            domUtils.remove(li);

                            me.undoManger && me.undoManger.save();
                            evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                            return;

                        }

//
//                            if( keyCode == 8 && (li && pre || li && domUtils.getChildCount(li,function(node){
//                                return !domUtils.isBr(node) && !domUtils.isWhitespace(node);
//                            })) ){
//                                evt.returnValue = false;
//                                return;
//                            }

                        //trace:980

                        if (li && !li.previousSibling) {
                            first = li.firstChild;
                            if (!first || domUtils.isEmptyNode(domUtils.isBlockElm(first) ? first : li)) {
                                var p = me.document.createElement('p');

                                li.parentNode.parentNode.insertBefore(p, li.parentNode);
                                p.innerHTML = browser.ie ? '' : '<br/>';
                                range.setStart(p, 0).setCursor();
                                domUtils.remove(!li.nextSibling ? li.parentNode : li);
                                me.undoManger && me.undoManger.save();
                                evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false)
                                return;
                            }


                        }


                    }


                }


                if (me.undoManger) {

                    if (!range.collapsed) {
                        me.undoManger.save();
                        flag = 1;
                    }
                }

            }
            //处理tab键的逻辑
            if (keyCode == 9) {
                range = me.selection.getRange();
                me.undoManger && me.undoManger.save();
                for (var i = 0,txt = ''; i < me.options.tabSize; i++) {
                    txt += me.options.tabNode;
                }
                var span = me.document.createElement('span');
                span.innerHTML = txt;
                if (range.collapsed) {

                    li = domUtils.findParentByTagName(range.startContainer, 'li', true);

                    if (li && domUtils.isStartInblock(range)) {
                        bk = range.createBookmark();
                        var parentLi = li.parentNode,
                            list = me.document.createElement(parentLi.tagName);
                        var index = utils.indexOf(listStyle[list.tagName], domUtils.getComputedStyle(parentLi, 'list-style-type'));
                        index = index + 1 == listStyle[list.tagName].length ? 0 : index + 1;
                        domUtils.setStyle(list, 'list-style-type', listStyle[list.tagName][index]);

                        parentLi.insertBefore(list, li);
                        list.appendChild(li);
                        range.moveToBookmark(bk).select()

                    } else
                        range.insertNode(span.cloneNode(true).firstChild).setCursor(true);

                } else {
                    //处理table
                    start = domUtils.findParentByTagName(range.startContainer, 'table', true);
                    end = domUtils.findParentByTagName(range.endContainer, 'table', true);
                    if (start || end) {
                        evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                        return
                    }
                    //处理列表 再一个list里处理
                    start = domUtils.findParentByTagName(range.startContainer, ['ol','ul'], true);
                    end = domUtils.findParentByTagName(range.endContainer, ['ol','ul'], true);
                    if (start && end && start === end) {
                        var bk = range.createBookmark();
                        start = domUtils.findParentByTagName(range.startContainer, 'li', true);
                        end = domUtils.findParentByTagName(range.endContainer, 'li', true);
                        //在开始单独处理
                        if (start === start.parentNode.firstChild) {
                            var parentList = me.document.createElement(start.parentNode.tagName);

                            start.parentNode.parentNode.insertBefore(parentList, start.parentNode);
                            parentList.appendChild(start.parentNode);
                        } else {
                            parentLi = start.parentNode,
                                list = me.document.createElement(parentLi.tagName);

                            index = utils.indexOf(listStyle[list.tagName], domUtils.getComputedStyle(parentLi, 'list-style-type'));
                            index = index + 1 == listStyle[list.tagName].length ? 0 : index + 1;
                            domUtils.setStyle(list, 'list-style-type', listStyle[list.tagName][index]);
                            start.parentNode.insertBefore(list, start);
                            var nextLi;
                            while (start !== end) {
                                nextLi = start.nextSibling;
                                list.appendChild(start);
                                start = nextLi;
                            }
                            list.appendChild(end);

                        }
                        range.moveToBookmark(bk).select();

                    } else {
                        if (start || end) {
                            evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                            return
                        }
                        //普通的情况
                        start = domUtils.findParent(range.startContainer, filterFn);
                        end = domUtils.findParent(range.endContainer, filterFn);
                        if (start && end && start === end) {
                            range.deleteContents();
                            range.insertNode(span.cloneNode(true).firstChild).setCursor(true);
                        } else {
                            var bookmark = range.createBookmark(),
                                filterFn = function(node) {
                                    return domUtils.isBlockElm(node);

                                };

                            range.enlarge(true);
                            var bookmark2 = range.createBookmark(),
                                current = domUtils.getNextDomNode(bookmark2.start, false, filterFn);


                            while (current && !(domUtils.getPosition(current, bookmark2.end) & domUtils.POSITION_FOLLOWING)) {


                                current.insertBefore(span.cloneNode(true).firstChild, current.firstChild);

                                current = domUtils.getNextDomNode(current, false, filterFn);

                            }

                            range.moveToBookmark(bookmark2).moveToBookmark(bookmark).select();
                        }

                    }


                }
                me.undoManger && me.undoManger.save();
                evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
            }
        });
        me.addListener('keyup', function(type, evt) {

            var keyCode = evt.keyCode || evt.which;
            //修复ie/chrome <strong><em>x|</em></strong> 当点退格后在输入文字后会出现  <b><i>x</i></b>
            if (!browser.gecko && !keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey) {
                range = me.selection.getRange();
                if (range.collapsed) {
                    var start = range.startContainer,
                        lastNode,
                        isFixed = 0;

                    while (!domUtils.isBlockElm(start)) {
                        if (start.nodeType == 1 && utils.indexOf(['FONT','B','I'], start.tagName) != -1) {

                            var tmpNode = me.document.createElement(trans[start.tagName]);
                            if (start.tagName == 'FONT') {
                                //chrome only remember color property
                                tmpNode.style.cssText = (start.getAttribute('size') ? 'font-size:' + (sizeMap[start.getAttribute('size')] || 12) + 'px' : '')
                                    + ';' + (start.getAttribute('color') ? 'color:' + start.getAttribute('color') : '')
                                    + ';' + (start.getAttribute('face') ? 'font-family:' + start.getAttribute('face') : '')
                                    + ';' + start.style.cssText;
                            }
                            while (start.firstChild) {
                                tmpNode.appendChild(start.firstChild)
                            }
                            start.parentNode.insertBefore(tmpNode, start);
                            domUtils.remove(start);
                            if (!isFixed) {
                                range.setEnd(tmpNode, tmpNode.childNodes.length).collapse(true)

                            }
                            start = tmpNode;
                            isFixed = 1;
                        }
                        start = start.parentNode;

                    }

                    isFixed && range.select()

                }
            }

            if (keyCode == 8 || keyCode == 46) {

                var range,body,start,parent,
                    tds = this.currentSelectedArr;
                if (tds && tds.length > 0) {
                    for (var i = 0,ti; ti = tds[i++];) {
                        ti.innerHTML = browser.ie ? ( browser.version < 9 ? '&#65279' : '' ) : '<br/>';

                    }
                    range = new baidu.editor.dom.Range(this.document);
                    range.setStart(tds[0], 0).setCursor();
                    if (flag) {
                        me.undoManger.save();
                        flag = 0;
                    }
                    //阻止chrome执行默认的动作
                    if (browser.webkit) {
                        evt.preventDefault();
                    }
                    return;
                }

                range = me.selection.getRange();

                //ctrl+a 后全部删除做处理
                
                if (domUtils.isEmptyBlock(me.document.body) && !range.startOffset) {
                    
                    me.document.body.innerHTML = '<p>'+(browser.ie?'':'<br/>')+'</p>';
                    range.setStart(me.document.body.firstChild,0).setCursor();
                    me.undoManger && me.undoManger.save();
                    return;
                }

                //处理删除不干净的问题

                start = range.startContainer;
                if(domUtils.isWhitespace(start)){
                    start = start.parentNode
                }
                
                while (start.nodeType == 1 && domUtils.isEmptyNode(start) && dtd.$removeEmpty[start.tagName]) {
                   
                    parent = start.parentNode;
                    domUtils.remove(start);
                    start = parent;
                }
                if (start.nodeType == 1 && domUtils.isEmptyNode(start)) {

                    //ie下的问题，虽然没有了相应的节点但一旦你输入文字还是会自动把删除的节点加上，
                    if (browser.ie) {

                        var span = range.document.createElement('span');
                        start.appendChild(span);
                        range.setStart(span, 0).setCursor();

                    } else {
                        start.innerHTML = '<br/>';
                        range.setStart(start, 0).setCursor(false,true);
                    }

                    setTimeout(function() {
                        if (browser.ie) {
                            domUtils.remove(span);
                        }
                        //range.setStart( start, 0 ).setCursor();
                        if (flag) {
                            me.undoManger.save();
                            flag = 0;
                        }
                    }, 0)
                } else {

                    if (flag) {
                        me.undoManger.save();
                        flag = 0;
                    }

                }
            }
        })
    }
})();
///import core
///commands 修复chrome下图片不能点击的问题
//修复chrome下图片不能点击的问题
//todo 可以改大小
baidu.editor.plugins['fiximgclick'] = function() {
    var me = this,
        browser = baidu.editor.browser;
    if ( browser.webkit ) {
        me.addListener( 'click', function( type, e ) {
            if ( e.target.tagName == 'IMG' ) {
                var range = new baidu.editor.dom.Range( me.document );
                range.selectNode( e.target ).select();

            }
        } )
    }
};
///import core
///commands 为非ie浏览器自动添加a标签
/**
 * @description 为非ie浏览器自动添加a标签
 * @author zhanyi
 */
(function() {

    var editor = baidu.editor,
        browser = editor.browser,
        domUtils = editor.dom.domUtils;

    baidu.editor.plugins['autolink'] = function() {
        var cont = 0;


        if (browser.ie) {
            return;
        }

        var me = this;
        me.addListener('reset',function(){
           cont = 0;
        });
        me.addListener('keydown', function(type, evt) {
            var keyCode = evt.keyCode || evt.which;

            if (keyCode == 32 || keyCode == 13) {

                var sel = me.selection.getNative(),
                    range = sel.getRangeAt(0).cloneRange(),
                    offset,
                    charCode;

                var start = range.startContainer;
                while (start.nodeType == 1 && range.startOffset > 0) {
                    start = range.startContainer.childNodes[range.startOffset - 1];
                    if (!start)
                        break;

                    range.setStart(start, start.nodeType == 1 ? start.childNodes.length : start.nodeValue.length);
                    range.collapse(true);
                    start = range.startContainer;
                }

                do{
                    if (range.startOffset == 0) {
                        start = range.startContainer.previousSibling;

                        while (start && start.nodeType == 1) {
                            start = start.lastChild;
                        }
                        if (!start || domUtils.isFillChar(start))
                            break;
                        offset = start.nodeValue.length;
                    } else {
                        start = range.startContainer;
                        offset = range.startOffset;
                    }
                    range.setStart(start, offset - 1);
                    charCode = range.toString().charCodeAt(0);
                } while (charCode != 160 && charCode != 32);

                if (range.toString().replace(new RegExp(domUtils.fillChar, 'g'), '').match(/^(\s*)(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {

                    var a = me.document.createElement('a'),text = me.document.createTextNode(' ');
                    //去掉开头的空格
                    if (RegExp.$1.length) {
                        range.setStart(range.startContainer, range.startOffset + RegExp.$1.length);
                    }
                    a.appendChild(range.extractContents());
                    a.href = a.innerHTML;
                    range.insertNode(a);
                    a.parentNode.insertBefore(text, a.nextSibling);
                    range.setStart(text, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range)
                }
            }


        })
    }

})();

///import core
///commands 当输入内容超过编辑器高度时，编辑器自动增高
/**
 * @description 自动伸展
 * @author zhanyi
 */
(function() {

    var browser = baidu.editor.browser;

    baidu.editor.plugins['autoheight'] = function() {
        var editor = this;
        //提供开关，就算加载也可以关闭
        editor.autoHeightEnabled = this.options.autoHeightEnabled;
        
        var timer;
        var bakScroll;
        var bakOverflow;
        editor.enableAutoHeight = function (){
            var iframe = editor.iframe,
                doc = editor.document,
                minHeight = editor.options.minFrameHeight;

            function updateHeight(){
                editor.setHeight(Math.max( browser.ie ? doc.body.scrollHeight :
                        doc.body.offsetHeight + 20, minHeight ));
            }
            this.autoHeightEnabled = true;
            bakScroll = iframe.scroll;
            bakOverflow = doc.body.style.overflowY;
            iframe.scroll = 'no';
            doc.body.style.overflowY = 'hidden';
            timer = setTimeout(function (){
                if (editor.queryCommandState('source') != 1) {
                    updateHeight();
                }
                timer = setTimeout(arguments.callee);
            });
            editor.fireEvent('autoheightchanged', this.autoHeightEnabled);
        };
        editor.disableAutoHeight = function (){
            var iframe = editor.iframe,
                doc = editor.document;
            iframe.scroll = bakScroll;
            doc.body.style.overflowY = bakOverflow;
            clearTimeout(timer);
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

/*
 *  modified by chengchao01
 *
 *  注意： 引入此功能后，在IE6下会将body的背景图片覆盖掉！
 */
 (function(){
 
    var browser = baidu.editor.browser,
		domUtils = baidu.editor.dom.domUtils,
        uiUtils,
		LteIE6 = browser.ie && browser.version <= 6;
	
    baidu.editor.plugins['autofloat'] = function() {
        
		var optsAutoFloatEnabled = this.options.autoFloatEnabled;

        //如果不固定toolbar的位置，则直接退出
        if(!optsAutoFloatEnabled){
			return;
		}

		var editor = this,
			floating = false,
			MIN_HEIGHT = 0,
			bakCssText,
			placeHolder = document.createElement('div');

		function setFloating(delta){
			var toolbarBox = editor.ui.getDom('toolbarbox'),
				toobarBoxPos = domUtils.getXY(toolbarBox),
				origalFloat = window.getComputedStyle? document.defaultView.getComputedStyle(toolbarBox, null).position : toolbarBox.currentStyle.position,
                origalLeft = window.getComputedStyle? document.defaultView.getComputedStyle(toolbarBox, null).left : toolbarBox.currentStyle.left;

			placeHolder.style.height = toolbarBox.offsetHeight + 'px';
			bakCssText = toolbarBox.style.cssText;
			toolbarBox.style.width = toolbarBox.offsetWidth + 'px';
			toolbarBox.parentNode.insertBefore(placeHolder, toolbarBox);
			if (LteIE6) {
				toolbarBox.style.position = 'absolute';
				toolbarBox.style.setExpression('top', 'eval("((document.documentElement||document.body).scrollTop-'+ delta +')+\'px\'")');
				toolbarBox.style.zIndex = '1';
			} else {
				toolbarBox.style.position = 'fixed';
				toolbarBox.style.zIndex = '1';
				toolbarBox.style.top = '0';
				((origalFloat == 'absolute' || origalFloat == 'relative') && parseFloat(origalLeft)) && (toolbarBox.style.left = toobarBoxPos.x + 'px');
			}
			floating = true;
		}
		function unsetFloating(){
			var toolbarBox = editor.ui.getDom('toolbarbox');
			placeHolder.parentNode.removeChild(placeHolder);
			if (LteIE6) {
				toolbarBox.style.removeExpression('top');
			}
			toolbarBox.style.cssText = bakCssText;
			floating = false;
		}
		function updateFloating(){
			var rect = uiUtils.getClientRect(
					editor.ui.getDom('toolbarbox'));
			var rect2 = uiUtils.getClientRect(
					editor.ui.getDom('iframeholder'));
			if (!floating) {
				if (rect.top < 0 && rect2.bottom > rect.height + MIN_HEIGHT) {
					var delta = (document.documentElement.scrollTop || document.body.scrollTop) + rect.top;
					setFloating(delta);
				}
			} else {
				var rect1 = uiUtils.getClientRect(placeHolder);
				if (rect.top < rect1.top || rect.bottom + MIN_HEIGHT > rect2.bottom) {
					unsetFloating();
				}
			}
		}

        editor.addListener('ready', function(){
            if(checkHasUI()){
                        if(LteIE6){
                            fixIE6FixedPos();
                        }
                		editor.addListener('autoheightchanged', function (t, enabled){
                            if (enabled) {
                                domUtils.on(window, 'scroll', updateFloating);
                                domUtils.on(window, 'resize', updateFloating);
                                editor.addListener('keydown', updateFloating);
                            } else {
                                domUtils.un(window, 'scroll', updateFloating);
                                domUtils.un(window, 'resize', updateFloating);
                                editor.removeListener('keydown', updateFloating);
                            }
                        });
                        editor.addListener('beforefullscreenchange', function (t, enabled){
                            if (enabled) {
                                if (floating) {
                                    unsetFloating();
                                }
                            }
                        });
                        editor.addListener('fullscreenchanged', function (t, enabled){
                            if (!enabled) {
                                updateFloating();
                            }
                        });
            }
        })
	}
    function checkHasUI(){
        try{
            uiUtils = baidu.editor.ui.uiUtils;
        }catch( ex ){

            alert('autofloat插件功能依赖于UEditor UI\nautofloat定义位置: _src/plugins/autofloat/autofloat.js');

            throw({
                name: '未包含UI文件',
                message: 'autofloat功能依赖于UEditor UI。autofloat定义位置: _src/plugins/autofloat/autofloat.js'
            });
        }
        return 1;
    }
    function fixIE6FixedPos(){
         var docStyle = document.body.style;
        docStyle.backgroundImage = 'url("about:blank")';
        docStyle.backgroundAttachment = 'fixed';
    }
 })();
///import core
///import commands/inserthtml.js
///commands 插入代码
(function(){
    Array.prototype.contains = function(key,isCase){
        for(var i=0;i<this.length;i++){
            if(isCase && this[i] == key){
                return this[i];
            }else if(this[i].toLowerCase() == key.toLowerCase()){
                return this[i].toLowerCase();
            }
        }
        return false;
    }
    //补空格
    function addSpace(linenum){
        if(linenum<10){
            return "&nbsp;&nbsp;";
        }else if(linenum>=10 && linenum<100){
            return "&nbsp;";
        }else if(linenum>=100 && linenum<1000){
            return "";
        }
    }
    //给对象绑定属性
    function CLASS_HIGHLIGHT(code,syntax){
        //获得需要转换的代码
        this._codetxt = code;
        switch(syntax && syntax.toLowerCase()){
            case "sql":
                //是否大小写敏感
                this._caseSensitive = false;
                //得到关键字哈希表
                this._keywords = "COMMIT,DELETE,INSERT,LOCK,ROLLBACK,SELECT,TRANSACTION,READ,ONLY,WRITE,USE,ROLLBACK,SEGMENT,ROLE,EXCEPT,NONE,UPDATE,DUAL,WORK,COMMENT,FORCE,FROM,WHERE,INTO,VALUES,ROW,SHARE,MODE,EXCLUSIVE,UPDATE,ROW,NOWAIT,TO,SAVEPOINT,UNION,UNION,ALL,INTERSECT,MINUS,START,WITH,CONNECT,BY,GROUP,HAVING,ORDER,UPDATE,NOWAIT,IDENTIFIED,SET,DROP,PACKAGE,CREATE,REPLACE,PROCEDURE,FUNCTION,TABLE,RETURN,AS,BEGIN,DECLARE,END,IF,THEN,ELSIF,ELSE,WHILE,CURSOR,EXCEPTION,WHEN,OTHERS,NO_DATA_FOUND,TOO_MANY_ROWS,CURSOR_ALREADY_OPENED,FOR,LOOP,IN,OUT,TYPE,OF,INDEX,BINARY_INTEGER,RAISE,ROWTYPE,VARCHAR2,NUMBER,LONG,DATE,RAW,LONG RAW,CHAR,INTEGER,MLSLABEL,CURRENT,OF,DEFAULT,CURRVAL,NEXTVAL,LEVEL,ROWID,ROWNUM,DISTINCT,ALL,LIKE,IS,NOT,NULL,BETWEEN,ANY,AND,OR,EXISTS,ASC,DESC,ABS,CEIL,COS,COSH,EXP,FLOOR,LN,LOG,MOD,POWER,ROUND,SIGN,SIN,SINH,SQRT,TAN,TANH,TRUNC,CHR,CONCAT,INITCAP,LOWER,LPAD,LTRIM,NLS_INITCAP,NLS_LOWER,NLS_UPPER,REPLACE,RPAD,RTRIM,SOUNDEX,SUBSTR,SUBSTRB,TRANSLATE,UPPER,ASCII,INSTR,INSTRB,LENGTH,LENGTHB,NLSSORT,ADD_MONTHS,LAST_DAY,MONTHS_BETWEEN,NEW_TIME,NEXT_DAY,ROUND,SYSDATE,TRUNC,CHARTOROWID,CONVERT,HEXTORAW,RAWTOHEX,ROWIDTOCHAR,TO_CHAR,TO_DATE,TO_LABEL,TO_MULTI_BYTE,TO_NUMBER,TO_SINGLE_BYTE,DUMP,GREATEST,GREATEST_LB,LEAST,LEAST_UB,NVL,UID,USER,USERENV,VSIZE,AVG,COUNT,GLB,LUB,MAX,MIN,STDDEV,SUM,VARIANCE".split(",");
                //得到内建对象哈希表
                this._commonObjects = [""];
                //标记
                this._tags = [""];
                //得到分割字符
                this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
                //引用字符
                this._quotation = ["'"];
                //行注释字符
                this._lineComment = "--";
                //转义字符
                this._escape = "";
                //多行引用开始
                this._commentOn = "/*";
                //多行引用结束
                this._commentOff = "*/";
                //忽略词
                this._ignore = "";
                //是否处理标记
                this._dealTag = false;
                break;
            case "c#":
                //是否大小写敏感
                this._caseSensitive = true;
                //得到关键字哈希表
                this._keywords = "abstract,as,base,bool,break,byte,case,catch,char,checked,class,const,continue,decimal,default,delegate,do,double,else,enum,event,explicit,extern,false,finally,fixed,float,for,foreach,get,goto,if,implicit,in,int,interface,internal,is,lock,long,namespace,new,null,object,operator,out,override,params,private,protected,public,readonly,ref,return,sbyte,sealed,short,sizeof,stackalloc,static,set,string,struct,switch,this,throw,true,try,typeof,uint,ulong,unchecked,unsafe,ushort,using,value,virtual,void,volatile,while".split(",");
                //得到内建对象哈希表
                this._commonObjects = "String,Boolean,DateTime,Int32,Int64,Exception,DataTable,DataReader".split(",");
                //标记
                this._tags = [""];
                //得到分割字符
                this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
                //引用字符
                this._quotation = ["\""];
                //行注释字符
                this._lineComment = "//";
                //转义字符
                this._escape = "\\";
                //多行引用开始
                this._commentOn = "/*";
                //多行引用结束
                this._commentOff = "*/";
                //忽略词
                this._ignore = "";
                //是否处理标记
                this._dealTag = false;
                break;
            case "java":
                //是否大小写敏感
                this._caseSensitive = true;
                //得到关键字哈希表
                this._keywords = "abstract,boolean,break,byte,case,catch,char,class,const,continue,default,do,double,else,extends,final,finally,float,for,goto,if,implements,import,instanceof,int,interface,long,native,new,package,private,protected,public,return,short,static,strictfp,super,switch,synchronized,this,throw,throws,transient,try,void,volatile,while".split(",");
                //得到内建对象哈希表
                this._commonObjects = "String,Boolean,DateTime,Int32,Int64,Exception,DataTable,DataReader".split(",");
                //标记
                this._tags = [""];
                //得到分割字符
                this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
                //引用字符
                this._quotation = ["\""];
                //行注释字符
                this._lineComment = "//";
                //转义字符
                this._escape = "\\";
                //多行引用开始
                this._commentOn = "/*";
                //多行引用结束
                this._commentOff = "*/";
                //忽略词
                this._ignore = "";
                //是否处理标记
                this._dealTag = false;
                break;
            case "vbs":
            case "vb":
                //是否大小写敏感
                this._caseSensitive = false;
                //得到关键字哈希表
                this._keywords = "And,ByRef,ByVal,Call,Case,Class,Const,Dim,Do,Each,Else,ElseIf,Empty,End,Eqv,Erase,Error,Exit,Explicit,False,For,Function,Get,If,Imp,In,Is,Let,Loop,Mod,Next,Not,Nothing,Null,On,Option,Or,Private,Property,Public,Randomize,ReDim,Resume,Select,Set,Step,Sub,Then,To,True,Until,Wend,While,Xor,Anchor,Array,Asc,Atn,CBool,CByte,CCur,CDate,CDbl,Chr,CInt,CLng,Cos,CreateObject,CSng,CStr,Date,DateAdd,DateDiff,DatePart,DateSerial,DateValue,Day,Dictionary,Document,Element,Err,Exp,FileSystemObject,Filter,Fix,Int,Form,FormatCurrency,FormatDateTime,FormatNumber,FormatPercent,GetObject,Hex,Hour,InputBox,InStr,InstrRev,IsArray,IsDate,IsEmpty,IsNull,IsNumeric,IsObject,Join,LBound,LCase,Left,Len,Link,LoadPicture,Location,Log,LTrim,RTrim,Trim,Mid,Minute,Month,MonthName,MsgBox,Navigator,Now,Oct,Replace,Right,Rnd,Round,ScriptEngine,ScriptEngineBuildVersion,ScriptEngineMajorVersion,ScriptEngineMinorVersion,Second,Sgn,Sin,Space,Split,Sqr,StrComp,String,StrReverse,Tan,Time,TextStream,TimeSerial,TimeValue,TypeName,UBound,UCase,VarType,Weekday,WeekDayName,Year".split(",");
                //得到内建对象哈希表
                this._commonObjects = "String,Number,Boolean,Date,Integert,Long,Double,Single".split(",");
                //标记
                this._tags = [""];
                //得到分割字符
                this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
                //引用字符
                this._quotation = ["\""];
                //行注释字符
                this._lineComment = "'";
                //转义字符
                this._escape = "";
                //多行引用开始
                this._commentOn = "";
                //多行引用结束
                this._commentOff = "";
                //忽略词
                this._ignore = "<!--";
                //是否处理标记
                this._dealTag = false;
                break;
            case "javascript":
                //是否大小写敏感
                this._caseSensitive = true;
                //得到关键字哈希表
                this._keywords = "function,void,this,boolean,while,if,return,new,true,false,try,catch,throw,null,else,int,long,do,var".split(",");
                //得到内建对象哈希表
                this._commonObjects = "String,Number,Boolean,RegExp,Error,Math,Date".split(",");
                //标记
                this._tags = [""];
                //得到分割字符
                this._wordDelimiters = "　 ,.?!;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
                //引用字符
                this._quotation = ["\"","'"];
                //行注释字符
                this._lineComment = "//";
                //转义字符
                this._escape = "\\";
                //多行引用开始
                this._commentOn = "/*";
                //多行引用结束
                this._commentOff = "*/";
                //忽略词
                this._ignore = "<!--";
                break;
            case "css":
            case "html":
                //是否大小写敏感
                this._caseSensitive = true;
                //得到关键字哈希表
                this._keywords = "function,void,this,boolean,while,if,return,new,true,false,try,catch,throw,null,else,int,long,do,var".split(",");
                //得到内建对象哈希表
                this._commonObjects = "String,Number,Boolean,RegExp,Error,Math,Date".split(",");
                //标记
                this._tags = "html,head,body,title,style,script,language,input,select,div,span,button,img,iframe,frame,frameset,table,tr,td,caption,form,font,meta,textarea".split(",");
                //得到分割字符
                this._wordDelimiters = "　 ,.?!;:\\/>(){}[]\"'\r\n\t+-|*%@#$^&";
                //引用字符
                this._quotation = ["\"","'"];
                //行注释字符
                this._lineComment = "//";
                //转义字符
                this._escape = "\\";
                //多行引用开始
                this._commentOn = "/*";
                //多行引用结束
                this._commentOff = "*/";
                //忽略词
                this._ignore = "<!--";
                //是否处理标记
                this._dealTag = true;
                break;
            case "xml":
            default:
                //是否大小写敏感
                this._caseSensitive = true;
                //得到关键字哈希表
                this._keywords = "!DOCTYPE,?xml,script,version,encoding".split(",");
                //得到内建对象哈希表
                this._commonObjects = [""];
                //标记
                this._tags = [""];
                //得到分割字符
                this._wordDelimiters = "　 ,.;:\\/<>(){}[]\"'\r\n\t=+-|*%@#$^&";
                //引用字符
                this._quotation = ["\"","'"];
                //行注释字符
                this._lineComment = "";
                //转义字符
                this._escape = "\\";
                //多行引用开始
                this._commentOn = "<!--";
                //多行引用结束
                this._commentOff = "-->";
                //忽略词
                this._ignore = "<!--";
                //是否处理标记
                this._dealTag = true;
                break;
        }
        this.highlight = function() {
            var codeArr = new Array();
            var word_index = 0;
            var htmlTxt = new Array();
            //得到分割字符数组(分词)
            for (var i = 0; i < this._codetxt.length; i++) {
                if (this._wordDelimiters.indexOf(this._codetxt.charAt(i)) == -1) {        //找不到关键字
                    if (!codeArr[word_index]) {
                        codeArr[word_index] = "";
                    }
                    codeArr[word_index] += this._codetxt.charAt(i);
                } else {
                    if (codeArr[word_index])
                        word_index++;
                    codeArr[word_index++] = this._codetxt.charAt(i);
                }
            }
            var quote_opened = false;                 //引用标记
            var slash_star_comment_opened = false;    //多行注释标记
            var slash_slash_comment_opened = false;   //单行注释标记
            var line_num = 1;                         //行号
            var quote_char = "";                      //引用标记类型
            var tag_opened = false;                   //标记开始

            htmlTxt[htmlTxt.length] = '<span style=" text-align: right;padding:2px 10px  0;border-right:5px solid #ccc;margin:-2px 10px 0 0;color:#000;">' + line_num + '.' + addSpace(line_num) + '</span>';
            //按分割字，分块显示
            for (var i=0; i <=word_index; i++){
                //处理空行（由于转义带来）
                if(typeof(codeArr[i])=="undefined"||codeArr[i].length==0){
                    continue;
                }
                //处理空格
                if (codeArr[i] == " "){
                    htmlTxt[htmlTxt.length] = ("&nbsp;");
                //处理关键字
                } else if (!slash_slash_comment_opened&&!slash_star_comment_opened && !quote_opened && this.isKeyword(codeArr[i])){
                    htmlTxt[htmlTxt.length] = ("<span style='color:#0000FF;'>" + codeArr[i] + "</span>");
                //处理普通对象
                } else if (!slash_slash_comment_opened&&!slash_star_comment_opened && !quote_opened && this.isCommonObject(codeArr[i])){
                    htmlTxt[htmlTxt.length] = ("<span style='color:#808000;'>" + codeArr[i] + "</span>");
                //处理标记
                } else if (!slash_slash_comment_opened&&!slash_star_comment_opened && !quote_opened && tag_opened && this.isTag(codeArr[i])){
                    htmlTxt[htmlTxt.length] = ("<span style='color:#0000FF;'>" + codeArr[i] + "</span>");
                //处理换行
                } else if (codeArr[i] == "\n"){
                    if (slash_slash_comment_opened){
                        htmlTxt[htmlTxt.length] = ("</span>");
                        slash_slash_comment_opened = false;
                    }
                    line_num++;
                    htmlTxt[htmlTxt.length] = ('<br/><span style="text-align: right;padding:4px 10px  0;border-right:5px solid #ccc;margin:-5px 10px 0 0;color:#000;">' + line_num + '.' + addSpace(line_num) + '</span>');

                //处理双引号（引号前不能为转义字符）
                } else if (this._quotation.contains(codeArr[i])&&!slash_star_comment_opened&&!slash_slash_comment_opened){
                    if (quote_opened){
                        //是相应的引号
                        if(quote_char==codeArr[i]){
                            if(tag_opened){
                                htmlTxt[htmlTxt.length] = (codeArr[i]+"</span><span style='color:#808000;'>");
                            } else {
                                htmlTxt[htmlTxt.length] = (codeArr[i]+"</span>");
                            }
                            quote_opened = false;
                            quote_char = "";
                        } else {
                            htmlTxt[htmlTxt.length] = codeArr[i].replace(/\</g,"&lt;");
                        }
                    } else {
                        if(tag_opened){
                            htmlTxt[htmlTxt.length] = ("</span><span style='color:#FF00FF;'>"+codeArr[i]);
                        } else {
                            htmlTxt[htmlTxt.length] = ("<span style='color:#FF00FF;'>"+codeArr[i]);
                        }
                        quote_opened = true;
                        quote_char = codeArr[i];
                    }
                //处理转义字符
                } else if(codeArr[i] == this._escape){
                    htmlTxt[htmlTxt.length] = (codeArr[i]);
                    if(i<word_index-1){
                        if(codeArr[i+1].charCodeAt(0)>=32&&codeArr[i+1].charCodeAt(0)<=127){
                            htmlTxt[htmlTxt.length] = codeArr[i+1].substr(0,1).replace("&","&amp;").replace(/\</g,"&lt;");
                            codeArr[i+1] = codeArr[i+1].substr(1);
                        }
                    }
                //处理Tab
                } else if (codeArr[i] == "\t") {
                    htmlTxt[htmlTxt.length] = ("&nbsp;&nbsp;&nbsp;&nbsp;");
                //处理多行注释的开始
                } else if (this.isStartWith(this._commentOn,codeArr,i)&&!slash_slash_comment_opened && !slash_star_comment_opened&&!quote_opened){
                    slash_star_comment_opened = true;
                    htmlTxt[htmlTxt.length] = ("<span style='color:#008000;'>" + this._commentOn.replace(/\</g,"&lt;"));
                    i = i + this._commentOn.length-1;
                //处理单行注释
                } else if (this.isStartWith(this._lineComment,codeArr,i)&&!slash_slash_comment_opened && !slash_star_comment_opened&&!quote_opened){
                    slash_slash_comment_opened = true;
                    htmlTxt[htmlTxt.length] = ("<span style='color:#008000;'>" + this._lineComment);
                    i = i + this._lineComment.length-1;
                //处理忽略词
                } else if (this.isStartWith(this._ignore,codeArr,i)&&!slash_slash_comment_opened && !slash_star_comment_opened&&!quote_opened){
                    slash_slash_comment_opened = true;
                    htmlTxt[htmlTxt.length] = ("<span style='color:#008000;'>" + this._ignore.replace(/\</g,"&lt;"));
                    i = i + this._ignore.length-1;
                //处理多行注释结束
                } else if (this.isStartWith(this._commentOff,codeArr,i)&&!quote_opened&&!slash_slash_comment_opened){
                    if (slash_star_comment_opened) {
                        slash_star_comment_opened = false;
                        htmlTxt[htmlTxt.length] = (this._commentOff +"</span>");
                        i = i + this._commentOff.length-1;
                    }
                //处理左标记
                } else if (this._dealTag&&!slash_slash_comment_opened && !slash_star_comment_opened&&!quote_opened&&codeArr[i] == "<") {
                    htmlTxt[htmlTxt.length] = "&lt;<span style='color:#808000;'>";
                    tag_opened = true;
                //处理右标记
                } else if (this._dealTag&&tag_opened&&codeArr[i] == ">") {
                    htmlTxt[htmlTxt.length] = "</span>&gt;";
                    tag_opened = false;
                //处理HTML转义符号
                } else if (codeArr[i] == "&") {
                    htmlTxt[htmlTxt.length] = "&amp;";
                } else {
                    htmlTxt[htmlTxt.length] = codeArr[i].replace(/</g,"&lt;");
                }
            }
            htmlTxt[htmlTxt.length] = ("");
            this._codetxt = htmlTxt.join("");
        }
        this.isStartWith = function(str,code,index){
            if(str){
                for(var i=0;i<str.length;i++){
                    if(this._caseSensitive){
                        if(str.charAt(i)!=code[index+i]||(index+i>=code.length)){
                            return false;
                        }
                    } else {
                        if(str.charAt(i).toLowerCase()!=code[index+i].toLowerCase()||(index+i>=code.length)){
                            return false;
                        }
                    }
                }
                return true;
            } else {
                return false;
            }
        }
        this.isKeyword = function(val) {
            return this._keywords.contains(val,this._caseSensitive);
        }
        this.isCommonObject = function(val) {
            return this._commonObjects.contains(val,this._caseSensitive);
        }
        this.isTag = function(val) {
            return this._tags.contains(val);
        }
        this.transform = function(){
            this._codetxt = this._codetxt.replace(/&nbsp;/ig," ").replace(/<br\/>|<br>/ig,"\n").replace(/<[^>]*>/ig,"").replace(/&lt;/ig,"<").replace(/&gt;/ig,">").replace(/&amp;/ig,"&").replace(/([0-9]+\.\s*)/ig,function($1){
                 var arr = $1.split(".");
                 if(arr[0]<10){
                     return arr[1].replace(/\s{2}/,"");
                 }else if(arr[0]<100){
                     return arr[1].replace(/\s{1}/,"");
                 }else{
                     return arr[1];
                 }
            });
        }
    }
    baidu.editor.plugins['highlight'] = function() {
        var me = this,domUtils = baidu.editor.dom.domUtils;
        me.commands['highlightcode'] = {
            execCommand: function (cmdName, code, syntax) {
                if(code && syntax){
                    var highlight = new CLASS_HIGHLIGHT(code,syntax);
                    highlight.highlight();
                    me.execCommand('inserthtml', "<pre _syntax='"+syntax+"'>"+highlight._codetxt+"</pre>");
                    for(var i=0,pr,pres = domUtils.getElementsByTagName(me.document,"pre");pr=pres[i++];){
                        pr.style.overflowX = "auto";
                    }
                }else{
                    var range = this.selection.getRange(),
                       start = domUtils.findParentByTagName(range.startContainer, 'pre', true),
                       end = domUtils.findParentByTagName(range.endContainer, 'pre', true);
                    if(start && end && start === end){
                        if(domUtils.isBody(start.parentNode)){
                            var p = me.document.createElement('p');
                            p.innerHTML = baidu.editor.browser.ie ? '' : '<br/>';
                            me.body.insertBefore(p,start);
                            range.setStart(p,0)
                        }else{
                            range.setStartBefore(start)
                        }
                        range.setCursor();
                        domUtils.remove(start);
                    }
                }

            },
            queryCommandState: function(){
                 var range = this.selection.getRange(),
                    start = domUtils.findParentByTagName(range.startContainer, 'pre', true),
                    end =  domUtils.findParentByTagName(range.endContainer, 'pre', true);
                return start && end && start === end ? 0 : -1;
            }
        };
        me.addListener("beforegetcontent",function(){
            for(var i=0,pr,pres = domUtils.getElementsByTagName(me.document,"pre");pr=pres[i++];){
                var highlight = new CLASS_HIGHLIGHT(pr.innerHTML.replace(/\r\n/ig,""));
                highlight.transform();
                pr.innerHTML = "";
                pr.appendChild(me.document.createTextNode(highlight._codetxt));
            }
        });
        me.addListener("aftersetcontent",function(){
            for(var i=0,pr,pres = domUtils.getElementsByTagName(me.document,"pre");pr=pres[i++];){
                var highlight = new CLASS_HIGHLIGHT(pr.innerHTML,pr.getAttribute("_syntax"));
                highlight.transform();
                highlight.highlight();
                pr.innerHTML = highlight._codetxt;
                pr.style.overflowX = "auto";
            }
        })
    };
})();

(function (){




baidu.editor.plugins['serialize'] = function () {
    var editor = this;
    var dtd = baidu.editor.dom.dtd;
    var EMPTY_TAG = dtd.$empty;
    var browser = baidu.editor.browser;

    var parseHTML = function (){

    var RE_PART = /<(?:(?:\/([^>]+)>[ \t\r\n]*)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>[ \t\r\n]*))/g;
    var RE_ATTR = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g;

    var EMPTY_ATTR = {checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};
    var CDATA_TAG = {script:1,style: 1};
    var NEED_PARENT_TAG = {
        "li": { "$": 'ul', "ul": 1, "ol": 1 },
        "dd": { "$": "dl", "dl": 1 },
            "dt": { "$": "dl", "dl": 1 },
            "option": { "$": "select", "select": 1 },
            "td": { "$": "tr", "tr": 1 },
            "tr": { "$": "tbody", "tbody": 1, "thead": 1, "tfoot": 1, "table": 1 },
            "tbody": { "$": "table", 'table':1,"colgroup": 1 },
            "thead": { "$": "table", "table": 1 },
            "tfoot": { "$": "table", "table": 1 },
            "col": { "$": "colgroup","colgroup":1 }
        };
        var NEED_CHILD_TAG = {
            "table": "td", "tbody": "td", "thead": "td", "tfoot": "td", "tr": "td",
            "colgroup": "col",
            "ul": "li", "ol": "li",
            "dl": "dd",
            "select": "option"
        };

        function parse(html, callbacks){

            var match,
                nextIndex = 0,
                tagName,
                cdata;
            RE_PART.exec("");
            while ((match = RE_PART.exec(html))) {
                var tagIndex = match.index;
                if (tagIndex > nextIndex) {
                    var text = html.slice(nextIndex, tagIndex);
                    if (cdata) {
                        cdata.push(text);
                    } else {
                        callbacks.onText(text);
                    }
                }
                nextIndex = RE_PART.lastIndex;
                if ((tagName = match[1])) {
                    tagName = tagName.toLowerCase();
                    if (cdata && tagName == cdata._tag_name) {
                        callbacks.onCDATA(cdata.join(''));
                        cdata = null;
                    }
                    if (!cdata) {
                        callbacks.onTagClose(tagName);
                        continue;
                    }
                }
                if (cdata) {
                    cdata.push(match[0]);
                    continue;
                }
                if ((tagName = match[3])) {
                    if (/="/.test(tagName)) {
                        continue;
                    }
                    tagName = tagName.toLowerCase();
                    var attrPart = match[4],
                        attrMatch,
                        attrMap = {},
                        selfClosing = attrPart && attrPart.slice(-1) == '/';
                    if (attrPart) {
                        RE_ATTR.exec("");
                        while ((attrMatch = RE_ATTR.exec(attrPart))) {
                            var attrName = attrMatch[1].toLowerCase(),
                                attrValue = attrMatch[2] || attrMatch[3] || attrMatch[4] || '';
                            if (!attrValue && EMPTY_ATTR[attrName]) {
                                attrValue = attrName;
                            }
                            if (attrName == 'style') {
                                if (browser.ie && browser.version <= 6) {
                                    attrValue = attrValue.replace(/(?!;)\s*([\w-]+):/g, function (m, p1){
                                        return p1.toLowerCase() + ':';
                                    });
                                }
                            }
                            attrMap[attrName] = attrValue;
                        }
                    }
                    callbacks.onTagOpen(tagName, attrMap, selfClosing);
                    if (!cdata && CDATA_TAG[tagName]) {
                        cdata = [];
                        cdata._tag_name = tagName;
                    }
                    continue;
                }
                if ((tagName = match[2])) {
                    callbacks.onComment(tagName);
                }
            }
            if (html.length > nextIndex) {
                callbacks.onText(html.slice(nextIndex, html.length));
            }
        }
        return function (html, forceDtd){
            var fragment = {
                type: 'fragment',
                parent: null,
                children: []
            };
            var currentNode = fragment;
            function addChild(node){
                node.parent = currentNode;
                currentNode.children.push(node);
            }
            function addElement(element, open){
                var node = element;
                // 遇到结构化标签的时候
                if (NEED_PARENT_TAG[node.tag]) {
                    // 考虑这种情况的时候, 结束之前的标签
                    // e.g. <table><tr><td>12312`<tr>`4566
                    while (NEED_PARENT_TAG[currentNode.tag] && NEED_PARENT_TAG[currentNode.tag][node.tag]){
                        currentNode = currentNode.parent;
                    }
                    // 如果前一个标签和这个标签是同一级, 结束之前的标签
                    // e.g. <ul><li>123<li>
                    if (currentNode.tag == node.tag) {
                        currentNode = currentNode.parent;
                    }
                    // 向上补齐父标签
                    while (NEED_PARENT_TAG[node.tag]) {
                        if (NEED_PARENT_TAG[node.tag][currentNode.tag]) break;
                        node = node.parent = {
                            type: 'element',
                            tag: NEED_PARENT_TAG[node.tag]['$'],
                            attributes: {},
                            children: [node]
                        };
                    }
                }
                if (forceDtd) {

                    // 如果遇到这个标签不能放在前一个标签内部，则结束前一个标签,span单独处理
                    while (dtd[node.tag] && !(currentNode.tag == 'span' ? baidu.editor.utils.extend(dtd['strong'],{'a':1,'A':1}) : (dtd[currentNode.tag] || dtd['div']))[node.tag]) {
                        if (tagEnd(currentNode)) continue;
                        if (!currentNode.parent) break;
                        currentNode = currentNode.parent;
                    }
                }
                node.parent = currentNode;
                currentNode.children.push(node);
                if (open) {
                    currentNode = element;
                }
                return element;
            }
            // 结束一个标签的时候，需要判断一下它是否缺少子标签
            // e.g. <table></table>
            function tagEnd(node){
                var needTag;
                if (!node.children.length && (needTag = NEED_CHILD_TAG[node.tag])) {
                    addElement({
                        type: 'element',
                        tag: needTag,
                        attributes: {},
                        children: []
                    }, true);
                    return true;
                }
                return false;
            }
            parse(html, {
                onText: function (text){
                    while (!(dtd[currentNode.tag] || dtd['div'])['#']) {
                        if (tagEnd(currentNode)) continue;
                        currentNode = currentNode.parent;
                    }

                    // TODO: 注意这里会去掉空白节点
                    if (/[^ \t\r\n]/.test(text)) {
                        addChild({
                            type: 'text',
                            data: text
                        });
                    }
                },
                onComment: function (text){
                    addChild({
                        type: 'comment',
                        data: text
                    });
                },
                onCDATA: function (text){
                    while (!(dtd[currentNode.tag] || dtd['div'])['#']) {
                        if (tagEnd(currentNode)) continue;
                        currentNode = currentNode.parent;
                    }
                    addChild({
                        type: 'cdata',
                        data: text
                    });
                },
                onTagOpen: function (tag, attrs, closed){
                    closed = closed || EMPTY_TAG[tag];
                    addElement({
                        type: 'element',
                        tag: tag,
                        attributes: attrs,
                        closed: closed,
                        children: []
                    }, !closed);
                },
                onTagClose: function (tag){
                    
                    var node = currentNode;
                    // 向上找匹配的标签, 这里不考虑dtd的情况是因为tagOpen的时候已经处理过了, 这里不会遇到
                    while (node && tag != node.tag) {
                        node = node.parent;
                    }
                    if (node) {
                        // 关闭中间的标签
                        for (var tnode=currentNode; tnode!==node.parent; tnode=tnode.parent) {
                            tagEnd(tnode);
                        }
                        //去掉空白的inline节点
                        if(!node.children.length && dtd.$removeEmpty[node.tag]){
                            node.parent.children.pop();
                        }
                        currentNode = node.parent;
                    } else {
                        // 如果没有找到开始标签, 则创建新标签
                        // eg. </div> => <div></div>
                        if(!dtd.$removeEmpty[tag]){
                            node = {
                                type: 'element',
                                tag: tag,
                                attributes: {},
                                children: []
                            };
                            addElement(node, true);
                            tagEnd(node);
                            currentNode = node.parent;
                        }

                    }
                }
            });
            // 处理这种情况, 只有开始标签没有结束标签的情况, 需要关闭开始标签
            // eg. <table>
            while (currentNode !== fragment) {
                tagEnd(currentNode);
                currentNode = currentNode.parent;
            }

            return fragment;
        };
    }();
    var unhtml1 = function (){
        var map = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
        function rep( m ){ return map[m]; }
        return function ( str ) {
            str = str + '';
            return str ? str.replace( /[<>"']/g, rep ) : '';
        };
    }();
    var toHTML = function (){
        function printChildren(node){
            var children = node.children;

            var buff = [];
            for (var i=0,ci; ci = children[i]; i++) {

                buff.push(toHTML(ci));
            }
            return buff.join('');
        }
        function printAttrs(attrs){
            var buff = [];
            for (var k in attrs) {
                buff.push(k + '="' + unhtml1(attrs[k]) + '"');
            }
            return buff.join(' ');
        }
        function printData(node){ return unhtml1(node.data); }
        function printElement(node){
            var tag = node.tag;
            var attrs = printAttrs(node.attributes);
            var html = '<' + tag + (attrs ? ' ' + attrs : '') + (EMPTY_TAG[tag] ? ' />' : '>');
            if (!EMPTY_TAG[tag]) {
                html += printChildren(node);
                html += '</' + tag + '>';
            }
            return html;
        }

        return function (node){
            if (node.type == 'fragment') {
                return printChildren(node);
            } else if (node.type == 'element') {
                return printElement(node);
            } else if (node.type == 'text' || node.type == 'cdata') {
                return printData(node);
            } else if (node.type == 'comment') {
                return '<!--' + node.data + '-->';
            }
            return '';
        };
    }();

    /////////////////
    // WORD /////////
    /////////////////
    var transformWordHtml = function (){

        function isWordDocument( strValue ) {
            var re = new RegExp( /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument)/ig );
            return re.test( strValue );
        }

        function ensureUnits( v ) {
            v = v.replace(/([\d.]+)([\w]+)?/g, function (m, p1, p2){
                return (Math.round(parseFloat(p1)) || 1) + (p2 || 'px');
            });
            return v;
        }

        function filterPasteWord( str ) {
            str = str.replace( /<!--\s*EndFragment\s*-->[\s\S]*$/, '' );
            //remove link break
            str = str.replace( /\r\n|\n|\r/ig, "" );
            //remove &nbsp; entities at the start of contents
            str = str.replace( /^\s*(&nbsp;)+/ig, "" );
            //remove &nbsp; entities at the end of contents
            str = str.replace( /(&nbsp;|<br[^>]*>)+\s*$/ig, "" );
            // Word comments like conditional comments etc
            str = str.replace( /<!--[\s\S]*?-->/ig, "" );
            // Remove comments, scripts (e.g., msoShowComment), XML tag, VML content, MS Office namespaced tags, and a few other tags
            str = str.replace( /<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "" );

            //convert word headers to strong
            str = str.replace( /<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>" );
            //remove lang attribute
            str = str.replace( /(lang)\s*=\s*([\'\"]?)[\w-]+\2/ig, "" );
            // Examine all styles: delete junk, transform some, and keep the rest
            str = str.replace( /(<[a-z][^>]*)\sstyle="([^"]*)"/gi, function( str, tag, style ) {
                var n = [],
                        i = 0,
                        s = style.replace( /^\s+|\s+$/, '' ).replace( /&quot;/gi, "'" ).split( /;\s*/g );

                // Examine each style definition within the tag's style attribute
                for ( var i = 0; i < s.length; i++ ) {
                    var v = s[i];
                    var name, value,
                            parts = v.split( ":" );

                    if ( parts.length == 2 ) {
                        name = parts[0].toLowerCase();
                        value = parts[1].toLowerCase();
                        // Translate certain MS Office styles into their CSS equivalents
                        switch ( name ) {
                            case "mso-padding-alt":
                            case "mso-padding-top-alt":
                            case "mso-padding-right-alt":
                            case "mso-padding-bottom-alt":
                            case "mso-padding-left-alt":
                            case "mso-margin-alt":
                            case "mso-margin-top-alt":
                            case "mso-margin-right-alt":
                            case "mso-margin-bottom-alt":
                            case "mso-margin-left-alt":
        //                        case "mso-border-alt":
        //                        case "mso-border-top-alt":
        //                        case "mso-border-right-alt":
        //                        case "mso-border-bottom-alt":
        //                        case "mso-border-left-alt":
                            case "mso-table-layout-alt":
                            case "mso-height":
                            case "mso-width":
                            case "mso-vertical-align-alt":
                                n[i++] = name.replace( /^mso-|-alt$/g, "" ) + ":" + ensureUnits( value );
                                continue;

                            case "horiz-align":
                                n[i++] = "text-align:" + value;
                                continue;

                            case "vert-align":
                                n[i++] = "vertical-align:" + value;
                                continue;

                            case "font-color":
                            case "mso-foreground":
                                n[i++] = "color:" + value;
                                continue;

                            case "mso-background":
                            case "mso-highlight":
                                n[i++] = "background:" + value;
                                continue;

                            case "mso-default-height":
                                n[i++] = "min-height:" + ensureUnits( value );
                                continue;

                            case "mso-default-width":
                                n[i++] = "min-width:" + ensureUnits( value );
                                continue;

                            case "mso-padding-between-alt":
                                n[i++] = "border-collapse:separate;border-spacing:" + ensureUnits( value );
                                continue;

                            case "text-line-through":
                                if ( (value == "single") || (value == "double") ) {
                                    n[i++] = "text-decoration:line-through";
                                }
                                continue;

                            case "mso-zero-height":
                                if ( value == "yes" ) {
                                    n[i++] = "display:none";
                                }
                                continue;
                        }

                        if ( /^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test( name ) ) {
                                if(!/mso\-list/.test(name))
                                continue;
                        }
                        // If it reached this point, it must be a valid CSS style
                        n[i] = name + ":" + parts[1];        // Lower-case name, but keep value case
                    }
                }
                // If style attribute contained any valid styles the re-write it; otherwise delete style attribute.
                if ( i > 0 ) {
                    return tag + ' style="' + n.join( ';' ) + '"';
                } else {
                    return tag;
                }
            } );
            str = str.replace( /([ ]+)<\/span>/ig, function ( m, p ) {
                return new Array( p.length + 1 ).join( '&nbsp;' ) + '</span>';
            } );
            
            return str;
        }
        return function (html){

            //过了word,才能转p->li
            first = null;
            parentTag = '',liStyle = '',firstTag = '';
            if (isWordDocument(html)) {
                html = filterPasteWord(html);
            }
            return html.replace(/>[ \t\r\n]*</g,'><');
        };
    }();
    var NODE_NAME_MAP = {
        'text': '#text',
        'comment': '#comment',
        'cdata': '#cdata-section',
        'fragment': '#document-fragment'
    };

    function _likeLi(node){
        var a;
        if (node && node.tag == 'p') {
        //office 2011下有效
            if(node.attributes['class'] == 'MsoListParagraph' || /mso-list/.test(node.attributes.style)) {
                a = 1;
            } else {
                var firstChild = node.children[0];
                if (firstChild && firstChild.tag == 'span' && /Wingdings/i.test(firstChild.attributes.style)) {
                    a = 1;
                }
            }
        }
        return a;
    }
    //为p==>li 做个标志
    var first,
        orderStyle = {
            'decimal' : /\d+/,
            'lower-roman': /^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,
            'upper-roman': /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,
            'lower-alpha' : /^\(?[a-z]+\)?$/,
            'upper-alpha': /^\(?[A-Z]+\)?$/
        },
        unorderStyle = { 'disc' : /^[l\u00B7\u2002]/, 'circle' : /^[\u006F\u00D8]/,'square' : /^[\u006E\u25C6]/},
        parentTag = '',liStyle = '',firstTag,
        tdStyle,tableStyle,preStyle;


    //b|i|font ==> strong|em|span 放在toHTML节省在遍历的时间
    function transNode(node){

        if(node.type == 'element' && !node.children.length && dtd.$removeEmpty[node.tag] && node.tag != 'a'){// 锚点保留
            return {
                type : 'fragment',
                children:[]
            }
        }
        var sizeMap = [0, 10, 12, 16, 18, 24, 32, 48],
            attr,
            indexOf = baidu.editor.utils.indexOf;

        switch(node.tag){
            case 'li':
                var child = node.children[0];
                if(!child || child.type != 'element' || child.tag != 'p'){
                     var pNode = {
                        type: 'element',
                        tag: 'p',
                        attributes: {},
                        children: node.children
                    };
                    node.children = [pNode];
                }
                break;
            case 'table':
            case 'td':
                optStyle(node);
                break;
//            case 'pre':
//                node.attributes.style = node.attributes.style ? preStyle + ';' + node.attributes.style  : preStyle;
//                break;
//            case 'td':
//                node.attributes.style = node.attributes.style ? tdStyle + ';' + node.attributes.style : tdStyle;
//                break;
//            case 'table':
//                node.attributes.style = node.attributes.style ? tableStyle + ';' + node.attributes.style: tableStyle;
//                break;
            case 'a'://锚点，a==>img
                if(node.attributes['anchorname']){
                    node.tag = 'img';
                    node.attributes = {
                        'class' : 'anchorclass',
                        'anchorname':node.attributes['name']
                    };
                    node.closed = 1;
                }
                break;
            case 'b':
                node.tag = node.name = 'strong';
                break;
            case 'i':
                node.tag = node.name = 'em';
                break;
            case 'u':
                node.tag = node.name = 'span';
                node.attributes.style = (node.attributes.style || '') + ';text-decoration:underline;';
                break;
            case 's':
            case 'del':
                node.tag = node.name = 'span';
                node.attributes.style = (node.attributes.style || '') + ';text-decoration:line-through;';
                if(node.children.length == 1 ){
                    child = node.children[0];
                    if(child.tag == node.tag){
                        node.attributes.style += ";" + child.attributes.style;
                        node.children = child.children;
                        
                    }
                }
                break;
            case 'span':
                if(/mso-list/.test(node.attributes.style)){
                    //判断了两次就不在判断了
                   if(firstTag != 'end'){

                        var ci = node.children[0],p;
                        while(ci.type == 'element'){
                            ci = ci.children[0];
                        }
                        for(p in unorderStyle){
                            if(unorderStyle[p].test(ci.data)){
                               // ci.data = ci.data.replace(unorderStyle[p],'');
                                parentTag = 'ul';
                                liStyle = p;
                                break;
                            }
                        }


                        if(!parentTag){
                           for( p in orderStyle){
                                if(orderStyle[p].test(ci.data.replace(/\.$/,''))){
                                  //   ci.data = ci.data.replace(orderStyle[p],'');
                                    parentTag = 'ol';
                                    liStyle = p;
                                    break;
                                }
                            }
                        }
                        if(firstTag){
                            if(ci.data == firstTag){
                                if(parentTag != 'ul'){
                                    liStyle = '';
                                }
                                parentTag = 'ul'
                            }else{
                                 if(parentTag != 'ol'){
                                    liStyle = '';
                                }
                                parentTag = 'ol'
                            }
                            firstTag = 'end'
                        }else{
                            firstTag = ci.data
                        }
                        if(parentTag){
                            var tmpNode = node;
                            while(tmpNode.tag != 'ul' && tmpNode.tag != 'ol'){
                                tmpNode = tmpNode.parent;
                            }
                            tmpNode.tag = parentTag;
                            tmpNode.attributes.style = 'list-style-type:' + liStyle;


                        }

                   }

                    node = {
                        type : 'fragment',
                        children : []
                    };
                    break;



                }
                var style = node.attributes.style;
                if(style){
                    style = style.replace(/background(?!-)/g, 'background-color');
                    style = style.match(/(?:\b(?:color|font-size|background-color|font-size|font-family|text-decoration)\b\s*:\s*(&[^;]+;|[^;])+(?=;)?)/gi);
                    if(style){
                        node.attributes.style = style.join(';');
                        if(!node.attributes.style){
                            delete node.attributes.style;
                        }
                    }
                }
            
                break;
            case 'font':
                node.tag = node.name = 'span';
                attr = node.attributes;
                node.attributes = {
                    'style': (attr.size ? 'font-size:' + (sizeMap[attr.size] || 12) + 'px' : '')
                    + ';' + (attr.color ? 'color:'+ attr.color : '')
                    + ';' + (attr.face ? 'font-family:'+ attr.face : '')
                    + ';' + (attr.style||'')
                };

                while(node.parent.tag == node.tag && node.parent.children.length == 1){
                    node.attributes.style && (node.parent.attributes.style ? (node.parent.attributes.style += ";" + node.attributes.style) : (node.parent.attributes.style = node.attributes.style));
                    node.parent.children = node.children;
                    node = node.parent;
                    
                }
                break;
            case 'p':
                if (node.attributes.align) {
                    node.attributes.style = (node.attributes.style || '') + ';text-align:' +
                        node.attributes.align + ';';
                    delete node.attributes.align;
                }
                if(_likeLi(node)){
                    
                    if(!first){

                        var ulNode  = {
                            type: 'element',
                            tag: 'ul',
                            attributes: {},
                            children: []
                        },
                        index = indexOf(node.parent.children,node);
                        node.parent.children[index] = ulNode;
                        ulNode.parent = node.parent;
                        ulNode.children[0] = node;
                        node.parent = ulNode;

                        while(1){
                            node = ulNode.parent.children[index+1];
                            if( _likeLi(node)){
                                ulNode.children[ulNode.children.length] = node;
                                node.parent = ulNode;
                                ulNode.parent.children.splice(index+1,1)
                            }else{
                                break;
                            }
                        }

                        return ulNode;
                    }
                    node.tag = node.name = 'li';
                    //为chrome能找到标号做的处理
                    var span = node.children[0];

                    while(span && span.type == 'element'){
                        span = span.children[0]
                    }
                    span.parent.attributes.style = (span.parent.attributes.style || '') + 'mso-list:10';
                        
                    
                    delete node.attributes['class'];
                    delete node.attributes.style

                    //为li加个p标签
                    var pNode = {
                            type: 'element',
                            tag: 'p',
                            attributes: {},
                            children: node.children
                        };

                    node.children = [pNode];
                }
        }
        return node;
    }
    function optStyle(node){
        if(browser.ie && node.attributes.style){

            var border = node.attributes.style.match(/border[^:]*:([^;]*)/i);
            if(border){
                border = border[1];
                if(border){
                    node.attributes.style = node.attributes.style.replace(/border[^;]*?(;|$)/ig,'').replace(/^\s*|\s*$/,'');
                    
                    if(!/^\s*#\w+\s*$/.test(border)){
                        node.attributes.style = (/;$/.test(node.attributes.style)||node.attributes.style.length == 0?'':';') + 'border:' + border;
                    }

                }
            }

            node.attributes.style = node.attributes.style.replace(/^\s*|\s*$/,'')
        }
    }
    function transOutNode(node){
        if(node.type == 'text'){
            
            node.data = node.data.replace(/ /g,'&nbsp;')
        }
        switch (node.tag){
//            case 'pre':
//                preStyle = node.attributes.style;
//                delete node.attributes.style;
//                break;
            case 'table':
//                tableStyle = node.attributes.style;
                !node.attributes.style && delete node.attributes.style;
                if(browser.ie && node.attributes.style){

                    optStyle(node);
                }
                break;
            case 'td':
                if (/display\s*:\s*none/i.test(node.attributes.style)) {
                    return {
                        type: 'fragment',
                        children: []
                    };
                }
                if(browser.ie && !node.children.length ){
                     var txtNode  = {
                            type: 'text',
                            data:'&nbsp;',
                            parent : node
                        };
                        node.children[0] = txtNode;
                }
//                tdStyle = node.attributes.style;
//                delete node.attributes['class'];
//                delete node.attributes.style;
                if(browser.ie && node.attributes.style){
                    optStyle(node);

                }
                break;
            case 'img'://锚点，img==>a
                if(node.attributes.anchorname){
                    node.tag = 'a';
                    node.attributes = {
                        name : node.attributes.anchorname,
                        anchorname : 1
                    }
                    node.closed = null;
                }
                



        }

        return node;
    }
    function childrenAccept(node, visit, ctx){
        if (!node.children || !node.children.length) {
            return node;
        }
        var children = node.children;
        for (var i=0; i<children.length; i++) {
            var newNode = visit(children[i], ctx);
            if (newNode.type == 'fragment') {
                var args = [i, 1];
                args.push.apply(args, newNode.children);
                children.splice.apply(children, args);
                //节点为空的就干掉，不然后边的补全操作会添加多余的节点
                if(!children.length){
                    node = {
                        type: 'fragment',
                        children: []
                    }
                }
                i --;
            } else {
                children[i] = newNode;
            }
        }
        return node;
    }
    function Serialize(rules){
        this.rules = rules;
    }
    Serialize.prototype = {
        // NOTE: selector目前只支持tagName
        rules: null,
        // NOTE: node必须是fragment
        filter: function (node, rules,modify){
            rules = rules || this.rules;
            var whiteList = rules && rules.whiteList;
            var blackList = rules && rules.blackList;
            function visitNode(node, parent){
                node.name = node.type == 'element' ?
                        node.tag : NODE_NAME_MAP[node.type];
                if (parent == null) {
                    return childrenAccept(node, visitNode, node);
                }
                if (blackList && blackList[node.name]) {
                    modify && (modify.flag = 1);
                    return {
                        type: 'fragment',
                        children: []
                    };
                }
                if (whiteList) {
                    if (node.type == 'element') {
                        if (parent.type == 'fragment' ? whiteList[node.name] : whiteList[node.name] && whiteList[parent.name][node.name]) {
                            var props;
                            if ((props = whiteList[node.name].$)) {
                                var oldAttrs = node.attributes;
                                var newAttrs = {};
                                for (var k in props) {
                                    if (oldAttrs[k]) {
                                        newAttrs[k] = oldAttrs[k];
                                    }
                                }
                                node.attributes = newAttrs;
                            }
                        } else {
                            modify && (modify.flag = 1);
                            node.type = 'fragment';
                            // NOTE: 这里算是一个hack
                            node.name = parent.name;
                        }
                    } else {
                        // NOTE: 文本默认允许
                    }
                }
                if (blackList || whiteList) {
                    childrenAccept(node, visitNode, node);
                }
                return node;
            }
            return visitNode(node, null);
        },
        transformInput: function (node, wrapInline){
            function visitNode(node){
                node = transNode(node);
                if(node.tag == 'ol' || node.tag == 'ul'){
                    first = 1;
                }
                node = childrenAccept(node, visitNode, node);
                if(node.tag == 'ol' || node.tag == 'ul'){
                    first = 0;
                    parentTag = '',liStyle = '',firstTag = '';
                }
                if(node.type == 'text' && node.data.replace(/\s/g,'') == editor.options.pageBreakTag){

                    node.type = 'element';
                    node.name = node.tag = 'div';

                    delete node.data;
                    node.attributes = {
                        'class' : 'pagebreak',
                        'unselectable' : 'on',
                        'style' : 'moz-user-select:none;-khtml-user-select: none;'
                    };
                    
                    node.children = [];

                }

                return node;
            }
            return visitNode(node);
        },
        transformOutput: function (node){
            function visitNode(node){

                if(node.tag == 'div' && node.attributes['class'] == 'pagebreak'){
                    delete node.tag;
                    node.type = 'text';
                    node.data = editor.options.pageBreakTag;
                    delete node.children;

                }
                
                node = transOutNode(node);
                if(node.tag == 'ol' || node.tag == 'ul'){
                    first = 1;
                }
                node = childrenAccept(node, visitNode, node);
                if(node.tag == 'ol' || node.tag == 'ul'){
                    first = 0;
                }
                return node;
            }
            return visitNode(node);
        },
        toHTML: toHTML,
        parseHTML: parseHTML,
        word: transformWordHtml
    };
    editor.serialize = new Serialize(editor.options.serialize);
    baidu.editor.serialize = new Serialize({});
};

})();

///import core
///import commands/inserthtml.js
///commands 视频
(function (){
    baidu.editor.plugins['video'] = function (){
        var editor = this;
        var fakedMap = {};
        var fakedPairs = [];
        var lastFakedId = 0;
        function fake(url, width, height,style){
            var fakedId = 'edui_faked_video_' + (lastFakedId ++);
            var fakedHtml = '<img isfakedvideo id="'+ fakedId +'" width="'+ width +'" height="' + height + '" _url="'+url+'" class="edui-faked-video"' +
                ' src="http://hi.baidu.com/fc/editor/images/spacer.gif"' +
                ' style="background:url(http://hi.baidu.com/ui/neweditor/lib/fck/images/fck_videologo.gif) no-repeat center center; border:1px solid gray;'+ style +';" />';
            fakedMap[fakedId] = '<embed isfakedvideo' +
                ' type="application/x-shockwave-flash"' +
                ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
                ' src="' + url + '"' +
                ' width="' + width + '"' +
                ' height="' + height + '"' +
                ' wmode="transparent"' +
                ' play="true"' +
                ' loop="false"' +
                ' menu="false"' +
                ' allowscriptaccess="never"' +
                '></embed>';
            return fakedHtml;
        }
        editor.commands['insertvideo'] = {
            execCommand: function (cmd, options){
                var url = options.url;
                var width = options.width || 320;
                var height = options.height || 240;
                var style = options.style ? options.style : "";
                editor.execCommand('inserthtml', fake(url, width, height,style));
            }
        };
        //获得style里的某个样式对应的值
        function getPars(str,par){
            var reg = new RegExp(par+":\\s*((\\w)*)","ig");
            var arr = reg.exec(str);
            return arr ? arr[1] : "";
        }

        editor.addListener('beforegetcontent', function (){
            var tempDiv = editor.document.createElement('div');
            var newFakedMap = {};
            for (var fakedId in fakedMap) {
                var fakedImg;
                while ((fakedImg = editor.document.getElementById(fakedId))) {
                    tempDiv.innerHTML = fakedMap[fakedId];
                    var temp = tempDiv.firstChild;
                    temp.width = fakedImg.width;
                    temp.height = fakedImg.height;
                    var strcss = fakedImg.style.cssText;
                    if(/float/ig.test(strcss)){
                        if(!!window.ActiveXObject){
                            temp.style.styleFloat = getPars(strcss,"float");
                        }else{
                            temp.style.cssFloat = getPars(strcss,"float");
                        }
                    }else if(/display/ig.test(strcss)){
                        temp.style.display = getPars(strcss,"display");
                    }
                    fakedImg.parentNode.replaceChild(temp, fakedImg);
                    fakedPairs.push([fakedImg, temp]);
                    newFakedMap[fakedId] = fakedMap[fakedId];
                }
            }
            fakedMap = newFakedMap;
        });

        editor.addListener('aftersetcontent', function (){
            var tempDiv = editor.document.createElement('div');
            fakedMap = {};
            var embedNodeList = editor.document.getElementsByTagName('embed');
            var embeds = [];
            var k = embedNodeList.length;
            while (k --) {
                embeds[k] = embedNodeList[k];
            }
            k = embeds.length;
            while (k --) {
                var url = embeds[k].src;
                var width = embeds[k].width || 320;
                var height = embeds[k].height || 240;
                var strcss = embeds[k].style.cssText;
                var style = getPars(strcss,"display") ? "display:"+getPars(strcss,"display") : "float:"+getPars(strcss,"float");
                tempDiv.innerHTML = fake(url, width, height,style);
                embeds[k].parentNode.replaceChild(tempDiv.firstChild, embeds[k]);
            }
        });
        editor.addListener('aftergetcontent', function (){
            for (var i=0; i<fakedPairs.length; i++) {
                var fakedPair = fakedPairs[i];
                fakedPair[1].parentNode.replaceChild(fakedPair[0], fakedPair[1]);
            }
            fakedPairs = [];
        });

    };
})();

///import core
///commands 表格
/**
 * Created by .
 * User: taoqili
 * Date: 11-5-5
 * Time: 下午2:06
 * To change this template use File | Settings | File Templates.
 */
(function(){

    /**
     * table操作插件
     */
    baidu.editor.plugins['table'] = function() {

        var editor = baidu.editor,
            browser = editor.browser,
            domUtils = editor.dom.domUtils,
            keys= domUtils.keys,
            clearSelectedTd = domUtils.clearSelectedArr;
        //框选时用到的几个全局变量
        var anchorTd,
            tableOpt,
            _isEmpty = domUtils.isEmptyNode;
        function getIndex(cell){
            var cells = cell.parentNode.cells;
            for(var i=0,ci;ci=cells[i];i++){
                if(ci===cell){
                    return i;
                }
            }
        }

        /**
         * 判断当前单元格是否处于隐藏状态
         * @param cell 待判断的单元格
         * @return {Boolean} 隐藏时返回true，否则返回false
         */
        function _isHide(cell) {
            return cell.style.display == "none";
        }

        function getCount(arr){
            var count = 0;
            for(var i=0,ti;ti=arr[i++];){
                if(!_isHide(ti)){
                    count++
                }

            }
            return count;
        }
        var me = this;

        me.currentSelectedArr =  [];
        me.addListener('mousedown', _mouseDownEvent);
        me.addListener('keydown', function(type,evt){
            var keyCode = evt.keyCode || evt.which;
            if( !keys[keyCode] && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey && !evt.altKey){
                clearSelectedTd(me.currentSelectedArr)
            }
        });
        me.addListener('mouseup', function(type,evt) {
            
            anchorTd = null;
            me.removeListener('mouseover', _mouseDownEvent);
            var td = me.currentSelectedArr[0];
            if(td){
                me.document.body.style.webkitUserSelect = '';
                var range = new baidu.editor.dom.Range(me.document);
                if(_isEmpty(td)){
                    range.setStart(me.currentSelectedArr[0],0).setCursor();
                }else{
                   range.selectNodeContents(me.currentSelectedArr[0]).select();
                }
               
            }else{
                
                //浏览器能从table外边选到里边导致currentSelectedArr为空，清掉当前选区回到选区的最开始

                    var range = me.selection.getRange().shrinkBoundary();

                    if(!range.collapsed){
                        var start = domUtils.findParentByTagName(range.startContainer,'td',true),
                            end = domUtils.findParentByTagName(range.endContainer,'td',true);
                        //在table里边的不能清除
                        if(start && !end || !start && end || start && end && start !== end){
                            range.collapse(true).select(true)
                        }
                    }


                

            }

        });

        function reset (){
            me.currentSelectedArr = [];
            anchorTd = null;
           
        }
        
        /**
         * 插入表格
         * @param numRows 行数
         * @param numCols 列数
         */
       me.commands['inserttable'] = {
            queryCommandState: function () {
                var range = this.selection.getRange();

                return domUtils.findParentByTagName(range.startContainer, 'table', true)
                        || domUtils.findParentByTagName(range.endContainer, 'table', true)
                        || me.currentSelectedArr.length > 0 ? -1 : 0;
            },
            execCommand: function (cmdName, tableobj) {
                tableOpt = tableobj;
                var arr = [];
                
                arr.push("cellpadding='"+(tableobj.cellpadding||0)+"'");
                arr.push("cellspacing='"+(tableobj.cellspacing||0)+"'");
                tableobj.width ? arr.push("width='"+tableobj.width+"'") : arr.push("width='500'");
                tableobj.height ? arr.push("height='"+tableobj.height+"'") : arr.push("height='100'");
                arr.push("borderColor='"+(tableobj.bordercolor||'#000')+"'");
                arr.push("border='"+(tableobj.border||1)+"'");
                var html,rows = [],j = tableobj.numRows;
                if (j) while (j --) {
                    var cols = [];
                    var k = tableobj.numCols;
                    while (k --) {
                        cols[k] = '<td width='+Math.floor((tableobj.width||500)/tableobj.numCols)+' >'+
                                //trace: IE6下占位符
                                (browser.ie ? domUtils.fillChar : '<br/>') + '</td>';
                    }
                    rows.push('<tr '+(tableobj.align ? 'style=text-align:' + tableobj.align+'' : '')+'>' + cols.join('') + '</tr>');
                }
                
                html = '<table  '+ arr.join(" ")+ (tableobj.backgroundcolor ? ' style="background-color:' + tableobj.backgroundcolor + ';"': '')
                 
                    +'>' + rows.join('') + '</table>';
                this.execCommand('insertHtml',html);
               
                reset();
            }
        };
        me.commands['edittable'] = {
            queryCommandState: function () {
                var range = this.selection.getRange();

                return domUtils.findParentByTagName(range.startContainer, 'table', true)

                        || me.currentSelectedArr.length > 0 ? 0 : -1;
            },
            execCommand: function (cmdName, tableobj) {
                var start = this.selection.getStart();
                var table = domUtils.findParentByTagName(start,'table',true);
                if(table){
                    table.setAttribute("cellpadding",tableobj.cellpadding);
                    table.setAttribute("cellspacing",tableobj.cellspacing);
                    table.setAttribute("width",tableobj.width);
                    table.setAttribute("height",tableobj.height);
                    table.setAttribute("border",tableobj.border);
                    table.setAttribute("borderColor",tableobj.bordercolor);
                    domUtils.setStyle(table,"background-color",tableobj.backgroundcolor);
                    for(var r=0,row;row = table.rows[r++];){
                        domUtils.setStyle(row,"text-align",tableobj.align);
                    }
                }

                
            }
        };
        /**
         * 删除表格
         */
        me.commands['deletetable'] = {
            queryCommandState:function() {
                var range = this.selection.getRange();
                return (domUtils.findParentByTagName(range.startContainer, 'table', true)
                        && domUtils.findParentByTagName(range.endContainer, 'table', true)) || me.currentSelectedArr.length > 0 ? 0 : -1;
            },
            execCommand:function() {
                var range = this.selection.getRange(),
                    table = domUtils.findParentByTagName(me.currentSelectedArr.length > 0 ? me.currentSelectedArr[0] : range.startContainer, 'table',true);
                 var p = table.ownerDocument.createElement('p');
                    p.innerHTML = browser.ie ? '&nbsp;' : '<br/>';
                    table.parentNode.insertBefore(p,table);
                    domUtils.remove(table);
                    range.setStart(p,0).setCursor();
                    domUtils.remove(table);

                reset();
            }
        };

//        /**
//                * 表格样式设置
//                */
//               me.commands['settablestyle'] = {
//                   queryCommandState:function() {
//                       var range = this.selection.getRange();
//                       return (domUtils.findParentByTagName(range.startContainer, 'table', true)
//                               && domUtils.findParentByTagName(range.endContainer, 'table', true)) || me.currentSelectedArr.length > 0 ? 0 : -1;
//                   },
//
//                   //opt:json{key:value}
//                   execCommand:function(cmdName,getOpt) {
//                       var range = this.selection.getRange(),
//                           table = domUtils.findParentByTagName(me.currentSelectedArr.length > 0 ? me.currentSelectedArr[0] : range.startContainer, 'table', true),
//                           css = table.style.cssText;
//
//                       //opt={border:"5px solid red",background:"blue"};
//                       var opt = typeof(getOpt)=='function'? getOpt():getOpt;
//                       for (var i in opt ) {
//                           if(i=="border-spacing"){
//                               table['cellSpacing'] = opt[i];
//                               continue;
//                           }
//                           if(i=="width"){
//                               table['width'] = opt[i];
//                               continue;
//                           }
//                           if(i=="background"){
//                               table['bgColor'] = opt[i];
//                               continue;
//                           }
//                           css += i + ":"+ opt[i] +";"
//                       }
//                       table.style.cssText = css;
//
//                   }
//               };

               /**
                * 添加表格标题
                */
               me.commands['addcaption'] = {
                   queryCommandState:function() {
                       var range = this.selection.getRange();
                       return (domUtils.findParentByTagName(range.startContainer, 'table', true)
                               && domUtils.findParentByTagName(range.endContainer, 'table', true)) || me.currentSelectedArr.length > 0 ? 0 : -1;
                   },
                   execCommand:function(cmdName,opt) {

                       var range = this.selection.getRange(),
                           table = domUtils.findParentByTagName(me.currentSelectedArr.length > 0 ? me.currentSelectedArr[0] : range.startContainer, 'table', true);

                       if(opt=="on"){
                           var c = table.createCaption();
                           c.innerHTML = "请在此输入表格标题";
                       }else{
                           table.removeChild(table.caption);
                       }



                   }
               };


       /**
         * 向右合并单元格
         */
        me.commands['mergeright'] = {
            queryCommandState : function() {
                var range = this.selection.getRange(),
                     start = range.startContainer,
                     td = domUtils.findParentByTagName(start, ['td','th'], true);


                if( !td || this.currentSelectedArr.length > 1 )return -1;

                var  tr = td.parentNode;

               //最右边行不能向右合并
                var rightCellIndex = getIndex(td) + td.colSpan;
                if (rightCellIndex >= tr.cells.length) {
                    return -1;
                }
                //单元格不在同一行不能向右合并
                var rightCell = tr.cells[rightCellIndex];
                if (_isHide(rightCell)) {
                    return -1;
                }
                return td.rowSpan == rightCell.rowSpan ? 0 : -1;
            },
            execCommand : function() {
                
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true) || me.currentSelectedArr[0],
                    tr = td.parentNode,
                    rows = tr.parentNode.parentNode.rows;

                //找到当前单元格右边的未隐藏单元格
                var rightCellRowIndex = tr.rowIndex,
                    rightCellCellIndex = getIndex(td) + td.colSpan,
                    rightCell = rows[rightCellRowIndex].cells[rightCellCellIndex];

                //在隐藏的原生td对象上增加两个属性，分别表示当前td对应的真实td坐标
                for(var i = rightCellRowIndex; i < rightCellRowIndex + rightCell.rowSpan; i++){
                    for(var j = rightCellCellIndex; j < rightCellCellIndex + rightCell.colSpan; j++){
                        var tmpCell = rows[i].cells[j];
                        tmpCell.setAttribute('rootRowIndex',tr.rowIndex);
                        tmpCell.setAttribute('rootCellIndex',getIndex(td));

                    }
                }
                //合并单元格
                td.colSpan += rightCell.colSpan || 1;
                //合并内容
                _moveContent(td, rightCell);
                //删除被合并的单元格，此处用隐藏方式实现来提升性能
                rightCell.style.display = "none";
                //重新让单元格获取焦点
                range.setStart(td, 0).setCursor(true,true);
            }
        };

        /**
         * 向下合并单元格
         */
        me.commands['mergedown'] = {
            queryCommandState : function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, 'td', true);

                if( !td || getCount(me.currentSelectedArr) > 1)return -1;



                var tr = td.parentNode,
                    table = tr.parentNode.parentNode,
                    rows = table.rows;

                //已经是最底行,不能向下合并
                var downCellRowIndex = tr.rowIndex + td.rowSpan;
                if (downCellRowIndex >= rows.length) {
                    return -1;
                }

                //如果下一个单元格是隐藏的，表明他是由左边span过来的，不能向下合并
                var downCell = rows[downCellRowIndex].cells[getIndex(td)];
                if (_isHide(downCell)) {
                    return -1;
                }

                //只有列span都相等时才能合并
                return td.colSpan == downCell.colSpan ? 0 : -1;
            },
            execCommand : function() {
                
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true)|| me.currentSelectedArr[0];

                

                var tr = td.parentNode,
                    rows = tr.parentNode.parentNode.rows;

                var downCellRowIndex = tr.rowIndex + td.rowSpan,
                    downCellCellIndex = getIndex(td),
                    downCell = rows[downCellRowIndex].cells[downCellCellIndex];

                //找到当前列的下一个未被隐藏的单元格
                for (var i = downCellRowIndex; i < downCellRowIndex + downCell.rowSpan; i++) {
                    for(var j = downCellCellIndex; j< downCellCellIndex + downCell.colSpan; j++) {
                        var tmpCell = rows[i].cells[j];


                        tmpCell.setAttribute('rootRowIndex',tr.rowIndex);
                        tmpCell.setAttribute('rootCellIndex',getIndex(td));
                    }
                }
                //合并单元格
                td.rowSpan += downCell.rowSpan || 1;
                //合并内容
                _moveContent(td, downCell);
                //删除被合并的单元格，此处用隐藏方式实现来提升性能
                downCell.style.display = "none";
                //重新让单元格获取焦点
                range.setStart(td, 0).setCursor();
            }
        };

        /**
         * 删除行
         */
        me.commands['deleterow'] = {
            queryCommandState : function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true);
                if(!td && me.currentSelectedArr.length == 0 )return -1;

            },
            execCommand : function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true),
                    tr,
                    table,
                    cells,
                    rows ,
                    rowIndex ,
                    cellIndex;
                
                if(td && me.currentSelectedArr.length == 0){
                    var count = (td.rowSpan || 1) - 1;

                    me.currentSelectedArr.push(td);
                    tr = td.parentNode,
                    table = tr.parentNode.parentNode;

                    rows = table.rows,
                    rowIndex = tr.rowIndex + 1,
                    cellIndex = getIndex(td);

                    while(count){

                        me.currentSelectedArr.push(rows[rowIndex].cells[cellIndex]);
                        count--;
                        rowIndex++
                    }
                }

               while(td = me.currentSelectedArr.pop()){

                    if(!domUtils.findParentByTagName(td,'table')  ){//|| _isHide(td)
                       
                        continue;
                    }
                    tr = td.parentNode,
                    table = tr.parentNode.parentNode;
                    cells = tr.cells,
                    rows = table.rows,
                    rowIndex = tr.rowIndex,
                    cellIndex = getIndex(td);
                    /*
                     * 从最左边开始扫描并隐藏当前行的所有单元格
                     * 若当前单元格的display为none,往上找到它所在的真正单元格，获取colSpan和rowSpan，
                     *  将rowspan减一，并跳转到cellIndex+colSpan列继续处理
                     * 若当前单元格的display不为none,分两种情况：
                     *  1、rowspan == 1 ，直接设置display为none，跳转到cellIndex+colSpan列继续处理
                     *  2、rowspan > 1  , 修改当前单元格的下一个单元格的display为"",
                     *    并将当前单元格的rowspan-1赋给下一个单元格的rowspan，当前单元格的colspan赋给下一个单元格的colspan，
                     *    然后隐藏当前单元格，跳转到cellIndex+colSpan列继续处理
                     */
                    for (var currentCellIndex = 0; currentCellIndex < cells.length;) {
                        var currentNode = cells[currentCellIndex];
                        if (_isHide(currentNode)) {
                            var topNode = rows[currentNode.getAttribute('rootRowIndex')].cells[currentNode.getAttribute('rootCellIndex')];
                            topNode.rowSpan--;
                            currentCellIndex += topNode.colSpan;
                        } else {
                            if (currentNode.rowSpan == 1) {
                                currentCellIndex += currentNode.colSpan;
                            } else {
                                var downNode = rows[rowIndex + 1].cells[currentCellIndex];
                                downNode.style.display = "";
                                downNode.rowSpan = currentNode.rowSpan - 1;
                                downNode.colSpan = currentNode.colSpan;
                                currentCellIndex += currentNode.colSpan;
                            }
                        }
                    }
                    //完成更新后再删除外层包裹的tr
                    domUtils.remove(tr);

                    //重新定位焦点
                    var topRowTd, focusTd, downRowTd;

                    if (rowIndex == rows.length) { //如果被删除的行是最后一行,这里之所以没有-1是因为已经删除了一行
                        //如果删除的行也是第一行，那么表格总共只有一行，删除整个表格
                        if (rowIndex == 0) {
                            var p = table.ownerDocument.createElement('p');
                            p.innerHTML = browser.ie ? '&nbsp;' : '<br/>';
                            table.parentNode.insertBefore(p,table);
                            domUtils.remove(table);
                            range.setStart(p,0).setCursor();
                           
                            return;
                        }
                        //如果上一单元格未隐藏，则直接定位，否则定位到最近的上一个非隐藏单元格
                        var preRowIndex = rowIndex - 1;
                        topRowTd = rows[preRowIndex].cells[ cellIndex];
                        focusTd = _isHide(topRowTd) ? rows[topRowTd.getAttribute('rootRowIndex')].cells[topRowTd.getAttribute('rootCellIndex')]: topRowTd;

                    } else { //如果被删除的不是最后一行，则光标定位到下一行,此处未加1是因为已经删除了一行

                        downRowTd = rows[rowIndex].cells[cellIndex];
                        focusTd = _isHide(downRowTd) ?  rows[downRowTd.getAttribute('rootRowIndex')].cells[downRowTd.getAttribute('rootCellIndex')] : downRowTd;
                    }
                }


                range.setStart(focusTd, 0).setCursor();
                update(table)
            }
        };

        /**
         * 删除列
         */
        me.commands['deletecol'] = {
            queryCommandState:function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true);
                 if(!td && me.currentSelectedArr.length == 0 )return -1;
            },
            execCommand:function() {

                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true);


                if(td && me.currentSelectedArr.length == 0){
                    
                    var count = (td.colSpan || 1)-1;

                    me.currentSelectedArr.push(td);
                    while(count){
                        do{
                            td = td.nextSibling
                        }while(td.nodeType == 3);
                        me.currentSelectedArr.push(td);
                        count--;
                    }
                }

                while(td = me.currentSelectedArr.pop()){
                     if(!domUtils.findParentByTagName(td,'table')  ){ //|| _isHide(td)
                        continue;
                     }
                    
                     var tr = td.parentNode,
                        table = tr.parentNode.parentNode,
                        cellIndex = getIndex(td),
                        rows = table.rows,
                        cells = tr.cells,
                        rowIndex = tr.rowIndex;
                    /*
                     * 从第一行开始扫描并隐藏当前列的所有单元格
                     * 若当前单元格的display为none，表明它是由左边Span过来的，
                     *  将左边第一个非none单元格的colSpan减去1并删去对应的单元格后跳转到rowIndex + rowspan行继续处理；
                     * 若当前单元格的display不为none，分两种情况，
                     *  1、当前单元格的colspan == 1 ， 则直接删除该节点，跳转到rowIndex + rowspan行继续处理
                     *  2、当前单元格的colsapn >  1, 修改当前单元格右边单元格的display为"",
                     *      并将当前单元格的colspan-1赋给它的colspan，当前单元格的rolspan赋给它的rolspan，
                     *      然后删除当前单元格，跳转到rowIndex+rowSpan行继续处理
                     */
                    var rowSpan;
                    for (var currentRowIndex = 0; currentRowIndex < rows.length;) {
                        var currentNode = rows[currentRowIndex].cells[cellIndex];
                        if (_isHide(currentNode)) {
                            var leftNode = rows[currentNode.getAttribute('rootRowIndex')].cells[currentNode.getAttribute('rootCellIndex')];
                            //依次删除对应的单元格
                            rowSpan = leftNode.rowSpan;
                            for (var i = 0; i < leftNode.rowSpan; i++) {
                                var delNode = rows[currentRowIndex + i].cells[cellIndex];
                                domUtils.remove(delNode);
                            }
                            //修正被删后的单元格信息
                            leftNode.colSpan--;
                            currentRowIndex += rowSpan;
                        } else {
                            if (currentNode.colSpan == 1) {
                                rowSpan = currentNode.rowSpan;
                                for(var i=currentRowIndex,l = currentRowIndex+currentNode.rowSpan;i<l;i++){
                                    domUtils.remove(rows[i].cells[cellIndex]);
                                }
                                currentRowIndex += rowSpan;

                            } else {
                                var rightNode = rows[currentRowIndex].cells[cellIndex + 1];
                                rightNode.style.display = "";
                                rightNode.rowSpan = currentNode.rowSpan;
                                rightNode.colSpan = currentNode.colSpan - 1;
                                currentRowIndex += currentNode.rowSpan;
                                domUtils.remove(currentNode);
                            }
                        }
                    }

                    //重新定位焦点
                    var preColTd, focusTd, nextColTd;
                    if (cellIndex == cells.length) { //如果当前列是最后一列，光标定位到当前列的前一列,同样，这里没有减去1是因为已经被删除了一列
                        //如果当前列也是第一列，则删除整个表格
                        if (cellIndex == 0) {
                            var p = table.ownerDocument.createElement('p');
                            p.innerHTML = browser.ie ? '&nbsp;' : '<br/>';
                            table.parentNode.insertBefore(p,table)
                            domUtils.remove(table);
                            range.setStart(p,0).setCursor();
                            return;
                        }
                        //找到当前单元格前一列中和本单元格最近的一个未隐藏单元格
                        var preCellIndex = cellIndex - 1;
                        preColTd = rows[rowIndex].cells[preCellIndex];
                        focusTd = _isHide(preColTd) ? rows[preColTd.getAttribute('rootRowIndex')].cells[preColTd.getAttribute('rootCellIndex')] : preColTd;

                    } else { //如果当前列不是最后一列，则光标定位到当前列的后一列

                        nextColTd = rows[rowIndex].cells[cellIndex];
                        focusTd = _isHide(nextColTd) ? rows[nextColTd.getAttribute('rootRowIndex')].cells[nextColTd.getAttribute('rootCellIndex')] : nextColTd;
                    }
               }

                range.setStart(focusTd, 0).setCursor();
                update(table)
            }
        };

        /**
         * 完全拆分单元格
         */
        me.commands['splittocells'] = {
            queryCommandState:function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true);
                return td && ( td.rowSpan > 1 || td.colSpan > 1 ) && (!me.currentSelectedArr.length || getCount(me.currentSelectedArr) ==1)? 0 : -1;
            },
            execCommand:function() {
                
                var range = this.selection.getRange(),
                        start = range.startContainer,
                        td = domUtils.findParentByTagName(start, ['td','th'], true),
                        tr = td.parentNode,
                        table = tr.parentNode.parentNode;
                var rowIndex = tr.rowIndex,
                    cellIndex = getIndex(td),
                    rowSpan = td.rowSpan,
                    colSpan = td.colSpan;


                for (var i = 0; i < rowSpan; i++) {
                    for (var j = 0; j < colSpan; j++) {
                        var cell = table.rows[rowIndex + i].cells[cellIndex + j];
                        cell.rowSpan = 1;
                        cell.colSpan = 1;
                        if (_isHide(cell)) {
                            cell.style.display = "";
                            cell.innerHTML = browser.ie ? '' : "<br/>";
                        }
                    }
                }
            }
        };


        /**
         * 将单元格拆分成行
         */
        me.commands['splittorows'] = {
            queryCommandState:function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, 'td', true)||me.currentSelectedArr[0];
                return td && ( td.rowSpan > 1) && (!me.currentSelectedArr.length || getCount(me.currentSelectedArr) ==1)? 0 : -1;
            },
            execCommand:function() {
              
                var range = this.selection.getRange(),
                        start = range.startContainer,
                        td = domUtils.findParentByTagName(start, 'td', true)||me.currentSelectedArr[0],
                        tr = td.parentNode,
                        rows = tr.parentNode.parentNode.rows;

                var rowIndex = tr.rowIndex,
                    cellIndex =  getIndex(td),
                    rowSpan = td.rowSpan,
                    colSpan = td.colSpan;

                for (var i = 0; i < rowSpan; i++) {
                    var cells = rows[rowIndex + i],
                        cell = cells.cells[cellIndex];
                    cell.rowSpan = 1;
                    cell.colSpan = colSpan;
                    if (_isHide(cell)) {
                        cell.style.display = "";
                        //原有的内容要清除掉
                        cell.innerHTML = browser.ie ? '' : '<br/>'
                    }
                    //修正被隐藏单元格中存储的rootRowIndex和rootCellIndex信息
                    for(var j = cellIndex + 1; j < cellIndex + colSpan; j++) {
                        cell = cells.cells[j];
                     
                        cell.setAttribute('rootRowIndex',rowIndex + i)
                    }

                }
                clearSelectedTd(me.currentSelectedArr);
                this.selection.getRange().setStart(td,0).setCursor();
            }
        };



        /**
         * 在表格前插入行
         */
        me.commands['insertparagraphbeforetable'] = {
            queryCommandState:function() {
                
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, 'td', true)||me.currentSelectedArr[0];
                return  td && domUtils.findParentByTagName(td,'table')? 0 : -1;
            },
            execCommand:function() {

                var range = this.selection.getRange(),
                    start = range.startContainer,
                    table = domUtils.findParentByTagName(start, 'table', true);

                start = me.document.createElement(me.options.enterTag);
                table.parentNode.insertBefore(start,table);
                clearSelectedTd(me.currentSelectedArr);
                if(start.tagName == 'P'){
                    //trace:868 
                    start.innerHTML = browser.ie ? '' : '<br/>';
                    range.setStart(start,0)
                }else{
                    range.setStartBefore(start)
                }
                range.setCursor();

            }
        };

        /**
         * 将单元格拆分成列
         */
        me.commands['splittocols'] = {
            queryCommandState:function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true)||me.currentSelectedArr[0];
                return td && ( td.colSpan > 1) && (!me.currentSelectedArr.length || getCount(me.currentSelectedArr) ==1) ? 0 : -1;
            },
            execCommand:function() {
                
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true)||me.currentSelectedArr[0],
                    tr = td.parentNode,
                    rows = tr.parentNode.parentNode.rows;

                var rowIndex = tr.rowIndex,
                    cellIndex =  getIndex(td),
                    rowSpan = td.rowSpan,
                    colSpan = td.colSpan;

                for (var i = 0; i < colSpan; i++) {
                    var cell = rows[rowIndex].cells[cellIndex + i];
                    cell.rowSpan = rowSpan;
                    cell.colSpan = 1;
                    if (_isHide(cell)) {
                        cell.style.display = "";
                        cell.innerHTML = browser.ie ? '' : '<br/>'
                    }

                    for(var j = rowIndex + 1; j < rowIndex + rowSpan; j++ ) {
                       var tmpCell = rows[j].cells[cellIndex + i];
                       tmpCell.setAttribute('rootCellIndex',cellIndex + i);
                    }
                }
                 clearSelectedTd(me.currentSelectedArr);
                this.selection.getRange().setStart(td,0).setCursor();
            }
        };


        /**
         * 插入行
         */
        me.commands['insertrow'] = {
            queryCommandState:function() {
                var range = this.selection.getRange();
                return domUtils.findParentByTagName(range.startContainer, 'table', true)
                        || domUtils.findParentByTagName(range.endContainer, 'table', true) || me.currentSelectedArr.length != 0 ? 0 : -1;
            },
            execCommand:function() {
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    tr = domUtils.findParentByTagName(start, 'tr', true) || me.currentSelectedArr[0].parentNode,
                    table = tr.parentNode.parentNode,
                    rows = table.rows;

                //记录插入位置原来所有的单元格
                var rowIndex = tr.rowIndex,
                    cells = rows[rowIndex].cells;

                //插入新的一行
                var newRow = table.insertRow(rowIndex);

                var newCell;
                //遍历表格中待插入位置中的所有单元格，检查其状态，并据此修正新插入行的单元格状态
                for (var cellIndex = 0; cellIndex < cells.length;) {

                    var tmpCell = cells[cellIndex];

                    if (_isHide(tmpCell)) { //如果当前单元格是隐藏的，表明当前单元格由其上部span过来，找到其上部单元格

                        //找到被隐藏单元格真正所属的单元格
                        var topCell = rows[tmpCell.getAttribute('rootRowIndex')].cells[tmpCell.getAttribute('rootCellIndex')];
                        //增加一行，并将所有新插入的单元格隐藏起来
                        topCell.rowSpan++;
                        for (var i = 0; i < topCell.colSpan; i++) {
                             newCell = tmpCell.cloneNode(false);
                             newCell.rowSpan = newCell.colSpan = 1;
                             newCell.innerHTML = browser.ie ? '' : "<br/>";
                            newCell.className = '';

                            if(newRow.children[cellIndex+i]){
                                   newRow.insertBefore(newCell,newRow.children[cellIndex+i]);
                            }else{
                                newRow.appendChild(newCell)
                            }

                            newCell.style.display = "none";
                        }
                        cellIndex += topCell.colSpan;

                    } else {//若当前单元格未隐藏，则在其上行插入colspan个单元格

                        for (var j = 0; j < tmpCell.colSpan; j++) {

                            newCell = tmpCell.cloneNode(false);
                             newCell.rowSpan = newCell.colSpan = 1;
                             newCell.innerHTML = browser.ie ? '' : "<br/>";
                            newCell.className = '';
                             if(newRow.children[cellIndex+j]){
                                   newRow.insertBefore(newCell,newRow.children[cellIndex+j]);
                            }else{
                                newRow.appendChild(newCell)
                            }
                        }
                        cellIndex += tmpCell.colSpan;
                    }
                }
                update(table);
                range.setStart(newRow.cells[0],0).setCursor();

                clearSelectedTd(me.currentSelectedArr);
            }
        };

        /**
         * 插入列
         */
        me.commands['insertcol'] = {
            queryCommandState:function() {
                var range = this.selection.getRange();
                return domUtils.findParentByTagName(range.startContainer, 'table', true)
                        || domUtils.findParentByTagName(range.endContainer, 'table', true) || me.currentSelectedArr.length != 0  ? 0 : -1;
            },
            execCommand:function() {
                
                var range = this.selection.getRange(),
                    start = range.startContainer,
                    td = domUtils.findParentByTagName(start, ['td','th'], true) || me.currentSelectedArr[0],
                    table = domUtils.findParentByTagName(td,'table'),
                    rows =table.rows;

                var cellIndex = getIndex(td),
                    newCell;

                //遍历当前列中的所有单元格，检查其状态，并据此修正新插入列的单元格状态
                for (var rowIndex = 0; rowIndex < rows.length;) {

                    var tmpCell = rows[rowIndex].cells[cellIndex],tr;

                    if (_isHide(tmpCell)) {//如果当前单元格是隐藏的，表明当前单元格由其左边span过来，找到其左边单元格

                        var leftCell = rows[tmpCell.getAttribute('rootRowIndex')].cells[tmpCell.getAttribute('rootCellIndex')];
                        leftCell.colSpan++;
                        for (var i = 0; i < leftCell.rowSpan; i++) {
                            newCell = td.cloneNode(false);
                            newCell.rowSpan = newCell.colSpan = 1;
                             newCell.innerHTML = browser.ie ? '' : "<br/>";
                            newCell.className = '';
                            tr = rows[rowIndex + i];
                            if(tr.children[cellIndex]){
                                 tr.insertBefore(newCell,tr.children[cellIndex]);
                            }else{
                                tr.appendChild(newCell)
                            }

                            newCell.style.display = "none";
                        }
                        rowIndex += leftCell.rowSpan;

                    } else { //若当前单元格未隐藏，则在其左边插入rowspan个单元格

                        for (var j = 0; j < tmpCell.rowSpan; j++) {
                           newCell = td.cloneNode(false);
                            newCell.rowSpan = newCell.colSpan = 1;
                             newCell.innerHTML = browser.ie ? '' : "<br/>";
                            newCell.className = '';
                            tr = rows[rowIndex+j];
                            if(tr.children[cellIndex]){
                                 tr.insertBefore(newCell,tr.children[cellIndex]);
                            }else{
                                tr.appendChild(newCell)
                            }
                            
                            newCell.innerHTML = browser.ie ? '' : "<br/>";
                            
                        }
                        rowIndex += tmpCell.rowSpan;
                    }
                }
                update(table);
                range.setStart(rows[0].cells[cellIndex],0).setCursor();
                clearSelectedTd(me.currentSelectedArr);
            }
        };

        /**
         * 合并多个单元格，通过两个cell将当前包含的所有横纵单元格进行合并
         */
        me.commands['mergecells'] = {
            queryCommandState:function() {
                var count = 0;
                for(var i=0,ti;ti=this.currentSelectedArr[i++];){
                    if(!_isHide(ti))
                        count++;
                }
                return count>1?0:-1;
            },
            execCommand:function() {
                
                var start = me.currentSelectedArr[0],
                    end = me.currentSelectedArr[me.currentSelectedArr.length -1],
                    table = domUtils.findParentByTagName(start,'table'),
                    rows = table.rows,
                    cellsRange = {
                        beginRowIndex:start.parentNode.rowIndex,
                        beginCellIndex:getIndex(start),
                        endRowIndex:end.parentNode.rowIndex,
                        endCellIndex:getIndex(end)
                    },

                    beginRowIndex = cellsRange.beginRowIndex,
                    beginCellIndex = cellsRange.beginCellIndex,
                    rowsLength = cellsRange.endRowIndex - cellsRange.beginRowIndex + 1,
                    cellLength = cellsRange.endCellIndex - cellsRange.beginCellIndex + 1,

                    tmp = rows[beginRowIndex].cells[beginCellIndex];
                
                for (var i = 0, ri; (ri = rows[beginRowIndex + i++]) && i <= rowsLength;) {
                    for (var j = 0, ci; (ci = ri.cells[beginCellIndex + j++]) && j <= cellLength;) {
                        if (i == 1 && j == 1) {
                            ci.style.display = "";
                            ci.rowSpan = rowsLength;
                            ci.colSpan = cellLength;
                        } else {
                            ci.style.display = "none";
                            ci.rowSpan = 1;
                            ci.colSpan = 1;
                            ci.setAttribute('rootRowIndex',beginRowIndex);
                            ci.setAttribute('rootCellIndex',beginCellIndex);
                         
                            //传递内容
                           _moveContent(tmp,ci);
                        }
                    }
                }
                this.selection.getRange().setStart(tmp,0).setCursor();
                clearSelectedTd(me.currentSelectedArr);
            }
        };

        /**
         * 将cellFrom单元格中的内容移动到cellTo中
         * @param cellTo  目标单元格
         * @param cellFrom  源单元格
         */
        function _moveContent(cellTo,cellFrom) {

            

            if( _isEmpty(cellFrom) ) return;

            if(_isEmpty(cellTo)){
                cellTo.innerHTML = cellFrom.innerHTML;
                return;
            }
            var child = cellTo.lastChild;
            if(child.nodeType !=1  || child.tagName != 'BR'){
                cellTo.appendChild(cellTo.ownerDocument.createElement('br'))
            }

            //依次移动内容
            while (child = cellFrom.firstChild) {
                cellTo.appendChild(child);
            }
        }


        /**
         * 根据两个单元格来获取中间包含的所有单元格集合选区
         * @param cellA
         * @param cellB
         * @return {Object} 选区的左上和右下坐标
         */
        function _getCellsRange(cellA, cellB) {

            var trA = cellA.parentNode,
                trB = cellB.parentNode,
                aRowIndex = trA.rowIndex,
                bRowIndex = trB.rowIndex,
                rows = trA.parentNode.parentNode.rows,
                rowsNum = rows.length,
                cellsNum = rows[0].cells.length,
                cellAIndex = getIndex(cellA),
                cellBIndex = getIndex(cellB);

            if (cellA == cellB) {
                return {
                    beginRowIndex: aRowIndex,
                    beginCellIndex: cellAIndex,
                    endRowIndex: aRowIndex + cellA.rowSpan - 1,
                    endCellIndex: cellBIndex + cellA.colSpan - 1
                }
            }

            var
                beginRowIndex = Math.min(aRowIndex, bRowIndex),
                beginCellIndex = Math.min(cellAIndex, cellBIndex),
                endRowIndex = Math.max(aRowIndex + cellA.rowSpan - 1, bRowIndex + cellB.rowSpan - 1),
                endCellIndex = Math.max(cellAIndex + cellA.colSpan - 1, cellBIndex + cellB.colSpan - 1);

            while (1) {

                var tmpBeginRowIndex = beginRowIndex,
                    tmpBeginCellIndex = beginCellIndex,
                    tmpEndRowIndex = endRowIndex,
                    tmpEndCellIndex = endCellIndex;
                // 检查是否有超出TableRange上边界的情况
                if (beginRowIndex > 0) {
                    for (cellIndex = beginCellIndex; cellIndex <= endCellIndex;) {
                        var currentTopTd = rows[beginRowIndex].cells[cellIndex];
                        if (_isHide(currentTopTd)) {

                            //overflowRowIndex = beginRowIndex == currentTopTd.rootRowIndex ? 1:0;
                            beginRowIndex = currentTopTd.getAttribute('rootRowIndex');
                            currentTopTd = rows[currentTopTd.getAttribute('rootRowIndex')].cells[currentTopTd.getAttribute('rootCellIndex')];
                        }

                        cellIndex = getIndex (currentTopTd) + (currentTopTd.colSpan || 1);
                    }
                }

                //检查是否有超出左边界的情况
                if (beginCellIndex > 0) {
                    for (var rowIndex = beginRowIndex; rowIndex <= endRowIndex;) {
                        var currentLeftTd = rows[rowIndex].cells[beginCellIndex];
                        if (_isHide(currentLeftTd)) {
                            // overflowCellIndex = beginCellIndex== currentLeftTd.rootCellIndex ? 1:0;
                            beginCellIndex = currentLeftTd.getAttribute('rootCellIndex');
                            currentLeftTd = rows[currentLeftTd.getAttribute('rootRowIndex')].cells[currentLeftTd.getAttribute('rootCellIndex')];
                        }
                        rowIndex = currentLeftTd.parentNode.rowIndex + (currentLeftTd.rowSpan || 1);
                    }
                }

                // 检查是否有超出TableRange下边界的情况
                if (endRowIndex < rowsNum) {
                    for (var cellIndex = beginCellIndex; cellIndex <= endCellIndex;) {
                        var currentDownTd = rows[endRowIndex].cells[cellIndex];
                        if (_isHide(currentDownTd)) {
                            currentDownTd = rows[currentDownTd.getAttribute('rootRowIndex')].cells[currentDownTd.getAttribute('rootCellIndex')];
                        }
                        endRowIndex = currentDownTd.parentNode.rowIndex + currentDownTd.rowSpan - 1;
                        cellIndex = getIndex(currentDownTd) + (currentDownTd.colSpan || 1);
                    }
                }

                //检查是否有超出右边界的情况
                if (endCellIndex < cellsNum) {
                    for (rowIndex = beginRowIndex; rowIndex <= endRowIndex;) {
                        var currentRightTd = rows[rowIndex].cells[endCellIndex];
                        if (_isHide(currentRightTd)) {
                            currentRightTd = rows[currentRightTd.getAttribute('rootRowIndex')].cells[currentRightTd.getAttribute('rootCellIndex')];
                        }
                        endCellIndex = getIndex(currentRightTd) + currentRightTd.colSpan - 1;
                        rowIndex = currentRightTd.parentNode.rowIndex + (currentRightTd.rowSpan || 1);
                    }
                }

                if (tmpBeginCellIndex == beginCellIndex && tmpEndCellIndex == endCellIndex && tmpEndRowIndex == endRowIndex && tmpBeginRowIndex == beginRowIndex) {
                    break;
                }
            }

            //返回选区的起始和结束坐标
            return {
                beginRowIndex:  beginRowIndex,
                beginCellIndex: beginCellIndex,
                endRowIndex:    endRowIndex,
                endCellIndex:   endCellIndex
            }
        }


        /**
         * 鼠标按下事件
         * @param type
         * @param evt
         */
        function _mouseDownEvent(type, evt) {
            
            if(evt.button ==2)return;
            me.document.body.style.webkitUserSelect = '';
            anchorTd = evt.target || evt.srcElement;

            clearSelectedTd(me.currentSelectedArr);
            domUtils.clearSelectedArr(me.currentSelectedArr);
            //在td里边点击，anchorTd不是td
            if(anchorTd.tagName !== 'TD'){
                anchorTd = domUtils.findParentByTagName(anchorTd,'td') || anchorTd;
            }

            if (anchorTd.tagName == 'TD') {


                me.addListener('mouseover', function(type,evt) {
                   var tmpTd = evt.target || evt.srcElement;
                   _mouseOverEvent.call(me,tmpTd );
                   evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                });

            }else{

              
                reset();
            }
          
        }

        /**
         * 鼠标移动事件
         * @param tmpTd
         */
        function _mouseOverEvent(tmpTd) {

            if (anchorTd && tmpTd.tagName == "TD") {

                me.document.body.style.webkitUserSelect = 'none';
                var table = tmpTd.parentNode.parentNode.parentNode;
                me.selection.getNative()[browser.ie ? 'empty' : 'removeAllRanges']();
                var range =  _getCellsRange(anchorTd, tmpTd);
                _toggleSelect(table, range);
              

            }
        }

        /**
         * 切换选区状态
         * @param table
         * @param cellsRange
         */
        function _toggleSelect(table, cellsRange) {
            var rows = table.rows;
            clearSelectedTd(me.currentSelectedArr);
            for (var i = cellsRange.beginRowIndex; i <= cellsRange.endRowIndex; i++) {
                for (var j = cellsRange.beginCellIndex; j <= cellsRange.endCellIndex; j++) {
                    var td = rows[i].cells[j];
                    td.className = me.options.selectedTdClass;
                    me.currentSelectedArr.push(td);
                }
            }
        }
        //更新rootRowIndxe,rootCellIndex
        function update(table){
            var tds = table.getElementsByTagName('td'),
                rowIndex,cellIndex,rows = table.rows;
            for(var j=0,tj;tj=tds[j++];){
                if(!_isHide(tj)){
                    rowIndex = tj.parentNode.rowIndex;
                    cellIndex = getIndex(tj);
                    for(var r=0;r<tj.rowSpan;r++){
                        var c = r== 0 ? 1 : 0;
                        for(;c<tj.colSpan;c++){
                            var tmp = rows[rowIndex+r].children[cellIndex+c];



                                tmp.setAttribute('rootRowIndex',rowIndex);
                                tmp.setAttribute('rootCellIndex',cellIndex);

                        }
                    }
                }
            }
        }
        me.adjustTable = function(cont){
            var table = cont.getElementsByTagName('table');
            for(var i=0,ti;ti=table[i++];){
                
                if(ti.getAttribute('border') == '0' || !ti.getAttribute('border')){
                    ti.setAttribute('border',1);
                }
                
                if(domUtils.getComputedStyle(ti,'border-color') == '#ffffff'){
                    ti.setAttribute('borderColor', '#000');
               }
                var tds = domUtils.getElementsByTagName(ti,'td'),
                    td,tmpTd;
                
                for(var j=0,tj;tj=tds[j++];){

                      var index = getIndex(tj),
                        rowIndex = tj.parentNode.rowIndex,
                        rows = domUtils.findParentByTagName(tj,'table').rows;
                    
                    for(var r=0;r<tj.rowSpan;r++){
                        var c = r== 0 ? 1 : 0;
                        for(;c<tj.colSpan;c++){

                            if(!td){
                                td = tj.cloneNode(false);
                                
                                td.rowSpan = td.colSpan = 1;
                                td.style.display = 'none';
                                td.innerHTML = browser.ie ? '' :'<br/>';


                           }else{
                              td = td.cloneNode(true)
                            }

                             td.setAttribute('rootRowIndex',tj.parentNode.rowIndex);
                                td.setAttribute('rootCellIndex',index);
                            if(r==0){
                                if(tj.nextSibling){
                                 tj.parentNode.insertBefore(td,tj.nextSibling);
                                }else{
                                    tj.parentNode.appendChild(td)
                                }
                            }else{
                                tmpTd = rows[rowIndex+r].children[index];
                                if(tmpTd){
                                    tmpTd.parentNode.insertBefore(td,tmpTd)
                                }else{
                                    //trace:1032
                                    rows[rowIndex+r].appendChild(td)
                                }
                            }




                        }
                    }


                    
                }

            }
        }
    };



})();

///import core
///commands 右键菜单
/**
 * 右键菜单
 * @function
 * @name baidu.editor.plugins.contextmenu
 * @author zhanyi
 */
(function () {
    var domUtils = baidu.editor.dom.domUtils;

    baidu.editor.plugins['contextmenu'] = function () {
        var me = this,
            menu,
            items = me.options.contextMenu;

            var uiUtils = baidu.editor.ui.uiUtils;

            me.addListener('contextmenu',function(type,evt){
                var offset = uiUtils.getViewportOffsetByEvent(evt);
                if (menu)
                    menu.destroy();
                for (var i = 0,ti,contextItems = []; ti = items[i]; i++) {
                    var last;
                    (function(item) {
                        if (item == '-') {
                            if ((last = contextItems[contextItems.length - 1 ] ) && last !== '-')
                                contextItems.push('-');
                        } else if (item.group) {
                            for (var j = 0,cj,subMenu = []; cj = item.subMenu[j]; j++) {
                                (function(subItem) {
                                    if (subItem == '-') {
                                        if ((last = subMenu[subMenu.length - 1 ] ) && last !== '-')
                                            subMenu.push('-');

                                    } else {
                                        if (me.queryCommandState(subItem.cmdName) != -1) {
                                            subMenu.push({
                                                'label':subItem.label,
                                                className: 'edui-for-' + subItem.cmdName + (subItem.value || ''),
                                                onclick : subItem.exec ? function() {
                                                    subItem.exec.call(me)
                                                } : function() {
                                                    me.execCommand(subItem.cmdName, subItem.value)
                                                }
                                            })
                                        }

                                    }

                                })(cj)

                            }
                            if (subMenu.length) {
                                contextItems.push({
                                    'label' : item.group,
                                    className: 'edui-for-' + item.icon,
                                    'subMenu' : {
                                        items: subMenu
                                    }
                                })
                            }

                        } else {
                            if (me.queryCommandState(item.cmdName) != -1) {
                                contextItems.push({
                                    'label':item.label,
                                    className: 'edui-for-' + item.cmdName + (item.value || ''),
                                    onclick : item.exec ? function() {
                                        item.exec.call(me)
                                    } : function() {
                                        me.execCommand(item.cmdName, item.value)
                                    }
                                })
                            }

                        }

                    })(ti)
                }
                if (contextItems[contextItems.length - 1] == '-')
                    contextItems.pop();
                menu = new baidu.editor.ui.Menu({
                    items: contextItems
                });
                menu.render();
                menu.showAt(offset);
                evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false)
            })



        


    };


})();

///import core
///commands 添加分页功能
/**
 * @description 添加分页功能
 * @author zhanyi
 */
(function() {

    var editor = baidu.editor,
        domUtils = editor.dom.domUtils,
        notBreakTags = ['td'];

    baidu.editor.plugins['pagebreak'] = function() {
        var me = this;
        me.commands['pagebreak'] = {
            execCommand:function(){
                
                var range = me.selection.getRange();

                var div = me.document.createElement('div');
                div.className = 'pagebreak';
                domUtils.unselectable(div);
                //table单独处理
                var node = domUtils.findParentByTagName(range.startContainer,notBreakTags,true),
                 
                    parents = [],pN;
                if(node){
                    switch (node.tagName){
                        case 'TD':
                            pN = node.parentNode;
                            if(!pN.previousSibling){
                                var table = domUtils.findParentByTagName(pN,'table');
                                table.parentNode.insertBefore(div,table);
                                parents = domUtils.findParents(div,true);
                                
                            }else{
                                pN.parentNode.insertBefore(div,pN);
                                parents = domUtils.findParents(div);

                            }
                            pN = parents[1];
                            if(div!==pN){
                                domUtils.breakParent(div,pN);
                            }
                            
                            range.moveToBookmark(bk).select();
                            domUtils.clearSelectedArr(me.currentSelectedArr);
                    }
                    
                }else{

                    if(!range.collapsed){
                        range.deleteContents();
                        var start = range.startContainer;
                        while(domUtils.isBlockElm(start) && domUtils.isEmptyNode(start)){
                            range.setStartBefore(start).collapse(true);
                            domUtils.remove(start);
                            start = range.startContainer;
                        }
                        
                    }
                    parents = domUtils.findParents(range.startContainer,true);
                    pN = parents[1];
                    range.insertNode(div);
                    pN && domUtils.breakParent(div,pN);
                    range.setEndAfter(div).setCursor(true,true)

                }
                
            }
        }

     
    }

})();

///import core
///commands 加粗,斜体,上标,下标
/**
 * b u i等基础功能实现
 * @function
 * @name baidu.editor.execCommands
 * @param    {String}    cmdName    bold加粗。italic斜体。subscript上标。superscript下标。
*/
 baidu.editor.plugins['basestyle'] = function(){

    var basestyles = {
            'bold':['strong','b'],
            'italic':['em','i'],
            //'underline':['u'],
            //'strikethrough':['strike'],
            'subscript':['sub'],
            'superscript':['sup']
        },
        domUtils = baidu.editor.dom.domUtils,
        getObj = function(editor,tagNames){
            var start = editor.selection.getStart();
            return  domUtils.findParentByTagName( start, tagNames, true )
        },
        flag = 0;
    for ( var style in basestyles ) {
        (function( cmd, tagNames ) {
            baidu.editor.commands[cmd] = {
                execCommand : function( cmdName ) {

                    var range = new baidu.editor.dom.Range(this.document),obj = '',me = this;

                    //执行了上述代码可能产生冗余的html代码，所以要注册 beforecontent去掉这些冗余的代码
                    if(!flag){
                        this.addListener('beforegetcontent',function(){
                            domUtils.clearReduent(me.document,['strong','u','em','sup','sub','strike'])
                        });
                        flag = 1;
                    }
                    //table的处理
                    if(me.currentSelectedArr && me.currentSelectedArr.length > 0){
                        for(var i=0,ci;ci=me.currentSelectedArr[i++];){
                            if(ci.style.display != 'none'){
                                range.selectNodeContents(ci).select();
                                //trace:943
                                !obj && (obj = getObj(this,tagNames));
                                if(cmdName == 'superscript' || cmdName == 'subscript'){
                                    
                                    if(!obj || obj.tagName.toLowerCase() != cmdName)
                                        range.removeInlineStyle(['sub','sup'])

                                }
                                obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] )
                            }

                        }
                        range.selectNodeContents(me.currentSelectedArr[0]).select();
                    }else{
                        range = me.selection.getRange();
                        obj = getObj(this,tagNames);

                        if ( range.collapsed ) {
                            if ( obj ) {
                                var tmpText =  me.document.createTextNode('');
                                range.insertNode( tmpText ).removeInlineStyle( tagNames );

                                range.setStartBefore(tmpText);
                                domUtils.remove(tmpText);
                            } else {
                                
                                var tmpNode = range.document.createElement( tagNames[0] );
                                if(cmdName == 'superscript' || cmdName == 'subscript'){
                                    tmpText = me.document.createTextNode('');
                                    range.insertNode(tmpText)
                                        .removeInlineStyle(['sub','sup'])
                                        .setStartBefore(tmpText)
                                        .collapse(true);

                                }
                                range.insertNode( tmpNode ).setStart( tmpNode, 0 );
                                


                            }
                            range.collapse( true )

                        } else {
                            if(cmdName == 'superscript' || cmdName == 'subscript'){
                                if(!obj || obj.tagName.toLowerCase() != cmdName)
                                    range.removeInlineStyle(['sub','sup'])

                            }
                            obj ? range.removeInlineStyle( tagNames ) : range.applyInlineStyle( tagNames[0] )
                        }

                        range.select();
                        
                    }

                    return true;
                },
                queryCommandState : function() {
                   return getObj(this,tagNames) ? 1 : 0;
                }
            }
        })( style, basestyles[style] );

    }
};


///import core
///commands 选区路径
/**
 * 选区路径
 * @function
 * @name baidu.editor.execCommand
 * @param {String}     cmdName     elementpath选区路径
 */
 baidu.editor.plugins['elementpath'] = function(){

    var domUtils = baidu.editor.dom.domUtils,
        currentLevel,
        tagNames,
        dtd = baidu.editor.dom.dtd;


    baidu.editor.commands['elementpath'] = {
        execCommand : function( cmdName, level ) {
            var me = this,
                start = tagNames[level],
                range = me.selection.getRange();
            me.currentSelectedArr && domUtils.clearSelectedArr(me.currentSelectedArr);
           
            currentLevel = level*1;
            if(dtd.$tableContent[start.tagName]){
                switch (start.tagName){
                    case 'TD':me.currentSelectedArr = [start];
                            start.className = me.options.selectedTdClass;
                            break;
                    case 'TR':
                        var cells = start.cells;
                        for(var i=0,ti;ti=cells[i++];){
                            me.currentSelectedArr.push(ti);
                            ti.className = me.options.selectedTdClass;
                        }
                        break;
                    case 'TABLE':
                    case 'TBODY':

                        var rows = start.rows;
                        for(var i=0,ri;ri=rows[i++];){
                            cells = ri.cells;
                            for(var j=0,tj;tj=cells[j++];){
                                 me.currentSelectedArr.push(tj);
                                tj.className = me.options.selectedTdClass;
                            }
                        }

                }
                start = me.currentSelectedArr[0];
                if(domUtils.isEmptyNode(start)){
                    range.setStart(start,0).setCursor()
                }else{
                   range.selectNodeContents(start).select()
                }
            }else{
                range.selectNode(start).select()

            }
        },
        queryCommandValue : function() {
            var start = this.selection.getStart(),
                parents = domUtils.findParents(start, true),

                names = [];
            tagNames = parents;
            for(var i=0,ci;ci=parents[i];i++){
                if(ci.nodeType == 3) continue;
                var name = ci.tagName.toLowerCase();
                if(name == 'img' && ci.getAttribute('anchorname')){
                    name = 'anchor'
                }
                names[i] = name;
                if(currentLevel == i){
                   currentLevel = -1;
                    break;
                }
            }
            return names;
        }
    }


};


///import core
///import commands\removeformat.js
///commands 格式刷
/**
 * 格式刷，只格式inline的
 * @function
 * @name baidu.editor.execCommand
 * @param {String}     cmdName    formatmatch执行格式刷
 */
 baidu.editor.plugins['formatmatch'] = function(){

    var me = this,
        domUtils = baidu.editor.dom.domUtils,
        list = [],img,
        flag = 0,
        browser = baidu.editor.browser;

     this.addListener('reset',function(){
         list = [];
         flag = 0;
     });

    function addList(type,evt){
        
        if(browser.webkit){
            var target = evt.target.tagName == 'IMG' ? evt.target : null;
        }

        function addFormat(range){

            if(text && (!me.currentSelectedArr || !me.currentSelectedArr.length)){
                range.selectNode(text);
            }
            return range.applyInlineStyle(list[list.length-1].tagName,null,list);

        }

        me.undoManger && me.undoManger.save();

        var range = me.selection.getRange(),
            imgT = target || range.getClosedNode();
        if(img && imgT && imgT.tagName == 'IMG'){
            //trace:964

            imgT.style.cssText += ';float:' + (img.style.cssFloat || img.style.styleFloat ||'none') + ';display:' + (img.style.display||'inline');

            img = null;
        }else{
            if(!img){
                var collapsed = range.collapsed;
                if(collapsed){
                    var text = me.document.createTextNode('match');
                    range.insertNode(text).select();


                }
                me.__hasEnterExecCommand = true;
                me.execCommand('removeformat');
                me.__hasEnterExecCommand = false;
                //trace:969
                range = me.selection.getRange();
                if(list.length == 0){

                    if(me.currentSelectedArr && me.currentSelectedArr.length > 0){
                        range.selectNodeContents(me.currentSelectedArr[0]).select();
                    }
                }else{
                    if(me.currentSelectedArr && me.currentSelectedArr.length > 0){

                        for(var i=0,ci;ci=me.currentSelectedArr[i++];){
                            range.selectNodeContents(ci);
                            addFormat(range);

                        }
                        range.selectNodeContents(me.currentSelectedArr[0]).select();
                    }else{


                        addFormat(range)

                    }
                }
                if(!me.currentSelectedArr || !me.currentSelectedArr.length){
                    if(text){
                        range.setStartBefore(text).collapse(true);

                    }

                    range.select()
                }
                text && domUtils.remove(text);
            }

        }




        me.undoManger && me.undoManger.save();
        me.removeListener('mouseup',addList);
        flag = 0;
    }

    baidu.editor.commands['formatmatch'] = {
        execCommand : function( cmdName ) {
          
            if(flag){
                flag = 0;
                list = [];
                 me.removeListener('mouseup',addList);
                return;
            }


              
            var range = me.selection.getRange();
            img = range.getClosedNode();
            if(!img || img.tagName != 'IMG'){
               range.collapse(true).shrinkBoundary();
               var start = range.startContainer;
               list = domUtils.findParents(start,true,function(node){
                   return !domUtils.isBlockElm(node) && node.nodeType == 1
               });
               //a不能加入格式刷, 并且克隆节点
               for(var i=0,ci;ci=list[i];i++){
                   if(ci.tagName == 'A'){
                       list.splice(i,1);
                       break;
                   }
               }

            }

            me.addListener('mouseup',addList);
            flag = 1;


        },
        queryCommandState : function() {
            return flag;
        },
        notNeedUndo : 1
    }
};


///import core
///commands 查找替换
/**
 * @description 查找替换
 * @author zhanyi
 */
 baidu.editor.plugins['searchreplace'] = function(){

    var currentRange,
        first;
   
    this.addListener('reset',function(){
        currentRange = null;
        first = null;
    });
    baidu.editor.commands['searchreplace'] = {

            execCommand : function(cmdName,opt){
               	var editor = this,
                    sel = editor.selection,
                    range,
                    nativeRange,
                    num = 0,
                opt = baidu.editor.utils.extend(opt,{
                    replaceStr : null,
                    all : false,
                    casesensitive : false,
                    dir : 1
                },true);


                if(baidu.editor.browser.ie){
                    while(1){
                        var tmpRange;
                        nativeRange = editor.document.selection.createRange();
                        tmpRange = nativeRange.duplicate();
                        tmpRange.moveToElementText(editor.document.body);
                        if(opt.all){
                            first = 0;
                            opt.dir = 1;
                            
                            if(currentRange){
                                tmpRange.setEndPoint(opt.dir == -1 ? 'EndToStart' : 'StartToEnd',currentRange)
                            }
                        }else{
                            tmpRange.setEndPoint(opt.dir == -1 ? 'EndToStart' : 'StartToEnd',nativeRange);
                            if(opt.replaceStr){
                                tmpRange.setEndPoint(opt.dir == -1 ? 'StartToEnd' : 'EndToStart',nativeRange);
                            }
                        }
                        nativeRange = tmpRange.duplicate();



                        if(!tmpRange.findText(opt.searchStr,opt.dir,opt.casesensitive ? 4 : 0)){

                            tmpRange = editor.document.selection.createRange();
                            tmpRange.scrollIntoView();
                            return num;
                        }
                        tmpRange.select();
                        //替换
                        if(opt.replaceStr){
                            range = sel.getRange();
                            range.deleteContents().insertNode(range.document.createTextNode(opt.replaceStr)).select();
                            currentRange = sel.getNative().createRange();

                        }
                        num++;
                        if(!opt.all)break;
                    }
                }else{
                    var w = editor.window,nativeSel = sel.getNative(),tmpRange;
                    while(1){
                        if(opt.all){
                            if(currentRange){
                                currentRange.collapse(false);
                                nativeRange = currentRange;
                                
                            }else{
                                nativeRange  = editor.document.createRange();
                                nativeRange.setStart(editor.document.body,0);

                            }
                            nativeSel.removeAllRanges();
                            nativeSel.addRange( nativeRange );
                            first = 0;
                            opt.dir = 1;
                        }else{
                            nativeRange = w.getSelection().getRangeAt(0);
                           
                            if(opt.replaceStr){
                                nativeRange.collapse(opt.dir == 1 ? true : false);
                            }
                        }

                        //如果是第一次并且海选中了内容那就要清除，为find做准备
                       
                        if(!first){
                            nativeRange.collapse( opt.dir <0 ? true : false);
                            nativeSel.removeAllRanges();
                            nativeSel.addRange( nativeRange );
                        }else{
                            nativeSel.removeAllRanges();
                        }

                        if(!w.find(opt.searchStr,opt.casesensitive,opt.dir < 0 ? true : false) ) {
                            nativeSel.removeAllRanges();

                            return num;
                        }
                        first = 0;
                        range = w.getSelection().getRangeAt(0);
                        if(!range.collapsed){
                            if(opt.replaceStr){
                                range.deleteContents();
                                var text = w.document.createTextNode(opt.replaceStr);
                                range.insertNode(text);
                                range.selectNode(text);
                                nativeSel.addRange(range);
                                currentRange = range.cloneRange();
                            }
                        }
                        num++;
                        if(!opt.all)break;
                    }

                }
                return true;
            }
    }

};
var baidu = baidu || {};
baidu.editor = baidu.editor || {};
baidu.editor.ui = {};
(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils;

    var magic = '$EDITORUI';
    var root = window[magic] = {};
    var uidMagic = 'ID' + magic;
    var uidCount = 0;
    
    var uiUtils = baidu.editor.ui.uiUtils = {
        uid: function (obj){
            return (obj ? obj[uidMagic] || (obj[uidMagic] = ++ uidCount) : ++ uidCount);
        },
        hook: function ( fn, callback ) {
            var dg;
            if (fn && fn._callbacks) {
                dg = fn;
            } else {
                dg = function (){
                    var q;
                    if (fn) {
                        q = fn.apply(this, arguments);
                    }
                    var callbacks = dg._callbacks;
                    var k = callbacks.length;
                    while (k --) {
                        var r = callbacks[k].apply(this, arguments);
                        if (q === undefined) {
                            q = r;
                        }
                    }
                    return q;
                };
                dg._callbacks = [];
            }
            dg._callbacks.push(callback);
            return dg;
        },
        createElementByHtml: function (html){
            var el = document.createElement('div');
            el.innerHTML = html;
            el = el.firstChild;
            el.parentNode.removeChild(el);
            return el;
        },
        getViewportElement: function (){
            return (browser.ie && browser.quirks) ?
                document.body : document.documentElement;
        },
        getClientRect: function (element){
            var bcr = element.getBoundingClientRect();
            var rect = {
                left: Math.round(bcr.left),
                top: Math.round(bcr.top),
                height: Math.round(bcr.bottom - bcr.top),
                width: Math.round(bcr.right - bcr.left)
            };
            var doc;
            while ((doc = element.ownerDocument) !== document &&
                (element = domUtils.getWindow(doc).frameElement)) {
                bcr = element.getBoundingClientRect();
                rect.left += bcr.left;
                rect.top += bcr.top;
            }
            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;
            return rect;
        },
        getViewportRect: function (){
            var viewportEl = uiUtils.getViewportElement();
            var width = viewportEl.clientWidth | 0;
            var height = viewportEl.clientHeight | 0;
            return {
                left: 0,
                top: 0,
                height: height,
                width: width,
                bottom: height,
                right: width
            };
        },
        setViewportOffset: function (element, offset){
            var rect;
            var fixedLayer = uiUtils.getFixedLayer();
            if (element.parentNode === fixedLayer) {
                element.style.left = offset.left + 'px';
                element.style.top = offset.top + 'px';
            } else {
                var left = parseInt(element.style.left) | 0;
                var top = parseInt(element.style.top) | 0;
                rect = uiUtils.getClientRect(element);
                left = left + offset.left - rect.left;
                top = top + offset.top - rect.top;
                element.style.left = left + 'px';
                element.style.top = top + 'px';
            }
        },
        getEventOffset: function (evt){
            var el = evt.target || evt.srcElement;
            var rect = uiUtils.getClientRect(el);
            var offset = uiUtils.getViewportOffsetByEvent(evt);
            return {
                left: offset.left - rect.left,
                top: offset.top - rect.top
            };
        },
        getViewportOffsetByEvent: function (evt){
            var el = evt.target || evt.srcElement;
            var frameEl = domUtils.getWindow(el).frameElement;
            var offset = {
                left: evt.clientX,
                top: evt.clientY
            };
            if (frameEl && el.ownerDocument !== document) {
                var rect = uiUtils.getClientRect(frameEl);
                offset.left += rect.left;
                offset.top += rect.top;
            }
            return offset;
        },
        setGlobal: function (id, obj){
            root[id] = obj;
            return magic + '["' + id  + '"]';
        },
        unsetGlobal: function (id){
            delete root[id];
        },
        copyAttributes: function (tgt, src){
            var attributes = src.attributes;
            var k = attributes.length;
            while (k --) {
                var attrNode = attributes[k];
                if ( attrNode.nodeName != 'style' && attrNode.nodeName != 'class' && (!browser.ie || attrNode.specified) ) {
                    tgt.setAttribute(attrNode.nodeName, attrNode.nodeValue);
                }
            }
            if (src.className) {
                tgt.className += ' ' + src.className;
            }
            if (src.style.cssText) {
                tgt.style.cssText += ';' + src.style.cssText;
            }
        },
        removeStyle: function (el, styleName){
            if (el.style.removeProperty) {
                el.style.removeProperty(styleName);
            } else if (el.style.removeAttribute) {
                el.style.removeAttribute(styleName);
            } else throw '';
        },
        contains: function (elA, elB){
            return elA && elB && (elA === elB ? false : (
                elA.contains ? elA.contains(elB) :
                    elA.compareDocumentPosition(elB) & 16
                ));
        },
        startDrag: function (evt, callbacks){
            var doc = document;
            var startX = evt.clientX;
            var startY = evt.clientY;
            function handleMouseMove(evt){
                var x = evt.clientX - startX;
                var y = evt.clientY - startY;
                callbacks.ondragmove(x, y);
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                } else {
                    evt.cancelBubble = true;
                }
            }
            if (doc.addEventListener) {
                function handleMouseUp(evt){
                    doc.removeEventListener('mousemove', handleMouseMove, true);
                    doc.removeEventListener('mouseup', handleMouseMove, true);
                    callbacks.ondragstop();
                }
                doc.addEventListener('mousemove', handleMouseMove, true);
                doc.addEventListener('mouseup', handleMouseUp, true);
                evt.preventDefault();
            } else {
                var elm = evt.srcElement;
                elm.setCapture();
                function releaseCaptrue(){
                    elm.releaseCapture();
                    elm.detachEvent('onmousemove', handleMouseMove);
                    elm.detachEvent('onmouseup', releaseCaptrue);
                    elm.detachEvent('onlosecaptrue', releaseCaptrue);
                    callbacks.ondragstop();
                }
                elm.attachEvent('onmousemove', handleMouseMove);
                elm.attachEvent('onmouseup', releaseCaptrue);
                elm.attachEvent('onlosecaptrue', releaseCaptrue);
                evt.returnValue = false;
            }
            callbacks.ondragstart();
        },
        getFixedLayer: function (){
            var layer = document.getElementById('edui_fixedlayer');
            if (layer == null) {
                layer = document.createElement('div');
                layer.id = 'edui_fixedlayer';
                document.body.appendChild(layer);
                if (browser.ie && browser.version <= 8) {
                    layer.style.position = 'absolute';
                    bindFixedLayer();
                    setTimeout(updateFixedOffset);
                } else {
                    layer.style.position = 'fixed';
                }
                layer.style.left = '0';
                layer.style.top = '0';
                layer.style.width = '0';
                layer.style.height = '0';
            }
            return layer;
        },
        makeUnselectable: function (element){
            if (browser.opera || (browser.ie && browser.version < 9)) {
                element.unselectable = 'on';
                if (element.hasChildNodes()) {
                    for (var i=0; i<element.childNodes.length; i++) {
                        if (element.childNodes[i].nodeType == 1) {
                            uiUtils.makeUnselectable(element.childNodes[i]);
                        }
                    }
                }
            } else {
                if (element.style.MozUserSelect !== undefined) {
                    element.style.MozUserSelect = 'none';
                } else if (element.style.WebkitUserSelect !== undefined) {
                    element.style.WebkitUserSelect = 'none';
                } else if (element.style.KhtmlUserSelect !== undefined) {
                    element.style.KhtmlUserSelect = 'none';
                }
            }
        },
        mapUrl: function (url){
            return url.replace('~/', UEDITOR_CONFIG.UEDITOR_HOME_URL);
        }
    };
    function updateFixedOffset(){
        var layer = document.getElementById('edui_fixedlayer');
        uiUtils.setViewportOffset(layer, {
            left: 0,
            top: 0
        });
        layer.style.display = 'none';
        layer.style.display = 'block';
    }
    function bindFixedLayer(adjOffset){
        domUtils.on(window, 'scroll', updateFixedOffset);
    }
})();

(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        EventBase = baidu.editor.EventBase,
        UIBase = baidu.editor.ui.UIBase = function (){};

    UIBase.prototype = {
        className: '',
        uiName: '',
        initOptions: function (options){
            var me = this;
            for (var k in options) {
                me[k] = options[k];
            }
            this.id = this.id || 'edui' + uiUtils.uid();
        },
        initUIBase: function (){
            this._globalKey = utils.unhtml( uiUtils.setGlobal(this.id, this) );
        },
        render: function (holder){
            var html = this.renderHtml();
            var el = uiUtils.createElementByHtml(html);
            var seatEl = this.getDom();
            if (seatEl != null) {
                seatEl.parentNode.replaceChild(el, seatEl);
                uiUtils.copyAttributes(el, seatEl);
            } else {
                if (typeof holder == 'string') {
                    holder = document.getElementById(holder);
                }
                holder = holder || uiUtils.getFixedLayer();
                holder.appendChild(el);
            }
            this.postRender();
        },
        getDom: function (name){
            if (!name) {
                return document.getElementById( this.id );
            } else {
                return document.getElementById( this.id + '_' + name );
            }
        },
        postRender: function (){
            this.fireEvent('postrender');
        },
        getHtmlTpl: function (){
            return '';
        },
        formatHtml: function (tpl){
            var prefix = 'edui-' + this.uiName;
            return (tpl
                .replace(/##/g, this.id)
                .replace(/%%-/g, this.uiName ? prefix + '-' : '')
                .replace(/%%/g, (this.uiName ? prefix : '') + ' ' + this.className)
                .replace(/\$\$/g, this._globalKey));
        },
        renderHtml: function (){
            return this.formatHtml(this.getHtmlTpl());
        },
        dispose: function (){
            var box = this.getDom();
            if (box) baidu.editor.dom.domUtils.remove( box );
            uiUtils.unsetGlobal(this.id);
        }
    };
    utils.inherits(UIBase, EventBase);
})();

(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Separator = baidu.editor.ui.Separator = function (options){
            this.initOptions(options);
            this.initSeparator();
        };
    Separator.prototype = {
        uiName: 'separator',
        initSeparator: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%"></div>';
        }
    };
    utils.inherits(Separator, UIBase);

})();

///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        uiUtils = baidu.editor.ui.uiUtils;
    
    var Mask = baidu.editor.ui.Mask = function (options){
        this.initOptions(options);
        this.initUIBase();
    };
    Mask.prototype = {
        getHtmlTpl: function (){
            return '<div id="##" class="edui-mask %%" onmousedown="return $$._onMouseDown(event, this);"></div>';
        },
        postRender: function (){
            var me = this;
            domUtils.on(window, 'resize', function (){
                setTimeout(function (){
                    if (!me.isHidden()) {
                        me._fill();
                    }
                });
            });
        },
        show: function (){
            this._fill();
            this.getDom().style.display = '';
        },
        hide: function (){
            this.getDom().style.display = 'none';
        },
        isHidden: function (){
            return this.getDom().style.display == 'none';
        },
        _onMouseDown: function (){
            return false;
        },
        _fill: function (){
            var el = this.getDom();
            var vpRect = uiUtils.getViewportRect();
            el.style.width = vpRect.width + 'px';
            el.style.height = vpRect.height + 'px';
        }
    };
    utils.inherits(Mask, UIBase);
})();

///import core
///import uicore
(function () {
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        Popup = baidu.editor.ui.Popup = function (options){
            this.initOptions(options);
            this.initPopup();
        };

    var allPopups = [];
    function closeAllPopup( el ){
        var newAll = [];
        for ( var i = 0; i < allPopups.length; i++ ) {
            var pop = allPopups[i];
            if (!pop.isHidden()) {
                if (pop.queryAutoHide(el) !== false) {
                    pop.hide();
                }
            }
        }
    }

    Popup.postHide = closeAllPopup;

    var ANCHOR_CLASSES = ['edui-anchor-topleft','edui-anchor-topright',
        'edui-anchor-bottomleft','edui-anchor-bottomright'];
    Popup.prototype = {
        SHADOW_RADIUS: 5,
        content: null,
        _hidden: false,
        autoRender: true,
        initPopup: function (){
            this.initUIBase();
            allPopups.push( this );
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-popup %%">' +
                ' <div id="##_body" class="edui-popup-body">' +
                '  <div class="edui-shadow"></div>' +
                '  <div id="##_content" class="edui-popup-content">' +
                this.getContentHtmlTpl() +
                '  </div>' +
                ' </div>' +
                '</div>';
        },
        getContentHtmlTpl: function (){
            if (typeof this.content == 'string') {
                return this.content;
            }
            return this.content.renderHtml();
        },
        _UIBase_postRender: UIBase.prototype.postRender,
        postRender: function (){
            if (this.content instanceof UIBase) {
                this.content.postRender();
            }
            this.hide(true);
            this._UIBase_postRender();
        },
        _doAutoRender: function (){
            if (!this.getDom() && this.autoRender) {
                this.render();
            }
        },
        mesureSize: function (){
            var box = this.getDom('content');
            return uiUtils.getClientRect(box);
        },
        fitSize: function (){
            var popBodyEl = this.getDom('body');
            popBodyEl.style.width = '';
            popBodyEl.style.height = '';
            var size = this.mesureSize();
            popBodyEl.style.width = size.width + 'px';
            popBodyEl.style.height = size.height + 'px';
            return size;
        },
        showAnchor: function ( element, hoz ){
            this.showAnchorRect( uiUtils.getClientRect( element ), hoz );
        },
        showAnchorRect: function ( rect, hoz, adj ){
            this._doAutoRender();
            var vpRect = uiUtils.getViewportRect();
            this._show();
            var popSize = this.fitSize();
            
            var sideLeft, sideUp, left, top;
            if (hoz) {
//                sideLeft = (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
//                sideUp = (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
//                left = (sideLeft ? rect.left - popSize.width : rect.right);
//                top = (sideUp ? rect.bottom - popSize.height : rect.top);
                sideLeft = (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
                sideUp = (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
                left = rect.right + popSize.width > vpRect.right ?
                    (rect.left > popSize.width ? rect.left - popSize.width : (
                        adj ? vpRect.right - popSize.width : rect.right
                        )) : rect.right;
                top = rect.top + popSize.height > vpRect.bottom ?
                    (rect.bottom > popSize.height ? rect.bottom - popSize.height : (
                        adj ? vpRect.bottom - popSize.height : rect.top
                        )) : rect.top;
            } else {
                sideLeft = (rect.right + popSize.width > vpRect.right && rect.left > popSize.width);
                sideUp = (rect.top + popSize.height > vpRect.bottom && rect.bottom > popSize.height);
                left = rect.right + popSize.width > vpRect.right ?
                    (rect.left > popSize.width ? rect.right - popSize.width : (
                        adj ? vpRect.right - popSize.width : rect.left)) : rect.left;
                top = rect.bottom + popSize.height > vpRect.bottom ?
                    (rect.top > popSize.height ? rect.top - popSize.height : (
                        adj ? vpRect.bottom - popSize.height : rect.bottom)) : rect.bottom;
            }

            var popEl = this.getDom();
            uiUtils.setViewportOffset(popEl, {
                left: left,
                top: top
            });
            domUtils.removeClasses(popEl, ANCHOR_CLASSES);
            popEl.className += ' ' + ANCHOR_CLASSES[(sideUp ? 1 : 0) * 2 + (sideLeft ? 1 : 0)];
        },
        showAt: function (offset) {
            var left = offset.left;
            var top = offset.top;
            var rect = {
                left: left,
                top: top,
                right: left,
                bottom: top,
                height: 0,
                width: 0
            };
            this.showAnchorRect(rect, false, true);
        },
        _show: function (){
            if (this._hidden) {
                var box = this.getDom();
                box.style.display = '';
                this._hidden = false;
//                if (box.setActive) {
//                    box.setActive();
//                }
                this.fireEvent('show');
            }
        },
        isHidden: function (){
            return this._hidden;
        },
        show: function (){
            this._doAutoRender();
            this._show();
        },
        hide: function (notNofity){
            if (!this._hidden && this.getDom()) {
//                this.getDom().style.visibility = 'hidden';
                this.getDom().style.display = 'none';
                this._hidden = true;
                if (!notNofity) {
                    this.fireEvent('hide');
                }
            }
        },
        queryAutoHide: function (el){
            return !el || !uiUtils.contains(this.getDom(), el);
        }
    };
    utils.inherits(Popup, UIBase);
    
    domUtils.on( document, 'mousedown', function ( evt ) {
        var el = evt.target || evt.srcElement;
        closeAllPopup( el );
    } );
    domUtils.on( window, 'scroll', function () {
        closeAllPopup();
    } );

//    var lastVpRect = uiUtils.getViewportRect();
//    domUtils.on( window, 'resize', function () {
//        var vpRect = uiUtils.getViewportRect();
//        if (vpRect.width != lastVpRect.width || vpRect.height != lastVpRect.height) {
//            closeAllPopup();
//        }
//    } );

})();

///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        ColorPicker = baidu.editor.ui.ColorPicker = function (options){
            this.initOptions(options);
            this.noColorText = this.noColorText || '不设置颜色';
            this.initUIBase();
        };

    ColorPicker.prototype = {
        getHtmlTpl: function (){
            return genColorPicker(
                this.noColorText
                );
        },
        _onTableClick: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.fireEvent('pickcolor', color);
            }
        },
        _onTableOver: function (evt){
            var tgt = evt.target || evt.srcElement;
            var color = tgt.getAttribute('data-color');
            if (color) {
                this.getDom('preview').style.backgroundColor = color;
            }
        },
        _onTableOut: function (){
            this.getDom('preview').style.backgroundColor = '';
        },
        _onPickNoColor: function (){
            this.fireEvent('picknocolor');
        }
    };
    utils.inherits(ColorPicker, UIBase);

    var COLORS = (
        'ff0000,ffa900,ffff00,99e600,00cc22,00ffff,00aaff,0055ff,5500ff,aa00ff,ff007f,ffffff,' +
        'ffe5e5,fff2d9,ffffcc,eeffcc,d9ffe0,d9ffff,d9f2ff,d9e6ff,e6d9ff,f2d9ff,ffd9ed,d9d9d9,' +
        'e68a8a,e6c78a,ffff99,bfe673,99eea0,a1e6e6,99ddff,8aa8e6,998ae6,c78ae6,e68ab9,b3b3b3,' +
        'cc5252,cca352,d9d957,a7cc39,57ce6d,52cccc,52a3cc,527acc,6652cc,a352cc,cc5291,8c8c8c,' +
        '991f1f,99701f,99991f,59800d,0f9932,1f9999,1f7099,1f4799,471f99,701f99,991f5e,404040,' +
        '660000,664b14,666600,3b5900,005916,146666,144b66,143066,220066,301466,66143f,000000').split(',');

    function genColorPicker(noColorText){
        var html = '<div id="##" class="edui-colorpicker %%">' +
            '<div class="edui-colorpicker-topbar edui-clearfix">' +
             '<div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div>' +
             '<div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">'+ noColorText +'</div>' +
            '</div>' +
            '<table class="edui-box" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0">' +
            '<tr class="edui-colorpicker-tablefirstrow">';
        for (var i=0; i<COLORS.length; i++) {
            if (i && i%12 === 0) {
                html += '</tr><tr>';
            }
            html += '<td><a hidefocus onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell"' +
                        ' data-color="#'+ COLORS[i] +'"'+
                        ' style="background-color:#'+ COLORS[i] +';"' +
                    '></a></td>';
        }
        html += '</tr></table></div>';
        return html;
    }
})();

///import core
///import uicore
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase;
    
    var TablePicker = baidu.editor.ui.TablePicker = function (options){
        this.initOptions(options);
        this.initTablePicker();
    };
    TablePicker.prototype = {
        defaultNumRows: 10,
        defaultNumCols: 10,
        maxNumRows: 20,
        maxNumCols: 20,
        numRows: 10,
        numCols: 10,
        lengthOfCellSide: 22,
        initTablePicker: function (){
            this.initUIBase();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-tablepicker %%">' +
                 '<div class="edui-tablepicker-body">' +
                  '<div class="edui-infoarea">' +
                   '<span id="##_label" class="edui-label"></span>' +
                   '<span class="edui-clickable" onclick="$$._onMore();">更多</span>' +
                  '</div>' +
                  '<div class="edui-pickarea"' +
                   ' onmousemove="$$._onMouseMove(event, this);"' +
                   ' onmouseover="$$._onMouseOver(event, this);"' +
                   ' onmouseout="$$._onMouseOut(event, this);"' +
                   ' onclick="$$._onClick(event, this);"' +
                  '>' +
                    '<div id="##_overlay" class="edui-overlay"></div>' +
                  '</div>' +
                 '</div>' +
                '</div>';
        },
        _UIBase_render: UIBase.prototype.render,
        render: function (holder){
            this._UIBase_render(holder);
            this.getDom('label').innerHTML = '0列 x 0行';
        },
        _track: function (numCols, numRows){
            var style = this.getDom('overlay').style;
            var sideLen = this.lengthOfCellSide;
            style.width = numCols * sideLen + 'px';
            style.height = numRows * sideLen + 'px';
            var label = this.getDom('label');
            label.innerHTML = numCols + '列 x ' + numRows + '行';
            this.numCols = numCols;
            this.numRows = numRows;
        },
        _onMouseOver: function (evt, el){
            var rel = evt.relatedTarget || evt.fromElement;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.getDom('label').innerHTML = '0列 x 0行';
                this.getDom('overlay').style.visibility = '';
            }
        },
        _onMouseOut: function (evt, el){
            var rel = evt.relatedTarget || evt.toElement;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.getDom('label').innerHTML = '0列 x 0行';
                this.getDom('overlay').style.visibility = 'hidden';
            }
        },
        _onMouseMove: function (evt, el){
            var style = this.getDom('overlay').style;
            var offset = uiUtils.getEventOffset(evt);
            var sideLen = this.lengthOfCellSide;
            var numCols = Math.ceil(offset.left / sideLen);
            var numRows = Math.ceil(offset.top / sideLen);
            this._track(numCols, numRows);
        },
        _onClick: function (){
            this.fireEvent('picktable', this.numCols, this.numRows);
        },
        _onMore: function (){
            this.fireEvent('more');
        }
    };
    utils.inherits(TablePicker, UIBase);
})();

(function (){
    var browser = baidu.editor.browser,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils;
    
    var TPL_STATEFUL = 'onmousedown="$$.Stateful_onMouseDown(event, this);"' +
        ' onmouseup="$$.Stateful_onMouseUp(event, this);"' +
        ( browser.ie ? (
        ' onmouseenter="$$.Stateful_onMouseEnter(event, this);"' +
        ' onmouseleave="$$.Stateful_onMouseLeave(event, this);"' )
        : (
        ' onmouseover="$$.Stateful_onMouseOver(event, this);"' +
        ' onmouseout="$$.Stateful_onMouseOut(event, this);"' ));
    
    baidu.editor.ui.Stateful = {
        alwalysHoverable: false,
        Stateful_init: function (){
            this._Stateful_dGetHtmlTpl = this.getHtmlTpl;
            this.getHtmlTpl = this.Stateful_getHtmlTpl;
        },
        Stateful_getHtmlTpl: function (){
            var tpl = this._Stateful_dGetHtmlTpl();
            // 使用function避免$转义
            return tpl.replace(/stateful/g, function (){ return TPL_STATEFUL; });
        },
        Stateful_onMouseEnter: function (evt, el){
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.addState('hover');
                this.fireEvent('over');
            }
        },
        Stateful_onMouseLeave: function (evt, el){
            if (!this.isDisabled() || this.alwalysHoverable) {
                this.removeState('hover');
                this.removeState('active');
                this.fireEvent('out');
            }
        },
        Stateful_onMouseOver: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseEnter(evt, el);
            }
        },
        Stateful_onMouseOut: function (evt, el){
            var rel = evt.relatedTarget;
            if (!uiUtils.contains(el, rel) && el !== rel) {
                this.Stateful_onMouseLeave(evt, el);
            }
        },
        Stateful_onMouseDown: function (evt, el){
            if (!this.isDisabled()) {
                this.addState('active');
            }
        },
        Stateful_onMouseUp: function (evt, el){
            if (!this.isDisabled()) {
                this.removeState('active');
            }
        },
        Stateful_postRender: function (){
            if (this.disabled && !this.hasState('disabled')) {
                this.addState('disabled');
            }
        },
        hasState: function (state){
            return domUtils.hasClass(this.getStateDom(), 'edui-state-' + state);
        },
        addState: function (state){
            if (!this.hasState(state)) {
                this.getStateDom().className += ' edui-state-' + state;
            }
        },
        removeState: function (state){
            if (this.hasState(state)) {
                domUtils.removeClasses(this.getStateDom(), ['edui-state-' + state]);
            }
        },
        getStateDom: function (){
            return this.getDom('state');
        },
        isChecked: function (){
            return this.hasState('checked');
        },
        setChecked: function (checked){
            if (!this.isDisabled() && checked) {
                this.addState('checked');
            } else {
                this.removeState('checked');
            }
        },
        isDisabled: function (){
            return this.hasState('disabled');
        },
        setDisabled: function (disabled){
            if (disabled) {
                this.removeState('hover');
                this.removeState('checked');
                this.removeState('active');
                this.addState('disabled');
            } else {
                this.removeState('disabled');
            }
        }
    };
})();

///import core
///import uicore
///import ui/stateful.js
(function (){
    var utils = baidu.editor.utils,
        UIBase = baidu.editor.ui.UIBase,
        Stateful = baidu.editor.ui.Stateful,
        Button = baidu.editor.ui.Button = function (options){
            this.initOptions(options);
            this.initButton();
        };
    Button.prototype = {
        uiName: 'button',
        label: '',
        title: '',
        showIcon: true,
        showText: true,
        initButton: function (){
            this.initUIBase();
            this.Stateful_init();
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%">' +
                '<div id="##_state" stateful>' +
                 '<div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') +
                 ' class="%%-body" onmousedown="return false;" onclick="return $$._onClick();">' +
                  (this.showIcon ? '<div class="edui-box edui-icon"></div>' : '') +
                  (this.showText ? '<div class="edui-box edui-label">' + this.label + '</div>' : '') +
                 '</div>' +
                '</div>' +
                '</div></div>';
        },
        postRender: function (){
            this.Stateful_postRender();
        },
        _onClick: function (){
            if (!this.isDisabled()) {
                this.fireEvent('click');
            }
        }
    };
    utils.inherits(Button, UIBase);
    utils.extend(Button.prototype, Stateful);

})();

///import core
///import uicore
///import ui/stateful.js
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        domUtils = baidu.editor.dom.domUtils,
        UIBase = baidu.editor.ui.UIBase,
        Stateful = baidu.editor.ui.Stateful,
        SplitButton = baidu.editor.ui.SplitButton = function (options){
            this.initOptions(options);
            this.initSplitButton();
        };
    SplitButton.prototype = {
        popup: null,
        uiName: 'splitbutton',
        title: '',
        initSplitButton: function (){
            this.initUIBase();
            this.Stateful_init();
            var me = this;
            if (this.popup != null) {
                var popup = this.popup;
                this.popup = null;
                this.setPopup(popup);
            }
        },
        _UIBase_postRender: UIBase.prototype.postRender,
        postRender: function (){
            this.Stateful_postRender();
            this._UIBase_postRender();
        },
        setPopup: function (popup){
            if (this.popup === popup) return;
            if (this.popup != null) {
                this.popup.dispose();
            }
            popup.addListener('show', utils.bind(this._onPopupShow, this));
            popup.addListener('hide', utils.bind(this._onPopupHide, this));
            popup.addListener('postrender', utils.bind(function (){
                popup.getDom('body').appendChild(
                    uiUtils.createElementByHtml('<div id="' +
                        this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' +
                        (uiUtils.getClientRect(this.getDom()).width - 2) + 'px"></div>')
                    );
                popup.getDom().className += ' ' + this.className;
            }, this));
            this.popup = popup;
        },
        _onPopupShow: function (){
            this.addState('opened');
        },
        _onPopupHide: function (){
            this.removeState('opened');
        },
        getHtmlTpl: function (){
            return '<div id="##" class="edui-box %%">' +
                '<div '+ (this.title ? 'title="' + this.title + '"' : '') +' id="##_state" stateful><div class="%%-body">' +
                '<div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);">' +
                '<div class="edui-box edui-icon"></div>' +
                '</div>' +
                '<div class="edui-box edui-splitborder"></div>' +
                '<div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div>' +
                '</div></div></div>';
        },
        showPopup: function (){
            // 当popup往上弹出的时候，做特殊处理
            var rect = uiUtils.getClientRect(this.getDom());
            rect.top -= this.popup.SHADOW_RADIUS;
            rect.height += this.popup.SHADOW_RADIUS;
            this.popup.showAnchorRect(rect);
        },
        _onArrowClick: function (event, el){
            if (!this.isDisabled()) {
                this.showPopup();
            }
        },
        _onButtonClick: function (){
            if (!this.isDisabled()) {
                this.fireEvent('buttonclick');
            }
        }
    };
    utils.inherits(SplitButton, UIBase);
    utils.extend(SplitButton.prototype, Stateful, true);

})();

///import core
///import uicore
///import ui/colorpicker.js
///import ui/popup.js
///import ui/splitbutton.js
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        ColorPicker = baidu.editor.ui.ColorPicker,
        Popup = baidu.editor.ui.Popup,
        SplitButton = baidu.editor.ui.SplitButton,
        ColorButton = baidu.editor.ui.ColorButton = function (options){
            this.initOptions(options);
            this.initColorButton();
        };
    ColorButton.prototype = {
        initColorButton: function (){
            var me = this;
            this.popup = new Popup({
                content: new ColorPicker({
                    noColorText: '清除颜色',
                    onpickcolor: function (t, color){
                        me._onPickColor(color);
                    },
                    onpicknocolor: function (t, color){
                        me._onPickNoColor(color);
                    }
                })
            });
            this.initSplitButton();
        },
        _SplitButton_postRender: SplitButton.prototype.postRender,
        postRender: function (){
            this._SplitButton_postRender();
            this.getDom('button_body').appendChild(
                uiUtils.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')
                );
            this.getDom().className += ' edui-colorbutton';
        },
        setColor: function (color){
            this.getDom('colorlump').style.backgroundColor = color;
            this.color = color;
        },
        _onPickColor: function (color){
            if (this.fireEvent('pickcolor', color) !== false) {
                this.setColor(color);
                this.popup.hide();
            }
        },
        _onPickNoColor: function (color){
            if (this.fireEvent('picknocolor') !== false) {
                this.popup.hide();
            }
        }
    };
    utils.inherits(ColorButton, SplitButton);

})();

///import core
///import uicore
///import ui/popup.js
///import ui/tablepicker.js
///import ui/splitbutton.js
(function (){
    var utils = baidu.editor.utils,
        Popup = baidu.editor.ui.Popup,
        TablePicker = baidu.editor.ui.TablePicker,
        SplitButton = baidu.editor.ui.SplitButton,
        TableButton = baidu.editor.ui.TableButton = function (options){
            this.initOptions(options);
            this.initTableButton();
        };
    TableButton.prototype = {
        initTableButton: function (){
            var me = this;
            this.popup = new Popup({
                content: new TablePicker({
                    onpicktable: function (t, numCols, numRows){
                        me._onPickTable(numCols, numRows);
                    },
                    onmore: function (){
                        me.popup.hide();
                        me.fireEvent('more');
                    }
                })
            });
            this.initSplitButton();
        },
        _onPickTable: function (numCols, numRows){
            if (this.fireEvent('picktable', numCols, numRows) !== false) {
                this.popup.hide();
            }
        }
    };
    utils.inherits(TableButton, SplitButton);

})();

(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Toolbar = baidu.editor.ui.Toolbar = function (options){
            this.initOptions(options);
            this.initToolbar();
        };
    Toolbar.prototype = {
        items: null,
        initToolbar: function (){
            this.items = this.items || [];
            this.initUIBase();
        },
        add: function (item){
            this.items.push(item);
        },
        getHtmlTpl: function (){
            var buff = [];
            for (var i=0; i<this.items.length; i++) {
                buff[i] = this.items[i].renderHtml();
            }
            return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' +
                buff.join('') +
                '</div>'
        },
        postRender: function (){
            var box = this.getDom();
            for (var i=0; i<this.items.length; i++) {
                this.items[i].postRender();
            }
            uiUtils.makeUnselectable(box);
        },
        _onMouseDown: function (){
            return false;
        }
    };
    utils.inherits(Toolbar, UIBase);

})();

///import core
///import uicore
///import ui\popup.js
///import ui\stateful.js
(function (){
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Popup = baidu.editor.ui.Popup,
        Stateful = baidu.editor.ui.Stateful,
        Menu = baidu.editor.ui.Menu = function (options){
            this.initOptions(options);
            this.initMenu();
        };

    var menuSeparator = {
        renderHtml: function (){
            return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>';
        },
        postRender: function (){},
        queryAutoHide: function (){ return true; }
    };
    Menu.prototype = {
        items: null,
        uiName: 'menu',
        initMenu: function (){
            this.items = this.items || [];
            this.initPopup();
            this.initItems();
        },
        initItems: function (){
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                if (item == '-') {
                    this.items[i] = this.getSeparator();
                } else if (!(item instanceof MenuItem)) {
                    this.items[i] = this.createItem(item);
                }
            }
        },
        getSeparator: function (){
            return menuSeparator;
        },
        createItem: function (item){
            return new MenuItem(item);
        },
        _Popup_getContentHtmlTpl: Popup.prototype.getContentHtmlTpl,
        getContentHtmlTpl: function (){
            if (this.items.length == 0) {
                return this._Popup_getContentHtmlTpl();
            }
            var buff = [];
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                buff[i] = item.renderHtml();
            }
            return ('<div class="%%-body">' + buff.join('') + '</div>');
        },
        _Popup_postRender: Popup.prototype.postRender,
        postRender: function (){
            var me = this;
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                item.ownerMenu = this;
                item.postRender();
            }
            domUtils.on(this.getDom(), 'mouseover', function (evt){
                evt = evt || event;
                var rel = evt.relatedTarget || evt.fromElement;
                var el = me.getDom();
                if (!uiUtils.contains(el, rel) && el !== rel) {
                    me.fireEvent('over');
                }
            });
            this._Popup_postRender();
        },
        queryAutoHide: function (el){
            if (el) {
                if (uiUtils.contains(this.getDom(), el)) {
                    return false;
                }
                for (var i=0; i<this.items.length; i++) {
                    var item = this.items[i];
                    if (item.queryAutoHide(el) === false) {
                        return false;
                    }
                }
            }
        },
        clearItems: function (){
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                clearTimeout(item._showingTimer);
                clearTimeout(item._closingTimer);
                if (item.subMenu) {
                    item.subMenu.destroy();
                }
            }
            this.items = [];
        },
        destroy: function (){
            if (this.getDom()) {
                domUtils.remove(this.getDom());
            }
            this.clearItems();
        },
        dispose: function (){
            this.destroy();
        }
    };
    utils.inherits(Menu, Popup);
    
    var MenuItem = baidu.editor.ui.MenuItem = function (options){
        this.initOptions(options);
        this.initUIBase();
        this.Stateful_init();
        if (this.subMenu && !(this.subMenu instanceof Menu)) {
            this.subMenu = new Menu(this.subMenu);
        }
    };
    MenuItem.prototype = {
        label: '',
        subMenu: null,
        ownerMenu: null,
        uiName: 'menuitem',
        alwalysHoverable: true,
        getHtmlTpl: function (){
            return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);">' +
                '<div class="%%-body">' +
                this.renderLabelHtml() +
                '</div>' +
                '</div>';
        },
        postRender: function (){
            var me = this;
            this.addListener('over', function (){
                me.ownerMenu.fireEvent('submenuover', me);
                if (me.subMenu) {
                    me.delayShowSubMenu();
                }
            });
            if (this.subMenu) {
                this.getDom().className += ' edui-hassubmenu';
                this.subMenu.render();
                this.addListener('out', function (){
                    me.delayHideSubMenu();
                });
                this.subMenu.addListener('over', function (){
                    clearTimeout(me._closingTimer);
                    me._closingTimer = null;
                    me.addState('opened');
                });
                this.ownerMenu.addListener('hide', function (){
                    me.hideSubMenu();
                });
                this.ownerMenu.addListener('submenuover', function (t, subMenu){
                    if (subMenu !== me) {
                        me.delayHideSubMenu();
                    }
                });
                this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide;
                this.subMenu.queryAutoHide = function (el){
                    if (el && uiUtils.contains(me.getDom(), el)) {
                        return false;
                    }
                    return this._bakQueryAutoHide(el);
                };
            }
            this.getDom().style.tabIndex = '-1';
            uiUtils.makeUnselectable(this.getDom());
            this.Stateful_postRender();
        },
        delayShowSubMenu: function (){
            var me = this;
            if (!me.isDisabled()) {
                me.addState('opened');
                clearTimeout(me._showingTimer);
                clearTimeout(me._closingTimer);
                me._closingTimer = null;
                me._showingTimer = setTimeout(function (){
                    me.showSubMenu();
                }, 250);
            }
        },
        delayHideSubMenu: function (){
            var me = this;
            if (!me.isDisabled()) {
                me.removeState('opened');
                clearTimeout(me._showingTimer);
                if (!me._closingTimer) {
                    me._closingTimer = setTimeout(function (){
                        if (!me.hasState('opened')) {
                            me.hideSubMenu();
                        }
                        me._closingTimer = null;
                    }, 400);
                }
            }
        },
        renderLabelHtml: function (){
            return '<div class="edui-arrow"></div>' +
                '<div class="edui-box edui-icon"></div>' +
                '<div class="edui-box edui-label %%-label">' + (this.label || '') + '</div>';
        },
        getStateDom: function (){
            return this.getDom();
        },
        queryAutoHide: function (el){
            if (this.subMenu && this.hasState('opened')) {
                return this.subMenu.queryAutoHide(el);
            }
        },
        _onClick: function (event, this_){
            if (this.hasState('disabled')) return;
            if (this.fireEvent('click', event, this_) !== false) {
                if (this.subMenu) {
                    this.showSubMenu();
                } else {
                    Popup.postHide();
                }
            }
        },
        showSubMenu: function (){
            var rect = uiUtils.getClientRect(this.getDom());
            rect.right -= 5;
            rect.left += 2;
            rect.width -= 7;
            rect.top -= 4;
            rect.bottom += 4;
            rect.height += 8;
            this.subMenu.showAnchorRect(rect, true, true);
        },
        hideSubMenu: function (){
            this.subMenu.hide();
        }
    };
    utils.inherits(MenuItem, UIBase);
    utils.extend(MenuItem.prototype, Stateful, true);
})();

///import core
///import uicore
///import ui/menu.js
///import ui/splitbutton.js
(function (){
    // todo: menu和item提成通用list
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        Menu = baidu.editor.ui.Menu,
        SplitButton = baidu.editor.ui.SplitButton,
        Combox = baidu.editor.ui.Combox = function (options){
            this.initOptions(options);
            this.initCombox();
        };
    Combox.prototype = {
        uiName: 'combox',
        initCombox: function (){
            var me = this;
            this.items = this.items || [];
            for (var i=0; i<this.items.length; i++) {
                var item = this.items[i];
                item.uiName = 'listitem';
                item.index = i;
                item.onclick = function (){
                    me.selectByIndex(this.index);
                };
            }
            this.popup = new Menu({
                items: this.items,
                uiName: 'list'
            });
            this.initSplitButton();
        },
        _SplitButton_postRender: SplitButton.prototype.postRender,
        postRender: function (){
            this._SplitButton_postRender();
            this.setLabel(this.label || '');
        },
        showPopup: function (){
            var rect = uiUtils.getClientRect(this.getDom());
            rect.top += 1;
            rect.bottom -= 1;
            rect.height -= 2;
            this.popup.showAnchorRect(rect);
        },
        getValue: function (){
            return this.value;
        },
        setValue: function (value){
            var index = this.indexByValue(value);
            if (index != -1) {
                this.selectedIndex = index;
                this.setLabel(this.items[index].label);
                this.value = this.items[index].value;
            } else {
                this.selectedIndex = -1;
                this.setLabel(this.getLabelForUnknowValue(value));
                this.value = value;
            }
        },
        setLabel: function (label){
            this.getDom('button_body').innerHTML = label;
            this.label = label;
        },
        getLabelForUnknowValue: function (value){
            return value;
        },
        indexByValue: function (value){
            for (var i=0; i<this.items.length; i++) {
                if (value == this.items[i].value) {
                    return i;
                }
            }
            return -1;
        },
        getItem: function (index){
            return this.items[index];
        },
        selectByIndex: function (index){
            if (index < this.items.length && this.fireEvent('select', index) !== false) {
                this.selectedIndex = index;
                this.value = this.items[index].value;
                this.setLabel(this.items[index].label);
            }
        }
    };
    utils.inherits(Combox, SplitButton);
})();

///import core
///import uicore
///import ui/mask.js
///import ui/button.js
(function (){
    var utils = baidu.editor.utils,
        domUtils = baidu.editor.dom.domUtils,
        uiUtils = baidu.editor.ui.uiUtils,
        Mask = baidu.editor.ui.Mask,
        UIBase = baidu.editor.ui.UIBase,
        Button = baidu.editor.ui.Button,
        Dialog = baidu.editor.ui.Dialog = function (options){
            this.initOptions(options);
            this.initDialog();
        };
    var modalMask;
    var dragMask;
    Dialog.prototype = {
        draggable: false,
        uiName: 'dialog',
        initDialog: function (){
            var me = this;
            this.initUIBase();
            this.modalMask = (modalMask || (modalMask = new Mask({
                className: 'edui-dialog-modalmask'
            })));
            this.dragMask = (dragMask || (dragMask = new Mask({
                className: 'edui-dialog-dragmask'
            })));
            this.closeButton = new Button({
                className: 'edui-dialog-closebutton',
                title: '关闭对话框',
                onclick: function (){
                    me.close(false);
                }
            });
            if (this.buttons) {
                for (var i=0; i<this.buttons.length; i++) {
                    if (!(this.buttons[i] instanceof Button)) {
                        this.buttons[i] = new Button(this.buttons[i]);
                    }
                }
            }
        },
        fitSize: function (){
            var popBodyEl = this.getDom('body');
//            if (!(baidu.editor.browser.ie && baidu.editor.browser.version == 7)) {
//                uiUtils.removeStyle(popBodyEl, 'width');
//                uiUtils.removeStyle(popBodyEl, 'height');
//            }
            var size = this.mesureSize();
            popBodyEl.style.width = size.width + 'px';
            popBodyEl.style.height = size.height + 'px';
            return size;
        },
        safeSetOffset: function (offset){
            var me = this;
            var el = me.getDom();
            var vpRect = uiUtils.getViewportRect();
            var rect = uiUtils.getClientRect(el);
            var left = offset.left;
            if (left + rect.width > vpRect.right) {
                left = vpRect.right - rect.width;
            }
            var top = offset.top;
            if (top + rect.height > vpRect.bottom) {
                top = vpRect.bottom - rect.height;
            }
            el.style.left = Math.max(left, 0) + 'px';
            el.style.top = Math.max(top, 0) + 'px';
        },
        showAtCenter: function (){
            this.getDom().style.display = '';
            var vpRect = uiUtils.getViewportRect();
            var popSize = this.fitSize();
            var titleHeight = this.getDom('titlebar').offsetHeight | 0;
            var left = vpRect.width / 2 - popSize.width / 2;
            var top = vpRect.height / 2 - (popSize.height - titleHeight) / 2 - titleHeight;
            var popEl = this.getDom();
            this.safeSetOffset({
                left: Math.max(left | 0, 0),
                top: Math.max(top | 0, 0)
            });
            if (!domUtils.hasClass(popEl, 'edui-state-centered')) {
                popEl.className += ' edui-state-centered';
            }
            this._show();
        },
        getContentHtml: function (){
            var contentHtml = '';
            if (typeof this.content == 'string') {
                contentHtml = this.content;
            } else if (this.iframeUrl) {
                contentHtml = '<iframe id="'+ this.id +
                    '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="'+ this.iframeUrl +'"></iframe>';
            }
            return contentHtml;
        },
        getHtmlTpl: function (){
            var footHtml = '';
            if (this.buttons) {
                var buff = [];
                for (var i=0; i<this.buttons.length; i++) {
                    buff[i] = this.buttons[i].renderHtml();
                }
                footHtml = '<div class="%%-foot">' +
                     '<div id="##_buttons" class="%%-buttons">' + buff.join('') + '</div>' +
                    '</div>';
            }
            return '<div id="##" class="%%"><div class="%%-wrap"><div id="##_body" class="%%-body">' +
                '<div class="%%-shadow"></div>' +
                '<div id="##_titlebar" class="%%-titlebar">' +
                '<div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);">' +
                 '<span class="%%-caption">' + (this.title || '') + '</span>' +
                '</div>' +
                this.closeButton.renderHtml() +
                '</div>' +
                '<div id="##_content" class="%%-content">'+ ( this.autoReset ? '' : this.getContentHtml()) +'</div>' +
                footHtml +
                '</div></div></div>';
        },
        postRender: function (){
            // todo: 保持居中/记住上次关闭位置选项
            if (!this.modalMask.getDom()) {
                this.modalMask.render();
                this.modalMask.hide();
            }
            if (!this.dragMask.getDom()) {
                this.dragMask.render();
                this.dragMask.hide();
            }
            var me = this;
            this.addListener('show', function (){
                me.modalMask.show();
            });
            this.addListener('hide', function (){
                me.modalMask.hide();
            });
            if (this.buttons) {
                for (var i=0; i<this.buttons.length; i++) {
                    this.buttons[i].postRender();
                }
            }
            domUtils.on(window, 'resize', function (){
                setTimeout(function (){
                    if (!me.isHidden()) {
                        me.safeSetOffset(uiUtils.getClientRect(me.getDom()));
                    }
                });
            });
            this._hide();
        },
        mesureSize: function (){
            var body = this.getDom('body');
            var width = uiUtils.getClientRect(this.getDom('content')).width;
            var dialogBodyStyle = body.style;
            dialogBodyStyle.width = width;
            return uiUtils.getClientRect(body);
        },
        _onTitlebarMouseDown: function (evt, el){
            if (this.draggable) {
                var rect;
                var vpRect = uiUtils.getViewportRect();
                var me = this;
                uiUtils.startDrag(evt, {
                    ondragstart: function (){
                        rect = uiUtils.getClientRect(me.getDom());
                        me.dragMask.show();
                    },
                    ondragmove: function (x, y){
                        var left = rect.left + x;
                        var top = rect.top + y;
                        me.safeSetOffset({
                            left: left,
                            top: top
                        });
                    },
                    ondragstop: function (){
                        domUtils.removeClasses(me.getDom(), ['edui-state-centered']);
                        me.dragMask.hide();
                    }
                });
            }
        },
        reset: function (){
            this.getDom('content').innerHTML = this.getContentHtml();
        },
        _show: function (){
            if (this._hidden) {
                this.getDom().style.display = '';
                this._hidden = false;
                this.fireEvent('show');
            }
        },
        isHidden: function (){
            return this._hidden;
        },
        _hide: function (){
            if (!this._hidden) {
                this.getDom().style.display = 'none';
                this._hidden = true;
                this.fireEvent('hide');
            }
        },
        open: function (){
            if (this.autoReset) {
                this.reset();
            }
            this.showAtCenter();
            if (this.iframeUrl) {
                try {
                    this.getDom('iframe').focus();
                } catch(ex){}
            }
        },
        _onCloseButtonClick: function (evt, el){
            this.close(false);
        },
        close: function (ok){
            if (this.fireEvent('close', ok) !== false) {
                this._hide();
            }
        }
    };
    utils.inherits(Dialog, UIBase);
})();

///import core
///import uicore
///import ui/menu.js
///import ui/splitbutton.js
(function (){
    var utils = baidu.editor.utils,
        Menu = baidu.editor.ui.Menu,
        SplitButton = baidu.editor.ui.SplitButton,
        MenuButton = baidu.editor.ui.MenuButton = function (options){
            this.initOptions(options);
            this.initMenuButton();
        };
    MenuButton.prototype = {
        initMenuButton: function (){
            var me = this;
            this.uiName = "menubutton";
            this.popup = new Menu({
                items: me.items,
                className: me.className
            });
            this.popup.addListener('show', function (){
                var list = this;
                for (var i=0; i<list.items.length; i++) {
                    list.items[i].removeState('checked');
                    if (list.items[i].value == me._value) {
                        list.items[i].addState('checked');
                        this.value = me._value;
                    }
                }
            });
            this.initSplitButton();
        },
        setValue : function(value){
            this._value = value;
        }
        
    };
    utils.inherits(MenuButton, SplitButton);
})();
(function (){
    var utils = baidu.editor.utils;
    var Popup = baidu.editor.ui.Popup;
    var SplitButton = baidu.editor.ui.SplitButton;

    var TCalendar;
    var Tformat;

    (function (){
        var T,baidu=T=baidu||{version:"1.3.9"};baidu.guid="$BAIDU$";window[baidu.guid]=window[baidu.guid]||{};baidu.ui=baidu.ui||{version:"1.3.9"};baidu.ui.getUI=function(c){var c=c.split("-"),b=baidu.ui,a=c.length,d=0;for(;d<a;d++){b=b[c[d].charAt(0).toUpperCase()+c[d].slice(1)]}return b};baidu.lang=baidu.lang||{};baidu.lang.isString=function(a){return"[object String]"==Object.prototype.toString.call(a)};baidu.isString=baidu.lang.isString;baidu.ui.create=function(b,a){if(baidu.lang.isString(b)){b=baidu.ui.getUI(b)}return new b(a)};baidu.dom=baidu.dom||{};baidu.dom.g=function(a){if("string"==typeof a||a instanceof String){return document.getElementById(a)}else{if(a&&a.nodeName&&(a.nodeType==1||a.nodeType==9)){return a}}return null};baidu.g=baidu.G=baidu.dom.g;(function(){var a=window[baidu.guid];baidu.lang.guid=function(){return"TANGRAM__"+(a._counter++).toString(36)};a._counter=a._counter||1})();window[baidu.guid]._instances=window[baidu.guid]._instances||{};baidu.lang.isFunction=function(a){return"[object Function]"==Object.prototype.toString.call(a)};baidu.lang.Class=function(a){this.guid=a||baidu.lang.guid();window[baidu.guid]._instances[this.guid]=this};window[baidu.guid]._instances=window[baidu.guid]._instances||{};baidu.lang.Class.prototype.dispose=function(){delete window[baidu.guid]._instances[this.guid];for(var a in this){if(!baidu.lang.isFunction(this[a])){delete this[a]}}this.disposed=true};baidu.lang.Class.prototype.toString=function(){return"[object "+(this._className||"Object")+"]"};baidu.lang.Event=function(a,b){this.type=a;this.returnValue=true;this.target=b||null;this.currentTarget=null};baidu.lang.Class.prototype.addEventListener=function(d,c,b){if(!baidu.lang.isFunction(c)){return}!this.__listeners&&(this.__listeners={});var a=this.__listeners,e;if(typeof b=="string"&&b){if(/[^\w\-]/.test(b)){throw ("nonstandard key:"+b)}else{c.hashCode=b;e=b}}d.indexOf("on")!=0&&(d="on"+d);typeof a[d]!="object"&&(a[d]={});e=e||baidu.lang.guid();c.hashCode=e;a[d][e]=c};baidu.lang.Class.prototype.removeEventListener=function(d,c){if(typeof c!="undefined"){if((baidu.lang.isFunction(c)&&!(c=c.hashCode))||(!baidu.lang.isString(c))){return}}!this.__listeners&&(this.__listeners={});d.indexOf("on")!=0&&(d="on"+d);var b=this.__listeners;if(!b[d]){return}if(typeof c!="undefined"){b[d][c]&&delete b[d][c]}else{for(var a in b[d]){delete b[d][a]}}};baidu.lang.Class.prototype.dispatchEvent=function(d,a){if(baidu.lang.isString(d)){d=new baidu.lang.Event(d)}!this.__listeners&&(this.__listeners={});a=a||{};for(var c in a){d[c]=a[c]}var c,b=this.__listeners,e=d.type;d.target=d.target||this;d.currentTarget=this;e.indexOf("on")!=0&&(e="on"+e);baidu.lang.isFunction(this[e])&&this[e].apply(this,arguments);if(typeof b[e]=="object"){for(c in b[e]){b[e][c].apply(this,arguments)}}return d.returnValue};baidu.event=baidu.event||{};baidu.event._listeners=baidu.event._listeners||[];baidu.dom._g=function(a){if(baidu.lang.isString(a)){return document.getElementById(a)}return a};baidu._g=baidu.dom._g;baidu.event.on=function(b,e,g){e=e.replace(/^on/i,"");b=baidu.dom._g(b);var f=function(i){g.call(b,i)},a=baidu.event._listeners,d=baidu.event._eventFilter,h,c=e;e=e.toLowerCase();if(d&&d[e]){h=d[e](b,e,f);c=h.type;f=h.listener}if(b.addEventListener){b.addEventListener(c,f,false)}else{if(b.attachEvent){b.attachEvent("on"+c,f)}}a[a.length]=[b,e,g,f,c];return b};baidu.on=baidu.event.on;baidu.event.un=function(c,f,b){c=baidu.dom._g(c);f=f.replace(/^on/i,"").toLowerCase();var i=baidu.event._listeners,d=i.length,e=!b,h,g,a;while(d--){h=i[d];if(h[1]===f&&h[0]===c&&(e||h[2]===b)){g=h[4];a=h[3];if(c.removeEventListener){c.removeEventListener(g,a,false)}else{if(c.detachEvent){c.detachEvent("on"+g,a)}}i.splice(d,1)}}return c};baidu.un=baidu.event.un;baidu.ui.Base={id:"",getId:function(a){var c=this,b;b="tangram-"+c.uiType+"--"+(c.id?c.id:c.guid);return a?b+"-"+a:b},getClass:function(b){var d=this,c=d.classPrefix,a=d.skin;if(b){c+="-"+b;a+="-"+b}if(d.skin){c+=" "+a}return c},getMain:function(){return baidu.g(this.mainId)},getBody:function(){return baidu.g(this.getId())},uiType:"",getCallRef:function(){return"window['$BAIDU$']._instances['"+this.guid+"']"},getCallString:function(d){var c=0,b=Array.prototype.slice.call(arguments,1),a=b.length;for(;c<a;c++){if(typeof b[c]=="string"){b[c]="'"+b[c]+"'"}}return this.getCallRef()+"."+d+"("+b.join(",")+");"},on:function(a,b,c){baidu.on(a,b,c);this.addEventListener("ondispose",function(){baidu.un(a,b,c)})},renderMain:function(b){var d=this,c=0,a;if(d.getMain()){return}b=baidu.g(b);if(!b){b=document.createElement("div");document.body.appendChild(b);b.style.position="absolute";b.className=d.getClass("main")}if(!b.id){b.id=d.getId("main")}d.mainId=b.id;b.setAttribute("data-guid",d.guid);return b},dispose:function(){this.dispatchEvent("dispose");baidu.lang.Class.prototype.dispose.call(this)}};baidu.object=baidu.object||{};baidu.extend=baidu.object.extend=function(c,a){for(var b in a){if(a.hasOwnProperty(b)){c[b]=a[b]}}return c};baidu.ui.createUI=function(c,j){j=j||{};var g=j.superClass||baidu.lang.Class,f=g==baidu.lang.Class?1:0,d,b,h=function(k,i){var l=this;k=k||{};g.call(l,!f?k:(k.guid||""),true);baidu.object.extend(l,h.options);baidu.object.extend(l,k);l.classPrefix=l.classPrefix||"tangram-"+l.uiType.toLowerCase();for(d in baidu.ui.behavior){if(typeof l[d]!="undefined"&&l[d]){baidu.object.extend(l,baidu.ui.behavior[d]);if(baidu.lang.isFunction(l[d])){l.addEventListener("onload",function(){baidu.ui.behavior[d].call(l[d].apply(l))})}else{baidu.ui.behavior[d].call(l)}}}c.apply(l,arguments);for(d=0,b=h._addons.length;d<b;d++){h._addons[d](l)}if(k.parent&&l.setParent){l.setParent(k.parent)}if(!i&&k.autoRender){l.render(k.element)}},a=function(){};a.prototype=g.prototype;var e=h.prototype=new a();for(d in baidu.ui.Base){e[d]=baidu.ui.Base[d]}h.extend=function(i){for(d in i){h.prototype[d]=i[d]}return h};h._addons=[];h.register=function(i){if(typeof i=="function"){h._addons.push(i)}};h.options={};return h};baidu.ui.behavior=baidu.ui.behavior||{};baidu.string=baidu.string||{};(function(){var a=new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g");baidu.string.trim=function(b){return String(b).replace(a,"")}})();baidu.trim=baidu.string.trim;baidu.dom.addClass=function(f,g){f=baidu.dom.g(f);var b=g.split(/\s+/),a=f.className,e=" "+a+" ",d=0,c=b.length;for(;d<c;d++){if(e.indexOf(" "+b[d]+" ")<0){a+=(a?" ":"")+b[d]}}f.className=a;return f};baidu.addClass=baidu.dom.addClass;baidu.dom.removeClass=function(f,g){f=baidu.dom.g(f);var d=f.className.split(/\s+/),h=g.split(/\s+/),b,a=h.length,c,e=0;for(;e<a;++e){for(c=0,b=d.length;c<b;++c){if(d[c]==h[e]){d.splice(c,1);break}}}f.className=d.join(" ");return f};baidu.removeClass=baidu.dom.removeClass;baidu.dom.hasClass=function(c,d){c=baidu.dom.g(c);var b=baidu.string.trim(d).split(/\s+/),a=b.length;d=c.className.split(/\s+/).join(" ");while(a--){if(!(new RegExp("(^| )"+b[a]+"( |\x24)")).test(d)){return false}}return true};baidu.event.getTarget=function(a){return a.target||a.srcElement};baidu.array=baidu.array||{};baidu.each=baidu.array.forEach=baidu.array.each=function(g,e,b){var d,f,c,a=g.length;if("function"==typeof e){for(c=0;c<a;c++){f=g[c];d=e.call(b||g,f,c);if(d===false){break}}}return g};baidu.object.each=function(e,c){var b,a,d;if("function"==typeof c){for(a in e){if(e.hasOwnProperty(a)){d=e[a];b=c.call(e,d,a);if(b===false){break}}}}return e};baidu.fn=baidu.fn||{};baidu.fn.bind=function(b,a){var c=arguments.length>2?[].slice.call(arguments,2):null;return function(){var e=baidu.lang.isString(b)?a[b]:b,d=(c)?c.concat([].slice.call(arguments,0)):arguments;return e.apply(a||e,d)}};baidu.lang.Class.prototype.addEventListeners=function(c,d){if(typeof d=="undefined"){for(var b in c){this.addEventListener(b,c[b])}}else{c=c.split(",");var b=0,a=c.length,e;for(;b<a;b++){this.addEventListener(baidu.trim(c[b]),d)}}};(function(){var a=baidu.ui.behavior.statable=function(){var b=this;b.addEventListeners("ondisable,onenable",function(e,c){var d,f;c=c||{};elementId=(c.element||b.getMain()).id;f=c.group;if(e.type=="ondisable"&&!b.getState(elementId,f)["disabled"]){b.removeState("press",elementId,f);b.removeState("hover",elementId,f);b.setState("disabled",elementId,f)}else{if(e.type=="onenable"&&b.getState(elementId,f)["disabled"]){b.removeState("disabled",elementId,f)}}})};a._states={};a._allStates=["hover","press","disabled"];a._allEventsName=["mouseover","mouseout","mousedown","mouseup"];a._eventsHandler={mouseover:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.setState("hover",d,c);return true}},mouseout:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.removeState("hover",d,c);b.removeState("press",d,c);return true}},mousedown:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.setState("press",d,c);return true}},mouseup:function(d,c){var b=this;if(!b.getState(d,c)["disabled"]){b.removeState("press",d,c);return true}}};a._getStateHandlerString=function(h,f){var g=this,e=0,b=g._allEventsName.length,c=[],d;if(typeof h=="undefined"){h=f=""}for(;e<b;e++){d=g._allEventsName[e];c[e]="on"+d+'="'+g.getCallRef()+"._fireEvent('"+d+"', '"+h+"', '"+f+"', event)\""}return c.join(" ")};a._fireEvent=function(c,g,b,f){var d=this,h=d.getId(g+b);if(d._eventsHandler[c].call(d,h,g)){d.dispatchEvent(c,{element:h,group:g,key:b,DOMEvent:f})}};a.addState=function(e,b,c){var d=this;d._allStates.push(e);if(b){d._allEventsName.push(b);if(!c){c=function(){return true}}d._eventsHandler[b]=c}};a.getState=function(b,e){var d=this,c;e=e?e+"-":"";b=b?b:d.getId();c=d._states[e+b];return c?c:{}};a.setState=function(e,b,f){var d=this,g,c;f=f?f+"-":"";b=b?b:d.getId();g=f+b;d._states[g]=d._states[g]||{};c=d._states[g][e];if(!c){d._states[g][e]=1;baidu.addClass(b,d.getClass(f+e))}};a.removeState=function(d,b,e){var c=this,f;e=e?e+"-":"";b=b?b:c.getId();f=e+b;if(c._states[f]){c._states[f][d]=0;baidu.removeClass(b,c.getClass(e+d))}}})();baidu.browser=baidu.browser||{};baidu.browser.opera=/opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent)?+(RegExp["\x246"]||RegExp["\x242"]):undefined;baidu.dom.insertHTML=function(d,a,c){d=baidu.dom.g(d);var b,e;if(d.insertAdjacentHTML&&!baidu.browser.opera){d.insertAdjacentHTML(a,c)}else{b=d.ownerDocument.createRange();a=a.toUpperCase();if(a=="AFTERBEGIN"||a=="BEFOREEND"){b.selectNodeContents(d);b.collapse(a=="AFTERBEGIN")}else{e=a=="BEFOREBEGIN";b[e?"setStartBefore":"setEndAfter"](d);b.collapse(e)}b.insertNode(b.createContextualFragment(c))}return d};baidu.insertHTML=baidu.dom.insertHTML;baidu.string.format=function(c,a){c=String(c);var b=Array.prototype.slice.call(arguments,1),d=Object.prototype.toString;if(b.length){b=b.length==1?(a!==null&&(/\[object Array\]|\[object Object\]/.test(d.call(a)))?a:b):b;return c.replace(/#\{(.+?)\}/g,function(e,g){var f=b[g];if("[object Function]"==d.call(f)){f=f(g)}return("undefined"==typeof f?"":f)})}return c};baidu.format=baidu.string.format;baidu.ui.Base.setParent=function(b){var c=this,a=c._parent;a&&a.dispatchEvent("removechild");if(b.dispatchEvent("appendchild",{child:c})){c._parent=b}};baidu.ui.Base.getParent=function(){return this._parent||null};baidu.browser.ie=baidu.ie=/msie (\d+\.\d+)/i.test(navigator.userAgent)?(document.documentMode||+RegExp["\x241"]):undefined;baidu.dom.remove=function(a){a=baidu.dom._g(a);var b=a.parentNode;b&&b.removeChild(a)};baidu.ui.Button=baidu.ui.createUI(new Function).extend({uiType:"button",tplBody:'<div id="#{id}" #{statable} class="#{class}">#{content}</div>',disabled:false,statable:true,_getString:function(){var a=this;return baidu.format(a.tplBody,{id:a.getId(),statable:a._getStateHandlerString(),"class":a.getClass(),content:a.content})},render:function(c){var b=this,a;b.addState("click","click");baidu.dom.insertHTML(b.renderMain(c),"beforeEnd",b._getString());a=baidu.g(c).lastChild;if(b.title){a.title=b.title}b.disabled&&b.setState("disabled");b.dispatchEvent("onload")},isDisabled:function(){var a=this,b=a.getId();return a.getState()["disabled"]},dispose:function(){var b=this,a=b.getBody();b.dispatchEvent("dispose");baidu.each(b._allEventsName,function(d,c){a["on"+d]=null});baidu.dom.remove(a);b.dispatchEvent("ondispose");baidu.lang.Class.prototype.dispose.call(b)},disable:function(){var b=this,a=b.getBody();b.dispatchEvent("ondisable",{element:a})},enable:function(){var a=this;body=a.getBody();a.dispatchEvent("onenable",{element:body})},fire:function(a,c){var b=this,a=a.toLowerCase();if(b.getState()["disabled"]){return}b._fireEvent(a,null,null,c)},update:function(a){var b=this;baidu.extend(b,a);a.content&&(b.getBody().innerHTML=a.content);b.dispatchEvent("onupdate")}});baidu.lang.isBoolean=function(a){return typeof a==="boolean"};baidu.ui.Button.register(function(a){if(!a.poll){return}baidu.lang.isBoolean(a.poll)&&(a.poll={});a.addEventListener("mousedown",function(b){var d=0,c=a.poll.interval||100,e=a.poll.time||0;(function(){if(a.getState()["press"]){d++>e&&a.onmousedown&&a.onmousedown();a.poll.timeOut=setTimeout(arguments.callee,c)}})()});a.addEventListener("dispose",function(){if(a.poll.timeOut){a.disable();window.clearTimeout(a.poll.timeOut)}})});baidu.date=baidu.date||{};baidu.number=baidu.number||{};baidu.number.pad=function(d,c){var e="",b=(d<0),a=String(Math.abs(d));if(a.length<c){e=(new Array(c-a.length+1)).join("0")}return(b?"-":"")+e+a};baidu.date.format=function(a,f){if("string"!=typeof f){return a.toString()}function d(l,k){f=f.replace(l,k)}var b=baidu.number.pad,g=a.getFullYear(),e=a.getMonth()+1,j=a.getDate(),h=a.getHours(),c=a.getMinutes(),i=a.getSeconds();d(/yyyy/g,b(g,4));d(/yy/g,b(parseInt(g.toString().slice(2),10),2));d(/MM/g,b(e,2));d(/M/g,e);d(/dd/g,b(j,2));d(/d/g,j);d(/HH/g,b(h,2));d(/H/g,h);d(/hh/g,b(h%12,2));d(/h/g,h%12);d(/mm/g,b(c,2));d(/m/g,c);d(/ss/g,b(i,2));d(/s/g,i);return f};baidu.array.indexOf=function(e,b,d){var a=e.length,c=b;d=d|0;if(d<0){d=Math.max(0,a+d)}for(;d<a;d++){if(d in e&&e[d]===b){return d}}return -1};baidu.array.some=function(e,d,b){var c=0,a=e.length;for(;c<a;c++){if(c in e&&d.call(b||e,e[c],c)){return true}}return false};baidu.lang.isDate=function(a){return{}.toString.call(a)==="[object Date]"&&a.toString()!=="Invalid Date"&&!isNaN(a)};baidu.lang.isNumber=function(a){return"[object Number]"==Object.prototype.toString.call(a)&&isFinite(a)};baidu.i18n=baidu.i18n||{};baidu.i18n.cultures=baidu.i18n.cultures||{};baidu.i18n.cultures["zh-CN"]=baidu.object.extend(baidu.i18n.cultures["zh-CN"]||{},{calendar:{dateFormat:"yyyy-MM-dd",titleNames:"#{yyyy}年&nbsp;#{MM}月",monthNames:["一","二","三","四","五","六","七","八","九","十","十一","十二"],dayNames:{mon:"一",tue:"二",wed:"三",thu:"四",fri:"五",sat:"六",sun:"日"}},timeZone:8,whitespace:new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)","g"),number:{group:",",groupLength:3,decimal:".",positive:"",negative:"-",_format:function(b,a){return baidu.i18n.number._format(b,{group:this.group,groupLength:this.groupLength,decimal:this.decimal,symbol:a?this.negative:this.positive})}},currency:{symbol:"￥"},language:{ok:"确定",cancel:"取消",signin:"注册",signup:"登录"}});baidu.i18n.currentLocale=baidu.i18n.currentLocale||"zh-CN";baidu.i18n.date=baidu.i18n.date||{getDaysInMonth:function(a,b){var c=[31,28,31,30,31,30,31,31,30,31,30,31];if(b==1&&baidu.i18n.date.isLeapYear(a)){return 29}return c[b]},isLeapYear:function(a){return !(a%400)||(!(a%4)&&!!(a%100))},toLocaleDate:function(b,a,c){return this._basicDate(b,a,c||baidu.i18n.currentLocale)},_basicDate:function(f,c,h){var a=baidu.i18n.cultures[h||baidu.i18n.currentLocale].timeZone,g=a*60,b,d,e=f.getTime();if(c){b=baidu.i18n.cultures[c].timeZone;d=b*60}else{d=-1*f.getTimezoneOffset();b=b/60}return new Date(b!=a?(e+(g-d)*60000):e)}};baidu.ui.Calendar=baidu.ui.createUI(function(a){var b=this;b.flipContent=baidu.object.extend({prev:"&lt;",next:"&gt;"},b.flipContent);b.addEventListener("mouseup",function(c){var f=c.element,d=b._dates[f],e=baidu.dom.g(b._currElementId);e&&baidu.dom.removeClass(e,b.getClass("date-current"));b._currElementId=f;b._initDate=d;baidu.dom.addClass(baidu.dom.g(f),b.getClass("date-current"));b.dispatchEvent("clickdate",{date:d})})}).extend({uiType:"calendar",weekStart:"Sun",statable:true,language:"zh-CN",tplDOM:'<div id="#{id}" class="#{class}">#{content}</div>',tplTable:'<table border="0" cellpadding="0" cellspacing="1" class="#{class}"><thead class="#{headClass}">#{head}</thead><tbody class="#{bodyClass}">#{body}</tbody></table>',tplDateCell:'<td id="#{id}" class="#{class}" #{handler}>#{content}</td>',tplTitle:'<div id="#{id}" class="#{class}"><div id="#{labelId}" class="#{labelClass}">#{text}</div><div id="#{prevId}" class="#{prevClass}"></div><div id="#{nextId}" class="#{nextClass}"></div></div>',_initialize:function(){var a=this;function b(d){var c=[];baidu.array.each(d,function(e){c.push(baidu.lang.isDate(e)?a._toLocalDate(e):{start:a._toLocalDate(e.start),end:a._toLocalDate(e.end)})});return c}a._highlightDates=b(a.highlightDates||[]);a._disableDates=b(a.disableDates||[]);a._initDate=a._toLocalDate(a.initDate||new Date());a._currDate=new Date(a._initDate.getTime());a.weekStart=a.weekStart.toLowerCase()},_getDateJson:function(b){var f=this,a=baidu.lang.guid(),h=f._currDate,d=[],e;function g(j,i){return j.getDate()==i.getDate()&&Math.abs(j.getTime()-i.getTime())<24*60*60*1000}function c(k,i){var j=i.getTime();return baidu.array.some(k,function(l){if(baidu.lang.isDate(l)){return g(l,i)}else{return g(l.start,i)||j>l.start.getTime()&&j<=l.end.getTime()}})}b.getMonth()!=h.getMonth()&&d.push(f.getClass("date-other"));c(f._highlightDates,b)&&d.push(f.getClass("date-highlight"));if(g(f._initDate,b)){d.push(f.getClass("date-current"));f._currElementId=f.getId(a)}g(f._toLocalDate(new Date()),b)&&d.push(f.getClass("date-today"));e=c(f._disableDates,b)&&(d=[]);return{id:f.getId(a),"class":d.join("\x20"),handler:f._getStateHandlerString("",a),date:b,disabled:e}},_getMonthCount:function(c,e){var a=baidu.i18n.date.getDaysInMonth,b=[31,28,31,30,31,30,31,31,30,31,30,31],d;a&&(d=a(c,e));if(!baidu.lang.isNumber(d)){d=1==e&&(c%4)&&(c%100!=0||c%400==0)?29:b[e]}return d},_getDateTableString:function(){var o=this,f=baidu.i18n.cultures[o.language].calendar,a=["sun","mon","tue","wed","thu","fri","sat"],s=o._currDate,p=s.getFullYear(),n=s.getMonth(),q=new Date(p,n,1).getDay(),g=0,e=[],m=[],h=[],r=o._disabledIds=[],d=0,c=0,l=a.length,k,b;for(;d<l;d++){a[d]==o.weekStart&&(g=d);(g>0?e:h).push("<td>",f.dayNames[a[d]],"</td>")}e=e.concat(h);e.unshift("<tr>");e.push("</tr>");q=(q<g?q+7:q)-g;k=Math.ceil((o._getMonthCount(p,n)+q)/l);o._dates={};for(d=0;d<k;d++){m.push("<tr>");for(c=0;c<l;c++){b=o._getDateJson(new Date(p,n,d*l+c+1-q));o._dates[b.id]=b.date;b.disabled&&r.push(b.id);m.push(baidu.string.format(o.tplDateCell,{id:b.id,"class":b["class"],handler:b.handler,content:b.date.getDate()}))}m.push("</tr>")}return baidu.string.format(o.tplTable,{"class":o.getClass("table"),headClass:o.getClass("week"),bodyClass:o.getClass("date"),head:e.join(""),body:m.join("")})},getString:function(){var a=this;return baidu.string.format(a.tplDOM,{id:a.getId(),"class":a.getClass(),content:baidu.string.format(a.tplDOM,{id:a.getId("content"),"class":a.getClass("content")})})},_toLocalDate:function(a){return a?baidu.i18n.date.toLocaleDate(a,null,this.language):a},_renderDate:function(){var a=this;baidu.dom.g(a.getId("content")).innerHTML=a._getDateTableString();baidu.array.each(a._disabledIds,function(b){a.setState("disabled",b)})},_basicFlipMonth:function(e){var b=this,d=b._currDate,c=d.getMonth()+(e=="prev"?-1:1),a=d.getFullYear()+(c<0?-1:(c>11?1:0));c=c<0?12:(c>11?0:c);d.setYear(a);b.gotoMonth(c);b.dispatchEvent(e+"month",{date:new Date(d.getTime())})},renderTitle:function(){var e=this,d,c,h=e._currDate,g=baidu.i18n.cultures[e.language].calendar,f=baidu.dom.g(e.getId("label")),a=baidu.string.format(g.titleNames,{yyyy:h.getFullYear(),MM:g.monthNames[h.getMonth()],dd:h.getDate()});if(f){f.innerHTML=a;return}baidu.dom.insertHTML(e.getBody(),"afterBegin",baidu.string.format(e.tplTitle,{id:e.getId("title"),"class":e.getClass("title"),labelId:e.getId("label"),labelClass:e.getClass("label"),text:a,prevId:e.getId("prev"),prevClass:e.getClass("prev"),nextId:e.getId("next"),nextClass:e.getClass("next")}));function b(i){return{classPrefix:e.classPrefix+"-"+i+"btn",skin:e.skin?e.skin+"-"+i:"",content:e.flipContent[i],poll:{time:4},element:e.getId(i),autoRender:true,onmousedown:function(){e._basicFlipMonth(i)}}}d=new baidu.ui.Button(b("prev"));c=new baidu.ui.Button(b("next"));e.addEventListener("ondispose",function(){d.dispose();c.dispose()})},render:function(c){var a=this,b=a.skin;if(!c||a.getMain()){return}baidu.dom.insertHTML(a.renderMain(c),"beforeEnd",a.getString());a._initialize();a.renderTitle();a._renderDate();baidu.dom.g(a.getId("content")).style.height=(a.getBody().clientHeight||a.getBody().offsetHeight)-baidu.dom.g(a.getId("title")).offsetHeight+"px";a.dispatchEvent("onload")},update:function(a){var b=this;baidu.object.extend(b,a||{});b._initialize();b.renderTitle();b._renderDate();b.dispatchEvent("onupdate")},gotoDate:function(a){var b=this;b._currDate=b._toLocalDate(a);b._initDate=b._toLocalDate(a);b.renderTitle();b._renderDate();b.dispatchEvent("ongotodate")},gotoYear:function(b){var d=this,f=d._currDate,e=f.getMonth(),a=f.getDate(),c;if(1==e){c=d._getMonthCount(b,e);a>c&&f.setDate(c)}f.setFullYear(b);d.renderTitle();d._renderDate();d.dispatchEvent("ongotoyear")},gotoMonth:function(e){var c=this,d=c._currDate,e=Math.min(Math.max(e,0),11),a=d.getDate(),b=c._getMonthCount(d.getFullYear(),e);a>b&&d.setDate(b);d.setMonth(e);c.renderTitle();c._renderDate();c.dispatchEvent("ongotomonth")},getToday:function(){return me._toLocalDate(new Date())},getDate:function(){return new Date(this._initDate.getTime())},setDate:function(a){if(baidu.lang.isDate(a)){var b=this;b._initDate=a;b._currDate=a}},prevMonth:function(){this._basicFlipMonth("prev")},nextMonth:function(){this._basicFlipMonth("next")},dispose:function(){var a=this;a.dispatchEvent("dispose");baidu.dom.remove(a.getMain());baidu.lang.Class.prototype.dispose.call(a)}});
        TCalendar = baidu.ui.Calendar;
        Tformat = baidu.date.format;
    })();

    
    var DatePickerPopup = function (options){
        this.initOptions(options);
        this.initPopup();
        var me = this;
        this._calendar = new TCalendar({
            onclickdate: function (evt){
                me.fireEvent('pickdate', evt.date);
            }
        });
    };
    DatePickerPopup.prototype = {
        content: '',
        _Popup_postRender: Popup.prototype.postRender,
        postRender: function (){
            this._calendar.render(this.getDom('content'));
            this._Popup_postRender();
        }
    };
    utils.inherits(DatePickerPopup, Popup);
    
    var DateButton = baidu.editor.ui.DateButton = function (options){
        this.initOptions(options);
        this.initDateButton();
    };
    DateButton.prototype = {
        initDateButton: function (){
            var me = this;
            this.popup = new DatePickerPopup({
                onpickdate: function (t, date){
                    if (me.fireEvent('pickdate', Tformat(date, 'yyyy-MM-dd')) !== false) {
                        me.popup.hide();
                    }
                }
            });
            this.initSplitButton();
        }
    };
    utils.inherits(DateButton, SplitButton);
})();
(function (){
    var utils = baidu.editor.utils;
    var editorui = baidu.editor.ui;

    var _Dialog = editorui.Dialog;
    editorui.Dialog = function (options){
        var dialog = new _Dialog(options);
        dialog.addListener('hide', function (){
            if (dialog.editor) {
                var editor = dialog.editor;
                try {
                    if(baidu.editor.browser.ie){
                        editor.selection._bakIERange.select();
                    } else {
                        editor.focus()
                    }
                } catch(ex){}
            }
        });
        return dialog;
    };

    var k, cmd;

    var btnCmds = ['Undo', 'Redo','FormatMatch',
        'Bold', 'Italic', 'Underline',
        'StrikeThrough', 'Subscript', 'Superscript','Source','Indent','Outdent',
//        'Imageleft', 'ImageRight', 'ImageChar',
        'BlockQuote','PastePlain','PageBreak',
        'SelectAll', 'Print', 'Preview', 'Horizontal', 'RemoveFormat','Time','Date','Unlink',
        'InsertParagraphBeforeTable','InsertRow','InsertCol','MergeRight','MergeDown','DeleteRow',
        'DeleteCol','SplittoRows','SplittoCols','SplittoCells','MergeCells','DeleteTable'];
    k = btnCmds.length;
    while (k --) {
        cmd = btnCmds[k];
        editorui[cmd] = function (cmd){
            return function (editor, title){
                title = title || editor.options.labelMap[cmd.toLowerCase()] || '';
                var ui = new editorui.Button({
                    className: 'edui-for-' + cmd.toLowerCase(),
                    title: title,
                    onclick: function (){
                        editor.execCommand(cmd);
                    },
                    showText: false
                });
                editor.addListener('selectionchange', function (){
                    var state = editor.queryCommandState(cmd.toLowerCase());
                    if (state == -1) {
                        ui.setDisabled(true);
                        ui.setChecked(false);
                    } else {
                        ui.setDisabled(false);
                        ui.setChecked(state);
                    }
                });
                return ui;
            };
        }(cmd);
    }
    editorui.ClearDoc = function(editor, title){
        var cmd = "ClearDoc";
        title = title || editor.options.labelMap[cmd.toLowerCase()] || '';
        var ui = new editorui.Button({
            className: 'edui-for-' + cmd.toLowerCase(),
            title: title,
            onclick: function (){
                if(confirm('确定清空文档吗？')){
                    editor.execCommand('cleardoc');
                }
            }
        });
        return ui;
    };

    editorui.Justify = function (editor, side, title){
        side = (side || 'left').toLowerCase();
        title = title || editor.options.labelMap['justify'+side.toLowerCase()] || '';
        var ui = new editorui.Button({
            className: 'edui-for-justify' + side.toLowerCase(),
            title: title,
            onclick: function (){
                editor.execCommand('Justify', side);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('Justify');
            ui.setDisabled(state == -1);
            var value = editor.queryCommandValue('Justify');
            ui.setChecked(value == side);
        });
        return ui;
    };
    editorui.JustifyLeft = function (editor, title){
        return editorui.Justify(editor, 'left', title);
    };
    editorui.JustifyCenter = function (editor, title){
        return editorui.Justify(editor, 'center', title);
    };
    editorui.JustifyRight = function (editor, title){
        return editorui.Justify(editor, 'right', title);
    };
    editorui.JustifyJustify = function (editor, title){
        return editorui.Justify(editor, 'justify', title);
    };

    editorui.Directionality = function (editor, side, title){
        side = (side || 'left').toLowerCase();
        title = title || editor.options.labelMap['directionality'+side.toLowerCase()] || '';
        var ui = new editorui.Button({
            className: 'edui-for-directionality' + side.toLowerCase(),
            title: title,
            onclick: function (){
                editor.execCommand('directionality', side);
            },
            type : side
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('directionality');
            ui.setDisabled(state == -1);
            var value = editor.queryCommandValue('directionality');
            ui.setChecked(value == ui.type);
        });
        return ui;
    };
    editorui.DirectionalityLtr = function (editor, title){
        return new editorui.Directionality(editor, 'ltr', title);
    };
    editorui.DirectionalityRtl = function (editor, title){
        return new editorui.Directionality(editor, 'rtl', title);
    };
    var colorCmds = ['BackColor', 'ForeColor'];
    k = colorCmds.length;
    while (k --) {
        cmd = colorCmds[k];
        editorui[cmd] = function (cmd){
            return function (editor, title){
                title = title || editor.options.labelMap[cmd.toLowerCase()] || '';
                var ui = new editorui.ColorButton({
                    className: 'edui-for-' + cmd.toLowerCase(),
                    color: 'default',
                    title: title,
                    onpickcolor: function (t, color){
                        editor.execCommand(cmd, color);
                    },
                    onpicknocolor: function (){
                        editor.execCommand(cmd, 'default');
                        this.setColor('transparent');
                        this.color = 'default';
                    },
                    onbuttonclick: function (){
                        editor.execCommand(cmd, this.color);
                    }
                });
                editor.addListener('selectionchange', function (){
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                    } else {
                        ui.setDisabled(false);
                    }
                });
                return ui;
            };
        }(cmd);
    }

    //不需要确定取消按钮的dialog
    var dialogNoButton = ['SearchReplace','Help','Spechars'];
    k = dialogNoButton.length;
    while(k --){
        cmd = dialogNoButton[k];
        editorui[cmd] = function (cmd){
            cmd = cmd.toLowerCase();
            return function (editor, iframeUrl, title){
                iframeUrl = iframeUrl || editor.options.iframeUrlMap[cmd.toLowerCase()] || 'about:blank';
                iframeUrl = editor.ui.mapUrl(iframeUrl);
                title = title || editor.options.labelMap[cmd.toLowerCase()] || '';
                var dialog = new editorui.Dialog({
                    iframeUrl: iframeUrl,
                    autoReset: true,
                    draggable: true,
                    editor: editor,
                    className: 'edui-for-' + cmd,
                    title: title,
                    onok: function (){},
                    oncancel: function (){},
                    onclose: function (t, ok){
                        if (ok) {
                            return this.onok();
                        } else {
                            return this.oncancel();
                        }
                    }
                });
                dialog.render();
                var ui = new editorui.Button({
                    className: 'edui-for-' + cmd,
                    title: title,
                    onclick: function (){
                        dialog.open();
                    }
                });
                editor.addListener('selectionchange', function (){
                    var state = editor.queryCommandState('inserthtml');
                    if (state == -1) {
                        ui.setDisabled(true);
                    } else {
                        ui.setDisabled(false);
                    }
                });
                return ui;
            };
        }(cmd);
    }

    var dialogCmds = ['Anchor','Link', 'Image', 'Map', 'GMap', 'Video','TableSuper','Code','InsertFrame'];
    
    k = dialogCmds.length;
    while (k --) {
        cmd = dialogCmds[k];
        editorui[cmd] = function (cmd){
            cmd = cmd.toLowerCase();
            return function (editor, iframeUrl, title){
                iframeUrl = iframeUrl || editor.options.iframeUrlMap[cmd.toLowerCase()] || 'about:blank';
                iframeUrl = editor.ui.mapUrl(iframeUrl);
                title = title || editor.options.labelMap[cmd.toLowerCase()] || '';
                var dialog = new editorui.Dialog({
                    iframeUrl: iframeUrl,
                    autoReset: true,
                    draggable: true,
                    editor: editor,
                    className: 'edui-for-' + cmd,
                    title: title,
                    buttons: [{
                        className: 'edui-okbutton',
                        label: '确认',
                        onclick: function (){
                            dialog.close(true);
                        }
                    }, {
                        className: 'edui-cancelbutton',
                        label: '取消',
                        onclick: function (){
                            dialog.close(false);
                        }
                    }],
                    onok: function (){},
                    oncancel: function (){},
                    onclose: function (t, ok){
                        if (ok) {
                            return this.onok();
                        } else {
                            return this.oncancel();
                        }
                    }
                });
                dialog.render();
                var ui = new editorui.Button({
                    className: 'edui-for-' + cmd,
                    title: title,
                    onclick: function (){
                        dialog.open();
                    }
                });
                editor.addListener('selectionchange', function (){
                    var state = editor.queryCommandState(cmd);
                    if (state == -1) {
                        ui.setDisabled(true);
                    } else {
                        ui.setDisabled(false);
                    }
                });
                return ui;
            };
        }(cmd);
    }

    editorui.FontFamily = function (editor, list, title){
        list = list || editor.options.listMap['fontfamily'] || [];
        title = title || editor.options.labelMap['fontfamily'] || '';
        var items = [];
        for (var i=0; i<list.length; i++) {
            var font = list[i];
            var fonts = editor.options.fontMap[font];
            var value = '"' + font + '"';
            var regex = new RegExp(font, 'i');
            if (fonts) {
                value = '"' + fonts.join('","') + '"';
                regex = new RegExp(fonts.join('[^\\s]|'), 'i');
            }
            items.push({
                label: font,
                value: value,
                regex: regex,
                renderLabelHtml: function (){
                    return '<div class="edui-label %%-label" style="font-family:' +
                        utils.unhtml(this.value) + '">' + (this.label || '') + '</div>';
                }
            });
        }
        var ui = new editorui.Combox({
            items: items,
            onselect: function (t,index){
                editor.execCommand('FontFamily', this.items[index].value);
            },
            onbuttonclick: function (){
                this.showPopup();
            },
            title: title,
            className: 'edui-for-fontfamily',
            indexByValue: function (value){
                value = value.replace(/,/, '|').replace(/"/g, '');
                for (var i=0; i<this.items.length; i++) {
                    var item = this.items[i];
                    if (item.regex.test(value)) {
                        return i;
                    }
                }
                return -1;
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('FontFamily');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
////                if (ready) {
////                    ui.setValue(editor.options.labelMap['fontfamily'] || '字体');
////                } else {
////                    var value = editor.queryCommandValue('FontFamily');
////                    ui.setValue(value);
////                }
//                var value = editor.queryCommandValue('FontFamily');

                ui.setValue( editor.queryCommandValue('FontFamily'));
            }
        });
        return ui;
    };

    editorui.FontSize = function (editor, list, title){
        list = list || editor.options.listMap['fontsize'] || [];
        title = title || editor.options.labelMap['fontsize'] || '';
        var items = [];
        for (var i=0; i<list.length; i++) {
            var size = list[i] + 'px';
            items.push({
                label: size,
                value: size,
                renderLabelHtml: function (){
                    return '<div class="edui-label %%-label" style="font-size:' +
                        this.value + '">' + (this.label || '') + '</div>';
                }
            });
        }
        var ui = new editorui.Combox({
            items: items,
            title: title,
            onselect: function (t,index){
                editor.execCommand('FontSize', this.items[index].value);
            },
            onbuttonclick: function (){
                this.showPopup();
            },
            className: 'edui-for-fontsize'
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('FontSize');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
//                if (ready) {
//                    ui.setValue(editor.options.labelMap['fontsize'] || '字号');
//                } else {
//                    var value = editor.queryCommandValue('FontSize');
//                    ui.setValue(value);
//                }
                 var value = editor.queryCommandValue('FontSize');
                    ui.setValue(value);
            }
        });
        return ui;
    };
    editorui.RowSpacing = function (editor, list, title){
        list = list || editor.options.listMap['rowspacing'] || [];
        title = title || editor.options.labelMap['rowspacing'] || '';
        var items = [];
        for (var i=0; i<list.length; i++) {
            var item = list[i].split(':');
            var tag = item[0];
            var value = item[1];
            items.push({
                label: tag,
                value: value,
                renderLabelHtml: function (){
                    return '<div class="edui-label %%-label" style="font-size:12px">' + (this.label || '') + '</div>';
                }
            });
        }
        var ui = new editorui.Combox({
            items: items,
            title: title,
            onselect: function (t,index){
                editor.execCommand('RowSpacing', this.items[index].value);
            },
            onbuttonclick: function (){
                this.showPopup();
            },
            className: 'edui-for-rowspacing'
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('RowSpacing');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
//                if (ready) {
//                    ui.setValue(editor.options.labelMap['rowspacing'] || '行间距');
//                } else {
//                    var value = editor.queryCommandValue('RowSpacing');
//                    ui.setValue(value);
//                }
                var value = editor.queryCommandValue('RowSpacing');
                    ui.setValue(value);
            }
        });
        return ui;
    };
//    editorui.Underline = function (editor, list, title){
//        list = list || editor.options.listMap['underline'] || [];
//        title = title || editor.options.labelMap['underline'] || '';
//        var items = [];
//        for (var i=0; i<list.length; i++) {
//            var size = list[i] ;
//            items.push({
//                label: size,
//                value: size,
//                renderLabelHtml: function (){
//                    return '<div class="edui-label %%-label" style="text-decoration:' +
//                        this.value + '">' + (this.label || '') + '</div>';
//                }
//            });
//        }
//        var ui = new editorui.Combox({
//            items: items,
//            title: title,
//            onselect: function (t,index){
//                editor.execCommand('UnderLine', this.items[index].value);
//            },
//            onbuttonclick: function (){
//                this.showPopup();
//            },
//            className: 'edui-for-underline'
//        });
//        editor.addListener('selectionchange', function (){
//            var state = editor.queryCommandState('Underline');
//            if (state == -1) {
//                ui.setDisabled(true);
//            } else {
//                ui.setDisabled(false);
//                var value = editor.queryCommandValue('Underline');
//                ui.setValue(value);
//            }
//        });
//        return ui;
//    };
    editorui.Paragraph = function (editor, list, title){
        list = list || editor.options.listMap['paragraph'] || [];
        title = title || editor.options.labelMap['paragraph'] || '';
        var items = [];
        for (var i=0; i<list.length; i++) {
            var item = list[i].split(':');
            var tag = item[0];
            var label = item[1];
            items.push({
                label: label,
                value: tag,
                renderLabelHtml: function (){
                    return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || '') + '</span></div>';
                }
            });
        }
        var ui = new editorui.Combox({
            items: items,
            title: title,
            className: 'edui-for-paragraph',
            onselect: function (t,index){
                editor.execCommand('Paragraph', this.items[index].value);
            },
            onbuttonclick: function (){
                this.showPopup();
            }
        });
        editor.addListener('selectionchange', function (t,ready){
            var state = editor.queryCommandState('Paragraph');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
//                var value = editor.queryCommandValue('Paragraph');
//                if (value && !ready) {
//                    ui.setValue(value);
//                } else {
//                    ui.setValue(editor.options.labelMap['paragraph'] || '格式');
//                }
                var value = editor.queryCommandValue('Paragraph');
                 ui.setValue(value);
            }
        });
        return ui;
    };

    editorui.InsertTable = function (editor, iframeUrl, title){
        iframeUrl = iframeUrl || editor.options.iframeUrlMap['inserttable'] || 'about:blank';
        iframeUrl = editor.ui.mapUrl(iframeUrl);
        title = title || editor.options.labelMap['inserttable'] || '';
        var dialog = new editorui.Dialog({
            iframeUrl: iframeUrl,
            autoReset: true,
            draggable: true,
            editor: editor,
            className: 'edui-for-inserttable',
            title: title,
            buttons: [{
                className: 'edui-okbutton',
                label: '确认',
                onclick: function (){
                    dialog.close(true);
                }
            }, {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function (){
                    dialog.close(false);
                }
            }],
            onok: function (){},
            oncancel: function (){},
            onclose: function (t,ok){
                if (ok) {
                    return this.onok();
                } else {
                    return this.oncancel();
                }
            }
        });
        dialog.render();
        editor.tableDialog = dialog;
        var ui = new editorui.TableButton({
            title: title,
            className: 'edui-for-inserttable',
            onpicktable: function (t,numCols, numRows){
                editor.execCommand('InsertTable', {numRows:numRows, numCols:numCols});
            },
            onmore: function (){
                dialog.open();
            },
            onbuttonclick: function (){
                dialog.open();
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('inserttable');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
            }
        });
        return ui;
    };

    editorui.InsertOrderedList = function (editor, title){
        title = title || editor.options.labelMap['insertorderedlist'] || '';
        var _onMenuClick = function(){
            editor.execCommand("InsertOrderedList", this.value);
        };
        var ui = new editorui.MenuButton({
            className : 'edui-for-insertorderedlist',
            title : title,
            items :
                [{
                    label: '1,2,3...',
                    value: 'decimal',
                    onclick : _onMenuClick
                },{
                    label: 'a,b,c ...',
                    value: 'lower-alpha',
                    onclick : _onMenuClick
                },{
                    label: 'i,ii,iii...',
                    value: 'lower-roman',
                    onclick : _onMenuClick
                },{
                    label: 'A,B,C',
                    value: 'upper-alpha',
                    onclick : _onMenuClick
                },{
                    label: 'I,II,III...',
                    value: 'upper-roman',
                    onclick : _onMenuClick
                }],
            onbuttonclick: function (){
                editor.execCommand("InsertOrderedList", this.value);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('InsertOrderedList');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('InsertOrderedList');
                ui.setValue(value);
                 ui.setChecked(state)
            }
        });
        return ui;
    };

    editorui.InsertUnorderedList = function (editor, title){
        title = title || editor.options.labelMap['insertunorderedlist'] || '';
        var _onMenuClick = function(){
            editor.execCommand("InsertUnorderedList", this.value);
        };
        var ui = new editorui.MenuButton({
            className : 'edui-for-insertunorderedlist',
            title: title,
            items:
                [{
                    label: '○ 小圆圈',
                    value: 'circle',
                    onclick : _onMenuClick
                },{
                    label: '● 小圆点',
                    value: 'disc',
                    onclick : _onMenuClick
                },{
                    label: '■ 小方块',
                    value: 'square',
                    onclick : _onMenuClick
                }],
            onbuttonclick: function (){
                editor.execCommand("InsertUnorderedList", this.value);
            }
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('InsertUnorderedList');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
                var value = editor.queryCommandValue('InsertUnorderedList');
                ui.setValue(value);
                ui.setChecked(state)
            }
        });
        return ui;
    };

    editorui.FullScreen = function (editor, title){
        title = title || editor.options.labelMap['fullscreen'] || '';
        return new editorui.Button({
            className: 'edui-for-fullscreen',
            title: title,
            onclick: function (){
                if (editor.ui) {
                    editor.ui.setFullScreen(!editor.ui.isFullScreen());
                }
                this.setChecked(editor.ui.isFullScreen());
            }
        });
    };

    
    editorui.MultiMenu = function(editor, iframeUrl, title){
        title = title || editor.options.labelMap['multiMenu'] || '';
        iframeUrl = iframeUrl || editor.options.iframeUrlMap['multimenu'] || 'about:blank';
        iframeUrl = editor.ui.mapUrl(iframeUrl);
        var ui = new editorui.MultiMenuPop({
            title: title,
            editor: editor,
            className: 'edui-for-multimenu',
            iframeUrl: iframeUrl
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('inserthtml');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
            }
        });
        return ui;
    };

    // 覆盖了之前的Date.
    editorui.Date = function (editor){
        var ui = new editorui.DateButton({
            onpickdate: function (t, date){
                editor.execCommand('inserthtml', date);
            },
            onbuttonclick: function (){
                editor.execCommand('date');
            },
            className: 'edui-for-date'
        });
        editor.addListener('selectionchange', function (){
            var state = editor.queryCommandState('inserthtml');
            if (state == -1) {
                ui.setDisabled(true);
            } else {
                ui.setDisabled(false);
            }
        });
        return ui;
    };


})();

(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase;

    function EditorUI(options){
        this.initOptions(options);
        this.initEditorUI();
    }
    EditorUI.prototype = {
        uiName: 'editor',
        initEditorUI: function (){
            this.editor.ui = this;
            this.initUIBase();
            this._initToolbars();
            var editor = this.editor;
            editor.addListener('ready', function (){
                baidu.editor.dom.domUtils.on(editor.window, 'scroll', function (){
                    baidu.editor.ui.Popup.postHide();
                });
//                editor.fireEvent('beforeselectionchange');
//                editor.fireEvent('selectionchange');
            });
            editor.addListener('mousedown', function (t, evt){
                var el = evt.target || evt.srcElement;
                baidu.editor.ui.Popup.postHide(el);
            });
            editor.addListener('contextmenu', function (t, evt){
                baidu.editor.ui.Popup.postHide();
            });
            var me = this;
            editor.addListener('selectionchange', function (){
                me._updateElementPath();
                //字数统计
//                me._wordCount();
            });
            editor.addListener('sourcemodechanged', function (t, mode){
                if(editor.options.elementPathEnabled){
                    if (mode) {
                        me.disableElementPath();
                    } else {
                        me.enableElementPath();
                    }
                }


            });
            // 超链接的编辑器浮层
            var linkDialog = new baidu.editor.ui.Dialog({
                iframeUrl: editor.ui.mapUrl(me.editor.options.iframeUrlMap.link),
                autoReset: true,
                draggable: true,
                editor: editor,
                className: 'edui-for-link',
                title: '超链接',
                buttons: [{
                    className: 'edui-okbutton',
                    label: '确认',
                    onclick: function (){
                        linkDialog.close(true);
                    }
                }, {
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function (){
                        linkDialog.close(false);
                    }
                }],
                onok: function (){},
                oncancel: function (){},
                onclose: function (t,ok){
                    if (ok) {
                        return this.onok();
                    } else {
                        return this.oncancel();
                    }
                }

            });
            linkDialog.render();
            // 图片的编辑器浮层
            var imgDialog = new baidu.editor.ui.Dialog({
                iframeUrl: editor.ui.mapUrl(me.editor.options.iframeUrlMap.image),
                autoReset: true,
                draggable: true,
                editor: editor,
                className: 'edui-for-image',
                title: '图片',
                buttons: [{
                    className: 'edui-okbutton',
                    label: '确认',
                    onclick: function (){
                        imgDialog.close(true);
                    }
                }, {
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function (){
                        imgDialog.close(false);
                    }
                }],
                onok: function (){},
                oncancel: function (){},
                onclose: function (t,ok){
                    if (ok) {
                        return this.onok();
                    } else {
                        return this.oncancel();
                    }
                }

            });
            imgDialog.render();
            //锚点
            var anchorDialog = new baidu.editor.ui.Dialog({
                iframeUrl: editor.ui.mapUrl(me.editor.options.iframeUrlMap.anchor),
                autoReset: true,
                draggable: true,
                editor: editor,
                className: 'edui-for-anchor',
                title: '锚点',
                buttons: [{
                    className: 'edui-okbutton',
                    label: '确认',
                    onclick: function (){
                        anchorDialog.close(true);
                    }
                }, {
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function (){
                        anchorDialog.close(false);
                    }
                }],
                onok: function (){},
                oncancel: function (){},
                onclose: function (t,ok){
                    if (ok) {
                        return this.onok();
                    } else {
                        return this.oncancel();
                    }
                }

            });
            anchorDialog.render();
            // video
            var videoDialog = new baidu.editor.ui.Dialog({
                iframeUrl: editor.ui.mapUrl(me.editor.options.iframeUrlMap.video),
                autoReset: true,
                draggable: true,
                editor: editor,
                className: 'edui-for-video',
                title: '视频',
                buttons: [{
                    className: 'edui-okbutton',
                    label: '确认',
                    onclick: function (){
                        videoDialog.close(true);
                    }
                }, {
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function (){
                        videoDialog.close(false);
                    }
                }],
                onok: function (){},
                oncancel: function (){},
                onclose: function (t,ok){
                    if (ok) {
                        return this.onok();
                    } else {
                        return this.oncancel();
                    }
                }

            });
            videoDialog.render();
            // map
            var mapDialog = new baidu.editor.ui.Dialog({
                iframeUrl: editor.ui.mapUrl(me.editor.options.iframeUrlMap.map),
                autoReset: true,
                draggable: true,
                editor: editor,
                className: 'edui-for-map',
                title: '地图',
                buttons: [{
                    className: 'edui-okbutton',
                    label: '确认',
                    onclick: function (){
                        mapDialog.close(true);
                    }
                }, {
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function (){
                        mapDialog.close(false);
                    }
                }],
                onok: function (){},
                oncancel: function (){},
                onclose: function (t,ok){
                    if (ok) {
                        return this.onok();
                    } else {
                        return this.oncancel();
                    }
                }

            });
            mapDialog.render();
            // map
            var gmapDialog = new baidu.editor.ui.Dialog({
                iframeUrl: editor.ui.mapUrl(me.editor.options.iframeUrlMap.gmap),
                autoReset: true,
                draggable: true,
                editor: editor,
                className: 'edui-for-gmap',
                title: 'Google地图',
                buttons: [{
                    className: 'edui-okbutton',
                    label: '确认',
                    onclick: function (){
                        gmapDialog.close(true);
                    }
                }, {
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function (){
                        gmapDialog.close(false);
                    }
                }],
                onok: function (){},
                oncancel: function (){},
                onclose: function (t,ok){
                    if (ok) {
                        return this.onok();
                    } else {
                        return this.oncancel();
                    }
                }

            });
            gmapDialog.render();
            var popup = new baidu.editor.ui.Popup({
                content: '',
                className: 'edui-bubble',
                _onEditButtonClick: function (){
                    this.hide();
                    linkDialog.open();
                },
                _onImgEditButtonClick: function (){
                    this.hide();
                    var nodeStart = editor.selection.getRange().getClosedNode();
                    var img = baidu.editor.dom.domUtils.findParentByTagName(nodeStart,"img",true);
                    if(img && img.className.indexOf("edui-faked-video") != -1){
                        videoDialog.open();
                    }else if(img && img.src.indexOf("http://api.map.baidu.com")!=-1){
                        mapDialog.open();
                    }else if(img && img.src.indexOf("http://maps.google.com/maps/api/staticmap")!=-1){
                        gmapDialog.open();
                    }else if(img && img.getAttribute("anchorname")){
                        anchorDialog.open();
                    }else{
                        imgDialog.open();
                    }

                },
                _onImgSetFloat: function(event,value){
                    var nodeStart = editor.selection.getRange().getClosedNode();
                    var img = baidu.editor.dom.domUtils.findParentByTagName(nodeStart,"img",true);
                    if(img){
                        switch(value){
                            case -2:
                                if(!!window.ActiveXObject){
                                    img.style.removeAttribute("display");
                                    img.style.styleFloat = "";
                                }else{
                                    img.style.removeProperty("display");
                                    img.style.cssFloat = "";
                                }
                                break;
                            case -1:
                                if(!!window.ActiveXObject){
                                    img.style.removeAttribute("display");
                                    img.style.styleFloat = "left";
                                }else{
                                    img.style.removeProperty("display");
                                    img.style.cssFloat = "left";
                                }
                                break;
                            case 1:
                                if(!!window.ActiveXObject){
                                    img.style.removeAttribute("display");
                                    img.style.styleFloat = "right";
                                }else{
                                    img.style.removeProperty("display");
                                    img.style.cssFloat = "right";
                                }
                                break;
                            case 2:
                                if(!!window.ActiveXObject){
                                    img.style.styleFloat = "";
                                    img.style.display = "block";
                                }else{
                                    img.style.cssFloat = "";
                                    img.style.display = "block";
                                }

                        }
                        this.showAnchor(img);
                    }
                },
                _setIframeAlign: function(value){
                    var frame = popup.anchorEl;
                    var newFrame = frame.cloneNode(true);
                    switch(value){
                        case -2:
                            newFrame.setAttribute("align","");
                            break;
                        case -1:
                            newFrame.setAttribute("align","left");
                            break;
                        case 1:
                            newFrame.setAttribute("align","right");
                            break;
                        case 2:
                            newFrame.setAttribute("align","middle");
                            break;
                    }
                    frame.parentNode.insertBefore(newFrame,frame);
                    baidu.editor.dom.domUtils.remove(frame);
                    popup.anchorEl = newFrame;
                    popup.showAnchor(popup.anchorEl);
                },
                _updateIframe: function(){
                    editor._iframe = popup.anchorEl;
                    insertframe.open();
                    popup.hide();
                },
                _onRemoveButtonClick: function (){
                    var nodeStart = editor.selection.getRange().getClosedNode();
                    var img = baidu.editor.dom.domUtils.findParentByTagName(nodeStart,"img",true);
                    if(img && img.getAttribute("anchorname")){
                        editor.execCommand("anchor");
                    }else{
                        editor.execCommand('unlink');
                    }
                    this.hide();
                },
                queryAutoHide: function (el){
                    if (el && el.ownerDocument == editor.document) {
                        if (el.tagName.toLowerCase() == 'img' || baidu.editor.dom.domUtils.findParentByTagName(el, 'a', true)) {
                            return el !== popup.anchorEl;
                        }
                    }
                    return baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, el);
                }
            });
            popup.render();
            //iframe
            var insertframe = new baidu.editor.ui.Dialog({
                iframeUrl: editor.ui.mapUrl(me.editor.options.iframeUrlMap.insertframe),
                autoReset: true,
                draggable: true,
                editor: editor,
                className: 'edui-for-insertframe',
                title: '插入iframe',
                buttons: [{
                    className: 'edui-okbutton',
                    label: '确认',
                    onclick: function (){
                        insertframe.close(true);
                    }
                }, {
                    className: 'edui-cancelbutton',
                    label: '取消',
                    onclick: function (){
                        insertframe.close(false);
                    }
                }],
                onok: function (){},
                oncancel: function (){},
                onclose: function (t,ok){
                    if (ok) {
                        return this.onok();
                    } else {
                        return this.oncancel();
                    }
                }

            });
            insertframe.render();
            editor.addListener('mouseover',function(t,evt){
                evt = evt || window.event;
                var el = evt.target || evt.srcElement;
                if(/iframe/ig.test(el.tagName)){
                    var html = popup.formatHtml(
                        '<nobr>属性: <span onclick=$$._setIframeAlign(-2) class="edui-clickable">默认</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">左对齐</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">右对齐</span>&nbsp;&nbsp;'+
                            '<span onclick=$$._setIframeAlign(2) class="edui-clickable">居中</span>' +
                            ' <span onclick="$$._updateIframe( this);" class="edui-clickable">修改</span></nobr>');
                    if (html) {
                        popup.getDom('content').innerHTML = html;
                        popup.anchorEl = el;
                        popup.showAnchor(popup.anchorEl);
                    } else {
                        popup.hide();
                    }
                }
            });
            editor.addListener('selectionchange', function (t, causeByUi){
                if (!causeByUi) return;
                var html = '';
                var img = editor.selection.getRange().getClosedNode();
                var imglink = baidu.editor.dom.domUtils.findParentByTagName(img,"a",true);
                if(imglink != null){
                    html += popup.formatHtml(
                        '<nobr>属性: <span class="edui-unclickable">默认</span>&nbsp;&nbsp;<span class="edui-unclickable">左浮动</span>&nbsp;&nbsp;<span class="edui-unclickable">右浮动</span>&nbsp;&nbsp;'+
                        '<span class="edui-unclickable">独占一行</span>' +
                        ' <span onclick="$$._onImgEditButtonClick(event, this);" class="edui-clickable">修改</span></nobr>');
                }else if(img != null && img.tagName.toLowerCase() == 'img'){
                    if(img.getAttribute('anchorname')){
                        //锚点处理
                        html += popup.formatHtml(
                        '<nobr>属性: <span onclick=$$._onImgEditButtonClick(event) class="edui-clickable">修改</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick(event) class="edui-clickable">删除</span></nobr>');
                    }else{
                        html += popup.formatHtml(
                            '<nobr>属性: <span onclick=$$._onImgSetFloat(event,-2) class="edui-clickable">默认</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat(event,-1) class="edui-clickable">左浮动</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat(event,1) class="edui-clickable">右浮动</span>&nbsp;&nbsp;'+
                            '<span onclick=$$._onImgSetFloat(event,2) class="edui-clickable">独占一行</span>' +
                            ' <span onclick="$$._onImgEditButtonClick(event, this);" class="edui-clickable">修改</span></nobr>');
                    }
                }
                var link;
                if(editor.selection.getRange().collapsed){
                    link = editor.queryCommandValue("link");
                }else{
                    link = editor.selection.getStart();
                }
                link = baidu.editor.dom.domUtils.findParentByTagName(link,"a",true);
                var url;
                if (link != null && (url = link.getAttribute('href', 2)) != null) {
                    var txt = url;
                    if(url.length>30){
                        txt = url.substring(0,20)+"...";
                    }
                    if (html) {
                        html += '<div style="height:5px;"></div>'
                    }
                    html += popup.formatHtml(
                        '<nobr>链接: <a target="_blank" href="'+ url +'" title="'+url+'" >' + txt + '</a>' +
                        ' <span class="edui-clickable" onclick="$$._onEditButtonClick(event, this);">修改</span>' +
                        ' <span class="edui-clickable" onclick="$$._onRemoveButtonClick(event, this);"> 清除</span></nobr>');
                    popup.showAnchor(link);
                }
                if (html) {
                    popup.getDom('content').innerHTML = html;
                    popup.anchorEl = img || link;
                    popup.showAnchor(popup.anchorEl);
                } else {
                    popup.hide();
                }
            });
        },
        _initToolbars: function (){
            var editor = this.editor;
            var toolbars = this.toolbars || [];
            var toolbarUis = [];
            for (var i=0; i<toolbars.length; i++) {
                var toolbar = toolbars[i];
                var toolbarUi = new baidu.editor.ui.Toolbar();
                for (var j=0; j<toolbar.length; j++) {
                    var toolbarItem = toolbar[j];
                    var toolbarItemUi = null;
                    if (typeof toolbarItem == 'string') {
                        if (toolbarItem == '|') {
                            toolbarItem = 'Separator';
                        }
                        if (baidu.editor.ui[toolbarItem]) {
                            toolbarItemUi = new baidu.editor.ui[toolbarItem](editor);
                        }
                    } else {
                        toolbarItemUi = toolbarItem;
                    }
                    if (toolbarItemUi) {
                        toolbarUi.add(toolbarItemUi);
                    }
                }
                toolbarUis[i] = toolbarUi;
            }
            this.toolbars = toolbarUis;
        },
        getHtmlTpl: function (){
            return '<div id="##" class="%%">' +
                '<div id="##_toolbarbox" class="%%-toolbarbox">' +
                 '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' +
                  this.renderToolbarBoxHtml() +
                 '</div></div>' +
                 '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;">' +
                  '<div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div>' +
                  '<div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div>' +
                  '<div style="height:0;overflow:hidden;clear:both;"></div>' +
                 '</div>' +
                '</div>' +
                '<div id="##_iframeholder" class="%%-iframeholder"></div>' +
                //wordCount
//                '<div class="%%-bottomContainer">'+
                    '<div id="##_bottombar" class="%%-bottombar"></div>' +
//                    '<div id="##_wordcount" class="%%-wordcount"></div>' +
//                    '<div style="height:0;overflow:hidden;clear:both;"></div>' +
//                '</div>'+
                '</div>';
        },
        renderToolbarBoxHtml: function (){
            var buff = [];
            for (var i=0; i<this.toolbars.length; i++) {
                buff.push(this.toolbars[i].renderHtml());
            }
            return buff.join('');
        },
        setFullScreen: function (fullscreen){
            function fixGecko(editor){
                editor.body.contentEditable = false;
                setTimeout(function(){
                      editor.body.contentEditable = true;
                },200) 
            }
            if (this._fullscreen != fullscreen) {
                this._fullscreen = fullscreen;
                this.editor.fireEvent('beforefullscreenchange', fullscreen);
                var editor = this.editor;
                
                if(baidu.editor.browser.gecko){
                    var bk = editor.selection.getRange().createBookmark();
                }

                if (fullscreen) {
                    this._bakHtmlOverflow = document.documentElement.style.overflow;
                    this._bakBodyOverflow = document.body.style.overflow;
                    this._bakAutoHeight = this.editor.autoHeightEnabled;
                    this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                    if (this._bakAutoHeight) {
                        this.editor.disableAutoHeight();
                    }
                    document.documentElement.style.overflow = 'hidden';
                    document.body.style.overflow = 'hidden';
                    this._bakCssText = this.getDom().style.cssText;
                    this._bakCssText1 = this.getDom('iframeholder').style.cssText;
                    this._updateFullScreen();

                } else {
                    document.documentElement.style.overflow = this._bakHtmlOverflow;
                    document.body.style.overflow = this._bakBodyOverflow;
                    this.getDom().style.cssText = this._bakCssText;
                    this.getDom('iframeholder').style.cssText = this._bakCssText1;
                    if (this._bakAutoHeight) {
                        this.editor.enableAutoHeight();
                    }
                    window.scrollTo(0, this._bakScrollTop);

                }
                if(baidu.editor.browser.gecko){
                    
                    var input = document.createElement('input');
                       
                    document.body.appendChild(input);

                    editor.body.contentEditable = false;
                    setTimeout(function(){

                        input.focus();
                        setTimeout(function(){
                            editor.body.contentEditable = true;
                            editor.selection.getRange().moveToBookmark(bk).select();
                            baidu.editor.dom.domUtils.remove(input)
                        })

                    })
                }
                    
                this.editor.fireEvent('fullscreenchanged', fullscreen);
                this.triggerLayout();
            }
        },
//        _wordCount:function(){
//            var wordcount = this.getDom('wordcount');
//            if(!editor.options.wordCount) {
//                wordcount.style.display="none";
//                return;
//            }
//            wordcount.innerHTML = '<p class="edui-editor-wordcount"><span style="color:#666;text-decoration: none;cursor:auto"> '+editor.queryCommandValue("wordcount")+ ' </span></p>';
//        },
        _updateFullScreen: function (){
            if (this._fullscreen) {
                var vpRect = uiUtils.getViewportRect();
                this.getDom().style.cssText = 'border:0;position:absolute;left:0;top:0;width:'+vpRect.width+'px;height:'+vpRect.height+'px;';
                uiUtils.setViewportOffset(this.getDom(), { left: 0, top: 0 });
                this.editor.setHeight(vpRect.height - this.getDom('toolbarbox').offsetHeight - this.getDom('bottombar').offsetHeight);
            }
        },
        _updateElementPath: function (){
            var bottom = this.getDom('bottombar');
            if (this.elementPathEnabled) {
                var list = this.editor.queryCommandValue('elementpath');
                var buff = [];
                for(var i=0,ci;ci=list[i];i++){
                    buff[i] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;'+ i +'&quot;);">' + ci + '</span>');
                }
                bottom.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">path: ' + buff.join(' &gt; ') + '</div>';
                
            }else{
                bottom.style.display = 'none'
            }
        },
        disableElementPath: function (){
            var bottom = this.getDom('bottombar');
            bottom.innerHTML = '';
            bottom.style.display = 'none';
            this.elementPathEnabled = false;

        },
        enableElementPath: function (){
            var bottom = this.getDom('bottombar');
            bottom.style.display = '';
            this.elementPathEnabled = true;
            this._updateElementPath();
        },
        isFullScreen: function (){
            return this._fullscreen;
        },
        postRender: function (){
            UIBase.prototype.postRender.call(this);
            for (var i=0; i<this.toolbars.length; i++) {
                this.toolbars[i].postRender();
            }
            var me = this;
            var timerId;
            baidu.editor.dom.domUtils.on(window, 'resize', function (){
                clearTimeout(timerId);
                timerId = setTimeout(function (){
                    me._updateFullScreen();
                });
            });
        },
        showToolbarMsg: function (msg){
            this.getDom('toolbarmsg_label').innerHTML = msg;
            this.getDom('toolbarmsg').style.display = '';
        },
        hideToolbarMsg: function (){
            this.getDom('toolbarmsg').style.display = 'none';
        },
        mapUrl: function (url){
            return url.replace('~/', this.editor.options.UEDITOR_HOME_URL || '');
        },
        triggerLayout: function (){
            var dom = this.getDom();
            if (dom.style.zoom == '1') {
                dom.style.zoom = '100%';
            } else {
                dom.style.zoom = '1';
            }
        }
    };
    utils.inherits(EditorUI, baidu.editor.ui.UIBase);

    baidu.editor.ui.Editor = function (options){
        
        var editor = new baidu.editor.Editor(options);
        editor.options.editor = editor;
        new EditorUI(editor.options);
        
        var oldRender = editor.render;
        editor.render = function (holder){
            if(holder){
                if (holder.constructor === String) {
                    holder = document.getElementById(holder);
                }

                if(holder && holder.tagName.toLowerCase() == 'textarea'){
                    var newDiv = document.createElement('div');
                    holder.parentNode.insertBefore(newDiv,holder);
                    if(holder.value){
                        editor.options.initialContent = holder.value;
                    }
                    newDiv.id = holder.id;
                    holder.parentNode.removeChild(holder);
                    holder = newDiv;
                    holder.innerHTML = '';
                }
            }


            editor.ui.render(holder);
            var iframeholder = editor.ui.getDom('iframeholder');
            return oldRender.call(this, iframeholder);
        };
        return editor;
    };
})();
///import core
///import uicore
 ///commands 表情
(function(){
    var utils = baidu.editor.utils,
        Popup = baidu.editor.ui.Popup,
        SplitButton = baidu.editor.ui.SplitButton,
        MultiMenuPop = baidu.editor.ui.MultiMenuPop = function(options){
            this.initOptions(options);
            this.initMultiMenu();
        };

    MultiMenuPop.prototype = {
        initMultiMenu: function (){
            var me = this;
            this.popup = new Popup({
                content: '',
                iframe_rendered: false,
                onshow: function (){
                    if (!this.iframe_rendered) {
                        this.iframe_rendered = true;
                        this.getDom('content').innerHTML = '<iframe id="'+me.id+'_iframe" src="'+ me.iframeUrl +'" frameborder="0"></iframe>';
                    }
                }
            });
            this.onbuttonclick = function(){
                this.showPopup();
            }
            this.initSplitButton();
        }

    };

    utils.inherits(MultiMenuPop, SplitButton);
})();
