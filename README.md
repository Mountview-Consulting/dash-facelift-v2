# Dash Facelift v2

CSS overrides that modernise the Bootstrap 4 dashboard until the new theme is ready.
Each brand compiles to a **single self-contained CSS file** that gets pasted into WordPress.

## Layout

```
brands/           One entry file per brand: tokens only. These are the only files that compile.
  lemon-pepper-holdings.scss
  _template.scss  Copy this to start a new brand.
src/              The live framework. All partials; nothing here compiles on its own.
  abstracts/      Breakpoints, scales. Outputs no CSS.
  tokens/         _defaults.scss — every --t-* custom property with its default value.
  base/           Element defaults (body, a, hr).
  layout/         Header and sidebar (fresh start), plus main content offsets.
  _facelift.scss  Pulls everything together, in cascade order.
library/          Ported v1 partials, NOT compiled. Lift into src/ when needed (see library/README.md).
dist/             Compiled CSS, one file per brand. This is what gets pasted into WordPress.
preview/          index.html — the dashboard shell plus basic elements, with a brand picker.
js/               util.js (share page, query string helpers).
```

The build starts deliberately small. Header and sidebar are being redesigned from scratch; everything
else from v1 sits in `library/` until a client needs it.

## How theming works

- `src/tokens/_defaults.scss` defines every token on `:where(:root)`, which has **zero specificity**, so a
  brand's `:root` always wins no matter where it comes in the file.
- A brand file sets only the tokens that differ from the defaults.
- Components read tokens with a plain `var(--t-…)` (no inline fallbacks). The defaults file is the one
  place to look.

## CodeKit setup

1. Add the `dash-facelift-v2` folder to CodeKit as a new project.
2. **Project settings → Sass:** compiler is Dart Sass (the default). Output style: *Expanded* (easier to
   read once pasted) or *Compressed* (smaller). **Turn source maps off**: a `sourceMappingURL` comment
   is useless once the CSS is pasted.
3. **Project settings → Autoprefixer:** on. The browserslist from v1 still works
   (`>0.2%, last 2 versions, Firefox ESR, not dead`).
4. For each file in `brands/` (not `_template.scss`), set the output path to `dist/<brand>.css`. CodeKit
   skips underscore partials automatically, so nothing in `src/` or `library/` should be set to compile.
5. Open `preview/index.html` with CodeKit's preview server to see changes live.

## Adding a brand

1. Copy `brands/_template.scss` to `brands/<brand-name>.scss`.
2. Uncomment and set the tokens that differ.
3. Add the brand to the `<select>` in `preview/index.html`.
4. In CodeKit, set its output to `dist/<brand-name>.css`.

## Rules of thumb

- **New colour or size a brand might change?** Add a `--t-*` token to `_defaults.scss` and use it.
- **Media queries:** use `@include bp.up(md)` / `bp.down(md)` from `abstracts/breakpoints`. Don't
  hard-code pixel values. `down(md)` stops at 767.98px, so it never overlaps `up(md)`.
- **Lengths in tokens:** write `0px`, not `0`. A unitless `0` inside `calc()` makes the whole
  declaration invalid.
- **`!important`:** only in `utilities/`, or when beating an inline style or a library's `!important`.
  Add a comment saying which.
- **Overriding a library?** Put it in `src/vendors/`. **Building our own component?** Put it in `src/components/`.
  Check `library/` first; it may already exist.

## Next steps

- [ ] Finish the header and sidebar redesign in `src/layout/`.
- [ ] Decide whether links and buttons should use the brand colour (they're Bootstrap blue for now).
- [ ] Lift components from `library/` as the dashboard needs them.
- [ ] Introduce semantic tokens (surface, text, border, accent) on top of the raw colour tokens.
