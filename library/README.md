# Library

Partials ported from v1 (`@use` syntax, tokens without inline fallbacks), **not compiled**.

Lift a file into `src/` when a client needs it:

1. Move it to the matching folder (e.g. `library/components/_chip.scss` → `src/components/_chip.scss`).
2. `@forward` it from that folder's `index.scss`, and `@use` the folder in `src/_facelift.scss` if it's new.
3. Add any `--t-*` tokens it reads to `src/tokens/_defaults.scss`.
4. Paths like `@use '../abstracts/breakpoints'` resolve once the file is inside `src/`.

| Folder | Contents |
|---|---|
| `layout/` | v1 header, sidebar, WordPress page-template widths |
| `vendors/` | Bootstrap 4 extensions, AG Grid, C3, Date Range Picker, Selectize, Swiper, wpDataTables |
| `components/` | Chip, draggable list, legend list, placeholder, scroll shadows, skeleton |
| `utilities/` | Gap, position, z-index, opacity, border-width, display-5/6/7 helpers |
| `legacy/` | `#map` page fix |

Once everything useful has been lifted, delete this folder.
