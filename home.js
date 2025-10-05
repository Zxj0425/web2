/** Home Page: load and render events */

const HomePage = {
    init() {
        document.addEventListener('pageload', (e) => {
            if (e.detail.page === 'home') {
                this.loadEvents();
            }
        });
    },
    
    async loadEvents() {
        const eventsContainer = document.getElementById('events-list');
        
        if (!eventsContainer) return;
        
        eventsContainer.innerHTML = '<div class="loading">Loading events...</div>';
        
        try {
            const events = await API.getEvents();
            
            if (events && events.length > 0) {
                eventsContainer.innerHTML = '';
                
                events.forEach(event => {
                    eventsContainer.appendChild(this.createEventCard(event));
                });
            } else {
                eventsContainer.innerHTML = '<p class="no-results">No upcoming events found.</p>';
            }
        } catch (error) {
            eventsContainer.innerHTML = `
                <div class="error-message">
                    Failed to load events. Please try again later.
                </div>
            `;
            console.error('Error loading events:', error);
        }
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
