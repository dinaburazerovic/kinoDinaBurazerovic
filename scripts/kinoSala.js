let trenutnaProjekcija = 0;
let prevBtn, nextBtn;

window.onload = function () {
    if (!validirajPodatke(podaci)) {
        document.body.innerHTML = "<h2>Podaci nisu validni!</h2>";
        return;
    }

    dodajNavigaciju();
    prikaziSalu();
};

function prikaziSalu() {
    const grid = document.querySelector(".sjedista-grid");
    const filmNaziv = document.querySelector(".film-naziv");
    const filmDetalji = document.querySelectorAll(".film-detalj");

    grid.innerHTML = "";

    const projekcija = podaci.projekcije[trenutnaProjekcija];

    filmNaziv.textContent = projekcija.film;
    filmDetalji[0].textContent = "Vrijeme: " + projekcija.vrijeme;

    const redovi = {};

    projekcija.sjedista.forEach(s => {
        if (!redovi[s.red]) redovi[s.red] = [];
        redovi[s.red].push(s);
    });

    Object.keys(redovi).forEach(redOznaka => {
        const redDiv = document.createElement("div");
        redDiv.classList.add("red");

        const oznaka = document.createElement("span");
        oznaka.classList.add("red-oznaka");
        oznaka.textContent = redOznaka;

        redDiv.appendChild(oznaka);

        redovi[redOznaka].forEach(sjediste => {
            const div = document.createElement("div");
            div.classList.add("sjediste", sjediste.status);
            div.title = sjediste.red + sjediste.broj;

            div.onclick = () => klikNaSjediste(sjediste);

            redDiv.appendChild(div);
        });

        grid.appendChild(redDiv);
    });

    updateDugmad();
}

function klikNaSjediste(sjediste) {
    if (sjediste.status === "slobodno") {
        sjediste.status = "rezervisano";
        prikaziSalu();
    }
}


function dodajNavigaciju() {
    const container = document.querySelector(".sala-section");

    const navDiv = document.createElement("div");
    navDiv.style.marginTop = "25px";
    navDiv.style.textAlign = "center";

    prevBtn = document.createElement("button");
    nextBtn = document.createElement("button");

    prevBtn.textContent = "⬅ Prethodna";
    nextBtn.textContent = "Sljedeća ➡";

    stilizujDugme(prevBtn);
    stilizujDugme(nextBtn);

    prevBtn.onclick = () => {
        if (trenutnaProjekcija === 0) return;
        trenutnaProjekcija--;
        prikaziSalu();
    };

    nextBtn.onclick = () => {
        if (trenutnaProjekcija === podaci.projekcije.length - 1) return;
        trenutnaProjekcija++;
        prikaziSalu();
    };

    navDiv.appendChild(prevBtn);
    navDiv.appendChild(nextBtn);

    container.appendChild(navDiv);
}


function stilizujDugme(btn) {
    btn.style.padding = "10px 20px";
    btn.style.margin = "5px";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.backgroundColor = "#333";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "14px";
    btn.style.transition = "0.3s";

    btn.onmouseover = () => {
        if (!btn.disabled) btn.style.backgroundColor = "#555";
    };

    btn.onmouseout = () => {
        if (!btn.disabled) btn.style.backgroundColor = "#333";
    };
}

