import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Navbar from "./components/Navbar";

const App = () => {
  const cursorGlowRef = useRef(null);
  const profileImageRef = useRef(null);
  const introTextRef = useRef(null);
  const resumeBtnRef = useRef(null);
  const socialConnectRef = useRef(null);

  // Cursor glow follow animation
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

  // Intro animations timeline (profile image, text, and resume button)
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out", duration: 1 } });

    tl.fromTo(
      profileImageRef.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0 }
    );

    tl.fromTo(
      [
        introTextRef.current.querySelector("h1"),
        introTextRef.current.querySelector("p"),
      ],
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, stagger: 0.15 },
      "-=0.6"
    );

    tl.fromTo(
      resumeBtnRef.current,
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  // Social icons animation
  useGSAP(() => {
    const el = socialConnectRef.current;
    if (!el) return;

    const targets = [el.querySelector("h2"), ...el.querySelectorAll("a")];
    gsap.set(targets, { autoAlpha: 0, y: 50 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            overwrite: "auto",
          });
        } else {
          gsap.set(targets, { autoAlpha: 0, y: 50 });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center p-6 sm:p-10 flex flex-col items-center"
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      <Navbar />

      {/* Glowing Cursor */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-blue-500/25 blur-[200px] pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      {/* Profile Image */}
      <div
        ref={profileImageRef}
        className="w-52 sm:w-72 h-52 sm:h-72 rounded-full bg-white/5 backdrop-blur-sm border mt-30 border-white/10 shadow-2xl overflow-hidden relative"
        role="img"
        aria-label="Profile image of Shabin, full-stack developer"
      >
        <img
          src="/image.png"
          alt="Portrait of Shabin"
          loading="lazy"
          decoding="async"
          width="288"
          height="288"
          className="h-full w-full object-cover transform scale-125 sm:scale-110 md:scale-120 relative bottom-2 sm:bottom-4 md:bottom-6 transition-transform duration-300"
        />
      </div>

      {/* Intro Text */}
      <section
        ref={introTextRef}
        className="relative z-10 mt-6 sm:mt-10 max-w-2xl text-center text-white px-4"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-md">
          Hi, I’m <span className="text-blue-400">Shabin</span>
        </h1>
        <p className="text-white/70 text-base sm:text-lg leading-loose tracking-normal mb-8">
          I'm a full-stack developer who focuses on crafting fast, scalable, and intuitive web
          experiences. I specialize in React, Node.js, and MongoDB, with a passion for clean design,
          smooth UI, and performance-first development.
        </p>

        {/* Resume Button */}
        <a
          ref={resumeBtnRef}
          href="/Shabin_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="resume-btn inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mb-10"
        >
          View Resume
        </a>
      </section>

      {/* Social Connect */}
      <section
        ref={socialConnectRef}
        className="relative z-10 max-w-2xl text-center text-white px-4 mt-10 sm:mt-16"
      >
        <h2 className="text-xl sm:text-2xl font-medium mb-4 tracking-wide text-blue-300">
          Connect with me
        </h2>
        <div className="flex justify-center gap-4 sm:gap-6 text-xl sm:text-2xl">
          <a
            href="http://www.linkedin.com/in/shabinvs"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-blue-400 transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/shabinvs"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-gray-300 transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/shabin_._x/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="hover:text-pink-400 transition duration-300"
          >
            <FaInstagram />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-12 py-4 bg-white/5 backdrop-blur-md border-t border-white/10 text-white/60 text-sm text-center">
        © {new Date().getFullYear()} Shabin VS. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
