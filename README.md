# Getting started

Run the following command to scaffold a project:

```
npx create-expo-app init --template @lightbase/expo-template
```

Create the eas project:

```
npx eas login
npx eas build:configure
```

Create the expo updates configuration and setup the initial build credentials

```
npx eas update:configure
npx eas credentials
```

Next, run through every occurrence of `TODO(app)` and follow the instructions.

# Commit style and release process

Lightbase apps use Semantic releases together with commitlint to automatically generate releases and changelogs.

## Pull requests

When a pull request is opened, the preview github workflow is triggered, running linting and any test suite, and if successful will generate a QR code which can be scanned by any dev client build to preview the changes.

## Commit style

Commits should follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) style. This means that commit messages should be structured as follows:

```
<type>[optional scope]: <description>
```

type can be one of the following:

- `feat`: A new feature (this correlates with Feature release in semantic releases)
- `fix`: A bug fix (this correlates with Fix Release in semantic releases)
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Release process

Releases are generated manually, using the `yarn release` script. Depending on which branch is used, the release will be either a `major`, `minor` or `patch` release. The following branches are used to trigger the different release types:

- `development`: will create alpha releases
- `staging`: will create beta releases
- `production`: will create production releases

The semantic release will generate a git tag which will trigger the staging/production github actions and in turn the EAS builds. Once the build is finished, the release will be published to the app-releases slack channel.

# Commands

The following commands are included:

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `yarn prebuild`       | Prebuilds android and ios folders         |
| `yarn ios`            | Make ios build                            |
| `yarn iosRelease`     | Make ios production build                 |
| `yarn android`        | Make android build                        |
| `yarn androidRelease` | Make android release build                |
| `yarn start`          | start metro server                        |
| `yarn generate:svg`   | Generate SVG components                   |
| `yarn format`         | Format and lint code w/ Prettier & ESLint |
| `yarn release`        | Generates new release                     |

# Environment variables

Uses the expo env variables notation, see [here](https://docs.expo.dev/guides/environment-variables/) for more information.
any variable that starts with `EXPO_PUBLIC` can be used directly in JS code, and will be replaced at build time. Env secrets (that dont have the publuc prefix) cannot be read from JS code, and are only available at build time.

APP_VARIANT env variable is used in runtime to swap out the relevant config files. This is used to differentiate between the different app variants (dev, staging, production).

For example the API_URL should not be included in the .env file, but instead included in the Config.ts file. see examples [here](https://docs.expo.dev/eas-update/environment-variables/#sharing-environment-variables-between-local-development-eas-update-and-eas-build)

| Command                  | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `SENTRY_AUTH_TOKEN`      | This is used to push the source-maps to Sentry, and create a new release |
| `EXPO_PUBLIC_SENTRY_DSN` | This is the Sentry DSN that should be used to log errors to              |

# Directory structure

```
...
├── ...
├── assets                          // Splash screen and icon assests that will be generated during prebuild
│   └── fonts                       // All font files which will be configured natively during prebuild (@lightbase/native-assets expo plugin)
├── modules                         // Custom expo modules which will be autolinked in prebuild phase [here](https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial/)
├── src
│   ├── context
│   ├── services                    // All services (api, sentry, etc)
│   ├── theme
│   │   └── theme.config.tsx        // All font files which will be configured natively during prebuild (@lightbase/native-assets expo plugin)
│   │   └── theme.typography.tsx    // All font files which will be configured natively during prebuild (@lightbase/native-assets expo plugin)
│   ├── hooks                       // Project hooks
│   ├── utils                       // Helper functions
│   ├── components
│   ├── screens
│   └── navigation
├── ...
```

# App icon and splash screen

The app icons and splash screens are located in the assets folder, and should be replaced with the correct assets. The assets will be automatically generated during the prebuild phase.

Utilise the expo app icon and splash figa file [here](https://www.figma.com/community/file/1155362909441341285/Expo-App-Icon-%26-Splash), to ensure consistency across all apps.

# Styleing/Theming

TODO: add documentation about design system and how to use it

# SVG generation

`.svg` files can be automatically optimized using SVGO and turned into React Native components by using the
`yarn generate:svg` command.

SVG files can be placed in `assets/icons`, the generated output is placed in `src/assets/icons`.

`yarn generate:svg` will not overwrite existing files in the `src/assets/svg` directory to accommodate
changes. To re-generate an existing file, simply delete it and run `yarn generate:svg`.

# EAS Updates

TODO: add documentation about eas updates and how to use it
