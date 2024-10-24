import React, { useState } from "react";
import { MdOutlineAttachment } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";

//INTERNAL IMPORT
import { shortenAddress } from "../../../utils/utils";
import { BiUser } from "react-icons/bi";

const Message = ({
  intrestedUsers,
  setOpenChatModel,
  setSendUser,
  setSendAddress,
}) => {
  const displyFollowing = [];

  intrestedUsers.map((item) => {
    if (item.owner == "0x0000000000000000000000000000000000000000") {
      console.log("delete iTem");
    } else {
      displyFollowing.push(item);
      console.log(item);
    }
  });

  const [active, setActive] = useState();
  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div
          className="middle-sidebar-left pe-0 ps-lg-3 ms-0 me-0"
          style={{ maxWidth: "100%" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                <ul className="email-message">
                  {displyFollowing.map((user, index) => (
                    <li
                      key={index}
                      onClick={() => (
                        setOpenChatModel(true),
                        setSendAddress(user.owner),
                        setSendUser(user.name)
                      )}
                    >
                      <a
                        onClick={() => setActive(index)}
                        className={`rounded-3 ${
                          active == index ? "bg-lightblue" : ""
                        } theme-light-bg`}
                      >
                        <div className="form-check mt-1">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="blankCheckbox1"
                            value="option1"
                            aria-label=""
                          />
                          <label
                            className="text-grey-500 font-xssss"
                            htmlFor="blankCheckbox1"
                          ></label>
                        </div>
                        <div className="email-user">
                          <span className="btn-round-xss ms-0 bg-success me-2"></span>
                          <i className="btn-round-md font-xl text-white bg-black">
                            <BiUser />
                          </i>
                          <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-700">
                            {user.name}
                          </h6>
                        </div>
                        <div className="email-subject text-grey-900 text-dark fw-600 font-xssss">
                          <i className=" font-xss text-warning me-2">
                            <AiOutlineStar />
                          </i>
                          {shortenAddress(user.owner)}
                        </div>
                        <div className="email-text text-grey-500 fw-600 font-xssss">
                          Ckeck all the latest message form your friend{" "}
                          {user.name}
                        </div>
                        <span className="email-file">
                          <i className=" font-xss btn-round-sm text-grey-500 me-2 p-0">
                            <MdOutlineAttachment />
                          </i>
                        </span>
                        <div className="email-time text-grey-500 fw-600">
                          USERID: {user.userID}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
