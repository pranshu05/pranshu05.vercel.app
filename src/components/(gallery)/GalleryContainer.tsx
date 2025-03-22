import ImageGallery from '@/components/(gallery)/ImageGallery';

const GalleryContainer: React.FC = () => {
    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <h1 className="text-2xl font-bold text-zinc-100 mb-6">Gallery</h1>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6">Welcome to my Gallery! Visit my <a href='https://unsplash.com/@pranshu05' target="_blank" className='link'>Unsplash Profile</a>. In my free time I like to do photography. I roam around the campus of the uni spotting different speacies of birds.</p>
            <ImageGallery />
        </div>
    );
};

export default GalleryContainer;