document.addEventListener('DOMContentLoaded', () => {
    const symbolPlay = '&#9654;';
    const symbolPause = '&#10074;&#10074;';
    const files = ['Nature-8399', 'River-655', 'Waterfall-941', 'Wave-2737'];
    const aside = document.querySelector('aside');
    const video = document.getElementById('vidPlayer');
    const playButton = document.getElementById('play');
    const progressFilled = document.getElementById('progressFilled');
    
    // Video thumbnails and click event
    for (let file of files) {
        const img = document.createElement('img');
        img.src = `images/${file}.jpg`;
        img.alt = file;
        aside.appendChild(img);
        
        img.addEventListener('click', () => {
            video.pause();
            
            const source = video.querySelector('source');
            source.src = `videos/${file}.mp4`;
            video.load();
            
            playButton.innerHTML = symbolPlay;
            progressFilled.style.flexBasis = '0%';
        });
    }
    
    // Video stop button functionality
    const stopButton = document.getElementById('stop');
    stopButton.addEventListener('click', () => {
        video.pause();
        video.currentTime = 0;
        playButton.innerHTML = symbolPlay;
        progressFilled.style.flexBasis = '0%';
    });
    
    // Video play button functionality
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.innerHTML = symbolPause; // Update to pause symbol when playing
            
            video.addEventListener('ended', () => {
                playButton.innerHTML = symbolPlay;
            });
        } else {
            video.pause();
            playButton.innerHTML = symbolPlay;  // Update to play symbol when paused
        }
    });
    
    // Video skip buttons
    const skipButtons = document.querySelectorAll('button[data-skip]');
    for (let button of skipButtons) {
        button.addEventListener('click', () => {
            const skipTime = parseFloat(button.dataset.skip);
            video.currentTime += skipTime;
        });
    }
    
    // Update progress bar during playback
    video.addEventListener('timeupdate', () => {
        const progressPercent = (video.currentTime / video.duration) * 100;
        progressFilled.style.flexBasis = `${progressPercent}%`;
    });
    
    // Allow user to click on the progress bar to seek
    const progress = document.getElementById('progress');
    progress.addEventListener('click', (e) => {
        const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = newTime;
    });
    
    // Video volume controller
    const volumeControl = document.getElementById('volume');
    volumeControl.addEventListener('input', () => {
        video.volume = volumeControl.value;
    });
});