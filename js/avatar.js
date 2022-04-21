import {AVATAR_HEIGHT, AVATAR_WIDTH, BASE_IMG_CONTENT, FILE_TYPES} from './const.js';

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const imageChooser = document.querySelector('#images');
const imagePreview = document.querySelector('.ad-form__photo');

const getPreview = (fileChooser, preview) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const image = document.createElement('img');
        image.src = reader.result;
        image.width = AVATAR_WIDTH;
        image.height = AVATAR_HEIGHT;
        preview.style.padding = '0 15px';
        preview.style.alignItems = 'center';
        preview.style.display = 'flex';
        preview.textContent = '';
        preview.appendChild(image);
      });
      reader.readAsDataURL(file);
    }
  });
};

const resetImages = () => {
  avatarPreview.innerHTML = BASE_IMG_CONTENT;
  imagePreview.textContent = '';
};

getPreview(avatarChooser, avatarPreview);
getPreview(imageChooser, imagePreview);

export {resetImages};
