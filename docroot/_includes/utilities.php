<?php

function get_context_post($conf = array()) {
    require_once(__DIR__ . '/../wordpress/wp-load.php');

    query_posts($conf);
    $posts = array();
    if (have_posts()):
        while (have_posts()):
            the_post();
            $post = array();
            $post['date'] = get_the_time('jS F Y');
            $post['name'] = sanitize_title(get_the_title());
            $post['title'] = get_the_title();
            $post['abstract'] = substr(strip_tags(get_the_content()), 0, 450);
            if (strlen($post['abstract']) >= 450) $post['abstract'] .= '...';
            $post['short_abstract'] = substr(strip_tags(get_the_content()), 0, 100);
            if (strlen($post['short_abstract']) >= 100) $post['short_abstract'] .= '...';
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

function get_category_tags($categories) {
    global $wpdb;
    $tags = $wpdb->get_results("
        SELECT DISTINCT terms2.term_id as tag_id, terms2.name as tag_name, terms2.slug as tag_slug
        FROM
            wp_posts as p1
            LEFT JOIN wp_term_relationships as r1 ON p1.ID = r1.object_ID
            LEFT JOIN wp_term_taxonomy as t1 ON r1.term_taxonomy_id = t1.term_taxonomy_id
            LEFT JOIN wp_terms as terms1 ON t1.term_id = terms1.term_id,

            wp_posts as p2
            LEFT JOIN wp_term_relationships as r2 ON p2.ID = r2.object_ID
            LEFT JOIN wp_term_taxonomy as t2 ON r2.term_taxonomy_id = t2.term_taxonomy_id
            LEFT JOIN wp_terms as terms2 ON t2.term_id = terms2.term_id
        WHERE
            t1.taxonomy = 'category' AND p1.post_status = 'publish' AND terms1.term_id IN (".$categories.") AND
            t2.taxonomy = 'post_tag' AND p2.post_status = 'publish'
            AND p1.ID = p2.ID
        ORDER by tag_name
    ");
    return $tags;
}
