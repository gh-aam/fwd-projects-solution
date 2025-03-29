document.addEventListener("DOMContentLoaded", () => {
  // Set up API URL and loader element
  const url = "https://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";
  const loader = document.querySelector('#loader');
  let schemesData = []; // Will store the fetched color schemes data
  
  // Fetch data from the API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Hide loader once data is retrieved
      loader.style.display = 'none';
      // Save fetched schemes data for later use
      schemesData = data;
      // Display the color schemes on the page
      displayColorSchemes(data);
    })
    .catch(error => {
      // Hide loader if an error occurs and log the error
      loader.style.display = 'none';
      console.error('Error fetching data: ', error);
    });
  
  // Get the article element where schemes will be displayed
  const article = document.querySelector('.scheme-group');
  
  // Function to display the color schemes in the document
  function displayColorSchemes(data) {
    data.forEach(d => {
      // Create an h3 element for the scheme title
      const h3 = document.createElement('h3');
      h3.textContent = d.title;
      
      // Create a section element with a class of "scheme"
      const section = document.createElement('section');
      section.classList.add('scheme');
      
      // Create a div for the preview of colors
      const previewDiv = document.createElement('div');
      previewDiv.classList.add('preview');
      
      // Loop through each color in the scheme and create a box
      d.scheme.forEach(s => {
        const colorBoxDiv = document.createElement('div');
        colorBoxDiv.classList.add('color-box');
        // Set background color to the color's web value
        colorBoxDiv.style.backgroundColor = s.web;
        previewDiv.appendChild(colorBoxDiv);
      });
      
      // Create the actions div which contains the view button
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('actions');
      
      // Create the view button and set its data-id attribute
      const button = document.createElement('button');
      button.dataset.id = d.id;
      button.textContent = 'View';
      actionsDiv.appendChild(button);
      
      // Append preview and actions divs to the section
      section.appendChild(previewDiv);
      section.appendChild(actionsDiv);
      
      // Append the scheme title and section to the article element
      article.appendChild(h3);
      article.appendChild(section);
    });
  }
  
  // Set up event delegation on the article element to handle click events on the view buttons
  article.addEventListener('click', e => {
    // Check if the clicked element is a button
    if (e.target.matches('button')) {
      // Retrieve the scheme ID from button's dataset and convert to integer
      const schemeID = parseInt(e.target.dataset.id, 10);
      // Find the corresponding scheme object using Array.find()
      const selectedObject = schemesData.find(sc => sc.id === schemeID);
      
      // Get the aside's h2 element and update its text with the selected scheme title
      const asideHeading = document.querySelector('h2');
      asideHeading.textContent = selectedObject.title;
      
      // Get the fieldset element where scheme details will be displayed and clear its previous contents
      const fieldset = document.querySelector('fieldset');
      fieldset.innerHTML = '';
      
      // Loop through each color in the selected scheme to create and display its details
      selectedObject.scheme.forEach(obj => {
        // Create a div representing a row for each color detail
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('colorRow');
        
        // Create a div for the color box showing the color visually
        const boxDiv = document.createElement('div');
        boxDiv.classList.add('detailBox');
        boxDiv.style.backgroundColor = obj.web;
        rowDiv.appendChild(boxDiv);
        
        // Create a span element to display the web color value
        const span1 = document.createElement('span');
        span1.textContent = obj.web;
        rowDiv.appendChild(span1);
        
        // Create another span element to display the RGB color value
        const span2 = document.createElement('span');
        span2.textContent = `rgb(${obj.color.red}, ${obj.color.green}, ${obj.color.blue})`;
        rowDiv.appendChild(span2);
        
        // Create a label element to display the color name
        const label = document.createElement('label');
        label.textContent = obj.name;
        rowDiv.appendChild(label);
        
        // Append the constructed row to the fieldset
        fieldset.appendChild(rowDiv);
      });
    }
  });
});