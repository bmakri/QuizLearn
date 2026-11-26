
'use strict';

try {
    const url = new URL(
        window.EVALUATION_CONFIG.grafisUrl
    );

    if (
        url.protocol === 'https:' &&
        url.hostname === 'grafis.sch.gr'
    ) {
        const link = document.querySelector('#surveyLink');

        link.href = url.href;
        link.hidden = false;

        document.querySelector('#surveyStatus').textContent =
            'Το ερωτηματολόγιο είναι διαθέσιμο.';
    }

} catch (e) {
    console.error('Σφάλμα σύνδεσης με το Grafis:', e);
}
