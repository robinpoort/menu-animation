# menu-animation
Simple CSS animated JS powered menu animations

## Demo
* https://robinpoort.github.io/menu-animation/

## Features
* Powered by JS
* transitions by CSS
* Bare bones, no styling added, you have to do that yourself, see demo page for demos

## Use

```html
<ul data-menu-animation>
    <li><a href="#">Menu item</a></li>
    <li><a href="#">Menu item</a></li>
</ul>
<script src="dist/js/scripts.js"></script>
<script type="text/javascript">
    var menu = new menuAnimation();
</script>
```

## Styling

There's no styling coming with this project. All styling needs to be done per site. As an example you can check the demo styling.

### No-js Styling

Make sure you have styling for hover/focus when the JS fails to run.

```css
[data-menu-animation]:not(.ma-initiated) a:focus:after,
[data-menu-animation]:not(.ma-initiated) a:hover:after { ... }
```
