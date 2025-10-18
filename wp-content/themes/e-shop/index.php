<?php
/**
 * The main template file.
 */

get_header(); ?>

<div class="container">
    <main>
        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                <article>
                    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                    <div><?php the_content(); ?></div>
                </article>
            <?php endwhile; ?>
        <?php else : ?>
            <p>No content found.</p>
        <?php endif; ?>
    </main>
</div>

<?php get_footer();