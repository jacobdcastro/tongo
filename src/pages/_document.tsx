import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { TypographyStyle, GoogleFont } from 'react-typography';
import typography from '../utils/typography';

class MyDocument extends Document {
  // ** enable SSR for styled-components **
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="icon" href="/logo-green-minimal.svg" />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <Footer /> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
