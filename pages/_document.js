//pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          /*integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMt23cez/3paNdF+Z6rg6MEeAzrB5JQwUE00JGB"
          crossOrigin="anonymous" */
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}