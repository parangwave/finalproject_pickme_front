
import { useState } from 'react';
import { Link } from 'react-router-dom';

// 즉석조리 - 컵라면
import InstantIcon_top from "../../assets/imgs/main/searchProduct/instant/instant_top.svg";
import InstantIcon_body from "../../assets/imgs/main/searchProduct/instant/instant_body.svg";

// 간편식사 - 햄버거
import ConvIcon_top from "../../assets/imgs/main/searchProduct/conv/hamburger_topbun.svg";
import ConvIcon_btm from "../../assets/imgs/main/searchProduct/conv/hamburger_btmGroup.svg";

// 아이스 - 아이스크림
import IcecreamIcon_body from "../../assets/imgs/main/searchProduct/icecream/icecream.svg";

// 스낵/과자류 - 도넛
import SnackIcon_bf from "../../assets/imgs/main/searchProduct/snack/snackBF.svg";
import SnackIcon_af from "../../assets/imgs/main/searchProduct/snack/snackAF.svg";

// 생활용품 - 세제
import Household_top from "../../assets/imgs/main/searchProduct/household/household_top.svg";
import Household_body from "../../assets/imgs/main/searchProduct/household/household_body.svg";
import Bubble_bf from "../../assets/imgs/main/searchProduct/household/bubbleBF.svg";
import Bubble_af from "../../assets/imgs/main/searchProduct/household/bubbleAF.svg";

// 음료 - 캔음료
import Drink_bf from "../../assets/imgs/main/searchProduct/drink/drink_body.svg";
import Drink_af from "../../assets/imgs/main/searchProduct/drink/drink.svg";

// 식품 - 삶은 계란
import Egg_behind from "../../assets/imgs/main/searchProduct/food/eggLeft.svg";
import Egg_front from "../../assets/imgs/main/searchProduct/food/eggRight.svg";


const SearchProduct = () => {
  const [drinkHovered, setDrinkHovered] = useState(false);
  const [donutHovered, setDonutHovered] = useState(false);
  
  return (
    <>
      <div className="bg-white drop-shadow-2xl rounded-2xl m-auto mb-11">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between mb-11">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              상품찾기
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-slate-500 hover:text-slate-900 transition duration-300">
              <button>더보기</button>
            </h2>
          </div>
          <form className="flex items-center justify-center">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-screen">
              <input
                type="text"
                // id="voice-search"
                className="py-6 bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs text-lg
                          rounded-lg focus:border-gray-300 focus-visible:ring-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500
                          hover:drop-shadow-xl duration-300 ease-in-out text-center
                          block w-full ps-10 px-12"
                placeholder="찾고 싶은 상품을 입력하세요!"
                required
              />

              <div>
                {/* 음성검색 버튼 */}
                {/* <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-12
                            text-gray-400 hover:text-gray-700 transition-colors duration-400 ease-in-out "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    />
                  </svg>
                </button> */}

                {/* 검색 버튼 */}
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-4
                      text-gray-400 focus:outline-none focus:text-gray-800
                      hover:text-gray-700 transition-colors duration-400 ease-in-out 
                       rounded-full text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* <button
              type="submit"
              // className="inline-flex items-center py-5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            > */}
          </form>

          {/* 상품 카테고리 아이콘 */}
          {/* bg-[#FFEFBA] */}
          <section className="mt-10 p-5 sm:p-2 rounded-full bg-[#FFEFBA]">
            <div className='flex items-center'
              >
              {/* 음료 */}
              <div className='sm:px-0 flex flex-col items-center justify-center relative group'
                    onMouseEnter={() => setDrinkHovered(true)}
                    onMouseLeave={() => setDrinkHovered(false)}
                >
                <p className="absolute sm:py-3 p-2 top-1/2 z-10 text-center text-2xl font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:bg-[#E91235] group-hover:text-white transition duration-300">
                  음료
                </p>
                <Link>
                  <img src={drinkHovered ? Drink_af : Drink_bf} alt='음료 카테고리 아이콘' className={`transition duration-300 scale-75 ${drinkHovered ? "" : "mt-16"}`} />
                </Link>
              </div>

              {/* 간편식사 */}
              <div className='sm:px-0 px-16 relative group mb-30'>
                <p className="absolute sm:py-3 p-3 left-[36%] top-1/2 text-center text-2xl font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:bg-[#F37335] group-hover:text-white transition duration-300">
                  간편식사
                </p>
                <Link>
                  <img src={ConvIcon_top} alt="간편식사 카테고리 아이콘 top" 
                      className='z-10 translate-y-[55%] scale-[80%] transition duration-300 ease-in-out translate-x-0 group-hover:translate-x-28 group-hover:translate-y-9 group-hover:rotate-45 transform' />
                  <img src={ConvIcon_btm} alt="간편식사 카테고리 아이콘 bottom" className='scale-[85%]' />
                </Link>
              </div>
              
              {/* 즉석조리 */}
              <div className='px-16'>
                <Link>
                  <img src={InstantIcon_top} alt="" />
                  <img src={InstantIcon_body} alt="" />
                </Link>
              </div>

              
            </div>

            <div className='flex mt-20 items-center'>
              
              {/* 과자류 */}
              <div className='relative group'
                  onMouseEnter={() => setDonutHovered(true)}
                  onMouseLeave={() => setDonutHovered(false)}
                >
                <p className="absolute mb-2 sm:py-3 p-3 text-center text-2xl font-semibold bg-transparent text-transparent rounded-full 
                            group-hover:bg-[#ff6e7f] group-hover:text-white transition duration-300">
                  과자류
                </p> 
                <Link>
                  <img src={donutHovered ? SnackIcon_af : SnackIcon_bf}  alt="과자류 카테고리 아이콘" className='transition duration-300 scale-90' />
                </Link>
              </div>

              {/* 아이스 */}
              <div className='sm:px-0'>
                <Link>
                  <img src={IcecreamIcon_body} alt="아이스크림 카테고리 아이콘 hover 이후" className='scale-[70%]' />
                  {/* <img src={IcecreamIcon_body} alt="아이스크림 카테고리 아이콘 hover 이후" /> */}
                </Link>
              </div>

              {/* 식품 */}
              <div className='relative sm:px-0 p-4 group'>
                <Link>
                  <div className="relative">
                    <p className="inline-block my-5 sm:py-3 p-2 text-center text-2xl font-semibold bg-transparent text-transparent rounded-full 
                              group-hover:bg-[#FDC830] group-hover:text-white transition duration-300 absolute top-5 left-1/3 z-10">
                      식품
                    </p>
                    <img src={Egg_behind} alt="" className='scale-[86%]' />
                  </div>
                  <img 
                    src={Egg_front} 
                    alt="" 
                    className='absolute top-0 left-0 scale-75 transition duration-300 ease-in-out 
                              translate-x-0 group-hover:-translate-x-20 group-hover:translate-y-6 group-hover:-rotate-12 transform' 
                  />
                </Link>
              </div>

              {/* 생활용품 */}
              <div className='sm:px-0 group relative'>
                <p className="inline-block my-5 sm:py-3 p-2 text-center text-2xl font-semibold bg-transparent text-transparent rounded-full 
                          group-hover:bg-[#22c1c3] group-hover:text-white transition duration-300 absolute top-8 right-[40%]">
                  생활용품
                </p>
                <Link>
                  <img src={Household_top} alt="생활용품 카테고리 아이콘 top" 
                        className='scale-[20%] translate-y-[55%] -translate-x-[14%] transition duration-300 ease-in-out group-hover:translate-x-4 group-hover:-translate-y-9 group-hover:rotate-45 transform' />
                  <img src={Household_body} alt="생활용품 카테고리 아이콘 body" className='scale-90' />
                </Link>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
