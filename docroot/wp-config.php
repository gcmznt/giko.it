<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

define('WP_SITEURL', '/wordpress');
define('WP_HOME',    '/');

// ** MySQL settings - You can get this info from your web host ** //
require_once(__DIR__ . '/_includes/config.php');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'u7u`BK>E%(T@~t<I#HdxmU<+*)Rvni/&Ey98YpC.{+[Rk86uJt?RDB~v2|mU@bR!');
define('SECURE_AUTH_KEY',  'yY/V`Q*iDZ=h:a|1,wUq@W_zF%GdPM!j<X nSF]C7hvm6A8qcj=Ihff#hfW+:-d4');
define('LOGGED_IN_KEY',    ';$:|_DsgZv=U<Mjlsv)Hyl|~k317`U,>=8;%Bee/wU(`&_Z4r*h;l.q=Uc8*|5s;');
define('NONCE_KEY',        'C)gJH~-qq2r.4L|L(e<Q^i-:j`<4*gwOsre-^xDOR7#!IG]4(-NmVnu2@9REh85l');
define('AUTH_SALT',        'uaglwd~zGQ{0I  D./)%?T{sO;-e.=sI(y|*Qfd_Un#Y:fgz6AY0`E>j1*S73uHS');
define('SECURE_AUTH_SALT', 'zc76$3)= &f!v+<_L&wM+F-[Enf<39.9)4gm,ovJ?3Kf{v:9%A%/>cd`8=+TRisC');
define('LOGGED_IN_SALT',   '|_&%/2I],szYDf` <&,893*|]Q<$a<,x$&+*gGyo<gRBqQEQP+`.EwlX:Yp)tPau');
define('NONCE_SALT',       'uO uljhLTTU/%j=||&Uwc-WP-?JyO{+2HDkX{j(bJ(VBJVshehNG;:Hccgqq?oQv');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
