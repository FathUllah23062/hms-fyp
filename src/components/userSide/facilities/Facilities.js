import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Facilities.css';
import { FaBed, FaUtensils } from 'react-icons/fa';
import { BiCloset } from "react-icons/bi";
import { FaWifi } from "react-icons/fa";
import { BiSolidCctv } from "react-icons/bi";
import Aos from 'aos';
import 'aos/dist/aos.css';

export function Facilities() {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <section className="facilities bg-light" id="facilites">
      <h1 className="text-center ">  Facilites</h1>
      <hr className="w-25 m-auto" />

      <div className='facilities-content'>
        <ul>
          <li className='mb-3' data-aos="fade-right">
            <FaBed className="me-3" />
            <span>Rooms with attached bathroom</span>
          </li>
          <li className='mb-3' data-aos="fade-left">
            <BiCloset className="me-3" />
            <span>Closet in room</span>
          </li>
          <li className='mb-3' data-aos="fade-right">
            <FaWifi className="me-3" />
            <span>Free wifi</span>
          </li>
          <li className='mb-3' data-aos="fade-left">
            <BiSolidCctv className="me-3" />
            <span>24 houer security with cctv camras</span>
          </li>
          <li className='mb-3' data-aos="fade-right">
            <FaUtensils className="me-3" />
            <span>3 time meal</span>
          </li>
        </ul>
      </div>


    </section>
  )
}


