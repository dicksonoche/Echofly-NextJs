import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";

import { shortenAddress } from "../../utils/utils";
import { BtnLoader } from "./MainBody/index";

const ChatModal = ({
  openChatModel,
  setOpenChatModel,
  sendAddress,
  sendUser,
  READ_MESSAGE,
  userAddress,
  SEND_MESSAGE,
  loader,
  count,
}) => {
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    READ_MESSAGE(sendAddress).then((message) => {
      setMessageHistory(message);
    });
  }, [sendAddress, sendUser, count]);

  const [message, setMessage] = useState("");
  console.log("Hey");
  return (
    <div className={`modal-popup-chat ${openChatModel ? "d-block" : ""}`}>
      <div className="modal-popup-wrap bg-white p-0 shadow-lg rounded-3">
        <div className="modal-popup-header w-100 border-bottom">
          <div className="card p-3 d-block border-0 d-block">
            <figure className="avatar mb-0 float-left me-2">
              <img src="images/user-12.png" alt="image" className="w35 me-1" />
            </figure>
            <h5 className="fw-700 text-primary font-xssss mt-1 mb-1">{sendUser}</h5>

            <div className="new_class_flex">
              <h4 className="text-grey-500 font-xsssss mt-0 mb-0">
                <span className="d-inline-block bg-success btn-round-xss m-0"></span>
                {shortenAddress(sendAddress)}
              </h4>
              <i className=" text-grey-900 mt-2 d-inline-block">
                <AiOutlineClose onClick={() => setOpenChatModel(false)} />
              </i>
            </div>
          </div>
        </div>
        <div className="modal-popup-body w-100 p-3 new_chat_modal">
          {loader && <BtnLoader />}

          {messageHistory?.map((message, index) => (
            <>
              {message.sender.toLowerCase() == userAddress.toLowerCase() ? (
                <>
                  <div className="message text-right">
                    <div className="message-content font-xssss lh-24 fw-500">
                      {message.message}
                    </div>
                  </div>
                  <div className="date-break float-right font-xsssss lh-24 fw-500 text-grey-500 mt-2 mb-2">
                    {new Date(message.timestamp * 1000).toDateString()}
                  </div>
                </>
              ) : (
                <>
                  <div className="message self text-left mt-2">
                    <div className="message-content font-xssss lh-24 fw-500">
                      {message.message}
                    </div>
                  </div>

                  <div className="font-xsssss lh-24 fw-500 text-grey-500 float-left">
                    {new Date(message.timestamp * 1000).toDateString()}
                  </div>
                  <div className="clearfix"></div>
                </>
              )}
            </>
          ))}
        </div>
        <div className="modal-popup-footer w-100 border-top">
          <div className="card p-3 d-block border-0 d-block">
            <div className="form-group icon-right-input style1-input mb-0">
              <input
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Start typing.."
                className="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
              />
              <i
                className=" text-grey-500 font-md"
                onClick={() => SEND_MESSAGE(sendAddress, message)}
              >
                <BsFillSendFill />
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
