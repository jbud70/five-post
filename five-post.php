<?php

/*
Plugin Name: Five Post
Plugin URI:
Description: View and Edit Your Last Five Posts
Author: Josh Isaak
Version: 1.0
Author URI: http://www.futurebot.com
Network: True
*/

class Five_Post {

	public $plugin_domain;
	public $views_dir;
	public $version;

	public function __construct() {
		$this->plugin_domain = 'five-post';
		$this->views_dir     = trailingslashit( dirname( __FILE__ ) ) . 'server/views';
		$this->version       = '1.0';
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
	}

	public function admin_menu() {
		$title = __( 'Five Post', $this->plugin_domain );

		$hook_suffix = add_management_page( $title, $title, 'export', $this->plugin_domain, array(
			$this,
			'load_admin_view',
		) );

		add_action( 'load-' . $hook_suffix, array( $this, 'load_bundle' ) );
	}

	public function load_view( $view ) {
		$path = trailingslashit( $this->views_dir ) . $view;

		if ( file_exists( $path ) ) {
			include $path;
		}
	}

	public function load_admin_view() {
		$this->load_view( 'admin.php' );
	}

	public function load_bundle() {
		$handle = $this->plugin_domain . '-bundle';
		
		wp_enqueue_script( $handle, plugin_dir_url( __FILE__ ) . 'dist/bundle.js', array(), $this->version, 'all' );
		
		wp_localize_script ( $handle, 'WPSettings', array(
			'root' => esc_url_raw( rest_url() ),
			'nonce' => wp_create_nonce( 'wp_rest' )
		));
	}
}

new Five_Post();