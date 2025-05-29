import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="text-sm mb-4">
      <ol className="flex items-center space-x-2">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && <span className="text-gray-400">/</span>}
            <Link
              to={path.url}
              className={`${
                index === paths.length - 1
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 hover:text-blue-600"
              }`}>
              {path.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Breadcrumb;
