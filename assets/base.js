document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    const elements = document.querySelectorAll(".outer_div");
    const items = document.querySelectorAll(".Afterbefore_section .inner_block.column_width_3");
    const parent = document.querySelector(".before-after-container");
    
    items.forEach((item) => {
      item.style.minWidth = "100%";
    });

    elements.forEach((element) => {
      element.style.display = "flex";
      element.style.overflow = "hidden";
      element.style.gap = "2rem";
      element.style.scrollbarWidth = "none"; 
      element.style.msOverflowStyle = "none";
      element.classList.add("hide-scrollbar");

      // Create a custom scroll bar
      const scrollBar = document.createElement("input");
      scrollBar.type = "range";
      scrollBar.className = "custom-scrollbar";
      scrollBar.min = 0;
      scrollBar.max = items.length - 1;
      scrollBar.value = 0;
      scrollBar.step = 1;

      // Add event listener to update scroll position
      scrollBar.addEventListener("input", function () {
        const itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(element).gap);
        element.scrollTo({
          left: itemWidth * parseInt(scrollBar.value),
          behavior: "smooth",
        });
      });

      // Append the scroll bar below the container
      parent.appendChild(scrollBar);
    });
  }


window.onload = function () {
  setTimeout(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `.amazon-pay-button { background-color: #953F2F !important; color: #fbeeda !important; }`;
    document.head.appendChild(styleTag);
  }, 4000); // 2000 milliseconds = 2 seconds
};

});

// Add CSS for the custom scroll bar
const style = document.createElement("style");
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .custom-scrollbar {
    width: 100%;
    margin-top: 1rem;
    appearance: none;
    height: 4px;
    background: #e0e0e0;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }

  .custom-scrollbar::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #333;
    border-radius: 50%;
    cursor: pointer;
  }

  .custom-scrollbar::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #333;
    border-radius: 50%;
    cursor: pointer;
  }
`;
document.head.appendChild(style);
