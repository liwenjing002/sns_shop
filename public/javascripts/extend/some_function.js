function obj2str(o){
    var r = [];
    if(typeof o == "string" || o == null) {
        return o;
    }
    if(typeof o == "object"){
        if(!o.sort){
            r[0]="{"
            for(var i in o){
                r[r.length]=i;
                r[r.length]=":";
                r[r.length]=obj2str(o[i]);
                r[r.length]=",";
            }
            r[r.length-1]="}"
        }else{
            r[0]="["
            for(var i =0;i<o.length;i++){
                r[r.length]=obj2str(o[i]);
                r[r.length]=",";
            }
            r[r.length-1]="]"
        }
        return r.join("");
    }
    return o.toString();
}


var editor_pic

var OSX = null
var OSX2 = null
var OSX3 = null
jQuery(function ($) {
    
    //标签窗口
    OSX = {
        container: null,
        init: function () {
            $("#add_tag").click(function (e) {
                e.preventDefault();	

                $("#osx-modal-content").modal({
                    overlayId: 'osx-overlay',
                    containerId: 'osx-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65, 
                    position: [0,0],
                    overlayClose: true,
                    onOpen: OSX.open,
                    onClose: OSX.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#osx-modal-content", self.container).show();
                var title = $("#osx-modal-title", self.container);
                title.show();
                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#osx-modal-data", self.container).height()
                        + title.height()
                        + 20; // padding
                        d.container.animate(
                        {
                            height: h
                        }, 
                        200,
                        function () {
                            //                            alert(3)
                            $("div.close", self.container).show();
                            $("#osx-modal-data", self.container).show();
                            $('#plan_day').datepicker({
                                changeYear:true, 
                                yearRange:'1900:2025', 
                                dateFormat:'mm/dd/yy'
                            });

                            $('#plan_day').live('keyup', function(){
                                var val = $(this).val();
                                if(val == '' || val.match(/1900/)) {
                                    $('#child-selection').show();
                                } else {
                                    $('#child-selection select').val('');
                                    $('#child-selection').hide();
                                }
                            }).trigger('keyup');
                            
                            
                            
                        }
                        );
                    }, 300);
                });
            })
        },
        close: function (d) {

            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {
                temp_my_all_tags= $("#my_all_tags").clone();
                temp_place_tags_input = $("#place_tags_input").attr("value")
                //                                       alert(temp_my_all_tags.html())
                //                                        alert($("#place_tags_input").attr("value"))
                                        
                self.close(); // or $.modal.close();
                $("#my_all_tags").html(temp_my_all_tags.html())
                $("#place_tags_input").attr("value",temp_place_tags_input)
                                        
            }
            );
        }
    };

    OSX.init();
        
        
        
        

    OSX2 = {
        container: null,
        init: function () {
            $("#i_want_to_go").click(function (e) {
                e.preventDefault();	

                $("#osx-modal-content").modal({
                    overlayId: 'osx-overlay',
                    containerId: 'osx-container',
                    closeHTML: null,
                    minHeight: 200,
                    opacity: 65, 
                    position: ["0",],
                    overlayClose: true,
                    autoResize:true,
                    onOpen: OSX2.open,
                    onClose: OSX2.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#osx-modal-content", self.container).show();
                var title = $("#osx-modal-title", self.container);
                title.show();
                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#osx-modal-data", self.container).height()
                        + title.height()
                        + 20; // padding
                        d.container.animate(
                        {
                            height: h
                        }, 
                        200,
                        function () {
                            $("div.close", self.container).show();
                            $("#osx-modal-data", self.container).show();
                          
                        }
                        );
                    }, 300);
                });
            })
        },
        close: function (d) {

            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {
                temp_my_all_tags= $("#my_all_tags").clone();
                temp_place_tags_input = $("#place_tags_input").attr("value")
                //                                        alert(temp_my_all_tags.html())
                //                                        alert($("#place_tags_input").attr("value"))
                                        
                self.close(); // or $.modal.close();
                $("#my_all_tags").html(temp_my_all_tags.html())
                $("#place_tags_input").attr("value",temp_place_tags_input)
                                        
            }
            );
        }
    };

    OSX2.init();
    
    //我的标签
    OSX3= {
        container: null,
        init: function () {
            $("#new_place_in_window").click(function (e) {

                e.preventDefault();	

                $("#osx-modal-content").modal({
                    overlayId: 'osx-overlay',
                    containerId: 'osx-container',
                    closeHTML: null,
                    minHeight: 200,
                    opacity: 65, 
                    position: ["0",],
                    overlayClose: true,
                    autoResize:true,
                    onOpen: OSX3.open,
                    onClose: OSX3.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#osx-modal-content", self.container).show();
                var title = $("#osx-modal-title", self.container);
                title.show();
                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#osx-modal-data", self.container).height()
                        + title.height()
                        + 20; // padding
                        d.container.animate(
                        {
                            height: h
                        }, 
                        200,
                        function () {

                            
                            $("div.close", self.container).show();
                            $("#osx-modal-data", self.container).show();
                            MapObject.initialize(null) ;
                        }
                        );
                    }, 300);
                });
            })
        },
        close: function (d) {

            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {
                //               alert();
                self.close(); // or $.modal.close();             
            }
            );
        }
    };

    OSX3.init();
    //活动
    OSX4 = {
        container: null,
        init: function () {
            $("#activity").click(function (e) {
                e.preventDefault();	

                $("#activity-modal-content").modal({
                    overlayId: 'activity-overlay',
                    containerId: 'activity-container',
                    closeHTML: null,
                    minHeight: 200,
                    opacity: 65, 
                    position: ["0",],
                    overlayClose: false,
                    autoResize:true,
                    onOpen: OSX4.open,
                    onClose: OSX4.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#activity-modal-content", self.container).show();
                var title = $("#activity-modal-title", self.container);
                title.show();
                    
                $('#activity_activity_time, #activity_apply_time').datepicker({
                    changeYear:true, 
                    yearRange:'1900:2025', 
                    dateFormat:'yy-m-d'
                });
                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#activity-modal-data", self.container).height()
                        + title.height()
                        + 20; // padding
                        d.container.animate(
                        {
                            height: h
                        }, 
                        200,
                        function () {
                            $("div.close", self.container).show();
                            $("#activity-modal-data", self.container).show();
                          
                        }
                        );
                    }, 300);
                });
            })
        },
        close: function (d) {

            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {
                temp_my_all_tags= $("#my_all_tags").clone();
                temp_place_tags_input = $("#place_tags_input").attr("value")
                //                                        alert(temp_my_all_tags.html())
                //                                        alert($("#place_tags_input").attr("value"))
                                        
                self.close(); // or $.modal.close();
                $("#my_all_tags").html(temp_my_all_tags.html())
                $("#place_tags_input").attr("value",temp_place_tags_input)
                                        
            }
            );
        }
    };

    OSX4.init();
    
    
    //活动
    OSX5 = {
        container: null,
        init: function () {
            $("#dream").click(function (e) {
                e.preventDefault();	

                $("#dream-modal-content").modal({
                    overlayId: 'dream-overlay',
                    containerId: 'dream-container',
                    closeHTML: null,
                    minHeight: 200,
                    opacity: 65, 
                    position: ["0",],
                    overlayClose: false,
                    autoResize:true,
                    onOpen: OSX5.open,
                    onClose: OSX5.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#dream-modal-content", self.container).show();
                var title = $("#dream-modal-title", self.container);
                title.show();
                    
                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#dream-modal-data", self.container).height()
                        + title.height()
                        + 20; // padding
                        d.container.animate(
                        {
                            height: h
                        }, 
                        200,
                        function () {
                            $("div.close", self.container).show();
                            $("#dream-modal-data", self.container).show();
                          
                        }
                        );
                    }, 300);
                });
            })
        },
        close: function (d) {

            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {
                temp_my_all_tags= $("#my_all_tags").clone();
                temp_place_tags_input = $("#place_tags_input").attr("value")
                //                                        alert(temp_my_all_tags.html())
                //                                        alert($("#place_tags_input").attr("value"))
                                        
                self.close(); // or $.modal.close();
                                        
            }
            );
        }
    };

    OSX5.init();
    

    //地图查看
    OSX6 = {
        container: null,
        init: function () {
            $("#see_all_map").live("click",function (e) {
                e.preventDefault();	

                $("#map-modal-content").modal({
                    overlayId: 'map-overlay',
                    containerId: 'map-container',
                    closeHTML: null,
                    minHeight: 200,
                    maxHeight: 600,
                    opacity: 65, 
                    position: ["0",],
                    overlayClose: true,
                    autoResize:true,
                    onOpen: OSX6.open,
                    onClose: OSX6.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#map-modal-content", self.container).show();
                var title = $("#map-modal-title", self.container);
                title.show();
                fun = function(data, textStatus){
                    if(data.length >0){
                        for (var i=0;i<=data.length-1;i++) 
                        {
                            $("#see_all_streams").prepend(data[i].html)
                        }
        
                    }else{
                        $("#see_all_streams").prepend("<p>没有内容</p>")
                    }

                    d.container.slideDown( function () {
                        setTimeout(function () {
                            var h = $("#map-modal-data", OSX6.container).height()
                            + title.height() + 20;// padding
                            d.container.animate(
                            {
                                height: h
                            }, 
                            200,
                            function () {
                                $("div.close", OSX6.container).show();
                                $("#map-modal-data", OSX6.container).show();
                          
                            }
                            );
                        }, 300);
                    });
                }
                
                
                MapObject.reflesh(false,fun);  
               
            })
        },
        close: function (d) {

            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {                             
                self.close(); // or $.modal.close();
                                        
            }
            );
        }
    };

    OSX6.init();
   
   

    //发表图片窗口
    PIC = {
        container: null,
        init: function () {
            $("#share-picture-icon").click(function (e) {
                e.preventDefault();

                $("#pic-modal-content").modal({
                    overlayId: 'pic-overlay',
                    containerId: 'pic-container',
                    closeHTML: null,
                    minHeight: 200,
                    maxHeight: 600,
                    opacity: 65,
                    position: [$(window).height()/2-100 ,],
                    overlayClose: true,
                    autoResize:true,
                    onOpen: PIC.open,
                    onClose: PIC.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#pic-modal-content", self.container).show();
                var title = $("#pic-modal-title", self.container);
                title.show();

                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#pic-modal-data", PIC.container).height()
                        + title.height()+ 77;// padding
                        d.container.animate(
                        {
                            height: h
                        },
                        200,
                        function () {
                            $("div.close", PIC.container).show();
                            $("#pic-modal-data", PIC.container).show();
                            $(".location_info").hide();
                            editor_pic = new baidu.editor.ui.Editor({
                                toolbars:[
                                ['Bold','Italic','Underline','|','strikethrough','FontSize','ForeColor','BackColor','|','MultiMenu'  ]
                                ],
                                autoClearinitialContent:true,
                                initialContent: '',
                                elementPathEnabled:false,
                                textarea: 'picture[photo_text]'
                            });
                            editor_pic.render('editor_pic');  //editor为编辑器容器的id
                        }
                        );
                    }, 300);
                });
            })
        },
        close: function (d) {
            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {
                self.close();
            }
            );
        }
    };

    PIC.init();


    //发表视频窗口
    VIDEO = {
        container: null,
        init: function () {
            $("#share-video-icon").click(function (e) {
                e.preventDefault();

                $("#video-modal-content").modal({
                    overlayId: 'video-overlay',
                    containerId: 'video-container',
                    closeHTML: null,
                    minHeight: 200,
                    maxHeight: 600,
                    opacity: 65,
                    position: [$(window).height()/2-100 ,],
                    overlayClose: true,
                    autoResize:true,
                    onOpen: VIDEO.open,
                    onClose: VIDEO.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#video-modal-content", self.container).show();
                var title = $("#video-modal-title", self.container);
                title.show();

                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#video-modal-data", VIDEO.container).height()
                        + title.height()+20;// padding
                        d.container.animate(
                        {
                            height: h
                        },
                        200,
                        function () {
                            $("div.close", VIDEO.container).show();
                            $("#video-modal-data", VIDEO.container).show();
                            $(".location_info").hide();
                            editor_video = new baidu.editor.ui.Editor({
                                toolbars:[
                                ['Bold','Italic','Underline','|','strikethrough','FontSize','ForeColor','BackColor','|','MultiMenu'  ]
                                ],
                                autoClearinitialContent:true,
                                initialContent: '',
                                elementPathEnabled:false,
                                textarea: 'video[desc]'
                            });
                            editor_video.render('video_desc');  //editor为编辑器容器的id
                        }
                        );
                    }, 300);
                });
            })
        },
        close: function (d) {
            var self = this; // this = SimpleModal object
            d.container.animate(
            {
                top:"-" + (d.container.height() + 20)
            },
            500,
            function () {
                self.close();
            }
            );
        }
    };

    VIDEO.init();
 
    


});










//ajax 省市查询效果 和全站 marker搜索js
function InputSuggest(opt){
    this.win = null;
    this.doc = null;
    this.url = opt.url||"/addresses/search_address";
    this.container = null;
    this.items = null;
    this.dataType = 'simple'; //查询类型，包括基本的省市信息查询和网站整体的marker查询
    this.ajaxing = false;
    this.last_ajax_time = null; //每隔一段时间才去AJAX请求
    this.input = opt.input || null;
    this.containerCls = opt.containerCls || 'suggest-container';
    this.itemCls = opt.itemCls || 'suggest-item';
    this.activeCls = opt.activeCls || 'suggest-active';
    this.width = opt.width;
    this.opacity = opt.opacity;
    this.data = opt.data || [];
    this.active = null;
    this.visible = false;
    this.init();
}
InputSuggest.prototype = {
    init: function(){
        this.win = window;
        this.doc = window.document;
        this.container = this.$C('div');
        this.attr(this.container, 'class', this.containerCls);
        this.doc.body.appendChild(this.container);
		
        var _this = this, input = this.input;

        this.on(input,'keyup',function(e){
            if(input.value==''){
                _this.hide();
            }else{
                _this.onKeyup(e);
            }

        });
                
        this.on(input,'focus',function(e){
	
            _this.onfocus(e);
			

        });
                
                
        // blur会在click前发生，这里使用mousedown
        this.on(input,'blur',function(e){
            _this.hide();
        });
        this.onMouseover();
        this.onMousedown();
        this.setPos();

    },
    $C: function(tag){
        return this.doc.createElement(tag);
    },
    getPos: function (el){

        var target = el;
        var pos = [target.offsetLeft, target.offsetTop];
    
        var target = target.offsetParent;
        while (target)
        {
            pos[0] += target.offsetLeft;
            pos[1] += target.offsetTop;
        
            target = target.offsetParent
        }
   
        return pos;


    },
    setPos: function(){
        var input = this.input,
        pos = this.getPos(input),
        brow = this.brow,
        width = this.width,
        opacity = this.opacity,
        container = this.container;
        container.style.cssText =
        'position:absolute;overflow:hidden;left:'
        + pos[0] + 'px;top:'
        + (pos[1]+input.offsetHeight) + 'px;width:'
        // IE6/7/8/9/Chrome/Safari input[type=text] border默认为2，Firefox为1，因此取offsetWidth-2保证与FF一致
        + (brow.firefox ? input.clientWidth : input.offsetWidth-2) + 'px;';
        if(width){
            container.style.width = width + 'px';
        }
        if(opacity){
            if(this.brow.ie){
                container.style.filter = 'Alpha(Opacity=' + opacity * 100 + ');';
            }else{
                container.style.opacity = (opacity == 1 ? '' : '' + opacity);
            }
        }
    },
    show: function(){
        this.container.style.visibility = 'visible';
        this.visible = true;
    },
    hide: function(){
        this.container.style.visibility = 'hidden';
        this.visible = false;
    },
    attr: function(el, name, val){
        if(val === undefined){
            return el.getAttribute(name);
        }else{
            el.setAttribute(name,val);
            name=='class' && (el.className = val);
        }
    },
    on: function(el, type, fn){
        el.addEventListener ? el.addEventListener(type, fn, false) : el.attachEvent('on' + type, fn);
    },
    un: function(el, type, fn){
        el.removeEventListener ? el.removeEventListener(type, fn, false) : el.detachEvent('on' + type, fn);
    },
    brow: function(ua){
        return {
            ie: /msie/.test(ua) && !/opera/.test(ua),
            opera: /opera/.test(ua),
            firefox: /firefox/.test(ua)
        };
    }(navigator.userAgent.toLowerCase()),
    onKeyup: function(e){
        // this.setPos();
        var container = this.container, input = this.input, iCls = this.itemCls, aCls = this.activeCls;
        if(this.visible){
                    
            switch(e.keyCode){
                case 13: // Enter
                    if(this.active){
                        input.value = this.active.firstChild.data;
                        this.hide();
                    }
                    return;
                case 38: // 方向键上
                    if(this.active==null){
                        this.active = container.lastChild;
                        this.attr(this.active, 'class', aCls);
                        input.value = this.active.firstChild.data;
                    }else{
                        if(this.active.previousSibling!=null){
                            this.attr(this.active, 'class', iCls);
                            this.active = this.active.previousSibling;
                            this.attr(this.active, 'class', aCls);
                            input.value = this.active.firstChild.data;
                        }else{
                            this.attr(this.active, 'class', iCls);
                            this.active = null;
                            input.focus();
                            input.value = input.getAttribute("curr_val");
                        }
                    }
                    return;
                case 40: // 方向键下
                    if(this.active==null){
                        this.active = container.firstChild;
                        this.attr(this.active, 'class', aCls);
                        input.value = this.active.firstChild.data;
                    }else{
                        if(this.active.nextSibling!=null){
                            this.attr(this.active, 'class', iCls);
                            this.active = this.active.nextSibling;
                            this.attr(this.active, 'class', aCls);
                            input.value = this.active.firstChild.data;
                        }else{
                            this.attr(this.active, 'class', iCls);
                            this.active = null;
                            input.focus();
                            input.value = input.getAttribute("curr_val");
                        }
                    }
                    return;

            }
        }
        if(e.keyCode==27){ // ESC键
            this.hide();
            input.value = this.attr(input,'curr_val');
            return;
        }
                
        if(input.value.indexOf('@')!=-1){
            return;
        }
        this.items = [];
        if(this.attr(input,'curr_val')!=input.value){
            this.getDataFromService(this,input)
        }
    },
        
        
    onfocus: function(e){
        this.items = [];
        this.getDataFromService(this,this.input)
    },
        

    //从后台获取省市搜索信息
    getDataFromService: function(obj,input){
        obj.ajaxing = true;
        now = (new   Date()).getTime()
        if (obj.last_ajax_time !=null && eval(now - obj.last_ajax_time)<'500'){
            return
        }
        obj.last_ajax_time = now
        this.setPos();
        $.ajax({
            type: "POST",
            url: obj.url +"?type="+obj.dataType+"&key="+input.value,
            success: function(message){
                obj.data = message.data;
                obj.container.innerHTML = '';
                if ( obj ==null){
                    this.ajaxing =false
                    return 
                }
                for(var i=0,len=obj.data.length;i<len;i++){
                    var item = obj.$C('div');
                    obj.attr(item, 'class', obj.itemCls);
                    item.innerHTML =  obj.data[i];
                    obj.items[i] = item;
                    obj.container.appendChild(item);
                }
                if (obj.data.length>0){
                    obj.attr(input,'curr_val',input.value);
                    obj.show();   
                }
                this.ajaxing =false
			
            }
        });

    },
    onMouseover: function(){
        var _this = this, icls = this.itemCls, acls = this.activeCls;
        this.on(this.container,'mouseover',function(e){
            var target = e.target || e.srcElement;
            if(target.className == icls){
                if(_this.active){
                    _this.active.className = icls;
                }
                target.className = acls;
                _this.active = target;
            }
        });
    },
    onMousedown: function(){
        var _this = this;
        this.on(this.container,'mousedown',function(e){
            var target = e.target || e.srcElement;
            _this.input.value = target.innerHTML;
            _this.hide();
        });
    }
}






//发表状态 start

$(".is_location").live("change",function(){
    if($(this).attr("checked")==true){
        $(".location_info").show();

        $(".is_location").attr("checked",true)
        if(MapObject.myLocation){
            $(".marker_geocode_position").attr("value",  MapObject.myLocation_address);
            $(".marker_marker_latitude").attr("value",  MapObject.myLocation.lat );
            $(".marker_marker_longitude").attr("value",  MapObject.myLocation.lng);
        }

    }else{
        $(".location_info").hide();
        $(".marker_geocode_position").attr("value", '');
        $(".marker_marker_latitude").attr("value",  "");
        $(".marker_marker_longitude").attr("value",  "");
    }

})

$(".marker_geocode_position").live("change",function(){
    if($(this).attr("value")!=MapObject.myLocation_address){
        $(".marker_marker_latitude").attr("value",  "");
        $(".marker_marker_longitude").attr("value",  "");
    }else{
        if(MapObject.myLocation){
            $(".marker_marker_latitude").attr("value",  MapObject.myLocation.lat);
            $(".marker_marker_longitude").attr("value",  MapObject.myLocation.lng);
        }

    }
})


  


function ajaxFileUpload_file(){
    url = ""
    text = editor_pic.getContent()
    if($(".is_location").attr("checked") ==true){
        url = "?album="+$("#album").val() +"&photo_text="+text+
        "&marker[geocode_position]="+$(".marker_geocode_position").val()+
        "&marker[marker_latitude]="+$(".marker_marker_latitude").val()+
        "&marker[marker_longitude]="+$(".marker_marker_longitude").val()
    }else{
        url = "?album="+$("#album").val() +"&photo_text="+text
    }

    $.ajaxFileUpload({
        url:'/pictures/'+url,
        secureuri:false,
        dataType: 'json',
        fileElementId:'pictures_',
        success: function (data,status){
            if(data && data.success==true){
                $("#share-picture").resetForm();
                $("#marker_geocode_position").attr("value", '');
                $("#marker_destin_position").attr("value", '')
                $("#update_pic_notice").html(data.notice)
                $("#update_pic_notice").show()
                $('#update_pic_notice').fadeOut(15000);
                editor_pic.setContent("");
                for (var i=0;i<=data.html.length-1;i++) {
                    $.ajax({
                        type: "GET",
                        url: "/pictures/get_stream_item",
                        data:"pic_id="+data.html[i].pic_id+"&marker_id="+data.html[i].marker_id,
                        success: function(){
                        }
                    });
                }
            }else{
        //  alert("文件保存失败1")
        }
        },
        error: function (data, status, e){
             $("#update_pic_notice").html('文件保存失败')
                $("#update_pic_notice").show()
                $('#update_pic_notice').fadeOut(15000);
        }
    })
    return false;
}


//发表状态 end










function observeFields(func, frequency, fields) {
    observeFieldsValueMap = window.observeFieldsValueMap || {};
    $.each(fields, function(index, field){
        observeFieldsValueMap[field] = $('#'+field).val();
    });
    var observer = function() {
        var changed = false;
        for(var f in observeFieldsValueMap) {
            var currentValue = $('#'+f).val();
            if(observeFieldsValueMap[f] != currentValue) {
                observeFieldsValueMap[f] = currentValue;
                changed = true;
            }
        }
        if(changed) func(f);
    };
    setInterval(observer, frequency);
};

function custom_select_val(select_elm, prompt_text){
    if(val = prompt(prompt_text, '')) {
        var option = $('<option/>');
        option.val(val);
        option.html(val);
        option.attr('selected', true);
        option.appendTo(select_elm);
        return true;
    } else {
        return false;
    }
};

function shareSomething(hash) {
    $('#share').dialog('open');
    $('#share-something').hide();
    $('#map-container').hide();
    $('#group-details').hide();
}

$('#share_picture_form').live('submit', function(){
    if($('#album_id').val() == '!') {
        return custom_select_val($('#album_id'), $('#share_picture_form').attr('data-album-prompt'));
    }
});

if(location.hash != '') {
    window.after_tab_setup = function() {
        shareSomething(location.hash.replace(/#/, ''));
    };
}

function setupMenu(selector, contentSelector) {
    $(selector).qtip({
        content: $(contentSelector).html(),
        show: {
            delay: 0,
            when: {
                event: 'mouseover'
            },
            effect: {
                type: 'slide'
            }
        },
        hide: {
            delay: 500,
            fixed: true,
            when: {
                event: 'mouseout'
            }
        },
        style: {
            name: 'light',
            tip: navigator.userAgent.match(/mobile/i) ? 'topLeft' : 'topMiddle'
        },
        position: {
            corner: {
                target: 'bottomMiddle',
                tooltip: navigator.userAgent.match(/mobile/i) ? 'topLeft' : 'topMiddle'
            }
        }
    });
}

function setupMenus() {
    if($('#home-tab-menu').length == 1) {
        setupMenu('#home-tab', '#home-tab-menu');
    }
    if($('#profile-tab-menu').length == 1) {
        setupMenu('#profile-tab', '#profile-tab-menu');
    }
    if($('#group-tab-menu').length == 1) {
        setupMenu('#group-tab', '#group-tab-menu');
    }
    if($('#marker-tab-menu').length == 1) {
        setupMenu('#new-marker-tab', '#marker-tab-menu');
    }
    if($('#posittion-tab-menu').length == 1) {
        setupMenu('#posittion-tab', '#posittion-tab-menu');
    }
    if($('#activities-tab-menu').length == 1) {
        setupMenu('#activities-tab', '#activities-tab-menu');
    }
}

$(setupMenus);

$(function(){
    $('input[placeholder]').focus(function(){
        var i = $(this);
        var p = i.attr('placeholder');
        if(i.val() == p) {
            i.val('');
            i.removeClass('defaulted');
        }
    }).blur(function(){
        var i = $(this);
        var p = i.attr('placeholder');
        if(i.val() == '') {
            i.val(p);
            i.addClass('defaulted');
        }
    }).trigger('blur');
});














//一些加載文檔后執行的js
$(document).ready(function() {
    //添加和刪除關注place
    $(".follow_link").live("click",function(){
        link = $(this)
        marker_id =link.attr("marker_id")
        marker_type = link.attr("marker_type")
        action = link.attr("action")
        $.ajax({
            type: "post",
            url: "/markers/follow?marker_id="+marker_id +"&do="+action +"&marker_type="+marker_type ,
            success: function(message){
                if(message.success ==true){
                    if(action=='add'){
                        link.attr("action",'cancer')
                        link.html("取消关注")
                        link.attr("data-confirm","真的要取消关注")
                    }else{
                        link.attr("action",'add')
                        link.html("添加关注")
                        link.removeAttr("data-confirm")
                    }
                }
            }
        });
    });


    $(".location_now").tooltip({
        position: 'bottom center ',  
        delay: 50
    });

    

    $("#invite_friends").click(function(){
        friend_ids = ""
        actiity_id = $("#new_dream").attr("dream_id")
        $.each($(".select_friends"), function(){
            if($(this).attr("checked")==true){
                friend_ids += ($(this).attr("friend_id")+",")
            }
        })
        if(friend_ids!="" && actiity_id!= null){
            $.ajax({                                                
                type: "GET",                                    
                url: "/activities/invite_friend?dream_id="+actiity_id+"&friends_ids="+friend_ids,
                success: function(data, textStatus){
                    $("#update_notice").html("邀请已发出")
                    $("#update_notice").show()
                    $('#update_notice').fadeOut(15000);
                } 
            });
        }else{
            $("#update_notice").html("请选择好友")
            $("#update_notice").show()
            $('#update_notice').fadeOut(15000);
        }
    });
    

$.easing.drop = function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};

    $("img[rel]").overlay({
        effect: 'drop',
        mask: '#789',
        fixed:false
    });
//// loading animation
$.tools.overlay.addEffect("drop", function(css, done) {
    // use Overlay API to gain access to crucial elements
    var conf = this.getConf(),
    overlay = this.getOverlay();

    // determine initial position for the overlay
    if (conf.fixed)  {
        css.position = 'fixed';
    } else {
        css.top += $(window).scrollTop();
        css.left += $(window).scrollLeft();
        css.position = 'absolute';
    }

    // position the overlay and show it
    overlay.css(css).show();

    // begin animating with our custom easing
    overlay.animate({
        top: '+=55',
        opacity: 1,
        width: '+=20'
    }, 400, 'drop', done);

/* closing animation */
}, function(done) {
    this.getOverlay().animate({
        top:'-=55',
        opacity:0,
        width:'-=20'
    }, 300, 'drop', function() {
        $(this).hide();
        done.call();
    });
}
);



})