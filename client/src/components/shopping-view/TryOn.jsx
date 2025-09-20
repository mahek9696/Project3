import React, { useRef, useEffect, useState, useCallback } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera as MediaPipeCamera } from "@mediapipe/camera_utils";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera as CameraIcon, Share2, ArrowLeft } from "lucide-react";

export default function TryOn() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.product;
  const [cameraStarted, setCameraStarted] = useState(false);
  // Replace your current image loading code with this:
  const [img, setImg] = useState(() => {
    // Create and return a new image object when component mounts
    const newImg = new Image();
    newImg.crossOrigin = "Anonymous";
    return newImg; // Return the image object, not just new Image()
  });
  const [screenshot, setScreenshot] = useState(null);
  const cameraRef = useRef(null);

  // Use a ref to track if image is ready
  const imageLoadedRef = useRef(false);

  // Separate useEffect for image loading
  useEffect(() => {
    if (!productData?.image) {
      console.error("No product image found in product data");
      return;
    }

    console.log("Loading image from:", productData.image);

    // Set up event handlers
    img.onload = () => {
      console.log("Image loaded successfully:", img.width, "x", img.height);
      imageLoadedRef.current = true; // Mark image as loaded
    };

    img.onerror = (error) => {
      console.error("Error loading image:", error);
      imageLoadedRef.current = false;
      alert("Failed to load product image. Please try a different product.");
    };

    // Set src - this will trigger the load
    img.src = productData.image;

    // Cleanup
    return () => {
      imageLoadedRef.current = false;
    };
  }, [productData, img]);

  // Load product image
  // useEffect(() => {
  //   console.log("Product data received:", productData);
  //   if (productData?.image) {
  //     console.log("Loading image from:", productData.image);
  //     const newImg = new Image();

  //     // Add crossOrigin if your images are from different domains
  //     newImg.crossOrigin = "Anonymous";

  //     newImg.src = productData.image;

  //     newImg.onload = () => {
  //       console.log(
  //         "Image loaded successfully, dimensions:",
  //         newImg.width,
  //         "x",
  //         newImg.height
  //       );
  //       setImg(newImg);
  //     };

  //     newImg.onerror = (error) => {
  //       console.error("Error loading image:", error);
  //       alert("Failed to load product image. Please try a different product.");
  //     };
  //   } else {
  //     console.error("No product image found in product data");
  //   }
  // }, [productData]);

  // Then update your camera setup useEffect:
  // 1. Move onResults inside the camera useEffect
  useEffect(() => {
    let faceMesh;
    let camera;

    // Define onResults inside this effect so it has access to latest state
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

      // Draw user video
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Check if image is fully loaded using the ref
      if (!imageLoadedRef.current) {
        canvasCtx.restore();
        return;
      }

      // Debug: Draw a small version of the product image in corner
      canvasCtx.drawImage(img, 10, 10, 50, 70);

      // Only draw the product if we have valid face landmarks
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];

        // Always use chin for Khadishutra
        const targetLandmark = landmarks[152];
        const scale = 250; // Larger scale
        const offsetY = 150; // Move down more

        // Calculate position with offsets
        const x = targetLandmark.x * canvasRef.current.width;
        const y = targetLandmark.y * canvasRef.current.height + offsetY;

        // Calculate dimensions preserving aspect ratio
        const imgAspectRatio = img.height / img.width;
        const width = scale;
        const height = scale * imgAspectRatio;

        // Draw a dot at the chin landmark
        canvasCtx.fillStyle = "red";
        canvasCtx.beginPath();
        canvasCtx.arc(x, y - offsetY, 8, 0, 2 * Math.PI);
        canvasCtx.fill();

        // Draw the product image - this should stay visible
        try {
          canvasCtx.drawImage(img, x - width / 2, y, width, height);
        } catch (err) {
          console.error("Error drawing product:", err);
        }
      }

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

      // Use the locally defined onResults
      faceMesh.onResults(onResults);

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

    // Cleanup function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (faceMesh) {
        faceMesh.close();
      }
      setCameraStarted(false);
    };
  }, [img]); // Only depend on img, not onResults
  // Setup camera and face mesh
  // useEffect(() => {
  //   let faceMesh;
  //   let camera;

  //   const setupCamera = async () => {
  //     faceMesh = new FaceMesh({
  //       locateFile: (file) =>
  //         `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  //     });

  //     faceMesh.setOptions({
  //       maxNumFaces: 1,
  //       refineLandmarks: true,
  //       minDetectionConfidence: 0.5,
  //       minTrackingConfidence: 0.5,
  //     });

  //     faceMesh.onResults(onResults);

  //     if (videoRef.current) {
  //       camera = new MediaPipeCamera(videoRef.current, {
  //         onFrame: async () => {
  //           if (faceMesh) {
  //             await faceMesh.send({ image: videoRef.current });
  //           }
  //         },
  //         width: 640,
  //         height: 480,
  //         facingMode: "user",
  //       });

  //       await camera.start();
  //       cameraRef.current = camera;
  //       setCameraStarted(true);
  //       console.log("Camera started successfully");
  //     }
  //   };

  //   setupCamera();

  //   // Cleanup function - critical to stop camera when component unmounts
  //   return () => {
  //     console.log("Cleaning up camera and face mesh");
  //     if (videoRef.current && videoRef.current.srcObject) {
  //       const tracks = videoRef.current.srcObject.getTracks();
  //       tracks.forEach((track) => {
  //         track.stop();
  //         console.log("Track stopped");
  //       });
  //     }
  //     if (faceMesh) {
  //       faceMesh.close();
  //     }
  //     setCameraStarted(false);
  //   };
  // }, []); // Empty dependency array - only run once on mount

  // Use a stable reference to the onResults function

  // Define onResults function
  // const onResults = (results) => {
  //   if (!canvasRef.current) return;

  //   const canvasCtx = canvasRef.current.getContext("2d");
  //   canvasCtx.save();
  //   canvasCtx.clearRect(
  //     0,
  //     0,
  //     canvasRef.current.width,
  //     canvasRef.current.height
  //   );

  //   // Draw user video
  //   canvasCtx.drawImage(
  //     results.image,
  //     0,
  //     0,
  //     canvasRef.current.width,
  //     canvasRef.current.height
  //   );

  //   // Debug: Draw a small version of the product image in corner to verify it loads
  //   if (img.complete && img.naturalHeight !== 0) {
  //     canvasCtx.drawImage(img, 10, 10, 50, 70);
  //   }

  //   // Only draw the product if we have valid face landmarks and image
  //   if (
  //     img.complete &&
  //     img.naturalHeight !== 0 &&
  //     results.multiFaceLandmarks &&
  //     results.multiFaceLandmarks.length > 0
  //   ) {
  //     const landmarks = results.multiFaceLandmarks[0];

  //     // IGNORE the category and always use chin for Khadishutra
  //     // This is the key change - no more category checking
  //     const targetLandmark = landmarks[152]; // Always use chin
  //     const scale = 200;
  //     const offsetY = 100; // Positive value to move down below chin

  //     // Calculate position with offsets
  //     const x = targetLandmark.x * canvasRef.current.width;
  //     const y = targetLandmark.y * canvasRef.current.height + offsetY;

  //     // Calculate dimensions preserving aspect ratio
  //     const imgAspectRatio = img.height / img.width;
  //     const width = scale;
  //     const height = scale * imgAspectRatio;

  //     // Console log position for debugging
  //     console.log("Drawing Khadishutra:", {
  //       x: x - width / 2,
  //       y,
  //       width,
  //       height,
  //       landmark: [targetLandmark.x, targetLandmark.y],
  //     });

  //     // ADD THIS CODE HERE - Draw a dot at the chin landmark
  //     canvasCtx.fillStyle = "red";
  //     canvasCtx.beginPath();
  //     canvasCtx.arc(x, y - offsetY, 8, 0, 2 * Math.PI);
  //     canvasCtx.fill();

  //     // Draw the product image
  //     canvasCtx.drawImage(img, x - width / 2, y, width, height);
  //   }

  //   canvasCtx.restore();
  // };

  const takeScreenshot = useCallback(() => {
    try {
      if (!canvasRef.current) {
        console.error("Canvas reference is null");
        alert("Cannot take screenshot - canvas not found");
        return;
      }

      console.log("Taking screenshot...");

      // Take screenshot immediately without setTimeout
      try {
        const dataURL = canvasRef.current.toDataURL("image/png");
        console.log("Screenshot captured successfully");
        setScreenshot(dataURL);
        alert("Screenshot taken! Scroll down to see your image.");
      } catch (err) {
        console.error("Error capturing canvas:", err);
        alert("Failed to capture screenshot: " + err.message);
      }
    } catch (error) {
      console.error("Error taking screenshot:", error);
      alert("Failed to take screenshot: " + error.message);
    }
  }, []);
  // Take screenshot function
  // const takeScreenshot = () => {
  //   try {
  //     if (!canvasRef.current) {
  //       console.error("Canvas reference is null");
  //       return;
  //     }

  //     console.log("Taking screenshot...");

  //     // Make sure the canvas is rendered before taking screenshot
  //     setTimeout(() => {
  //       const dataURL = canvasRef.current.toDataURL("image/png");
  //       console.log("Screenshot captured");
  //       setScreenshot(dataURL);
  //     }, 100);
  //   } catch (error) {
  //     console.error("Error taking screenshot:", error);
  //     alert("Failed to take screenshot: " + error.message);
  //   }
  // };

  // Share screenshot function
  const shareScreenshot = () => {
    if (!screenshot) {
      alert("No screenshot to share");
      return;
    }

    if (navigator.share) {
      // Convert data URL to file
      fetch(screenshot)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "try-on.png", { type: "image/png" });

          navigator
            .share({
              title: `${productData?.title || "Product"} Virtual Try-On`,
              text: "Check out how this looks on me!",
              files: [file],
            })
            .catch((error) => {
              console.log("Error sharing:", error);
              downloadScreenshot(); // Fallback to download
            });
        })
        .catch((error) => {
          console.error("Error preparing file:", error);
          downloadScreenshot(); // Fallback to download
        });
    } else {
      downloadScreenshot();
    }
  };

  // Download screenshot helper function
  const downloadScreenshot = () => {
    const link = document.createElement("a");
    link.download = "try-on.png";
    link.href = screenshot;
    link.click();
  };

  // Handle navigation back
  const handleBack = () => {
    // Make sure to stop the camera before navigating away
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (cameraRef.current) {
      cameraRef.current.stop();
    }
    setCameraStarted(false);
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
            Back to Product
          </Button>
          <h2 className="text-2xl font-bold">Virtual Try On</h2>
        </div>
        {productData ? (
          <div className="mb-4 p-3 bg-white rounded-lg shadow flex items-center gap-4">
            <img
              src={productData.image}
              alt={productData.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">{productData.title}</h3>
              <p className="text-sm text-gray-500">
                Position your face to try on this product
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-4 p-3 bg-yellow-100 rounded-lg">
            <p className="text-yellow-700">
              No product selected. Please select a product to try on.
            </p>
          </div>
        )}
        {/* Canvas container */}
        <div className="overflow-hidden rounded-lg border-2 border-gray-400 shadow-lg mx-auto mb-4">
          <video
            ref={videoRef}
            className="hidden"
            playsInline
            width="640"
            height="480"
          ></video>
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="mx-auto object-cover"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        {/* Add this button to force redraw the product */}
        <Button
          onClick={() => {
            if (!canvasRef.current || !imageLoadedRef.current) {
              alert("Canvas or image not ready");
              return;
            }

            const ctx = canvasRef.current.getContext("2d");
            const video = videoRef.current;

            // Redraw the video frame
            ctx.drawImage(
              video,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );

            // Draw product at a fixed position if needed
            const x = canvasRef.current.width / 2;
            const y = canvasRef.current.height * 0.7; // Lower part of screen
            const scale = 250;
            const width = scale;
            const height = scale * (img.height / img.width);

            ctx.drawImage(img, x - width / 2, y, width, height);
            console.log("Manual product redraw completed");
          }}
          className="ml-2 bg-red-600 hover:bg-red-700 text-white"
        >
          Fix Product Position
        </Button>
        {/* Buttons */}
        <div className="mt-4 flex justify-center gap-4 mb-4">
          <Button
            onClick={takeScreenshot}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <CameraIcon className="w-4 h-4" />
            Take Photo
          </Button>
          {screenshot && (
            <Button
              onClick={shareScreenshot}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Share2 className="w-4 h-4" />
              Share/Download
            </Button>
          )}
        </div>
        {/* Screenshot preview */}
        {screenshot && (
          <div className="mt-4 mb-8 p-3 bg-white rounded-lg shadow">
            <p className="text-center mb-2 font-medium">Screenshot</p>
            <img
              src={screenshot}
              alt="Try-on screenshot"
              className="max-w-full rounded-lg mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
