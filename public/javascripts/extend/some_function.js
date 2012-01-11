//ajax 文件上传
jQuery.extend({
	

    createUploadIframe: function(id, uri)
    {
        //create frame
        var frameId = 'jUploadFrame' + id;
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
        if(window.ActiveXObject)
        {
            if(typeof uri== 'boolean'){
                iframeHtml += ' src="' + 'javascript:false' + '"';

            }
            else if(typeof uri== 'string'){
                iframeHtml += ' src="' + uri + '"';

            }	
        }
        iframeHtml += ' />';
        jQuery(iframeHtml).appendTo(document.body);

        return jQuery('#' + frameId).get(0);			
    },
    createUploadForm: function(id, fileElementId, data)
    {
        //create form	
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
        if(data)
        {
            for(var i in data)
            {
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }			
        }		
        var oldElement = jQuery('#' + fileElementId);
        var newElement = jQuery(oldElement).clone();
        jQuery(oldElement).attr('id', fileId);
        jQuery(oldElement).before(newElement);
        jQuery(oldElement).appendTo(form);


		
        //set attributes
        jQuery(form).css('position', 'absolute');
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body');		
        return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()        
        var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
        var io = jQuery.createUploadIframe(id, s.secureuri);
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;		
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
        {
            jQuery.event.trigger( "ajaxStart" );
        }            
        var requestDone = false;
        // Create the request object
        var xml = {}   
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
        {			
            var io = document.getElementById(frameId);
            try 
            {				
                if(io.contentWindow)
                {
                    xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                    xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
                }else if(io.contentDocument)
                {
                    xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                    xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
                }						
            }catch(e)
            {
                jQuery.handleError(s, xml, null, e);
            }
            if ( xml || isTimeout == "timeout") 
            {				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
                    {
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
                {
                    try 

                    {
                        jQuery(io).remove();
                        jQuery(form).remove();	
											
                    } catch(e) 
{
                        jQuery.handleError(s, xml, null, e);
                    }									

                }, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 ) 
        {
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
        {

            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url);
            jQuery(form).attr('method', 'POST');
            jQuery(form).attr('target', frameId);
            if(form.encoding)
            {
                jQuery(form).attr('encoding', 'multipart/form-data');      			
            }
            else
            {	
                jQuery(form).attr('enctype', 'multipart/form-data');			
            }			
            jQuery(form).submit();

        }
        catch(e) 

        {			
            jQuery.handleError(s, xml, null, e);
        }
		
        jQuery('#' + frameId).load(uploadCallback	);
        return {
            abort: function () {}
        };	

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            eval( "data = " + data );
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();
        if(type == "default")
            data = r.responseText;
        return data;
    }
})







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
var Person = null
var OSX = null
var OSX2 = null
var OSX3 = null

jQuery(function ($) {
    
    
    //Person标签窗口
    Person = {
        container: null,
        init: function () {
            $("#person_tag").live("click",function (e) {
                e.preventDefault();	
                $("#person-modal-content").modal({
                    overlayId: 'person-overlay',
                    containerId: 'person-container',
                    closeHTML: null,
                    minHeight: 80,
                    opacity: 65, 
                    position: [0,0],
                    overlayClose: true,
                    onOpen: Person.open,
                    onClose: Person.close
                });
            });
        },
        open: function (d) {
            var self = this;
            self.container = d.container[0];
            d.overlay.fadeIn( function () {

                $("#person-modal-content", self.container).show();
                var title = $("#person-modal-title", self.container);
                title.show();
                d.container.slideDown( function () {
                    setTimeout(function () {
                        var h = $("#person-modal-data", self.container).height()
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
                            $("#person-modal-data", self.container).show();
                            
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

                self.close(); // or $.modal.close();

                                        
            }
            );
        }
    };

    Person.init();
    
    
    
    //标签窗口
    OSX = {
        container: null,
        init: function () {
            $("#1").click(function (e) {
                e.preadd_tagventDefault();	

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
            alert()
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
            $("#share-picture-icon").live("click",function (e) {
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
                        //                            editor_pic = new baidu.editor.ui.Editor({
                        //                                toolbars:[
                        //                                ['Bold','Italic','Underline','|','strikethrough','FontSize','ForeColor','BackColor','|','MultiMenu'  ]
                        //                                ],
                        //                                autoClearinitialContent:true,
                        //                                initialContent: '',
                        //                                elementPathEnabled:false,
                        //                                textarea: 'picture[photo_text]'
                        //                            });
                        //                            editor_pic.render('editor_pic');  //editor为编辑器容器的id
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
            $("#share-video-icon").live("click",function (e) {
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
                        //                            editor_video = new baidu.editor.ui.Editor({
                        //                                toolbars:[
                        //                                ['Bold','Italic','Underline','|','strikethrough','FontSize','ForeColor','BackColor','|','MultiMenu'  ]
                        //                                ],
                        //                                autoClearinitialContent:true,
                        //                                initialContent: '',
                        //                                elementPathEnabled:false,
                        //                                textarea: 'video[desc]'
                        //                            });
                        //                            editor_video.render('video_desc');  //editor为编辑器容器的id
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








function chang_follow(link){
    
        
    marker_id =link.attr("marker_id")
    marker_type = link.attr("marker_type")
    action = link.attr("action")
    if (action == 'cancer'){
        var answer = confirm("真的要取消关注？")
        if (!answer){
            return;
        }
    }
    
    $.ajax({
        type: "post",
        url: "/markers/follow?marker_id="+marker_id +"&do="+action +"&marker_type="+marker_type ,
        success: function(message){
            if(message.success ==true){
                if(action=='add'){
                    link.attr("action",'cancer')
                    link.html("取消关注")
                }else{
                    link.attr("action",'add')
                    link.html("添加关注")
                }
            }
        }
    });
}


//ajax 文件上传



function fileChange(full_path){
    ajaxFileUpload();
}




function ajaxFileUpload(){
    loading();//动态加载小图标
    $.ajaxFileUpload({
        url:'/location/places/add_temp_pic',
        secureuri:false,
        dataType: 'json',
        fileElementId:'fileToUpload_place',
        success: function (data,status){
            if(data && data.success=="true"){
                $("#picture_id").attr("value",data.pic_id)
                $("#temp_pic").attr("src",data.pic_url);
                $("#temp_pic").attr("style","display:");
            }else{
                alert("文件保存失败")
            }
        },
        error: function (data, status, e){
            alert("文件保存失败")
        }
    })
    return false;
}
function loading(){
    $("#loading").ajaxStart(function(){
        $("#loading").show();
        $("#sbumit_button").removeAttr("onclick");

    }).ajaxComplete(function(){
        $("#loading").hide();
        $("#sbumit_button").bind( "click", function() { // 绑定新事件
            $('#new_place_form').submit();
        });
    });
}
function ajaxFileUpload_file_marker(){
    url = "?album="+$("#album").val() +"&photo_text="+$("#photo_text").val()+
    "&marker[geocode_position]="+$("#marker_geocode_position").val()+
    "&marker[marker_latitude]="+$("#marker_marker_latitude").val()+
    "&marker[marker_longitude]="+$("#marker_marker_longitude").val()
    $.ajaxFileUpload({
        url:'/pictures/'+url,
        secureuri:false,
        dataType: 'json',
        fileElementId:'pictures_',
        success: function (data,status){
            if(data && data.success==true){
                $("#notice").html(data.notice)
                $("#notice").show()
                $('#notice').fadeOut(15000);
                $("#share-picture").resetForm();
                $("#marker_geocode_position").attr("value", '');
                $("#marker_destin_position").attr("value", '')
                for (var i=0;i<=data.html.length-1;i++) {
                    $.ajax({
                        type: "GET",
                        url: "/pictures/get_stream_item",
                        data:"pic_id="+data.html[i].pic_id+"&marker_id="+data.html[i].marker_id,
                        success: function(){}
                    });
                }
            }else{
                alert("文件保存失败1")
            }
        },
        error: function (data, status, e){
            alert(data.success)
            alert("文件保存失败2")
        }
    })
    return false;
}
//ajax 文件上传

function getCity(){
    // 创建CityList对象，并放在citylist_container节点内
    var myCl = new BMapLib.CityList({
        container : "citylist_container"
    });

    var x = $('#postition').offset().top+30;

    $(".map_popup").css("top", x);

    // 给城市点击时，添加相关操作
    myCl.addEventListener("cityclick", function(e) {
        // 修改当前城市显示
        document.getElementById("postition").value = e.name;
        //        alert(1)
        // 点击后隐藏城市列表
        document.getElementById("cityList").style.display = "none";
    });

    // 给“城市”链接添加点击操作
    $("#postition").live("click",function() {
        var cl = document.getElementById("cityList");

        if (cl.style.display == "none") {
            cl.style.display = "";
        } else {
            cl.style.display = "none";
        }	
    })


    // 给城市列表上的关闭按钮添加点击操作
    $("#popup_close").live("click",function(){
//        alert()
     document.getElementById("cityList").style.display = "none";
     return false;
    })

}




//一些加載文檔后執行的js
$(document).ready(function() {
    //添加和刪除關注place
    //    $(".follow_link").live("click",function(){
    //        link = $(this)
    //        marker_id =link.attr("marker_id")
    //        marker_type = link.attr("marker_type")
    //        action = link.attr("action")
    //        $.ajax({
    //            type: "post",
    //            url: "/markers/follow?marker_id="+marker_id +"&do="+action +"&marker_type="+marker_type ,
    //            success: function(message){
    //                if(message.success ==true){
    //                    if(action=='add'){
    //                        link.attr("action",'cancer')
    //                        link.html("取消关注")
    //                        link.attr("data-confirm","真的要取消关注")
    //                    }else{
    //                        link.attr("action",'add')
    //                        link.html("添加关注")
    //                        link.removeAttr("data-confirm")
    //                    }
    //                }
    //            }
    //        });
    //    });


    $(function($){ 
        $.datepicker.regional['zh-CN'] = { 
            clearText: '清除', 
            clearStatus: '清除已选日期', 
            closeText: '关闭', 
            closeStatus: '不改变当前选择', 
            prevText: '<上月', 
            prevStatus: '显示上月', 
            prevBigText: '<<', 
            prevBigStatus: '显示上一年', 
            nextText: '下月>', 
            nextStatus: '显示下月', 
            nextBigText: '>>', 
            nextBigStatus: '显示下一年', 
            currentText: '今天', 
            currentStatus: '显示本月', 
            monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'], 
            monthNamesShort: ['一','二','三','四','五','六', '七','八','九','十','十一','十二'], 
            monthStatus: '选择月份', 
            yearStatus: '选择年份', 
            weekHeader: '周', 
            weekStatus: '年内周次', 
            dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'], 
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'], 
            dayNamesMin: ['日','一','二','三','四','五','六'], 
            dayStatus: '设置 DD 为一周起始', 
            dateStatus: '选择 m月 d日, DD', 
            dateFormat: 'yy-mm-dd', 
            firstDay: 1, 
            initStatus: '请选择日期', 
            isRTL: false
        }; 
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']); 
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
        fixed:true
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


    //tool_bar 工具条
    $(".tool_div").hide()
    $(".share").show()
    $(".tool_link").live("click",function(){
        
        person_id = $("#html_person_id").attr("value")
        group_id = $("#html_group_id").attr("value")
        //        个人信息
        if ($(this).attr("type") == "1"){
            $(".tool_bar_div").hide();
            $(".p_info").show()
            $.ajax({                                                
                type: "GET",   
            
                url: "/people/get_profile?id="+person_id
            
            });
        }
        //        分享
        if ($(this).attr("type") == "2"){
            $(".tool_bar_div").hide();
            $(".share").show()
            $.ajax({                                                
                type: "GET",   
            
                url: "/stream?person_id="+person_id
            
            });
        }
        if ($(this).attr("type") == "3"){
            $.ajax({                                                
                type: "GET",                                    
                url: "/albums?person_id="+person_id
            
            });
        }
        if ($(this).attr("type") == "5"){
            $.ajax({                                                
                type: "GET",                                    
                url: "/people/get_friends?person_id="+person_id
            
            });
        }
        if ($(this).attr("type") == "6"){
            $.ajax({                                                
                type: "GET",                                    
                url: "/people/get_all_people?page="+$(this).attr("page")+"&person_id="+person_id
            
            });
        }
        if ($(this).attr("type") == "7" || $(this).attr("link_type")==7){
            conditions = ""
            if($("#group_name").length>0 && $("#group_name").attr("value")!=''){
                conditions +="&name="+$("#group_name").attr("value")
            }
            if($("#category").length>0 && $("#category").attr("value")!=''){
                conditions +="&category="+$("#category").attr("value")
            }
            
            if($(this).attr("all")){
                $.ajax({                                                
                    type: "GET",                                    
                    url: "/groups/?page="+$(this).attr("page")+conditions
            
                });
            }else{
                $.ajax({                                                
                    type: "GET",                                    
                    url: "/groups/?page="+$(this).attr("page")+"&person_id="+person_id+conditions
            
                });
            }
           
           
        }
        //群组介绍
        if ($(this).attr("type") == "8"){
            $(".tool_bar_div").hide();
            $(".p_info").show()
        }
        //群组相册
        if ($(this).attr("type") == "9"){
            $.ajax({
                type: "GET",
                url: "/albums?group_id="+group_id

            });
        }
        //群组成员
        if ($(this).attr("type") == "10"){
            $.ajax({
                type: "GET",
                url: "/groups/get_members?group_id="+group_id

            });
        }
        //群组分享
        if ($(this).attr("type") == "11"){
            $(".tool_bar_div").hide();
            $(".share").show()
            $.ajax({
                type: "GET",
                url: "/stream?group_id="+group_id
            });
        }
        

    })




    //相册封面点击事件
    $(".album_link").live("click",function(){
        $.ajax({                                                
            type: "GET",                                    
            url: "/albums/"+$(this).attr("id")+ "/pictures"
            
        });
    })

})

//锚点平滑

function intval(v)
{
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}
 
// 获取元素信息
function getPos(e)
{
    var l = 0;
    var t  = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent){
        l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
        t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
    t  += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
    return {
        x:l, 
        y:t, 
        w:w, 
        h:h, 
        wb:wb, 
        hb:hb
    };
}
 
// 获取滚动条信息
function getScroll()
{
    var t, l, w, h;
 
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return {
        t: t, 
        l: l, 
        w: w, 
        h: h
    };
}
 
// 锚点(Anchor)间平滑跳转
function scroller(el, duration)
{
    if(typeof el != 'object') {
        el = document.getElementById(el);
    }
 
    if(!el) return;
 
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function(){
        window.clearInterval(z.timer);
        z.timer=null
    };
    z.t=(new Date).getTime();
 
    z.step = function(){
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function(){
                z.scroll(z.p.y, z.p.x)
            },13);
        } else {
            st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
            sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function (t, l){
        window.scrollTo(l, t)
    };
    z.timer = window.setInterval(function(){
        z.step();
    },13);
}


