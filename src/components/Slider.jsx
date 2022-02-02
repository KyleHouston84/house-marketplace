import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import Spinner from "./Spinner";

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchLisings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
  
      const querySnap = await getDocs(q);
  
      let listings = [];
  
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      
      setListings(listings);
      setLoading(false);
    };

    fetchLisings();
  }, [])

  if (loading) return <Spinner />;

  if (listings.length === 0) return <></>;

  return listings && (
    <>
      <p className="exploreHeading">Recent Listings</p>

      <Swiper
        slidesPerView={1}
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        autoplay={{delay: 4000, disableOnInteraction: true}}
        pagination={{ clickable: true }}>
        {listings.map(({data, id}) => (
          <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
            <div 
              className="swiperSlideDiv"
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
                cursor: 'pointer'
              }} 
            >
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                ${data.offer 
                  ? data.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
                  : data.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {data.type === 'rent' && ' / Month'}
              </p>
            </div>
          </SwiperSlide>
        ))}  
      </Swiper>
    </>
  );
}

export default Slider;
