import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";

const ContactUs = () => {
  return (
    <div className='h-[80vh] flex justify-center items-center gap-10 text-4xl'>
      <a target='_blank' href="https://github.com/aman-prasad1"><FaGithub /></a>
      <a target='_blank' href="https://linkedin.com/in/amanprasad1"><FaLinkedin /></a>
      <a target='_blank' href="https://instagram.com/aman_prasad88"><FaInstagram /></a>
      <a target='_blank' href="mailto:amanprasad048@gmail.com"><IoMailSharp /></a>
    </div>
  )
}

export default ContactUs
