import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import React from 'react';
import './powrite.css';

const Powrite = () => {
    const [categoryList, setCategoryList] = useState([]);

    const [checkboxList, setCheckboxList] = useState([]); // 체크박스 목록을 저장할 상태
    const [checkboxValues, setCheckboxValues] = useState({}); // 체크박스 값들을 저장할 상태
    
    const [categoryName, setCategoryname] = useState([]);
    const [productList, setProductList] = useState([]);
    const [counters, setCounters] = useState([]); // 각 체크박스에 대한 수량을 저장할 상태

    const [ckyn, setCkyn] = useState(false);

    const [checkedList, setCheckedList] = useState([]);

    // 검색
    const [choice, setChoice] = useState("");
    const [search, setSearch] = useState("");

    const getPowrite = () => {
        axios.get("http://localhost:8080/powriteCn")
            .then(function(resp){
                console.log(resp); // 확인용
                setCategoryList(resp.data);
            })
            .catch(function(err){
                alert('error');
            })
    }

    function searchBtn(){        
        // choice, search 검사
        if(choice === ''){
            alert('카테고리를 선택해 주십시오');
            return;
        }
      getPowrite(choice, search);
    }  

    useEffect(() => {
        getPowrite();
    }, []);

    useEffect(() => {
   
    }, [productList]);

    const onCheckedElement = (checked, item) => {
        if (checked) {
          setCheckedList([...checkedList, item]);
          let b;
          for (let i = 0; i < item.length; i++) {
            b = item[i];
            productList.push(b);
            counters.push(0);
          }
          setProductList(productList);
          setCounters(counters);
          
        } else if (!checked) {
          setCheckedList(checkedList.filter(e => e !== item));
          for (let i = 0; i < item.length; i++) {
            for (let j = 0; j < productList.length; j++) {
                if (productList[j] === item[i]) {
                    productList.splice(j, 1);
                    counters.splice(j, 1);
                } 
            }
            console.log(productList);
            setProductList(productList);
            setCounters(counters);
          }
          // alert('여기에 도달했는지');
          setProductList(productList);
          setCounters(counters);
        }
      };

    //   const onRemove = item => {
    //     // setCheckedList(checkedList.filter(e => e !== item));
    //     setProductList

    //   };
      const onRemove = i => {
        productList.splice(i, 1);
        counters.splice(i, 1);
        setProductList(productList.filter(() => productList));
        setCounters(counters.filter(() => counters));

      };

          // 체크박스를 토글하는 함수
    const handleCheckboxChange = (id, isChecked) => {
        setCheckboxValues({
            ...checkboxValues,
            [id]: isChecked
        });
        if (isChecked) {
            setCounters(prevCounters => ({
                ...prevCounters,
                [id]: 1 // 체크된 상태에서는 수량을 1로 초기화
            }));
        } else {
            setCounters(prevCounters => ({
                ...prevCounters,
                [id]: 0 // 체크가 해제되면 수량을 0으로 초기화
            }));
        }
    };

    // 카운터를 증가시키는 함수
    // const increaseCounter = (i) => {
    //    setCounters(prevCounters => ({
    //        ...prevCounters,
    //        [i]: prevCounters[i] + 1 // 해당 제품의 수량 증가
    //    }));
        // 숫자를 올릴때 배열에서 object로 바뀌기 때문에 이걸 고치면 된다.
        // console.log(counters);
        // console.log(productList);
    //};
    const increaseCounter = (i) => {
        setCounters(prevCounters => {
            const newCounters = [...prevCounters];
            newCounters[i]++;
            return newCounters; 
        });
        console.log(counters);
    };

    // 카운터를 감소시키는 함수
    const decreaseCounter = (i) => {
        if (counters[i] > 0) { 
            setCounters(prevCounters => {
                const newCounters = [...prevCounters];
                newCounters[i]--;
                return newCounters; 
            });
        }
        // alert(counters[i]);
    };

      const categoryNames = Array.from(new Set(categoryList.map((item) => item.categoryName)));
      console.log(categoryNames);

      const categoryCN = categoryNames.map((categoryName) => {
        const subMenus = categoryList
          .filter((item) => item.categoryName === categoryName)
          .map((item) => item["name"]);
        return { categoryName, "name": subMenus };
      });

      function button() {
        console.log(categoryCN);
      }

    return(
        <div>
            <div>
                <table style={{ marginLeft:"auto", marginRight:'auto', marginTop:"3px", marginBottom:"3px" }}>
                    <tbody>
                        <tr>
                            <td style={{ paddingLeft:"3px" }}>
                                <select className='custom-select' value={choice} onChange={(e)=>{setChoice(e.target.value)}}>
                                    <option value="name">상품명</option>
                                </select>
                                <button onClick={button}>확인용</button>
                            </td>
                            <td style={{ paddingLeft:"5px"}} className='align-middle'>
                                <input className='form-control' placeholder='상품명을 입력하세요' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            </td>
                            <td style={{ paddingLeft:"5px" }}>
                                <button className='btn btn-primary' onClick={searchBtn}>검색</button>
                            </td>
                        </tr>                
                    </tbody>    
                </table>
            </div>
            <div>
                <div>카테고리</div>
                <div className='grid grid-cols-2 gap-8 rounded-2xl p-2'>
                    <div>
                        
                    {categoryCN.map((item, i) => {

                        console.log("카테고리 리스트 : ");
                        console.log(item);

                        return (
                        <div key={item} className='grid grid-cols-2'>
                             <div className='bg-slate-400'>
                             { item.categoryName }
                                <input type="checkbox" onChange={e => { onCheckedElement(e.target.checked, item.name ); }}/>
                                {/* <input type='checkbox' id={`checkbox-${item.id}`} checked={checkboxValues[`checkbox-${item.id}`] || false} onChange={(e) => handleCheckboxChange(`checkbox-${item.id}`, e.target.checked)}/> */}
                            </div> 

                        </div>
                        );
                    })}
                    </div>
                    <div>
                        {checkedList.length === 0 && (
                            <div>{'카테고리를 지정해 주세요.'}</div>
                        )}
                        {productList.map((item, i) => {
                            // console.log("체크 리스트 : ");
                            // console.log(item);
                            console.log(item.id);

                            return (
                            <div key={i} className='bg-slate-300 grid grid-cols-2'>
                                    <p>{productList[i]}</p>
                                    
                                <div className='bg-slate-500' onClick={() => onRemove(i)} >
                                X<br/></div>
                                <span><button onClick={() => increaseCounter(i)}>+</button></span>
                                            <span>{counters[i]}</span>
                                            <span><button onClick={() => decreaseCounter(i)}>-</button></span>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <button>발주신청</button>
        </div>
    );
}
export default Powrite;