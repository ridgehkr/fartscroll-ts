# fartscroll.ts

**Everyone farts. And now your web pages can too.**

This is a fork of [The Onion's fartscroll.js](https://theonion.github.io/fartscroll.js/), created because the original project is no longer actively maintained and utilizes practices that are no longer recommend (e.g. Bower). This version aims to modernize the codebase with TypeScript, NPM support, unit tests, and other modern features.

## Installation

1. `npm install @ridgehkr/fartscroll`
2. Import and initialize:

```javascript
import fartScroll from '@ridgehkr/fartscroll'

// Fart every 400 pixels scrolled
fartscroll()

// Fart every 800 pixels scrolled
fartscroll(800)
```
