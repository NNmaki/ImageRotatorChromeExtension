chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "rotate-image",
      title: "Rotate image 90°",
      contexts: ["image"]
    });
  
    chrome.contextMenus.create({
      id: "reset-image",
      title: "Reset image to original position",
      contexts: ["image"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "rotate-image") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: rotateImage,
        args: [info.srcUrl]
      });
    }
  
    if (info.menuItemId === "reset-image") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: resetImage,
        args: [info.srcUrl]
      });
    }
  });
  
  function rotateImage(imageUrl) {
    const imgs = document.querySelectorAll('img');
    for (const img of imgs) {
      if (img.src === imageUrl) {
        const currentRotation = img.dataset.rotation ? parseInt(img.dataset.rotation) : 0;
        const newRotation = (currentRotation + 90) % 360;
        img.style.transform = `rotate(${newRotation}deg)`;
        img.style.transition = "transform 0.3s";
        img.dataset.rotation = newRotation;
        break;
      }
    }
  }
  
  function resetImage(imageUrl) {
    const imgs = document.querySelectorAll('img');
    for (const img of imgs) {
      if (img.src === imageUrl) {
        img.style.transform = "";
        img.style.transition = "transform 0.3s";
        delete img.dataset.rotation;
        break;
      }
    }
  }
  