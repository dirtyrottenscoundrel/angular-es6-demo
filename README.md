# angular-es6-demo

Full-featured starting point for an Angular/ES6 application.

## Features

* Simple, modular Angular demo app using ES6 features  
* Gulp workflow to bundle styles, templates, and scripts
* Minimal Twitter Bootstrap
* Wired for testing with Karma/Mocha/Chai
* Watch task to rebuild as files change
* Incremental JS rebuilds courtesy of Watchify
* Source maps

## Usage

### Build

```
npm install -g gulp bower  
bower install  
npm install  
gulp
```

### Serve

```
cd dist  
python2 -m SimpleHTTPServer
```

<table>
  <tr>
    <td>
<pre>
app
├── images
│   └── favicon.ico
├── scripts
│   ├── components
│   │   ├── router
│   │   │   └── router.js
│   │   ├── selectable
│   │   │   └── selectable.js
│   │   └── venue-store
│   │       ├── venue-store.js
│   │       └── venue-store.test.js
│   ├── venues
│   │   ├── venues-controller.js
│   │   ├── venues.html
│   │   └── venues.list.html
│   └── index.js
├── styles
│   ├── app.less
│   ├── bootstrap.less
│   ├── _recessed-list.less
│   └── _toolbar.less
└── index.html
</pre>
    </td>
    <td>
<pre>
dist
├── fonts
│   ├── FontAwesome.otf
│   ├── fontawesome-webfont.eot
│   ├── fontawesome-webfont.svg
│   ├── fontawesome-webfont.ttf
│   └── fontawesome-webfont.woff
├── images
│   └── favicon.ico
├── scripts
│   ├── app.js
│   ├── app.js.map
│   ├── app.partials.js
│   ├── vendor.js
│   └── vendor.js.map
├── styles
│   ├── app.css
│   ├── app.css.map
│   ├── vendor.css
│   └── vendor.css.map
└── index.html
</pre>
    </td>
  </tr>
</table>

## TODO

* [ ] Add minification
* [ ] Add tiny dev server
* [ ] Live reloading
