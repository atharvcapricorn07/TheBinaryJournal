document.addEventListener("DOMContentLoaded", () => {
  const layerBack  = document.querySelector(".layer-back");
  const layerMid   = document.querySelector(".layer-mid");
  const layerFront = document.querySelector(".layer-front");

  if (!layerBack || !layerMid || !layerFront) {
    console.warn("Parallax layers missing—check your HTML.");
    return;
  }

  let targetScroll = window.scrollY;
  let currentScroll = targetScroll;

  const lerp = (start, end, factor) => start + (end - start) * factor;

  function animateParallax() {
    // Slower easing = longer delay
    currentScroll = lerp(currentScroll, targetScroll, 0.05);

    layerBack.style.transform  = `translateY(${currentScroll * 0.1}px)`;
    layerMid.style.transform   = `translateY(${currentScroll * 0.4}px)`;
    layerFront.style.transform = `translateY(${currentScroll * 0.8}px)`;

    requestAnimationFrame(animateParallax);
  }

  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
  }, { passive: true });

  animateParallax();
});