(function($) {

    $(document).ready(function(){

        $('[rel=tooltip]').each(function() {
            var pos = $(this).attr('data-placement');
            $(this).tooltip({'placement': pos});
        });

    });

})(jQuery);