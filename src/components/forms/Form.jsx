import React from 'react';

const Form = ({children}) => {
    return (
        <form className="mx-auto bg-white" id='form'>
            {children}
        </form>
    );
}

export default Form;
