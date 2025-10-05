/**
 * App entry: init router and pages; provide global image fallback
 */

document.addEventListener('DOMContentLoaded', () => {
    Router.init();
    
    HomePage.init();
    SearchPage.init();
    EventDetailPage.init();
    
    // Global image error fallback
    document.addEventListener('error', (e) => {
        if (e.target.tagName.toLowerCase() === 'img') {
            const parent = e.target.parentNode;
            if (parent) {
                const replacement = document.createElement('div');
                replacement.className = e.target.className + ' image-placeholder';
                replacement.style.backgroundColor = '#3498db';
                replacement.style.display = 'flex';
                replacement.style.alignItems = 'center';
                replacement.style.justifyContent = 'center';
                replacement.style.color = 'white';
                replacement.style.fontWeight = 'bold';
                
                if (e.target.classList.contains('event-image')) {
                    replacement.textContent = 'Event Image';
                } else if (e.target.classList.contains('event-organization-logo')) {
                    replacement.textContent = 'Logo';
                    replacement.style.backgroundColor = '#2ecc71';
                }
                
                parent.replaceChild(replacement, e.target);
            }
        }
    }, true);
});
