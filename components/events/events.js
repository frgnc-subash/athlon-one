    // Simple filtering functionality
    document.addEventListener('DOMContentLoaded', function() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      const eventCards = document.querySelectorAll('.event-card');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          
          // Show all cards if 'all' is selected
          if (filterValue === 'all') {
            eventCards.forEach(card => {
              card.style.display = 'block';
            });
            return;
          }
          
          // Filter cards based on category
          eventCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (category === filterValue) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    });