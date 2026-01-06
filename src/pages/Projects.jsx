import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import { FaGithub } from "react-icons/fa";
import movieImg from "../assets/movie.webp";
import cooking from "../assets/cooking.webp";
import civicEye from '../assets/img1.webp';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Nkweda - Women Entrepreneurs Organization",
    image: "/weda.png",
    description:
      "Nkweda is a dedicated organization supporting and empowering women entrepreneurs across Karnataka. The platform serves as a comprehensive hub connecting women business owners with resources, mentorship opportunities, and networking events. It features member profiles, business directories, success stories, and event management systems. Built with a focus on community building and economic empowerment, the website provides tools for skill development, funding opportunities, and collaborative initiatives to help women-led businesses thrive in the Karnataka ecosystem.",
    viewLink: "https://www.nkweda.org/",
  },
  {
    title: "AccoCrunch - Business Registration & Legal Support",
    image: "/accocrunch.png",
    description:
      "AccoCrunch is a comprehensive platform providing end-to-end business registration, tax advisory, compliance, and legal support services for startups, freelancers, SMEs, and growth-focused companies. The website offers streamlined solutions for company incorporation, GST registration, tax filing, trademark registration, and ongoing compliance management. With an intuitive interface, clients can track application status, access expert consultation, and manage all their regulatory requirements in one place. Built to simplify complex legal and financial processes, AccoCrunch empowers entrepreneurs to focus on business growth while ensuring full regulatory compliance.",
    viewLink: "https://www.accocrunch.com/",
  },
  {
    title: "OneStop Recruitment - Staffing Solutions",
    image: "/onestoprecruitment.png",
    description:
      "OneStop Recruitment is a modern staffing and recruitment platform that connects job seekers with employers. The website features advanced job search functionality, candidate profiles, employer dashboards, and an application tracking system. Built with scalability in mind, it provides a seamless experience for both recruiters and job applicants with features like resume uploads, interview scheduling, and communication tools.",
    viewLink: "https://www.onestoprecruitment.ca/",
  },
  {
    title: "Noble Homeware - Premium Home Decor Showcase",
    image: "/noblehomeware.png",
    description:
      "Noble Homeware is an elegant product catalog website showcasing premium home goods and decor items. The platform features beautifully organized product galleries with detailed descriptions, specifications, and high-quality imagery. Built with a focus on visual presentation and user experience, it includes advanced filtering options, category browsing, and inquiry systems for interested customers. The website serves as a digital showroom for the brand's curated collection, providing comprehensive product information and facilitating customer inquiries through an integrated contact system.",
    viewLink: "https://www.noblehomeware.com/",
  },
  {
    title: "Movie Galaxy – IMDb Powered Search",
    image: movieImg,
    description:
      "Movie Galaxy is a sleek and responsive movie search application built using the IMDb API. Users can effortlessly search and explore movies with detailed information like plot summaries, cast, release year, posters, and ratings. With a futuristic galaxy-themed UI, it delivers a smooth and immersive user experience tailored for movie enthusiasts.",
    viewLink: "https://movie-one-alpha.vercel.app/",
    githubLink: "https://github.com/shabinvs/movie",
  },
  {
    title: "FLAVO - Recipe Search & Discovery App",
    image: cooking,
    description:
      "FLAVO is a modern, responsive React application that lets users search and explore a vast collection of delicious recipes from around the world. Powered by TheMealDB API, FLAVO features a sleek and intuitive interface with a real-time search bar, beautifully presented recipe cards, and detailed recipe views including ingredients and step-by-step preparation instructions. Designed with Tailwind CSS, the app provides a seamless experience across all device sizes, making it easy for food lovers to find inspiration for their next meal. Whether you want to cook a classic chicken dish or explore new cuisines, FLAVO makes recipe discovery simple and enjoyable.",
    viewLink: "https://recipe-app-ten-pearl.vercel.app/",
    githubLink: "https://github.com/shabinvs/recipe-app",
  },
  {
  title: "CivicEye",
  image: civicEye, 
  description:
    "CivicEye is a full-stack MERN application designed to streamline the process of reporting, managing, and resolving public complaints. It enables users to register issues such as civic violations, track their complaint status, and receive timely updates. Admins can view, approve, or reject complaints, as well as manage user feedback. The platform features a clean and responsive UI built with React and Tailwind CSS, ensuring a smooth experience on all devices. With secure login and token-based authentication, CivicEye offers transparency and accountability in local governance.",
  viewLink: "https://civic-eye-frontend-nu.vercel.app/",
  githubLink: "https://github.com/shabinvs/Civic_Eye",
}

];

const Projects = () => {
  const cursorGlowRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIdx, setActiveIdx] = useState(null);

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

  useEffect(() => {
    ScrollTrigger.batch(cardRefs.current, {
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.1,
          overwrite: true,
        });
      },
      start: "top 85%",
    });

    cardRefs.current.forEach((card) => {
      gsap.set(card, { autoAlpha: 0, scale: 0.96, y: 50 });
    });
  }, []);

  const handleCardClick = useCallback(
    (idx) => {
      setActiveIdx((prev) => (prev === idx ? null : idx));
    },
    [setActiveIdx]
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col w-full px-4 sm:px-6">
      <Navbar />
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-blue-500/25 blur-[200px] pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <main className="flex-grow w-full z-10 pt-28 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {projects.map((proj, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={idx}
                ref={(el) => (cardRefs.current[idx] = el)}
                tabIndex={0}
                onClick={() => handleCardClick(idx)}
                className={`group bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-md relative w-full max-w-[360px] mx-auto transform transition-transform hover:scale-[1.03] focus-within:scale-[1.03] ${isActive ? "scale-[1.03]" : ""}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 group-focus-within:scale-105 ${isActive ? "scale-105" : ""}`}
                  />
                  <div
                    className={`absolute inset-0 bg-black/70 opacity-0 transition duration-300 flex items-center justify-center gap-4 md:group-hover:opacity-100 md:group-focus-within:opacity-100 ${isActive ? "opacity-100" : ""}`}
                  >
                    {proj.githubLink && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-black hover:bg-gray-300 px-4 py-2 text-sm rounded-md flex items-center gap-2"
                      >
                        <FaGithub className="text-base" />
                        GitHub
                      </a>
                    )}
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
                  <h2 className="text-lg sm:text-2xl font-semibold mb-3 leading-tight">{proj.title}</h2>
                  <p className="text-sm text-white/70 flex-1 overflow-y-auto scrollbar-hide">{proj.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="w-full py-4 bg-white/5 backdrop-blur-md border-t border-white/10 text-white/60 text-sm text-center">
        © {new Date().getFullYear()} Shabin VS. All rights reserved.
      </footer>
    </div>
  );
};

export default Projects;
