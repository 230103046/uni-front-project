export function fillIn(name) {
    return fetch(`html/${name}.html`)
        .then(res => res.text())
        .then(html => document.getElementById(name).innerHTML = html);
}

async function init() {
    await fillIn("reservation");
    await fillIn("footer");

    import("./reservation.js");
}

init();