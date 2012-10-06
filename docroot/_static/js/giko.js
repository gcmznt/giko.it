(function($) {

    $(document).ready(function(){

        $('[rel=tooltip]').each(function() {
            var pos = $(this).attr('data-placement');
            $(this).tooltip({'placement': pos});
        });

        $("#mainContent a[href^='http']").not("a[href^='http://www.giko.it']").each(function() {
            $(this).css({
                'background': "url(http://g.etfv.co/" + this.href + ") right center no-repeat",
                "padding-right": "20px"
            });
        });

        $('.twitter').each(function(){
            var tag = $(this).attr('data-tag');
            var el = $(this);
            var url = 'http://search.twitter.com/search.json?q=from%3Agiko15';
            if (tag != '') {
                url = 'http://search.twitter.com/search.json?q=%23' + tag + '+from%3Agiko15';
            }
            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: function(data) {
                    el.append('<p><a href="http://twitter.com/giko15">' + data.results[0].text + '</a></p>');
                    el.append('<date>' + parseTwitterDate(data.results[0].created_at) + '</date>');
                }
            });
        });

    });

})(jQuery);

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

function parseTwitterDate($stamp)
{       
// convert to local string and remove seconds and year //       
    // var date = new Date(Date.parse($stamp)).toLocaleString().substr(0, 16);
// get the two digit hour //
    // var hour = date.substr(-5, 2);
// convert to AM or PM //
    // var ampm = hour<12 ? ' AM' : ' PM';
    // if (hour>12) hour-= 12;
    // if (hour==0) hour = 12;
// return the formatted string //
    return new Date(Date.parse($stamp)).toLocaleString();
    // return date.substr(0, 11)+' • ' + hour + date.substr(13);
}
