import Play from './play-module.js';

document.addEventListener("DOMContentLoaded", () => {
  const url = 'https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php';
  
  const playList = document.querySelector('#playList');
  const actList = document.querySelector('#actList');
  const sceneList = document.querySelector('#sceneList');
  const playHere = document.querySelector('#playHere');
  
  let playData = {};
  const playHereBackup = playHere.innerHTML;
  
  playList.addEventListener('change', async (e) => {
    const newUrl = url + `?name=${e.target.value}`;
    
    try {
      const response = await fetch(newUrl);
      const data = await response.json();
      
      actList.innerHTML = '';
      sceneList.innerHTML = '';
      playData = data;
      
      if (Array.isArray(data.acts)) {
        let firstAct = true;
        
        data.acts.forEach(act => {
          populateSelectList(act.name, actList);
          
          if (firstAct) {
            let firstScene = true;
            
            act.scenes.forEach(scene => {
              populateSelectList(scene.name, sceneList);
              
              if (firstScene) {
                const display = new Play(playData, playHere);
                display.displayPlay(act.name, scene.name);
                firstScene = false;
              }
            });
            
            firstAct = false;
          }
        });
      } else {
        playHere.innerHTML = playHereBackup;
      }
    } catch (error) {
      console.error(error);
    }
  });
  
  actList.addEventListener('change', (e) => {
    const selectedAct = playData.acts.find(act => act.name === e.target.value);
    let firstScene = true;
    
    sceneList.innerHTML = '';
    
    selectedAct.scenes.forEach(scene => {
      populateSelectList(scene.name, sceneList);
      
      if (firstScene) {
        const display = new Play(playData, playHere);
        display.displayPlay(selectedAct.name, scene.name);
        firstScene = false;
      }
    });
  });
  
  sceneList.addEventListener('change', (e) => {
    const selectedAct = playData.acts.find(act => act.name === actList.value);
    const selectedScene = selectedAct.scenes.find(scene => scene.name === e.target.value);
    const display = new Play(playData, playHere);
    display.displayPlay(selectedAct.name, selectedScene.name);
  });
  
  function populateSelectList(content, selectList) {
    const option = document.createElement('option');
    option.textContent = content;
    option.value = content;
    selectList.appendChild(option);
  }
});