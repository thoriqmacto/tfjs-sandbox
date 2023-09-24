const init = async () => {
  const passage =
    "Rosa Louise McCauley Parks (February 4, 1913 - October 24, 2005) was an American activist in the civil rights movevement best known for her pivotal role in the Montgomery bus boycott. The United States Congress has called her 'the first lady of civil rights' and 'the mother of the freedom movement'";
  const question1 = 'When was Rosa born?';
  const question2 = 'Who was Rosa?';
  const model = await qna.load();
  const answers = await model.findAnswers(question2, passage);
  console.log(answers);
};
init();
