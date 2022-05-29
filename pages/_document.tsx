/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import * as D from 'next/document';
import Document from 'next/document';

import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: D.DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <D.Html lang='en'>
        <D.Head>
          <div>
            <meta charSet='utf-8' />
            <meta httpEquiv='x-ua-compatible' content='ie=edge' />
            <title>Home | Bookshop Responsive Bootstrap4 Template</title>
            <meta name='description' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
          </div>
        </D.Head>
        <body>
          <D.Main />
          <D.NextScript />
        </body>
      </D.Html>
    );
  }
}

export default MyDocument;
