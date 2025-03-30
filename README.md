# AI Image Generator

An AI-based image generation application that creates unique images from text descriptions

## Features

- **Text-to-Image Generation**: Convert natural language descriptions into detailed images
- **Multiple AI Models**: Support for various image generation models (e.g., Stable Diffusion, DALL-E)
- **Image History**: View and manage previously generated images
- **Export Options**: Download images in various formats (PNG, JPG, SVG)
- **User-Friendly Interface**: Intuitive design for both beginners and advanced users

## Demo

![Demo of AI Image Generator](assets/demo.png)

## Installation

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- CUDA-compatible GPU (recommended for faster generation)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jagadeesh056/AI-Image-Generator.git
   cd AI-Image-Generator
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file based on `.env.example`
   - Add your API keys for the chosen AI services

5. Start the application:
   ```bash
   npm run dev
   ```

## Usage

1. Navigate to `http://localhost:3000` in your browser
2. Enter a descriptive prompt in the text field
3. Customize generation parameters if desired
4. Click "Generate" and wait for your image to appear
5. Save or share your creations

## API Reference

The application exposes the following API endpoints:

- `POST /api/generate`: Generate an image from text
- `GET /api/images`: Retrieve previously generated images
- `DELETE /api/images/:id`: Delete a specific image

For detailed API documentation, see [API.md](API.md).

## Configuration

You can customize the application by modifying the following settings in `config.js`:

- Default image size
- Model selection
- Generation parameters
- UI themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all the open-source AI image generation models
- Special appreciation to contributors and testers

## Contact

Jagadeesh - [GitHub Profile](https://github.com/jagadeesh056)

Project Link: [https://github.com/jagadeesh056/AI-Image-Generator](https://github.com/jagadeesh056/AI-Image-Generator)
