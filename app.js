class DrumKit {
    // constructor with no parameters
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play')
        this.currentKick = "sounds/kick-classic.wav";
        this.currentSnare = "sounds/snare-acoustic01.wav";
        this.currentHihat = "sounds/hihat-acoustic01.wav";
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute')
        this.tempoSlider = document.querySelector(".tempo-slider");
        this.bpm = 150;

        //grabbing the audios
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");

        //adding index for tracking the actual track
        this.index = 0;
    }
    activePad() {
        this.classList.toggle("active");
    }
    //adding a method called "repeat"
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // looping over the pads
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //Check if pads are Active and then play the sound
            if (bar.classList.contains("active")) {

                //Check each Sound
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;

                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    //
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });

        // incrementing this.index
        this.index++;
    }

    start() {
        const interval = (60 / this.bpm) * 1000;

        //check if it's Playing
        if (this.isPlaying) {
            //clearing the interval
            clearInterval(this.isPlaying);
            //setting it to null
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                // invoking the repeat method
                this.repeat();
            }, interval);
        }
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playBtn.innerHTML = "Stop";
            this.playBtn.classList.add("active");
        }
        else {
            this.playBtn.innerHTML = "Play";
            this.playBtn.classList.remove("active");
        }
    }

    changeSound(e) {
        const selectionName = e.target.name;
        //grabbing the value of the selected option
        const selectionValue = e.target.value;
        //updating the sound
        switch (selectionName) {
            case "kick-select":
                this.kickAudio.src = selectionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectionValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectionValue;
                break;
        }
    }

    mute(e) {
        const muteIndex = e.target.getAttribute("data-track");
        e.target.classList.toggle("active");
        if (e.target.classList.contains("active")) {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 0;
                    break;
                case "1":
                    this.snareAudio.volume = 0;
                    break;
                case "2":
                    this.hihatAudio.volume = 0;
                    break;
            }
        }
        else {
            switch (muteIndex) {
                case "0":
                    this.kickAudio.volume = 1;
                    break;
                case "1":
                    this.snareAudio.volume = 1;
                    break;
                case "2":
                    this.hihatAudio.volume = 1;
                    break;
            }
        }
    }
    changeTempo(e) {
        const tempoText = document.querySelector(".tempo-nr");
        //updating the tempo value
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;
    }
    updateTempo() {
        //clearing the Interval n setting it to NULL(Resetting)
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        //calling the start method
        const playBtn = document.querySelector(".play");
        /*if the play button is active then start function runs,
        if not active it won't start*/
        if (playBtn.classList.contains("active")) {
            this.start();
        }
    }
}

const drumKit = new DrumKit();

// Event Listeners
drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function () {
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click", function () {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function (e) {
        drumKit.changeSound(e);
    });
});

drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        //calling the mute method
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function (e) {
    //calling the changeTempo method
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function (e) {
    //calling the updateTempo method
    drumKit.updateTempo(e);
});

