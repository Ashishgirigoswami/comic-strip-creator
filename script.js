
async function query(data) {
  console.log(data)
  const response = await fetch(
    'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud',
    {
      headers: {
        Accept: 'image/png',
        Authorization:
          'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  console.log(response)
  const result = await response.blob();
  return result;
}
function handleSubmit(panelId, event) {
  event.preventDefault();
  generateComic(panelId);
}
for (let i = 1; i <= 10; i++) {
  const comicForm = document.getElementById(`comicForm${i}`);
  // const submitBtn = comicForm.querySelector(`submit${i}`);
  console.log("hererererererere")
  comicForm.addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const formData = new FormData(comicForm);
    const panelsData = [];
    // console.log(formData)
    const panelText = formData.get(`panel${i}`);
    console.log(panelText)
    // panelsData.push(panelText);
    const loadingBar = document.getElementById(`loadingBar${i}`);
  
    try {
          // Simulate loading progress with a timeout (adjust as needed)
        // Display loading bar
        loadingBar.style.width = '0%';
        loadingBar.classList.remove('bg-danger'); // Reset color if previously failed
  
        // Simulate loading progress with a timeout (adjust as needed)
        const loadingInterval = setInterval(() => {
          loadingBar.style.width = `${parseInt(loadingBar.style.width) + 5}%`;
        }, 1000); // Adjust interval to your preference// Adjust interval to your preference
        console.log(panelText)
        const comicImages = await generateComic(i,panelText);
         // Clear loading bar after completion
      clearInterval(loadingInterval);
      loadingBar.style.width = '100%';
        displayComic(comicImages);
    } catch (error) {
        handleErrors(error);
    }
  });
}



async function generateComic(panelId,panelText) {
  const comicForm = document.getElementById(`comicForm${panelId}`);
  const formData = new FormData(comicForm);
  // const panelText = formData.get(`panel${panelId}`);
  const imageLoader = document.getElementById(`imageLoader${panelId}`);
  const comicImage = document.getElementById(`comicImage${panelId}`);
  console.log("herer",panelId,panelText)
  
  const comicImages = [];


  try {
      imageLoader.style.display = 'block'; // Show loading spinner
      
      comicImage.classList.add("loading");

      
      const imageData = await query({ inputs: panelText });
    
      comicImage.onload = function() {
        comicImage.classList.remove("loading");
      };

      // When there's an error in loading the image, handle it and remove loading class
      comicImage.onerror = function() {
        comicImage.classList.remove("loading");
      };
      imageLoader.style.display = 'none'; // Hide loading spinner
      comicImage.style.display = 'block'; // Show fetched image
      comicImage.src = URL.createObjectURL(imageData);
  } catch (error) {
      imageLoader.style.display = 'none'; // Hide loading spinner in case of error
      throw new Error('Failed to generate comic panel');
  }
  // }

  return comicImages;
}

function displayComic(comicImages) {
  // Display generated comic panels in the UI
  comicDisplay.innerHTML = '';
  

  comicImages.forEach((imageSrc, index) => {
    const panelDiv = document.createElement('div');
    panelDiv.classList.add('comicPanel');

    const image = document.createElement('img');
    image.src = imageSrc;
    image.alt = `Comic Panel ${index + 1}`;

    panelDiv.appendChild(image);
    comicDisplay.appendChild(panelDiv);
  });
}

function handleErrors(error) {
  // Handle and display errors in the UI
  console.error('Error:', error);
  loadingBar.classList.add('bg-danger'); // Change color to indicate failure
  // Show an error message to the user
}
