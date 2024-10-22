import React from "react";

const Input = ({ Icon, title, placeholder, handleClick }) => {
  return (
    <div className="form-group icon-input mb-3">
      <i className="font-sm  text-grey-500 pe-0">{Icon}</i>
      <input
        type="text"
        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
        placeholder={placeholder}
        onChange={handleClick}
      />
    </div>
  );
};

export default Input;
