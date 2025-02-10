// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Parse the JSON data stored in the 'content' variable
    const paintings = JSON.parse(content);
    
    // Loop through each painting to create thumbnail images
    for (let painting of paintings) {
        // Create an image element for the thumbnail
        const img = document.createElement('img');
        // Set the image source to the small version of the painting
        img.src = `images/small/${painting.id}.jpg`;
        // Store the painting's id in a data attribute for later use
        img.dataset.id = painting.id;
        
        // Create a list item to hold the image
        const li = document.createElement('li');
        li.appendChild(img);
        // Append the list item to the existing <ul> element in the document
        document.querySelector('ul').appendChild(li);
    }
    
    // Add an event listener to the <ul> element using event delegation
    document.querySelector('ul').addEventListener('click', (e) => {
        // Check if the clicked element is an image
        if (e.target && e.target.nodeName === 'IMG') {
            // Select the <figure> element where the large image and feature overlays will be displayed
            const figure = document.querySelector('figure');
            // Clear any previous content in the <figure>
            figure.innerHTML = '';
            
            // Loop through the paintings array to find the selected painting
            for (let painting of paintings) {
                if (painting.id == e.target.dataset.id) {
                    // Create a large image element for the selected painting
                    const largeImg = document.createElement('img');
                    largeImg.src = `images/large/${painting.id}.jpg`;
                    // Assign an id to the large image for CSS styling
                    largeImg.id = 'full';
                    // Append the large image to the <figure>
                    figure.appendChild(largeImg);
                    
                    // Update the title and artist information on the page
                    document.querySelector('h2').textContent = painting.title;
                    document.querySelector('h3').textContent = painting.artist;
                    
                    // Loop through each feature in the selected painting to create overlay rectangles
                    for (let feature of painting.features) {
                        // Create a <div> element to represent the feature's rectangle
                        const rectangle = document.createElement('div');
                        // Add the 'box' class for styling
                        rectangle.classList.add('box');
                        // Set the rectangle's position to absolute so it overlays correctly
                        rectangle.style.position = 'absolute';
                        // Set the left and top positions based on the feature's upper-left coordinates
                        rectangle.style.left = `${feature.upperLeft[0]}px`;
                        rectangle.style.top = `${feature.upperLeft[1]}px`;
                        // Calculate and set the width and height using the difference between lower-right and upper-left coordinates
                        rectangle.style.width = `${feature.lowerRight[0] - feature.upperLeft[0]}px`;
                        rectangle.style.height = `${feature.lowerRight[1] - feature.upperLeft[1]}px`;
                        
                        // When the mouse is over the rectangle, display the feature's description
                        rectangle.addEventListener('mouseover', () => {
                            document.querySelector('#description').textContent = feature.description;
                        });
                        
                        // When the mouse leaves the rectangle, clear the description
                        rectangle.addEventListener('mouseout', () => {
                            document.querySelector('#description').textContent = '';
                        });
                        
                        // Append the rectangle to the <figure> element
                        figure.appendChild(rectangle);
                    }
                    
                    // Once the matching painting is found and processed, exit the loop
                    break;
                }
            }
        }
    });
});