# DB UI Base

With DB UI Base we provide you with basic Design Tokens and assets based on the [DB Design System UX Guides + Standards](https://marketingportal.extranet.deutschebahn.com/de/ui-komponenten), that can be shared across web and native apps projects.

For more information, have a look at our [hosted patternlab](https://db-ui.github.io/base/).

## Deutsche Bahn brand

As we'd like to perfectly support our users and customers on their digital journey, the usage of Deutsche Bahn brand and trademarks are bound to clear guidelines and restrictions even when being used with the code that we're providing with this product; Deutsche Bahn fully reserves all rights and ownership regarding the Deutsche Bahn brand, even though that we're providing the code of DB UI products free to use and release it under the Apache 2.0 license.
Please have a look at our brand portal at <https://marketingportal.extranet.deutschebahn.com/> for any further questions and whom to contact on any brand issues. As these assets and visual guidelines are retrieved from our Deutsche Bahn Marketingportal, you'll agree with the ["Allgemeine Nutzungsbedingungen für das DB-Marketingportal" (german)](https://marketingportal.extranet.deutschebahn.com/marketingportal/Nutzungsbedingungen-9702684#) in case of using them.

For any usage outside of Deutsche Bahn websites and applications you must remove or replace any Deutsche Bahn brand and design assets as well as protected characteristics and trademarks. We're even also planning to provide a neutral theme that would make it much easier for you to use our product without the trademarks by Deutsche Bahn.

This especially relates to the files in the directories `/assets/` and `source/images` and `source/favicon.ico` as well.

## How to consume

### General `npm` context

Install DB UI Base like this:

```bash
npm i -save @db-ui/base
```

#### Tailwind

Install Tailwind based on your framework: [Installations](https://tailwindcsscom/docs/installation), but don't use `npx tailwindcss init`.

Instead, run this command in your project:

```bash
node ./node_modules/@db-ui/base/build/tailwind/tailwind-config-generator.mjs
```

This will create your `tailwind.config.js`.

---

If you don't want to have a customizable config, you can also use the default tailwind-config by running:

```bash
node ./node_modules/@db-ui/base/build/tailwind/tailwind-config-generator.mjs default
```

---

The config contains all colors, fonts and spacings. Make sure to check the official guidelines for spacings (1 unit === 16px).

## How it works / to contribute

Contributions are very welcome, please refer to the [contribution guide](CONTRIBUTING.md).

All of the style tokens and assets are in this package. Make any changes to suit your needs. This package has iOS, Android, and web code, and is based on [Amazon Style Dictionary](https://amzn.github.io/style-dictionary/) Complete Example.

To get started, run

```shell
npm install
npm run build
```

The `npm build` task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding tokens, you will have to run this command again to generate the files.

## Third party acknowledgments – many kudos for that !!!

- [open privacy by opr.vc](https://opr.vc)

## Code of conduct

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone – have a look at our [Contributor Covenant Code of Conduct](CODE-OF-CONDUCT.md).

## License

This project is licensed under [Apache-2.0](LICENSE), Copyright 2022 by DB Systel GmbH.
