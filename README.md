# Clean Links Browser Extension

A lightweight browser extension that automatically removes query parameters from copied URLs to improve privacy and link hygiene.

## Features

- ( **Automatic URL cleaning**: Removes all query parameters when you copy links
- = **Privacy focused**: No tracking parameters in your shared links
- =€ **Lightweight**: Minimal resource usage, works silently in background
- =¬ **Visual feedback**: Brief notification when links are cleaned
- < **Cross-browser**: Works on Chrome, Firefox, and Edge

## How it works

1. Copy any URL with query parameters (like `https://example.com/page?ref=social&utm_campaign=ads`)
2. The extension automatically detects the copied URL
3. Query parameters are stripped, leaving a clean URL (`https://example.com/page`)
4. Your clipboard is updated with the cleaned URL
5. A brief "Link cleaned!" notification appears

## Installation

### Chrome/Edge
1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension folder
5. The extension is now active!

### Firefox
1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" ’ "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension folder
5. The extension is now active!

## Usage

Simply copy any URL as you normally would (Ctrl+C or Cmd+C). If the URL contains query parameters, you'll see a brief notification and the cleaned URL will be in your clipboard.

## Testing

Open `test/test.html` in your browser to test the extension with various URL formats.

## Privacy

This extension:
-  Only processes URLs when you copy them
-  Does not collect, store, or transmit any data
-  Works completely offline
-  Requires minimal permissions

## Technical Details

- **Manifest Version**: 3 (latest standard)
- **Permissions**: `clipboardRead`, `clipboardWrite`, `activeTab`
- **File Size**: ~5KB total
- **Browser Support**: Chrome 88+, Firefox 109+, Edge 88+

## Development

```bash
# Run tests
npm run test

# Build extension
npm run build
```

## License

MIT License - see LICENSE file for details.

## Contributing

Pull requests welcome! Please ensure your changes maintain the extension's lightweight and privacy-focused design.