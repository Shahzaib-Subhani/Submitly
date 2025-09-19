import { Link } from "react-router-dom";

const Footer = ({ spanText, path, linkTitle }) => {
  return (
    <>
      <hr className="my-6 border-gray-300" />
      <div className="text-center">
        <span className="text-gray-500 text-md me-1">{spanText}</span>

        <Link
          to={path}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          {linkTitle}
        </Link>
      </div>
    </>
  );
};

export default Footer;
