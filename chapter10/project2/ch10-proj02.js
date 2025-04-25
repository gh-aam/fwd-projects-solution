document.addEventListener("DOMContentLoaded", () => {
  const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
  
  /*
    To get a specific play, add play name via query string,
    e.g., url = url + '?name=hamlet';
    https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
    https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
  */
  
  /* note: you may get a CORS error if you test this locally (i.e., directly from a
    local file). To work correctly, this needs to be tested on a local web server.
    Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
    use built-in Live Preview.
  */
  
  const playList = document.querySelector('#playList');
  const actList = document.querySelector('#actList');
  const sceneList = document.querySelector('#sceneList');
  
  let currentActs = [];
  
  playList.addEventListener('change', async (e) => {
    const newUrl = url + `?name=${e.target.value}`;
    
    try {
      const response = await fetch(newUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
      const data = await response.json();
      
      actList.innerHTML = '';
      sceneList.innerHTML = '';
      currentActs = data.acts;
      
      if (Array.isArray(currentActs)) {
        let firstAct = true;
        
        currentActs.forEach(act => {
          const option = document.createElement('option');
          option.textContent = act.name;
          option.setAttribute('value', act.name);
          actList.appendChild(option);
          
          if (firstAct) {
            act.scenes.forEach(scene => {
              const option = document.createElement('option');
              option.textContent = scene.name;
              option.setAttribute('value', scene.name);
              sceneList.appendChild(option);
            });
            
            firstAct = false;
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
  
  actList.addEventListener('change', (e) => {
    const selectedActs = currentActs.find(act => act.name === e.target.value);
    
    sceneList.innerHTML = '';
    
    selectedActs.scenes.forEach(scene => {
      const option = document.createElement('option');
      option.textContent = scene.name;
      option.setAttribute('value', scene.name);
      sceneList.appendChild(option);
    });
  });
});