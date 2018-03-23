(function($) {

    $(document).ready(function() {

        $('.rank').each(function() {
            var val = parseInt($(this).text(), 10);
            $(this).text('');
            for (var i = 0; i < 5; i++) {
                var c = (i < val) ? 'on' : 'off';
                $(this).append('<span class="' + c + '">' + i + '</span>');
            };
        });

        if (window.matchMedia("(min-width: 680px)").matches) {
            $('.header').after('<div class="livetitle"><h2></h2></div>');
            $(window).scroll(function() {
                var sel = 0;
                $('.container h2').each(function(){
                    if ($(this).offset().top < ($(window).scrollTop() + 95)) {
                        $(this).css('visibility', 'hidden');
                        sel = $(this);
                    } else {
                        $(this).css('visibility', 'visible');
                    }
                });
                if (sel == 0) {
                    $('.livetitle').hide();
                } else {
                    $('.livetitle').show();
                    $('.livetitle h2').html(sel.html());
                }
            });
        }

        $('.printme .btn').click(function(e) {
            e.preventDefault();
            window.print();
            return false;
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

