/* ==========================================================
   Quiz για Μαθηματικά
   Αυτόματη δημιουργία από DOCX
   IDs 1-60
========================================================== */

const QUESTIONS = [

{
    id:1,
    category:"Α_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Ποιος από τους αριθμούς είναι πρώτος;",
    answers:[
        "21",
        "27",
        "29",
        "33"
    ],
    correct:2,
    hint:"Πρώτος αριθμός έχει ακριβώς δύο θετικούς διαιρέτες.",
    explanation:"Το 29 διαιρείται μόνο με το 1 και το 29.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:2,
    category:"Α_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Ποιο είναι το ΕΚΠ των 4 και 6;",
    answers:[
        "8",
        "10",
        "12",
        "24"
    ],
    correct:2,
    hint:"Γράψε τα πρώτα πολλαπλάσια των δύο αριθμών.",
    explanation:"Το μικρότερο κοινό πολλαπλάσιο των 4 και 6 είναι το 12.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:3,
    category:"Α_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Ποιο κλάσμα είναι ισοδύναμο με το 1/2;",
    answers:[
        "2/3",
        "2/4",
        "3/5",
        "4/10"
    ],
    correct:1,
    hint:"Πολλαπλασίασε αριθμητή και παρονομαστή με τον ίδιο αριθμό.",
    explanation:"1/2 = 2/4.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:4,
    category:"Α_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Ποιο είναι το 20% του 50;",
    answers:[
        "5",
        "10",
        "15",
        "20"
    ],
    correct:1,
    hint:"20% = 20/100.",
    explanation:"20% του 50 = 0,2·50 = 10.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:5,
    category:"Α_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Ποιος αριθμός είναι μεγαλύτερος;",
    answers:[
        "-5",
        "-2",
        "-7",
        "-10"
    ],
    correct:1,
    hint:"Στην αριθμογραμμή μεγαλύτερος είναι ο πιο δεξιά.",
    explanation:"Από τους αρνητικούς αριθμούς ο -2 είναι ο μεγαλύτερος.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:6,
    category:"Α_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Ποιο είναι το αποτέλεσμα (-3) + 8;",
    answers:[
        "-11",
        "-5",
        "5",
        "11"
    ],
    correct:2,
    hint:"Ξεκίνα από το -3 και μετακινήσου 8 θέσεις δεξιά.",
    explanation:"(-3)+8=5.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:7,
    category:"Α_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Πόσες μοίρες είναι μία ορθή γωνία;",
    answers:[
        "45°",
        "60°",
        "90°",
        "180°"
    ],
    correct:2,
    hint:"Η ορθή γωνία είναι το ένα τέταρτο πλήρους γωνίας.",
    explanation:"Η ορθή γωνία έχει μέτρο 90°.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:8,
    category:"Α_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Ποιο από τα παρακάτω είναι τρίγωνο ως προς τις γωνίες του;",
    answers:[
        "Με τέσσερις ορθές γωνίες",
        "Με δύο αμβλείες γωνίες",
        "Με μία ορθή και δύο οξείες γωνίες",
        "Με τρεις αμβλείες γωνίες"
    ],
    correct:2,
    hint:"Το άθροισμα των γωνιών τριγώνου είναι 180°.",
    explanation:"Ένα ορθογώνιο τρίγωνο έχει μία ορθή και δύο οξείες γωνίες.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:9,
    category:"Α_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Η περίμετρος τετραγώνου πλευράς 6 cm είναι:",
    answers:[
        "12 cm",
        "24 cm",
        "36 cm",
        "18 cm"
    ],
    correct:1,
    hint:"Η περίμετρος τετραγώνου είναι 4·πλευρά.",
    explanation:"4·6 = 24 cm.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:10,
    category:"Α_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Δύο ευθείες που δεν τέμνονται ποτέ στο ίδιο επίπεδο λέγονται:",
    answers:[
        "κάθετες",
        "παράλληλες",
        "τεμνόμενες",
        "ημιευθείες"
    ],
    correct:1,
    hint:"Σκέψου δύο γραμμές με σταθερή απόσταση.",
    explanation:"Οι παράλληλες ευθείες δεν έχουν κοινό σημείο.",
    tags:["Α_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:1,
    favorite:false
},

{
    id:11,
    category:"Α_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν |x|=5, τότε:",
    answers:[
        "x=5 μόνο",
        "x=-5 μόνο",
        "x=5 ή x=-5",
        "x=0"
    ],
    correct:2,
    hint:"Η απόλυτη τιμή εκφράζει απόσταση από το 0.",
    explanation:"Οι αριθμοί που απέχουν 5 από το 0 είναι ±5.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:12,
    category:"Α_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η απόσταση των αριθμών -2 και 5 στον άξονα είναι:",
    answers:[
        "3",
        "5",
        "7",
        "-7"
    ],
    correct:2,
    hint:"Υπολόγισε |5-(-2)|.",
    explanation:"|7|=7.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:13,
    category:"Α_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η λύση της εξίσωσης 2x-7=9 είναι:",
    answers:[
        "1",
        "8",
        "9",
        "16"
    ],
    correct:1,
    hint:"Πρόσθεσε 7 και διαίρεσε με 2.",
    explanation:"2x=16, άρα x=8.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:14,
    category:"Α_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η λύση της ανίσωσης 3x<12 είναι:",
    answers:[
        "x<4",
        "x>4",
        "x<9",
        "x>9"
    ],
    correct:0,
    hint:"Διαίρεσε με θετικό αριθμό 3.",
    explanation:"x<4.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:15,
    category:"Α_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Το τριώνυμο x²-5x+6 παραγοντοποιείται ως:",
    answers:[
        "(x-2)(x-3)",
        "(x+2)(x+3)",
        "(x-1)(x-6)",
        "(x+1)(x-6)"
    ],
    correct:0,
    hint:"Βρες δύο αριθμούς με γινόμενο 6 και άθροισμα -5.",
    explanation:"x²-5x+6=(x-2)(x-3).",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:16,
    category:"Α_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Η διακρίνουσα της x²-4x+3=0 είναι:",
    answers:[
        "1",
        "4",
        "16",
        "28"
    ],
    correct:1,
    hint:"Δ=β²-4αγ.",
    explanation:"Δ=(-4)²-4·1·3=16-12=4.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:17,
    category:"Α_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Οι ρίζες της x²-5x+6=0 είναι:",
    answers:[
        "1 και 6",
        "-2 και -3",
        "2 και 3",
        "-1 και -6"
    ],
    correct:2,
    hint:"Χρησιμοποίησε την παραγοντοποίηση.",
    explanation:"(x-2)(x-3)=0 ⇒ x=2 ή x=3.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:18,
    category:"Α_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η συνάρτηση f(x)=2x+3 είναι:",
    answers:[
        "σταθερή",
        "γραμμική πρώτου βαθμού",
        "τετραγωνική",
        "εκθετική"
    ],
    correct:1,
    hint:"Η μεταβλητή x έχει εκθέτη 1.",
    explanation:"Είναι συνάρτηση πρώτου βαθμού.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:19,
    category:"Α_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Για f(x)=x²-1, η τιμή f(3) είναι:",
    answers:[
        "2",
        "6",
        "8",
        "9"
    ],
    correct:2,
    hint:"Αντικατάστησε x=3.",
    explanation:"f(3)=9-1=8.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:20,
    category:"Α_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Το σημείο (2,5) ανήκει στην y=2x+1;",
    answers:[
        "Ναι",
        "Όχι, γιατί y=4",
        "Όχι, γιατί y=3",
        "Μόνο αν x=0"
    ],
    correct:0,
    hint:"Αντικατάστησε x=2.",
    explanation:"2·2+1=5, άρα ανήκει.",
    tags:["Α_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:2,
    favorite:false
},

{
    id:21,
    category:"Β_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Ποιο είναι το αποτέλεσμα (-4)·(-6);",
    answers:[
        "-24",
        "24",
        "10",
        "-10"
    ],
    correct:1,
    hint:"Το γινόμενο δύο αρνητικών είναι θετικό.",
    explanation:"(-4)·(-6)=24.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:22,
    category:"Β_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Ποιο είναι το αποτέλεσμα της παράστασης 3² + 4²;",
    answers:[
        "7",
        "14",
        "25",
        "49"
    ],
    correct:2,
    hint:"Υπολόγισε πρώτα τις δυνάμεις.",
    explanation:"3²+4²=9+16=25.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:23,
    category:"Β_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Η τετραγωνική ρίζα του 16 είναι:",
    answers:[
        "7",
        "8",
        "4",
        "32"
    ],
    correct:2,
    hint:"Ποιος θετικός αριθμός στο τετράγωνο δίνει 16;",
    explanation:"√16=4.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:24,
    category:"Β_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν 2x + 3 = 11, τότε x =",
    answers:[
        "3",
        "4",
        "5",
        "7"
    ],
    correct:1,
    hint:"Αφαίρεσε 3 και μετά διαίρεσε με 2.",
    explanation:"2x=8, άρα x=4.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:25,
    category:"Β_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Η λύση της ανίσωσης x + 2 > 5 είναι:",
    answers:[
        "x>3",
        "x<3",
        "x>7",
        "x<7"
    ],
    correct:0,
    hint:"Αφαίρεσε 2 και από τα δύο μέλη.",
    explanation:"x>3.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:26,
    category:"Β_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν y = 3x και x = 4, τότε y =",
    answers:[
        "7",
        "12",
        "16",
        "1"
    ],
    correct:1,
    hint:"Αντικατάστησε το x με 4.",
    explanation:"y=3·4=12.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:27,
    category:"Β_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Η γραφική παράσταση της y = 2x είναι:",
    answers:[
        "κύκλος",
        "ευθεία που περνά από την αρχή των αξόνων",
        "παραβολή",
        "οριζόντια ευθεία"
    ],
    correct:1,
    hint:"Η σχέση είναι της μορφής y=αx.",
    explanation:"Η y=2x είναι ευθεία με κλίση 2 και περνά από το (0,0).",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:28,
    category:"Β_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Σε ορθογώνιο τρίγωνο με κάθετες πλευρές 3 και 4, η υποτείνουσα είναι:",
    answers:[
        "5",
        "6",
        "7",
        "8"
    ],
    correct:0,
    hint:"Εφάρμοσε το Πυθαγόρειο θεώρημα.",
    explanation:"c²=3²+4²=25, άρα c=5.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:29,
    category:"Β_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Σε ορθογώνιο τρίγωνο, το Πυθαγόρειο θεώρημα γράφεται:",
    answers:[
        "α+β=γ",
        "α²=β²+γ²",
        "αβ=γ²",
        "α²-β²=γ"
    ],
    correct:1,
    hint:"Η υποτείνουσα βρίσκεται απέναντι από την ορθή γωνία.",
    explanation:"Το τετράγωνο της υποτείνουσας ισούται με το άθροισμα των τετραγώνων των καθέτων πλευρών.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:30,
    category:"Β_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Το μήκος κύκλου ακτίνας r δίνεται από τον τύπο:",
    answers:[
        "πr²",
        "2πr",
        "πr",
        "2r²"
    ],
    correct:1,
    hint:"Το μήκος κύκλου συνδέεται με τη διάμετρο δ=2r.",
    explanation:"L=2πr.",
    tags:["Β_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:3,
    favorite:false
},

{
    id:31,
    category:"Β_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Σε αριθμητική πρόοδο με α₁=3 και διαφορά ω=2, ο α₅ είναι:",
    answers:[
        "9",
        "11",
        "13",
        "15"
    ],
    correct:1,
    hint:"αₙ=α₁+(ν-1)ω.",
    explanation:"α₅=3+4·2=11.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:32,
    category:"Β_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Σε γεωμετρική πρόοδο με α₁=2 και λόγο λ=3, ο α₄ είναι:",
    answers:[
        "18",
        "27",
        "54",
        "81"
    ],
    correct:2,
    hint:"αₙ=α₁·λ^(ν-1).",
    explanation:"α₄=2·3³=54.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:33,
    category:"Β_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η συνάρτηση f(x)=x² έχει άξονα συμμετρίας:",
    answers:[
        "x=0",
        "y=0",
        "x=1",
        "y=1"
    ],
    correct:0,
    hint:"Η παραβολή είναι συμμετρική ως προς τον άξονα y.",
    explanation:"Ο άξονας συμμετρίας είναι x=0.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:34,
    category:"Β_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Η κορυφή της παραβολής y=(x-2)²+3 είναι:",
    answers:[
        "(2,3)",
        "(-2,3)",
        "(3,2)",
        "(2,-3)"
    ],
    correct:0,
    hint:"Χρησιμοποίησε τη μορφή y=(x-h)²+k.",
    explanation:"Η κορυφή είναι (h,k)=(2,3).",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:35,
    category:"Β_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Για f(x)=x²-4, οι ρίζες είναι:",
    answers:[
        "0 και 4",
        "-4 και 4",
        "-2 και 2",
        "2 μόνο"
    ],
    correct:2,
    hint:"Λύσε x²=4.",
    explanation:"x=±2.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:36,
    category:"Β_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Το ημίτονο των 30° είναι:",
    answers:[
        "0",
        "1/2",
        "√2/2",
        "√3/2"
    ],
    correct:1,
    hint:"Θυμήσου τις βασικές τιμές.",
    explanation:"ημ30°=1/2.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:37,
    category:"Β_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Το συνημίτονο των 60° είναι:",
    answers:[
        "1/2",
        "√2/2",
        "√3/2",
        "1"
    ],
    correct:0,
    hint:"Οι τιμές ημ30° και συν60° είναι ίσες.",
    explanation:"ημ30°=συν60°=1/2.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:38,
    category:"Β_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η εφαπτομένη των 45° είναι:",
    answers:[
        "0",
        "1/2",
        "1",
        "√3"
    ],
    correct:2,
    hint:"Σε ισοσκελές ορθογώνιο τρίγωνο οι κάθετες πλευρές είναι ίσες.",
    explanation:"εφ45°=1.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:39,
    category:"Β_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Ποια ταυτότητα ισχύει για κάθε γωνία x;",
    answers:[
        "ημ²x+συν²x=1",
        "ημx+συνx=1",
        "εφx=ημx·συνx",
        "ημ²x-συν²x=1"
    ],
    correct:0,
    hint:"Είναι η θεμελιώδης τριγωνομετρική ταυτότητα.",
    explanation:"ημ²x+συν²x=1.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:40,
    category:"Β_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Η περίοδος της συνάρτησης y=ημx είναι:",
    answers:[
        "π/2",
        "π",
        "2π",
        "4π"
    ],
    correct:2,
    hint:"Μετά από μία πλήρη περιστροφή οι τιμές επαναλαμβάνονται.",
    explanation:"Η περίοδος είναι 2π.",
    tags:["Β_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:4,
    favorite:false
},

{
    id:41,
    category:"Γ_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Ποιο είναι το ανάπτυγμα του (x+3)²;",
    answers:[
        "x²+9",
        "x²+6x+9",
        "x²+3x+9",
        "x²-6x+9"
    ],
    correct:1,
    hint:"Χρησιμοποίησε (α+β)²=α²+2αβ+β².",
    explanation:"(x+3)²=x²+6x+9.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:42,
    category:"Γ_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Η παράσταση x²-9 παραγοντοποιείται ως:",
    answers:[
        "(x-3)²",
        "(x-3)(x+3)",
        "x(x-9)",
        "(x+9)(x-1)"
    ],
    correct:1,
    hint:"Είναι διαφορά δύο τετραγώνων.",
    explanation:"x²-3²=(x-3)(x+3).",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:43,
    category:"Γ_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν 3x-5=10, τότε x=",
    answers:[
        "3",
        "5",
        "10",
        "15"
    ],
    correct:1,
    hint:"Πρόσθεσε 5 και διαίρεσε με 3.",
    explanation:"3x=15, άρα x=5.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:44,
    category:"Γ_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Το σύστημα x+y=7 και x-y=1 έχει λύση:",
    answers:[
        "(3,4)",
        "(4,3)",
        "(7,1)",
        "(1,6)"
    ],
    correct:1,
    hint:"Πρόσθεσε κατά μέλη τις δύο εξισώσεις.",
    explanation:"2x=8⇒x=4 και y=3.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:45,
    category:"Γ_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Η κλίση της ευθείας y=3x-2 είναι:",
    answers:[
        "-2",
        "2",
        "3",
        "-3"
    ],
    correct:2,
    hint:"Στη μορφή y=αx+β η κλίση είναι ο συντελεστής α.",
    explanation:"Η κλίση είναι 3.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:46,
    category:"Γ_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Η ευθεία y=2x+1 τέμνει τον άξονα y στο σημείο:",
    answers:[
        "(0,1)",
        "(1,0)",
        "(0,2)",
        "(2,1)"
    ],
    correct:0,
    hint:"Θέσε x=0.",
    explanation:"Για x=0, y=1, άρα (0,1).",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:47,
    category:"Γ_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Ποιο από τα παρακάτω είναι μονώνυμο;",
    answers:[
        "3x²y",
        "x+2",
        "1/x",
        "x-y"
    ],
    correct:0,
    hint:"Μονώνυμο είναι γινόμενο αριθμού και δυνάμεων μεταβλητών με μη αρνητικούς ακέραιους εκθέτες.",
    explanation:"Το 3x²y είναι μονώνυμο.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:48,
    category:"Γ_Γυμνασίου",
    difficulty:"medium",
    type:"multiple",
    question:"Ο βαθμός του μονωνύμου 5x²y³ είναι:",
    answers:[
        "2",
        "3",
        "5",
        "6"
    ],
    correct:2,
    hint:"Άθροισε τους εκθέτες των μεταβλητών.",
    explanation:"2+3=5.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:49,
    category:"Γ_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν δύο τρίγωνα έχουν τις τρεις πλευρές τους ίσες μία προς μία, τότε είναι:",
    answers:[
        "όμοια μόνο",
        "ίσα",
        "ορθογώνια",
        "ισοσκελή πάντα"
    ],
    correct:1,
    hint:"Πρόκειται για κριτήριο ισότητας Π-Π-Π.",
    explanation:"Με το κριτήριο Π-Π-Π τα τρίγωνα είναι ίσα.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:50,
    category:"Γ_Γυμνασίου",
    difficulty:"easy",
    type:"multiple",
    question:"Σε δύο όμοια τρίγωνα, οι αντίστοιχες πλευρές είναι:",
    answers:[
        "ίσες πάντα",
        "ανάλογες",
        "κάθετες",
        "παράλληλες πάντα"
    ],
    correct:1,
    hint:"Η ομοιότητα διατηρεί τις γωνίες και έναν κοινό λόγο πλευρών.",
    explanation:"Οι αντίστοιχες πλευρές όμοιων τριγώνων είναι ανάλογες.",
    tags:["Γ_Γυμνασίου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:5,
    favorite:false
},

{
    id:51,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν f(x)=x², τότε f΄(x)=",
    answers:[
        "x",
        "2x",
        "x²",
        "2"
    ],
    correct:1,
    hint:"Χρησιμοποίησε (xⁿ)΄=n·x^(n-1).",
    explanation:"(x²)΄=2x.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:52,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Η παράγωγος της σταθερής συνάρτησης f(x)=5 είναι:",
    answers:[
        "0",
        "1",
        "5",
        "x"
    ],
    correct:0,
    hint:"Η σταθερή δεν μεταβάλλεται.",
    explanation:"Η παράγωγος κάθε σταθεράς είναι 0.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:53,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν f(x)=3x+2, τότε f΄(x)=",
    answers:[
        "2",
        "3",
        "3x",
        "5"
    ],
    correct:1,
    hint:"Η παράγωγος της ax+b είναι a.",
    explanation:"f΄(x)=3.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:54,
    category:"Γ_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Η παράγωγος της f(x)=1/x είναι:",
    answers:[
        "1/x²",
        "-1/x²",
        "-x²",
        "1"
    ],
    correct:1,
    hint:"Γράψε x⁻¹ και εφάρμοσε τον κανόνα δύναμης.",
    explanation:"(x⁻¹)΄=-x⁻²=-1/x².",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:55,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν f΄(x)>0 σε ένα διάστημα, τότε η f είναι:",
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
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:56,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question:"Αν f΄(x)<0 σε ένα διάστημα, τότε η f είναι:",
    answers:[
        "αύξουσα",
        "φθίνουσα",
        "σταθερή",
        "άρτια"
    ],
    correct:1,
    hint:"Αρνητική παράγωγος σημαίνει αρνητικό ρυθμό μεταβολής.",
    explanation:"Η f είναι γνησίως φθίνουσα.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:57,
    category:"Γ_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Αν f΄(x₀)=0, το x₀ είναι υποψήφιο σημείο:",
    answers:[
        "ασυνέχειας μόνο",
        "ακροτάτου",
        "μηδενισμού της f πάντα",
        "κατακόρυφης ασύμπτωτης"
    ],
    correct:1,
    hint:"Τα εσωτερικά ακρότατα παραγωγίσιμων συναρτήσεων αναζητούνται στα κρίσιμα σημεία.",
    explanation:"Η συνθήκη f΄(x₀)=0 είναι αναγκαία σε εσωτερικό τοπικό ακρότατο υπό κατάλληλες προϋποθέσεις.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:58,
    category:"Γ_Λυκείου",
    difficulty:"medium",
    type:"multiple",
    question:"Για f(x)=x²-4x, το κρίσιμο σημείο προκύπτει από:",
    answers:[
        "x=0",
        "x=1",
        "x=2",
        "x=4"
    ],
    correct:2,
    hint:"Υπολόγισε f΄(x)=2x-4 και θέσε την ίση με 0.",
    explanation:"2x-4=0 ⇒ x=2.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:59,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question: "Όταν \\(x \\to 2\\), το \\(\\displaystyle \\lim_{x \\to 2}(x+3)\\) είναι:",
    answers:[
        "2",
        "3",
        "5",
        "δεν υπάρχει"
    ],
    correct:2,
    hint:"Η συνάρτηση είναι συνεχής.",
    explanation:"Άμεση αντικατάσταση: 2+3=5.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
},

{
    id:60,
    category:"Γ_Λυκείου",
    difficulty:"easy",
    type:"multiple",
    question: "Όταν \\(x \\to 0\\), το \\(\\displaystyle \\lim_{x \\to 0} x^2\\) είναι:",
    answers:[
        "-1",
        "0",
        "1",
        "δεν υπάρχει"
    ],
    correct:1,
    hint:"Η πολυωνυμική συνάρτηση είναι συνεχής.",
    explanation:"0²=0.",
    tags:["Γ_Λυκείου"],
    image:null,
    reference:"ΜΑΘΗΜΑΤΙΚΑ",
    chapter:6,
    favorite:false
}

];
