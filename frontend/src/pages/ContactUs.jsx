import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { LuMail, LuMapPin, LuClock, LuSend, LuLock } from "react-icons/lu";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { sendContactMessageApi } from '../features/auth/api/authApi.js';

const ContactUs = () => {
  const { user } = useSelector((state) => state.authSlice);
  
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await sendContactMessageApi(formData);
      setSubmitted(true);
      setFormData({ name: user?.name || "", email: user?.email || "", subject: "", message: "" });
    } catch (err) {
      setErrorMsg(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-(--main-bg) min-h-screen px-4 sm:px-8 lg:px-20 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-medium">
        <Link to="/" className="hover:text-black transition">Home</Link>
        <HiOutlineChevronRight className="text-[10px]" />
        <span className="text-gray-900 font-semibold">Contact Us</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        
        {/* Left: Contact Info & Socials */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Get in touch</h1>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Have a question, feedback, or need help with an order? Drop us a line, and our support team will get back to you shortly.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Info Cards */}
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 shrink-0">
                <LuMail className="text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Email Us</span>
                <a href="mailto:amanprasad048@gmail.com" className="text-sm font-semibold text-gray-800 hover:underline">
                  amanprasad048@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 shrink-0">
                <LuClock className="text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Response Time</span>
                <span className="text-sm font-semibold text-gray-800">Within 24 Hours</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 shrink-0">
                <LuMapPin className="text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Location</span>
                <span className="text-sm font-semibold text-gray-800">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Socials Connection */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Connect with us</h3>
            <div className="flex gap-3">
              <a 
                target="_blank" 
                rel="noreferrer"
                href="https://github.com/aman-prasad1" 
                className="w-10 h-10 rounded-full border border-gray-250 flex items-center justify-center text-gray-750 hover:bg-black hover:text-white hover:border-black transition duration-300"
              >
                <FaGithub className="text-lg" />
              </a>
              <a 
                target="_blank" 
                rel="noreferrer"
                href="https://linkedin.com/in/amanprasad1" 
                className="w-10 h-10 rounded-full border border-gray-250 flex items-center justify-center text-gray-750 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-300"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a 
                target="_blank" 
                rel="noreferrer"
                href="https://instagram.com/aman_prasad88" 
                className="w-10 h-10 rounded-full border border-gray-250 flex items-center justify-center text-gray-750 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition duration-300"
              >
                <FaInstagram className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm w-full">
          {!user ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <LuLock className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sign in to send a message</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  Please log in to your Zentra account to contact customer support or submit an inquiry.
                </p>
              </div>
              <Link 
                to="/login" 
                className="mt-2 px-6 py-2.5 bg-black text-white hover:bg-gray-900 rounded-xl text-sm font-medium transition shadow-sm"
              >
                Sign In
              </Link>
            </div>
          ) : submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4 animate-scaleIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <IoCheckmarkCircleOutline className="text-3xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Message sent successfully</h3>
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  Thank you for reaching out! We have received your inquiry and will contact you shortly.
                </p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-2 px-6 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold transition hover:cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Send Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700">Your Name</label>
                  <input 
                    required
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm disabled:opacity-75 disabled:cursor-not-allowed"
                    disabled
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Your Email</label>
                  <input 
                    required
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm disabled:opacity-75 disabled:cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject</label>
                <input 
                  required
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Order Inquiry / Support Request"
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  required
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full bg-gray-50 border border-gray-200 outline-none rounded-xl py-3 px-4 focus:border-black focus:bg-white transition text-sm resize-none"
                />
              </div>

              {errorMsg && <span className="text-xs font-semibold text-red-650 mt-1">*{errorMsg}</span>}

              <button 
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 px-6 rounded-2xl bg-black text-white hover:bg-gray-950 font-bold transition flex items-center justify-center gap-2 shadow-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuSend className="text-base" />
                <span>{loading ? "Sending Message..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
