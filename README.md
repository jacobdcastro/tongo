# Tongo Client

## Developing

0. Ensure you have [Git](https://git-scm.com/downloads) (required), [Node.js](https://nodejs.org/) (required), and [Yarn](https://classic.yarnpkg.com/en/docs/install) (optional) installed.

1. Clone this repo.

```bash
git clone https://github.com/jacobdcastro/tongo-client.git
```

2. Install dependencies.

```bash
# With Yarn (recommended)
yarn install

# With NPM
npm install
```

3. Start Local Server

```bash
# To View in Development Mode
yarn dev
# or
npm run dev

# To View Production Site
yarn build && yarn start
# or
npm run build && npm start
```

## Notes

### Styles

Most CSS is written in [styled-components](https://styled-components.com). Some styled components are written in their own modules (`.ts` files) and other styled components are in the same file as the component they are rendered with (`.tsx` files).

It may be helpful to use the React Developer tools in the browser to track down which components are responsible for styling which components. Each file is appropriately named according to the role it plays, so it shouldn't be too difficult to find the modules you're looking for.

#### Breakpoints

There exists 5 breakpoints that ALL custom styled components abide by.

- 480px
  - Less than 480 = mobile
- 768px
  - Between 480 and 768 = small tablets
- 1024px
  - Between 768 and 1024 = larger tablets
- 1280px
  - Between 1024 and 1280 = laptops w/ touchscreen (varies)
- 1440px
  - Between 1280 and 1440px = laptops and small desktops (varies)
  - 1440+ = large laptops and desktops (varies)

Some components may not have active style changes at all 5 breakpoints. But if there is a breakpoint, it will be one of the 5 breakpoints listed above.

### Redux

In this repository, for the sake of consistency, all React components are function components using React Hooks. Redux is also used with the Redux Thunk middleware.

The Redux `Provider` is implemented in `pages/_app.tsx`. The `MyApp` component is wrapped in a `withReduxStore` function, the redux `store` will be initialized in the function and then passed down to `MyApp` as `this.props.initialReduxState`, which will then be utilized by the `Provider` component.

Every initial server-side request will utilize a new `store`. However, every `Router` or `Link` action will persist the same `store` as a user navigates through the `pages`.

This app also includes hot-reloading when one of the `reducers` has changed. However, there is one caveat with this implementation: If you're using the `Redux DevTools` browser extension, then all previously recorded actions will be recreated when a reducer has changed. Therefore, to avoid this issue, the store has been set up to reset back initial state upon a reducer change. If you wish to persist redux state regardless (or you don't have the extension installed), then in `store.ts` change `store.replaceReducer(createNextReducer(initialState))` to `store.replaceReducer(createNextReducer)`.

### Environment Variables

If you just cloned this repo, create a file at the root of the project called `.env.local` and place environment variables (API keys, secrets, passwords, etc.) in the file. Example format:

```bash
ENV_VARIABLE=abcdef123456
ANOTHER_ENV_VAR=qwerty098765
```

Next.js has built-in support for loading environment variables from the `.env.local` file into `process.env`. For example, you may connect to a database server using the above variables like this:

```javascript
const db = connectDB({
  apiKey: process.env.ENV_VARIABLE,
  password: process.env.ANOTHER_ENV_VAR,
});
```

#### Required Environment Variables

- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
