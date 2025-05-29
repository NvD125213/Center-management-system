import Banner from "../components/Banner/Banner";
import Banner2 from "../components/Banner/Banner2";
import Services from "../components/Services/Services";
import Subscribe from "../components/Subscribe/Subscribe";
import Roadmap from "../components/Roadmap/Roadmap";
import Teacher from "../components/Teacher/Teacher";

const PortalPage = () => {
  return (
    <div>
      <Services />
      <Banner />
      <Roadmap />
      <Teacher />
      <Subscribe />
      <Banner2 />
    </div>
  );
};

export default PortalPage;
