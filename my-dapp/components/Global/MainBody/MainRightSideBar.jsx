import React from "react";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";

//INTERNAL IMPORT
import { shortenAddress } from "../../../utils/utils";
import {
  TopProfile,
  Dappusers,
} from "./index";

const MainRightSideBar = ({ AppUsers, FOLLOW_USER }) => {
  return (
    <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
      <Dappusers
        AppUsers={AppUsers}
        FOLLOW_USER={FOLLOW_USER}
        shortenAddress={shortenAddress}
      />

      <TopProfile
        AppUsers={AppUsers}
        shortenAddress={shortenAddress}
        icon={<AiOutlinePlus />}
        FOLLOW_USER={FOLLOW_USER}
      />
    </div>
  );
};

export default MainRightSideBar;
