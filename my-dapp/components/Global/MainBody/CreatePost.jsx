import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import {
  AiOutlineEdit,
  AiOutlineVideoCameraAdd,
  AiOutlineCamera,
  AiOutlineFileText,
  AiOutlineLink,
} from "react-icons/ai";
import { HiPhotograph } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { BsFillCloudUploadFill } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";

//INTERNAL IMPRT
import { MainShareLink, Upload, BtnLoader } from "./index";
import { SOCIAL_MEDIA_Context } from "../../../context/context";

const postType = [
  {
    type: "Image and Text",
    icon: <AiOutlineLink />,
  },
  {
    type: "Text only",
    icon: <AiOutlineFileText />,
  },
];

const CreatePost = ({ setOpenCreatePost, CREATE_POST }) => {
  //CONTEXT DATA
  const { PINATA_API_KEY, PINATA_SECRET_KEY, setLoader, loader } =
    useContext(SOCIAL_MEDIA_Context);

  //NOTIFICATION
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [fileURL, setFileURL] = useState("");
  const [uploadLoader, setUploadLoader] = useState(false);

  const [form, setForm] = useState({
    type: "",
    description: "",
  });

  const _calling_CreatePost = async () => {
    try {
      const { type, description } = form;

      if (!type || !description) {
        return console.log("provide all details");
      } else {
        await CREATE_POST(fileURL, type, description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormFieldChange = (fileName, e) => {
    setForm({ ...form, [fileName]: e.target.value });
  };

  const uploadToInfura = async (file) => {
    if (file) {
      try {
        notifySuccess("Uploading to IPFS....");
        setUploadLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(response);
        setFileURL(ImgHash);
        setUploadLoader(false);
        notifySuccess("Uploaded to IPFS, successfully");
      } catch (error) {
        setUploadLoader(false);
        notifyError("Unable to upload image to Pinata, Check your API Keys");
        console.log("Unable to upload image to Pinata", error);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });

  return (
    <div className="middle-sidebar-left">
      <div className="middle-wrap">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0 ">
            <form action="#">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <textarea
                    onChange={(e) => handleFormFieldChange("description", e)}
                    className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                    rows="5"
                    placeholder="What's happening?"
                    spellCheck="false"
                  ></textarea>
                </div>

                {!fileURL && form.type != "Text" && (
                  <div className="col-lg-12 mb-3">
                    <div className="card mt-3 border-0">
                      <div
                        {...getRootProps()}
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

                {fileURL && form.type == "Video" ? (
                  <video controls src={fileURL}></video>
                ) : fileURL && form.type == "Image" ? (
                  <img src={fileURL} alt="" />
                ) : (
                  ""
                )}

                <div className="col-lg-12">
                  {uploadLoader ? (
                    <BtnLoader />
                  ) : (
                    <a
                      onClick={() => _calling_CreatePost()}
                      className="bg-current float-right text-center text-white font-xsss fw-500 p-2 w150 rounded-pill d-inline-block"
                    >
                      Post
                    </a>
                  )}
                </div>
              </div>
            </form>
            <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
              <div className="card-body d-flex p-0 mt-0">
                {postType.map((type, index) => (
                  <a
                    onClick={() => setForm({ ...form, type: type.type })}
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4"
                  >
                    <i
                      className={`font-md me-2`}
                    >
                      {type.icon}
                    </i>
                  </a>
                ))}
                <a
                  onClick={() => setOpenCreatePost(false)}
                  className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
                >
                  <i className="btn-round-sm font-xs text-primary  me-2 bg-greylight">
                    <AiOutlineClose />
                  </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
