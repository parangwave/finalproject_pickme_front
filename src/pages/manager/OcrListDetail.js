import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ManagerMain from "./ManagerMain";
import Toast from "../public/Toast";

function OcrListDetail() {
  let params = useParams();
  const navigate = useNavigate();
  const [ocr, setOcr] = useState([]);

  function ocrlistdetail(id) {
    axios
      .get("user/ocrlistdetail", {
        params: { id: id },
      })
      .then(function (resp) {
        console.log(resp.data);
        setOcr(resp.data);
      })
      .catch(function () {
        console.log("error");
      });
  }

  useEffect(function () {
    ocrlistdetail(params.id);
  }, []);

  function ocrapproval(id) {
    axios
      .get("user/ocrapproval", {
        params: { id: id },
      })
      .then(function (resp) {
        console.log(resp.data);
        if (resp.data === "YES") {
          Toast.fire({
            icon: "success",
            title: "사업자등록 승인이 완료되었습니다.",
          });
          navigate("/manager/ocrlist");
        }
      })
      .catch(function () {
        console.log("error");
      });
  }

  function goocrlist() {
    navigate("/manager/ocrlist");
  }
  return (
    <>
      <div className="flex">
        <ManagerMain height="h-[1800px]" />
        <div className="mt-[150px] w-full mx-10">
          <div className="text-3xl font-bold mb-3">상세보기</div>
          <hr className="border-gray-500" />
          <br />
          <br />
          <div className="flex items-center justify-center">
            <img src={ocr.url} className="w-3/5" />
          </div>
          <br />
          <br />
          <div className="flex items-center justify-center">
            <button
              className="bg-sub-yellow hover:bg-sub-orange py-3 px-10 rounded-xl font-bold mr-4"
              onClick={() => ocrapproval(params.id)}
            >
              승인
            </button>
            <button
              className="bg-sub-yellow hover:bg-sub-orange py-3 px-10 rounded-xl font-bold"
              onClick={() => goocrlist()}
            >
              목록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OcrListDetail;
