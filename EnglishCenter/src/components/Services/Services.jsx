import { motion } from "framer-motion";
import { TbWorldWww } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { SiIntellijidea } from "react-icons/si";

import { FaUserCheck } from "react-icons/fa";

const ServicesData = [
  {
    id: 1,
    title: "+10000",
    sub_title: "Học viên năm 2025",
    link: "#",
    icon: <FaUserCheck className="text-[#1976d2]" />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "+5000",
    sub_title: "Học viên thi đỗ TOEIC quốc tế",
    link: "#",
    icon: <FaUserGraduate className="text-[#1976d2]" />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "TOP 1",
    sub_title: "Đào tạo TOEIC tại Hà Nội",
    link: "#",
    icon: <TbWorldWww className="text-[#1976d2]" />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "TOP 1",
    sub_title: "Đào tạo TOEIC 4 Kỹ năng tại Hà Nội",
    link: "#",
    icon: <SiIntellijidea className="text-[#1976d2]" />,
    delay: 0.5,
  },
];

const SlideUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

const Services = () => {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Thành tựu nổi bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Với nhiều năm kinh nghiệm trong lĩnh vực đào tạo tiếng Anh, chúng
            tôi tự hào về những thành tựu đã đạt được
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ServicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={SlideUp(service.delay)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="absolute -top-4 left-6 w-12 h-12 bg-[#1976d2]/10 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 text-[#1976d2]">
                {service.icon}
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#1976d2] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.sub_title}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/0 via-[#1976d2]/50 to-secondary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
