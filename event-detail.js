/** Event Detail: fetch and render a single event */

const EventDetailPage = {
    init() {
        document.addEventListener('pageload', (e) => {
            if (e.detail.page === 'event-detail') {
                if (e.detail.params && e.detail.params.id) {
                    this.loadEventDetails(e.detail.params.id);
                } else {
                    Router.navigateTo('home');
                }
            }
        });
        
        const registerButton = document.getElementById('register-button');
        if (registerButton) {
            registerButton.addEventListener('click', this.handleRegister);
        }
    },
    
    async loadEventDetails(eventId) {
        const contentContainer = document.querySelector('.event-detail-content');
        
        if (!contentContainer) return;
        
        contentContainer.innerHTML = '<div class="loading">Loading event details...</div>';
        
        try {
            const event = await API.getEventById(eventId);
            
            contentContainer.innerHTML = this.renderEventDetails(event);
        } catch (error) {
            contentContainer.innerHTML = `
                <div class="error-message">
                    Failed to load event details. Please try again later.
                </div>
            `;
            console.error('Error loading event details:', error);
        }
    },
    
    renderEventDetails(event) {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Set status tag class name
        const statusClass = event.status === 'upcoming' ? 'event-status-upcoming' : 'event-status-completed';
        const statusText = event.status === 'upcoming' ? 'upcoming' : 'completed';
        
        return `
            <div class="event-detail-header">
                <img src="${event.image_url || '#'}" alt="${event.name}" class="event-detail-image">
                <div class="event-detail-tags">
                    <span class="event-detail-category">${event.category?.name || 'Event'}</span>
                    <span class="event-detail-status ${statusClass}">${statusText}</span>
                </div>
            </div>
            <div class="event-detail-body">
                <h1 class="event-detail-title">${event.name}</h1>
                
                <div class="event-detail-meta">
                    <div class="event-date">
                        <span class="meta-label">Date:</span>
                        <span class="meta-value">${formattedDate}</span>
                    </div>
                    <div class="event-location">
                        <span class="meta-label">Location:</span>
                        <span class="meta-value">${event.location}</span>
                    </div>
                    <div class="event-category-detail">
                        <span class="meta-label">Category:</span>
                        <span class="meta-value">${event.category?.name || 'N/A'}</span>
                    </div>
                    <div class="event-status-detail">
                        <span class="meta-label">Status:</span>
                        <span class="meta-value">${statusText}</span>
                    </div>
                </div>

                
                <div class="event-detail-description">
                    <h2>About This Event</h2>
                    <p>${event.description}</p>
                </div>
                
                <div class="event-funding">
                    <h2>Funding Progress</h2>
                    <div class="funding-stats">
                        <div class="funding-goal">
                            <span class="meta-label">Goal:</span>
                            <span class="meta-value">¥${event.funding_goal.toLocaleString()}</span>
                        </div>
                        <div class="funding-current">
                            <span class="meta-label">Raised:</span>
                            <span class="meta-value">¥${event.current_funding.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="funding-progress-container">
                        <div class="funding-progress-bar" style="width: ${event.funding_progress_percentage}%"></div>
                    </div>
                    <div class="funding-percentage">${event.funding_progress_percentage}% Complete</div>
                </div>
                
                <div class="event-organization">
                    <div class="event-organization-header">
                        <img src="${event.organisation?.logo_url || '#'}" alt="${event.organisation?.name}" class="event-organization-logo">
                        <h3 class="event-organization-name">${event.organisation?.name || 'Unknown Organization'}</h3>
                    </div>
                    <p>${event.organisation?.description || 'No organization description available.'}</p>
                    ${event.organisation?.website ? `<p><a href="${event.organisation.website}" target="_blank">Visit Website</a></p>` : ''}
                </div>
            </div>
        `;
    },
    
    handleRegister() {
        alert('This feature is under construction.');
    }
};
