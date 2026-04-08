const spremljeniPodaci = localStorage.getItem("projekcije");

let podaci;

if (spremljeniPodaci) {
    podaci = JSON.parse(spremljeniPodaci);
} else {
    podaci = {
        projekcije: [
            {
                film: "Avatar 2",
                vrijeme: "18:00",
                sjedista: generisiSjedista(1)
            },
            {
                film: "Oppenheimer",
                vrijeme: "20:00",
                sjedista: generisiSjedista(2)
            },
            {
                film: "Dune 2",
                vrijeme: "16:30",
                sjedista: generisiSjedista(3)
            },
            {
                film: "Interstellar",
                vrijeme: "21:15",
                sjedista: generisiSjedista(4)
            },
            {
                film: "The Batman",
                vrijeme: "19:45",
                sjedista: generisiSjedista(5)
            }
        ]
    };
    localStorage.setItem("projekcije", JSON.stringify(podaci));
}

function generisiSjedista(mod) {
    const redovi = ["A","B","C","D","E","F","G","H"];
    const sjedista = [];

    redovi.forEach((red, rIndex) => {
        for (let i = 1; i <= 10; i++) {

            let status = "slobodno";

            if (mod === 1) {
                status = "zauzeto";

                if (
                    (rIndex === 0 && (i <= 3 || i >= 8)) || 
                    (rIndex === 1 && i === 5)               
                ) {
                    status = "slobodno";
                }

                if (i === 4 || i === 7) {
                    status = "rezervisano";
                }
            }

            if (mod === 2) {
                status = "slobodno";

                if (rIndex >= 5 && i >= 4 && i <= 7) {
                    status = "zauzeto";
                }

                if ((i === 5 || i === 6) && rIndex >= 3) {
                    status = "rezervisano";
                }
            }

            if (mod === 3) {
                if (rIndex >= 5 && i >= 3 && i <= 8) {
                    status = "zauzeto";
                } else if (rIndex >= 2 && i >= 4 && i <= 7) {
                    status = "rezervisano";
                }
            }

            if (mod === 4) {
                if (rIndex >= 4 && i >= 3 && i <= 8) {
                    status = "rezervisano";
                }

                if (rIndex >= 6 && (i === 5 || i === 6)) {
                    status = "zauzeto";
                }
            }

            if (mod === 5) {
                if (rIndex >= 5) {
                    status = "zauzeto";

                    if (i === 2 || i === 9) {
                        status = "rezervisano";
                    }
                }

                if (rIndex <= 2) {
                    status = "slobodno";

                    if (i === 5) {
                        status = "rezervisano";
                    }
                }
            }

            sjedista.push({
                red: red,
                broj: i,
                status: status
            });
        }
    });

    return sjedista;
}

function validirajPodatke(podaci) {
    if (!podaci.projekcije || podaci.projekcije.length === 0) {
        return false;
    }

    const dozvoljeni = ["slobodno", "zauzeto", "rezervisano"];

    for (let p of podaci.projekcije) {
        for (let s of p.sjedista) {
            if (!dozvoljeni.includes(s.status)) {
                return false;
            }
        }
    }

    return true;
}
