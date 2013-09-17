(function($) {

    $(document).ready(function(){

        $('.rank').each(function() {
            var val = parseInt($(this).text(), 10);
            $(this).text('');
            for (var i = val; i > 0; i--) {
                $(this).prepend('<span>' + i + '</span>');
            };
        });

        $("#mainContent a[href^='http']").not("a[href^='http://" + location.hostname + "']").each(function() {
            if ($(this).find('img').length === 0) {
                $(this).after(' <span class="explainlink">[<i class="icon-share-alt"></i> <small>' + this.hostname + '</small>]</span>');
            }
        });

        $('.form-search').submit(function() {
            var search = $(this).find('input.search-query').val();
            if (search !== '') {
                location.href = $(this).attr('action') + encodeURIComponent(search) + "/";
            }
            return false;
        });

        // $('#da-thumbs > li').hoverdir();

        // $("img.lazy").show().lazyload({
        //     effect: "fadeIn"
        // });

        $('.twitter').each(function(){
            var tag = $(this).attr('data-tag');
            var el = $(this);
            var url = 'http://search.twitter.com/search.json?q=from%3Agiko15';
            if (tag !== '') {
                url = 'http://search.twitter.com/search.json?q=%23' + tag + '+from%3Agiko15';
            }
            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: function(data) {
                    el.append('<p><a href="http://twitter.com/giko15">' + data.results[0].text + '</a></p>');
                    var date = new Date(Date.parse(data.results[0].created_at)).toLocaleString();
                    el.append('<date>' + date + '</date>');
                }
            });
        });

        if ($('#disqus_thread').length > 0) {
            /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
            var disqus_shortname = 'giko'; // required: replace example with your forum shortname

            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
        }

    });

})(jQuery);

