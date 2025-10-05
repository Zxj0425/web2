/** API service: centralized backend requests with basic error handling */

const API = {
    baseUrl: 'http://localhost:3000/api',
    
    async fetch(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            const data = await response.json();
            
            if (data.code !== 200) {
                throw new Error(data.message || 'API request failed');
            }
            
            return data.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },
    
    async getCategories() {
        return this.fetch('/categories');
    },
    
    async getOrganizations() {
        return this.fetch('/organisations');
    },
    
    async getEvents() {
        return this.fetch('/events');
    },
    
    async searchEvents(filters = {}) {
        const queryParams = new URLSearchParams();
        
        if (filters.date) {
            queryParams.append('date', filters.date);
        }
        
        if (filters.location) {
            queryParams.append('location', filters.location);
        }
        
        if (filters.categoryId) {
            queryParams.append('categoryId', filters.categoryId);
        }
        
        const queryString = queryParams.toString();
        const endpoint = `/events/search${queryString ? `?${queryString}` : ''}`;
        
        return this.fetch(endpoint);
    },
    
    async getEventById(id) {
        return this.fetch(`/events/${id}`);
    }
};
