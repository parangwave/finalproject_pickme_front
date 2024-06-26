import axios from "axios";
import { useEffect, useRef, useState, Fragment } from "react";
import { renderToString } from "react-dom/server";

// 왼쪽 메뉴바
import LeftMenu from "./LeftMenu/LeftMenu";

// 마커이미지
import MarkerImg from "../../assets/imgs/store/marker.svg";

// icon
import { FaPhone } from "react-icons/fa6";

export default function StoreMap() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [myLocation, setMyLocation] = useState({});
  const [storesInMap, setStoresInMap] = useState();
  // const [render, setRender] = useState(false);

  useEffect(() => {
    // index.html에 script연결이 되어있는지 확인
    window.localStorage.removeItem('product');
    if (!window.naver) {
      console.error("Naver Maps API가 로드되지 않았습니다.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          console.log("좌표는늘도망가..");
        },
        () => {
          setMyLocation({
            //  fallback
            lat: 35.16591583,
            lon: 129.1324683,
          });
        }
      );
    }
  }, []);

  useEffect(() => {
    // 맵 생성조건 - 위치, 줌, 등등 
    if (
      myLocation !== undefined ||
      myLocation !== null ||
      myLocation !== "{}"
    ) {
      // console.log(myLocation);
      const mapOptions = {
        // center: new window.naver.maps.LatLng(35.16591583, 129.1324683),
        center: new window.naver.maps.LatLng(myLocation.lat, myLocation.lon),
        zoom: 16,
      };

      // 지도 초기화
      const map = new window.naver.maps.Map("map", mapOptions);
      mapRef.current = map;

      // 지도 로드시 꼭지점 위치 계산
      getBoundsCorners(map);

      // 지도의 바운드가 변경될 때마다 꼭지점의 위치 업데이트
      // window.naver.maps.Event.addListener(map, "bounds_changed", () => {
      //   getBoundsCorners(map);
      // });
      let timer; // 타이머 변수
      window.naver.maps.Event.addListener(map, "bounds_changed", () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          getBoundsCorners(map);
        }, 500);
      });
    }
  }, [myLocation]);

  // 영역의 꼭지점 구하고 화면 이동시 점포 위치 구하는것
  function getBoundsCorners(map) {
    const bounds = map.getBounds();
    const sw = bounds.getSW(); // 남서쪽(South-West) 꼭지점
    const ne = bounds.getNE(); // 북동쪽(North-East) 꼭지점

    // 남동쪽(South-East)과 북서쪽(North-West) 꼭지점 계산
    const nw = new window.naver.maps.LatLng(ne.lat(), sw.lng());

    // console.log("남서쪽(SW): ", sw);
    // console.log("북동쪽(NE): ", ne);
    // console.log("북서쪽(NW): ", nw);

    // axios로 매장의 값을 받아와야함
    axios
      .get("/store/getstoresinmap", {
        params: {
          swLat: sw._lat,
          nwLat: nw._lat,
          nwLng: nw._lng,
          neLng: ne._lng,
        },
      })
      .then((resp) => {
        // console.log(resp.data);
        const storeData = resp.data;
        // console.log(storeData);
        setStoresInMap(storeData);
        // console.log(storesInMap);

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        markersRef.current = storeData.map((store) => {
          // 기본 생성되는 마커 여기가 for문 -> 자동으로 배열에 계속 추가가 될거임
          const marker = new window.naver.maps.Marker({
            map: map,
            position: new window.naver.maps.LatLng(store.lat, store.lon),
            icon: {
              url: MarkerImg,
              size: new window.naver.maps.Size(25, 25),
              origin: new window.naver.maps.Point(0, 0),
              anchor: new window.naver.maps.Point(11, 35),
            },
          });

          // 마커 클릭 시 InfoWindow 표시
          window.naver.maps.Event.addListener(
            marker,
            "click",
            function () {
              function formatPhoneNumber(phoneNumber) {
                const cleaned = ("" + phoneNumber).replace(/\D/g, "");
                const regex = /^(\d{3})(\d{3})(\d{4,5})$/;
                return cleaned.replace(regex, "$1-$2-$3");
              }

              // InfoWindow의 콘텐츠를 동적으로 생성하는 함수
              const generateInfoWindowContent = (store) => {
                return renderToString(
                  <Fragment>
                    <div style={{ padding: "10px" }}>
                      <p>
                        <span className="font-semibold">{store.name}</span>
                        <br />
                        {store.tel !== "None" ? (
                          <span className="font-medium text-sm">
                            <FaPhone className="inline" />
                            &nbsp;{formatPhoneNumber(store.tel)}
                          </span>
                        ) : (
                          <span className="text-xs">
                            <FaPhone className="inline" /> 전화 ✖
                          </span>
                        )}
                        <br />
                        <span className="text-sm">{store.address}</span>
                      </p>
                    </div>
                  </Fragment>
                );
              };

              const infoWindow = new window.naver.maps.InfoWindow({
                content: generateInfoWindowContent(store),
                maxWidth: 200,
                backgroundColor: "#ffffff",
                anchorSkew: true,
              });

              if (infoWindow.getMap()) {
                infoWindow.close();
              } else {
                infoWindow.open(map, marker);
                map.panTo(marker.getPosition());
              }
            },
            { passive: true }
          );

          return marker;
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    // <div style={{ width: "100%" }}>
    <div className="">
      {/* LeftMenu에 prop로 값 넘기기 */}
      {storesInMap ? <LeftMenu storelist={storesInMap} /> : ""}

      <div id="map" className="h-svh"></div>
    </div>
  );
}
