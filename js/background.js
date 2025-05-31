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

  let mouseX = 0, mouseY = 0;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Update mouse position relative to screen center (-1 to 1)
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / windowWidth - 0.5) * 2;
    mouseY = (e.clientY / windowHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener("resize", () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  });

  window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
  }, { passive: true });

  const lerp = (start, end, factor) => start + (end - start) * factor;

  function animateParallax() {
    currentScroll = lerp(currentScroll, targetScroll, 0.05);

    const scrollBack = currentScroll * 0.1;
    const scrollMid = currentScroll * 0.4;
    const scrollFront = currentScroll * 0.8;

    const mouseIntensity = 10; // change to 20 for stronger effect
    const mouseOffsetX = mouseX * mouseIntensity;
    const mouseOffsetY = mouseY * mouseIntensity;

    layerBack.style.transform  = `translate(${mouseOffsetX * 0.3}px, ${scrollBack + mouseOffsetY * 0.3}px)`;
    layerMid.style.transform   = `translate(${mouseOffsetX * 0.6}px, ${scrollMid  + mouseOffsetY * 0.6}px)`;
    layerFront.style.transform = `translate(${mouseOffsetX}px, ${scrollFront + mouseOffsetY}px)`;

    requestAnimationFrame(animateParallax);
  }

  animateParallax();
});
