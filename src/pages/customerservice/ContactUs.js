import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RiCustomerService2Fill } from "react-icons/ri";


function ContactUs() {

    let navigate = useNavigate();

    const [ccblist, setCcblist] = useState([])

    function ccblistup() {
        axios.get("http://localhost:8080/api/v1/manager/ccblist")
                .then(function(resp){
                     console.log(resp.data);
                     setCcblist(resp.data);
                })
                .catch(function(){
                    console.log("error");
                })
    }

    useEffect(() => {
        ccblistup();
    }, []);

    return(
        <>
        <div className="flex justify-center items-center">
            <div>
            <div className="flex flex-col items-center justify-center mt-10 mb-70">
                <div className="flex items-center">
                    <div className="text-[60px] font-bold text-center">무엇을 도와드릴까요?</div>
                    <RiCustomerService2Fill className="ml-2 text-[70px]" />
                </div>
            <div className="mt-2 text-[20px]">궁금하신 질문들을 작성해주세요.</div>
            </div>

 
            <table className="mt-8 w-full border-collapse">
                <colgroup>
                    <col width="100px" />
                    <col width="70px" />
                    <col width="200px" />
                    <col width="500px" />
                    <col width="150px" />
                    <col width="300px" />
                </colgroup>
                <thead>
                    <tr className="bg-gray-500">
                        <th className="px-4 py-2 text-white">번호</th>
                        <th className="px-4 py-2 text-white">분류</th>
                        <th className="px-4 py-2 text-white">상태</th>
                        <th className="px-4 py-2 text-white">제목</th>
                        <th className="px-4 py-2 text-white">작성자</th>
                        <th className="px-4 py-2 text-white">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ccblist.map((ccb, index) => {
                            return (
                                <tr key={ccb.id} className="text-center border-b hover:bg-gray-200 cursor-pointer">
                                    <td className="px-4 py-5">{index + 1}</td>
                                    <td className="px-4 py-2">{ccb.category}</td>
                                    <td className="px-4 py-2">{ccb.answerYn === 0 ? <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                                    <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>진행중</span> 
                                    : <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>답변완료</span>}</td>
                                    <td className="px-4 py-2 text-left">
                                        <Link to={`/contactusdetail/${ccb.id}`} className="text-blue-500 hover:underline">
                                            {ccb.title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">{ccb.customerId}</td>
                                    <td className="px-4 py-2">{ccb.createAt}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <div className="text-center">
            <button className="mt-[50px] bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                onClick={()=>navigate("/contactuswrite")}>문의작성</button>
            </div>
            </div>
        </div>
       </>
    );
}

export default ContactUs;