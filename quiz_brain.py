class QuizBrain:

    def __init__(self, q_list):
        self.question_number = 0
        self.driver = 0
        self.expressive = 0
        self.amiable = 0
        self.analytical = 0
        self.question_list = q_list

    def still_has_questions(self):
        return self.question_number < len(self.question_list)

    def next_question(self):
        current_question = self.question_list[self.question_number]
        self.question_number += 1
        print(f"1. {current_question.driver}"
                f"\n2. {current_question.expressive}"
                f"\n3. {current_question.amiable}"
                f"\n4. {current_question.analytical}\n")
        user_answer = input()
        print("\n")
        self.check_answer(user_answer)

    def check_answer(self, user_answer):
        if user_answer == "1":
            self.driver += 1
        elif user_answer == "2":
            self.expressive += 1
        elif user_answer == "3":
            self.amiable += 1
        elif user_answer == "4":
            self.analytical += 1





