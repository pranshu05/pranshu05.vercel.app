interface MetaInfoProps {
    date: string;
    readTime: number;
    viewCount: number | null;
}

const MetaInfo: React.FC<MetaInfoProps> = ({ date, readTime, viewCount }) => (
    <div className="text-zinc-400 mx-auto text-base">
        {readTime} min read • {viewCount !== null ? viewCount : 'Loading'} views • {date}
    </div>
);

export default MetaInfo;