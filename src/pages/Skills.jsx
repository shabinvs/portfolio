import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const titleRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const sectionRefs = useRef([]);

  // Mouse glow
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

  // Title animation
  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const cards = section.querySelectorAll(".skill-card");

      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        cards,
        { autoAlpha: 0, scale: 0.95 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const sectionData = [
    {
      title: "Programming Languages",
      skills: [
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          label: "JavaScript",
        },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
          label: "HTML/CSS",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          label: "ReactJS",
        },
        {
          icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
          label: "TailwindCSS",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
          label: "Bootstrap",
        },
      ],
    },
    {
      title: "Backend & Databases",
      skills: [
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
          label: "NodeJS",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
          label: "ExpressJS",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
          label: "MongoDB",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
          label: "MySQL",
        },
      ],
    },
    {
      title: "Dev Tools & Libraries",
      skills: [
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
          label: "Git",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
          label: "GitHub",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
          label: "Redux",
        },
        {
          icon: "https://raw.githubusercontent.com/nodemailer/nodemailer/master/assets/nm_logo_200x136.png",
          label: "Nodemailer",
        },
        {
          icon: "https://jwt.io/img/pic_logo.svg",
          label: "JWT",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
          label: "Socket.io",
        },
      ],
    },
    {
      title: "Deployment",
      skills: [
        {
          icon: "https://seeklogo.com/images/N/netlify-logo-758722CDF4-seeklogo.com.png",
          label: "Netlify",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
          label: "Vercel",
        },
        {
          icon: "/render-logo.jpg",
          label: "Render",
        },
      ],
    },
    {
      title: "Design & Editing",
      skills: [
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
          label: "Figma",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
          label: "Photoshop",
        },
        {
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg",
          label: "Premiere Pro",
        },
      ],
    },
    {
      title: "Payment Gateway",
      skills: [
        {
          icon: "https://logo.svgcdn.com/l/stripe.svg",
          label: "Stripe",
        },
        {
          icon: "https://logo.svgcdn.com/s/razorpay-dark.svg",
          label: "Razorpay",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center w-full px-4 sm:px-6 bg-black">
      <Navbar />
      <div
        ref={cursorGlowRef}
        className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-blue-500/25 blur-[200px] pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />
      <main className="flex-grow flex flex-col mt-28 items-center justify-center text-white w-full z-10">
        <section className="w-full max-w-6xl mx-auto text-center px-4">
          {sectionData.map((sec, idx) => (
            <div
              key={idx}
              ref={(el) => (sectionRefs.current[idx] = el)}
              className="mb-14"
            >
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
                {sec.title}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {sec.skills.map((skill, j) => (
                  <div
                    key={j}
                    className="skill-card flex flex-col items-center justify-center w-full max-w-[160px] p-5 bg-white/10 rounded-2xl backdrop-blur-sm transition-transform duration-300 transform hover:scale-110"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.label}
                      className="w-14 h-14 object-contain"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/64")
                      }
                    />
                    <p className="mt-3 text-sm font-medium">{skill.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="w-full py-4 bg-white/5 backdrop-blur-md border-t border-white/10 text-white/60 text-sm text-center">
        © {new Date().getFullYear()} Shabin VS. All rights reserved.
      </footer>
    </div>
  );
};

export default Skills;
