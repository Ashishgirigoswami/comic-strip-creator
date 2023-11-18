# comic-strip-creator
This project is a web application that allows users to create and share a 10-panel comic strip by inputting text into a form. The text is then sent to a text-to-image API using a provided API key to generate comic images.

##Technologies Used
HTML
CSS (Bootstrap)
JavaScript
Features
Allows users to input text for each panel of the comic strip.
Generates a comic strip by submitting text inputs for each panel.
Utilizes a loading bar and spinner for visual feedback during image generation.
##File Structure
index.html: The main HTML file containing the structure of the web page.
styles.css: CSS file for styling the web page.
script.js: JavaScript file containing logic for handling form submissions and API integration.
placeholder.png: Placeholder image used until the comic images are generated.
README.md: This file, providing information about the project.
Usage
Open index.html in a web browser.
Enter text for each panel of the comic strip in the provided text areas.
Click the "Generate Comic" button to create the comic strip.
##How It Works
The web application uses JavaScript to handle form submissions for each panel.
Upon submitting the form for a panel, the text input is sent to a text-to-image API using an API key.
The loading bar and spinner provide visual feedback during the image generation process.
Once the images are generated, they replace the placeholder images in the respective panels.
Credits
Created by Ashish giri goswami
Text-to-image API provided by huggingface
