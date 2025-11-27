export function fillIn(name) {
    return fetch(`html/${name}.html`)
        .then(res => res.text())
        .then(html => document.getElementById(name).innerHTML = html);
}

async function init() {
    await fillIn("head");
    await fillIn("menu");
    await fillIn("gallery");
    await fillIn("reservation");
    await fillIn("footer");

    import("./reservation.js");
    import("./menu.js");
    import("./head.js");
    import("./gallery.js");
}

init();