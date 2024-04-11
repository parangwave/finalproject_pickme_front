import axios from "axios";
import { useEffect, useState } from "react";
import MyInfoPost from "./MyInfoPost";
import { Button, Modal } from "antd";

export default function MyInfo() {
  const [userInfo, setUserInfo] = useState({});

  // 개인정보 수정
  const [changeInfo, setChangeInfo] = useState(false);
  const [address, setAddress] = useState({}); // 주소
  const [phoneNumber, setPhoneNumber] = useState(""); // 전화번호

  // 비밀번호 수정
  const [changePw, setChangePw] = useState(false);
  const [myPw, setMyPw] = useState(""); // 원래 비밀번호
  const [newPw, setNewPw] = useState(""); // 변경 비밀번호
  const [confirmPw, setConfirmPw] = useState(""); // 비밀번호 확인

  // 회원탈퇴
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getInfo();
  }, []);

  // Axios 호출 [이름, 등급(영문으로변경), 장바구니 수량, 포인트, 쿠폰, 찜 목록, 선물함]
  const getInfo = async () => {
    await axios
      .get("mypage/user/getUserInfo")
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setUserInfo(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // 값 체인지 핸들러
  function chageHandler(i) {
    // console.log(i);
    if (i === 0) {
      // 개인정보 변경
      setChangeInfo(!changeInfo);
    } else if (i === 1) {
      // 비밀번호 변경
      setChangePw(!changePw);
    }
  }

  // 자식에게서 값 받아오기
  function onSetAddress(data) {
    setAddress(data);
  }

  // 전화번호만 가능하게 만들기
  const parsingPhoneNumber = (num) => {
    return num
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(-{1,2})$/g, "");
  };

  // 개인정보 변경
  function changeMyInformation() {}

  // 비밀번호 변경

  const onToggleModal = () => {
    setOpen((prev) => !prev);
  };

  function existUser() {
    // try {
    //   await axios.delete(`customer/cart/delCart/${sProductId}`);
    //   getMyCart();
    // } catch (err) {
    //   alert(err);
    // }
  }

  return (
    <div className="w-[70%] mx-auto">
      {/* Personal Information Section */}
      <div className="flex gap-40">
        <div className="w-[20%]">
          <p className="text-3xl font-bold ">개인정보</p>
        </div>
        <div className="w-[80%] pl-5">
          {/* Individual Info Blocks */}
          <div className="flex gap-12 mb-2">
            <span className="w-24 text-xl font-bold text-gray-600">
              아이디{" "}
            </span>
            <div className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60">
              {userInfo.email}
            </div>
          </div>
          <div className="flex gap-12 mb-2">
            <span className="w-24 text-xl font-bold text-gray-600">이름 </span>
            <div className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60">
              {userInfo.name}
            </div>
          </div>
          <div className="flex gap-12 mb-2">
            {changeInfo && (
              <span className="w-24 text-xl font-bold text-gray-600">
                주소{" "}
              </span>
            )}
            {changeInfo ? (
              <div className="flex gap-3 mb-2">
                <input
                  type="text"
                  placeholder="주소"
                  readOnly="true"
                  className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60 focus:border-sub-yellow focus:outline-none"
                  value={address.address}
                />
                <MyInfoPost updateAddress={onSetAddress} />
              </div>
            ) : (
              <div className="flex gap-12 mb-2">
                <span className="w-24 text-xl font-bold text-gray-600">
                  주소{" "}
                </span>
                <div className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60">
                  {userInfo.address}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-12 mb-2">
            <span className="w-24 text-xl font-bold text-gray-600">
              전화번호{" "}
            </span>
            {changeInfo ? (
              <input
                type="tel"
                placeholder="휴대폰 번호를 입력해주세요"
                maxLength={13}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(parsingPhoneNumber(e.target.value))
                }
                className="text-lg border-2 border-gray-500 rounded-xl p-2 w-72 focus:border-sub-yellow focus:outline-none"
              />
            ) : (
              <div className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60">
                {userInfo.phone}
              </div>
            )}
          </div>
          <div className="flex gap-12 mb-2">
            <span className="w-24 text-xl font-bold text-gray-600">등급 </span>
            <div className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60">
              {userInfo.grade}
            </div>
          </div>
          <div className="flex gap-12 mb-2">
            <span className="w-24 text-xl font-bold text-gray-600">
              가입일{" "}
            </span>
            <div className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60">
              {userInfo.rdate}
            </div>
          </div>
          <div className="mt-3">
            {changeInfo ? (
              <div className="text-right">
                <button
                  type="button"
                  className="bg-sub-yellow rounded-xl p-2 font-bold w-20 hover:bg-sub-orange"
                  onClick={() => chageHandler(0)}
                >
                  확인
                </button>
                <button
                  type="button"
                  className="ml-5 bg-gray-300 rounded-xl p-2 font-bold w-20 hover:bg-gray-500"
                  onClick={() => chageHandler(0)}
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="text-right">
                <button
                  type="button"
                  className="bg-sub-yellow rounded-xl p-2 font-bold w-20 hover:bg-sub-orange"
                  onClick={() => chageHandler(0)}
                >
                  변경
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Section */}
      <div className="flex gap-40">
        <div className="w-[20%] mt-5">
          <p className="text-3xl font-bold">비밀번호 변경</p>
        </div>
        <div className="w-[80%] mt-5 pl-5">
          {/* Password Change Fields */}
          <div className="flex gap-12 mb-2">
            <span className="w-48 text-xl font-bold text-gray-600">
              현재 비밀번호
            </span>
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60 focus:border-sub-yellow focus:outline-none"
              value={myPw}
              onChange={(e) => setMyPw(e.target.value)}
            />
          </div>
          <div className="flex gap-12 mb-2">
            <span className="w-48 text-xl font-bold text-gray-600">
              변경할 비밀번호{" "}
            </span>
            <input
              type="password"
              placeholder="새 비밀번호"
              className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60 focus:border-sub-yellow focus:outline-none"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
          <div className="flex gap-12 mb-2">
            <span className="w-48 text-xl font-bold text-gray-600">
              비밀번호 확인{" "}
            </span>
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="text-lg border-2 border-gray-500 rounded-xl p-2 w-60 focus:border-sub-yellow focus:outline-none"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </div>
          <div className="mt-3">
            {changePw ? (
              <div className="text-right">
                <button
                  type="button"
                  className="bg-sub-yellow rounded-xl p-2 font-bold w-20 hover:bg-sub-orange"
                  onClick={() => chageHandler(1)}
                >
                  확인
                </button>
                <button
                  type="button"
                  className="ml-5 bg-gray-300 rounded-xl p-2 font-bold w-20 hover:bg-gray-500"
                  onClick={() => chageHandler(1)}
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="text-right">
                <button
                  type="button"
                  className="bg-sub-yellow rounded-xl p-2 font-bold w-20 hover:bg-sub-orange"
                  onClick={() => chageHandler(1)}
                >
                  변경
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-40">
        <div className="w-[20%] mt-5">
          <p className="text-3xl font-bold">Pick ME 탈퇴</p>
        </div>
        <div className="w-[80%] mt-5 pl-5">
          <div>
            <button
              type="button"
              className="bg-sub-yellow rounded-xl p-2 font-bold w-20 hover:bg-sub-orange "
              onClick={() => {
                onToggleModal();
              }}
            >
              회원탈퇴
            </button>
            {open && (
              <Modal
                open={true}
                okText="회원탈퇴"
                cancelText="취소"
                onOk={onToggleModal}
                onCancel={onToggleModal}
                footer={null}
              >
                <div className="text-center">
                  <br />
                  <br />
                  <h1 className="text-red-500 font-bold text-2xl">경고문</h1>
                  <br />
                  <h1 className="text-lg">
                    회원을 탈퇴하시면 지금까지의 모든 기록이 사라지고{" "}
                  </h1>
                  <h1 className="text-lg font-bold text-red-600">
                    복구가 불가능합니다.
                  </h1>
                  <br />

                  <h1 className="text-lg">
                    정말로 회원탈퇴를 진행하시겠습니까?
                  </h1>
                  <br />
                  <div className="grid grid-cols-2 gap-5">
                    {/* 버튼을 중앙으로 정렬하기 위한 컨테이너 */}
                    <Button key="back" onClick={onToggleModal}>
                      떠날래요
                    </Button>
                    <Button key="submit" type="primary" onClick={onToggleModal}>
                      더 써볼래요
                    </Button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}