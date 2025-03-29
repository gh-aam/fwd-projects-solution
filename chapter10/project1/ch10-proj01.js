document.addEventListener("DOMContentLoaded", () => {
  const url = "https://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";
  const loader = document.querySelector('#loader');
  let schemesData = [];
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';
      schemesData = data;
      displayColorSchemes(data);
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error('Error fetching data: ', error);
    });
  
  const article = document.querySelector('.scheme-group');
  
  function displayColorSchemes(data) {
    data.forEach(d => {
      const h3 = document.createElement('h3');
      h3.textContent = d.title;
      
      const section = document.createElement('section');
      section.classList.add('scheme');
      
      const previewDiv = document.createElement('div');
      previewDiv.classList.add('preview');
      
      d.scheme.forEach(s => {
        const colorBoxDiv = document.createElement('div');
        colorBoxDiv.classList.add('color-box');
        colorBoxDiv.style.backgroundColor = s.web;
        previewDiv.appendChild(colorBoxDiv);
      });
      
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('actions');
      
      const button = document.createElement('button');
      button.dataset.id = d.id;
      button.textContent = 'View';
      actionsDiv.appendChild(button);
      
      section.appendChild(previewDiv);
      section.appendChild(actionsDiv);
      
      article.appendChild(h3);
      article.appendChild(section);
    });
  }
  
  article.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const schemeID = parseInt(e.target.dataset.id, 10);
      const selectedObject = schemesData.find(sc => sc.id === schemeID);
      const asideHeading = document.querySelector('h2');
      asideHeading.textContent = selectedObject.title;
      
      const fieldset = document.querySelector('fieldset');
      fieldset.innerHTML = '';
      
      selectedObject.scheme.forEach(obj => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('colorRow');
        
        const boxDiv = document.createElement('div');
        boxDiv.classList.add('detailBox');
        boxDiv.style.backgroundColor = obj.web;
        rowDiv.appendChild(boxDiv);
        
        const span1 = document.createElement('span');
        span1.textContent = obj.web;
        rowDiv.appendChild(span1);
        
        const span2 = document.createElement('span');
        span2.textContent = `rgb(${obj.color.red}, ${obj.color.green}, ${obj.color.blue})`;
        rowDiv.appendChild(span2);
        
        const label = document.createElement('label');
        label.textContent = obj.name;
        rowDiv.appendChild(label);
        
        fieldset.appendChild(rowDiv);
      });
    }
  });
});