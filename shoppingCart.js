const removeBtns = document.querySelectorAll('.remove-btn');
for (let i = 0; i < removeBtns.length; i++) {
  removeBtns[i].addEventListener('click', removeItem);
}

function removeItem(event) {
  const btn = event.target;
  const tr = btn.closest('tr');
  tr.remove();
}
