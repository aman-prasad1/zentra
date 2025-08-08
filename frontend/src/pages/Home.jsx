import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/ordering.png"; // Add your image to /assets folder

const messages = [
  "Your favorite tech delivered.",
  "Shop smarter. Live better.",
  "Next-gen products, today."
];

const Home = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentMessage.substring(0, text.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setText(currentMessage.substring(0, text.length + 1));
      }, 100);
    }

    if (!isDeleting && text === currentMessage) {
      setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, messageIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-700 text-white flex flex-col-reverse md:flex-row items-center justify-center p-6 md:p-16 gap-12">
      
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="text-yellow-300">Zentra</span>
        </h1>
        <p className="text-lg md:text-xl font-medium h-10 md:h-12">
          {text}
          <span className="animate-pulse">|</span>
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-8 bg-white text-purple-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 hover:text-black transition"
        >
          Explore Products
        </button>
      </div>

      {/* Right Image */}
      <div className="flex-1">
        <img
          src={heroImage}
          alt="Shopping from phone"
          className="w-full max-w-md mx-auto drop-shadow-2xl rounded-xl bg-blend-multiply"
        />
      </div>
    </div>
  );
};

export default Home;
