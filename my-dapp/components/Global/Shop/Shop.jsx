import React from "react";

//INTERNAL IMPORT
import Tokens from "../../../Ads/tokenAds.json";

const Shop = () => {
  return (
    <div className="main-content bg-white right-chat-active">
      <div className="middle-sidebar-bottom">
        <div className="middle-sidebar-left">
          <div className="row">
            <div className="col-xl-12 col-xxl-12 col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
                    <div className="bg-pattern-div"></div>
                    <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                      POPULAR ERC20 TOKENS
                      <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">
                        TOP 9 TOKENS FOUND
                      </span>
                    </h2>
                  </div>
                </div>
                {Tokens.map((token, index) => (
                  <div className="col-lg-4 col-md-6">
                    <div className="card w-100 border-0 mt-4">
                      <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                        <a href={token.Link} target="_blank" rel="noreferrer">
                          <img
                            src={token.brand}
                            alt="product-image"
                            className="w-100 mt-0 mb-0 p-5"
                          />
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

export default Shop;
