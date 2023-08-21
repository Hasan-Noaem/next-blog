import React from "react";
import style from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
     return (
          <div className={style.container}>
               <div>©2023 Hasan.</div>
               <div className={style.social}>
                    <Image src="/1.png" className={style.icon} width={15} height={15} alt="Hasan"/>
                    <Image src="/2.png" className={style.icon} width={15} height={15} alt="Hasan"/>
                    <Image src="/3.png" className={style.icon} width={15} height={15} alt="Hasan"/>
                    <Image src="/4.png" className={style.icon} width={15} height={15} alt="Hasan"/>
               </div>
          </div>
     );
}

export default Footer;