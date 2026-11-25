
const QuizBanks = {
    dbName: "QuizLearnDB",
    storeName: "banks",

    open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = () => {
                const db = request.result;

                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, {
                        keyPath: "id"
                    });
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    async save(name, questions) {
        if (!name || !Array.isArray(questions)) {
            throw new Error("Μη έγκυρη τράπεζα ερωτήσεων");
        }

        const db = await this.open();

        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, "readwrite");
            const store = tx.objectStore(this.storeName);

            const bank = {
                id: crypto.randomUUID(),
                name: name.trim(),
                questions,
                createdAt: new Date().toISOString()
            };

            store.put(bank);

            tx.oncomplete = () => {
                db.close();
                resolve(bank);
            };

            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    },

    async getAll() {
        const db = await this.open();

        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, "readonly");
            const request = tx.objectStore(this.storeName).getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);

            tx.oncomplete = () => db.close();
        });
    },
	
	
	async rename(id, newName) {

		const name = newName.trim();

		if (!name) {
			throw new Error("Το όνομα δεν μπορεί να είναι κενό.");
		}

		const db = await this.open();

		return new Promise((resolve, reject) => {

			const tx = db.transaction(
				this.storeName,
				"readwrite"
			);

			const store = tx.objectStore(this.storeName);
			const request = store.get(id);

			request.onsuccess = () => {

				const bank = request.result;

				if (!bank) {
					tx.abort();
					return;
				}

				bank.name = name;
				store.put(bank);

			};

			tx.oncomplete = () => {
				db.close();
				resolve();
			};

			tx.onabort = () => {
				db.close();
				reject(new Error("Η μετονομασία απέτυχε."));
			};

			tx.onerror = () => {
				db.close();
				reject(tx.error);
			};

		});
	},

	
	async delete(id) {
		const db = await this.open();

		return new Promise((resolve, reject) => {

			const tx = db.transaction(
				this.storeName,
				"readwrite"
			);

			tx.objectStore(this.storeName).delete(id);

			tx.oncomplete = () => {
				db.close();
				resolve();
			};

			tx.onerror = () => {
				db.close();
				reject(tx.error);
			};

		});
	},


    exportJSON(bank) {
        const data = JSON.stringify(bank.questions, null, 2);

        const blob = new Blob([data], {
            type: "application/json"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `${bank.name}.json`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
};


async function showMyBanks() {
    const section = document.getElementById("myBanksPanel");
	const list = document.getElementById("myBanksList");

    if (!section || !list) {
        console.error("Δεν βρέθηκε η ενότητα τραπεζών.");
        return;
    }

    section.hidden = false;
    list.replaceChildren();

    try {
        const banks = await QuizBanks.getAll();

        if (banks.length === 0) {
            list.textContent = "Δεν υπάρχουν αποθηκευμένες τράπεζες.";
            return;
        }

        banks.forEach(bank => {
            const card = document.createElement("div");
            card.className = "bank-card";

            const title = document.createElement("h3");
            title.textContent = bank.name;

            const count = document.createElement("p");
            count.textContent =
                `${bank.questions.length} ερωτήσεις`;
	
            const openBtn = document.createElement("button");
			const activeBankId =
			localStorage.getItem("quizlearn_active_bank");

			const isActiveBank = activeBankId === bank.id;

			openBtn.textContent = isActiveBank
				? "✓ Ενεργή"
				: "▶️ Ενεργοποίηση";

			openBtn.disabled = isActiveBank;
			openBtn.type = "button";
			openBtn.className = "secondaryButton";
					
			openBtn.addEventListener("click", () => {

				try {
					if (!Array.isArray(bank.questions) ||
						bank.questions.length === 0) {
						throw new Error("Η τράπεζα δεν περιέχει ερωτήσεις.");
					}

					if (!window.quiz) {
						throw new Error("Δεν έχει αρχικοποιηθεί το Quiz.");
					}

					// Ενεργοποίηση της επιλεγμένης τράπεζας
					window.QUESTIONS = [...bank.questions];
					window.quiz.originalQuestions = [...bank.questions];
					window.quiz.questions = [...bank.questions];
					
					// Αποθήκευση της ενεργής προσωπικής τράπεζας
						localStorage.setItem("quizlearn_active_bank", bank.id);

					// Ενημέρωση ονόματος ενεργής τράπεζας
					const activeFile =
						document.getElementById("activeQuestionsFile");

					if (activeFile) {
						activeFile.textContent = bank.name;
						activeFile.title = bank.name;
					}

					// Κλείσιμο της διαχείρισης
					const panel =
						document.getElementById("myBanksPanel");

					if (panel) {
						panel.hidden = true;
					}

					const manageButton =
						document.getElementById("openMyBanksBtn");

					if (manageButton) {
						manageButton.textContent = "📂 Διαχείριση";
					}

					alert(
						`Η τράπεζα "${bank.name}" ενεργοποιήθηκε.\n\n` +
						`Ερωτήσεις: ${bank.questions.length}`
					);

				} catch (error) {
					console.error("Σφάλμα ανοίγματος τράπεζας:", error);
					alert(error.message);
				}

			});

			
			const exportBtn = document.createElement("button");
            exportBtn.textContent = "Εξαγωγή JSON";
            exportBtn.type = "button";

            exportBtn.addEventListener("click", () => {
                QuizBanks.exportJSON(bank);
            });       
			
			const deleteBtn = document.createElement("button");

			deleteBtn.textContent = "🗑️ Διαγραφή";
			deleteBtn.type = "button";
			deleteBtn.className = "secondaryButton";

			deleteBtn.addEventListener("click", async () => {

				const confirmed = confirm(
					`Θέλεις να διαγράψεις την τράπεζα "${bank.name}";\n\n` +
					`Η διαγραφή είναι οριστική.`
				);

				if (!confirmed) return;

				try {

					await QuizBanks.delete(bank.id);

					// Αν διαγράφηκε η ενεργή τράπεζα,
					// αφαιρούμε την αποθηκευμένη επιλογή.
					const activeBankId =
						localStorage.getItem("quizlearn_active_bank");
					
				if (activeBankId === bank.id) {

					// Αφαίρεση της ενεργής προσωπικής τράπεζας
					localStorage.removeItem("quizlearn_active_bank");

					alert(
						`Η ενεργή τράπεζα "${bank.name}" διαγράφηκε.\n\n` +
						`Η εφαρμογή θα επανεκκινήσει με τις προεπιλεγμένες ερωτήσεις.`
					);

					window.location.reload();
					return;
				}


					// Ανανέωση της λίστας
					await showMyBanks();

					alert(`Η τράπεζα "${bank.name}" διαγράφηκε.`);

				} catch (error) {

					console.error("Σφάλμα διαγραφής:", error);
					alert("Δεν ήταν δυνατή η διαγραφή της τράπεζας.");

				}

			});
			
			
			const renameBtn = document.createElement("button");

			renameBtn.textContent = "✏️ Μετονομασία";
			renameBtn.type = "button";
			renameBtn.className = "secondaryButton";

			renameBtn.addEventListener("click", async () => {

				const newName = prompt(
					"Δώσε το νέο όνομα της τράπεζας:",
					bank.name
				);

				if (newName === null) return;

				const trimmedName = newName.trim();

				if (!trimmedName) {
					alert("Το όνομα δεν μπορεί να είναι κενό.");
					return;
				}

				if (trimmedName === bank.name) return;

				try {

					const banks = await QuizBanks.getAll();

					const duplicate = banks.some(item =>
						item.id !== bank.id &&
						item.name.toLowerCase() === trimmedName.toLowerCase()
					);

					if (duplicate) {
						alert("Υπάρχει ήδη τράπεζα με αυτό το όνομα.");
						return;
					}

					await QuizBanks.rename(bank.id, trimmedName);

					// Ενημέρωση του ονόματος της ενεργής τράπεζας
					const activeBankId =
						localStorage.getItem("quizlearn_active_bank");

					if (activeBankId === bank.id) {

						const activeFile =
							document.getElementById("activeQuestionsFile");

						if (activeFile) {
							activeFile.textContent = trimmedName;
							activeFile.title = trimmedName;
						}

					}

					await showMyBanks();

					alert(
						`Η τράπεζα μετονομάστηκε σε "${trimmedName}".`
					);

				} catch (error) {

					console.error("Σφάλμα μετονομασίας:", error);
					alert("Η μετονομασία απέτυχε: " + error.message);

				}

			});
			
			
			const bankActions = document.createElement("div");
			bankActions.className = "bank-actions";

			exportBtn.className = "secondaryButton";

			bankActions.append(
				openBtn,
				renameBtn,
				exportBtn,
				deleteBtn
			);

			card.append(
				title,
				count,
				bankActions
			);

			
            list.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        list.textContent = "Σφάλμα φόρτωσης τραπεζών.";
    }
}


document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("openMyBanksBtn");
    const panel = document.getElementById("myBanksPanel");

    if (!button || !panel) {
        console.error("Δεν βρέθηκαν τα στοιχεία διαχείρισης τραπεζών.");
        return;
    }

    button.addEventListener("click", async () => {

        if (!panel.hidden) {
            panel.hidden = true;
            button.textContent = "📂 Διαχείριση";
            return;
        }

        panel.hidden = false;
        button.textContent = "✖ Κλείσιμο";

        await showMyBanks();

    });

});


async function restoreActiveBank() {
    const bankId = localStorage.getItem("quizlearn_active_bank");

    if (!bankId) return;

    try {
        const banks = await QuizBanks.getAll();
        const bank = banks.find(item => item.id === bankId);

        if (!bank) {
            localStorage.removeItem("quizlearn_active_bank");
            return;
        }

        if (!Array.isArray(bank.questions) ||
            bank.questions.length === 0) {
            throw new Error("Η τράπεζα δεν περιέχει ερωτήσεις.");
        }

        if (!window.quiz) {
            throw new Error("Το Quiz δεν έχει αρχικοποιηθεί.");
        }

        window.QUESTIONS = [...bank.questions];
        window.quiz.originalQuestions = [...bank.questions];
        window.quiz.questions = [...bank.questions];

        const activeFile =
            document.getElementById("activeQuestionsFile");

        if (activeFile) {
            activeFile.textContent = bank.name;
            activeFile.title = bank.name;
        }

        console.log(
            `Επαναφέρθηκε η τράπεζα: ${bank.name}`
        );

    } catch (error) {
        console.error("Σφάλμα επαναφοράς τράπεζας:", error);
    }
}

