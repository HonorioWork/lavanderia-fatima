const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const revealItems = document.querySelectorAll(".reveal");
const modal = document.querySelector("[data-modal]");
const modalImage = document.querySelector("[data-modal-image]");
const modalClose = document.querySelector("[data-modal-close]");
const galleryItems = document.querySelectorAll("[data-gallery]");
const carouselButtons = document.querySelectorAll("[data-carousel-prev], [data-carousel-next]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", Boolean(isOpen));
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const moveCarousel = (track, direction) => {
  if (!track) return;

  const firstItem = track.firstElementChild;
  const styles = window.getComputedStyle(track);
  const gap = Number.parseFloat(styles.columnGap || styles.gap) || 16;
  const itemWidth = firstItem?.getBoundingClientRect().width || track.clientWidth * 0.85;
  const scrollAmount = itemWidth + gap;

  track.scrollBy({
    left: scrollAmount * direction,
    behavior: "smooth",
  });
};

carouselButtons.forEach((button) => {
  const carouselName = button.dataset.carouselPrev || button.dataset.carouselNext;
  const direction = button.dataset.carouselPrev ? -1 : 1;
  const track = document.querySelector(`[data-carousel="${carouselName}"]`);

  button.addEventListener("click", () => {
    moveCarousel(track, direction);
  });
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imagePath = item.getAttribute("data-gallery");

    if (!imagePath || !modal || !modalImage) return;

    modalImage.src = imagePath;

    if (typeof modal.showModal === "function") {
      modal.showModal();
    }
  });
});

modalClose?.addEventListener("click", () => {
  modal?.close();
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
