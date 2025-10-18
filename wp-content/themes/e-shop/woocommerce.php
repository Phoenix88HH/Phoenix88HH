<?php
/**
 * This is the template for all WooCommerce pages.
 */

get_header(); ?>

<div class="container">
    <main>
        <?php woocommerce_content(); ?>
    </main>
</div>

<?php get_footer();