const URL = "https://teachablemachine.withgoogle.com/models/RsTNo8Rqa/";

const resultContainer = document.getElementById("result");
const startButton = document.getElementById("start-button");

let noCar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rqixlU9EuewzpdjB7HkYlG0uUJKZtnI3kg&usqp=CAU"

let sev23 = "https://cdn3.iconfinder.com/data/icons/online-and-web-filled-1/64/number_count_track_twenty_three-512.png"

let sev14 = "https://pro2-bar-s3-cdn-cf6.myportfolio.com/08664089978e60a61d69850b82f112b0/a9d4e99c-31db-406d-aa90-de855e8c20f6_rw_1200.gif?h=2f177b1d58c8882d9a7d769858cef638"

let normalImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHMskXkkfqnxFn8slrtQdsEOqknsxsMbAM6Q&usqp=CAU"

let img = document.getElementById("img");

startButton.addEventListener("click", () => {
  console.log("Button was clicked")
  startButton.innerHTML = "loading..."
  init();
})

const classes = {

}

async function createModel() {
  const checkpointURL = URL + "model.json"; // model topology
  const metadataURL = URL + "metadata.json"; // model metadata

  const recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL);

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();

  return recognizer;
}

async function init() {
  const recognizer = await createModel();
  const classLabels = recognizer.wordLabels(); // get class labels
  const labelContainer = document.getElementById("label-container");
  for (let i = 0; i < classLabels.length; i++) {
    labelContainer.appendChild(document.createElement("div"))
  }

  startButton.style.display = "none"

  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields
  recognizer.listen(result => {
    const scores = result.scores; // probability of prediction for each class
    // render the probability scores per class

    const maxScore = Math.max(...scores);
    const maxIndex = scores.indexOf(maxScore);
    resultContainer.classList.remove(...resultContainer.classList);
    classLabels[0] = "Normal"

    resultContainer.innerHTML = classLabels[maxIndex] + "(" + maxScore.toFixed(2) + ")"

    resultContainer.classList.add(classes[classLabels[maxIndex]]);

    for (let i = 0; i < classLabels.length; i++) {
      const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);

      let currentNode = labelContainer.childNodes[i]
      currentNode.innerHTML = classPrediction;
      currentNode.style.background = "transparent"
      console.log(classLabels[maxIndex])

      if (scores[i] === maxScore) {
        currentNode.style.background = "maroon"
      }
      if (classLabels[maxIndex] == 'Cannot find car') {
        img.src = noCar
      } else if (classLabels[maxIndex] === "Spark Plug 1, 4") {
        img.src = sev14
      } else if (classLabels[maxIndex] === 'Spark Plug 2, 3') {
        img.src = sev23
      } else {
        img.src = normalImg
      }
    }
  }, {
    includeSpectrogram: true, // in case listen should return result.spectrogram
    probabilityThreshold: 0.75,
    invokeCallbackOnNoiseAndUnknown: true,
    overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
  })
};

  // Stop the recognition in 5 seconds.
  // setTimeout(() => recognizer.stopListening(), 5000);