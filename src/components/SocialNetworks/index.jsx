import React, {useState} from "react";
import './index.scss';
import {MdOutlineContactSupport} from "react-icons/md";
import {FaFacebook, FaTwitter, FaInstagram, FaAt, FaWhatsapp} from "react-icons/fa";
import {FaW, FaXmark} from "react-icons/fa6";
import {CiAt} from "react-icons/ci";
import {IoAt} from "react-icons/io5";

function SocialNetworks() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div
                id="socialNetworks"
                className={isOpen ? "open" : ""}
                onClick={toggleMenu}
            >
                {isOpen ? <MdOutlineContactSupport/> : <MdOutlineContactSupport/>}
            </div>
            <div className={`additionalNetworks ${isOpen ? "open" : ""}`}>
                <div className="networkIcon networkIcon1">
                    <a href={""}>
                        <IoAt/>
                    </a>
                </div>
                <div className="networkIcon networkIcon2">
                    <a href={""}>
                        <FaWhatsapp/>
                    </a>
                </div>
                <div className="networkIcon networkIcon3">
                    <a href={""}>
                        <FaInstagram/>
                    </a>
                </div>
                <div className="networkIcon networkIcon4">
                    <a href={""}>
                        <FaFacebook/>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SocialNetworks;
