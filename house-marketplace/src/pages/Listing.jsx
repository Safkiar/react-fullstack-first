import React, { useEffect, useState } from 'react'
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'
import shareIcon from '../assets/svg/shareIcon.svg'
import { useNavigate, useParams } from 'react-router'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import SwiperCore from 'swiper';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
const [listing, setListing] = useState(null)
const [loading, setLoading] = useState(true)
const [shareLinkCopied, setSchareLinkCopied] = useState(false)
const navigate = useNavigate()
const params = useParams()
const auth = getAuth()
                  

useEffect(() => {
  const fetchListing = async () => {
  const docRef = doc(db,'listings', params.listingId)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    setListing(docSnap.data())
    setLoading(false)
  }
  }
  fetchListing()
}, [navigate, params.listingId])

if(loading) {
  return <Spinner/>
}

  return (
    <main>
<Swiper
slidesPerView={1}
pagination={{clickable: true}}
>
{console.log(listing.imgUrls)}
{listing.imgUrls.map((url,index) => (
  <SwiperSlide key={index}>
    <div 
      className="swiperSlideDiv" 
      style={{
        background: `url(${url}) center no-repeat`,
        backgroundSize: 'cover',
        minHeight: "20rem",

      }}>
      
    </div>
  </SwiperSlide>
))}
</Swiper>


      <div className="shareIconDiv" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setSchareLinkCopied(true)
        setTimeout(() => {
          setSchareLinkCopied(false)
        },2000)
      }}>
        <img src={shareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}
      <div className="listingDetails">
        <p className="listingName">{listing.name} - ${listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',') : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">For {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms}  Bedrooms` : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
          <p className="listingLocationTitle">Location</p>

          {/* map */}

          {auth.currentUser?.uid !== listing.userRef && (
            <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'
            > Contact Landlord</Link>
          )}
      </div>
    </main>
  )
}

export default Listing
