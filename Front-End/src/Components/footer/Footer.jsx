import React from 'react'
import './Footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='footer'>
            <div className="top">
            <div className="c1">
                <a href="">About us</a>
                <a href="">We're hiring</a>
                <a href="">Hire interns for your company</a>
                <a href="">Post a job</a>
            </div>

            <div className="c2">
                <a href="">Team Diary</a>
                <a href="">Blog</a>
                <a href="">Our Services</a>
            </div>

            <div className="c3">
                <a href="">Terms and Conditions</a>
                <a href="">Privacy</a>
                <a href="">contact us</a>
            </div>
            </div>
            <hr />
            <div className="bottom">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />

            </div>

    </footer>
  )
}

export default Footer
