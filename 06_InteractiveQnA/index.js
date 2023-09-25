const engineers = {
  'Katherine Johnson': 'katherineJohnson',
  'Dorothy Vaughan': 'dorothyVaughan',
  'Mary Jackson': 'maryJackson',
};

let inputQuestion;
let model;

const loadModel = async () => await qna.load();

const init = async () => {
  model = await loadModel();
  const startButton = document.querySelector('.intro button');
  startButton.removeAttribute('disabled');
  startButton.innerHTML = 'Start';
  startButton.onclick = () => {
    document.getElementsByTagName('main')[0].style.display = 'block';
    document.getElementsByClassName('intro')[0].style.display = 'none';
  };

  const figureButtons = document.querySelectorAll('figure');
  const buttonArray = Array.from(figureButtons);
  let figureData;

  buttonArray.forEach((button) => {
    button.addEventListener('click', async (e) => {
      try {
        // Your asynchronous code here
        const result = await fetchJsonData(e);
        console.log('Button clicked, result:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });

  /* figureButtons.forEach((button) => {
    button.onclick = (e) => {
      const dataFile = engineers[e.target.textContent];
      const urlGen = window.location.href + dataFile.json;
      console.log('URL Generated: ', urlGen);
      fetch(urlGen)
        .then((response) => response.json())
        .then((data) => {
          document.getElementsByClassName('selection')[0].style.display =
            'none';
          figureData = data;
          const questionInput = document.getElementsByClassName('question')[0];
          const label = document.getElementsByTagName('label')[0];
          label.innerHTML = `What would you like to know about ${e.target.textContent}?`;
          questionInput.style.display = 'block';
        });
    };
  }); */

  const askButton = document.getElementsByClassName('ask')[0];
  askButton.onclick = async () => {
    inputQuestion = document.getElementsByTagName('input')[0].value;
    const answers = await model.findAnswers(inputQuestion, figureData);
    displayAnswer(answers);
    document.getElementsByTagName('input')[0].value = '';
  };
};

async function fetchJsonData(element) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Get data from JSON file
      const dataFile = engineers[element.target.textContent];
      const urlGen = window.location.href + dataFile.json;
      console.log('URL Generated: ', urlGen);
      if (urlGen.length > 0) {
        resolve(urlGen);
      } else {
        reject('Something went wrong');
      }
      /* fetch(urlGen)
        .then((response) => response.json())
        .then((data) => {
          document.getElementsByClassName('selection')[0].style.display =
            'none';
          figureData = data;
          const questionInput = document.getElementsByClassName('question')[0];
          const label = document.getElementsByTagName('label')[0];
          label.innerHTML = `What would you like to know about ${e.target.textContent}?`;
          questionInput.style.display = 'block';
        }); */
    }, 3000);
  });
}

const displayAnswer = (answers) => {
  const inputQuestionElement = document.querySelector(
    '.answer-block .input-question'
  );
  const paragrapElement = document.getElementsByClassName('answer')[0];
  if (!answers[0]) {
    inputQuestionElement.innerHTML = '';
    paragrapElement.innerHTML = `Mmmm I don't seem to have the answer to this question...`;
    return;
  }
  inputQuestionElement.innerHTML = `The answer to your question "${inputQuestion}" is:`;
  paragrapElement.innerHTML = `${answers[0].text}`;
  document.getElementsByClassName('answer-block')[0].style.display = 'block';
};

init();
