import readline from 'node:readline';

class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
    };
    this.maxAnimaisPorPessoa = 3;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const resultado = { lista: [] };

    const pessoa1 = this.processarBrinquedos(brinquedosPessoa1);
    if (!pessoa1) return { erro: 'Brinquedo inválido' };

    const pessoa2 = this.processarBrinquedos(brinquedosPessoa2);
    if (!pessoa2) return { erro: 'Brinquedo inválido' };

    const animaisOrdem = ordemAnimais.split(',').map(a => a.trim());
    const animaisSet = new Set();

    for (const animal of animaisOrdem) {
      if (!this.animais[animal]) return { erro: 'Animal inválido' };
      if (animaisSet.has(animal)) return { erro: 'Animal inválido' };
      animaisSet.add(animal);
    }

    let contadorP1 = 0;
    let contadorP2 = 0;

    for (const animal of animaisOrdem) {
      const info = this.animais[animal];
      let dono = 'abrigo';

      if (animal === 'Loco') {
        dono = contadorP1 < this.maxAnimaisPorPessoa ? 'pessoa 1' :
               (contadorP2 < this.maxAnimaisPorPessoa ? 'pessoa 2' : 'abrigo');
        if (dono === 'pessoa 1') contadorP1++;
        else if (dono === 'pessoa 2') contadorP2++;
        resultado.lista.push(`${animal} - ${dono}`);
        continue;
      }

      const atende = (brinquedos) => {
        let index = 0;
        for (const b of brinquedos) {
          if (b === info.brinquedos[index]) index++;
          if (index === info.brinquedos.length) return true;
        }
        return false;
      };

      const p1Atende = atende(pessoa1) && contadorP1 < this.maxAnimaisPorPessoa;
      const p2Atende = atende(pessoa2) && contadorP2 < this.maxAnimaisPorPessoa;

      if (info.tipo === 'gato') {
        if (p1Atende && !p2Atende) { dono = 'pessoa 1'; contadorP1++; }
        else if (!p1Atende && p2Atende) { dono = 'pessoa 2'; contadorP2++; }
      } else {
        if (p1Atende && !p2Atende) { dono = 'pessoa 1'; contadorP1++; }
        else if (!p1Atende && p2Atende) { dono = 'pessoa 2'; contadorP2++; }
        else if (p1Atende && p2Atende) { dono = 'abrigo'; }
      }

      resultado.lista.push(`${animal} - ${dono}`);
    }

    resultado.lista.sort();
    return resultado;
  }

  processarBrinquedos(brinquedosStr) {
    if (!brinquedosStr) return null;
    const arr = brinquedosStr.split(',').map(b => b.trim().toUpperCase());
    const set = new Set();
    for (const b of arr) {
      if (!b || set.has(b)) return null;
      set.add(b);
    }
    return arr;
  }
}

// Função para entrada de dados pelo prompt
function pedirDados() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Digite os brinquedos da pessoa 1 (separados por vírgula): ', (p1) => {
    rl.question('Digite os brinquedos da pessoa 2 (separados por vírgula): ', (p2) => {
      rl.question('Digite a ordem dos animais (separados por vírgula): ', (ordem) => {
        const abrigo = new AbrigoAnimais();
        const resultado = abrigo.encontraPessoas(p1, p2, ordem);
        console.log('\nResultado:');
        console.log(resultado);
        rl.close();
      });
    });
  });
}

// Executa a função se o arquivo for rodado diretamente
if (process.argv[1].endsWith('abrigo-animais.js')) {
  pedirDados();
}

export { AbrigoAnimais as AbrigoAnimais };
