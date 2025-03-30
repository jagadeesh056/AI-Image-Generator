import React from 'react';

const FormField = ({labelName, type, name, value, handleChange, placeholder, isSurpriseMe, handleSurpriseMe}) => {
    return (
        <div>
           <div className="flex items-center gap-2 mb-2">
                <label htmlFor={name} className="block text-sm font-medium text-gray-900">
                    {labelName}
                </label>
                {isSurpriseMe && (
                    <button
                      type="button"
                      onClick={handleSurpriseMe}
                      className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
                    >
                        Surprise Me
                    </button>
                )}
           </div>
           <input
             type={type}
             value={value}
             name={name}
             placeholder={placeholder}
             onChange={handleChange}
             required
             className="bg-gray-50 border-gray-300 text-gray-900 tex-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"

           />
        </div>
    );
};

export default FormField;