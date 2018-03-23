/* Menu animation */
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], function () {
            return factory(root);
        });
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.menuAnimation = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

    'use strict';


    // Feature Test

    var supports = 'querySelector' in document && 'addEventListener' in window;

    // Shared Variables

    var defaults = {
        menu: '[data-menu-animation]',
        target: 'a',
        fxClassName: 'ma-fx',
        initiatedClass: 'ma-initiated'
    };


    // Polyfills

    /**
     * Element.matches() polyfill (simple version)
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
     */
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    /**
     * Element.closest() polyfill
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
     */
    if (!Element.prototype.closest) {
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        Element.prototype.closest = function (s) {
            var el = this;
            var ancestor = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (ancestor.matches(s)) return ancestor;
                ancestor = ancestor.parentElement;
            } while (ancestor !== null);
            return null;
        };
    }


    // Shared Methods


    // Foreach

    var forEach = function(collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === "[object Object]") {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };


    // Extend

    var extend = function () {

        // Variables
        var extended = {};
        var deep = false;
        var i = 0;

        // Check if a deep merge
        if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
            deep = arguments[0];
            i++;
        }

        // Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    // If property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = extend(extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < arguments.length; i++) {
            var obj = arguments[i];
            merge(obj);
        }

        return extended;

    };


    // Animation

    var Animation = function (options) {

        // Unique Variables

        var publicAPIs = {};
        var settings;

        // Set style
        var setStyle = function(item, $menuFX, $menu, reset) {

            var width,
                height,
                left,
                top;

            // Get item width
            if (item == null) {
                width = 0;
                height = $menu.querySelector('li').offsetHeight;
            } else {
                width = item.offsetWidth;
                height = item.offsetHeight;
            }

            // Get item left offset
            if (item == null) {
                left = 0;
                top = 0;
            } else if (item != null && item.matches('li')) {
                left = item.offsetLeft;
                top = item.offsetTop;
            } else {
                left = item.closest('li').offsetLeft;
                top = item.closest('li').offsetTop;
            }

            // Animate
            $menuFX.setAttribute(
                "style",
                "width: " + width + "px;" +
                "height: " + height + "px;" +
                "-webkit-transform: -webkit-translate(" + left + "px, " + top + "px);" +
                "transform: translate(" + left + "px, " + top + "px);"
            );

            // Reset
            if (reset == true) {
                var transitionDuration = parseFloat(getComputedStyle($menuFX)['transitionDuration']) || parseFloat(getComputedStyle($menuFX)['webkitTransitionDuration']) || parseFloat(getComputedStyle($menuFX)['mozTransitionDuration']) || 0.3;
                setTimeout(function() {
                    $menuFX.removeAttribute("style");
                }, transitionDuration * 1000 + 16);
            }
        };


        // reset menu FX style
        var resetStyle = function($menuFX, $menu) {
            setStyle($menu.querySelector(".is-active"), $menuFX, $menu, true);
        };


        /**
         * AnimateMenu
         */
        publicAPIs.animateMenu = function (options) {

            // Settings
            var localSettings = extend(settings || defaults, options || {}); // Merge user options with defaults

            // Variables
            var menus = document.querySelectorAll(localSettings.menu);

            // Loop through each menu
            forEach(menus, function (value, prop) {

                // Variables
                var $menu = menus[prop];
                var $activeItem = $menu.querySelector(".is-active");
                var $menuFX = $menu.querySelector(".js-menu-fx");

                // append FX item if it doesn't exist yet
                if ($menuFX === null) {
                    $menuFX = document.createElement("div");
                    $menuFX.classList.add("js-menu-fx", localSettings.fxClassName);
                    $menu.appendChild($menuFX);
                }

                // On hover
                $menu.addEventListener("mouseover", function(event) {

                    if (event.target.matches('ul')) return;

                    // Set to hovering item
                    if (event.target.closest(settings.target)) {
                        setStyle(event.target, $menuFX, $menu, false);
                    } else {
                        setStyle($activeItem, $menuFX, $menu, false);
                    }
                });

                // Set to active item when leaving ul
                $menu.addEventListener("mouseout", function(event) {

                    // Return false if we stay on the menu
                    var e = event.toElement || event.relatedTarget;
                    if (e !== null && e.closest('ul')) return;

                    // Return to active item
                    resetStyle($menuFX, $menu);

                });

                // apply iniated class to menu when
                setTimeout(function() {
                    $menu.classList.add(localSettings.initiatedClass);
                }, 32);

                // When leaving window
                window.addEventListener('blur', function(event) {
                    resetStyle($menuFX, $menu)
                });

            });

        };


        /**
         * Init
         */
        publicAPIs.init = function (options) {

            // feature test
            if (!supports) return;

            // Merge options into defaults
            settings = extend(defaults, options || {});

            // Animate menu
            publicAPIs.animateMenu(options);

        };

        // Initialize the plugin
        publicAPIs.init(options);

        // Return the public APIs
        return publicAPIs;

    };


    //
    // Return the constructor
    //

    return Animation;

});