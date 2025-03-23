import ImageGallery from '@/components/(gallery)/ImageGallery';

const GalleryContainer: React.FC = () => {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <h1 className="text-2xl font-bold text-zinc-100 mb-6">Gallery</h1>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">Welcome to my Gallery! In my free time, I like to do photography and capture the majestic beauty of our campus birds. Fun fact: As a senior core member of the <a aria-label='Links do not have a discernible name' className='link' href='https://instagram.com/pmmc__daiict' target='_blank'>PMMC</a> (Photography and Movie Making Club), I once convinced a squirrel to pose for a photo shoot. True story! Feel free visit my <a aria-label='Links do not have a discernible name' href='https://unsplash.com/@pranshu05' target="_blank" className='link'>Unsplash Profile</a>.</p>
            <ImageGallery />
        </div>
    );
};

export default GalleryContainer;