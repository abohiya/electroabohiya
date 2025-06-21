'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-[#0b1831] text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-sm">
        
        {/* 1. الشعار */}
        <div className="flex justify-start md:justify-start items-center">
          <Image
            src="/images/logo-blue.png"
            alt="Electro Abohiya"
            width={120}
            height={40}
            className="object-contain"
          />
        </div>

        {/* 2. الأيقونات وحقوق النشر */}
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <div className="flex gap-4 text-white text-base">
            <Link href="#"><FontAwesomeIcon icon={faPhone} /></Link>
            <Link href="#"><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link href="#"><FontAwesomeIcon icon={faFacebookF} /></Link>
          </div>
          <p className="text-gray-400 mt-2">© 2025 Electro Abohiya</p>
          <Link href="#" className="text-blue-300 underline">Contact Us</Link>
        </div>

        {/* 3. وسائل الدفع */}
        <div className="flex justify-center md:justify-end items-center">
          <Image
            src="/images/payment/payment-methods.png"
            alt="Payment Methods"
            width={140}
            height={30}
            className="object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
