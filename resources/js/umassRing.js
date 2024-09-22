function initializeWebring() {
    try {
      const data = {"prev":{"id":"hampton","name":"Haylin Moore","url":"https://haylinmoore.com"},"member":{"id":"mari","name":"Mari Braun","url":"https://beemari.com"},"next":{"id":"rpil","name":"Roland Pilenyi","url":"https://rpil.dev"}};
      const { prev, next } = data;
  
      const mode = "link";
      switch (mode) {
        case "link":
          const webringPrev = document.getElementById("umaring_prev");
          const webringNext = document.getElementById("umaring_next");
  
          if (!webringPrev || !webringNext) {
            console.error(
              "UMass Amherst webring mode link requires elements #umaring_prev and #umaring_next.",
            );
            return;
          }
  
          fetch("https://umaring.mkr.cx/mari").then(res=>res.json()).then((ring)=>{
          const prev = ring.prev;
          const next = ring.next;
          document.getElementById("umaring_prev").href = prev.url;
          document.getElementById("umaring_prev").firstChild.textContent = prev.name;
          document.getElementById("umaring_next").href = next.url;
          document.getElementById("umaring_next").firstChild.textContent = next.name;
      })
          break;
        default:
          const webringContainer = document.getElementById("umaring");
  
          if (!webringContainer) {
            console.error("UMass Amherst webring container not found.");
            return;
          }
  
          webringContainer.innerHTML = `
            <a href="${prev.url}" id="umaring_prev">${prev.name}</a> <-
            <a href="https://github.com/umaring/umaring">UMass Ring</a> ->
            <a href="${next.url}" id="umaring_next">${next.name}</a>
          `;
          break;
      }
    } catch (error) {
      console.error("Error initializing UMass Amherst webring data:", error);
    }
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeWebring);
  } else {
    initializeWebring();
  }