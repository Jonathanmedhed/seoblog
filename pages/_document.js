import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {
	/**
     TO SERVER RENDER ALL PAGES
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}
     */

	setGoogleTags() {
		if (publicRuntimeConfig.PRODUCTION) {
			return {
				__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CJ9FCXMS11');
        `,
			}
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
					/>
					<link rel="stylesheet" href="/static/css/styles.css" />
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-CJ9FCXMS11"></script>
					<script dangerouslySetInnerHTML={this.setGoogleTags()} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
