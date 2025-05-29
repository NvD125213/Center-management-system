import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero.jsx";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header cố định */}
      <Hero />

      {/* Nội dung trang */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
