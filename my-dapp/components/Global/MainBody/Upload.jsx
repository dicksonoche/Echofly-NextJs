import React from "react";

const Upload = ({ getRootProps, getInputProps, fileURL }) => {
  return (
    <form action="#">
      <div className="row">
        {!fileURL && (
          <div className="col-lg-12 mb-3">
            <div className="card mt-3 border-0">
              <div
                getRootProps
                className="card-body d-flex justify-content-between align-items-end p-0"
              >
                <div className="form-group mb-0 w-100">
                  <input
                    {...getInputProps()}
                    type="file"
                    name="file"
                    id="file"
                    className="input-file"
                  />
                  <label
                    htmlFor="file"
                    className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed"
                  >
                    <i className=" large-icon me-3 d-block">
                      <BsFillCloudUploadFill />
                    </i>
                    <span className="js-fileName">
                      Drag and drop or click to replace
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {fileURL && <video controls src={fileURL}></video>}

        <div className="col-lg-12 mb-3">
          <label className="mont-font fw-600 font-xsss">Description</label>
          <textarea
            className="form-control mb-0 p-3 h100 bg-greylight lh-16"
            rows="5"
            placeholder="What's happening?"
            spellCheck="false"
          ></textarea>
        </div>

        <div className="col-lg-12">
          <a
            href="#"
            className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
          >
            Post
          </a>
        </div>
      </div>
    </form>
  );
};

export default Upload;
