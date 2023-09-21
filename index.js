const webcamElement = document.getElementsByClassName('webcam')[0];
const buttons = document.getElementsByClassName('buttons');
const predictButton = document.getElementsByClassName('predict')[0];
const predictionParagraph = document.getElementById('prediction')[0];
const classes = ['up', 'down', 'left', 'right'];

async function app() {
  console.log('App Started...');
  const classifier = knnClassifier.create();
  const net = await mobilenet.load();
  const webcam = await tf.data.webcam(webcamElement);

  const addExample = async (classId) => {
    const img = await webcam.capture();
    const activation = net.infer(img, 'conv_preds');
    classifier.addExample(activation, classId);
    img.dispose();
  };

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i] !== predictButton) {
      let index = i;
      console.log("Recorded as: " + buttons.get,index);
      buttons[i].onclick = () => addExample(index);
    }
  }

  predictButton.onclick = () => runPredictions();

  async function runPredictions() {
    while (true) {
      if (classifier.getNumClasses() > 0) {
        const img = await webcam.capture();
        const activation = net.infer(img, 'conv_preds');
        const result = await classifier.predictClass(activation);

        // console.log(result);

        predictionParagraph.textContent = `
                prediction: ${classes[result.label]},
                probability: ${result.confidences[result.label]}`;
        img.dispose();
      }
      await tf.nextFrame();
    }
  }
}
app();
