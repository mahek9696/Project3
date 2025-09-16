import React, { useRef, useEffect } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import khadishutra from "../../assets/khadishutra.png";

export default function TryOn() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const img = new Image();
  img.src = khadishutra;

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (typeof videoRef.current !== "undefined" && videoRef.current !== null) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const onResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    // Draw user video
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];

      // Example: get chin landmark (landmark index ~152)
      const chin = landmarks[152];

      // Convert relative coords to pixel coords
      const x = chin.x * canvasRef.current.width;
      const y = chin.y * canvasRef.current.height;

      // Draw Khadishutra under chin
      const scale = 200; // adjust size
      canvasCtx.drawImage(img, x - scale / 2, y, scale, scale);
    }

    canvasCtx.restore();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Virtual Try On</h2>
      <video ref={videoRef} className="hidden" playsInline></video>
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="border-2 border-gray-400 rounded-lg shadow-lg"
      />
      <p className="mt-4 text-gray-600">
        Position your face in the camera to try on the product
      </p>
    </div>
  );
}
