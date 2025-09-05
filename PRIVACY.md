# Privacy Policy for Clean Links Browser Extension

**Effective Date:** January 1, 2025  
**Last Updated:** January 1, 2025

## Overview

Clean Links is a privacy-focused browser extension that automatically removes tracking parameters from URLs and provides anti-phishing protection. This privacy policy explains how we handle your information when you use our extension.

## Our Commitment to Privacy

**We do not collect, store, transmit, or share any personal data.**

Clean Links operates with a "privacy-first" approach, meaning:
- All processing happens locally on your device
- No data is sent to external servers
- No analytics or tracking systems are used
- No user accounts or registration required

## Information We DO NOT Collect

- **Personal Information:** We do not collect names, email addresses, or any personal identifiers
- **Browsing Data:** We do not collect, store, or transmit your browsing history or website visits
- **URLs:** We do not store, log, or transmit any URLs you copy or clean
- **Clipboard Content:** We do not store or transmit clipboard data beyond local processing
- **Usage Analytics:** We do not collect usage statistics, crash reports, or telemetry data
- **Device Information:** We do not collect device identifiers, IP addresses, or system information

## Information We DO Process (Locally Only)

### URL Processing
- **What:** URLs in your clipboard when you copy links
- **How:** Processed locally to remove tracking parameters and detect suspicious characters
- **Storage:** Not stored - processed immediately and discarded
- **Purpose:** Core functionality to clean URLs and warn about phishing attempts

### User Preferences
- **What:** Your cleaning mode settings (Remove All, Whitelist, Blacklist) and custom parameter lists
- **How:** Stored locally using Chrome's sync storage API
- **Storage:** Only on your device and synced across your Chrome profile if sync is enabled
- **Purpose:** Remember your preferred URL cleaning settings

## How the Extension Works

### Automatic Mode
1. You copy a URL from any website
2. Extension detects the URL in your clipboard (locally)
3. Extension processes the URL to remove tracking parameters (locally)
4. Extension replaces the dirty URL with a clean URL in your clipboard
5. No data leaves your device during this process

### Manual Mode
1. You trigger the extension popup or keyboard shortcut
2. Extension reads your clipboard content (locally)
3. Extension processes and cleans the URL (locally)
4. Extension writes the clean URL back to your clipboard
5. No data leaves your device during this process

### Anti-Phishing Protection
1. Extension scans domain names for suspicious characters (locally)
2. If suspicious characters are detected, a warning is displayed
3. No URLs are processed or stored when phishing is detected
4. All analysis happens locally on your device

## Permissions Explained

Our extension requires certain browser permissions to function. Here's exactly how each permission is used:

### clipboardRead
- **Purpose:** Read URLs from your clipboard to clean them
- **Usage:** Only when you copy URLs or manually trigger cleaning
- **Data Handling:** Clipboard content is processed immediately and not stored

### clipboardWrite
- **Purpose:** Replace dirty URLs with cleaned versions
- **Usage:** Write cleaned URLs back to your clipboard
- **Data Handling:** Only cleaned URLs are written; no data is stored

### activeTab
- **Purpose:** Execute keyboard shortcut functionality
- **Usage:** Only when you press Ctrl+Shift+L (or Cmd+Shift+L)
- **Data Handling:** No tab data is accessed, stored, or transmitted

### storage
- **Purpose:** Save your cleaning preferences
- **Usage:** Store your chosen cleaning mode and custom parameters
- **Data Handling:** Only preference settings are stored locally

### notifications
- **Purpose:** Show status messages for keyboard shortcuts
- **Usage:** Display "URL cleaned!" or "Phishing warning" notifications
- **Data Handling:** Only status messages; no user data in notifications

### scripting
- **Purpose:** Execute clipboard operations via keyboard shortcuts
- **Usage:** Enable background script to access clipboard when shortcut is pressed
- **Data Handling:** Only used for clipboard read/write operations

### host permissions (<all_urls>)
- **Purpose:** Run content scripts to detect copy events automatically
- **Usage:** Listen for copy events across websites to trigger automatic cleaning
- **Data Handling:** No website data is collected; only clipboard URLs are processed

## Data Security

Since we don't collect or transmit data, there are no data security risks related to external storage or transmission. All processing happens locally on your device using standard browser APIs.

### Local Processing
- All URL cleaning happens on your device
- No network connections are made for processing
- No external servers are contacted
- Extension works completely offline

### Open Source
- Our code is fully open source and auditable
- No hidden functionality or data collection
- Community can verify our privacy claims
- Transparent development process

## Third-Party Services

**We do not use any third-party services, including:**
- Analytics services (Google Analytics, etc.)
- Crash reporting services
- External APIs or servers
- Advertising networks
- Social media integrations

## Children's Privacy

Clean Links does not collect personal information from anyone, including children under 13. Since no data is collected, processed, or stored externally, there are no special privacy concerns for children using this extension.

## Changes to This Privacy Policy

We may update this privacy policy to reflect changes in our practices or for legal compliance. When we do:
- We will update the "Last Updated" date at the top of this policy
- We will notify users through the extension's update notes
- Continued use of the extension after updates constitutes acceptance of changes

## Regional Privacy Rights

### European Union (GDPR)
Since we do not collect personal data, GDPR rights (access, rectification, erasure, etc.) are not applicable. However, you maintain complete control over:
- Your usage of the extension (install/uninstall at any time)
- Your cleaning preferences (stored locally)
- Your clipboard data (never leaves your device)

### California (CCPA)
We do not collect, sell, or share personal information as defined by CCPA. No opt-out mechanisms are necessary since no data collection occurs.

### Other Jurisdictions
We comply with all applicable privacy laws by not collecting personal data in any jurisdiction.

## Contact Information

If you have questions about this privacy policy or our privacy practices:

- **GitHub Issues:** [Clean Links Issues](https://github.com/yourusername/clean-links/issues)
- **Email:** [Your contact email]
- **Security Issues:** Report via GitHub Security tab

## Verification

You can verify our privacy claims by:
- Reviewing our open source code on GitHub
- Using browser developer tools to monitor network activity (you'll see no external requests)
- Checking browser storage (only preference settings are stored locally)
- Auditing the extension behavior in isolated test environments

## Summary

Clean Links respects your privacy by design:
- ✅ No data collection
- ✅ No external servers
- ✅ No tracking or analytics
- ✅ Local processing only
- ✅ Open source transparency
- ✅ Minimal permissions
- ✅ Complete user control

Your privacy is not a feature we offer—it's the foundation of how we built this extension.

---

*This privacy policy is written in plain language to ensure transparency and understanding. For technical implementation details, please review our open source code.*