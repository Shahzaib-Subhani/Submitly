import logo from "/submitly.png";

const FormTemplate = ({ title, description, children = "" }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center font-rubik bg-gray-100 relative overflow-hidden px-4">
        <div className="flex flex-col items-start">
          <img
            src={logo}
            alt="Logo"
            className="w-65 h-18 mb-2 sm:w-75 sm:h-26  object-contain"
          />
        </div>

        <div className="w-full max-w-md bg-white p-3 rounded-2xl shadow-lg z-10">
          <div className="text-start px-6 pt-5">
            <h2 className="text-[24px] font-bold  text-gray-800">{title}</h2>
            {description ? (
              <p className="text-md text-gray-500 mt-1">{description}</p>
            ) : null}
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default FormTemplate;
