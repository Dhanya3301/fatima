"use client"

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import BirthdayOverlay from "./BirthdayOverlay";

gsap.registerPlugin(ScrollTrigger);

const Polaroids = () => {

    const images = [
        {
            src: "/1.jpg",
            alt: "Image 1",
            title: "OUR BEST PHOTO",
        },
        {
            src: "/2.jpg",
            alt: "Image 2",
            title: "I WAS THE HAPPIEST HERE",
        },
        {
            src: "/3.jpg",
            alt: "Image 3",
            title: "YOU LOOK LIKE MAGICCC",
        },
        {
            src: "/4.jpg",
            alt: "Image 4",
            title: "MY MUSLIM GIRLFRIEND",
        },
    ]

    useEffect(() => {
        gsap.utils.toArray<HTMLElement>('.card').forEach(card => {
            gsap.to(card, {
                scale: 0.7,
                opacity: 0,
                scrollTrigger: {
                  trigger: card,
                  start: "top 0%",
                  end: "bottom 10%",
                  scrub: true,
                },
            });
        })
    })
    return (
        <>
            <BirthdayOverlay />
            <main className="w-full bg-[rgb(25,25,25)] flex flex-col gap-[20vh] text-white text-center items-center py-[15vh]">
                {images.map((image, index) => (
                    <div key={index} className="card h-full sticky top-[10vh] w-[25vw] bg-white shadow-lg rounded-lg mb-[2vh]">
                        <div className="aspect-square overflow-hidden mt-[15px]">
                            <img className="w-full m-[10px] h-full object-contain" src={image.src} alt={image.alt} />
                        </div>
                        <h1 className="text-black font-medium text-base italic">{image.title}</h1>
                    </div>
                ))}
            </main>
        </>
    )
}

export default Polaroids;
