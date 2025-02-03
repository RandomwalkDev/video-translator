import { ArrowRight, Languages, Globe2, Video } from "lucide-react";

const Hero = ({ onScrollToUpload }) => {
  return (
    <div className="relative min-h-[100vh] bg-[#f8f5ff] overflow-hidden">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center z-10">
        <a href="/" className="text-4xl font-cursive">
          VoiceDub AI
        </a>
        <div className="space-x-4">
          <a href="/" className="text-lg font-medium">
            Login
          </a>
          <a
            href="/"
            className="text-lg font-medium px-6 py-2 rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors"
          >
            Signup
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
          Transform Your Videos with AI-Powered Dubbing
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-600">
          Instantly dub your videos into multiple languages, breaking language
          barriers and reaching a global audience
        </p>
        <button
          onClick={onScrollToUpload}
          className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full bg-[#ffd1a8] hover:bg-[#f5c889] transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-48 h-48 rounded-full bg-purple-100 flex items-center justify-center animate-float-slow">
          <Languages className="w-24 h-24 text-green-500" />
        </div>
        <div className="absolute bottom-[15%] right-[10%] w-40 h-40 rounded-full bg-violet-100 flex items-center justify-center animate-float-medium">
          <Video className="w-20 h-20 text-violet-600" />
        </div>
        <div className="absolute top-[60%] left-[15%] w-56 h-56 rounded-full bg-fuchsia-100 flex items-center justify-center animate-float-fast">
          <Globe2 className="w-28 h-28 text-fuchsia-600" />
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.1) 0%, rgba(167, 139, 250, 0.05) 50%, transparent 100%)`,
        }}
      />
    </div>
  );
};

export default Hero;
