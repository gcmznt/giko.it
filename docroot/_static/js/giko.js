(function($) {

    $(document).ready(function(){

        $('[rel=tooltip]').each(function() {
            var pos = $(this).attr('data-placement');
            $(this).tooltip({'placement': pos});
        });

        $("#mainContent a[href^='http']").not("a[href^='http://www.giko.it']").each(function() {
            var domain = parseUri($(this).attr('href'));
            $(this).after(' [<i class="icon-share-alt"></i> <small>' + domain.host + '</small>]');
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

function parseTwitterDate(stamp) {       
    return new Date(Date.parse(stamp)).toLocaleString();
}



// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
function parseUri (str) {
    var o   = parseUri.options,
        m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i   = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseUri.options = {
    strictMode: false,
    key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
    q:   {
        name:   "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

