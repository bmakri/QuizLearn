/* =====================================================
   QuizLearn
   UI Manager
===================================================== */

class UIManager {

    constructor() {

        /* ==========================================
           Screens
        ========================================== */

        this.dashboard =
            document.getElementById("dashboard");

        this.quizScreen =
            document.getElementById("quizScreen");

        this.resultModal =
            document.getElementById("resultModal");
			
		this.favoritesScreen =
			document.getElementById("favoritesScreen");
			
		this.settingsScreen =
			document.getElementById("settingsScreen");
			
		this.statisticsScreen =
			document.getElementById("statisticsScreen");

		this.favoritesList =
			document.getElementById("favoritesList");
			
		this.favoritesTitle =
			document.getElementById("favoritesTitle");

		this.startFavoritesButton =
			document.getElementById("startFavoritesBtn");

		this.clearFavoritesButton =
			document.getElementById("clearFavoritesBtn");

		this.homeLinks =
			document.querySelectorAll(".homeLink");
			
		


        /* ==========================================
           Dashboard Buttons
        ========================================== */

        this.studyButton =
            document.getElementById("btnStudy");

        this.examButton =
            document.getElementById("btnExam");

        this.randomButton =
            document.getElementById("btnRandom");

        this.favoriteButton =
            document.getElementById("btnFavorites");

        this.statisticsButton =
            document.getElementById("btnStatistics");

        this.settingsButton =
            document.getElementById("btnSettings");

        this.dashboardButton =
            document.getElementById("dashboardBtn");
		



        /* ==========================================
           Quiz Buttons
        ========================================== */

        this.nextButton =
            document.getElementById("nextBtn");

        this.prevButton =
            document.getElementById("prevBtn");

        this.restartButton =
            document.getElementById("restartBtn");
			
		this.reviewButton =
			document.getElementById("reviewBtn");

        this.favoriteQuestionButton =
            document.getElementById("favoriteBtn");

        this.hintButton =
            document.getElementById("hintBtn");


        /* ==========================================
           Quiz Elements
        ========================================== */

        this.questionCounter =
            document.getElementById("questionCounter");
		
		this.answeredCounter =
			document.getElementById("answeredCounter");

		this.skippedCounter =
			document.getElementById("skippedCounter");

        this.scoreLabel =
            document.getElementById("scoreLabel");

        this.questionText =
            document.getElementById("questionText");

        this.answers =
            document.getElementById("answers");

        this.hintBox =
            document.getElementById("hintBox");

        this.feedback =
            document.getElementById("feedback");

        this.timer =
            document.getElementById("timer");


        /* ==========================================
           Dashboard Elements
        ========================================== */

        this.bestScoreValue =
            document.getElementById("bestScoreValue");

        this.lastScoreValue =
            document.getElementById("lastScoreValue");

        this.attemptsValue =
            document.getElementById("attemptsValue");

        this.accuracyValue =
            document.getElementById("accuracyValue");

        this.correctValue =
            document.getElementById("correctValue");

        this.wrongValue =
            document.getElementById("wrongValue");

        this.progressCircle =
            document.getElementById("progressCircle");

        this.progressPercent =
            document.getElementById("progressPercent");

    }

    /* ==========================================
       Απόκρυψη όλων των οθονών
    ========================================== */

    hideAllScreens() {

        this.dashboard?.classList.add("hidden");
		this.quizScreen?.classList.add("hidden");
		this.favoritesScreen?.classList.add("hidden");
		this.statisticsScreen?.classList.add("hidden");
		this.settingsScreen?.classList.add("hidden");
		this.resultModal?.classList.add("hidden");

    }

    /* ==========================================
       Dashboard
    ========================================== */

    showDashboard() {

		this.hideAllScreens();

		this.resetQuizUI();
		
		this.dashboard?.classList.remove("hidden");

	}
	
	showFavorites() {

		this.hideAllScreens();

		this.updateScreenTitle("favorites");

		this.favoritesScreen?.classList.remove("hidden");

	}

	hideFavorites() {

		this.favoritesScreen?.classList.add("hidden");

	}

	showStatistics() {

		this.hideAllScreens();

		this.statisticsScreen?.classList.remove("hidden");

	}
	
	showSettings() {

		this.hideAllScreens();

		this.settingsScreen?.classList.remove("hidden");

	}

	renderFavorites(favorites = []) {

		if (!this.favoritesList) return;
		
		if (this.startFavoritesButton) {

			this.startFavoritesButton.disabled =
				favorites.length === 0;

		}
		
		if (this.favoritesTitle) {

			this.favoritesTitle.textContent =
				`⭐ Αγαπημένες (${favorites.length})`;

		}

		if (favorites.length === 0) {

					this.favoritesList.innerHTML = `
			<div class="empty-message">

				<div style="font-size:48px;margin-bottom:12px;">
					⭐
				</div>

				<h3>Δεν υπάρχουν αγαπημένες ερωτήσεις</h3>

				<p>
					Ξεκίνα ένα Quiz και πάτησε το ⭐
					για να αποθηκεύσεις ερωτήσεις.
				</p>

			</div>
		`;

		return;
		
		

		}

		this.favoritesList.innerHTML = favorites
		.map(id => {

			const question = window.quiz.questions.find(
				q => q.id === id
			);

			const text = question
				? question.question.substring(0, 80)
				: "Άγνωστη ερώτηση";

			return `
			<div class="favorite-item">

				<div class="favorite-header">

					<strong>⭐ [${id}]</strong>

					<button
						class="remove-favorite"
						data-id="${id}">

						🗑

					</button>

				</div>

				<div class="favorite-text">

					${text}...

				</div>

			</div>
		`;

		})
		.join("");

	}



    /* ==========================================
       Quiz
    ========================================== */

    showQuiz() {

		
		this.hideAllScreens();
		
		this.resetQuizUI();

		this.quizScreen?.classList.remove("hidden");
		
		if (window.quiz?.quizMode === "exam") {

			this.answeredCounter?.classList.remove("hidden");
			this.skippedCounter?.classList.remove("hidden");

		} else {

			this.answeredCounter?.classList.add("hidden");
			this.skippedCounter?.classList.add("hidden");

		}

	}


   /* ==========================================
	   Screen Title
	========================================== */

	updateScreenTitle(mode) {

		let title = "📚 Μελέτη";

		switch (mode) {

			case "exam":
				title = "🎓 Εξέταση";
				break;

			case "random":
				title = "🎲 Τυχαίο Quiz";
				break;

			case "favorites":
				title = "⭐ Αγαπημένες";
				break;

			case "review":
				title = "📖 Επανάληψη Λαθών";
				break;

			case "statistics":
				title = "📊 Στατιστικά";
				break;

			case "settings":
				title = "⚙️ Ρυθμίσεις";
				break;

		}

		const activeTitle = document.querySelector(
			".screen:not(.hidden) .screenTitle"
		);

		if (activeTitle) {

			activeTitle.textContent = title;

		}

		
	}

    /* ==========================================
       Result
    ========================================== */

    showResult() {

        this.resultModal?.classList.remove("hidden");

    }

    hideResult() {

        this.resultModal?.classList.add("hidden");

    }
	
	/* ==========================================
	   Quiz Result
	========================================== */

	showQuizResult(score, total, percent, time, wrong, skipped) {

    if (!this.resultModal) return;

    this.quizScreen?.classList.add("hidden");

    const finalScore =
        document.getElementById("finalScore");

    const correctAnswers =
        document.getElementById("correctAnswers");

    const wrongAnswers =
        document.getElementById("wrongAnswers");
		
	const skippedAnswers =
		document.getElementById("skippedAnswers");
		
	const resultTime =
		document.getElementById("resultTime");
		
	const resultIcon =
		document.getElementById("resultIcon");

	const resultTitle =
		document.getElementById("resultTitle");
	
	const resultMessage =
		document.getElementById("resultMessage");

	if (resultTime) {

		resultTime.textContent = time;

	}

    if (finalScore) {

        finalScore.textContent =
            `${score} / ${total}`;

    }

    if (correctAnswers) {

        correctAnswers.textContent = score;

    }

    if (wrongAnswers) {

		wrongAnswers.textContent =
			wrong;

	}
	
	if (skippedAnswers) {

		skippedAnswers.textContent =
			skipped;

	}

   const stars = document.querySelector(".stars");

	if (stars) {

		let value = "⭐☆☆☆☆";

		if (percent === 100) {

			value = "⭐⭐⭐⭐⭐";

		} else if (percent >= 80) {

			value = "⭐⭐⭐⭐☆";

		} else if (percent >= 60) {

			value = "⭐⭐⭐☆☆";

		} else if (percent >= 40) {

			value = "⭐⭐☆☆☆";

		}

		stars.textContent = value;

	}

   if (resultIcon && resultTitle && resultMessage) {

		if (percent >= 60) {

			resultIcon.textContent = "🏆";

			resultTitle.textContent = "Συγχαρητήρια!";

			resultMessage.innerHTML =
				"✅ Περάσατε το Quiz";

			resultMessage.style.color = "#16a34a";

		} else {

			resultIcon.textContent = "📚";

			resultTitle.textContent =
				"Δεν περάσατε το Quiz";

			resultMessage.innerHTML =
				"❌ Δοκιμάστε ξανά";

			resultMessage.style.color = "#dc2626";

		}

	}
   
   
   this.showResult();

}
	
	    /* ==========================================
       Toast
    ========================================== */

    toast(message, type = "info") {

        let toast = document.getElementById("toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.id = "toast";

            document.body.appendChild(toast);

        }

        toast.className = `toast ${type}`;

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* ==========================================
       Alert
    ========================================== */

    alert(message) {

        window.alert(message);

    }


    /* ==========================================
       Confirm
    ========================================== */

    confirm(message) {

        return window.confirm(message);

    }


    /* ==========================================
       Loading
    ========================================== */

    showLoading() {

        let loader =
            document.getElementById("loading");

        if (!loader) {

            loader = document.createElement("div");

            loader.id = "loading";

            loader.className = "loading";

            loader.innerHTML = `
                <div class="spinner"></div>
                <p>Φόρτωση...</p>
            `;

            document.body.appendChild(loader);

        }

        loader.style.display = "flex";

    }


    hideLoading() {

        const loader =
            document.getElementById("loading");

        if (!loader) return;

        loader.style.display = "none";

    }
	
	    /* ==========================================
       Quiz Progress
    ========================================== */

    updateProgress(current, total) {

		if (!this.questionCounter) return;

		this.questionCounter.textContent =
			`📄 ${current} / ${total}`;
	}
	
	updateExamCounters(answered, skipped) {

		if (!this.answeredCounter || !this.skippedCounter) return;

		const requiredAnswers =
			window.quiz?.EXAM_REQUIRED_ANSWERS ?? 42;

		const maxSkips =
			window.quiz?.EXAM_MAX_SKIPS ?? 6;

		this.answeredCounter.textContent =
			`✅ ${answered} / ${requiredAnswers}`;

		this.skippedCounter.textContent =
			`⏭ ${skipped} / ${maxSkips}`;
	}
	
	updateExamButtons(answered, skipped) {

		if (!window.quiz) return;

	/*
	 * Το Skip παραμένει ενεργό.
	 *
	 * Ο πραγματικός έλεγχος του μέγιστου αριθμού
	 * παραλείψεων γίνεται στη skipQuestion().
	 *
	 * Αυτό είναι απαραίτητο ώστε, όταν ο χρήστης
	 * επιστρέψει με Previous σε ήδη παραλειφθείσα
	 * ερώτηση, να μπορεί να χρησιμοποιήσει ξανά
	 * το Skip χωρίς να δημιουργείται νέα παράλειψη.
	 */

		if (window.quiz.skipButton) {

			window.quiz.skipButton.disabled = false;

		}
	}
	
	updateNextButton(current, total) {

		if (!this.nextButton) return;

		if (
			window.quiz?.quizMode === "exam" &&
			current === total
		) {

			this.nextButton.textContent =
				"📤 Υποβολή Εξέτασης";

		} else {

			this.nextButton.textContent =
				"Επόμενη ▶";

		}

	}


    /* ==========================================
       Quiz Score
    ========================================== */

    updateScore(score, total) {

		if (!this.scoreLabel) return;

		this.scoreLabel.textContent =
			`🎯 ${score} / ${total}`;
	}


    /* ==========================================
       Dashboard Statistics
    ========================================== */

    updateDashboard(stats) {

        if (!stats) return;

        if (this.bestScoreValue)
			this.bestScoreValue.textContent =
				`${stats.bestPercent ?? 0}%`;

		if (this.lastScoreValue)
			this.lastScoreValue.textContent =
				`${stats.lastScore ?? 0} / ${stats.lastTotal ?? 0}`;

        if (this.attemptsValue)
            this.attemptsValue.textContent =
                stats.attempts ?? 0;

        if (this.correctValue)
            this.correctValue.textContent =
                stats.correct ?? 0;

        if (this.wrongValue)
            this.wrongValue.textContent =
                stats.wrong ?? 0;

        if (this.accuracyValue)
            this.accuracyValue.textContent =
                `${stats.accuracy ?? 0}%`;

    }

	/* ==========================================
	   Statistics Screen
	========================================== */

	updateStatistics(stats) {

		if (!stats) return;

		const best =
			document.getElementById("statisticsBest");

		const last =
			document.getElementById("statisticsLast");

		const attempts =
			document.getElementById("statisticsAttempts");

		const accuracy =
			document.getElementById("statisticsAccuracy");

		const correct =
			document.getElementById("statisticsCorrect");

		const wrong =
			document.getElementById("statisticsWrong");


		if (best)
			best.textContent =
				`${stats.bestPercent ?? 0}%`;

		if (last)
			last.textContent =
				`${stats.lastScore ?? 0} / ${stats.lastTotal ?? 0}`;

		if (attempts)
			attempts.textContent =
				stats.attempts ?? 0;

		if (accuracy)
			accuracy.textContent =
				`${stats.accuracy ?? 0}%`;

		if (correct)
			correct.textContent =
				stats.correct ?? 0;

		if (wrong)
			wrong.textContent =
				stats.wrong ?? 0;

	}


    /* ==========================================
       Progress Ring
    ========================================== */

    updateProgressRing(percent) {

        if (!this.progressCircle ||
            !this.progressPercent)
            return;

        const radius = 60;

        const circumference =
            2 * Math.PI * radius;

        this.progressCircle.style.strokeDasharray =
            circumference;

        const offset =
            circumference -
            (percent / 100) * circumference;

        this.progressCircle.style.strokeDashoffset =
            offset;

        this.progressPercent.textContent =
            `${percent}%`;

    }

	/* ==========================================
	   MathJax
	========================================== */

	renderMath(element = null) {

		if (!window.MathJax || !MathJax.typesetPromise) return;

		const targets = element ? [element] : undefined;

		MathJax.typesetPromise(targets).catch(err => {
			console.error("MathJax error:", err);
		});
	}

    /* ==========================================
       Hint
    ========================================== */

    showHint(text = "") {

		if (!this.hintBox) return;

		this.hintBox.classList.remove("hidden");

		this.hintBox.innerHTML =
			`<p>${text}</p>`;

		this.renderMath(this.hintBox);
	}


    hideHint() {

        if (!this.hintBox) return;

        this.hintBox.classList.add("hidden");

        this.hintBox.innerHTML = "";

    }


    /* ==========================================
       Feedback
    ========================================== */

    showFeedback(text = "") {

		if (!this.feedback) return;

		this.feedback.classList.remove("hidden");

		this.feedback.innerHTML =
			`<p>${text}</p>`;

		this.renderMath(this.feedback);
	}


    hideFeedback() {

        if (!this.feedback) return;

        this.feedback.classList.add("hidden");

        this.feedback.innerHTML = "";

    }
	
	    /* ==========================================
       Event Binding
    ========================================== */

    bindEvents(callbacks = {}) {

        if (this.studyButton && callbacks.onStudy) {

            this.studyButton.addEventListener(
                "click",
                callbacks.onStudy
            );

        }

        if (this.examButton && callbacks.onExam) {

            this.examButton.addEventListener(
                "click",
                callbacks.onExam
            );

        }

        if (this.randomButton && callbacks.onRandom) {

            this.randomButton.addEventListener(
                "click",
                callbacks.onRandom
            );

        }
		
		
			if (this.favoriteButton && callbacks.onFavorites) {

    this.favoriteButton.addEventListener(
        "click",
        callbacks.onFavorites
    );

}

		if (this.statisticsButton && callbacks.onStatistics) {

			this.statisticsButton.addEventListener(
				"click",
				callbacks.onStatistics
			);

		}

		if (this.settingsButton && callbacks.onSettings) {

			this.settingsButton.addEventListener(
				"click",
				callbacks.onSettings
			);

		}

        if (this.dashboardButton && callbacks.onDashboard) {

            this.dashboardButton.addEventListener(
                "click",
                callbacks.onDashboard
            );

        }

    }


    /* ==========================================
       Reset UI
    ========================================== */

    resetQuizUI() {

        this.hideHint();

        this.hideFeedback();

        this.hideResult();

    }

}   // Τέλος UIManager


/* ==========================================
   Global Instance
========================================== */

window.UI = new UIManager();