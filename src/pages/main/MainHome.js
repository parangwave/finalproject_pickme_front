import { Routes, Route} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from '../login/Login';
import LoginGoogle from '../login/LoginGoogle';
import LoginKakao from '../login/LoginKakao';
import LoginNaver from '../login/LoginNaver';
import Productdetail from '../product/Productdetail';
import Productlist from '../product/Productlist';
import StoreMap from '../store/StoreMap';
import StoreProductlist from '../store/StoreProductlist';
import Post from '../customerservice/Post';
import CustomerCenter from '../customerservice/CustomerCenter';
import ContactUs from '../customerservice/ContactUs';
import ContactUsDetail from '../customerservice/ContactUsDetail';
import ContactUsWrite from '../customerservice/ContactUsWrite';
import Faq from '../customerservice/Faq';
import FaqCreate from '../customerservice/FaqCreate';
import MyMain from '../mypage/MyMain';
import Polist from '../ceo/Polist';
import Powrite from '../ceo/Powrite';
import Event from "../manager/Event";
import EventDetail from "../manager/EventDetail";

export default function MainHome() {
  
  return (
    <>
      <header className="w-full sticky top-0 z-50">
        <Header />
      </header>

        <main className="relative">
          <div className='py-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />            
              <Route path='/LoginGoogle' element={<LoginGoogle />} />
              <Route path='/LoginKakao' element={<LoginKakao />} />
              <Route path='/LoginNaver' element={<LoginNaver />} />

              <Route path='/productlist' element={<Productlist />} />
              <Route path='/productdetail/:id' element={<Productdetail />} />

              <Route path='/storeproductlist/:id/:name' element={<StoreProductlist />} />
              {/* <Route path='/matchedstorelist/:id' element={<MatchedStoreList />} /> */}

              <Route path='/store' element={<StoreMap />} />

              <Route path='/post' element={<Post />} />

              <Route path='event' element={<Event />} />
              <Route path='eventdetail/:id' element={<EventDetail />} />

              <Route path='/customercenter' element={<CustomerCenter />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/contactusdetail/:id' element={<ContactUsDetail />} />
              <Route path='/contactuswrite' element={<ContactUsWrite />} />
              <Route path='/faq' element={<Faq />} />
              <Route path='/faqcreate' element={<FaqCreate />} />

              <Route path='/mypage/*' element={<MyMain />} />

              {/* 점주 */}
              <Route path='/ceo' element={<Polist />} />
              <Route path='/pow' element={<Powrite />} />
            </Routes>
          </div>
        </main>

      <footer className='py-4 bg-info text-light'>
        <Footer />
      </footer>
    </>
  );
}