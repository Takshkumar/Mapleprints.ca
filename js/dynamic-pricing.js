document.addEventListener('DOMContentLoaded', () => {
  const dynamicPricingContainers = document.querySelectorAll('.dynamic-pricing-container');
  
  const pricingTiers = {
    500: 199,
    1000: 299,
    1500: 399,
    2000: 499
  };

  dynamicPricingContainers.forEach(container => {
    const qtyBtns = container.querySelectorAll('.qty-btn');
    const priceDisplay = container.querySelector('.hero-price-display, .current-price-display');
    const splitOptionContainer = container.querySelector('.split-design-option');
    const splitCheckbox = container.querySelector('.hero-split-checkbox');
    const qtyDisplay = container.querySelector('.hero-qty-display'); // Optional, if exists
    
    // Original package price reference or original display
    const originalPriceDisplay = container.querySelector('.offer-original, .original-price-display');
    
    qtyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all
        qtyBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked
        const target = e.currentTarget;
        target.classList.add('active');
        
        // Get details
        const qty = parseInt(target.getAttribute('data-qty'));
        const price = pricingTiers[qty];
        
        // Update Displays
        if (priceDisplay) {
            // Animate number natively
            const startPrice = parseInt(priceDisplay.innerText.replace(/[^0-9]/g, '') || '0');
            animateValue(priceDisplay, startPrice, price, 300);
        }
        
        if (qtyDisplay) {
            qtyDisplay.innerText = `${qty} Premium Business Cards`;
        }

        if (originalPriceDisplay) {
            // Adjust the original crossed-out price roughly visually (+50)
            originalPriceDisplay.innerText = `$${price + 50}`;
        }
        
        // Logic for Split Design
        if (splitOptionContainer) {
            if (qty >= 1000) {
                splitOptionContainer.classList.remove('disabled');
                if (splitCheckbox) splitCheckbox.disabled = false;
            } else {
                splitOptionContainer.classList.add('disabled');
                // Uncheck if it gets disabled
                if (splitCheckbox) {
                    splitCheckbox.checked = false;
                    splitCheckbox.disabled = true;
                }
            }
        }
      });
    });
  });

  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate current value
      const current = Math.floor(progress * (end - start) + start);
      
      // Keep $ prefix if original had it, or we enforce it outside.
      // Usually, we just put number inside. Let's assume obj just has number.
      obj.innerHTML = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = end;
      }
    };
    window.requestAnimationFrame(step);
  }
});
