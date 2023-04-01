function selected(element) {
    const selectedDiv = element.getAttribute("id");
    const parentDiv = element.parentNode;
  
    if (parentDiv.querySelector(".active") !== null) {
      const currentActiveDiv = parentDiv.querySelector(".active");
      if (currentActiveDiv.id !== selectedDiv) {
        currentActiveDiv.classList.remove("active");
        document.getElementById(selectedDiv).classList.add("active");
      } else {
        currentActiveDiv.classList.remove("active");
      }
    } else {
      document.getElementById(selectedDiv).classList.add("active");
    }
  }
console.log(selectedDiv);
console.log(parentDiv);
console.log(currentSelect);
console.log(parentId);