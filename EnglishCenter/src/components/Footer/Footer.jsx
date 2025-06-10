import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";
import Logo from "../../assets/Logo/logo_last.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#f7f7f7] to-[#f0f0f0]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info Section */}
          <div className="space-y-6">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={Logo}
              alt="EZ English Center Logo"
              className="h-16 w-auto object-contain"
            />
            <p className="text-gray-600 leading-relaxed">
              🌟 EZ English Center – Nền tảng tiếng Anh dành cho mọi học viên.
              Từ kiến thức cơ bản đến nâng cao, chúng tôi mang đến trải nghiệm
              học tập toàn diện, giúp bạn tự tin giao tiếp và chinh phục các kỳ
              thi. 🌟
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <FaPhone className="text-primary" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaEnvelope className="text-primary" />
                <span>contact@ezenglish.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <FaMapMarkerAlt className="text-primary" />
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Services", "About", "Contact", "Courses", "Blog"].map(
                (item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 5 }}
                    className="text-gray-600 hover:text-primary cursor-pointer transition-colors duration-200">
                    {item}
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Courses Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Khóa Học</h3>
            <ul className="space-y-3">
              {[
                "Đào tạo tiếng Anh mất gốc từ đầu",
                "Đào tạo tiếng Anh chứng chỉ 450+ ra trường",
                "Đào tạo nâng cao trên 700+",
                "Tiếng Anh 4 kỹ năng",
                "Luyện thi IELTS",
                "Tiếng Anh giao tiếp",
              ].map((course) => (
                <motion.li
                  key={course}
                  whileHover={{ x: 5 }}
                  className="text-gray-600 hover:text-primary cursor-pointer transition-colors duration-200">
                  {course}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Đăng Ký Nhận Tin
            </h3>
            <p className="text-gray-600">
              Đăng ký để nhận thông tin về khóa học mới và các ưu đãi đặc biệt!
            </p>
            <div className="space-y-4">
              <div className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Đăng Ký Ngay
                </motion.button>
              </div>

              {/* Social Media Icons */}
              <div className="pt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  Kết Nối Với Chúng Tôi
                </h4>
                <div className="flex space-x-4">
                  {[
                    {
                      icon: <FaWhatsapp />,
                      link: "https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0",
                    },
                    {
                      icon: <FaInstagram />,
                      link: "https://www.instagram.com/the.coding.journey/",
                    },
                    {
                      icon: <TbWorldWww />,
                      link: "https://thecodingjourney.com/",
                    },
                    {
                      icon: <FaYoutube />,
                      link: "https://www.youtube.com/@TheCodingJourney",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-2xl text-gray-600 hover:text-primary transition-colors duration-200">
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} EZ English Center. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a
                href="#"
                className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
