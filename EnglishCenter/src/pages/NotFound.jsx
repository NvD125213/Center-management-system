import { useState, useEffect } from "react";

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [boost, setBoost] = useState(false); // optional: big jump when clicked

  useEffect(() => {
    // entrance animation
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleGoHome = () => (window.location.href = "/");
  const handleGoBack = () => window.history.back();

  return (
    <main className="h-dvh w-dvw flex flex-col justify-center items-center gap-8 px-4 bg-gradient-to-br from-sky-50 to-sky-100">
      {/* Upper Container */}
      <div
        className={`upper-Container fit-size flex justify-center items-center gap-3 sm:gap-4 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}>
        <span
          className={`fit-size text-8xl md:text-9xl font-bold text-gray-800 transition-all duration-500 ${
            isLoaded ? "animate-pulse" : ""
          }`}
          style={{ animationDuration: "2s", animationIterationCount: "1" }}>
          4
        </span>

        {/* Ghost SVG - auto jumps (no hover needed) */}
        <div
          className={`relative cursor-pointer transform transition-transform duration-300 ${
            boost ? "ghost-boost" : "ghost-jump"
          }`}
          onClick={() => {
            // optional: a stronger jump on click
            setBoost(true);
            setTimeout(() => setBoost(false), 700);
          }}>
          <svg
            width="130"
            height="130"
            viewBox="0 0 130 130"
            className="Ghost-Img h-auto sm:h-full w-[130px] sm:w-auto drop-shadow-lg">
            {/* Ghost Body */}
            <path
              d="M65 20 C40 20, 20 40, 20 65 L20 100 L30 90 L40 100 L50 90 L60 100 L70 90 L80 100 L90 90 L100 100 L110 90 L110 65 C110 40, 90 20, 65 20 Z"
              fill="#eef6ff" /* light bluish body */
              stroke="#cbd5e1"
              strokeWidth="2"
              className="transition-colors duration-300"
            />

            {/* Ghost Eyes */}
            <circle
              cx="50"
              cy="50"
              r="6"
              fill="#1f2937"
              className="transition-colors duration-300"
            />
            <circle
              cx="80"
              cy="50"
              r="6"
              fill="#1f2937"
              className="transition-colors duration-300"
            />

            {/* Ghost Mouth */}
            <ellipse
              cx="65"
              cy="70"
              rx="8"
              ry="12"
              fill="#1f2937"
              className="transition-colors duration-300"
            />

            {/* Floating particles around ghost (subtle, animated) */}
            <circle
              cx="30"
              cy="40"
              r="2"
              fill="#a855f7"
              className="particle particle-1"
            />
            <circle
              cx="100"
              cy="45"
              r="1.5"
              fill="#3b82f6"
              className="particle particle-2"
            />
            <circle
              cx="25"
              cy="80"
              r="1"
              fill="#10b981"
              className="particle particle-3"
            />
          </svg>
        </div>

        <span
          className={`fit-size text-8xl md:text-9xl font-bold text-gray-800 transition-all duration-500 ${
            isLoaded ? "animate-pulse" : ""
          }`}
          style={{
            animationDuration: "2s",
            animationIterationCount: "1",
            animationDelay: "0.2s",
          }}>
          4
        </span>
      </div>

      {/* Lower Container */}
      <div
        className={`lower-Container fit-size text-center flex flex-col gap-6 transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: "0.3s" }}>
        <div className="missing-Text h-fit w-full font-bold text-3xl sm:text-4xl md:text-5xl text-gray-800 transition-colors duration-300 hover:text-gray-600">
          Oops! Page missing!
        </div>

        <div className="missing-Subtext h-fit w-full font-medium text-base sm:text-lg md:text-xl text-neutral-500 transition-colors duration-300">
          Thử tìm lại trang hoặc quay về trang chủ nhé.
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mt-2 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.6s" }}>
          <button
            onClick={handleGoHome}
            className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Về trang chủ
          </button>
        </div>
      </div>

      <style>{`
        /* subtle fade-in helper */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* automatic gentle jump (infinite) */
        @keyframes jump {
          0% { transform: translateY(0); }
          20% { transform: translateY(-14px); }
          40% { transform: translateY(0); }
          60% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        /* stronger boost jump used when clicked */
        @keyframes boost {
          0% { transform: translateY(0); }
          30% { transform: translateY(-28px) scale(1.03); }
          60% { transform: translateY(0) scale(0.995); }
          100% { transform: translateY(0); }
        }

        .ghost-jump { animation: jump 2.6s ease-in-out infinite; }
        .ghost-boost { animation: boost 0.7s cubic-bezier(.22,.9,.36,1) 1; }

        /* particles subtle float/pulse */
        @keyframes particlePulse { 0% { opacity: 0.25; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-4px);} 100% { opacity: 0.25; transform: translateY(0); } }
        .particle { opacity: 0.3; }
        .particle-1 { animation: particlePulse 3s ease-in-out infinite; }
        .particle-2 { animation: particlePulse 2.6s ease-in-out 0.3s infinite; }
        .particle-3 { animation: particlePulse 3.4s ease-in-out 0.6s infinite; }
      `}</style>
    </main>
  );
}
