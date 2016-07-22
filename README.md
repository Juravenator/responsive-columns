_[Demo and API Docs](https://juravenator.github.io/responsive-columns/)_

responsive-columns [![Bower version](https://badge.fury.io/bo/responsive-columns.svg)](https://badge.fury.io/bo/responsive-columns) [![Travis state](https://api.travis-ci.org/Juravenator/responsive-columns.svg?branch=master)](https://travis-ci.org/Juravenator/responsive-columns)
=========


`responsive-columns` displays its content in a column layout, or a series of
animated pages, depending on the available size.

It is made using Polymer 1.x. It uses
[app-toolbar](https://elements.polymer-project.org/elements/app-layout?active=app-toolbar) and [neon-animated-pages](https://elements.polymer-project.org/elements/neon-animation?active=neon-animated-pages).

Apart from the toolbar used for the animated pages, this element makes no
assumptions about the used design pattern (i.e. the styling of the columns is up
to you).

Note that this element does not use CSS media queries to determine the available
size. It measures the width that is really available to your element.

### Install

```bash
$ bower install --save responsive-columns
```

### Import

```html
<link rel="import" href="bower_components/responsive-columns/responsive-columns.html">
```
