import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ContactForm from "../components/Banner/Banner2";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header cố định */}
      <Navbar />
      {/* Nội dung trang */}
      <main className="flex-1">
        <Outlet />
      </main>
      <ContactForm />
      <Footer />
    </div>
  );
};

export default AppLayout;
