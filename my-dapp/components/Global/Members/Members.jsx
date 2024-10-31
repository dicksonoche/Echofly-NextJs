import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BiSolidFilterAlt, BiUser } from "react-icons/bi";

//INTERNAL IMPORT
import { shortenAddress } from "../../../utils/utils";

const Members = ({ AppUsers, FOLLOW_USER }) => {
  //NEW LOCAL STATE
  const [allUser, setAllUser] = useState(AppUsers);
  const [allUserCopy, setAllUserCopy] = useState(AppUsers);

  console.log(AppUsers);

  //FILTER
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  //FILTER ALL POST
  const onHandleSearch = (value) => {
    const filteredUsers = AppUsers.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredUsers.length === 0) {
      setAllUser(allUserCopy);
    } else {
      setAllUser(filteredUsers);
    }
  };

  const onClearSearch = () => {
    if (AppUsers.length && allUserCopy.length) {
      setAllUser(allUserCopy);
    }
  };
  return (
    <div className="main-content right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left pe-0">
          <div className="row">
            <div className="col-xl-12">
              <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                <div className="card-body d-flex align-items-center p-0">
                  <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
                    Unfollowed Users
                  </h2>
                  <div className="search-form-2 ms-auto">
                    <i className=" font-xss">
                      <BsSearch />
                    </i>
                    <input
                      type="text"
                      className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                      placeholder="Search here."
                      onChange={(e) => setSearchItem(e.target.value)}
                      value={searchItem}
                    />
                  </div>
                  <a
                    href="#"
                    className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"
                  >
                    <i className=" font-xss text-grey-500">
                      <BiSolidFilterAlt />
                    </i>
                  </a>
                </div>
              </div>

              <div className="row ps-2 pe-1">
                {allUser.reverse().map((user, index) => (
                  <div key={index + 1} className="col-md-4 col-sm-6 pe-2 ps-2">
                    <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                      <div className="card-body d-block w-100 p-4 text-center">
                        <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                          <i className="btn-round-md font-xl text-white bg-black">
                            <BiUser />
                          </i>
                        </figure>
                        <div className="clearfix"></div>
                        <h4 className="fw-700 font-xss mt-3 mb-0">
                          {user.name}
                        </h4>
                        <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                          {shortenAddress(user.owner)}
                        </p>

                        <ul className="d-flex align-items-center justify-content-center mt-1">
                          <li className="m-1">
                            <img src="images/top-student.svg" alt="icon" />
                          </li>
                          <li className="m-1">
                            <img src="images/onfire.svg" alt="icon" />
                          </li>
                          <li className="m-1">
                            <img src="images/challenge-medal.svg" alt="icon" />
                          </li>
                          <li className="m-1">
                            <img src="images/fast-graduate.svg" alt="icon" />
                          </li>
                        </ul>
                        <a
                          onClick={() => FOLLOW_USER(user.owner)}
                          className="mt-4 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                        >
                          FOLLOW
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
