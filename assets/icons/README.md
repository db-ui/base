<!--
SPDX-FileCopyrightText: 2025 DB Systel GmbH

SPDX-License-Identifier: Apache-2.0
-->

# How to create and provide the technical icon files

We're getting these icons by the [DB Design System colleagues](https://dbsw.sharepoint.com/:f:/r/teams/CXM.Teams-DDSTeam/Shared%20Documents/DDS%20Team/01--Design-System/04--Foundations/07--Icons/04--Exchange-Icons?csf=1&web=1&e=hzdDGu) and process the following changes:

- Minifications with [`ImageOptim`](https://imageoptim.com/mac)
- Adding some contents within the SVGs (these assets might get exported correctly in the future)
  - CSS variables
    - replace `fill="#282D37"` by `fill="var(--db-icon-color, currentColor)"`
    - replace `fill="#55b9e6"` by `fill="var(--db-icon-color, #55b9e6)"`
    - replace `fill="#EC0016"` by `fill="var(--db-icon-pulse-color, #EC0016)"`
    - replace `fill="#78be14"` by `fill="var(--db-icon-pulse-color, #78be14)"`
  - `id`-Attribute (generic `icon` id within all SVG files)
- Afterwards the JSON files within the `source/_patterns/icons` path might need to get updated

## Icon fonts

- Use the source files out of the folder `assets/icons/functional/fonts/sources` via <https://icomoon.io/app/#/select> to generate the font files.
- You'll need [`wawoff2`](https://www.npmjs.com/package/wawoff2) to generated `woff2` files out of the included `ttf` files; e.g. install it globally and run the following command afterwards within the icomoon folder:
  `woff2_compress.js icomoon.ttf icons-20-outline-transportation.woff2`
