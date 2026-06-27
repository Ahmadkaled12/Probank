

script_js = '''// ============================================
// PROBANK - Complete JavaScript
// Interactions & Animations
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initSidebar();
    initThemeToggle();
    initSettingsTabs();
    initScrollReveal();
    init3DCard();
    initToastNotifications();
    initPasswordToggle();
    initMobileMenu();
});

// Particles Background
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        
        const colors = ['#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
    }
}

// Sidebar Toggle
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    
    if (!sidebar || !toggle) return;
    
    toggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // Save state
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    });
    
    // Restore state
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('collapsed');
    }
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Restore theme
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

// Settings Tabs
function initSettingsTabs() {
    const navItems = document.querySelectorAll('.settings-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            const targetTab = document.getElementById(tabId + '-tab');
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.stat-card, .content-card, .feature-card, .investment-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// 3D Credit Card
function init3DCard() {
    const card = document.querySelector('.credit-card-3d');
    if (!card) return;
    
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        const inner = card.querySelector('.credit-card-inner');
        if (inner) {
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const inner = card.querySelector('.credit-card-inner');
        if (inner) {
            inner.style.transform = 'rotateX(0) rotateY(0)';
        }
    });
}

// Toast Notifications
function initToastNotifications() {
    // Create toast container if not exists
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(message, type = 'success', duration = 3000) {
    const container = document.querySelector('.toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.success}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-100%)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Password Toggle
function initPasswordToggle() {
    const toggles = document.querySelectorAll('.toggle-password');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    // Create mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
        display: none;
    `;
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
    });
    
    // Mobile toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-btn';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    document.body.appendChild(mobileToggle);
    
    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    });
    
    // Show mobile button on small screens
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    function handleMediaChange(e) {
        mobileToggle.style.display = e.matches ? 'flex' : 'none';
    }
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);
}

// Modal Functions
function showAddUserModal() {
    const modal = document.getElementById('addUserModal');
    if (modal) modal.classList.add('active');
}

function closeAddUserModal() {
    const modal = document.getElementById('addUserModal');
    if (modal) modal.classList.remove('active');
}

function showAddInvestmentModal() {
    const modal = document.getElementById('addInvestmentModal');
    if (modal) modal.classList.add('active');
}

function closeAddInvestmentModal() {
    const modal = document.getElementById('addInvestmentModal');
    if (modal) modal.classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Form Submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    
    if (form.closest('.modal-form') || form.closest('.settings-form')) {
        e.preventDefault();
        showToast('تم حفظ التغييرات بنجاح!', 'success');
    }
});

// Register Steps
let currentStep = 1;
const totalSteps = 3;

function nextStep() {
    if (currentStep < totalSteps) {
        document.getElementById(`step-${currentStep}`).style.display = 'none';
        currentStep++;
        document.getElementById(`step-${currentStep}`).style.display = 'block';
        updateStepsIndicator();
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).style.display = 'none';
        currentStep--;
        document.getElementById(`step-${currentStep}`).style.display = 'block';
        updateStepsIndicator();
    }
}

function updateStepsIndicator() {
    const steps = document.querySelectorAll('.step');
    const lines = document.querySelectorAll('.step-line');
    
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
    
    lines.forEach((line, index) => {
        line.classList.remove('completed');
        if (index + 1 < currentStep) {
            line.classList.add('completed');
        }
    });
}

// Investment Calculator
function calculateInvestment() {
    const amount = parseFloat(document.getElementById('investAmount')?.value) || 0;
    const rate = parseFloat(document.getElementById('investRate')?.value) || 0;
    const period = parseInt(document.getElementById('investPeriod')?.value) || 0;
    
    if (amount && rate && period) {
        const profit = amount * (rate / 100) * (period / 12);
        const total = amount + profit;
        
        document.getElementById('calculatedProfit').textContent = '$' + profit.toFixed(2);
        document.getElementById('calculatedTotal').textContent = '$' + total.toFixed(2);
    }
}

// Chart.js Defaults for Dark Theme
if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';
    Chart.defaults.font.family = "'Cairo', sans-serif";
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Loading State
function showLoading(button) {
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span>';
    button.disabled = true;
}

function hideLoading(button) {
    button.innerHTML = button.dataset.originalText;
    button.disabled = false;
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('تم النسخ إلى الحافظة!', 'success');
    }).catch(() => {
        showToast('فشل النسخ!', 'error');
    });
}

// Confirm Action
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Number Formatting
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(num);
}

// Date Formatting
function formatDate(date) {
    return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Search Filter
function filterTable(input, tableSelector) {
    const filter = input.value.toLowerCase();
    const table = document.querySelector(tableSelector);
    if (!table) return;
    
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

// Export Table to CSV
function exportTableToCSV(tableSelector, filename) {
    const table = document.querySelector(tableSelector);
    if (!table) return;
    
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = [];
        
        cols.forEach(col => {
            rowData.push('"' + col.innerText.replace(/"/g, '""') + '"');
        });
        
        csv.push(rowData.join(','));
    });
    
    const csvContent = 'data:text/csv;charset=utf-8,\\uFEFF' + csv.join('\\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}

// Online/Offline Detection
window.addEventListener('online', () => {
    showToast('أنت متصل بالإنترنت', 'success');
});

window.addEventListener('offline', () => {
    showToast('أنت غير متصل بالإنترنت', 'warning');
});
'''

with open('/mnt/agents/output/script.js', 'w', encoding='utf-8') as f:
    f.write(script_js)

print("✅ script.js created successfully!")
print(f"Size: {len(script_js)} characters")
