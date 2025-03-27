import GuestbookContainer from "@/components/(guestbook)/GuestbookContainer"
import Head from "next/head"

const Guestbook: React.FC = () => (
    <>
        <Head>
            <title>Guestbook | Pranshu05</title>
            <meta name="description" content="Guestbook of Pranshu Patel." />
            <meta name="keywords" content="Pranshu Patel, Pranshu05, Portfolio, Developer, Designer, Engineer, Pranshu, Patel" />
            <meta name="author" content="Pranshu Patel" />
            <meta name="robots" content="index, follow" />
            <meta name="og:type" content="website" />
            <meta name="og:description" content="Portfolio website of Pranshu Patel." />
            <meta name="og:title" content="Pranshu05 | Portfolio" />
        </Head>
        <GuestbookContainer />
    </>
)

export default Guestbook