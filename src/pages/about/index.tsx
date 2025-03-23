import AboutContainer from "@/components/(about)/AboutContainer"
import Head from "next/head"

const AboutPage: React.FC = () => (
    <>
        <Head>
            <title>About | Pranshu05</title>
            <meta name="description" content="Portfolio website of Pranshu Patel." />
            <meta name="keywords" content="Pranshu Patel, Pranshu05, Portfolio, Developer, Designer, Engineer, Pranshu, Patel" />
            <meta name="author" content="Pranshu Patel" />
            <meta name="robots" content="index, follow" />
            <meta name="og:type" content="website" />
            <meta name="og:description" content="Portfolio website of Pranshu Patel." />
            <meta name="og:title" content="Pranshu05 | Portfolio" />
        </Head>
        <AboutContainer />
    </>
)

export default AboutPage