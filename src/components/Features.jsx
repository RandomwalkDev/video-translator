import { Globe, Mic, Zap } from "lucide-react"

const features = [
  {
    icon: <Globe className="h-12 w-12 text-purple-600" />,
    title: "Multiple Languages",
    description: "Dub your videos into various languages including English, Tamil, and Hindi.",
  },
  {
    icon: <Mic className="h-12 w-12 text-violet-600" />,
    title: "High-Quality Voice",
    description: "Our AI generates natural-sounding voices for a seamless dubbing experience.",
  },
  {
    icon: <Zap className="h-12 w-12 text-fuchsia-600" />,
    title: "Fast Processing",
    description: "Get your dubbed videos quickly with our efficient AI-powered technology.",
  },
]

const Features = () => {
  return (
    <div className="container mx-auto px-4 py-24 relative overflow-hidden">
      <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-600 to-violet-600 text-transparent bg-clip-text">
        Why Choose Our Video Dubbing App?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex justify-center mb-6 transform hover:scale-110 transition-transform duration-300 ease-in-out">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[5%] w-32 h-32 rounded-full bg-purple-100 animate-float-slow opacity-50"></div>
        <div className="absolute bottom-[15%] left-[10%] w-24 h-24 rounded-full bg-violet-100 animate-float-medium opacity-50"></div>
        <div className="absolute top-[40%] right-[15%] w-40 h-40 rounded-full bg-fuchsia-100 animate-float-fast opacity-50"></div>
      </div>
    </div>
  )
}

export default Features

