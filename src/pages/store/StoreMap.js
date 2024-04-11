import axios from "axios";

// import MapData from "../../assets/data/store/emart24_busan.json";  // 프론트에 있던 기존 매장 data
import MarkerImg from "../../assets/imgs/store/marker.svg";
import { useEffect, useRef, useState } from "react";
import LeftMenu from "./LeftMenu/LeftMenu";

export default function StoreMap() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [myLocation, setMyLocation] = useState({});
  const [storesInMap, setStoresInMap] = useState();
  // const [render, setRender] = useState(false);

  // const [userLatitude, setUserLatitude] = useState(0);
  // const [userLongtitude, setUserLongtitude] = useState(0);
  // const [userPoint, setUserPoint] = useState({});

  useEffect(() => {
    // index.html에 script연결이 되어있는지 확인
    if (!window.naver) {
      console.error("Naver Maps API가 로드되지 않았습니다.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
          console.log("좌표는늘도망가..");
        }, 
        () => {
          setMyLocation({
            //  fallback
            lat: 35.16591583,
            lon: 129.1324683,
          })
        }
      );
    }

    

    // 마커 생성 및 마커 참조에 저장
    // markersRef.current = sampleData.map((store) => new window.naver.maps.Marker({
    //   map: map,
    //   position: new window.naver.maps.LatLng(store.lat, store.lng),
    // }));

    // // 지도 영역 변경 시 마커 표시 업데이트 및 이벤트 딜레이주기
    // const debouncedUpdateVisibleMarkers = debounce(
    //   () => updateVisibleMarkers(map, markersRef.current),
    //   1000
    // ); // 1초 지연
    // window.naver.maps.Event.addListener(
    //   map,
    //   "bounds_changed",
    //   () => debouncedUpdateVisibleMarkers
    // );

    // return () => {
    //   // 페이지가 들어왔다는 상태를 인지 -> 이 상태를 전역변수로 관리 -> 밑 코드가 실행가능
    //   // 페이지에서 이동할 때 현재 페이지에 있는걸 clear -> 페이지 이동
    //   // emptyCacheStorage();
    // };
  }, []);

  useEffect(() => {
    
    // 맵 생성조건 - 위치, 줌, 등등 건드리시면됩니다.
    // 최초 렌더링시 값이 있는 지 확인 엥잘되는듯요
    if (myLocation !== undefined || myLocation !== null || myLocation !== "{}") {
      // console.log(myLocation);
      const mapOptions = {
        // center: new window.naver.maps.LatLng(35.16591583, 129.1324683), //? 버근가?
        center: new window.naver.maps.LatLng(myLocation.lat, myLocation.lon), 
        zoom: 16,
      };
  
      // 지도 초기화
      const map = new window.naver.maps.Map("map", mapOptions);
      mapRef.current = map;
  
      // 지도 로드시 꼭지점 위치 계산
      getBoundsCorners(map);
  
      // 지도의 바운드가 변경될 때마다 꼭지점의 위치 업데이트
      window.naver.maps.Event.addListener(map, 'bounds_changed', ()=> { getBoundsCorners(map) });
    }
    
  }, [myLocation]);

  // 영역의 꼭지점 구하고 화면 이동시 점포 위치 구하는것
  function getBoundsCorners(map) {
    const bounds = map.getBounds();
    const sw = bounds.getSW(); // 남서쪽(South-West) 꼭지점
    const ne = bounds.getNE(); // 북동쪽(North-East) 꼭지점

    // 남동쪽(South-East)과 북서쪽(North-West) 꼭지점 계산
    const nw = new window.naver.maps.LatLng(ne.lat(), sw.lng());
    // const se = new window.naver.maps.LatLng(sw.lat(), ne.lng());
    
    // console.log("남서쪽(SW): ", sw);
    // console.log("북동쪽(NE): ", ne);
    // console.log("북서쪽(NW): ", nw);

    // axios로 매장의 값을 받아와야함
    axios
      .get("/store/getstoresinmap", { params : { "swLat": sw._lat, "nwLat": nw._lat, "nwLng": nw._lng, "neLng": ne._lng } })
      .then((resp) => {
        // console.log(resp.data);
        const storeData = resp.data;
        // console.log(storeData);
        // console.log(storesInMap);
        setStoresInMap(storeData);
        markersRef.current = storeData.map((store) => new window.naver.maps.Marker({
          map: map,
          position: new window.naver.maps.LatLng(store.lat, store.lon),
        }));
        // setRender(!render);
      })
      .catch((err) => {
        alert(err);
      });
  }

  // // 보이는 영역에 따라 마커 표시 업데이트
  // const updateVisibleMarkers = (map, markers) => {
  //   const mapBounds = map.getBounds();
  //   markers.forEach((marker) => {
  //     const isVisible = mapBounds.hasLatLng(marker.getPosition());
  //     marker.setMap(isVisible ? map : null);
  //   });
  // };

  // // 이벤트 발생에 딜레이를 걸어서 발동하게하는 함수
  // function debounce(func, wait) {
  //   let timeout;
  //   return function (...args) {
  //     const context = this;
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(context, args), wait);
  //   };
  // }

  return (
    // <div style={{ width: "100%" }}>
    <div className="h-svh">
      {/* LeftMenu에 prop로 값 넘겨주세요 */}
      {
        storesInMap ?
          <LeftMenu stores={ storesInMap } />
        :
          ""
      }
      {/* <LeftMenu stores={ storesInMap } /> */}
      <div id="map" className="h-svh"></div>
    </div>
  );
}