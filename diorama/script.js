const cube = document.querySelector('.cube');
let isMouseDown = false;
let previousX = 0;
let previousY = 0;
let velocityX = 0;
let velocityY = 0;
let spinCount = 0;

function rotateCube() {
  if (!isMouseDown && (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01)) {
    velocityX *= 0.95;
    velocityY *= 0.95;

    cube.style.transform += `rotateX(${velocityY * -0.5}deg) rotateY(${velocityX * 0.5}deg)`;

    if (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1) {
      spinCount++;
    }

    requestAnimationFrame(rotateCube);
  }
  
  if (spinCount >= 100) {
    triggerCoolEvent();
  }
}

function triggerCoolEvent() {
  const image = document.createElement('img');
  image.src = 'masakr.png';
  image.style.position = 'fixed';
  image.style.top = '50%';
  image.style.left = '50%';
  image.style.transform = 'translate(-50%, -50%)';
  image.style.opacity = 0;
  image.style.width = '1000px';
  image.style.height = 'auto';
  

  document.body.appendChild(image);
  

  let flashCount = 0;
  function flashImage() {
    if (flashCount < 3) {
      image.style.opacity = 1;
      setTimeout(() => {
        image.style.opacity = 0;
        flashCount++;
        setTimeout(flashImage, 500);
      }, 500);
    } else {
      document.body.removeChild(image);
      
      spinCount = 0;
    }
  }
  
  flashImage();
}

document.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  previousX = event.clientX;
  previousY = event.clientY;
  velocityX = 0;
  velocityY = 0;

  event.preventDefault();
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;

  requestAnimationFrame(rotateCube);
});

document.addEventListener('mousemove', (event) => {
  if (isMouseDown) {
    const deltaX = event.clientX - previousX;
    const deltaY = event.clientY - previousY;

    previousX = event.clientX;
    previousY = event.clientY;

    velocityX = deltaX;
    velocityY = deltaY;

    cube.style.transform += `rotateX(${deltaY * -0.5}deg) rotateY(${deltaX * 0.5}deg)`;

    event.preventDefault();
  }
});

rotateCube();
