import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const form = document.getElementById('formulario');

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return;
    }
    if (email === '') {
        alert('Por favor, preencha o campo Email.');
        return;
    }
    if (assunto === '') {
        alert('Por favor, preencha o campo Assunto.');
        return;
    }
    if (mensagem === '') {
        alert('Por favor, preencha o campo Mensagem.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }


    const dataHoraAtualBrasilia = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const dadosFormulario = {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem,
        dataHoraEnvio: dataHoraAtualBrasilia
    };

    const database = getDatabase();
    const referencia = ref(database, 'formulario');
    push(referencia, dadosFormulario);

    alert("MENSAGEM ENVIADA COM SUCESSO!!!")

    form.reset();
});
