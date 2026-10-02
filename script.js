/* =========================================================
   RÁKÓCZI EKULTÚRA KUPA 2.0 – LEVEL UP
   IT SZABADULÓSZOBA
   ========================================================= */

const levels = [
    {
        title: "DIGITÁLIS NYOM",
        question:
            "Mi annak a neve, amikor egy internetes forrás megbízhatóságát és hitelességét ellenőrizzük?",
        answers: ["forráskritika", "forrás kritika"],
        code: "SRC-01"
    },

    {
        title: "PASSWORD",
        question:
            "Melyik a legerősebb jelszó? A) 123456  B) jelszo123  C) R4k0cz1!_2026#IT  D) qwerty",
        answers: ["c"],
        code: "KEY-42"
    },

    {
        title: "NETWORK",
        question:
            "Melyik eszköz kapcsolja össze a különböző hálózatokat és továbbítja közöttük az adatokat?",
        answers: ["router", "útválasztó"],
        code: "NET-77"
    },

    {
        title: "EXCEL",
        question:
            "Hogyan nevezzük azt a műveletet, amikor csak bizonyos feltételeknek megfelelő sorokat jelenítünk meg egy táblázatban?",
        answers: ["szűrés", "szures"],
        code: "XLS-18"
    },

    {
        title: "QR",
        question:
            "Milyen típusú kódot kell telefonnal beolvasni ahhoz, hogy egy weboldalra vagy információra jussunk?",
        answers: ["qr", "qr kód", "qr-kód", "qr code"],
        code: "QR-90"
    },

    {
        title: "MASTER CODE",
        question:
            "Írd be a végső kódot! A korábbi szinteken kapott kódokból áll össze: SRC-01 + KEY-42 + NET-77 + XLS-18 + QR-90.",
        answers: [
            "SRC01KEY42NET77XLS18QR90",
            "SRC-01KEY-42NET-77XLS-18QR-90"
        ],
        code: "MASTER"
    }
];


/* =========================================================
   SEGÉDFÜGGVÉNYEK
   ========================================================= */

function normalize(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


/* =========================================================
   TERMINÁL
   ========================================================= */

const terminal = document.getElementById("terminal");

function terminalMessage(text, type = "", delay = 0) {

    setTimeout(() => {

        const line = document.createElement("div");

        line.className = "terminal-line";

        if (type) {
            line.classList.add(type);
        }

        line.textContent = text;

        terminal.appendChild(line);

        terminal.scrollTop = terminal.scrollHeight;

    }, delay);
}


/* =========================================================
   INDÍTÓ TERMINÁL
   ========================================================= */

function boot() {

    terminal.innerHTML = "";

    terminalMessage("> RÁKÓCZI SECURITY TERMINAL v2.0", "system", 100);

    terminalMessage("> SYSTEM INITIALIZED", "success", 500);

    terminalMessage("> ENCRYPTED CHANNEL: ACTIVE", "success", 900);

    terminalMessage("> SECURITY LOCK: ENGAGED", "warning", 1300);

    terminalMessage("> SECURITY LEVELS: 6", "system", 1700);

    terminalMessage("> WAITING FOR USER INPUT...", "system", 2200);
}


/* =========================================================
   FELADATOK LÉTREHOZÁSA
   ========================================================= */

const levelsContainer = document.getElementById("levels");

function createLevels() {

    levelsContainer.innerHTML = "";

    levels.forEach((level, index) => {

        const card = document.createElement("section");

        card.className = "level-card";

        if (index === 0) {
            card.classList.add("active");
        } else {
            card.classList.add("locked");
        }

        card.dataset.level = index + 1;

        card.innerHTML = `

            <div class="level-header">

                <div class="level-number">
                    LEVEL ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="level-status">
                    ${
                        index === 0
                            ? "● ACTIVE"
                            : "🔒 LOCKED"
                    }
                </div>

            </div>


            <div class="level-content">

                <h2>${level.title}</h2>

                <p>${level.question}</p>

                <div class="answer-area">

                    <input
                        type="text"
                        id="answer-${index}"
                        placeholder="Írd be a választ..."
                        autocomplete="off"
                        ${index !== 0 ? "disabled" : ""}
                    >

                    <button
                        type="button"
                        id="check-${index}"
                        onclick="checkAnswer(${index})"
                        ${index !== 0 ? "disabled" : ""}
                    >
                        ELLENŐRZÉS
                    </button>

                </div>

                <div
                    class="feedback"
                    id="feedback-${index}">
                </div>

            </div>
        `;

        levelsContainer.appendChild(card);


        /* ENTER billentyű */

        const input = document.getElementById(`answer-${index}`);

        input.addEventListener("keydown", function(event) {

            if (event.key === "Enter" && !input.disabled) {

                checkAnswer(index);

            }

        });

    });
}


/* =========================================================
   VÁLASZ ELLENŐRZÉSE
   ========================================================= */

function checkAnswer(index) {

    const input = document.getElementById(`answer-${index}`);

    const button = document.getElementById(`check-${index}`);

    const feedback = document.getElementById(`feedback-${index}`);

    const card = document.querySelector(
        `.level-card[data-level="${index + 1}"]`
    );


    if (!input || !button || !feedback || !card) {
        return;
    }


    const userAnswer = normalize(input.value);


    /* ÜRES VÁLASZ */

    if (userAnswer === "") {

        feedback.textContent =
            "⚠ Írd be a választ!";

        feedback.className =
            "feedback error";

        terminalMessage(
            "> ERROR: EMPTY SECURITY RESPONSE",
            "error"
        );

        return;
    }


    /* HELYES / HELYTELEN */

    const correct = levels[index].answers.some(answer => {

        return normalize(answer) === userAnswer;

    });


    /* =====================================================
       HELYTELEN VÁLASZ
       ===================================================== */

    if (!correct) {

        feedback.textContent =
            "✕ HIBÁS MEGOLDÁS – ACCESS DENIED";

        feedback.className =
            "feedback error";

        card.classList.add("wrong");

        terminalMessage(
            "> ACCESS DENIED",
            "error"
        );

        terminalMessage(
            "> INVALID SECURITY RESPONSE",
            "error",
            300
        );

        terminalMessage(
            "> TRY AGAIN...",
            "warning",
            600
        );


        /* Rövid rázás */

        setTimeout(() => {

            card.classList.remove("wrong");

        }, 700);


        return;
    }


    /* =====================================================
       HELYES VÁLASZ
       ===================================================== */

    input.disabled = true;

    button.disabled = true;

    feedback.textContent =
        "✓ HELYES MEGOLDÁS – ACCESS GRANTED";

    feedback.className =
        "feedback success";

    card.classList.remove("wrong");

    card.classList.add("done");


    /* LEVEL STATUS */

    const status = card.querySelector(".level-status");

    if (status) {

        status.textContent = "✓ UNLOCKED";

    }


    /* =====================================================
       DIGITÁLIS LAKAT – MEGFELELŐ SZÁM ZÖLD
       ===================================================== */

    const digit = document.getElementById(
        "digit" + (index + 1)
    );

    if (digit) {

        digit.classList.add("unlocked");

    }


    /* =====================================================
       TERMINÁL ÜZENETEK
       ===================================================== */

    terminalMessage(
        "> ✓ ACCESS GRANTED",
        "success"
    );

    terminalMessage(
        `> SECURITY LEVEL ${String(index + 1).padStart(2, "0")} UNLOCKED`,
        "success",
        300
    );

    terminalMessage(
        `> RECOVERY CODE: ${levels[index].code}`,
        "system",
        600
    );


    /* =====================================================
       NEM AZ UTOLSÓ SZINT
       ===================================================== */

    if (index < levels.length - 1) {

        terminalMessage(
            "> NEXT SECURITY LEVEL AVAILABLE",
            "success",
            900
        );


        unlockNextLevel(index);


        setTimeout(() => {

            const nextCard =
                document.querySelector(
                    `.level-card[data-level="${index + 2}"]`
                );

            if (nextCard) {

                nextCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }, 1100);

    }


    /* =====================================================
       UTOLSÓ SZINT
       ===================================================== */

    else {

        finishGame();

    }
}


/* =========================================================
   KÖVETKEZŐ SZINT FELoldása
   ========================================================= */

function unlockNextLevel(index) {

    const nextIndex = index + 1;

    const nextCard =
        document.querySelector(
            `.level-card[data-level="${nextIndex + 1}"]`
        );

    if (!nextCard) {
        return;
    }


    nextCard.classList.remove("locked");

    nextCard.classList.add("active");


    const input =
        document.getElementById(
            `answer-${nextIndex}`
        );

    const button =
        document.getElementById(
            `check-${nextIndex}`
        );


    if (input) {
        input.disabled = false;
    }

    if (button) {
        button.disabled = false;
    }


    const status =
        nextCard.querySelector(".level-status");

    if (status) {

        status.textContent = "● ACTIVE";

    }
}


/* =========================================================
   JÁTÉK VÉGE
   ========================================================= */

function finishGame() {

    const lockArea =
        document.querySelector(".lock-console");

    const lockStatus =
        document.getElementById("lockStatus");

    const lockMessage =
        document.getElementById("lockMessage");


    /* LAKAT FELNYITÁSA */

    if (lockArea) {

        lockArea.classList.add("unlocked");

    }


    if (lockStatus) {

        lockStatus.textContent =
            "● UNLOCKED";

    }


    if (lockMessage) {

        lockMessage.textContent =
            "✓ ALL SECURITY LEVELS UNLOCKED";

    }


    /* TERMINÁL */

    terminalMessage(
        "> MASTER CODE ACCEPTED",
        "success",
        500
    );

    terminalMessage(
        "> SECURITY LOCK: OPEN",
        "success",
        900
    );

    terminalMessage(
        "> SYSTEM RESTORED",
        "success",
        1300
    );

    terminalMessage(
        "> --------------------------------",
        "system",
        1700
    );

    terminalMessage(
        "> LEVEL UP COMPLETE",
        "success",
        2100
    );


    /* SIKER ABLAK */

    setTimeout(() => {

        showSuccessModal();

    }, 2800);
}


/* =========================================================
   SIKER MODAL
   ========================================================= */

function showSuccessModal() {

    let modal =
        document.getElementById("successModal");


    /* Ha nincs HTML-ben, létrehozzuk */

    if (!modal) {

        modal = document.createElement("div");

        modal.id = "successModal";

        modal.className = "success-modal";


        modal.innerHTML = `

            <div class="success-box">

                <div class="success-icon">
                    ✓
                </div>

                <h2>
                    LEVEL UP COMPLETE!
                </h2>

                <p>
                    Sikeresen teljesítetted
                    mind a 6 biztonsági szintet.
                </p>

                <div class="success-code">
                    SYSTEM RESTORED
                </div>

                <button
                    type="button"
                    onclick="closeSuccessModal()"
                >
                    VISSZA A PÁLYÁRA
                </button>

            </div>

        `;


        document.body.appendChild(modal);

    }


    modal.classList.add("show");
}


/* =========================================================
   MODAL BEZÁRÁSA
   ========================================================= */

function closeSuccessModal() {

    const modal =
        document.getElementById("successModal");

    if (modal) {

        modal.classList.remove("show");

    }
}


/* =========================================================
   BILLENTYŰZET – ESC
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeSuccessModal();

    }

});


/* =========================================================
   INDÍTÁS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    createLevels();

    boot();

});