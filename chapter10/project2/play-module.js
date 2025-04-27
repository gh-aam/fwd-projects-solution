/* In this module, create three classes: Play, Act, and Scene. */

class Scene {
  constructor(scene) {
    this.scene = scene;
  }
  
  displaySpeeches(div1) {
    this.scene.speeches.forEach(speech => {
      const div2 = document.createElement('div');
      div2.setAttribute('class', 'speech');
      
      const span = document.createElement('span');
      span.textContent = speech.speaker;
      div2.appendChild(span);
      
      speech.lines.forEach(line => {
        const p3 = document.createElement('p');
        p3.textContent = line;
        div2.appendChild(p3);
      });
      
      if (speech.stagedir) {
        const em = document.createElement('em');
        em.textContent = speech.stagedir;
        div2.appendChild(em);
      }
      
      div1.appendChild(div2);
    });
  }
}

class Act extends Scene {
  constructor(playData, playHere, act, scene) {
    super(scene);
    this.playData = playData;
    this.playHere = playHere;
    this.act = act;
  }
  
  displayScene() {
    const h2 = document.createElement('h2');
    h2.textContent = this.playData.title;
    this.playHere.appendChild(h2);
    
    const article = document.createElement('article');
    article.setAttribute('id', 'actHere');
    
    const h3 = document.createElement('h3');
    h3.textContent = this.act.name;
    article.appendChild(h3);
    
    const div1 = document.createElement('div');
    div1.setAttribute('id', 'sceneHere');
    
    const h4 = document.createElement('h4');
    h4.textContent = this.scene.name;
    div1.appendChild(h4);
    
    const p1 = document.createElement('p');
    p1.setAttribute('class', 'title');
    p1.textContent = this.scene.title;
    div1.appendChild(p1);
    
    const p2 = document.createElement('p');
    p2.setAttribute('class', 'direction');
    p2.textContent = this.scene.stageDirection;
    div1.appendChild(p2);
    
    super.displaySpeeches(div1);
    
    article.appendChild(div1);
    this.playHere.appendChild(article);
  }
}

class Play extends Act {
  constructor(playData, playHere, act, scene) {
    super(playData, playHere, act, scene);
  }
  
  displayPlay() {
    super.displayScene();
  }
}

export { Play, Act, Scene };