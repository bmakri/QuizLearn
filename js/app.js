/* =====================================================
   QuizLearn
   app.js
   Bootstrap εφαρμογής
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    console.clear();

    console.log("====================================");
    console.log(" QuizLearn");
    console.log("====================================");

    // Επιλογή τράπεζας πριν από την αρχικοποίηση
    const selected = await chooseStartupBank();
    window.QUESTIONS = selected.questions;
    if (selected.id) {
        localStorage.setItem("quizlearn_active_bank", selected.id);
    } else {
        localStorage.removeItem("quizlearn_active_bank");
    }
    const activeLabel = document.getElementById("activeQuestionsFile");
    if (activeLabel) {
        activeLabel.textContent = selected.name;
        activeLabel.title = selected.name;
    }
    window.quiz = new QuizEngine();
    window.quiz.init();
    console.log("Ενεργή τράπεζα:", selected.name, selected.questions.length);

    // Dashboard

    updateDashboard();

    // ==========================================
    // Settings
    // ==========================================

    const settings =
        Storage.getSettings();

    const shuffleQuestionsSetting =
        document.getElementById(
            "shuffleQuestionsSetting"
        );

    if (shuffleQuestionsSetting) {

        // Φόρτωση αποθηκευμένης επιλογής

        shuffleQuestionsSetting.checked =
            settings.shuffleQuestions ?? true;

        // Αποθήκευση όταν αλλάζει το switch

        shuffleQuestionsSetting.addEventListener(
            "change",
            () => {

                const currentSettings =
                    Storage.getSettings();

                currentSettings.shuffleQuestions =
                    shuffleQuestionsSetting.checked;

                Storage.saveSettings(
                    currentSettings
                );

            }
        );

    }

    const shuffleAnswersSetting =
        document.getElementById(
            "shuffleAnswersSetting"
        );

    if (shuffleAnswersSetting) {

        // Φόρτωση αποθηκευμένης επιλογής

        shuffleAnswersSetting.checked =
            settings.shuffleAnswers ?? false;

        // Αποθήκευση όταν αλλάζει το switch

        shuffleAnswersSetting.addEventListener(
            "change",
            () => {

                const currentSettings =
                    Storage.getSettings();

                currentSettings.shuffleAnswers =
                    shuffleAnswersSetting.checked;

                Storage.saveSettings(
                    currentSettings
                );

            }
        );

    }

    const soundsSetting =
        document.getElementById(
            "soundsSetting"
        );

    if (soundsSetting) {

        // Φόρτωση αποθηκευμένης επιλογής

        soundsSetting.checked =
            settings.sounds ?? true;

        // Αποθήκευση όταν αλλάζει το switch

        soundsSetting.addEventListener(
            "change",
            () => {

                const currentSettings =
                    Storage.getSettings();

                currentSettings.sounds =
                    soundsSetting.checked;

                Storage.saveSettings(
                    currentSettings
                );

            }
        );

    }

    const timerSetting =
        document.getElementById(
            "timerSetting"
        );

    if (timerSetting) {

        // Φόρτωση αποθηκευμένης επιλογής

        timerSetting.checked =
            settings.timer ?? true;

        // Αποθήκευση όταν αλλάζει το switch

        timerSetting.addEventListener(
            "change",
            () => {

                const currentSettings =
                    Storage.getSettings();

                currentSettings.timer =
                    timerSetting.checked;

                Storage.saveSettings(
                    currentSettings
                );

            }
        );

    }

    // ==========================================
    // Ρυθμίσεις Εξέτασης
    // ==========================================

    const examQuestionCountSetting =
        document.getElementById(
            "examQuestionCountSetting"
        );

    const examRequiredAnswersSetting =
        document.getElementById(
            "examRequiredAnswersSetting"
        );

    const examMaxSkipsValue =
        document.getElementById(
            "examMaxSkipsValue"
        );

    // Προεπιλεγμένες / αποθηκευμένες τιμές

    const savedExamQuestionCount =
        settings.examQuestionCount ?? 48;

    const savedExamRequiredAnswers =
        settings.examRequiredAnswers ?? 42;

    if (examQuestionCountSetting) {
        examQuestionCountSetting.value =
            savedExamQuestionCount;
    }

    if (examRequiredAnswersSetting) {
        examRequiredAnswersSetting.value =
            savedExamRequiredAnswers;
    }

    // Ενημέρωση ρυθμίσεων εξέτασης

    function updateExamSettings() {

        if (
            !examQuestionCountSetting ||
            !examRequiredAnswersSetting
        ) return;

        let questionCount =
            parseInt(examQuestionCountSetting.value, 10);

        let requiredAnswers =
            parseInt(examRequiredAnswersSetting.value, 10);

        if (!Number.isFinite(questionCount) || questionCount < 1) {
            questionCount = 48;
        }

        if (!Number.isFinite(requiredAnswers) || requiredAnswers < 1) {
            requiredAnswers = 42;
        }

        // Οι υποχρεωτικές δεν μπορούν να είναι
        // περισσότερες από το σύνολο των ερωτήσεων

        if (requiredAnswers > questionCount) {
            requiredAnswers = questionCount;
        }

        examQuestionCountSetting.value =
            questionCount;

        examRequiredAnswersSetting.value =
            requiredAnswers;

        const maxSkips =
            questionCount - requiredAnswers;

        if (examMaxSkipsValue) {
            examMaxSkipsValue.textContent =
                maxSkips;
        }

        const currentSettings =
            Storage.getSettings();

        currentSettings.examQuestionCount =
            questionCount;

        currentSettings.examRequiredAnswers =
            requiredAnswers;

        Storage.saveSettings(
            currentSettings
        );

    }

    // Αρχική εμφάνιση παραλείψεων

    if (examMaxSkipsValue) {
        examMaxSkipsValue.textContent =
            savedExamQuestionCount -
            savedExamRequiredAnswers;
    }

    // Αποθήκευση όταν αλλάζουν οι τιμές

    examQuestionCountSetting?.addEventListener(
        "input",
        updateExamSettings
    );

    examRequiredAnswersSetting?.addEventListener(
        "input",
        updateExamSettings
    );

    // ==========================================
    // Επιλογή εξωτερικού αρχείου ερωτήσεων
    // ==========================================

    const selectQuestionsFileBtn =
        document.getElementById(
            "selectQuestionsFileBtn"
        );

    const questionsFileInput =
        document.getElementById(
            "questionsFileInput"
        );

    const activeQuestionsFile =
        document.getElementById(
            "activeQuestionsFile"
        );

    if (selectQuestionsFileBtn && questionsFileInput) {

        selectQuestionsFileBtn.addEventListener(
            "click",
            () => {
                questionsFileInput.click();
            }
        );

        questionsFileInput.addEventListener(
            "change",
            async () => {

                const file = questionsFileInput.files[0];

                if (!file) return;

                if (!/\.(json|xml)$/i.test(file.name)) {

                    alert(
                        "Παρακαλώ επιλέξτε αρχείο .json ή .xml"
                    );

                    questionsFileInput.value = "";

                    return;
                }

                try {

                    const text = await file.text();

                    const isXML =
                        /\.xml$/i.test(file.name);

                    const result =
                        isXML ? QuizQTI.parse(text) : null;

                    const importedQuestions =
                        isXML
                            ? result.questions
                            : JSON.parse(text);

                    if (isXML) {

                        const report =
                            `Ερωτήσεις XML: ${result.total}\n` +
                            `Συμβατές: ${importedQuestions.length}\n` +
                            `Παραλείψεις: ${result.total - importedQuestions.length}\n` +
                            `Η δυσκολία ορίζεται ως μέτρια.\n` +
                            result.warnings.join("\n");

                        if (!importedQuestions.length) {
                            throw new Error(report);
                        }

                        if (!confirm(report + "\n\nΣυνέχεια στην αποθήκευση;")) {

                            questionsFileInput.value = "";

                            return;
                        }

                    }

                    if (
                        !Array.isArray(importedQuestions) ||
                        importedQuestions.length === 0
                    ) {
                        throw new Error(
                            "Δεν βρέθηκε έγκυρος πίνακας QUESTIONS."
                        );
                    }

                    const saveBank = confirm(
                        `Το αρχείο "${file.name}" περιέχει ` +
                        `${importedQuestions.length} ερωτήσεις.\n\n` +
                        `Θέλεις να αποθηκευτεί στις «Τράπεζές μου»;`
                    );

                    if (saveBank) {

                        const bankName =
                            file.name.replace(/\.(json|xml)$/i, "");

                        const existingBanks =
                            await QuizBanks.getAll();

                        const duplicateBank =
                            existingBanks.find(
                                bank =>
                                    bank.name.toLowerCase() ===
                                    bankName.toLowerCase()
                            );

                        if (duplicateBank) {

                            const createCopy = confirm(
                                `Υπάρχει ήδη τράπεζα με όνομα "${bankName}".\n\n` +
                                `Θέλεις να δημιουργήσεις δεύτερη τράπεζα με το ίδιο όνομα;`
                            );

                            if (!createCopy) {

                                alert(
                                    "Η αποθήκευση ακυρώθηκε."
                                );

                                questionsFileInput.value = "";

                                return;
                            }

                        }

                        await QuizBanks.save(
                            bankName,
                            importedQuestions
                        );

                        if (!document.getElementById("myBanksPanel").hidden) {
                            await showMyBanks();
                        }

                        console.log(
                            `Αποθηκεύτηκε η τράπεζα: ${bankName}`
                        );

                    }

                    console.log(
                        `Ελέγχθηκε το αρχείο ${file.name} - ${importedQuestions.length} ερωτήσεις`
                    );

                    alert(
                        saveBank
                            ? `Το αρχείο "${file.name}" αποθηκεύτηκε στις «Τράπεζές μου».\n\n` +
                              `Ερωτήσεις: ${importedQuestions.length}\n` +
                              `Η ενεργή τράπεζα δεν άλλαξε.`
                            : `Το αρχείο "${file.name}" ελέγχθηκε, αλλά δεν αποθηκεύτηκε.\n\n` +
                              `Η ενεργή τράπεζα δεν άλλαξε.`
                    );

                    questionsFileInput.value = "";

                } catch (error) {

                    console.error(
                        "Σφάλμα φόρτωσης αρχείου:",
                        error
                    );

                    alert(
                        "Η εισαγωγή ή η αποθήκευση του αρχείου απέτυχε.\n\n" +
                        error.message
                    );

                    questionsFileInput.value = "";

                }

            }
        );

    }

    // ==========================================
    // Δημιουργία Quiz
    // ==========================================

    const createQuizBtn =
        document.getElementById(
            "createQuizBtn"
        );

    if (createQuizBtn) {

        createQuizBtn.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".screen")
                    .forEach(screen => {

                        screen.classList.add("hidden");
                        screen.classList.remove("active");

                    });

                const generatorScreen =
                    document.getElementById(
                        "generatorScreen"
                    );

                if (generatorScreen) {

                    generatorScreen.classList.remove("hidden");
                    generatorScreen.classList.add("active");

                }

            }
        );

    }

    // ==========================================
    // Επιστροφή από Δημιουργία Quiz στις Ρυθμίσεις
    // ==========================================

    const backToSettingsBtn =
        document.getElementById(
            "backToSettingsBtn"
        );

    if (backToSettingsBtn) {

        backToSettingsBtn.addEventListener(
            "click",
            () => {

                UI.showSettings();

            }
        );

    }

    // ==========================================
    // Επιστροφή από Δημιουργία Quiz στην Αρχική
    // ==========================================

    const generatorHomeLink =
        document.getElementById(
            "generatorHomeLink"
        );

    if (generatorHomeLink) {

        generatorHomeLink.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".screen")
                    .forEach(screen => {

                        screen.classList.add("hidden");
                        screen.classList.remove("active");

                    });

                const dashboard =
                    document.getElementById(
                        "dashboard"
                    );

                if (dashboard) {

                    dashboard.classList.remove("hidden");
                    dashboard.classList.add("active");

                }

            }
        );

    }

    // ==========================================
    // Επαναφορά προόδου
    // ==========================================

    const resetProgressBtn =
        document.getElementById(
            "resetProgressBtn"
        );

    if (resetProgressBtn) {

        resetProgressBtn.addEventListener(
            "click",
            () => {

                const ok = UI.confirm(
                    "Θέλεις να διαγράψεις όλα τα αποθηκευμένα στατιστικά και την πρόοδό σου;"
                );

                if (!ok) return;

                Storage.reset();

                updateDashboard();

                UI.alert(
                    "Η πρόοδος και τα στατιστικά διαγράφηκαν."
                );

            }
        );

    }

    // ==========================================
    // Σύνδεση συμβάντων διεπαφής
    // ==========================================

    UI.bindEvents({

        onStudy() {

            window.quiz.restartQuiz();

        },

        onExam() {

            window.quiz.startExam();

        },

        onRandom() {

            window.quiz.startRandomQuiz();

        },

        onFavorites() {

            UI.showFavorites();

            UI.renderFavorites(
                Storage.getFavorites()
            );

        },

        onStatistics() {

            const stats = {

                bestPercent:
                    Storage.getBestPercent(),

                lastScore:
                    Storage.getLastScore(),

                lastTotal:
                    Storage.getLastTotal(),

                attempts:
                    Storage.getAttempts(),

                correct:
                    Storage.getTotalCorrect(),

                wrong:
                    Storage.getTotalWrong(),

                accuracy:
                    Storage.getAccuracy()

            };

            UI.updateStatistics(stats);

            UI.showStatistics();

        },

        onSettings() {

            UI.showSettings();

        },

        onDashboard() {

            UI.showDashboard();

        }

    });

    // ==========================================
    // Αγαπημένες ερωτήσεις
    // ==========================================

    UI.startFavoritesButton?.addEventListener(
        "click",
        () => {

            window.quiz.startFavoritesQuiz();

        }
    );

    UI.clearFavoritesButton?.addEventListener(
        "click",
        () => {

            const ok = UI.confirm(
                "Θέλεις να διαγράψεις όλες τις αγαπημένες ερωτήσεις;"
            );

            if (!ok) return;

            Storage.clearFavorites();

            UI.renderFavorites([]);

        }
    );

    document.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(".remove-favorite");

            if (!button) return;

            const id =
                Number(button.dataset.id);

            Storage.removeFavorite(id);

            UI.renderFavorites(
                Storage.getFavorites()
            );

            window.quiz.updateFavoriteButton();

        }
    );

    // ==========================================
    // Toolbar shortcuts
    // ==========================================

    document.getElementById("topStudy")
        ?.addEventListener(
            "click",
            () => document.getElementById("btnStudy")?.click()
        );

    document.getElementById("topExam")
        ?.addEventListener(
            "click",
            () => document.getElementById("btnExam")?.click()
        );

    document.getElementById("topRandom")
        ?.addEventListener(
            "click",
            () => document.getElementById("btnRandom")?.click()
        );

    document.getElementById("topFavorites")
        ?.addEventListener(
            "click",
            () => document.getElementById("btnFavorites")?.click()
        );

    document.getElementById("topStatistics")
        ?.addEventListener(
            "click",
            () => document.getElementById("btnStatistics")?.click()
        );

    document.getElementById("topSettings")
        ?.addEventListener(
            "click",
            () => document.getElementById("btnSettings")?.click()
        );

}); // Τέλος DOMContentLoaded

/* =====================================================
   Dashboard
===================================================== */

function updateDashboard() {

    if (!window.Storage || !window.quiz) return;

    const bestPercent =
        Storage.getBestPercent();

    const lastScore =
        Storage.getLastScore();

    const lastTotal =
        Storage.getLastTotal();

    const attempts =
        Storage.getAttempts();

    const correct =
        Storage.getTotalCorrect();

    const wrong =
        Storage.getTotalWrong();

    const accuracy =
        Storage.getAccuracy();

    UI.updateDashboard({

        bestPercent,

        lastScore,

        lastTotal,

        attempts,

        correct,

        wrong,

        accuracy

    });

    UI.updateProgressRing(
        bestPercent
    );

}

/* =====================================================
   Κυκλική Πρόοδος
===================================================== */

function updateDashboardProgress(percent) {

    const circle =
        document.getElementById("progressCircle");

    const label =
        document.getElementById("progressPercent");

    if (!circle || !label) return;

    const radius = 60;

    const circumference =
        2 * Math.PI * radius;

    circle.style.strokeDasharray =
        circumference;

    const offset =
        circumference -
        (percent / 100) * circumference;

    circle.style.strokeDashoffset =
        offset;

    label.textContent =
        percent + "%";

}

/* Επιλογή τράπεζας κατά την εκκίνηση */
function chooseStartupBank() {
    const dialog = document.getElementById("startupBankDialog");
    const defaultBtn = document.getElementById("startupDefaultBank");
    const importBtn = document.getElementById("startupImportBank");
    const savedBtn = document.getElementById("startupSavedBanks");
    const input = document.getElementById("startupBankFile");
    const list = document.getElementById("startupSavedBankList");
    const status = document.getElementById("startupBankStatus");
    const validate = questions => {
        if (!Array.isArray(questions) || !questions.length ||
            !questions.every(q => q && typeof q.question === "string" &&
                q.question.trim() && Array.isArray(q.answers) &&
                q.answers.length >= 2 && q.answers.every(a => typeof a === "string") &&
                Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.answers.length)) {
            throw new Error("Μη έγκυρη ή κενή τράπεζα ερωτήσεων.");
        }
        return questions;
    };
    return new Promise(resolve => {
        let busy = false;
        const buttons = [defaultBtn, importBtn, savedBtn];
        function finish(questions, name, id = null) {
            validate(questions);
            dialog.close();
            resolve({questions, name, id});
        }
        async function run(action) {
            if (busy) return;
            busy = true;
            buttons.forEach(b => b.disabled = true);
            status.textContent = "";
            try { await action(); }
            catch (error) { status.textContent = error.message; console.error(error); }
            finally { busy = false; buttons.forEach(b => b.disabled = false); }
        }
        dialog.addEventListener("cancel", e => e.preventDefault());
        defaultBtn.addEventListener("click", () => run(async () => {
            let questions;
            if (location.protocol === "file:") {
                questions = JSON.parse(document.getElementById("defaultQuestionsBank").textContent);
            } else {
                const response = await fetch("./data/QuizLearn_Bank.json");
                if (!response.ok) throw new Error("Σφάλμα HTTP: " + response.status);
                questions = await response.json();
            }
            finish(questions, "Τράπεζα QuizLearn");
        }));
        importBtn.addEventListener("click", () => { input.value = ""; input.click(); });
        input.addEventListener("change", () => run(async () => {
            const file = input.files[0];
            if (!file) return;
            if (!/\.(json|xml)$/i.test(file.name)) throw new Error("Επιλέξτε JSON ή XML.");
            const text = await file.text();
            let questions;
            if (/\.xml$/i.test(file.name)) {
                const result = QuizQTI.parse(text);
                questions = result.questions;
                validate(questions);
                if (!confirm(`Συμβατές ερωτήσεις: ${questions.length}/${result.total}\nΗ δυσκολία ορίζεται ως μέτρια.\n${result.warnings.join("\n")}\n\nΣυνέχεια;`)) return;
            } else questions = JSON.parse(text);
            validate(questions);
            const name = file.name.replace(/\.(json|xml)$/i, "");
            let id = null;
            if (confirm(`Να αποθηκευτεί η τράπεζα «${name}» στις Τράπεζές μου;`)) {
                const banks = await QuizBanks.getAll();
                if (!banks.some(b => b.name.toLowerCase() === name.toLowerCase()) ||
                    confirm("Υπάρχει ήδη τράπεζα με αυτό το όνομα. Να δημιουργηθεί αντίγραφο;")) {
                    id = (await QuizBanks.save(name, questions)).id;
                }
            }
            finish(questions, name, id);
        }));
        savedBtn.addEventListener("click", () => run(async () => {
            list.hidden = false;
            list.replaceChildren();
            const banks = await QuizBanks.getAll();
            if (!banks.length) list.textContent = "Δεν υπάρχουν αποθηκευμένες τράπεζες.";
            for (const bank of banks) {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "secondaryButton";
                button.textContent = `${bank.name} (${bank.questions.length} ερωτήσεις)`;
                button.addEventListener("click", () => run(() => finish(bank.questions, bank.name, bank.id)));
                list.appendChild(button);
            }
        }));
        dialog.showModal();
    });
}
