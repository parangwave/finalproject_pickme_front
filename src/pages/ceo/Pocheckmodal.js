import { useState } from "react";
import { Modal, Button } from "antd";
import axios from "axios";
import Toast from "../public/Toast";


export default function Pocheckmodal({ getPolist, po }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState([]);
  const [expDate, setExpDate] = useState("");

  // 이함수는 모달을 껏다 켰다 하는 함수
  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // 이함수는 만약 부모에게 값을 전달해야할 필요가 있을때 사용하는 함수입니다.
  const handleComplete = (data) => {
    console.table(data);
    const add = {
      zonecode: data.zonecode,
      address: data.address,
    };
    // 부모에게 값 전달
    onToggleModal(); // 주소창은 자동으로 사라지므로 모달만 꺼주면 된다.
  };

  // 생각할점: 재고현황을 한번에 보는것과 먼저 상품으로 묶은뒤 상품을 클릭했을때 각기 주문한 수량 소비기한을 묶어서 보여주는것
  // #0. 승인완료 누를 때 실행되는 함수
  function con() {
    // 받아야하는거 id, quantity, date(소비기한) 이렇게하면 완벽하게 끝! 이해가 안가는 부분 있을까요? 이게 무슨끝인가요?
    const params = {
      id: po.id,
      storeId: po.storeId,
      productId: po.productId,
      quantity: po.quantity,
      expDate: expDate,
    }; 
    // 소비기한 , 스토어아이디
    // #1. purchase_order 테이블에 값을 주입
    // #2. store_product(재고) 테이블에 승인된 물건의 값을 주입
    // 백에서 하나의 axios문으로 두개의 행동을 할것이기 때문에
    axios
      .post("ceo/deleteProduct", null, { params: params })
      .then((resp) => {
        Toast.fire({
          icon: 'success',
          title: "발주한 내역을 최종 확인하였습니다.",
        });
        getPolist("", 0);
      })
      .catch((err) => {
        // 오류가 발생했을 때의 처리
        console.error(err);
      });

    // #3. 모달창 끄기
    onToggleModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={onToggleModal}
        className="bg-sub-yellow rounded-xl p-2 font-bold hover:bg-sub-orange"
      >
        확인하기
      </button>

      {isOpen && (
        <Modal
          open={true}
          centered={true}
          footer={null}
          onCancel={onToggleModal}
        >
          {/* 여기에 모달내부에 보여줄 디자인을 작성 */}
          
          <h1 className="text-lg font-bold">승인 확인되었습니다</h1>
          {/* 이부분은 소비기한이 입력되는 부분 */}
          <div className="text-center items-center">
            <br />
            <div className="text-right">
              <input
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
              &nbsp;&nbsp;
              {/* <div id="wrap">
              <div class="container">
                <div class="container__wrap">
                  <h1 class="container__tit">Modal style datepicker</h1>
                  <div class="input__wrap">
                    <input type="text" className="input__item" placeholder="click me :)"/>
                  </div>
                </div>
              </div>
            </div> */}
              <Button key="submit" onClick={con}>
                소비기한 입력하기
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
