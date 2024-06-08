(function($) {
    var $window = $(window),
        $body = $('body'),
        $main = $('#main'),
        $nav = $('#nav');

    // Define breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Remove preload class after page load.
    $window.on('load', function() {
        setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Navigation and section handling.
    if ($nav.length > 0) {
        var $navLinks = $nav.find('a');

        // Apply shrink effect on scroll.
        $main.scrollex({
            mode: 'top',
            enter: () => $nav.addClass('alt'),
            leave: () => $nav.removeClass('alt')
        });

        // Smooth scrolling for navigation links.
        $navLinks.scrolly({
            speed: 1000,
            offset: () => $nav.height()
        }).on('click', function() {
            var $this = $(this);
            if ($this.attr('href').charAt(0) != '#') return;

            $navLinks.removeClass('active active-locked');
            $this.addClass('active active-locked');
        });

        // Set up section transitions.
        $navLinks.each(function() {
            var $this = $(this),
                $section = $($(this).attr('href'));

            if ($section.length) {
                $section.scrollex({
                    mode: 'middle',
                    initialize: () => {
                        if (browser.canUse('transition')) $section.addClass('inactive');
                    },
                    enter: () => {
                        $section.removeClass('inactive');
                        if (!$navLinks.filter('.active-locked').length) {
                            $navLinks.removeClass('active');
                            $this.addClass('active');
                        } else if ($this.hasClass('active-locked')) {
                            $this.removeClass('active-locked');
                        }
                    }
                });
            }
        });
    }

    // Apply smooth scroll to all '.scrolly' elements.
    $('.scrolly').scrolly({ speed: 1000 });

})(jQuery);