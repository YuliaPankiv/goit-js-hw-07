import { galleryItems } from "./gallery-items.js";
// Change code below this line

let gallery = document.querySelector(".gallery");
let markupGallery = createImgMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", markupGallery);
gallery.addEventListener("click", onImgGallery);

function createImgMarkup(galleryItem) {
  return galleryItem
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
      <a class="gallery__link" href="${original}" rel="no-referrer no-opener">
      <img
        class="gallery__image"
        src="${preview}";
        data-source="${original}"
        alt= ${description}
      />
    </a>
  </div>`
    )
    .join(" ");
}

function onImgGallery(event) {
  event.preventDefault();

  const { target } = event;

  if (!target.dataset.source) {
    return;
  }

  const instance = basicLightbox.create(
    `<img
        src="${target.dataset.source}"
        alt= "${target.description}"
      />`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEsc);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEsc);
      },
    }
  );

  instance.show();

  addEventListener("keydown", onEsc, { once: true });
  function onEsc(e) {
    if (e.code === "Escape") {
      instance.close();
     
    }
  }
}
