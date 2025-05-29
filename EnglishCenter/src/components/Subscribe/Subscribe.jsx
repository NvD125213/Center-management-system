import { FaFacebook, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import BgImage from "../../assets/bg.png";
import { motion } from "framer-motion";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    link: "https://facebook.com/zenlish",
    color: "hover:text-[#1877F2]",
  },
  {
    name: "Youtube",
    icon: <FaYoutube />,
    link: "https://youtube.com/zenlish",
    color: "hover:text-[#FF0000]",
  },
  {
    name: "Tiktok",
    icon: <FaTiktok />,
    link: "https://tiktok.com/@zenlish",
    color: "hover:text-[#000000]",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://instagram.com/zenlish",
    color: "hover:text-[#E4405F]",
  },
];

const Subscribe = () => {
  return (
    <section className="bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
        className="container py-24 md:py-48">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center">
          <div className="text-center space-y-6 lg:max-w-[600px] mx-auto">
            <h1 className="text-4xl font-bold !leading-snug ">
              Theo dõi chúng tôi
            </h1>
            <p className="text-lg text-gray-600">
              Hãy follow chúng tôi trên những nền tảng để theo dõi những thông
              tin mới nhất về khóa học, tips học tiếng Anh và nhiều nội dung hữu
              ích khác
            </p>
            <div className="flex justify-center items-center gap-6 mt-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-3xl text-gray-600 transition-all duration-300 ${social.color} hover:scale-110`}>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subscribe;
