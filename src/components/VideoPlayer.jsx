import { forwardRef } from "react";

const VideoPlayer = forwardRef(({ src }, ref) => {
  return (
    <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-lg">
      <video
        ref={ref}
        className="absolute top-0 left-0 w-full h-full object-cover"
        controls
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
