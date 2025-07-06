# HTube Configuration Guide

## Adding Your Own Videos

### Method 1: Using the Upload Interface

1. **Prepare your video on Google Drive:**
   - Upload your video file to Google Drive
   - Right-click the video → "Get link" → "Anyone with the link can view"
   - Copy the file ID from the URL (the long string between `/d/` and `/view`)

2. **Add via HTube interface:**
   - Open your HTube website
   - Click on `./upload` in the navigation
   - Fill in all the required fields:
     - **Title**: Your video title
     - **Description**: Video description
     - **Google Drive File ID**: The ID you copied from Google Drive
     - **Thumbnail URL**: Optional, link to a thumbnail image
     - **Tags**: Comma-separated tags (e.g., "programming, tutorial, javascript")
   - Click "Execute Upload"

### Method 2: Edit the Code Directly

Edit the `script.js` file and modify the `loadSampleVideos()` function:

```javascript
loadSampleVideos() {
    this.videos = [
        {
            id: '1',
            title: 'Your Video Title',
            description: 'Your video description here...',
            driveId: 'YOUR_GOOGLE_DRIVE_FILE_ID',
            thumbnail: 'https://your-thumbnail-url.jpg',
            views: 0,
            date: '2024-12-20',
            tags: ['your', 'tags', 'here'],
            trending: false
        },
        // Add more videos here...
    ];
}
```

## Customization Options

### 1. Change Colors

Edit `styles.css` to modify the color scheme:

```css
/* Change the primary green color */
:root {
    --primary-color: #00ff00;  /* Change this to your preferred color */
    --background-color: #0a0a0a;
    --text-color: #00ff00;
}
```

### 2. Update Site Name

In `index.html`, change the title and logo:

```html
<title>Your Site Name - Hacker's Video Platform</title>
<span class="logo-text">YourSite</span>
```

### 3. Modify Navigation

Update the navigation items in `index.html`:

```html
<nav class="nav">
    <a href="#" class="nav-link active" data-section="home">
        <i class="fas fa-home"></i> ~/videos
    </a>
    <!-- Add more navigation items -->
</nav>
```

## Deployment to GitHub Pages

### Step 1: Create Repository

1. Go to GitHub.com
2. Click "New repository"
3. Name it (e.g., "htube" or "your-video-platform")
4. Make it public
5. Click "Create repository"

### Step 2: Upload Files

```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Click "Save"

Your site will be available at: `https://yourusername.github.io/your-repo-name`

## Google Drive Setup

### Making Videos Public

1. Upload your video to Google Drive
2. Right-click the video file
3. Select "Get link"
4. Change permission to "Anyone with the link can view"
5. Copy the sharing URL
6. Extract the file ID from the URL:
   ```
   https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing
   ```

### Supported Video Formats

Google Drive supports most common video formats:
- MP4 (recommended)
- AVI
- MOV
- WMV
- FLV
- WebM

### Video Quality Tips

- Keep file sizes reasonable (under 2GB for smooth playback)
- Use H.264 codec for MP4 files
- Recommended resolution: 1080p or 720p
- Consider compressing large files before uploading

## Troubleshooting

### Video Not Playing

1. Check if the Google Drive file ID is correct
2. Ensure the video is set to "Anyone with the link can view"
3. Try a different video format
4. Check browser console for errors

### Site Not Loading

1. Verify all files are uploaded to GitHub
2. Check if GitHub Pages is enabled
3. Wait 5-10 minutes after enabling GitHub Pages
4. Clear browser cache

### Styling Issues

1. Check CSS file path in HTML
2. Ensure all CSS files are uploaded
3. Verify no syntax errors in CSS
4. Check browser developer tools for errors

## Advanced Features

### Adding Google Analytics

Add this code to your `index.html` before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Domain

1. Buy a domain name
2. In your repository, create a file named `CNAME`
3. Put your domain name in the file (e.g., `yoursite.com`)
4. Configure DNS settings with your domain provider
5. Point to GitHub Pages servers

### SEO Optimization

Add meta tags to your `index.html`:

```html
<meta name="description" content="Your video platform description">
<meta name="keywords" content="videos, hacker, programming, tutorials">
<meta property="og:title" content="Your Site Name">
<meta property="og:description" content="Your description">
<meta property="og:image" content="https://yoursite.com/thumbnail.jpg">
```

## Security Considerations

- This is a client-side application
- All data is stored in browser localStorage
- No server-side authentication
- Videos are public on Google Drive
- Consider these limitations for sensitive content

## Support

If you need help:

1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all files are properly uploaded
4. Test in different browsers

Happy hacking! 🚀
