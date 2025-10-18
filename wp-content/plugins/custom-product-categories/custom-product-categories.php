<?php
/**
 * Plugin Name: Custom Product Categories
 * Description: Adds the main product categories for the online store.
 * Version: 1.0
 * Author: Jules
 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

// This function will run when WordPress initializes
function jules_add_product_categories() {
    // Check if WooCommerce is active to avoid errors
    if ( ! class_exists( 'WooCommerce' ) ) {
        return;
    }

    // Define the product categories
    $categories = [
        'Electronice',
        'Modă',
        'Casă și grădină',
        'Cărți',
        'Jucării'
    ];

    // The taxonomy for product categories in WooCommerce is 'product_cat'
    $taxonomy = 'product_cat';

    // Loop through the categories and add them if they don't exist
    foreach ( $categories as $category_name ) {
        if ( ! term_exists( $category_name, $taxonomy ) ) {
            wp_insert_term(
                $category_name, // The category name
                $taxonomy      // The taxonomy
            );
        }
    }
}

// Hook the function into the 'init' action
add_action( 'init', 'jules_add_product_categories' );