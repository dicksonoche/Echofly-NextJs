import React from "react";

const RightChatPages = ({
  memberGroups,
  setGroupChatName,
  setGroupDescription,
  setGroupChatID,
  setOpenGroupChatModel,
}) => {
  return (
    <div className="section full pe-3 ps-4 pt-0 pb-4 position-relative feed-body">
      {memberGroups?.length != 0 && (
        <h4 className="font-xsssss text-grey-500 text-uppercase fw-700 ls-3">
          Members Groups
        </h4>
      )}

      <ul className="list-group list-group-flush">
        {memberGroups?.map((group, index) => (
          <li
            onClick={() => (
              setOpenGroupChatModel(true),
              setGroupChatName(group.name),
              setGroupDescription(group.description),
              setGroupChatID(group.groupID)
            )}
            className="bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center"
          >
            <span className="btn-round-sm bg-primary-gradient me-3 ls-3 text-white font-xssss fw-700">
              {group.name.slice(0, 2)}
            </span>
            <h3 className="fw-700 mb-0 mt-0">
              <a
                className="font-xssss text-grey-600 d-block text-dark model-popup-chat"
                href="#"
              >
                {group.name}
              </a>
            </h3>
            <span className="bg-success ms-auto btn-round-xss"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightChatPages;
