/* =====================================================
   QuizLearn
   Storage Manager
===================================================== */

class StorageManager {

    constructor() {

        this.KEY = "B1TPE_QUIZ_DATA";

        this.defaultData = {

			bestScore: 0,

			bestPercent: 0,

			lastScore: 0,

			lastTotal: 0,

			attempts: 0,

			totalCorrect: 0,

			totalWrong: 0,

		settings: {

			shuffleQuestions: true,

			shuffleAnswers: false,

			sounds: true,

			timer: true

		}

		};

    }

    /* ==========================================
       Ανάγνωση όλων των δεδομένων
    ========================================== */

    load() {

        const json = localStorage.getItem(this.KEY);

        if (!json) {

            return JSON.parse(
				JSON.stringify(this.defaultData)
			);

        }

        try {

            return JSON.parse(json);

        }

        catch (error) {

            console.error("Storage Error:", error);

            return JSON.parse(
				JSON.stringify(this.defaultData)
			);

        }

    }

    /* ==========================================
       Αποθήκευση όλων των δεδομένων
    ========================================== */

    save(data) {

        localStorage.setItem(

            this.KEY,

            JSON.stringify(data)

        );

    }

    /* ==========================================
       Best Score
    ========================================== */

    getBestScore() {

        return this.load().bestScore;

    }

    setBestScore(score) {

        const data = this.load();

        data.bestScore = score;

        this.save(data);

    }
	
	/* ==========================================
	   Best Percent
	========================================== */

	getBestPercent() {

		return this.load().bestPercent ?? 0;

	}

	setBestPercent(percent) {

		const data = this.load();

		data.bestPercent = percent;

		this.save(data);

	}

    /* ==========================================
       Last Score
    ========================================== */

    getLastScore() {

        return this.load().lastScore;

    }

    setLastScore(score) {

        const data = this.load();

        data.lastScore = score;

        this.save(data);

    }
	
	/* ==========================================
	   Last Total
	========================================== */

	getLastTotal() {

		return this.load().lastTotal ?? 0;

	}

	setLastTotal(total) {

		const data = this.load();

		data.lastTotal = total;

		this.save(data);

	}

    /* ==========================================
       Attempts
    ========================================== */

    getAttempts() {

        return this.load().attempts;

    }

    increaseAttempts() {

        const data = this.load();

        data.attempts++;

        this.save(data);

    }


	/* ==========================================
		Correct / Wrong
	========================================== */

	getTotalCorrect() {

		return this.load().totalCorrect;

	}

	increaseCorrect(count = 1) {

		const data = this.load();

		data.totalCorrect += count;

		this.save(data);

	}

	getTotalWrong() {

		return this.load().totalWrong;

	}

	increaseWrong(count = 1) {

		const data = this.load();

		data.totalWrong += count;

		this.save(data);

	}

	getAccuracy() {

		const data = this.load();

		const total =
			data.totalCorrect + data.totalWrong;

		if (total === 0) return 0;

		return Math.round(
			(data.totalCorrect / total) * 100
		);

	}


    /* ==========================================
       Settings
    ========================================== */

    getSettings() {

        return this.load().settings;

    }

    saveSettings(settings) {

        const data = this.load();

        data.settings = settings;

        this.save(data);

    }

    /* ==========================================
       Reset
    ========================================== */

    reset() {

        const data = this.load();

		data.bestScore = 0;
		data.bestPercent = 0;

		data.lastScore = 0;
		data.lastTotal = 0;

		data.attempts = 0;
		data.totalCorrect = 0;
		data.totalWrong = 0;

		this.save(data);

    }
	/* ==========================================
	   Favorites
	========================================== */

	getFavorites() {

		return JSON.parse(
			localStorage.getItem("favorites") || "[]"
		);

	}

	isFavorite(id) {

		return this.getFavorites().includes(id);

	}

	saveFavorite(id) {

		const favorites = this.getFavorites();

		if (!favorites.includes(id)) {

			favorites.push(id);

			localStorage.setItem(
				"favorites",
				JSON.stringify(favorites)
			);

		}

	}

	removeFavorite(id) {

		const favorites =
			this.getFavorites().filter(
				item => item !== id
			);

		localStorage.setItem(
			"favorites",
			JSON.stringify(favorites)
		);

	}

	toggleFavorite(id) {

		if (this.isFavorite(id)) {

			this.removeFavorite(id);

			return false;

		}

		this.saveFavorite(id);

		return true;

	}

	clearFavorites() {

		localStorage.removeItem("favorites");

	}


}


/* ==========================================
   Global Instance
========================================== */

window.Storage = new StorageManager();