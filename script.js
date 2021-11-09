const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Disabled/Enabled button
function toggleButton(){
    button.disabled = !button.disabled; //true /false
}

//Passing Joke to VoiceRss API
function tellMe(joke){
    console.log("tell me:" , joke);
    VoiceRSS.speech({
                key: '9f6465ab71b8461b94db44979609ad76',
                src: joke,
                hl: 'en-us',
                v: 'Linda',
                r: 0,
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
}



//Get joke from Joke api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //text-to-speech
    tellMe(joke);
    //Disabled button
    toggleButton();
  } catch (error) {
    console.log('error');
  }
}

//Event Listener
button.addEventListener('click' , getJokes);
audioElement.addEventListener('ended' , toggleButton)