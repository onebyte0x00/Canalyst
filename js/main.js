// Main JavaScript for the learning guide
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰ Menu';
    
    const nav = document.querySelector('nav .container');
    if (nav) {
        nav.prepend(mobileMenuToggle);
        
        mobileMenuToggle.addEventListener('click', function() {
            const ul = nav.querySelector('ul');
            ul.style.display = ul.style.display === 'none' ? 'flex' : 'none';
        });
        
        // Hide menu on larger screens
        function handleResize() {
            const ul = nav.querySelector('ul');
            if (window.innerWidth > 768) {
                ul.style.display = 'flex';
            } else {
                ul.style.display = 'none';
            }
        }
        
        window.addEventListener('resize', handleResize);
        handleResize();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.title = 'Toggle Dark Mode';
    
    const header = document.querySelector('header .container');
    if (header) {
        header.appendChild(darkModeToggle);
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
});

// Add dark mode styles dynamically
const darkModeStyles = `
.dark-mode {
    background-color: #121212;
    color: #e0e0e0;
}

.dark-mode .feature-card,
.dark-mode .topic-content,
.dark-mode .quiz-container {
    background-color: #1e1e1e;
    color: #e0e0e0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.dark-mode .code-block {
    background-color: #2d2d2d;
    color: #f8f8f2;
}

.dark-mode .commands-table tr:nth-child(even) {
    background-color: #2a2a2a;
}

.dark-mode .commands-table tr:hover {
    background-color: #333;
}

.dark-mode .question {
    border-bottom-color: #444;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = darkModeStyles;
document.head.appendChild(styleElement);
