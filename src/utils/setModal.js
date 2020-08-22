let scrollTop
export const openModal = () => {
  scrollTop = document.scrollingElement.scrollTop ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
    document.body.classList.add('modal_open_now');
    document.body.style.top = -scrollTop + 'px';
}
export const closeModal = () => {
  document.body.classList.remove('modal_open_now');
  document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
}