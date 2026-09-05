/* ==========================================================
   Quiz Μαθηματικά Γ Λυκείου
   Αυτόματη δημιουργία από DOCX
   IDs 1-10
========================================================== */

const QUESTIONS = [

{
    id:1,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν \\(\\displaystyle f(x)=x^2\\), τότε \\(\\displaystyle f'(x)\\)=",
    answers:[
        "\\(\\displaystyle x\\)",
        "\\(\\displaystyle 2x\\)",
        "\\(\\displaystyle x^2\\)",
        "\\(\\displaystyle 2\\)"
    ],
    correct:1,
    hint:"Χρησιμοποίησε \\(\\displaystyle  (x^n)'=n\\cdot x^{n-1} \\).",
    explanation:"\\(\\displaystyle  (x^2)'=2x \\).",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:2,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η παράγωγος της σταθερής συνάρτησης \\(\\displaystyle f(x)=5\\) είναι:",
    answers:[
        "\\(\\displaystyle 0\\)",
        "\\(\\displaystyle 1\\)",
        "\\(\\displaystyle 5\\)",
        "\\(\\displaystyle x\\)"
    ],
    correct:0,
    hint:"Η σταθερή δεν μεταβάλλεται.",
    explanation:"Η παράγωγος κάθε σταθεράς είναι \\(\\displaystyle 0\\).",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:3,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν \\(\\displaystyle f(x)=3x+2\\), τότε \\(\\displaystyle f'(x)\\)=",
    answers:[
        "\\(\\displaystyle 2\\)",
        "\\(\\displaystyle 3\\)",
        "\\(\\displaystyle 3x\\)",
        "\\(\\displaystyle 5\\)"
    ],
    correct:1,
    hint:"Η παράγωγος της \\(\\displaystyle ax+b\\) είναι \\(\\displaystyle a\\).",
    explanation:"\\(\\displaystyle f\\'(x)=3\\).",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:4,
    category:"Γ_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Η παράγωγος της \\(\\displaystyle f(x)=\\frac{1}{x}\\) είναι:",
    answers:[
        "\\(\\displaystyle \\frac{1}{x^2}\\)",
        "\\(\\displaystyle -\\frac{1}{x^2}\\)",
        "\\(\\displaystyle -x^2\\)",
        "\\(\\displaystyle 1\\)"
    ],
    correct:1,
    hint:"Γράψε \\(\\displaystyle x^{-1}\\) και εφάρμοσε τον κανόνα δύναμης.",
    explanation:"\\(\\displaystyle  (x^{-1})'=-x^{-2}=-\\frac{1}{x^2} \\).",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:5,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν \\(\\displaystyle f'(x)>0\\) σε ένα διάστημα, τότε η \\(\\displaystyle f\\) είναι:",
    answers:[
        "γνησίως αύξουσα",
        "γνησίως φθίνουσα",
        "σταθερή",
        "μη ορισμένη"
    ],
    correct:0,
    hint:"Το πρόσημο της παραγώγου καθορίζει τη μονοτονία.",
    explanation:"Θετική παράγωγος ⇒ αύξουσα συνάρτηση.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:6,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν \\(\\displaystyle f'(x)<0\\) σε ένα διάστημα, τότε η \\(\\displaystyle f\\) είναι:",
    answers:[
        "αύξουσα",
        "φθίνουσα",
        "σταθερή",
        "άρτια"
    ],
    correct:1,
    hint:"Αρνητική παράγωγος σημαίνει αρνητικό ρυθμό μεταβολής.",
    explanation:"Η \\(\\displaystyle f\\) είναι γνησίως φθίνουσα.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:7,
    category:"Γ_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Αν \\(\\displaystyle f'(x_0)=0\\), το \\(\\displaystyle x_0\\) είναι υποψήφιο σημείο:",
    answers:[
        "ασυνέχειας μόνο",
        "ακροτάτου",
        "μηδενισμού της f πάντα",
        "κατακόρυφης ασύμπτωτης"
    ],
    correct:1,
    hint:"Τα εσωτερικά ακρότατα διαφορίσιμων συναρτήσεων αναζητούνται στα κρίσιμα σημεία.",
    explanation:"Η συνθήκη \\(\\displaystyle f\\'(x_0)=0\\) είναι αναγκαία σε εσωτερικό τοπικό ακρότατο υπό κατάλληλες προϋποθέσεις.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:8,
    category:"Γ_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Για \\(\\displaystyle f(x)=x^2-4x\\), το κρίσιμο σημείο προκύπτει από:",
    answers:[
        "\\(\\displaystyle x=0\\)",
        "\\(\\displaystyle x=1\\)",
        "\\(\\displaystyle x=2\\)",
        "\\(\\displaystyle x=4\\)"
    ],
    correct:2,
    hint:"Υπολόγισε \\(\\displaystyle f'(x)=2x-4\\) και θέσε την ίση με \\(\\displaystyle 0\\).",
    explanation:"\\(\\displaystyle 2x-4=0\\Rightarrow x=2\\).",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:9,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Όταν \\(\\displaystyle x\\to 2\\), το \\(\\displaystyle \\lim_{x\\to 2}(x+3)\\) είναι:",
    answers:[
        "\\(\\displaystyle 2\\)",
        "\\(\\displaystyle 3\\)",
        "\\(\\displaystyle 5\\)",
        "δεν υπάρχει"
    ],
    correct:2,
    hint:"Η συνάρτηση είναι συνεχής.",
    explanation:"Άμεση αντικατάσταση: \\(\\displaystyle 2+3=5\\).",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
},

{
    id:10,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Όταν \\(\\displaystyle x\\to 0\\), το \\(\\displaystyle \\lim_{x\\to 0}x^2\\) είναι:",
    answers:[
        "\\(\\displaystyle -1\\)",
        "\\(\\displaystyle 0\\)",
        "\\(\\displaystyle 1\\)",
        "δεν υπάρχει"
    ],
    correct:1,
    hint:"Η πολυωνυμική συνάρτηση είναι συνεχής.",
    explanation:"\\(\\displaystyle 0^2=0\\).",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"Μαθηματικά Γ Λυκείου",
    chapter:1,
    favorite:false
}

];
