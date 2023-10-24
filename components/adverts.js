import {Image} from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {SwiperCore,Autoplay} from 'swiper';

SwiperCore.use([Autoplay]);



export default function Adverts(){


const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTKK4-ja1SZ-cmxoYmVvKzXMdhA2Gb6CHRg&usqp=CAU;',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHSgvHNaAzXN5AQzAYR-PgZpoPnJAjwWDWA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcBfrr3EXfA1KQhBMLImnDWpi2SpUFJENItg&usqp=CAU',"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1mGdzcBKqEJRgYgxr4O2Rgq14aNiBhkMJQ&usqp=CAU",
];

  return (

    <div className="spaceTop">
    <Swiper 
      spaceBetween={3}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      effect="fade"
      autoplay={{delay:1500}}
    loop>

      {images.map((image, index) => (
        <SwiperSlide key={index}>

          <Image src={image} alt={`Image ${index + 1}`} />

        </SwiperSlide>
      ))}
    </Swiper>
      </div>
  )
};
