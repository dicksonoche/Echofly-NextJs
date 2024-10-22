import React from "react";

const TopProfile = ({ AppUsers, FOLLOW_USER, shortenAddress, icon }) => {
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 p-0">
      <div className="card-body d-flex align-items-center p-4 mb-0">
        <h4 className="fw-700 mb-0 font-xssss text-grey-900">Top Profile</h4>
        <a
          href="default-member.html"
          className="fw-600 ms-auto font-xssss text-primary"
        >
          See all
        </a>
      </div>

      {AppUsers.reverse()
        .map((user, index) => (
          <>
            <div
              className="card-body bg-transparent-card d-flex p-3 bg-greylight m-3 rounded-3"
              style={{ marginBottom: "0 !important" }}
            >
              <figure className="avatar me-2 mb-0">
                <img
                  src="images/user.png"
                  alt="image"
                  className="shadow-sm rounded-circle w45"
                />
              </figure>
              <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                {user.name}
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                  {shortenAddress(user.owner)}
                </span>
              </h4>
              <a
                onClick={() => FOLLOW_USER(user.owner)}
                className="btn-round-sm bg-white text-grey-900  font-xss ms-auto mt-2"
              >
                {icon}
              </a>
            </div>
          </>
        ))
        .slice(0, 3)}
    </div>
  );
};

export default TopProfile;
