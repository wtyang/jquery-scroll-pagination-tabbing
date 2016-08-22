/*
**	Anderson Ferminiano
**	contato@andersonferminiano.com -- feel free to contact me for bugs or new implementations.
**	jQuery ScrollPagination
**	28th/March/2011
**	http://andersonferminiano.com/jqueryscrollpagination/
**	You may use this script for free, but keep my credits.
**	Thank you.
**  
**  Chang by Tianyang @2016-8-22  debug tabbing scroll feature
*/

(function( $ ){
	 
		 
 $.fn.scrollPagination = function(options) {
  	
		var opts = $.extend($.fn.scrollPagination.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null){
			target = obj; 
	 	}
		opts.scrollTarget = target;
	 
		return $.fn.scrollPagination.init(target,opts.options);

  };
  
  $.fn.stopScrollPagination = function(){
	  return this.each(function() {
	 	$(this).attr('scrollPagination', 'disabled');
	  });
	  
  };
  
  $.fn.scrollPagination.loadContent = function(target,obj, opts){
	 var mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(document).height() - $(target).height();
	 if (mayLoadContent){
		 if (opts.beforeLoad != null){
			opts.beforeLoad(); 
		 }
		 $(obj).children().attr('rel', 'loaded');
		 $.ajax({
			  type: 'POST',
			  url: opts.contentPage,
			  data: opts.contentData,
			  success: function(data){
				$(obj).append(data); 
				var objectsRendered = $(obj).children('[rel!=loaded]');
				
				if (opts.afterLoad != null){
					opts.afterLoad(objectsRendered);	
				}
			  },
			  dataType: 'html'
		 });
	 }
	 
  };
  
  $.fn.scrollPagination.init = function(target,opts){
	 $(opts).each(function(i,e){

	 	$(opts[i].element).attr('scrollPagination', 'enabled');
	 })
	 $(target).scroll(function(event){
	 	var obj = $(opts[curtab].element);
		if ($(obj).attr('scrollPagination') == 'enabled'){
	 		$.fn.scrollPagination.loadContent(target,obj, opts[curtab]);		
		}
		else {
			event.stopPropagation();	
		}
	 });
	 
	 $.fn.scrollPagination.loadContent(target,$(opts[curtab].element), opts[curtab]);
	 
 };
	
 $.fn.scrollPagination.defaults = {
      	 'scrollTarget': $(window),
            'options':[{
                'element':'',
                'contentPage': '',
                'contentData': {},
                'heightOffset': 10, 
                'beforeLoad': function() { 
                    $('#loading').fadeIn();
                },
                'afterLoad': function(elementsLoaded) { // after loading content, you can use this function to animate your new elements
                    $('#loading1').fadeOut();
                    $(elementsLoaded).fadeInWithDelay();
                    if ($('#content1').children().size() > 100) { // if more than 100 results already loaded, then stop pagination (only for testing)
                        $('#nomoreresults1').fadeIn();
                        $('#content1').stopScrollPagination();
                    }
                }
            }],	  
 };	
})( jQuery );