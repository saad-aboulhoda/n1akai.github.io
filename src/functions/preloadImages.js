export function preloadImages(array) {
  const imgs = [];
  for (let i = 0; i < array.length; i++) {
    const img = new Image();
    img.src = array[i];
    imgs.push(img);
  }
  return imgs;
}
