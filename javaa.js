  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const speed = 200; // adjust speed here

    const update = () => {
      const value = +counter.innerText.replace(/,/g, '');
      const increment = target / speed;

      if (value < target) {
        const newValue = Math.min(value + increment, target);
        counter.innerText = Math.ceil(newValue).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };

    update();
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
