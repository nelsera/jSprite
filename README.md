# jSprite

> jQuery plugin for working with sprites of images.

## Getting started

Three quick start options are available:

* Clone the repo: `git@github.com:marginelson/jSprite.git`
`npm install`
`bower install`

## Usage

Include jQuery:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
```

Include plugin JS:

```html
<script src="jquery.jSprite.js"></script>
```

## Options

Here's a list of available settings. Example:

```javascript
$(".animation").jSprite({
    total: 65,
    timeTransition: 30,
    timeReload: 20
});
```

#### wait
> If true, animation is not started. Default <b>false</b>.

#### from
> Set the initial position of the animation.

#### to
> Set the end position of the animation.


## Methods

Get access to the methods by creating a var and calling $.data():

```javascript
$('selector').jSprite();
var $animation = $('selector').data('plugin_jSprite');
```

And now we can call jSprite methods:

```javascript
$animation.restart();
```

### List of Methods

#### restart
> Back to position 1 and continue animation.
```javascript
$animation.restart();
```

#### stop
> stop the animation.
```javascript
$animation.stop();
```

#### next
> Next position and continue animation.
```javascript
$animation.next();
```
> To stop after just call stop():
```javascript
$animation.next().stop();
```

#### prev
> Previous position and continue animation.
```javascript
$animation.prev();
```
> To stop after just call stop():
```javascript
$animation.prev().stop();
```

#### goTo(integer)
> go to frame.
```javascript
$animation.goTo(5);
```

## Browser Support

We do care about it.

![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 7+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](https://github.com/marginelson/jSprite/blob/master/CONTRIBUTING.md)

## License

[MIT License](http://nelsonfrancisco.mit-license.org/) © Nelson Francisco
