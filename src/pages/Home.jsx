import { useState, useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";
import generateVideo from "../services/api";
import englishVoiced from "../assets/english_translation.mp4";
import tamilVoiced from "../assets/tamil_translation.mp4";
import { Play, ArrowRight, Languages, Globe2, Video } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "ta", name: "Tamil" },
  { code: "hi", name: "Hindi" },
];

const Home = () => {
  const [language, setLanguage] = useState(languages[0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeVideo, setActiveVideo] = useState("video1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const uploadSectionRef = useRef(null);

  const videoSources = {
    en: englishVoiced,
    ta: tamilVoiced,
    hi: tamilVoiced, // Add the path for Hindi if available
  };

  const handleScrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    setIsTransitioning(true);

    const currentVideoRef = activeVideo === "video1" ? video1Ref : video2Ref;
    const nextVideoRef = activeVideo === "video1" ? video2Ref : video1Ref;

    // Get current playback state
    const currentTime = currentVideoRef.current.currentTime;
    const wasPlaying = !currentVideoRef.current.paused;

    // Pause the current video first
    currentVideoRef.current.pause();

    // Prepare the next video
    nextVideoRef.current.src = videoSources[lang.code];
    nextVideoRef.current.currentTime = currentTime;

    // Wait for the next video to be ready
    await new Promise((resolve) => {
      nextVideoRef.current.addEventListener("loadeddata", resolve, {
        once: true,
      });
    });

    if (wasPlaying) {
      try {
        await nextVideoRef.current.play();
      } catch (error) {
        console.error("Error playing video:", error);
      }
    }

    // Switch visibility
    setActiveVideo(activeVideo === "video1" ? "video2" : "video1");
    setIsTransitioning(false);
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const handleGenerate = async () => {
    if (!uploadedFile) {
      alert("Please upload a video file first.");
      return;
    }
    setIsGenerating(true);

    try {
      const response = await generateVideo(uploadedFile);
    } catch (err) {
      console.log("Error generating the video.", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col">
      <nav className="flex justify-end p-4">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeLAd-8NF5GWROmbpeq5QMgcOUFmjEdTTMwrU11_fo_6ZHx2A/viewform?usp=header"
          className="text-sm md:text-base font-medium px-4 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors"
          target="_blank"
        >
          Join the Waitlist
        </a>
      </nav>

      <main className="flex-grow flex flex-col-reverse gap-10 md:gap-0 md:flex-row items-center justify-end md:justify-center px-4 md:px-6">
        <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
          <div className="relative z-10 max-w-lg text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
              Transform Your Videos with AI-Powered Dubbing
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-600">
              Instantly dub your videos into multiple languages, breaking language barriers and reaching a global
              audience
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-gradient-to-b from-[#f8f5ff] to-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
            See It in Action
          </h2>
          <div className="max-w-md mx-auto">
            <VideoPlayer
              ref={video1Ref}
              src={videoSources[language.code]}
              style={{
                display: activeVideo === "video1" ? "block" : "none",
                width: "100%",
                height: "auto",
                maxHeight: "50vh",
              }}
              controls
            />
            <VideoPlayer
              ref={video2Ref}
              src={videoSources[language.code]}
              style={{
                display: activeVideo === "video2" ? "block" : "none",
                width: "100%",
                height: "auto",
                maxHeight: "50vh",
              }}
              controls
            />
            <div className="mt-4 flex justify-center">
              <div className="bg-white p-1 rounded-full shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                      language.code === lang.code
                        ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[5%] left-[2%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-purple-100 flex items-center justify-center animate-float-slow">
          <Languages className="w-8 h-8 md:w-12 md:h-12 text-purple-500" />
        </div>
        <div className="absolute bottom-[5%] right-[2%] w-14 h-14 md:w-20 md:h-20 rounded-full bg-violet-100 flex items-center justify-center animate-float-medium">
          <Video className="w-7 h-7 md:w-10 md:h-10 text-violet-600" />
        </div>
        <div className="absolute top-[80%] left-[5%] w-20 h-20 md:w-28 md:h-28 rounded-full bg-fuchsia-100 flex items-center justify-center animate-float-fast">
          <Globe2 className="w-10 h-10 md:w-14 md:h-14 text-fuchsia-600" />
        </div>
      </div>
    </div>
  );
};

export default Home;
