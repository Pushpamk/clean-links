# Clean Links Browser Extension

<img src="icons/icon128.png" alt="Clean Links Icon" width="128" height="128">

A powerful, privacy-focused browser extension that automatically cleans URLs by removing tracking parameters and provides anti-phishing protection. Keep your links clean, safe, and private!

## Demo Videos

### How to Use Clean Links
![How to Use](examples/recording_1.gif)

*See how Clean Links automatically removes tracking parameters when you copy URLs, keeping your links clean and private.*

### Anti-Phishing Protection in Action
```
Suspicious URL: https://pаypaI.com/login (using capital 'i')
Result: PHISHING WARNING displayed, URL not processed

Suspicious URL: https://pаypal.com/login (using Cyrillic 'а')
Result: PHISHING WARNING displayed, URL not processed

Suspicious URL: https://gооgle.com/search (using Cyrillic 'о')
Result: PHISHING WARNING displayed, URL not processed
```
![Phishing Protection](examples/recording_2.gif)

*See how Clean Links identifies and highlights similar-looking characters that help protect you from suspicious links and potential phishing attacks.*

## Features

### **URL Cleaning**
- **Automatic cleaning**: URLs are cleaned when copied automatically
- **Manual cleaning**: Click extension popup or use keyboard shortcut
- **Flexible modes**: Remove all parameters, whitelist specific ones, or blacklist tracking parameters
- **Fragment removal**: Removes URL fragments (hash parameters) for complete cleaning

### **Anti-Phishing Protection**
- **Homoglyph detection**: Warns about suspicious characters that mimic legitimate domains
- **Visual warnings**: Red alerts for potentially malicious URLs with detailed information
- **Safe processing**: Blocks cleaning of suspicious URLs to prevent accidental interaction

### **Multiple Access Methods**
- **Automatic**: Copy any URL and it's cleaned instantly (can be disabled)
- **Popup interface**: Click the extension icon for manual control
- **Keyboard shortcut**: `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac)
- **Context menu**: Right-click on links or selected URLs and choose "Clean and copy"

### **Customization Options**
- **Automatic cleaning toggle**: Enable or disable automatic URL cleaning when copying
- **Remove All**: Strip all query parameters (default)
- **Whitelist**: Keep only specified parameters (e.g., `v, page, id`)
- **Blacklist**: Remove only tracking parameters (e.g., `utm_source, fbclid, gclid`)
- **Smart defaults**: Pre-configured with common tracking parameters

### **Privacy & Security**
- **No data collection**: Zero tracking, logging, or data transmission
- **Local processing**: All operations happen on your device
- **Minimal permissions**: Only essential clipboard and notification access
- **Open source**: Fully transparent and auditable code

## How It Works

### Automatic Mode
1. Copy any URL (e.g., `https://example.com/page?utm_source=social&ref=banner&v=123`)
2. Extension detects the URL and checks for phishing attempts
3. Parameters are cleaned based on your settings
4. Clean URL replaces clipboard content (`https://example.com/page` or `https://example.com/page?v=123`)
5. Brief notification confirms the action

### Manual Mode
1. Copy a URL to your clipboard
2. Use any of these methods:
   - Click the extension icon and press "Clean URL"
   - Press `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)
   - Right-click on a link or selected URL and choose "Clean and copy"
3. Configure your cleaning preferences in the popup if needed

### Anti-Phishing Protection
- Scans domains for suspicious characters (Cyrillic letters, unusual Unicode)
- Displays warnings like: `PHISHING WARNING: Suspicious characters in "pаypal.com": а`
- Prevents processing of potentially malicious URLs

## Installation

### From Browser Extension Store
*Coming soon - will be available on Chrome Web Store, Firefox Add-ons, and Microsoft Edge Add-ons*

### Manual Installation (Developer Mode)

#### Chrome/Chromium/Edge
1. Download or clone this repository
2. Open browser and navigate to extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked" and select the extension folder
5. The Clean Links extension is now active!

#### Firefox
1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" → "Load Temporary Add-on"
4. Select the `manifest.json` file from the extension folder
5. The extension is now active!

## Usage Examples

### Basic URL Cleaning
```
Original: https://amazon.com/dp/B08N5WRWNW?ref=sr_1_3&keywords=laptop&sr=8-3&th=1
Cleaned:  https://amazon.com/dp/B08N5WRWNW
```

### Whitelist Mode (keeping important parameters)
```
Settings: Whitelist = "v, page"
Original: https://youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmRdnEQy&index=1&t=42s
Cleaned:  https://youtube.com/watch?v=dQw4w9WgXcQ
```

### Blacklist Mode (removing specific tracking)
```
Settings: Blacklist = "utm_source, utm_campaign, fbclid"
Original: https://example.com/article?utm_source=twitter&utm_campaign=spring&page=2&v=1.0
Cleaned:  https://example.com/article?page=2&v=1.0
```

### Phishing Detection
```
Suspicious URL: https://pаypal.com/login (using Cyrillic 'а')
Result: PHISHING WARNING displayed, URL not processed

Suspicious URL: https://gооgle.com/search (using Cyrillic 'о')
Result: PHISHING WARNING displayed, URL not processed
```

## Testing

Open `test/test.html` in your browser to test the extension with various URL formats and edge cases.

## Configuration

The extension provides flexible configuration options:

### Automatic Cleaning
- **Toggle**: Enable or disable automatic URL cleaning when copying links
- **Default**: Enabled (can be turned off in popup settings)

### Cleaning Modes
1. **Remove All** (Default): Strips all query parameters and fragments
2. **Whitelist**: Only keeps parameters you specify (comma-separated)
3. **Blacklist**: Only removes parameters you specify (comma-separated)

### Manual Access Methods
- **Extension popup**: Click the extension icon for manual cleaning and settings
- **Keyboard shortcut**: `Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (Mac)
- **Context menu**: Right-click on links or selected URLs for "Clean and copy" option

Common tracking parameters are pre-configured in blacklist mode:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `ref`, `fbclid`, `gclid`

## Privacy & Security

### What We Don't Do
- No data collection or analytics
- No remote servers or API calls  
- No user tracking or profiling
- No storage of URLs or clipboard content

### What We Do
- Process URLs locally on your device
- Detect and warn about phishing attempts
- Store only your preference settings locally
- Provide complete transparency through open source code

### Permissions Explained
- `clipboardRead`: Read URLs from clipboard for cleaning
- `clipboardWrite`: Replace clipboard with cleaned URLs
- `activeTab`: Access current tab for keyboard shortcut functionality
- `storage`: Save your cleaning preferences and automatic cleaning toggle
- `notifications`: Show desktop notifications for keyboard shortcut
- `scripting`: Execute clipboard operations via keyboard shortcut
- `contextMenus`: Add "Clean and copy" option to right-click menus

## Known Limitations

Some websites restrict clipboard access due to security policies (Google Docs, WhatsApp Web, Outlook, etc.). On these sites:
- **Automatic cleaning is disabled** to respect browser security policies
- **Use the keyboard shortcut** `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac) for manual cleaning
- **Use the extension popup** by clicking the extension icon for manual cleaning
- This behavior is intentional to maintain security and browser extension store compliance

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **File Size**: ~15KB total
- **Languages**: JavaScript, HTML, CSS
- **Browser Support**: 
  - Chrome 88+
  - Firefox 109+
  - Edge 88+
  - All Chromium-based browsers

## Contributing

We welcome contributions! Here's how you can help:

### Bug Reports
- Use GitHub Issues to report bugs
- Include browser version, extension version, and steps to reproduce
- Provide example URLs that cause issues (remove sensitive data)

### Feature Requests
- Open a GitHub Issue with the "enhancement" label
- Describe the use case and expected behavior
- Consider privacy implications of new features

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following existing code style
4. Test thoroughly with `test/test.html`
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/clean-links.git
cd clean-links

# Load extension in browser (see Installation section above)
# Make changes and test with test/test.html
```

## License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all users who prioritize privacy and clean web practices
- Inspired by the need for better URL hygiene in our digital communications
- Built with care for the privacy-conscious internet community

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/clean-links/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/clean-links/discussions)
- **Security**: Report security issues privately via GitHub Security tab

---

Made with care for a cleaner, safer web. Star this repository if Clean Links helps you!