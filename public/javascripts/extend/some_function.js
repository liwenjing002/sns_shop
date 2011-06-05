jQuery(function ($) {
	var OSX = {
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
							{height: h}, 
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
				{top:"-" + (d.container.height() + 20)},
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

	OSX.init();

});