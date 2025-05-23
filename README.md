# fartscroll.ts

**Everyone farts. And now your web pages can too.**

This is a fork of [The Onion's fartscroll.js](https://theonion.github.io/fartscroll.js/), created because the original project is no longer actively maintained and utilizes practices that are no longer recommend (e.g. Bower). This version aims to modernize the codebase with TypeScript, NPM support, unit tests, and other modern features.

## 📦 Installation

```bash
# with pnpm
pnpm i @ridgehkr/fartscroll-ts

# OR
npm i @ridgehkr/fartscroll-ts
```

## 🚀 Quick Start

```javascript
import fartScroll from '@ridgehkr/fartscroll-ts'

// Fart every 400 pixels scrolled
fartscroll()

// Fart every 800 pixels scrolled
fartscroll(800)
```

## 🪪 License

© [Caleb Pierce](https://calebpierce.dev). MIT License applies, extending original license by The Onion. See the [LICENSE](https://github.com/ridgehkr/fartscroll-ts/blob/master/LICENSE).
