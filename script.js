document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');

    // 1. Fetch the JSON data
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            // 2. Generate HTML for each project
            projects.forEach(project => {
                const slide = document.createElement('li');
                slide.classList.add('carousel-slide');
                
                // This mimics the card structure from your CSS
                slide.innerHTML = `
                    <article class="card">
                        <img src="${project.image}" alt="${project.title}" class="card-img-placeholder">
                        <div class="card-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <a href="${project.link}" class="btn">View Project</a>
                        </div>
                    </article>
                `;
                
                track.appendChild(slide);
            });
        })
        .catch(error => console.error('Error loading projects:', error));

    // 3. Carousel Logic (Sliding)
    let scrollAmount = 0;
    
    nextButton.addEventListener('click', () => {
        const slideWidth = 340; // 300px width + 20px margin
        const trackWidth = track.scrollWidth;
        const containerWidth = track.parentElement.clientWidth;
        
        // Stop scrolling if we reached the end
        if (scrollAmount < (trackWidth - containerWidth)) {
            scrollAmount += slideWidth;
            track.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });

    prevButton.addEventListener('click', () => {
        const slideWidth = 320;
        
        if (scrollAmount > 0) {
            scrollAmount -= slideWidth;
            track.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });
});