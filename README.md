# GROVE — Specialty Coffee Roastery

Static marketing landing page for GROVE, a specialty coffee roastery brand. No build step — open `index.html` in a browser or deploy to any static host.

## Features

- Scroll-reveal animations powered by [anime.js v4](https://animejs.com/) via CDN
- Respects `prefers-reduced-motion`
- Progressive enhancement — content is always visible without JavaScript
- Responsive layout with CSS custom properties
- Sections: hero, brand story, bean origins, roasting process, blends, order

## File structure

```
grove-coffee/
├── index.html        # Main page
├── style.css         # All styles
└── scrollreveal.js   # Scroll-reveal animation module
```

## Running locally

No dependencies. Open `index.html` directly in a browser, or use any static file server:

```sh
npx serve .
```

## Scroll-reveal API

Add `data-reveal` to a container and `data-reveal-item` to the children you want animated:

```html
<div
  data-reveal
  data-reveal-mode="children"
  data-reveal-delay="100"
  data-reveal-stagger="130"
  data-reveal-distance="22"
>
  <p data-reveal-item>Fades in from below</p>
  <p data-reveal-item>Then this one</p>
</div>
```

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-reveal-mode` | `children` | `children` — animate `[data-reveal-item]` elements one by one; `self` — animate the wrapper itself |
| `data-reveal-delay` | `0` | Start delay in ms |
| `data-reveal-stagger` | `85` | Delay between each item in ms |
| `data-reveal-distance` | `28` | Initial translateY offset in px |
| `data-reveal-duration` | `900` | Animation duration in ms |

## License

MIT
