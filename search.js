/** Search Page: manage filters, search, and results rendering */

const SearchPage = {
    lastSearchParams: null,
    
    isSearching: false,
    
    init() {
        document.addEventListener('pageload', (e) => {
            if (e.detail.page === 'search') {
                this.setupSearchForm();
                this.loadCategories();
                
                if (Object.keys(e.detail.params).length > 0 && !e.detail.preventSearch) {
                    if (!this.isSameSearch(e.detail.params)) {
                        this.populateFormFromParams(e.detail.params);
                        
                        this.lastSearchParams = {...e.detail.params};
                        
                        this.performSearch(e.detail.params);
                    } else {
                        console.log('Skipping duplicate search on page load');
                        this.populateFormFromParams(e.detail.params);
                    }
                }
            }
        });
    },
    
    setupSearchForm() {
        const form = document.getElementById('event-search-form');
        const clearButton = document.getElementById('clear-search');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (this.isSearching) {
                    console.log('Search already in progress, ignoring request');
                    return;
                }
                
                const formData = new FormData(form);
                const searchParams = {};
                
                for (const [key, value] of formData.entries()) {
                    if (value) {
                        searchParams[key] = value;
                    }
                }
                
                if (this.isSameSearch(searchParams)) {
                    console.log('Skipping duplicate search with same parameters');
                    return;
                }
                
                this.isSearching = true;
                
                this.lastSearchParams = {...searchParams};
                
                // Update URL with search parameters; prevent pageload-triggered search
                const preventSearch = true;
                Router.navigateTo('search', searchParams, preventSearch);
                
                this.performSearch(searchParams);
            });
        }
        
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                if (this.isSearching) {
                    console.log('Search in progress, ignoring clear request');
                    return;
                }
                
                form.reset();
                
                const resultsContainer = document.getElementById('search-results-list');
                if (resultsContainer) {
                    resultsContainer.innerHTML = '<p class="no-results">Use the form above to search for events</p>';
                }
                
                this.lastSearchParams = null;
                
                // Update URL to remove parameters; prevent pageload-triggered search
                Router.navigateTo('search', {}, true);
            });
        }
    },
    
    async loadCategories() {
        const categorySelect = document.getElementById('search-category');
        
        if (!categorySelect) return;
        
        try {
            const categories = await API.getCategories();
            
            if (categories && categories.length > 0) {
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    },
    
    populateFormFromParams(params) {
        const form = document.getElementById('event-search-form');
        
        if (!form) return;
        
        for (const key in params) {
            const field = form.elements[key];
            if (field) {
                field.value = params[key];
            }
        }
    },
    
    async performSearch(filters) {
        const resultsContainer = document.getElementById('search-results-list');
        
        if (!resultsContainer) return;
        
        this.isSearching = true;
        
        resultsContainer.innerHTML = '<div class="loading">Searching events...</div>';
        
        try {
            const events = await API.searchEvents(filters);
            
            if (events && events.length > 0) {
                resultsContainer.innerHTML = '';
                
                events.forEach(event => {
                    resultsContainer.appendChild(this.createEventCard(event));
                });
            } else {
                resultsContainer.innerHTML = '<p class="no-results">No events found matching your criteria.</p>';
            }
        } catch (error) {
            resultsContainer.innerHTML = `
                <div class="error-message">
                    Failed to search events. Please try again later.
                </div>
            `;
            console.error('Error searching events:', error);
            this.lastSearchParams = null;
        } finally {
            this.isSearching = false;
        }
    },
    
    isSameSearch(currentParams) {
        if (!this.lastSearchParams) return false;
        
        const currentKeys = Object.keys(currentParams);
        const lastKeys = Object.keys(this.lastSearchParams);
        
        if (currentKeys.length !== lastKeys.length) return false;
        
        for (const key of currentKeys) {
            if (currentParams[key] !== this.lastSearchParams[key]) {
                return false;
            }
        }
        
        return true;
    },
    
    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-event-id', event.id);
        
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Set status tag class name
        const statusClass = event.status === 'upcoming' ? 'event-status-upcoming' : 'event-status-completed';
        const statusText = event.status === 'upcoming' ? 'upcoming' : 'completed';
        
        card.innerHTML = `
            <img src="${event.image_url || '#'}" alt="${event.name}" class="event-image">
            <div class="event-content">
                <h3 class="event-title">${event.name}</h3>
                <div class="event-meta">
                    <div>${formattedDate}</div>
                    <div>${event.location}</div>
                </div>
                <p class="event-description">${event.description}</p>
                <div class="event-tags">
                    <span class="event-category">${event.category?.name || 'Event'}</span>
                    <span class="event-status ${statusClass}">${statusText}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            Router.navigateTo('event-detail', { id: event.id });
        });
        
        return card;
    }
};
