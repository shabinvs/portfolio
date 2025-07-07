import React, { useRef, useState } from "react";
import { sendForm } from "@emailjs/browser";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/Navbar";

const Contacts = () => {
  const cursorGlowRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState("");

  // Cursor glow animation
  useGSAP(() => {
    const moveGlow = (e) => {
      gsap.to(cursorGlowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    sendForm(
      "your_service_id",    // 🔁 Replace with your actual Service ID from EmailJS
      "your_template_id",   // 🔁 Replace with your actual Template ID
      formRef.current,
      "your_public_key"     // 🔁 Replace with your actual Public Key
    )
      .then((result) => {
        console.log("SUCCESS!", result.text);
        setStatus("✅ Message sent successfully!");
        formRef.current.reset();
        setTimeout(() => setStatus(""), 5000); // Clear after 5s
      })
      .catch((error) => {
        console.error("FAILED...", error.text);
        setStatus("❌ Failed to send message.");
      });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col w-full px-4 sm:px-6">
      <Navbar />

      {/* Cursor Glow Effect */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-blue-500/25 blur-[200px] pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <main className="flex-grow flex items-center justify-center w-full z-10 pt-28 pb-20">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-md space-y-5"
        >
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white placeholder-white/40 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white placeholder-white/40 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Subject</label>
            <input
              name="title"
              type="text"
              required
              placeholder="Subject of your message"
              className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white placeholder-white/40 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Write your message here..."
              className="w-full px-3 py-2 rounded-md bg-zinc-900 text-white placeholder-white/40 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold rounded-md transition duration-300"
          >
            Send Message
          </button>

          {/* Feedback message */}
          {status && (
            <p className="text-center text-sm mt-2 text-white/70">{status}</p>
          )}
        </form>
      </main>

      <footer className="w-full py-4 bg-white/5 backdrop-blur-md border-t border-white/10 text-white/60 text-sm text-center">
        © {new Date().getFullYear()} Shabin VS. All rights reserved.
      </footer>
    </div>
  );
};

export default Contacts;
