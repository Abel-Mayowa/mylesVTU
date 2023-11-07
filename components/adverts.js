import { Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cube';

export default function Adverts() {
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToTKK4-ja1SZ-cmxoYmVvKzXMdhA2Gb6CHRg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHSgvHNaAzXN5AQzAYR-PgZpoPnJAjwWDWA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcBfrr3EXfA1KQhBMLImnDWpi2SpUFJENItg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1mGdzcBKqEJRgYgxr4O2Rgq14aNiBhkMJQ&usqp=CAU',
  ];

  return (
    <div className="spaceTop">
      <Swiper
        modules={[Autoplay, EffectCube]}
        spaceBetween={30}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={1200}
        effect="slide"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image w="20em" h="5em" src={image} alt={`Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
