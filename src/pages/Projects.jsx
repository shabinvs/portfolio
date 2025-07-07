import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../components/Navbar";
import { FaGithub } from "react-icons/fa";
import movieImg from "../assets/movie.png";

const Projects = () => {
  const cursorGlowRef = useRef(null);

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

  const projects = [
    {
      title: "Movie Galaxy – IMDb Powered Search",
      image: movieImg,
      description:
        "Movie Galaxy is a sleek and responsive movie search application built using the IMDb API. Users can effortlessly search and explore movies with detailed information like plot summaries, cast, release year, posters, and ratings. With a futuristic galaxy-themed UI, it delivers a smooth and immersive user experience tailored for movie enthusiasts.",
      viewLink: "https://movie-one-alpha.vercel.app/",
      githubLink: "https://github.com/shabinvs/movie",
    },
    
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col w-full px-4 sm:px-6">
      <Navbar />

      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-blue-500/25 blur-[200px] pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      <main className="flex-grow w-full z-10 pt-28 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="
                bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl
                overflow-hidden shadow-md group relative
                w-full max-w-full
                mx-auto
                max-w-[320px] sm:max-w-[360px] md:max-w-none
              "
            >
              <div className="relative overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-4">
                  <a
                    href={proj.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black hover:bg-gray-300 px-4 py-2 text-sm rounded-md flex items-center gap-2"
                  >
                    <FaGithub className="text-base" />
                    GitHub
                  </a>
                  <a
                    href={proj.viewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm rounded-md"
                  >
                    View
                  </a>
                </div>
              </div>

              <div className="p-4 flex flex-col h-52">
                <h2 className="text-base sm:text-lg font-semibold mb-2 leading-tight">
                  {proj.title}
                </h2>
                <p className="text-sm text-white/70 flex-1 overflow-y-auto scrollbar-hide">
                  {proj.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full py-4 bg-white/5 backdrop-blur-md border-t border-white/10 text-white/60 text-sm text-center">
        © {new Date().getFullYear()} Shabin VS. All rights reserved.
      </footer>
    </div>
  );
};

export default Projects;
