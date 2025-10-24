import React, { useRef, useEffect, useState, useCallback } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera as MediaPipeCamera } from "@mediapipe/camera_utils";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera as CameraIcon, Share2, ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";

const SMOOTHING_WINDOW = 4;

export default function TryOn() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.product;

  const [cameraStarted, setCameraStarted] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [neckOffset, setNeckOffset] = useState(0.05);
  const [scaleMultiplier, setScaleMultiplier] = useState(2.2);

  const [img, setImg] = useState(() => {
    const newImg = new Image();
    newImg.crossOrigin = "Anonymous";
    return newImg;
  });

  const cameraRef = useRef(null);
  const imageLoadedRef = useRef(false);
  const faceMeshRef = useRef(null);

  // Load product image
  useEffect(() => {
    if (!productData?.image) {
      console.error("No product image found");
      return;
    }

    img.onload = () => {
      console.log("Product image loaded:", img.width, "x", img.height);
      imageLoadedRef.current = true;
    };

    img.onerror = (error) => {
      console.error("Error loading product image:", error);
      imageLoadedRef.current = false;
      alert("Failed to load product image");
    };

    img.src = productData.image;

    return () => {
      imageLoadedRef.current = false;
    };
  }, [productData, img]);

  // Setup camera only when no photo is captured
  useEffect(() => {
    if (capturedPhoto) return; // Don't start camera if photo already captured

    let faceMesh;
    let camera;

    const onResults = (results) => {
      if (!canvasRef.current) return;

      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Just show live camera feed
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      canvasCtx.restore();
    };

    const setupCamera = async () => {
      faceMesh = new FaceMesh({
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
      faceMeshRef.current = faceMesh;

      if (videoRef.current) {
        camera = new MediaPipeCamera(videoRef.current, {
          onFrame: async () => {
            if (faceMesh) {
              await faceMesh.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
          facingMode: "user",
        });

        await camera.start();
        cameraRef.current = camera;
        setCameraStarted(true);
      }
    };

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      if (faceMesh) {
        faceMesh.close();
      }

      if (camera) {
        try {
          if (camera.video && camera.video.srcObject) {
            const cameraTracks = camera.video.srcObject.getTracks();
            cameraTracks.forEach((track) => track.stop());
          }
        } catch (err) {
          console.error("Error in camera cleanup:", err);
        }
      }

      setCameraStarted(false);
    };
  }, [capturedPhoto]);

  // Step 1: Capture photo
  const capturePhoto = useCallback(() => {
    if (!canvasRef.current) {
      alert("Canvas not ready");
      return;
    }

    const dataURL = canvasRef.current.toDataURL("image/png");
    setCapturedPhoto(dataURL);

    // Stop camera
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (cameraRef.current) {
      try {
        if (cameraRef.current.video && cameraRef.current.video.srcObject) {
          const cameraTracks = cameraRef.current.video.srcObject.getTracks();
          cameraTracks.forEach((track) => track.stop());
        }
      } catch (err) {
        console.error("Error stopping camera:", err);
      }
    }
    setCameraStarted(false);
  }, []);

  // Step 2: Apply product to captured photo
  const applyProduct = useCallback(async () => {
    if (!capturedPhoto || !imageLoadedRef.current) {
      alert("Photo or product not ready");
      return;
    }

    setIsProcessing(true);

    try {
      const capturedImg = new Image();
      capturedImg.crossOrigin = "Anonymous";

      // Wait for image to load
      await new Promise((resolve, reject) => {
        capturedImg.onload = resolve;
        capturedImg.onerror = reject;
        capturedImg.src = capturedPhoto;
      });

      console.log("Captured image loaded successfully");

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Create a new FaceMesh instance for processing static image
      const staticFaceMesh = new FaceMesh({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      staticFaceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      console.log("FaceMesh initialized for static image");

      // Process the image
      const detectionResult = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Face detection timeout"));
        }, 5000);

        staticFaceMesh.onResults((results) => {
          clearTimeout(timeout);
          console.log("Face detection results received:", results);
          resolve(results);
        });

        staticFaceMesh.send({ image: capturedImg }).catch(reject);
      });

      // Close the static FaceMesh instance
      staticFaceMesh.close();

      if (
        !detectionResult.multiFaceLandmarks ||
        detectionResult.multiFaceLandmarks.length === 0
      ) {
        console.error("No face landmarks detected");
        alert(
          "No face detected in the photo. Please ensure your face is clearly visible and try again."
        );
        setIsProcessing(false);
        return;
      }

      console.log("Face detected successfully");

      const detectedLandmarks = detectionResult.multiFaceLandmarks[0];

      // Draw captured photo first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(capturedImg, 0, 0, canvas.width, canvas.height);

      // Get key landmarks
      const leftEye = detectedLandmarks[33];
      const rightEye = detectedLandmarks[263];
      const chin = detectedLandmarks[152];
      const forehead = detectedLandmarks[10];

      console.log(
        "Landmarks - chin:",
        chin,
        "leftEye:",
        leftEye,
        "rightEye:",
        rightEye
      );

      // Calculate scale based on eye distance
      const eyeDistance = Math.sqrt(
        Math.pow((rightEye.x - leftEye.x) * canvas.width, 2) +
          Math.pow((rightEye.y - leftEye.y) * canvas.height, 2)
      );

      const baseScale = eyeDistance * scaleMultiplier;
      const imgAspectRatio = img.height / img.width;
      const width = baseScale;
      const height = baseScale * imgAspectRatio;

      console.log("Product dimensions - width:", width, "height:", height);

      // Calculate position - place at neck (below chin)
      const faceHeight = Math.abs(forehead.y - chin.y) * canvas.height;
      const dynamicOffset = faceHeight * neckOffset;

      const x = chin.x * canvas.width;
      const y = chin.y * canvas.height + dynamicOffset;

      console.log(
        "Product position - x:",
        x,
        "y:",
        y,
        "offset:",
        dynamicOffset
      );

      // Calculate rotation based on eye alignment
      const dx = rightEye.x - leftEye.x;
      const dy = rightEye.y - leftEye.y;
      const angle = Math.atan2(dy, dx);

      console.log("Rotation angle:", angle * (180 / Math.PI), "degrees");

      // Draw product on captured photo
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.drawImage(img, -width / 2, 0, width, height);
      ctx.restore();

      // Save final result
      const finalDataURL = canvas.toDataURL("image/png");
      setFinalResult(finalDataURL);
      setIsProcessing(false);

      console.log("Product applied successfully!");
    } catch (err) {
      console.error("Error applying product:", err);
      alert(`Failed to apply product: ${err.message}. Please try again.`);
      setIsProcessing(false);
    }
  }, [capturedPhoto, img, neckOffset, scaleMultiplier]);

  // Retake photo
  const retakePhoto = useCallback(() => {
    setCapturedPhoto(null);
    setFinalResult(null);
    setIsProcessing(false);
  }, []);

  // Share/Download final result
  const shareResult = () => {
    if (!finalResult) {
      alert("No result to share");
      return;
    }

    if (navigator.share) {
      fetch(finalResult)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "try-on-result.png", {
            type: "image/png",
          });
          navigator
            .share({
              title: `${productData?.title || "Product"} Try-On`,
              text: "Check out how this looks!",
              files: [file],
            })
            .catch(() => downloadResult());
        })
        .catch(() => downloadResult());
    } else {
      downloadResult();
    }
  };

  const downloadResult = () => {
    const link = document.createElement("a");
    link.download = "try-on-result.png";
    link.href = finalResult;
    link.click();
  };

  const handleBack = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (cameraRef.current) {
      try {
        if (cameraRef.current.video && cameraRef.current.video.srcObject) {
          const cameraTracks = cameraRef.current.video.srcObject.getTracks();
          cameraTracks.forEach((track) => track.stop());
        }
      } catch (err) {
        console.error("Error stopping camera:", err);
      }
    }
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">Virtual Try On</h2>
        </div>

        {productData && (
          <div className="mb-4 p-3 bg-white rounded-lg shadow flex items-center gap-4">
            <img
              src={productData.image}
              alt={productData.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{productData.title}</h3>
              <p className="text-sm text-gray-500">
                {!capturedPhoto
                  ? "Position camera from face to chest"
                  : !finalResult
                  ? "Adjust settings and apply product"
                  : "Final result ready!"}
              </p>
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className="overflow-hidden rounded-lg border-2 border-gray-400 shadow-lg mx-auto mb-4">
          <video
            ref={videoRef}
            className="hidden"
            playsInline
            width="740"
            height="580"
          ></video>
          <canvas
            ref={canvasRef}
            width={740}
            height={580}
            className="mx-auto object-cover"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        {/* Controls - show only if photo captured but not yet applied */}
        {capturedPhoto && !finalResult && (
          <div className="space-y-4 mb-4 p-4 bg-white rounded-lg shadow">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Position: {Math.round(neckOffset * 100)}%
              </Label>
              <input
                type="range"
                min="0"
                max="0.2"
                step="0.01"
                value={neckOffset}
                onChange={(e) => setNeckOffset(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Scale: {scaleMultiplier.toFixed(1)}x
              </Label>
              <input
                type="range"
                min="1.0"
                max="4.0"
                step="0.1"
                value={scaleMultiplier}
                onChange={(e) => setScaleMultiplier(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          {!capturedPhoto && (
            <Button
              onClick={capturePhoto}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              disabled={!cameraStarted}
            >
              <CameraIcon className="w-4 h-4" />
              Capture Photo
            </Button>
          )}

          {capturedPhoto && !finalResult && (
            <>
              <Button
                onClick={applyProduct}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Apply Product"}
              </Button>
              <Button
                onClick={retakePhoto}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
              >
                Retake Photo
              </Button>
            </>
          )}

          {finalResult && (
            <>
              <Button
                onClick={shareResult}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <Share2 className="w-4 h-4" />
                Share/Download
              </Button>
              <Button
                onClick={retakePhoto}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
              >
                Try Again
              </Button>
            </>
          )}
        </div>

        {/* Final Result Display */}
        {finalResult && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-center font-medium mb-3">Final Result</h3>
            <img
              src={finalResult}
              alt="Try-on result"
              className="max-w-full rounded-lg mx-auto border-2 border-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}
