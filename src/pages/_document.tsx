import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />

                    <style>{`
                        #preloader {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            background-color: rgb(10 10 10);
                            color: rgb(212 212 216);
                        }
                        #preloader .progress-bar {
                            width: 75%;
                            height: 8px;
                            background-color: rgb(24 24 27);
                            overflow: hidden;
                            margin-top: 1rem;
                        }
                        #preloader .progress {
                            height: 100%;
                            background-color: rgb(82 82 91);
                            transition: width 0.3s ease-out;
                        }
                        #preloader .loading-message {
                            margin-top: 0.5rem;
                            font-size: 0.875rem;
                            color: #a1a1aa;
                        }
                    `}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;