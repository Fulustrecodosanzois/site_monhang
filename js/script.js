// Importe a função initializeApp do Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

// Importe a função getDatabase do Firebase SDK
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// Importe as configurações do Firebase
import { firebaseConfig } from "./firebase-config.js";

// Inicialize o aplicativo Firebase com as configurações fornecidas
const app = initializeApp(firebaseConfig);

// Obtenha uma referência ao formulário
const form = document.getElementById('formulario');

// Adicione um ouvinte de evento para o envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evite o comportamento padrão de envio do formulário

    // Capture os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Valide se todos os campos estão preenchidos
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

    // Valide se o campo de e-mail está no formato correto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return;
    }

    // Formate os dados em um objeto
    const dadosFormulario = {
        nome: nome,
        email: email,
        assunto: assunto,
        mensagem: mensagem
    };

    // Envie os dados para o banco de dados Firebase
    const database = getDatabase(); // Obtenha uma referência ao banco de dados
    const referencia = ref(database, 'formulario'); // Crie uma referência a uma localização no banco de dados
    push(referencia, dadosFormulario); // Envie os dados para o Firebase

    // Limpe o formulário após o envio
    form.reset();
});
