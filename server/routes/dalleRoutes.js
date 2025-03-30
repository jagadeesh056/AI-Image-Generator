import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch"; // You'll need to install this

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("hello imageRoutes");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1,
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Stability API error: ${errorData.message || response.statusText}`);
    }

    const responseJSON = await response.json();
    const base64Image = responseJSON.artifacts[0].base64;
    
    res.status(200).json({ photo: base64Image });
  } catch (err) {
    console.error("Image API Error:", err);
    res.status(500).json({ 
      error: err?.message || "Something went wrong with image generation" 
    });
  }
});

export default router;