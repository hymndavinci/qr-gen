
readme_content = '''# QR.DEV Pro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/hymndavinci/qr-gen)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)]()

> A professional, client-side QR code generator with advanced customization options. No server required, no data collected — 100% privacy focused.

![QR.DEV Pro Screenshot](screenshot.png)

## ✨ Features

### Core Functionality
- **Multiple QR Types**: URL, Plain Text, Wi-Fi, Email, Phone, vCard
- **Batch Generation**: Upload CSV to generate multiple QR codes at once
- **Export Formats**: PNG, SVG, PDF, EPS
- **History Management**: Auto-saves generated QR codes to local storage
- **Keyboard Shortcuts**: Power-user friendly shortcuts for rapid workflow

### Design Customization
- **Color Control**: Full foreground/background color picker
- **QR Styles**: Square, Rounded, Dots, Classy
- **Error Correction**: 4 levels (L, M, Q, H) for different use cases
- **Logo Overlay**: Add your brand logo with adjustable size
- **Size Control**: From 200px to 2000px output resolution
- **Live Preview**: Real-time updates as you type

### Professional UI/UX
- **Dark Mode Interface**: Easy on the eyes for long sessions
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Drag & Drop**: Intuitive file uploads
- **Toast Notifications**: Non-intrusive feedback
- **Fullscreen Preview**: Inspect your QR in detail

## 🚀 Quick Start

### Option 1: Direct Usage
Simply open `index.html` in your browser. No build step required!

```bash
git clone https://github.com/hymndavinci/qr-gen.git
cd qr-gen
open index.html  # or double-click the file
```

### Option 2: Local Server (Recommended)
For full functionality (especially file downloads):

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
qr-gen/
├── index.html          # Main HTML structure
├── style.css           # All styling (dark theme)
├── script.js           # Application logic
├── README.md           # This file
└── LICENSE             # MIT License
```

**Zero dependencies** for core functionality. Only uses:
- [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (CDN) - QR generation algorithm
- [Inter](https://rsms.me/inter/) & [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (Google Fonts) - Typography

## 🎨 Usage Guide

### Basic QR Code
1. Select content type (URL, Text, etc.)
2. Enter your content
3. Customize colors and style
4. Click **Export** to download

### With Logo Overlay
1. Upload your logo (PNG/JPG/SVG, max 2MB)
2. Adjust logo size percentage
3. Use **High (H)** error correction for best results
4. Download in your preferred format

### Batch Generation
1. Prepare CSV file with first column containing URLs/text
2. Go to **Batch Mode** tab
3. Upload CSV
4. Download all QR codes as ZIP

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Generate QR |
| `Ctrl + S` | Download QR |
| `Ctrl + R` | Reset form |

## 🛠️ Technical Details

### QR Code Specifications
- **Library**: qrcode-generator (Kazuhiko Arase)
- **Error Correction Levels**: L (~7%), M (~15%), Q (~25%), H (~30%)
- **Output Formats**: 
  - PNG (raster, transparent support)
  - SVG (vector, scalable)
  - PDF (print-ready)
  - EPS (professional printing)

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- **Client-side only**: No server latency
- **Lazy loading**: Efficient memory usage
- **Debounced input**: 300ms delay for smooth typing
- **Canvas rendering**: Hardware accelerated

## 🔒 Privacy & Security

- **100% Client-side**: No data sent to servers
- **No tracking**: No analytics or cookies
- **Local storage only**: History saved in browser
- **File processing**: Logos processed locally, never uploaded

## 🎯 Use Cases

- **Marketing**: QR codes for campaigns with branded logos
- **Wi-Fi Sharing**: Generate Wi-Fi connection QR codes
- **Business Cards**: vCard QR codes for contact sharing
- **Product Packaging**: Batch generate for inventory
- **Events**: Ticket/registration QR codes
- **Restaurants**: Digital menu QR codes

## 📝 Customization

### Changing Default Colors
Edit CSS variables in `style.css`:

```css
:root {
  --accent-primary: #3b82f6;    /* Change primary color */
  --bg-primary: #0a0a0f;        /* Change background */
  --text-primary: #fafafa;      /* Change text color */
}
```

### Adding New QR Types
Extend the `qrTypes` object in `script.js`:

```javascript
const qrTypes = {
  custom: {
    format: (data) => `CUSTOM:${data}`,
    placeholder: 'Enter custom format...'
  }
};
```

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Setup

```bash
# Clone repo
git clone https://github.com/hymndavinci/qr-gen.git

# Make changes to files
# Test locally with live server

# No build process needed - pure HTML/CSS/JS!
```

## 📜 License

Distributed under MIT License. See `LICENSE` for details.

## 🙏 Acknowledgments

- [Kazuhiko Arase](https://github.com/kazuhikoarase) - QR Code Generator library
- [Inter Font](https://rsms.me/inter/) - Rasmus Andersson
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - JetBrains

## 📧 Contact

- GitHub: [@hymndavinci](https://github.com/hymndavinci)
- Project: [https://github.com/hymndavinci/qr-gen](https://github.com/hymndavinci/qr-gen)

---

<p align="center">Made with ❤️ for the developer community</p>
'''

with open('/mnt/agents/output/qr-dev-pro/README.md', 'w') as f:
    f.write(readme_content)

print("✅ README.md created!")
print("\n📄 Content includes:")
print("  • Badges (License, Version, Tech stack)")
print("  • Feature highlights")
print("  • Quick start guide")
print("  • Project structure")
print("  • Usage instructions")
print("  • Technical specifications")
print("  • Privacy & security info")
print("  • Customization guide")
print("  • Contributing guidelines")
print("  • License & acknowledgments")
