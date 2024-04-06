import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaGift } from "react-icons/fa6";

function Event() {
  const navigate = useNavigate();
  // 이벤트 목록을 담을 상태 변수
  const [eventlist, setEventlist] = useState([]);
  // 현재 표시할 이벤트 유형 (0: 진행 중인 이벤트, 1: 종료된 이벤트)
  const [eventType, setEventType] = useState(0);

  let adminName = localStorage.getItem("name");

  // 컴포넌트가 마운트되었을 때 이벤트 목록을 가져오는 함수 호출
  useEffect(() => {
    eventlistup();
  }, []);

  // 이벤트 목록을 서버에서 가져오는 함수
  const eventlistup = () => {
    axios
      .get("http://localhost:8080/api/v1/manager/eventlist")
      .then(function (resp) {
        setEventlist(resp.data);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  };

  function EventCreate() {
    navigate("/eventcreate");
  }

  // 진행 중인 이벤트만 보여주는 함수
  const showOngoingEvents = () => {
    setEventType(0);
  };

  // 종료된 이벤트만 보여주는 함수
  const showFinishedEvents = () => {
    setEventType(1);
  };

  return (
    <>
      {/* 이벤트 목록을 화면에 출력 */}
      <div className="max-w-[1300px] mx-auto px-2">
        <div className="flex">
          <FaGift className="text-5xl mr-4" />
          <div className="text-4xl font-bold">이벤트 목록</div>
        </div>
        <br />
        <br />
        <br />
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-0">
          <button
            onClick={showOngoingEvents}
            className="focus:outline-none text-gray-800 bg-yellow-400 hover:bg-yellow-500 font-bold
                    focus:ring-4 focus:ring-yellow-300 rounded-lg mb-10 py-3
                "
          >
            진행중인 이벤트
          </button>
          <button
            onClick={showFinishedEvents}
            className="focus:outline-none text-yellow-400 bg-gray-800 hover:bg-gray-600 font-bold
                    focus:ring-4 focus:ring-gray-800 rounded-lg text-sm mb-10 py-3 
                "
          >
            종료된 이벤트
          </button>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-3">
          {eventlist.map((event) => {
            if (
              (eventType === 0 && event.promotionYn === 0) ||
              (eventType === 1 && event.promotionYn === 1)
            ) {
              return (
                <div
                  key={event.id}
                  className="overflow-hidden hover:ring-8 hover:ring-sub-yellow rounded-[60px] duration-500"
                >
                  {/* 종료된 이벤트인 경우 Link를 적용하지 않음 */}
                  {eventType === 0 && (
                    <Link to={`/eventdetail/${event.id}`}>
                      <img
                        src={event.bannerPhoto}
                        alt="Event Banner"
                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                      />
                    </Link>
                  )}
                  {eventType === 1 && (
                    <img
                      src={event.bannerPhoto}
                      alt="Event Banner"
                      className="w-full h-full object-cover filter grayscale"
                    />
                  )}
                </div>
              );
            }
          })}
        </div>

        <br />
        {adminName === "하기성" && (
          <button
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={EventCreate}
          >
            이벤트 생성
          </button>
        )}
      </div>
    </>
  );
}
export default Event;
