<!--
SPDX-FileCopyrightText: 2025 DB Systel GmbH

SPDX-License-Identifier: Apache-2.0
-->

<!-- markdownlint-configure-file { "MD024": false, "MD013": false } -->

# Changelog

| :point_up: | From now on we'll only document our changes within the [repositories releases page](https://github.com/db-ui/core/releases). |
| ---------- | :--------------------------------------------------------------------------------------------------------------------------- |

~All notable changes to this project will be documented in this file.~

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
And the commit guidelines from [Conventional Commits](https://conventionalcommits.org) are being used.

Regarding BREAKING CHANGES in between, please have a look into [the migration guide](docs/migrationGuide.adoc).

## [Unreleased]

## [0.15.0] - 2022-09-14

### Changed

- updated functional DB Icon library (to 2.17.0)
  - **BREAKING CHANGE** removed the following icons:
    - `assets/icons/functional/images/transportation/db_ic_local_train_filled_20.svg`
    - `assets/icons/functional/images/transportation/db_ic_local_train_filled_24.svg`
    - `assets/icons/functional/images/transportation/db_ic_local_train_filled_32.svg`
    - `assets/icons/functional/images/transportation/db_ic_long_distance_bus_filled_20.svg`
    - `assets/icons/functional/images/transportation/db_ic_long_distance_bus_filled_24.svg`
    - `assets/icons/functional/images/transportation/db_ic_long_distance_bus_filled_32.svg`
  - updated and added some icons

## [0.14.0] - 2022-07-31

### Changed

- updated DB Icon libraries (functional to 2.16.1 and illustrative to 2.14.1)
  - **BREAKING CHANGE** The previous prefix writings of `_on` and `_filled` have been consolidated to `_solid`, as we're even already using this elsewhere
  - **BREAKING CHANGE** Renamed according to the icons centrally provided illustrative: (`news/s_-_bahn_magazin_muenchen` became `news/s-bahn_magazin_muenchen`, `transportation/ev_-_car` became `transportation/ev-car`, `transportation/self_driving_side_view` became `transportation/self-driving_side_view`, `advertising_transportation` became `transportation_advertising`)
  - Added `hydrogen` icons
  - Added 16px sized functional icons (`action/add`, `action/minus`, `navigation/chevron_left`, `navigation/chevron_right`, `navigation/close`, `navigation/expand_less`, `navigation/expand_more`)
  - Added some more filled icons (`action/add_circle`, `action/remove`)
  - Added further functional icons in general (`action/fingerprint`, `feature/day`)
  - Added further illustrative icons in general (`devices/usb_3.0`, `devices/usb_c`, `feature/cyber_security`, `feature/hydrogen`, `travel/departure_board`)
  - The `transportation` icons are quite special: They are actually devided in between `regular` and `inverted` for upcoming dark mode

## [0.13.0] - 2022-07-02

### Changed

- Enable the logo theming via CSS variables

## [0.12.0] - 2022-05-04

### Changed

- Web Fonts: Structure of the `fonts` folder, especially to flatten the relevant files structure

## [0.11.0] - 2022-05-04

### Added

- docs: Another hint regarding the assets place for trademark related assets

### Changed

- Updated functional icons to version 2.14.4

## [0.10.0] - 2022-04-28

### Added

- generated Android and iOS tokens (testwise, we're currently evaluating those)
- Several organisational documents

### Changed

- `--iconPulseColor` has been renamed to `--db-icon-pulse-color`

## [0.9.1] - 2022-04-15

### Changed

- Specific `font-family` values

## [0.9.0] - 2022-04-13

### Changed

- **BREAKING CHANGE**: We've removed the `primary`, `secondary`, `poi`, `transportation` and `feedback` grouping name as parts from the `color` Design Tokens due to unnecessary differentiation; these are even already unique and this would only lengthen the Design Tokens names
- updated `style-dictionary` dependency

## [0.8.1] - 2022-04-12

### Fixed

- Corrected some further icon names

## [0.8.0] - 2022-04-12

### Changed

- **BREAKING CHANGE**: Added `db-` prefix to `css`, `scss` and `js` Design Tokens

## [0.7.0] - 2022-04-12

### Added

- tailwind tokens

### Changed

- Made the spacing tokens themeable again

## [0.6.1] - 2022-04-12

### Fixed

- Removed duplicated underscore in some icons names

## [0.6.0] - 2022-04-12

### Added

- DB Design System Icons 2.14.3
- DB Design System illustrative icons v2.12.0
- Spacing Tokens

### Changed

- Added fallback fonts to `DB Screen Sans` variables

## [0.5.0] - 2022-04-05

### Added

- Icons: further icons out of the current version DB Standard Icon 2.11.3

### Changed

- **BREAKING CHANGE:** Icons: reorganized the icon (fonts) file structure

## [0.4.0] - 2022-04-04

### Added

- Missing small size feedback colors

### Changed

- updated existing iconset for transportation, seat, feature and facilities

## [0.3.0] - 2022-03-13

### Added

- Further specified feedback colors

### Changed

- **BREAKING CHANGE**: Removed previous left-over "in-between" color values
- **BREAKING CHANGE**: Feedback color phrase `information` has been changed to `informative`, resulting in e.g. `color-feedback-informative`
- Updated web fonts / to version 2.506 from the UX Guide: https://ux-guide.deutschebahn.com/document/144#/screen-typografie
- Adapted general DB UI Core pattern lab styling
- Switched to the new repository URL

### Fixed

- Two color values (feedback)

## [0.1.0] - 2021-07-23

### Added

- Initial stack of Webfonts (DB Screen)
