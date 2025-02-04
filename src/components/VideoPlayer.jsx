import { forwardRef } from "react";

const VideoPlayer = forwardRef(({ src, ...props }, ref) => {
  return (
    <video ref={ref} {...props}>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
});

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
