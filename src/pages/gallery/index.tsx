import GalleryContainer from '@/components/(gallery)/GalleryContainer';
import Head from 'next/head';

const ImageGalleryPage: React.FC = () => (
    <>
        <Head>
            <title>Gallary | Pranshu05</title>
            <meta name="title" content='Gallery | Pranshu05' />
            <meta name="description" content="Portfolio website of Pranshu Patel." />
            <meta name="keywords" content="Pranshu Patel, Pranshu05, Portfolio, Developer, Designer, Engineer, Pranshu, Patel" />
            <meta name="author" content="Pranshu Patel" />
            <meta name="robots" content="index, follow" />
            <meta name="og:type" content="website" />
            <meta name="og:description" content="Portfolio website of Pranshu Patel." />
            <meta name="og:title" content="Gallery | Portfolio" />
        </Head>
        <GalleryContainer />
    </>
)

export default ImageGalleryPage;