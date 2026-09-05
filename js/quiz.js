/* =====================================================
   QuizLearn
   Quiz Engine
===================================================== */

class QuizEngine {

    constructor() {

        // -------------------------
        // Δεδομένα Quiz
        // -------------------------

        this.questions = [];

        this.currentQuestion = 0;

        this.score = 0;

        this.selectedAnswer = null;

        this.userAnswers = [];
		
		this.answeredQuestions = 0;
		
		this.correctAnswers = [];

		this.wrongAnswers = [];
		
		this.skippedQuestions = [];
		
		this.reviewWrongAnswers = [];

		this.reviewSkippedQuestions = [];
		
		this.originalQuestions = [];

        this.finished = false;

        const settings = Storage.getSettings();

		this.shuffleQuestions =
			settings.shuffleQuestions ?? true;

		this.shuffleAnswers =
			settings.shuffleAnswers ?? false;
		
		/* ==========================================
		   Quiz Modes
		========================================== */
		
		this.homeLinks =
			document.querySelectorAll(".homeLink");
		
		this.quizMode = "study";

		this.EXAM_QUESTION_COUNT =
			settings.examQuestionCount ?? 48;

		this.EXAM_REQUIRED_ANSWERS =
			settings.examRequiredAnswers ?? 42;

		this.EXAM_MAX_SKIPS =
			this.EXAM_QUESTION_COUNT -
			this.EXAM_REQUIRED_ANSWERS;
				
		this.answerLocked = false;
		
		/* ==========================================
		   Timer
		========================================== */

		this.elapsedSeconds = 0;

		this.timerInterval = null;
		

        // -------------------------
        // DOM
        // -------------------------
		
		this.questionElement =
			document.getElementById("questionText");
								
        this.answersElement =
            document.getElementById("answers");

        this.nextButton =
            document.getElementById("nextBtn");
			
		this.skipButton =
			document.getElementById("skipBtn");

        this.prevButton =
            document.getElementById("prevBtn");

        this.restartButton =
			document.getElementById("restartBtn");

		this.reviewButton =
			document.getElementById("reviewBtn");

		this.favoriteButton =
			document.getElementById("favoriteBtn");
    }

    /* ==========================================
       Αρχικοποίηση
    ========================================== */

    init() {

        console.log("Quiz Engine started");

        this.loadQuestions();

        this.attachEvents();

		if (this.favoriteButton) {

			this.favoriteButton.addEventListener(
				"click",
				() => this.toggleFavorite()
			);

		}

        this.renderQuestion();

        this.updateProgress();

        this.updateScore();
		
		UI.updateScreenTitle(this.quizMode);
    }

    /* ==========================================
       Φόρτωση ερωτήσεων
    ========================================== */

	loadQuestions() {

		if (typeof QUESTIONS !== "undefined") {

			this.questions = [...QUESTIONS];

		}
		else if (window.QUESTIONS) {

			this.questions = [...window.QUESTIONS];

		}
		else {

			console.error("Δεν βρέθηκαν ερωτήσεις.");

			return;

		}

		this.questions = this.questions.filter(Boolean);
		
		this.originalQuestions = [...this.questions];

		if (this.shuffleQuestions) {

			this.shuffle(this.questions);

		}

		console.log(
			"Questions:",
			this.questions.length
		);
	}

    /* ==========================================
       Σύνδεση κουμπιών
    ========================================== */

    attachEvents() {

        this.homeLinks.forEach(link => {

			link.addEventListener("click", () => {

				const ok = UI.confirm(
					"Θέλετε να επιστρέψετε στην Αρχική;"
				);

				if (!ok) return;

				UI.showDashboard();

			});

		});
		
		if (this.nextButton) {

            this.nextButton.addEventListener("click", () => {

                this.nextQuestion();

            });

        }

        if (this.prevButton) {

            this.prevButton.addEventListener("click", () => {

                this.previousQuestion();

            });

        }

        if (this.restartButton) {

            this.restartButton.addEventListener("click", () => {

                this.restartQuiz();

            });

        }
		
		if (this.reviewButton) {

			this.reviewButton.addEventListener("click", () => {

				this.startReview();

			});

		}
		
		if (UI.hintButton) {

			UI.hintButton.addEventListener("click", () => {

				this.showHint();

			});

		}
		
		if (this.skipButton) {

			this.skipButton.addEventListener("click", () => {

				this.skipQuestion();

			});

		}
    }

    /* ==========================================
       Fisher-Yates Shuffle
    ========================================== */

    shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(
                Math.random() * (i + 1)
            );

            [array[i], array[j]] =
                [array[j], array[i]];

        }
    }
	
	/* ==========================================
	   Sounds
	========================================== */

	playSound(type) {

		const settings =
			Storage.getSettings();

		if (!settings.sounds) return;

		const AudioContext =
			window.AudioContext ||
			window.webkitAudioContext;

		if (!AudioContext) return;

		const audioContext =
			new AudioContext();

		const oscillator =
			audioContext.createOscillator();

		const gain =
			audioContext.createGain();

		oscillator.connect(gain);
		gain.connect(audioContext.destination);

		let duration;

		if (type === "correct") {

			oscillator.frequency.value = 700;
			duration = 0.7;

		}
		else if (type === "wrong") {

			oscillator.frequency.value = 220;
			duration = 0.8;

		}
		else {

			audioContext.close();
			return;

		}

		gain.gain.setValueAtTime(
			0.9,
			audioContext.currentTime
		);

		gain.gain.exponentialRampToValueAtTime(
			0.001,
			audioContext.currentTime + duration
		);

		oscillator.start();

		oscillator.stop(
			audioContext.currentTime + duration
		);

		oscillator.onended = () => {
			audioContext.close();
		};
	}
	
	updateFavoriteButton() {

		if (!this.favoriteButton) return;

		const question =
			this.questions[this.currentQuestion];

		if (!question) return;

		if (Storage.isFavorite(question.id)) {

			this.favoriteButton.textContent = "⭐";
			this.favoriteButton.classList.add("active");

		}
		else {

			this.favoriteButton.textContent = "☆";
			this.favoriteButton.classList.remove("active");

		}
	}

	toggleFavorite() {

		const question =
			this.questions[this.currentQuestion];

		if (!question) return;

		const isFavorite =
			Storage.toggleFavorite(question.id);

		this.updateFavoriteButton();

		console.log(
			isFavorite
				? "⭐ Προστέθηκε στα αγαπημένα"
				: "☆ Αφαιρέθηκε από τα αγαπημένα"
		);
	}

    /* ==========================================
       Εμφάνιση ερώτησης
    ========================================== */

	renderQuestion() {
		
		// ------------------------------------------
		// Previous / Next FIX
		// Ελέγχουμε αν η ερώτηση έχει ήδη απαντηθεί
		// ------------------------------------------

		const savedAnswer =
			this.userAnswers[this.currentQuestion];

		this.answerLocked =
			savedAnswer !== undefined;

		this.selectedAnswer =
			savedAnswer !== undefined
				? savedAnswer
				: null;
		
		if (
			this.currentQuestion > 0 &&
			this.questionElement
		) {

			this.questionElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}

		if (this.questions.length === 0) return;

		const q =
			this.questions[this.currentQuestion];

		if (!q) return;
		
		const categoryElement =
			document.getElementById("questionCategory");

		if (categoryElement) {
			categoryElement.textContent =
				`📘 ${q.category ?? "ΤΠΕ"}`;
		}
		
		if (
			!this.questionElement ||
			!this.answersElement
		) {

			console.error(
				"Δεν βρέθηκαν τα στοιχεία question ή answers."
			);

			return;
		}

		this.questionElement.textContent =
			q.question;

		this.answersElement.innerHTML = "";

		UI.hideHint();

		UI.hideFeedback();
		
		if (UI.hintButton) {

			UI.hintButton.textContent =
				"💡 Εμφάνιση υπόδειξης";

		}

		// Δημιουργία αντιγράφου των απαντήσεων

		let answers = [...q.answers];

		if (this.shuffleAnswers) {

			answers = answers
				.map((answer, index) => ({
					answer,
					index
				}))
				.sort(() => Math.random() - 0.5);

		}
		else {

			answers = answers.map(
				(answer, index) => ({
					answer,
					index
				})
			);

		}

		answers.forEach(item => {

			const btn =
				document.createElement("button");

			btn.className = "answer-btn";

			btn.textContent = item.answer;

			btn.dataset.index = item.index;

			btn.addEventListener(
				"click",
				() => {

					this.selectAnswer(
						item.index,
						btn
					);

				}
			);

			this.answersElement.appendChild(btn);

		});

		// Απόδοση μαθηματικών τύπων
		UI.renderMath(this.questionElement);
		UI.renderMath(this.answersElement);


		// ------------------------------------------
		// Previous / Next FIX
		// Επαναφορά ήδη απαντημένης ερώτησης
		// χωρίς νέα βαθμολόγηση
		// ------------------------------------------

		if (savedAnswer !== undefined) {

			const buttons =
				this.answersElement.querySelectorAll(
					".answer-btn"
				);

			buttons.forEach(btn => {

				const index =
					Number(btn.dataset.index);

				btn.disabled = true;

				// Η επιλογή που είχε κάνει ο χρήστης

				if (index === savedAnswer) {

					btn.classList.add("selected");

				}

				// Η σωστή απάντηση

				if (index === q.correct) {

					btn.classList.add("correct");

				}

				// Αν η επιλογή του χρήστη ήταν λάθος

				if (
					index === savedAnswer &&
					savedAnswer !== q.correct
				) {

					btn.classList.add("wrong");

				}

			});

			this.showExplanation();

		}

		this.updateFavoriteButton();
	}


	selectAnswer(index, button) {

		if (this.answerLocked) return;

		this.selectedAnswer = index;

		const buttons =
			this.answersElement.querySelectorAll(
				".answer-btn"
			);

		buttons.forEach(btn => {

			btn.classList.remove("selected");

		});

		button.classList.add("selected");
	}


	checkAnswer() {
		
		this.answerLocked = true;

		const q =
			this.questions[this.currentQuestion];
		
		// Αν είχε παραλειφθεί και τώρα απαντήθηκε,
		// αφαιρείται από τις παραλείψεις.

		this.skippedQuestions =
			this.skippedQuestions.filter(
				id => id !== q.id
			);

		const buttons =
			this.answersElement.querySelectorAll(
				".answer-btn"
			);

		buttons.forEach(btn => {

			btn.disabled = true;

			const i =
				Number(btn.dataset.index);

			if (i === q.correct) {

				btn.classList.add("correct");

			}

		});

		if (this.selectedAnswer === q.correct) {

			this.score++;
			
			this.playSound("correct");

			// Αν ήταν στις λάθος, αφαιρείται.

			this.wrongAnswers =
				this.wrongAnswers.filter(
					id => id !== q.id
				);

			if (
				!this.correctAnswers.includes(q.id)
			) {

				this.correctAnswers.push(q.id);

			}

		}
		else {

			this.playSound("wrong");
			
			// Αν ήταν στις σωστές, αφαιρείται.

			this.correctAnswers =
				this.correctAnswers.filter(
					id => id !== q.id
				);

			if (
				!this.wrongAnswers.includes(q.id)
			) {

				this.wrongAnswers.push(q.id);

			}

			buttons.forEach(btn => {

				const i =
					Number(btn.dataset.index);

				if (i === this.selectedAnswer) {

					btn.classList.add("wrong");

				}

			});

		}

		this.updateScore();

		if (this.quizMode === "exam") {

			UI.updateExamCounters(
				this.answeredQuestions,
				this.skippedQuestions.length
			);
			
			UI.updateExamButtons(
				this.answeredQuestions,
				this.skippedQuestions.length
			);

		}

		this.showExplanation();
	}
	
	
	showHint() {

		const q =
			this.questions[this.currentQuestion];

		if (!q) return;

		if (
			!UI.hintBox.classList.contains("hidden")
		) {

			UI.hideHint();

			UI.hintButton.textContent =
				"💡 Εμφάνιση υπόδειξης";

			return;

		}

		UI.showHint(
			q.hint ?? ""
		);

		UI.hintButton.textContent =
			"🙈 Απόκρυψη υπόδειξης";
	}


	showExplanation() {

		const q =
			this.questions[this.currentQuestion];

		if (!q) return;

		UI.showFeedback(
			q.explanation ?? ""
		);
	}
	
	
    /* ==========================================
       Επόμενη ερώτηση
       Previous / Next FIX
    ========================================== */

    nextQuestion() {
		
		if (this.finished) return;

		if (this.selectedAnswer === null) {

			UI.alert(
				"Επίλεξε μία απάντηση."
			);

			return;
		}


		// ------------------------------------------
		// Ελέγχουμε αν η συγκεκριμένη ερώτηση
		// έχει ήδη βαθμολογηθεί.
		// ------------------------------------------

		const alreadyAnswered =
			this.userAnswers[
				this.currentQuestion
			] !== undefined;


		// ------------------------------------------
		// Βαθμολογούμε ΜΟΝΟ την πρώτη φορά.
		// ------------------------------------------

		if (!alreadyAnswered) {

			this.answeredQuestions++;

			this.userAnswers[
				this.currentQuestion
			] = this.selectedAnswer;

			this.checkAnswer();

		}


		// ------------------------------------------
		// Αν επιστρέψαμε με Previous σε ήδη
		// απαντημένη ερώτηση, προχωράμε αμέσως.
		//
		// Αν είναι νέα απάντηση, κρατάμε το
		// υπάρχον feedback delay των 1200 ms.
		// ------------------------------------------

		const nextDelay =
			alreadyAnswered ? 0 : 1200;


		setTimeout(() => {

			this.selectedAnswer = null;

			if (
				this.currentQuestion <
				this.questions.length - 1
			) {

				this.currentQuestion++;

				this.renderQuestion();

				this.updateProgress();

			}
			else {

			if (this.quizMode === "exam") {

				this.submitExam();

			}
			else {

				this.finishQuiz();

			}

		}
			
		}, nextDelay);
	}


	skipQuestion() {

		if (this.finished) return;

		const question =
			this.questions[this.currentQuestion];

		if (!question) return;

		// ==========================================
		// Δεν επιτρέπεται Skip σε ήδη
		// απαντημένη ερώτηση
		// ==========================================

		const alreadyAnswered =
			this.userAnswers[
				this.currentQuestion
			] !== undefined;

		if (alreadyAnswered) {

			UI.toast(
				"Η ερώτηση έχει ήδη απαντηθεί."
			);

			return;
		}
	

		// ==========================================
		// EXAM MODE
		// Έλεγχος μέγιστου αριθμού παραλείψεων
		// σύμφωνα με τις ρυθμίσεις εξέτασης.
		// ==========================================

		if (this.quizMode === "exam") {

			const alreadySkipped =
				this.skippedQuestions.includes(
					question.id
				);

			if (
				!alreadySkipped &&
				this.skippedQuestions.length >=
					this.EXAM_MAX_SKIPS
			) {

				UI.toast(
					`Έχετε ήδη παραλείψει ${this.EXAM_MAX_SKIPS} ερωτήσεις. Πρέπει να απαντήσετε σε αυτή την ερώτηση.`
				);

				return;
			}
		}


		// ==========================================
		// Καταχώριση παράλειψης
		// ==========================================

		if (
			!this.skippedQuestions.includes(
				question.id
			)
		) {

			this.skippedQuestions.push(
				question.id
			);
		}


		// ==========================================
		// Ενημέρωση Exam counters
		// ==========================================

		if (this.quizMode === "exam") {

			UI.updateExamCounters(
				this.answeredQuestions,
				this.skippedQuestions.length
			);

			UI.updateExamButtons(
				this.answeredQuestions,
				this.skippedQuestions.length
			);
		}


		// ==========================================
		// Τελευταία ερώτηση
		// ==========================================

		if (
			this.currentQuestion >=
			this.questions.length - 1
		) {

			if (this.quizMode === "exam") {

				this.submitExam();

			}
			else {

				this.finishQuiz();

			}

			return;
		}


		// ==========================================
		// Επόμενη ερώτηση
		// ==========================================

		this.currentQuestion++;

		this.renderQuestion();

		this.updateProgress();
	}
 
    /* ==========================================
       Προηγούμενη ερώτηση
       Previous / Next FIX
    ========================================== */

	previousQuestion() {

		if (this.currentQuestion <= 0) {

			return;

		}

		this.currentQuestion--;


		// ------------------------------------------
		// Η renderQuestion() αναλαμβάνει πλέον:
		//
		// 1. Να βρει αν υπάρχει αποθηκευμένη
		//    απάντηση.
		//
		// 2. Να εμφανίσει την προηγούμενη επιλογή.
		//
		// 3. Να εμφανίσει σωστό / λάθος.
		//
		// 4. Να κλειδώσει μόνο τις ήδη
		//    απαντημένες ερωτήσεις.
		//
		// 5. Να αφήσει ενεργές τις παραλειφθείσες
		//    ή αναπάντητες ερωτήσεις.
		// ------------------------------------------

		this.renderQuestion();

		this.updateProgress();
	}


	updateProgress() {

		const current =
			this.currentQuestion + 1;

		const total =
			this.questions.length;

		UI.updateProgress(
			current,
			total
		);

		UI.updateNextButton(
			current,
			total
		);
	}


	updateScore() {

		UI.updateScore(
			this.score,
			this.questions.length
		);
	}
	

	/* ==========================================
	   Timer
	========================================== */

	startTimer() {

		clearInterval(
			this.timerInterval
		);

		const settings =
			Storage.getSettings();

		if (!settings.timer) {

			this.elapsedSeconds = 0;

			if (UI.timer) {
				UI.timer.textContent = "⏱ --:--";
			}

			return;
		}


		this.elapsedSeconds = 0;

		this.timerInterval =
			setInterval(() => {

				this.elapsedSeconds++;

				const minutes =
					String(
						Math.floor(
							this.elapsedSeconds / 60
						)
					).padStart(2, "0");

				const seconds =
					String(
						this.elapsedSeconds % 60
					).padStart(2, "0");

				if (UI.timer) {

					UI.timer.textContent =
						`⏱ ${minutes}:${seconds}`;

				}

			}, 1000);
	}


	finishQuiz() {

		this.finished = true;
		
		clearInterval(
			this.timerInterval
		);

		const total =
			this.questions.length;
			
		const wrong =
			this.wrongAnswers.length;
		
		const skipped =
			this.skippedQuestions.length;

		const percent =
			total > 0
				? Math.round(
					(this.score / total) * 100
				)
				: 0;

		const minutes =
			String(
				Math.floor(
					this.elapsedSeconds / 60
				)
			).padStart(2, "0");

		const seconds =
			String(
				this.elapsedSeconds % 60
			).padStart(2, "0");

		const elapsedTime =
			`${minutes}:${seconds}`;
			
		UI.showQuizResult(
			this.score,
			total,
			percent,
			elapsedTime,
			wrong,
			skipped
		);
		
		Storage.setLastScore(
			this.score
		);

		Storage.setLastTotal(
			total
		);

		Storage.increaseAttempts();
		
		Storage.increaseCorrect(
			this.correctAnswers.length
		);

		Storage.increaseWrong(
			this.wrongAnswers.length
		);

		if (
			this.score >
			Storage.getBestScore()
		) {

			Storage.setBestScore(
				this.score
			);

		}

		if (
			percent >
			Storage.getBestPercent()
		) {

			Storage.setBestPercent(
				percent
			);

		}

		if (
			typeof updateDashboard ===
			"function"
		) {

			updateDashboard();

		}
	}

	
	/* ==========================================
		Submit Exam
	========================================== */

	submitExam() {

		if (this.finished) return;


		// ------------------------------------------
		// Έλεγχος ελάχιστου αριθμού απαντήσεων
		// ------------------------------------------

		if (
			this.answeredQuestions <
			this.EXAM_REQUIRED_ANSWERS
		) {

			UI.toast(
				`Πρέπει να απαντήσετε σε τουλάχιστον ${this.EXAM_REQUIRED_ANSWERS} ερωτήσεις πριν υποβάλετε την εξέταση.`
			);

			return;
		}


		// ------------------------------------------
		// Στοιχεία εξέτασης
		// ------------------------------------------

		const answered =
			this.answeredQuestions;

		const skipped =
			this.skippedQuestions.length;
			


		// ------------------------------------------
		// Επιβεβαίωση υποβολής
		// ------------------------------------------

		const ok = UI.confirm(
			`Έχετε απαντήσει σε ${answered} από τις ${this.EXAM_QUESTION_COUNT} ερωτήσεις.\n` +
			`Παραλείψεις: ${skipped}.\n\n` +
			`Θέλετε να υποβάλετε την εξέταση;`
		);

		if (!ok) {

			return;

		}


		// ------------------------------------------
		// Οριστική υποβολή
		// ------------------------------------------

		this.finishQuiz();
	}


	/* ==========================================
	   Reset Quiz State
	========================================== */

	resetQuizState() {

		this.currentQuestion = 0;

		this.score = 0;

		this.userAnswers = [];

		this.answeredQuestions = 0;

		this.correctAnswers = [];

		this.wrongAnswers = [];

		this.skippedQuestions = [];

		this.selectedAnswer = null;

		this.finished = false;

		this.answerLocked = false;
	}
	
	
	restartQuiz() {

		UI.hideResult();

		const settings =
			Storage.getSettings();

		this.shuffleQuestions =
			settings.shuffleQuestions ?? true;

		this.shuffleAnswers =
			settings.shuffleAnswers ?? false;

		this.resetQuizState();
		
		UI.showQuiz();
				
		this.quizMode = "study";
		
		UI.updateScreenTitle(
			this.quizMode
		);
		
		this.startTimer();

		// Επαναφορά όλων των ερωτήσεων

		this.questions =
			[...this.originalQuestions];

		if (this.shuffleQuestions) {

			this.shuffle(
				this.questions
			);

		}

		this.renderQuestion();

		this.updateProgress();

		this.updateScore();
	}


	startReview() {

		// IDs ερωτήσεων για επανάληψη

		const reviewIds = [
			...this.wrongAnswers,
			...this.skippedQuestions
		];
		
		// Αποθήκευση ιστορικού εξέτασης

		this.reviewWrongAnswers =
			[...this.wrongAnswers];

		this.reviewSkippedQuestions =
			[...this.skippedQuestions];
		
		// Νέες λίστες για το Review Quiz

		this.wrongAnswers = [];

		this.skippedQuestions = [];

		if (reviewIds.length === 0) {

			UI.alert(
				"Δεν υπάρχουν λάθος ή παραλειφθείσες ερωτήσεις."
			);

			return;

		}

		// Νέο Quiz μόνο με αυτές τις ερωτήσεις

		this.questions =
			reviewIds
				.map(
					id =>
						this.originalQuestions.find(
							q => q.id === id
						)
				)
				.filter(Boolean);

		
		this.quizMode = "review";
		
		this.resetQuizState();

		UI.hideResult();

		UI.showQuiz();

		UI.updateScreenTitle(
			this.quizMode
		);

		this.startTimer();

		this.renderQuestion();

		this.updateProgress();

		this.updateScore();
	}


	/* ==========================================
	   Favorites Quiz
	========================================== */

	startFavoritesQuiz() {

		this.quizMode = "favorites";

		const favoriteIds =
			Storage.getFavorites();

		if (favoriteIds.length === 0) {

			UI.alert(
				"Δεν υπάρχουν αγαπημένες ερωτήσεις."
			);

			return;

		}

		this.questions =
			[...this.originalQuestions].filter(
				question =>
					favoriteIds.includes(
						question.id
					)
			);

		this.resetQuizState();
		
		this.startTimer();

		UI.showQuiz();

		UI.updateScreenTitle(
			this.quizMode
		);

		this.renderQuestion();
		
		this.updateProgress();

		this.updateScore();
	}

   
	/* ==========================================
	   Exam Mode
	========================================== */

	startExam() {

		this.quizMode = "exam";
		
		const settings =
			Storage.getSettings();

		this.EXAM_QUESTION_COUNT =
			settings.examQuestionCount ?? 48;

		this.EXAM_REQUIRED_ANSWERS =
			settings.examRequiredAnswers ?? 42;

		this.EXAM_MAX_SKIPS =
			this.EXAM_QUESTION_COUNT -
			this.EXAM_REQUIRED_ANSWERS;
		
		// Παίρνουμε όλες τις ερωτήσεις

		this.questions =
			[...this.originalQuestions];

		// Ανακάτεμα

		this.shuffle(
			this.questions
		);

		// Κρατάμε το επιλεγμένο πλήθος ερωτήσεων

		this.questions =
			this.questions.slice(
				0,
				this.EXAM_QUESTION_COUNT
			);

		// Reset Quiz

		this.resetQuizState();

		// Timer

		this.startTimer();

		// Εμφάνιση Quiz
		
		UI.showQuiz();
		
		UI.updateScreenTitle(
			this.quizMode
		);

		this.renderQuestion();

		this.updateProgress();

		this.updateScore();
		
		UI.updateExamCounters(
			0,
			0
		);
		
		UI.updateExamButtons(
			0,
			0
		);
	}
	

	startRandomQuiz() {

		this.quizMode = "random";

		this.questions =
				[...this.originalQuestions];

			this.shuffle(
				this.questions
			);

			const randomQuestionCount =
			Math.ceil(this.questions.length / 2);

		this.questions =
			this.questions.slice(
				0,
			randomQuestionCount
		);

		this.resetQuizState();
		
		this.startTimer();

		UI.showQuiz();

		UI.updateScreenTitle(
			this.quizMode
		);

		this.renderQuestion();

		this.updateProgress();

		this.updateScore();
	}

}