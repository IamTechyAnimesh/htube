// HTube - Hacker's Video Platform
// Main JavaScript functionality

class HTube {
    constructor() {
        this.videos = [];
        this.currentUser = {
            name: 'Anonymous',
            uploadCount: 0,
            totalViews: 0
        };
        this.init();
    }

    init() {
        this.loadSampleVideos();
        this.setupEventListeners();
        this.updateProfile();
        this.typeWriter();
    }

    // Load sample videos (in real app, this would fetch from Google Drive API)
    loadSampleVideos() {
        this.videos = [
            {
                id: '1',
                title: 'Ethical Hacking Tutorial - SQL Injection',
                description: 'Learn about SQL injection vulnerabilities and how to prevent them. A comprehensive guide for security professionals.',
                driveId: '11peMZxbZjApKp6ZR9Ceb58IcGpx132cW',
                thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop',
                views: 1337,
                date: '2024-12-15',
                tags: ['hacking', 'security', 'tutorial'],
                trending: true
            },
            {
                id: '2',
                title: 'Advanced JavaScript Techniques',
                description: 'Master advanced JavaScript concepts including closures, prototypes, and async programming.',
                driveId: '1example2',
                thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
                views: 2048,
                date: '2024-12-10',
                tags: ['javascript', 'programming', 'advanced'],
                trending: false
            },
            {
                id: '3',
                title: 'Building REST APIs with Node.js',
                description: 'Complete guide to building scalable REST APIs using Node.js and Express framework.',
                driveId: '1example3',
                thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop',
                views: 1024,
                date: '2024-12-08',
                tags: ['nodejs', 'api', 'backend'],
                trending: true
            },
            {
                id: '4',
                title: 'Cybersecurity Fundamentals',
                description: 'Introduction to cybersecurity concepts, threat modeling, and best practices for digital security.',
                driveId: '1example4',
                thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop',
                views: 3072,
                date: '2024-12-05',
                tags: ['cybersecurity', 'fundamentals', 'security'],
                trending: true
            },
            {
                id: '5',
                title: 'Docker Container Orchestration',
                description: 'Learn how to deploy and manage containerized applications using Docker and Kubernetes.',
                driveId: '1example5',
                thumbnail: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=200&fit=crop',
                views: 1536,
                date: '2024-12-02',
                tags: ['docker', 'kubernetes', 'devops'],
                trending: false
            },
            {
                id: '6',
                title: 'Machine Learning with Python',
                description: 'Comprehensive introduction to machine learning algorithms using Python and scikit-learn.',
                driveId: '1example6',
                thumbnail: 'https://images.unsplash.com/photo-1555949963-f7fe4b3f8b6a?w=400&h=200&fit=crop',
                views: 2560,
                date: '2024-11-28',
                tags: ['python', 'ml', 'ai'],
                trending: true
            }
        ];
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.section);
                
                // Update active nav
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Search
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.search();
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.search();
            }
        });

        // Upload
        document.getElementById('uploadBtn').addEventListener('click', () => {
            this.uploadVideo();
        });

        // Modal
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('videoModal').addEventListener('click', (e) => {
            if (e.target.id === 'videoModal') {
                this.closeModal();
            }
        });

        // Load videos on page load
        this.displayVideos('home');
        this.displayVideos('trending');
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Refresh video display if needed
        if (sectionId === 'home' || sectionId === 'trending') {
            this.displayVideos(sectionId);
        }
    }

    displayVideos(section) {
        let videosToShow = this.videos;
        
        if (section === 'trending') {
            videosToShow = this.videos.filter(video => video.trending);
        }

        const gridId = section === 'home' ? 'videoGrid' : 'trendingGrid';
        const grid = document.getElementById(gridId);
        
        if (!grid) return;

        grid.innerHTML = '';

        videosToShow.forEach(video => {
            const videoCard = this.createVideoCard(video);
            grid.appendChild(videoCard);
        });
    }

    createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" onerror="this.style.display='none'">
                <i class="fas fa-play play-icon"></i>
            </div>
            <div class="video-title">${video.title}</div>
            <div class="video-description">${video.description}</div>
            <div class="video-meta">
                <div class="video-views">
                    <i class="fas fa-eye"></i>
                    <span>${this.formatViews(video.views)}</span>
                </div>
                <div class="video-date">${this.formatDate(video.date)}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            this.playVideo(video);
        });

        return card;
    }

    playVideo(video) {
        const modal = document.getElementById('videoModal');
        const player = document.getElementById('videoPlayer');
        const title = document.getElementById('modalVideoTitle');
        const description = document.getElementById('modalVideoDescription');
        const views = document.getElementById('modalVideoViews');
        const date = document.getElementById('modalVideoDate');

        // Set video player source
        player.src = `https://drive.google.com/file/d/${video.driveId}/preview`;
        
        // Set video info
        title.textContent = video.title;
        description.textContent = video.description;
        views.textContent = `${this.formatViews(video.views)} views`;
        date.textContent = this.formatDate(video.date);

        // Show modal
        modal.style.display = 'block';
        
        // Add glitch effect to title
        title.classList.add('glitch');
        setTimeout(() => {
            title.classList.remove('glitch');
        }, 2000);

        // Increment view count
        video.views++;
        this.updateProfile();
    }

    closeModal() {
        const modal = document.getElementById('videoModal');
        const player = document.getElementById('videoPlayer');
        
        modal.style.display = 'none';
        player.src = '';
    }

    uploadVideo() {
        const title = document.getElementById('videoTitle').value;
        const description = document.getElementById('videoDescription').value;
        const driveId = document.getElementById('videoDriveId').value;
        const thumbnail = document.getElementById('videoThumbnail').value;
        const tags = document.getElementById('videoTags').value.split(',').map(tag => tag.trim());

        if (!title || !description || !driveId) {
            this.showTerminalMessage('Error: Title, description, and Drive ID are required!', 'error');
            return;
        }

        // Create new video object
        const newVideo = {
            id: Date.now().toString(),
            title,
            description,
            driveId,
            thumbnail: thumbnail || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop',
            views: 0,
            date: new Date().toISOString().split('T')[0],
            tags,
            trending: false
        };

        // Add to videos array
        this.videos.unshift(newVideo);
        
        // Update user stats
        this.currentUser.uploadCount++;
        this.updateProfile();
        
        // Clear form
        document.getElementById('videoTitle').value = '';
        document.getElementById('videoDescription').value = '';
        document.getElementById('videoDriveId').value = '';
        document.getElementById('videoThumbnail').value = '';
        document.getElementById('videoTags').value = '';

        // Show success message
        this.showTerminalMessage('Video uploaded successfully! Redirecting to home...', 'success');
        
        // Refresh video display
        this.displayVideos('home');
        
        // Switch to home section
        setTimeout(() => {
            this.showSection('home');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            document.querySelector('[data-section="home"]').classList.add('active');
        }, 2000);
    }

    search() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        if (!query) return;

        const filteredVideos = this.videos.filter(video => 
            video.title.toLowerCase().includes(query) ||
            video.description.toLowerCase().includes(query) ||
            video.tags.some(tag => tag.toLowerCase().includes(query))
        );

        // Show filtered results in home section
        this.displayFilteredVideos(filteredVideos);
        this.showSection('home');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelector('[data-section="home"]').classList.add('active');

        // Update terminal header
        const terminalHeader = document.querySelector('#home .terminal-header .prompt');
        terminalHeader.textContent = `user@htube:~$ grep -r '${query}' ./videos/ | found ${filteredVideos.length} results`;
    }

    displayFilteredVideos(videos) {
        const grid = document.getElementById('videoGrid');
        grid.innerHTML = '';

        if (videos.length === 0) {
            grid.innerHTML = '<div class="no-results">No videos found matching your search.</div>';
            return;
        }

        videos.forEach(video => {
            const videoCard = this.createVideoCard(video);
            grid.appendChild(videoCard);
        });
    }

    updateProfile() {
        document.getElementById('videoCount').textContent = this.currentUser.uploadCount;
        const totalViews = this.videos.reduce((sum, video) => sum + video.views, 0);
        document.getElementById('totalViews').textContent = this.formatViews(totalViews);
    }

    formatViews(views) {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views.toString();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            return `${Math.floor(diffDays / 7)} weeks ago`;
        } else {
            return `${Math.floor(diffDays / 30)} months ago`;
        }
    }

    showTerminalMessage(message, type = 'info') {
        const terminalHeader = document.querySelector('.section.active .terminal-header');
        if (!terminalHeader) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `terminal-message ${type}`;
        messageDiv.innerHTML = `<span class="prompt">user@htube:~$ echo "${message}"</span>`;
        
        terminalHeader.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    typeWriter() {
        const text = "Welcome to HTube - The Hacker's Video Platform";
        const outputElement = document.querySelector('.footer .output');
        let i = 0;

        function type() {
            if (i < text.length) {
                outputElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }

        // Clear existing text and start typing
        outputElement.textContent = '';
        type();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HTube();
});

// Add some terminal-style logging
console.log(`
██╗  ██╗████████╗██╗   ██╗██████╗ ███████╗
██║  ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
███████║   ██║   ██║   ██║██████╔╝█████╗  
██╔══██║   ██║   ██║   ██║██╔══██╗██╔══╝  
██║  ██║   ██║   ╚██████╔╝██████╔╝███████╗
╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝

HTube v1.0.0 - Hacker's Video Platform
Powered by GitHub & Google Drive
`);

// Add some matrix-style effects
function matrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Start matrix rain effect
setTimeout(matrixRain, 2000);
