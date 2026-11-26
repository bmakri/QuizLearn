/* Open eClass QTI Lite 1.2.1 export, matching native eClass layout. */
const QuizQTI = (() => {
  const esc = s => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
  function build(questions, hints = false) {
    if (!Array.isArray(questions) || !questions.length) throw new Error('Η τράπεζα είναι κενή.');
    return '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE questestinterop SYSTEM "fims_qtilitev1p2p1.dtd">\n<questestinterop>\n' + questions.map((q,i) => {
      if (!q || typeof q.question !== 'string' || !q.question.trim() || !Array.isArray(q.answers) || q.answers.length < 2 || !q.answers.every(a=>typeof a==='string' && a.trim()) || !Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.answers.length || q.image) throw new Error(`Ερώτηση ${i+1}: μη υποστηριζόμενη δομή ή εικόνα. Η εξαγωγή ακυρώθηκε.`);
      const id = `question${i+1}`;
      const material = s => `<material><mattext>${esc(s)}</mattext></material>`;
      return `<item title="${i+1}" ident="${id}">\n<presentation>${material(q.question)}</presentation>\n<response_lid rcardinality="Single" rtiming="No"><render_choice>\n` + q.answers.map((a,j)=>`<response_label ident="${id}answer${j+1}">${material(a)}</response_label>`).join('\n') + '\n</render_choice></response_lid>\n<resprocessing>\n' + q.answers.map((a,j)=>`<respcondition><conditionvar><varequal>${id}answer${j+1}</varequal></conditionvar><setvar action="Set">${j===q.correct?1:0}</setvar><displayfeedback feedbacktype="Response" linkrefid="${id}feedback${j+1}"/></respcondition>`).join('\n') + '\n</resprocessing>\n' + q.answers.map((a,j)=>`<itemfeedback ident="${id}feedback${j+1}" view="Candidate">${material(j===q.correct?q.explanation:(hints?q.hint:''))}</itemfeedback>`).join('\n') + '\n</item>';
    }).join('\n') + '\n</questestinterop>\n';
  }
  function download(questions,name) {
    try {
      const hints = confirm('Να χρησιμοποιηθούν οι υποδείξεις ως ανατροφοδότηση λανθασμένων απαντήσεων; (Ακύρωση: μόνο ανατροφοδότηση σωστών απαντήσεων.)');
      const xml = build(questions,hints);
      const url = URL.createObjectURL(new Blob([xml],{type:'application/xml;charset=utf-8'}));
      const a = document.createElement('a'); a.href=url; a.download=(name||'QuizLearn').replace(/[\\/:*?"<>|]/g,'_')+'_Open_eClass.xml'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
    } catch(e) { alert(e.message); }
  }
  function parse(xml) {
    if (/<!ENTITY\b|<!DOCTYPE[^>]*\[/i.test(xml)) throw new Error('Μη υποστηριζόμενες δηλώσεις XML.');
    const doc = new DOMParser().parseFromString(xml,'application/xml');
    if (doc.querySelector('parsererror') || doc.documentElement.localName !== 'questestinterop') throw new Error('Μη έγκυρο XML IMS QTI.');
    const items = [...doc.querySelectorAll('item')], questions = [], warnings = [];
    const plain = node => {
      if (!node || node.children.length) throw new Error('Μη υποστηριζόμενο περιεχόμενο.');
      const s = node.textContent.trim();
      if (/<\/?(?:img|svg|math|iframe|video|audio|object|table|script)\b/i.test(s)) throw new Error('Περιεχόμενο πολυμέσων ή σύνθετης μορφοποίησης.');
      if (/<\/?[a-z][^>]*>/i.test(s)) throw new Error('Μορφοποίηση HTML που δεν υποστηρίζεται.');
      return s;
    };
    items.forEach((item,i) => {
      try {
        if (item.querySelector('matimage, mataudio, matvideo, matapplication, matref')) throw new Error('Πολυμέσα.');
        const responses = item.querySelectorAll('response_lid');
        if (responses.length !== 1 || (responses[0].getAttribute('rcardinality') || 'Single') !== 'Single') throw new Error('Δεν είναι ερώτηση μοναδικής επιλογής.');
        const labels = [...responses[0].querySelectorAll('render_choice > response_label')];
        const ids = labels.map(x=>x.getAttribute('ident'));
        const answers = labels.map(x=>plain(x.querySelector('material > mattext')));
        const question = plain(item.querySelector('presentation > material > mattext'));
        if (!question || answers.length < 2 || answers.some(a=>!a) || ids.some(x=>!x) || new Set(ids).size!==ids.length) throw new Error('Ελλιπής εκφώνηση ή επιλογές.');
        const scores = new Map(), feedback = new Map();
        for (const c of item.querySelectorAll('resprocessing > respcondition')) {
          const cv = c.querySelector('conditionvar'), eq = cv?.querySelector('varequal'), sv = c.querySelectorAll('setvar');
          if (!eq || cv.children.length!==1 || sv.length!==1 || (sv[0].getAttribute('action')||'Set')!=='Set') throw new Error('Σύνθετος κανόνας βαθμολόγησης.');
          const id=eq.textContent.trim(), score=Number(sv[0].textContent.trim());
          if (!ids.includes(id) || scores.has(id) || !sv[0].textContent.trim() || !Number.isFinite(score)) throw new Error('Μη έγκυρη βαθμολογία.');
          scores.set(id,score);
          const ref=c.querySelector('displayfeedback')?.getAttribute('linkrefid');
          const f=[...item.querySelectorAll('itemfeedback')].find(x=>x.getAttribute('ident')===ref);
          feedback.set(id,f?plain(f.querySelector('material > mattext')):'');
        }
        const correctIds=ids.filter(id=>scores.get(id)>0);
        if (scores.size!==ids.length || correctIds.length!==1) throw new Error('Δεν υπάρχει μία μοναδική θετική βαθμολογία.');
        const correct=ids.indexOf(correctIds[0]);
        const wrong=[...new Set(ids.filter(id=>id!==correctIds[0]).map(id=>feedback.get(id)).filter(Boolean))];
        if (scores.get(correctIds[0])!==1 || ids.some(id=>id!==correctIds[0] && scores.get(id)!==0)) warnings.push(`Ερώτηση ${i+1}: η βαθμολογία κανονικοποιείται σε 1/0.`);
        if (wrong.length>1) warnings.push(`Ερώτηση ${i+1}: οι διαφορετικές ανατροφοδοτήσεις λανθασμένων επιλογών συνενώθηκαν σε υπόδειξη.`);
        questions.push({id:questions.length+1,category:'Open eClass',difficulty:'medium',type:'multiple',question,answers,correct,hint:wrong.join('\n'),explanation:feedback.get(correctIds[0])||'',tags:['Open eClass'],image:null,reference:'Open eClass',chapter:1,favorite:false});
      } catch(e) { warnings.push(`Παράλειψη ερώτησης ${i+1}: ${e.message}`); }
    });
    return {questions,warnings,total:items.length};
  }
  return {build,download,parse};
})();
