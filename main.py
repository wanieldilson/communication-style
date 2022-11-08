from question_model import Question
from data import communication_styles
from quiz_brain import QuizBrain

question_bank = []

for each in communication_styles:
    driver = each["driver"]
    expressive = each["expressive"]
    amiable = each["amiable"]
    analytical = each["analytical"]
    question = Question(driver, expressive, amiable, analytical)
    question_bank.append(question)


quiz = QuizBrain(question_bank)

print("Welcome to the communication styles quiz!\nFor each set of words enter the corresponding number that applies "
      "most to you")
while quiz.still_has_questions():
    quiz.next_question()

print("Well done! Quiz complete...")
print(f"Your final score was :\n"
      f"Driver: {round(quiz.driver / 24 * 100, 1)}%\n"
      f"Expressive: {round(quiz.expressive / 24 * 100, 1)}%\n"
      f"Amiable: {round(quiz.amiable / 24 * 100, 1)}%\n"
      f"Analytical: {round(quiz.analytical / 24 * 100, 1)}%")
