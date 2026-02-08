document.addEventListener('DOMContentLoaded', () => {
    // 1. Property Data Array
    const properties = [
        {
            id: 1,
            title: "Oceanfront Luxury Villa",
            location: "Miami",
            type: "House",
            price: 2500000,
            beds: 5,
            baths: 4,
            sqft: 4200,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
            description: "Experience coastal living at its finest. This modern villa features panoramic ocean views, a private infinity pool, and state-of-the-art home automation.",
            agent: "Sarah Johnson",
            badges: ["Featured", "New"]
        },
        {
            id: 2,
            title: "Modern Skyline Apartment",
            location: "New York",
            type: "Apartment",
            price: 1800000,
            beds: 3,
            baths: 2,
            sqft: 1800,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
            description: "High-floor luxury living in the heart of Manhattan. Floor-to-ceiling windows offer breathtaking views of the city skyline.",
            agent: "Michael Chen",
            badges: ["Hot Deal"]
        },
        {
            id: 3,
            title: "Serene Garden Plot",
            location: "Los Angeles",
            type: "Plot",
            price: 750000,
            beds: 0,
            baths: 0,
            sqft: 12000,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
            description: "A rare opportunity to build your dream home on this 0.25-acre prime plot in Beverly Hills suburbs. Surrounded by lush greenery.",
            agent: "Emily Davis",
            badges: ["Rare Find"]
        },
        {
            id: 4,
            title: "Penthouse at the Plaza",
            location: "Chicago",
            type: "Apartment",
            price: 3200000,
            beds: 4,
            baths: 3,
            sqft: 3500,
            image: "https://images.unsplash.com/photo-1600566752355-3979ff1040ad?q=80&w=1974&auto=format&fit=crop",
            description: "The peak of urban luxury. This penthouse features a private rooftop terrace, high-end imported finishes, and concierge services.",
            agent: "Robert Wilson",
            badges: ["Luxury"]
        },
        {
            id: 5,
            title: "Spanish Style Family Home",
            location: "Miami",
            type: "House",
            price: 1200000,
            beds: 4,
            baths: 3,
            sqft: 2800,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
            description: "Charming family home with authentic Spanish architecture, a newly renovated kitchen, and a spacious backyard for gatherings.",
            agent: "Sarah Johnson",
            badges: ["Sold Fast"]
        },
        {
            id: 6,
            title: "Downtown Loft Studio",
            location: "New York",
            type: "Apartment",
            price: 950000,
            beds: 1,
            baths: 1,
            sqft: 850,
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
            description: "Industrial chic loft with high ceilings, exposed brick walls, and premium stainless steel appliances. Perfect for creatives.",
            agent: "Michael Chen",
            badges: ["Top Rated"]
        },
        {
            id: 7,
            title: "Summit View Estate",
            location: "Los Angeles",
            type: "House",
            price: 4500000,
            beds: 6,
            baths: 5,
            sqft: 6500,
            image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop",
            description: "Palatial estate offering unmatched privacy and views. Features include a home theater, wine cellar, and private tennis court.",
            agent: "Emily Davis",
            badges: ["Exclusive"]
        }
    ];

    // 2. DOM Elements
    const propertyGrid = document.getElementById('propertyGrid');
    const propertyCount = document.getElementById('propertyCount');
    const filterLocation = document.getElementById('filterLocation');
    const filterType = document.getElementById('filterType');
    const filterPrice = document.getElementById('filterPrice');
    const priceValue = document.getElementById('priceValue');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const modalContent = document.getElementById('modalContent');
    const propertyModal = new bootstrap.Modal(document.getElementById('propertyModal'));
    const navbarSearch = document.getElementById('navbarSearch');

    // 3. Render Cards Function
    const renderProperties = (items) => {
        propertyGrid.innerHTML = '';
        propertyCount.textContent = `Showing ${items.length} ${items.length === 1 ? 'property' : 'properties'}`;

        if (items.length === 0) {
            propertyGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                    <h4 class="text-muted">No properties found matching your criteria.</h4>
                    <p class="text-muted small">Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }

        items.forEach(prop => {
            const col = document.createElement('div');
            col.className = 'col-sm-12 col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="card property-card shadow-sm">
                    <div class="card-img-container">
                        <img src="${prop.image}" alt="${prop.title}">
                        <div class="property-badge">${prop.badges[0] || prop.type}</div>
                        <div class="position-absolute bottom-0 start-0 p-3 w-100 bg-gradient-dark text-white d-flex justify-content-between align-items-end" style="background: linear-gradient(transparent, rgba(0,0,0,0.7));">
                            <span class="price-tag text-white">$${formatPrice(prop.price)}</span>
                        </div>
                    </div>
                    <div class="card-body p-4">
                        <h5 class="card-title fw-bold mb-1">${prop.title}</h5>
                        <p class="text-muted small mb-3"><i class="bi bi-geo-alt me-1 text-primary"></i> ${prop.location}</p>
                        <div class="d-flex justify-content-between border-top pt-3 prop-features small text-muted">
                            <span><i class="bi bi-door-open me-1"></i> ${prop.beds || '--'} Beds</span>
                            <span><i class="bi bi-droplet me-1"></i> ${prop.baths || '--'} Baths</span>
                            <span><i class="bi bi-arrows-fullscreen me-1"></i> ${prop.sqft} sqft</span>
                        </div>
                        <button class="btn btn-outline-primary w-100 mt-4 rounded-pill view-details" data-id="${prop.id}">
                            View Details
                        </button>
                    </div>
                </div>
            `;
            propertyGrid.appendChild(col);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', () => openModal(btn.getAttribute('data-id')));
        });
    };

    // 4. Modal Open Function
    const openModal = (id) => {
        const prop = properties.find(p => p.id == id);
        if (!prop) return;

        modalContent.innerHTML = `
            <div class="position-relative">
                <button type="button" class="btn-close position-absolute top-0 end-0 m-3 z-3 bg-white rounded-circle shadow p-2" data-bs-dismiss="modal"></button>
                <img src="${prop.image}" class="modal-gallery-item" alt="${prop.title}">
            </div>
            <div class="p-4 p-md-5">
                <div class="d-flex justify-content-between flex-wrap gap-2 mb-3">
                    <div>
                        <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 mb-2">${prop.type}</span>
                        <h2 class="fw-bold mb-1">${prop.title}</h2>
                        <p class="text-muted"><i class="bi bi-geo-alt me-1 text-primary"></i> ${prop.location}</p>
                    </div>
                    <div class="text-md-end">
                        <h3 class="fw-bold text-primary mb-0">$${formatPrice(prop.price)}</h3>
                        <p class="text-muted small mb-0 font-monospace">Ref ID: EST-${prop.id}992</p>
                    </div>
                </div>
                
                <div class="row g-3 mb-4">
                    <div class="col-6 col-md-3">
                        <div class="modal-feature">
                            <i class="bi bi-door-open text-primary"></i>
                            <div>
                                <div class="fw-bold small">${prop.beds || 'N/A'}</div>
                                <div class="text-muted" style="font-size: 0.7rem;">Bedrooms</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="modal-feature">
                            <i class="bi bi-droplet text-primary"></i>
                            <div>
                                <div class="fw-bold small">${prop.baths || 'N/A'}</div>
                                <div class="text-muted" style="font-size: 0.7rem;">Bathrooms</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="modal-feature">
                            <i class="bi bi-arrows-fullscreen text-primary"></i>
                            <div>
                                <div class="fw-bold small">${prop.sqft}</div>
                                <div class="text-muted" style="font-size: 0.7rem;">Sq Ft Area</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="modal-feature">
                            <i class="bi bi-calendar-check text-primary"></i>
                            <div>
                                <div class="fw-bold small">Ready</div>
                                <div class="text-muted" style="font-size: 0.7rem;">Status</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h5 class="fw-bold mb-3">Description</h5>
                    <p class="text-muted">${prop.description}</p>
                </div>

                <div class="card border-0 bg-light p-3 rounded-4 d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <div class="bg-primary text-white rounded-circle btn-icon me-3">
                            <i class="bi bi-person"></i>
                        </div>
                        <div>
                            <h6 class="fw-bold mb-0">${prop.agent}</h6>
                            <small class="text-muted">Premium Agent</small>
                        </div>
                    </div>
                    <button class="btn btn-primary rounded-pill px-4">Contact Agent</button>
                </div>
            </div>
        `;
        propertyModal.show();
    };

    // 5. Utility: Format Price
    const formatPrice = (price) => {
        if (price >= 1000000) return (price / 1000000).toFixed(1) + 'M';
        return price.toLocaleString();
    };

    // 6. Filtering Logic
    const filterData = () => {
        const loc = filterLocation.value;
        const type = filterType.value;
        const maxPrice = parseInt(filterPrice.value);
        const search = navbarSearch.value.toLowerCase();

        const filtered = properties.filter(prop => {
            const matchLoc = loc === 'all' || prop.location === loc;
            const matchType = type === 'all' || prop.type === type;
            const matchPrice = prop.price <= maxPrice;
            const matchSearch = prop.location.toLowerCase().includes(search) ||
                prop.title.toLowerCase().includes(search);

            return matchLoc && matchType && matchPrice && matchSearch;
        });

        renderProperties(filtered);
    };

    // 7. Event Listeners
    filterPrice.addEventListener('input', (e) => {
        priceValue.textContent = `$${formatPrice(e.target.value)}`;
    });

    applyFiltersBtn.addEventListener('click', filterData);

    navbarSearch.addEventListener('input', filterData);

    // Initial Render
    renderProperties(properties);
});
