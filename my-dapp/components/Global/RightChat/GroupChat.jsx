import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillSendFill } from "react-icons/bs";

import { BtnLoader } from "../MainBody/index";

const GroupChat = ({
  groupChatName,
  groupDescription,
  groupChatID,
  userAddress,
  openGroupChatModel,
  setOpenGroupChatModel,
  GET_GROUP_MESSAGE,
  SEND_GROUP_MESSAGE,
  loader,
  count,
}) => {
  const [messageHistory, setMessageHistory] = useState([]);
  const [groupMessage, setGroupMessage] = useState("");

  useEffect(() => {
    GET_GROUP_MESSAGE(groupChatID).then((message) => {
      setMessageHistory(message);
    });
  }, [groupChatID, groupChatName, count]);

  const displyGroupMessage = [];

  messageHistory?.map((item) => {
    if (item == "") {
      return;
    } else {
      displyGroupMessage.push(item);
      console.log(item);
    }
  });

  return (
    <div className={`modal-popup-chat ${openGroupChatModel ? "d-block" : ""}`}>
      <div className="modal-popup-wrap bg-white p-0 shadow-lg rounded-3">
        <div className="modal-popup-header w-100 border-bottom">
          <div className="card p-3 d-block border-0 d-block">
            <figure className="avatar mb-0 float-left me-2">
              <img src="images/user-12.png" alt="image" className="w35 me-1" />
            </figure>
            <h5 className="fw-700 text-primary font-xssss mt-1 mb-1">
              {groupChatName}
            </h5>

            <div className="new_class_flex">
              <h4 className="text-grey-500 font-xsssss mt-0 mb-0">
                <span className="d-inline-block bg-success btn-round-xss m-0"></span>
                {groupDescription?.slice(0, 75)}...
              </h4>
              <i className=" text-grey-900 mt-2 d-inline-block">
                <AiOutlineClose onClick={() => setOpenGroupChatModel(false)} />
              </i>
            </div>
          </div>
        </div>
        <div className="modal-popup-body w-100 p-3 new_chat_modal">
          {loader && <BtnLoader />}
          {displyGroupMessage?.map((message, index) => (
            <>
              <div className="message self text-right mt-2">
                <div className="message-content font-xssss lh-24 fw-500">
                  {message}
                </div>
              </div>

              <div className="font-xsssss lh-24 fw-500 text-grey-500   float-right">
                MESSAGE ID: {index + 1}
              </div>
              <div className="clearfix"></div>
            </>
          ))}
        </div>
        <div className="modal-popup-footer w-100 border-top">
          <div className="card p-3 d-block border-0 d-block">
            <div className="form-group icon-right-input style1-input mb-0">
              <input
                onChange={(e) => setGroupMessage(e.target.value)}
                type="text"
                placeholder="Start typing.."
                className="form-control rounded-xl bg-greylight border-0 font-xssss fw-500 ps-3"
              />
              <i
                className=" text-grey-500 font-md"
                onClick={() => SEND_GROUP_MESSAGE(groupChatID, groupMessage)}
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

export default GroupChat;
