/** Router: manages navigation, URL state, and page lifecycle events */

const Router = {
    currentPage: 'home',
    
    params: {},
    
    init() {
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
        
        document.getElementById('back-button')?.addEventListener('click', () => {
            window.history.back();
        });
        
        this.handleInitialRoute();
        
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page, e.state.params || {}, false);
            }
        });
    },
    
    handleInitialRoute() {
        const hash = window.location.hash;
        
        if (hash) {
            const [page, paramString] = hash.substring(1).split('?');
            
            if (page) {
                const params = {};
                if (paramString) {
                    const searchParams = new URLSearchParams(paramString);
                    for (const [key, value] of searchParams.entries()) {
                        params[key] = value;
                    }
                }
                
                this.showPage(page, params, false);
                return;
            }
        }
        
        this.showPage('home', {}, false);
    },
    
    navigateTo(page, params = {}, preventSearch = false) {
        const paramString = this.buildParamString(params);
        const url = `#${page}${paramString ? `?${paramString}` : ''}`;
        
        window.history.pushState({ page, params, preventSearch }, '', url);
        
        this.showPage(page, params, true, preventSearch);
    },
    
    showPage(page, params = {}, updateNav = true, preventSearch = false) {
        document.querySelectorAll('.page').forEach(el => {
            el.classList.remove('active');
        });
        
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.add('active');
            this.currentPage = page;
            this.params = params;
            
            if (updateNav) {
                this.updateNavigation(page);
            }
            
            this.triggerPageEvent(page, params, preventSearch);
            
            window.scrollTo(0, 0);
        }
    },
    
    updateNavigation(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    },
    
    buildParamString(params) {
        const searchParams = new URLSearchParams();
        
        for (const key in params) {
            if (params[key]) {
                searchParams.append(key, params[key]);
            }
        }
        
        return searchParams.toString();
    },
    
    triggerPageEvent(page, params, preventSearch = false) {
        const event = new CustomEvent('pageload', {
            detail: { page, params, preventSearch }
        });
        
        document.dispatchEvent(event);
    }
};
