# jSprite

> jQuery plugin for working with sprites of images.

## Getting started

Three quick start options are available:

* Clone the repo: `git@github.com:marginelson/jSprite.git`
* Install with [Bower](http://bower.io): `bower install`

## Usage

Create an attribute called `data-repo`:

Include jQuery:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

Include plugin JS:

```html
<script src="jsprite.js"></script>
```

## Options

Here's a list of available settings. Example:

```javascript
$(".animation").jSprite({
    getSize: true,
    colluns: 9,
    lines: 8,
    total: 65,
    timeTransition: 30,
    timeReload: 1
});
```

## Browser Support

We do care about it.

![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 7+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## License

[MIT License](http://nelsonfrancisco.mit-license.org/) © Nelson Francisco