import React from "react";

const MainLoader = () => {
  return (
    <div className="preloader-wrap p-3">
      <div className="box shimmer">
        <div className="lines">
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
        </div>
      </div>
      <div className="box shimmer mb-3">
        <div className="lines">
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
        </div>
      </div>
      <div className="box shimmer">
        <div className="lines">
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
          <div className="line s_shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default MainLoader;
