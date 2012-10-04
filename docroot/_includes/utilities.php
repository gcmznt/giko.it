<?php

function get_context_post($conf = array()) {
    require_once(__DIR__ . '/../wordpress/wp-load.php');

    query_posts($conf);
    $posts = array();
    if (have_posts()):
        while (have_posts()):
            the_post();
            $post = array();
            $post['date'] = get_the_time('y m d');
            $post['name'] = sanitize_title(get_the_title());
            $post['title'] = get_the_title();
            $post['abstract'] = substr(strip_tags(get_the_content()), 0, 450);
            if (strlen($post['abstract']) >= 450) $post['abstract'] .= '...';
            $post['short_abstract'] = substr(strip_tags(get_the_content()), 0, 50);
            if (strlen($post['short_abstract']) >= 50) $post['short_abstract'] .= '...';
            $post['categories'] = get_the_category();
            $post['tags'] = get_the_tags();
            $post['content'] = apply_filters('the_content', get_the_content());
            $post['next'] = get_next_post(true);
            $post['prev'] = get_previous_post(true);
            $posts[] = $post;
        endwhile;
    endif;

    return $posts;
}
