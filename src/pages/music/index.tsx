import RecentlyPlayed from '@/components/(music)/RecentlyPlayed';
import RecentTracks from '@/components/(music)/RecentTracks';
import TopAlbums from '@/components/(music)/TopAlbums';

const MusicPage: React.FC = () => {
    return (
        <div data-aos="fade-up" className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="pb-8">
                <h1 className="text-3xl font-bold text-zinc-100">Music</h1>
                <p>My Music Activity, feel free to explore! Visit my <a className='link' href='https://last.fm/user/pranshu05' target='_blank'>Last.fm</a> profile</p>
            </div>
            <RecentlyPlayed />
            <RecentTracks />
            <TopAlbums />
        </div>
    );
};

export default MusicPage;