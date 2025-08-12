import SocialLinksGrid from "@/components/(layout)/SocialLinksGrid";

const Footer: React.FC = () => (
    <footer className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2 max-w-3xl mx-auto pt-8 pb-4">
        <div className="border-t border-zinc-900 text-sm">
            <div className="flex items-center pt-2 justify-between">
                <SocialLinksGrid />
                <a aria-label='Links do not have a discernible name' href="https://github.com/pranshu05" target="_blank" rel="noopener noreferrer" className="link text-zinc-400">Pranshu Patel</a>
            </div>
        </div>
    </footer>
)

export default Footer