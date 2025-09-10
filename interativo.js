import { AbrigoAnimais } from './src/abrigo-animais.js';

const abrigo = new AbrigoAnimais();

const perguntas = [
  'Digite os brinquedos da pessoa 1 (separados por vírgula): ',
  'Digite os brinquedos da pessoa 2 (separados por vírgula): ',
  'Digite a ordem dos animais (separados por vírgula): '
];

const respostas = [];

process.stdout.write(perguntas[0]);

process.stdin.on('data', (input) => {
  respostas.push(input.toString().trim());

  if (respostas.length < perguntas.length) {
    process.stdout.write(perguntas[respostas.length]);
  } else {
    // temos todas as respostas
    const resultado = abrigo.encontraPessoas(respostas[0], respostas[1], respostas[2]);

    if (resultado.erro) {
      console.log('Erro:', resultado.erro);
    } else {
      console.log('Resultado final:');
      resultado.lista.forEach(l => console.log(l));
    }

    process.exit();
  }
});
