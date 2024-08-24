import dynamic from "next/dynamic";
import Head from "next/head";

const HomeContainer = dynamic(() => import("@/components/(home)/HomeContainer"), {
    ssr: false,
});

const Home: React.FC = () => (
    <>
        <Head>
            <title>Pranshu05 | Portfolio</title>
            <meta name="og:description" content="Portfolio website of Pranshu Patel." />
            <meta name="og:title" content="Pranshu05 | Portfolio" />
        </Head>
        <HomeContainer />
    </>
)

export default Home;