import GalleryContainer from '@/components/(gallery)/GalleryContainer';
import Head from 'next/head';

const ImageGalleryPage: React.FC = () => (
    <>
        <Head>
            <title>Gallary | Pranshu05</title>
            <meta name="og:description" content="Portfolio website of Pranshu Patel." />
            <meta name="og:title" content="Gallery | Portfolio" />
        </Head>
        <GalleryContainer />
    </>
)

export default ImageGalleryPage;