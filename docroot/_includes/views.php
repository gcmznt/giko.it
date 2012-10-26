<?php

    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;



    $home = function () use ($silex, $twig, $context) {

        // if (isset($_GET['debug'])) {
        //     if ($_GET['debug'] == 'true') {
        //         $date_of_expiry = time() + 60 * 60 * 24 * 365 * 10;
        //         var_dump( setcookie("debug", "active", $date_of_expiry, "/", $_SERVER['SERVER_NAME']) );
        //     } else if ($_GET['debug'] == 'false') {
        //         $date_of_expiry = time() - 60;
        //         setcookie("debug", "active", $date_of_expiry, "/", "giko.it" );
        //     }
        // }

        require_once(__DIR__ . '/../wordpress/wp-load.php');

        $context['tags']['tchouk'] = get_category_tags(get_category_by_slug('tchouk')->term_id);
        $context['tags']['web'] = get_category_tags(get_category_by_slug('web')->term_id);
        $page = $twig->render("home.html", $context);
        return new Response($page, 200);
    };


    $portfolio = function () use ($silex, $twig, $context) {
        require_once(__DIR__ . '/../wordpress/wp-load.php');

        $context['pagetitle'] = 'Portfolio';
        $context['category'] = 'web';
        $context['mainimg'] = 'web';
        $context['tags'] = get_category_tags(get_category_by_slug('web')->term_id);
        $context['pretitle'] = 'Portfolio';
        $page = $twig->render("gallery.html", $context);
        return new Response($page, 200);
    };

    $eventi = function () use ($silex, $twig, $context) {
        $context['items'] = array(
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2002-wtc.jpg',
                'text' => 'World TchoukBall Championship @Loughborough',
                'anno' => '2002',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2003-etc.jpg',
                'text' => 'European TchoukBall Championship @Rimini',
                'anno' => '2003',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2005-beach.jpg',
                'text' => 'Rimini Beach TchoukBall Festival',
                'anno' => '2005',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2007-champ.jpg',
                'text' => 'Primo campionato italiano',
                'anno' => '2007',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2007-ref.jpg',
                'text' => 'Arbitro internazionale',
                'anno' => '2007',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2007-wu.jpg',
                'text' => 'Warm-up Game @Kaohsiung',
                'anno' => '2007',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2008-gikos.jpg',
                'text' => "Il mio tiro: il Giko's",
                'anno' => '2008',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2008-nf.jpg',
                'text' => 'Allenatore della nazionale femminile',
                'anno' => '2008',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2008-ewc.jpg',
                'text' => "European Winners' Cup @Ferrara",
                'anno' => '2008',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2008-champ.jpg',
                'text' => 'Campionato italiano',
                'anno' => '2008',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2008-etc.jpg',
                'text' => 'European TchoukBall Championship @Usti nad Labem',
                'anno' => '2008',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2009-ewc.jpg',
                'text' => "European Winners' Cup @Losanna",
                'anno' => '2009',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2009-champ.jpg',
                'text' => 'Campionato italiano',
                'anno' => '2009',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2009-limbiate.jpg',
                'text' => 'Supereroi al torneo sotto le stelle di Limbiate',
                'anno' => '2009',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2010-ewc.jpg',
                'text' => "European Winners' Cup @Saronno",
                'anno' => '2010',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2010-champ.jpg',
                'text' => 'Campionato italiano',
                'anno' => '2010',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2010-etc.jpg',
                'text' => 'European TchoukBall Championship @Hereford',
                'anno' => '2010',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2010-etc-f-2.jpg',
                'text' => 'European TchoukBall Championship @Hereford',
                'anno' => '2010',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2011-ewc.jpg',
                'text' => "European Winners' Cup @Wels",
                'anno' => '2011',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2011-champ.jpg',
                'text' => 'Campionato italiano',
                'anno' => '2011',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2011-wtc.jpg',
                'text' => 'World TchoukBall Championship @Ferrara',
                'anno' => '2011',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2011-wtc-f.jpg',
                'text' => 'World TchoukBall Championship @Ferrara',
                'anno' => '2011',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2012-ewc.jpg',
                'text' => "European Winners' Cup @L&aacute;zně Bělohrad e Nov&aacute; Paka",
                'anno' => '2012',
            ),
            array(
                'image' => $context['STATIC_URL'] . 'img/tchouk/2012-champ.jpg',
                'text' => 'Campionato italiano',
                'anno' => '2012',
            ),
        );

        $context['pagetitle'] = 'Eventi';
        $context['category'] = 'tchouk';
        $context['mainimg'] = 'tchouk';
        $context['pretitle'] = 'Eventi';
        $page = $twig->render("gallery.html", $context);
        return new Response($page, 200);
    };


    $blog = function ($category = '', $tag = '', $search = '') use ($silex, $twig, $context) {
        require_once(__DIR__ . '/../wordpress/wp-load.php');

        $context['mainimg'] = 'profile';

        if ($tag != '') {
            $query = array(
                'numberposts' => 10,
                'order' => 'DESC',
                'orderby' => 'post_date',
                'tag' => $tag,
                'cat' => get_category_by_slug($category)->term_id,
            );
            $context['pretitle'] = $tag;
            $context['filtertag'] = $tag;
        } else if ($search != '') {
            $query = array(
                'cat' => get_category_by_slug($category)->term_id,
                's' => $search,
            );
            $context['pretitle'] = 'Hai cercato ' . $search;
            $context['search'] = $search;
        } else {
            $query = array(
                'numberposts' => 10,
                'order' => 'DESC',
                'orderby' => 'post_date',
                'cat' => get_category_by_slug($category)->term_id,
            );
            $context['pretitle'] = '#' . $category . ' blog';
        }

        $context['tags'] = get_category_tags(get_category_by_slug($category)->term_id);
        $context['category'] = $category;
        $context['mainimg'] = $category;
        $context['posts'] = get_context_post($query);

        $page = $twig->render("blog.html", $context);
        return new Response($page, 200);
    };

    $blogpost = function ($name = '') use ($silex, $twig, $context) {

        $context['posts'] = get_context_post(array(
            'name' => $name,
        ));

        $context['post'] = $context['posts'][0];
        $context['category'] = $context['post']['categories'][0]->name;
        $context['tags'] = get_category_tags(get_category_by_slug($context['category'])->term_id);
        $context['pretitle'] = html_entity_decode($context['post']['title']);
        $context['mainimg'] = $context['category'];

        $page = $twig->render("blog-post.html", $context);
        return new Response($page, 200);
    };


