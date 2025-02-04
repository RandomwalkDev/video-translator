import { useState, useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";
import FileUpload from "../components/FileUpload";
import LanguageSelector from "../components/LanguageSelector";
import generateVideo from "../services/api";
import englishVoiced from "../assets/english_translation.mp4";
import tamilVoiced from "../assets/tamil_translation.mp4";
import Hero from "../components/Hero";
import Features from "../components/Features";
import { Play } from "lucide-react";

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
      nextVideoRef.current.addEventListener('loadeddata', resolve, { once: true });
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
    <div className="flex min-h-screen flex-col items-center justify-center p-4 gap-8">
      <Hero onScrollToUpload={handleScrollToUpload} />
      <Features />

      <div className="bg-gradient-to-b from-[#f8f5ff] to-white w-full">
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
            See It in Action
          </h2>
          <div className="max-w-4xl mx-auto relative">
            {/* Video 1 */}
            <VideoPlayer
              ref={video1Ref}
              src={videoSources[language.code]}
              style={{
                display: activeVideo === "video1" ? "block" : "none",
                width: "100%",
              }}
              controls
            />
            {/* Video 2 */}
            <VideoPlayer
              ref={video2Ref}
              src={videoSources[language.code]}
              style={{
                display: activeVideo === "video2" ? "block" : "none",
                width: "100%",
              }}
              controls
            />
            <div className="mt-8 flex justify-center">
              <div className="bg-white p-2 rounded-full shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
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

        <div ref={uploadSectionRef} className="container mx-auto px-4 py-24">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
              Ready to Dub Your Video?
            </h2>
            <p className="text-xl mb-12 text-gray-600 max-w-2xl mx-auto">
              Upload your video and let our AI-powered dubbing technology do the
              rest. It's quick, easy, and produces amazing results!
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Upload Your Video
              </h3>
              <FileUpload onFileUpload={handleFileUpload} />
              <button
                onClick={handleGenerate}
                disabled={!uploadedFile || isGenerating}
                className={`mt-8 flex items-center justify-center px-8 py-4 font-semibold text-white rounded-full transition-all duration-300 ${
                  !uploadedFile || isGenerating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 active:scale-95"
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Generate Dubbed Video
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
