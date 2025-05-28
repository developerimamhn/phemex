"use client";


import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { LiaBarsSolid } from "react-icons/lia";
import { VscChromeClose } from "react-icons/vsc";
import logo from './image/logo.png';
import righticon from './image/righticon.png';


const NavBar = () => {
    const [isClicked, setIsClicked] = useState('Spot');
    const [toggle, setToggle] = useState(false);
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);
    const [scrolled, setScrolled] = useState(false); // For background styling
    const [isVisible, setIsVisible] = useState(true); // For show/hide
    const [prevScrollPos, setPrevScrollPos] = useState(0); // Tracks scroll direction

   const navItems = [
    { id: 'BuyCrypto', label: 'Buy Crypto' },
    { id: 'Markets', label: 'Markets' },
    { id: 'Spot', label: 'Spot' },
    { id: 'Earn', label: 'Earn' },
    { id: 'Web3', label: 'Web3' },
  ];

    // Handle clicks outside to close the menu
    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            (!menuButtonRef.current || !menuButtonRef.current.contains(event.target))
        ) {
            setToggle(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Smooth scroll to section
    const handleScroll = (e, sectionId) => {
        e.preventDefault();
        setIsClicked(sectionId);
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: "smooth",
            });
            setToggle(false);
        }
    };

    // Scroll logic for show/hide and background change
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            // Update scrolled state for background styling
            if (currentScrollPos > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Show/hide navbar based on scroll direction
            if (currentScrollPos < 50) {
                setIsVisible(true); // Show near the top
            } else if (currentScrollPos > prevScrollPos) {
                setIsVisible(false); // Hide when scrolling down
            } else {
                setIsVisible(true); // Show when scrolling up
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    const handleScrollToTop   = (e, targetId) => {
        e.preventDefault();
        if (targetId === "") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      

    return (
        <div className={` header ${scrolled ? "scrolled" : " "} z-[150] w-full header backgronsdvg   ${
            isVisible ? "translate-y-0 transition-transform duration-300 " : "-translate-y-full transition-transform duration-300 "}`}>
            <header className='flex justify-between items-center py-[20px] sm:py-[25px] lg:py-[30px] relative  md:overflow-hidden backgroundimage px-[24px] sm:px-[30px] lg:px-[40px]'>
            <dev className='linersext absolute bottom-0 left-0 w-full h-[2px] z-10'></dev>
            <Link onClick={(e) => handleScrollToTop(e, "")} href='#' className='cursor-pointer relative flex  items-center justify-start Froggo-Logo'>
                <Image className='w-full h-[24px] sm:h-[32px] 2xl:h-[38.7px]' src={logo} alt=''/></Link>
                <div className='md:hidden relative top-[-11px] -left-6'>
                    
                    <div 
                        className={`transition-transform duration-300 ease-in-out ${toggle ? 'opacity-100' : 'opacity-0 -translate-x-2'}`}
                        onClick={() => setToggle(!toggle)}
                    >
                        <VscChromeClose className='text-white text-[24px] absolute' />
                    </div>
                    <div ref={menuButtonRef}
                        className={`transition-transform duration-300 ease-in-out ${toggle ? 'opacity-0 translate-x-2' : 'opacity-100'}`}
                        onClick={() => setToggle(!toggle)}
                    >
                        <LiaBarsSolid className='text-white text-[24px] absolute' />
                    </div>
                </div>
                 

                <nav ref={menuRef} className={`mr-auto navbar-items-main absolute  sm:left-0 md:relative duration-1000 z-[99] md:opacity-100 flex justif-start md:justify-center items-start sm:items-center gap-[15px] sm:gap-[16px] md:gap-[20px] lg:gap-[24px] xl:gap-[32px] 2xl:gap-[20px] md:blur-none blur-[200] md:bg-transparent bg-[#15161B] right-0 md:flex-row flex-col p-[20px] md:p-[0] md:w-fit w-full  h-full pl-[24px] sm:pl-[32px] md:pl-[25px] lg:pl-[30px] xl:pl-[48px] 2xl:pl-[60px]
                    ${toggle ? 'top-[67px] h-screen' :'-top-[600%]' }
                    ${toggle ? 'opacity-100' : 'opacity-10'} 
                    `} >
                    {navItems.map((item) => (
                        <a key={item.id} className={`cursor-pointer Link-manu-bar flex justify-center items-center gap-[6px] md:w-fit w-full lg:gap-[8px] ${isClicked === item.id ? 'bg-[#FFF] text-[#060606]' : ' bg-[#7D7DA81A] text-[#fff]'}`} // Added padding and text color for better styling
                        href={`#${item.id}`}onClick={(e) => handleScroll(e, item.id)}>
                        {item.label}
                        </a>
                    ))}

                    <ul className='md:hidden flex flex-col md:w-fit w-full gap-[14px] sm:gap-[15px] md:gap-[16px] lg:gap-[20px] xl:gap-[24px] 2xl:gap-[30px]'>
                        <a className="cursor-pointer bg-[#7D7DA81A] text-white justify-center Link-manu-bar flex items-center gap-[6px] lg:gap-[8px]">
                Log In
                </a>
                    <button className='buttonauditelt cursor-pointer text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] px-[18px] sm:px-[15px] md:px-[16px] lg:px-[20px] xl:px-[24px] 2xl:px-[32px] py-[9px] sm:py-[12px] md:py-[13px] lg:py-[14px] xl:py-[15px] 2xl:py-[16px]  group gap-[7.50px]'>
                    Sign Up
                    </button>
                    </ul>
                </nav>
                
                <ul className='md:flex hidden gap-[14px] sm:gap-[15px] md:gap-[16px] lg:gap-[20px] xl:gap-[24px] 2xl:gap-[30px] ml-atuo'>
                <a className="cursor-pointer bg-[#7D7DA81A] text-[#fff] Link-manu-bar flex items-center gap-[6px] lg:gap-[8px]">
                Log In
                </a>
                <button className='buttonauditelt cursor-pointer text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] px-[18px] sm:px-[15px] md:px-[16px] lg:px-[20px] xl:px-[24px] 2xl:px-[32px] py-[9px] sm:py-[12px] md:py-[13px] lg:py-[14px] xl:py-[15px] 2xl:py-[16px]  group gap-[7.50px]'>
                    Sign Up
                </button>
                </ul>
                
                
            </header>
        </div>
    );
};

export default NavBar;