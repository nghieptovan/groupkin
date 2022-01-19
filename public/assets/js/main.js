function toggleClass(ids) {
  ids.forEach(id => {
    document.getElementById(id).classList.toggle("active");
  });
}

function changeClass(ele, class1, class2) {
  if (ele.classList.contains(class1)) {
    ele.classList.remove(class1);
    ele.classList.add(class2);
  } else if (ele.classList.contains(class2)) {
    ele.classList.remove(class2);
    ele.classList.add(class1);
  }
}

function setHeightMansonry(ele) {
  // GET HEIGHT OF THE TALLEST COLUMN & SET HEIGHT TO MANSONRY ELE
  let heights = [];
  const columnLength = parseInt(ele.dataset.mansonry, 10);
  const cards = document.querySelectorAll('#mansonry .card');

  cards.forEach((card, index) => {
    const colNumber = index % columnLength;
    const height = card.clientHeight;
    heights[colNumber] = heights[colNumber] ? heights[colNumber] + height : height;
  });

  const maxHeight = Math.max(...heights) + 100;
  ele.style.height = maxHeight + 'px';
}

window.addEventListener('DOMContentLoaded', (event) => {
  // MANSONRY
  const mansonry = document.querySelector('#mansonry');
  if (mansonry) {
    setHeightMansonry(mansonry);
  }
});