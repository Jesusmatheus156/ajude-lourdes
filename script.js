const CONFIG = {
    pix: "124.638.074-90",

    instagramVideo:
        "https://www.instagram.com/reel/DRcV-ET8hw/?igsh=cmprcjcxd2E3Y2x2",

    instagramProfile:
        "https://www.instagram.com/ajudeminhamaeasorrir/",

    tiktok:
        "https://www.tiktok.com/@ajudeminhamaeasorrir",

    kwai:
        "https://k.kwai.com/u/@ajudeminhamaeasorrir/"
};


// ======================================================
// QUANDO A PÁGINA TERMINAR DE CARREGAR
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    configurarLinks();

    configurarBotoesPix();

    configurarModalQR();

    configurarCompartilhamento();

});


// ======================================================
// LINKS DAS REDES SOCIAIS
// ======================================================

function configurarLinks() {

    setLink("instagramVideoBtn", CONFIG.instagramVideo);

    setLink("instagramProfileBtn", CONFIG.instagramProfile);

    setLink("tiktokBtn", CONFIG.tiktok);

    setLink("kwaiBtn", CONFIG.kwai);

}


function setLink(id, url) {

    const elemento = document.getElementById(id);

    if (!elemento) {
        console.warn(`Elemento não encontrado: #${id}`);
        return;
    }

    if (!url) {
        console.warn(`Link não configurado para: #${id}`);
        return;
    }

    elemento.href = url;

    elemento.target = "_blank";

    elemento.rel = "noopener noreferrer";

}


// ======================================================
// COPIAR PIX
// ======================================================

async function copiarPix() {

    try {

        await navigator.clipboard.writeText(CONFIG.pix);

        mostrarToast("Pix copiado ✅");

    } catch (erro) {

        console.warn("Clipboard API indisponível.", erro);

        copiarPixAlternativo();

    }

}


// Método alternativo caso navigator.clipboard não funcione

function copiarPixAlternativo() {

    const textarea = document.createElement("textarea");

    textarea.value = CONFIG.pix;

    textarea.style.position = "fixed";

    textarea.style.opacity = "0";

    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);

    textarea.focus();

    textarea.select();

    try {

        document.execCommand("copy");

        mostrarToast("Pix copiado ✅");

    } catch (erro) {

        console.error("Não foi possível copiar o Pix.", erro);

        alert(
            "Não foi possível copiar automaticamente.\n\n" +
            "Chave Pix:\n" +
            CONFIG.pix
        );

    }

    document.body.removeChild(textarea);

}


// ======================================================
// CONFIGURAR TODOS OS BOTÕES DE PIX
// ======================================================

function configurarBotoesPix() {

    const botoesPix = [
        "copyPixBtn",
        "copyPixMini",
        "copyPixBottom",
        "copyFromModal",
        "floatingDonate"
    ];

    botoesPix.forEach((id) => {

        const botao = document.getElementById(id);

        if (!botao) {
            return;
        }

        // O botão flutuante pode ter comportamento diferente
        if (id === "floatingDonate") {
            return;
        }

        botao.addEventListener("click", (evento) => {

            evento.preventDefault();

            copiarPix();

        });

    });

}


// ======================================================
// TOAST - MENSAGEM PIX COPIADO
// ======================================================

let toastTimeout;


function mostrarToast(mensagem) {

    const toast = document.getElementById("toast");

    if (!toast) {

        console.log(mensagem);

        return;

    }

    toast.textContent = mensagem;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ======================================================
// MODAL DO QR CODE
// ======================================================

function configurarModalQR() {

    const modal = document.getElementById("qrModal");

    const botaoAbrir = document.getElementById("showQrBtn");

    const botaoFechar = document.getElementById("closeQr");

    const botaoFlutuante = document.getElementById("floatingDonate");


    // Se não existe modal, simplesmente ignora
    if (!modal) {
        console.warn("Modal #qrModal não encontrado.");
        return;
    }


    // Abrir pelo botão principal

    if (botaoAbrir) {

        botaoAbrir.addEventListener("click", (evento) => {

            evento.preventDefault();

            abrirModal(modal);

        });

    }


    // Abrir pelo botão flutuante

    if (botaoFlutuante) {

        botaoFlutuante.addEventListener("click", (evento) => {

            evento.preventDefault();

            abrirModal(modal);

        });

    }


    // Fechar no X

    if (botaoFechar) {

        botaoFechar.addEventListener("click", () => {

            fecharModal(modal);

        });

    }


    // Fechar clicando fora da caixa

    modal.addEventListener("click", (evento) => {

        if (evento.target === modal) {

            fecharModal(modal);

        }

    });


    // Fechar apertando ESC

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {

            fecharModal(modal);

        }

    });

}


function abrirModal(modal) {

    modal.classList.add("open");

    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function fecharModal(modal) {

    modal.classList.remove("open");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// ======================================================
// COMPARTILHAR CAMPANHA
// ======================================================

function configurarCompartilhamento() {

    const botaoCompartilhar = document.getElementById("shareBtn");

    if (!botaoCompartilhar) {
        return;
    }


    botaoCompartilhar.addEventListener("click", async () => {

        const dados = {

            title: "Ajude Lourdes | Cirurgia Ortognática",

            text:
                "Conheça a história de Lourdes e ajude nossa campanha para a realização da cirurgia ortognática.",

            url: window.location.href

        };


        // Compartilhamento nativo do celular

        if (navigator.share) {

            try {

                await navigator.share(dados);

            } catch (erro) {

                // Usuário pode simplesmente ter cancelado
                console.log("Compartilhamento cancelado.");

            }

            return;

        }


        // Caso o navegador não tenha navigator.share

        try {

            await navigator.clipboard.writeText(window.location.href);

            mostrarToast("Link copiado ✅");

        } catch (erro) {

            copiarLinkAlternativo();

        }

    });

}


// ======================================================
// COPIAR LINK - MÉTODO ALTERNATIVO
// ======================================================

function copiarLinkAlternativo() {

    const textarea = document.createElement("textarea");

    textarea.value = window.location.href;

    textarea.style.position = "fixed";

    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    textarea.select();


    try {

        document.execCommand("copy");

        mostrarToast("Link copiado ✅");

    } catch (erro) {

        alert(
            "Copie o endereço desta página pela barra do navegador."
        );

    }


    document.body.removeChild(textarea);

}
