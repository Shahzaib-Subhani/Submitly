import React from 'react';

const Form = ({title, children}) => {
    return (
        <form className=" mx-auto p-6 bg-white">
          {title && <h2 className="text-xl mb-4">{title}</h2>}
            {children}
        </form>
    );
}

export default Form;
