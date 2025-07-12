import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";

const ImageCarousel = ({images}) => {

  const [index, setIndex] = useState(0);
  const [imgToShow, setImgToShow] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(timer);
  }, [images?.length]);

  useEffect(() => {
    console.log(imgToShow)
  }, [imgToShow])

  return (
    <div className="w-[90%] max-w-[300px] md:max-w-full md:w-4/10 h-fit p-10 flex gap-20 overflow-hidden">
      <div className="overflow-hidden shadow-2xl rounded-2xl flex">
        <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
        >
            {images?.map((img, i) => (
            <img
                key={i}
                src={img.public_url}
                alt={`Slide ${i}`}
                onClick={() => setImgToShow(images[i])}
                className="w-full flex-shrink-0 object-cover rounded-2xl"
            />
            ))}
        </div>
      </div>
      {imgToShow && <div style={{ backgroundColor: 'rgba(245, 240, 225, 0.7)' }} className="w-screen h-screen p-10 fixed z-40 top-0 left-0 flex justify-between flex-row-reverse">
        <IoCloseSharp className="text-4xl hover:cursor-pointer" onClick={() => setImgToShow(null)} />
        <div className="w-screen flex justify-center items-center">
            <img src={imgToShow?.public_url} alt="hello" className="h-full" />
        </div>
      </div>}
    </div>
  )
}

export default ImageCarousel
