import type { Metadata } from "next";
import HomeContainer from "@/components/(home)/HomeContainer";

export const metadata: Metadata = {
    title: 'Pranshu05',
    description: 'Portfolio website of Pranshu05',
};

const Home: React.FC = () => (<HomeContainer />)

export default Home;