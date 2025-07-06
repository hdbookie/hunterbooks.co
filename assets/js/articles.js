/* ===========================
   Articles JavaScript
   =========================== */

// Sample articles data (in production, this would come from a CMS or API)
const articles = [
    {
        id: 1,
        slug: 'building-surfhunter-from-idea-to-5k-users',
        title: 'Building SurfHunter: From Idea to 5k+ Users',
        excerpt: 'The journey of creating Brazil\'s fastest-growing surf app, from a personal frustration to a thriving platform.',
        category: 'business',
        tags: ['startup', 'mobile', 'flutter'],
        date: '2024-01-15',
        readTime: '8 min',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&h=400&fit=crop',
        author: 'Hunter Books'
    },
    {
        id: 2,
        slug: 'automating-sales-with-mcp-servers',
        title: 'Automating Sales Workflows with MCP Servers',
        excerpt: 'How custom MCP servers can reduce manual work by 90% and transform your sales process.',
        category: 'automation',
        tags: ['mcp', 'automation', 'sales'],
        date: '2024-01-10',
        readTime: '12 min',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
        author: 'Hunter Books'
    },
    {
        id: 3,
        slug: 'flutter-vs-react-native-2024',
        title: 'Flutter vs React Native in 2024: My Experience',
        excerpt: 'After building apps with both frameworks, here\'s my take on choosing the right tool for your project.',
        category: 'development',
        tags: ['flutter', 'react-native', 'mobile'],
        date: '2024-01-05',
        readTime: '10 min',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        author: 'Hunter Books'
    },
    {
        id: 4,
        slug: 'python-trading-bots-crypto',
        title: 'Building Trading Bots with Python: Lessons Learned',
        excerpt: 'My journey from manual trading to automated systems, and the valuable programming skills gained along the way.',
        category: 'development',
        tags: ['python', 'trading', 'automation'],
        date: '2023-12-28',
        readTime: '15 min',
        image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=400&fit=crop',
        author: 'Hunter Books'
    },
    {
        id: 5,
        slug: 'firebase-vs-supabase-startup',
        title: 'Firebase vs Supabase: Choosing a Backend for Your Startup',
        excerpt: 'A practical comparison based on real project experience, covering costs, features, and developer experience.',
        category: 'development',
        tags: ['firebase', 'supabase', 'backend'],
        date: '2023-12-20',
        readTime: '9 min',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        author: 'Hunter Books'
    },
    {
        id: 6,
        slug: 'spaced-repetition-learning-code',
        title: 'Master Programming Concepts with Spaced Repetition',
        excerpt: 'How I built a custom Anki-based system to dramatically improve technical learning retention.',
        category: 'tutorial',
        tags: ['learning', 'productivity', 'anki'],
        date: '2023-12-15',
        readTime: '7 min',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
        author: 'Hunter Books'
    }
];

// Initialize articles
document.addEventListener('DOMContentLoaded', () => {
    loadArticles('all');
    setupFilterButtons();
});

// Load articles based on filter
function loadArticles(filter) {
    const articlesGrid = document.getElementById('articlesGrid');
    if (!articlesGrid) return;
    
    const filteredArticles = filter === 'all' 
        ? articles 
        : articles.filter(article => article.category === filter);
    
    articlesGrid.innerHTML = filteredArticles.map(article => createArticleCard(article)).join('');
    
    // Add fade-in animation
    articlesGrid.querySelectorAll('.article-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Create article card HTML
function createArticleCard(article) {
    const formattedDate = new Date(article.date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    return `
        <a href="/articles/${article.slug}" class="article-card">
            <img src="${article.image}" alt="${article.title}" class="article-image">
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-date">📅 ${formattedDate}</span>
                    <span class="article-category">${article.category}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-footer">
                    <span class="read-time">⏱️ ${article.readTime}</span>
                    <span class="read-more">Ler mais →</span>
                </div>
            </div>
        </a>
    `;
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-tag');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Load filtered articles
            const filter = button.getAttribute('data-filter');
            loadArticles(filter);
        });
    });
}

// Add search functionality (for future enhancement)
function searchArticles(query) {
    const searchQuery = query.toLowerCase();
    const filteredArticles = articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery) ||
        article.excerpt.toLowerCase().includes(searchQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
    
    const articlesGrid = document.getElementById('articlesGrid');
    articlesGrid.innerHTML = filteredArticles.map(article => createArticleCard(article)).join('');
}