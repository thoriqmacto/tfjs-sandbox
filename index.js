var predictions = [];

async function app() {
  console.log('App Started...');

  var predictionContainer = document.getElementById('predictionsContainer');
  const webcamElement = document.getElementsByTagName('video')[0];
  const model = await mobilenet.load();

  const webcam = await tf.data.webcam(webcamElement);
  const captureButton = document.getElementsByTagName('button')[0];

  captureButton.onclick = async () => {
    const img = await webcam.capture();
    predictions = await model.classify(img);
    img.dispose();

    if (predictions.length > 0) {
      /* console.log(predictions);
      console.log('Total predictions:', predictions.length);

      predictions.forEach((element) => {
        console.log('Classname:', element.className);
        console.log('Probability:', element.probability);
      }); */

      // Clear inner HTML
      predictionContainer.innerHTML = '';

      // Create ordered list
      var orderedList = document.createElement('ol');

      // Loop through the array of predictions
      predictions.forEach((e) => {
        const probabilityInPercentage = (e.probability * 100).toFixed(2) + '%';
        var listItem = document.createElement('li');

        var predictTextBold = document.createElement('strong');
        predictTextBold.textContent = 'Predictions:';

        var probabilityTextBold = document.createElement('strong');
        probabilityTextBold.textContent = 'Probability:';

        listItem.appendChild(predictTextBold);
        listItem.appendChild(
          document.createTextNode(' ' + e.className + ' | ')
        );
        listItem.appendChild(probabilityTextBold);
        listItem.appendChild(
          document.createTextNode(' ' + probabilityInPercentage)
        );
        orderedList.appendChild(listItem);
      });
      predictionContainer.appendChild(orderedList);
    }
  };
}
app();
