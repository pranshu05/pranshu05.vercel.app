import dynamic from "next/dynamic";

const HomeContainer = dynamic(() => import("@/components/(home)/HomeContainer"), {
  ssr: false,
});

const Home: React.FC = () => (<HomeContainer />)

export default Home;