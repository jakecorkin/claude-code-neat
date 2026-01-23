#!/usr/bin/env python3
"""
Gemini Image Generator - Reusable script for generating images with Google's Gemini API.

Usage:
    python gemini-image-gen.py "your prompt here"
    python gemini-image-gen.py "your prompt" --output my-image.png
    python gemini-image-gen.py "your prompt" --model gemini-3-pro-image-preview
"""

import argparse
import os
import sys
from pathlib import Path

try:
    from google import genai
except ImportError:
    print("Error: google-genai package not installed.")
    print("Install it with: pip install google-genai")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow package not installed.")
    print("Install it with: pip install Pillow")
    sys.exit(1)


MODELS = {
    "flash": "gemini-2.5-flash-image",
    "pro": "gemini-3-pro-image-preview",
}


def generate_image(prompt: str, output_path: str, model: str) -> bool:
    """Generate an image from a text prompt using Gemini."""
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("Error: No API key found.")
        print("Set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.")
        return False

    client = genai.Client(api_key=api_key)

    print(f"Generating image with {model}...")
    print(f"Prompt: {prompt[:100]}{'...' if len(prompt) > 100 else ''}")

    try:
        response = client.models.generate_content(
            model=model,
            contents=[prompt],
        )

        image_saved = False
        for part in response.parts:
            if part.text is not None:
                print(f"Model response: {part.text}")
            elif part.inline_data is not None:
                image = part.as_image()
                image.save(output_path)
                print(f"Image saved to: {output_path}")
                image_saved = True

        if not image_saved:
            print("No image was generated. The model may have declined the request.")
            return False

        return True

    except Exception as e:
        print(f"Error generating image: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Generate images using Google's Gemini API",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    %(prog)s "A sunset over mountains"
    %(prog)s "A cute robot" --output robot.png
    %(prog)s "Professional headshot" --model pro
        """,
    )
    parser.add_argument("prompt", help="The text prompt for image generation")
    parser.add_argument(
        "-o", "--output",
        default="generated_image.png",
        help="Output file path (default: generated_image.png)",
    )
    parser.add_argument(
        "-m", "--model",
        choices=["flash", "pro"],
        default="flash",
        help="Model to use: flash (faster/cheaper) or pro (higher quality)",
    )

    args = parser.parse_args()

    model = MODELS[args.model]
    success = generate_image(args.prompt, args.output, model)
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
