import React, { useState } from "react";
import ImageCircle from '@ft/ui-components/frontend/ImageCircle';
import Image from "next/image";

const Hero = () => {
    return (
        <>
            <div className="relative bg-white dark:bg-dark ">
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 lg:w-5/12">
                            <div className="lg:ml-auto lg:text-right">
                                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                                    <Image
                                        src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png"
                                        alt="hero"
                                        className="max-w-full lg:ml-auto"
                                        width={250}
                                        height={250}
                                    />
                                    <ImageCircle />
                                </div>
                            </div>
                        </div>
                        <div className="hidden px-4 lg:block lg:w-2/12"></div>
                        <div className="w-full px-4 lg:w-5/12">
                            <div className="lg:ml-auto lg:text-right">
                                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                                    <Image
                                        src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png"
                                        alt="hero"
                                        className="max-w-full lg:ml-auto"
                                        width={250}
                                        height={250}
                                    />
                                    <ImageCircle />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;

const SingleImage = ({ href, imgSrc }) => {
    return (
        <>
            <a href={href} className="flex w-full items-center justify-center">
                <Image src={imgSrc} alt="brand image" className="h-10 w-full" />
            </a>
        </>
    );
};
