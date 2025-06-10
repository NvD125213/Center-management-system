import Banner from "../components/Banner/Banner";
import Services from "../components/Services/Services";
import Subscribe from "../components/Subscribe/Subscribe";
import Roadmap from "../components/Roadmap/Roadmap";
import Teacher from "../components/Teacher/Teacher";
import Hero from "../components/Hero/Hero";
import Chatbot from "../components/Chatbot/Chatbot";

const PortalPage = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Banner />
      <Roadmap />
      <Teacher />
      <Subscribe />
      <Chatbot />
    </div>
  );
};

export default PortalPage;
