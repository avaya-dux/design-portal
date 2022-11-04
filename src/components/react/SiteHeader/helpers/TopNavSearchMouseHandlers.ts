export const closeSearchModalOnClick = (
  event: MouseEvent,
  isOpen: boolean,
  openModal: React.Dispatch<React.SetStateAction<boolean>>,
  modalRef: React.RefObject<HTMLDivElement>
) => {
  if (isOpen && modalRef.current && event.target instanceof HTMLElement) {
    if (
      !modalRef.current.contains(event.target) &&
      !event.target.classList.contains("neo-modal__content")
    )
      openModal(false);
  }
};
