chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "rotate-90",
    title: "Rotate image 90°",
    contexts: ["image"]
  });

  chrome.contextMenus.create({
    id: "rotate-180",
    title: "Rotate image 180°",
    contexts: ["image"]
  });

  chrome.contextMenus.create({
    id: "rotate-270",
    title: "Rotate image 270°",
    contexts: ["image"]
  });

  chrome.contextMenus.create({
    id: "reset-image",
    title: "Reset image to original position",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const rotationMap = {
    "rotate-90": 90,
    "rotate-180": 180,
    "rotate-270": 270
  };

  if (info.menuItemId in rotationMap) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: rotateImageTo,
      args: [info.srcUrl, rotationMap[info.menuItemId]]
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

function rotateImageTo(imageUrl, degrees) {
  const imgs = document.querySelectorAll('img');
  for (const img of imgs) {
    if (img.src === imageUrl) {
      img.style.transform = `rotate(${degrees}deg)`;
      img.style.transition = "transform 0.3s";
      img.dataset.rotation = degrees;
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
