# HTube - Hacker's Video Platform

*A YouTube-like video platform with a terminal-inspired hacker theme*

## Quick Start

1. **Clone or download** this repository
2. **Upload to GitHub** and enable GitHub Pages
3. **Add your videos** from Google Drive
4. **Customize** the theme and content

## Features

- 🖥️ **Terminal-style interface** with hacker aesthetics
- 📺 **Google Drive integration** for video storage
- 🔍 **Search functionality** across all videos
- 📤 **Easy video upload** interface
- 📊 **User statistics** and view tracking
- 📱 **Fully responsive** design
- ⚡ **Zero server costs** - runs on GitHub Pages

## Getting Started

### 1. Setup Your Repository

```bash
# Fork or clone this repository
git clone https://github.com/yourusername/htube.git
cd htube

# Push to your GitHub repository
git remote set-url origin https://github.com/yourusername/htube.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages"
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Your site will be live at `https://yourusername.github.io/htube`

### 3. Add Your Videos

**Option A: Use the Upload Interface**
- Click `./upload` in the navigation
- Fill in video details
- Paste your Google Drive file ID
- Click "Execute Upload"

**Option B: Edit the Code**
- Modify `script.js` and update the `loadSampleVideos()` function
- Add your video objects with Google Drive file IDs

### 4. Get Google Drive File IDs

1. Upload video to Google Drive
2. Right-click → "Get link" → "Anyone with the link can view"
3. Copy the file ID from the URL:
   ```
   https://drive.google.com/file/d/FILE_ID_HERE/view
   ```

## File Structure

```
htube/
├── index.html      # Main application
├── styles.css      # Hacker theme styles
├── script.js       # Core functionality
├── README.md       # This file
└── SETUP.md        # Detailed setup guide
```

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #00ff00;
    --background-color: #0a0a0a;
}
```

### Site Name
Update the logo in `index.html`:
```html
<span class="logo-text">YourSite</span>
```

### Sample Videos
Modify the video array in `script.js`:
```javascript
this.videos = [
    {
        id: '1',
        title: 'Your Video Title',
        driveId: 'YOUR_GOOGLE_DRIVE_FILE_ID',
        // ... other properties
    }
];
```

## Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Live Demo

See a working example at: [Demo Link](https://yourusername.github.io/htube)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use for personal or commercial projects.

## Support

- 📖 Check the detailed [SETUP.md](SETUP.md) guide
- 🐛 Report issues on GitHub
- 💬 Join discussions in the Issues section

---

**Built for the hacker community** 🚀

*Deploy your own video platform in minutes!*
