import type { Metadata } from "next";
import dynamic from "next/dynamic";

const HomeContainer = dynamic(() => import("@/components/(home)/HomeContainer"), {
    ssr: false,
  });

export const metadata: Metadata = {
    title: 'Pranshu05',
    description: 'Portfolio website of Pranshu05',
};

const Home: React.FC = () => (<HomeContainer />)

export default Home;