import readline from 'node:readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
    this.brinquedosValidos = new Set(
      Object.values(this.animais).flatMap(a => a.brinquedos)
    );
}

encontraPessoas() {
  rl.question('brinquedos da pessoa 1: ', (brinquedosPessoa1) => {
    const p1 = brinquedosPessoa1.split(',').map(s => s.trim());
    rl.question('brinquedos da pessoa 2: ', (brinquedosPessoa2) => {
      const p2 = brinquedosPessoa2.split(',').map(s => s.trim());
      rl.question('ordem dos animais: ', (ordemAnimais) => {
        const ordem = ordemAnimais.split(',').map(s => s.trim());
        rl.close();
        const resultado = this.processaAdocao(p1, p2, ordem);
        if (resultado.erro) {
          console.log('Erro:', resultado.erro);
        } else {
          console.log('Resultado:', resultado.lista);
        }
      });
    });
  });
}

processaAdocao(p1, p2, ordem) {
  if(new Set(p1).size !== p1.length || new Set(p2).size !== p2.length) {
    return { erro: 'Brinquedo repetido', lista: null };
  }
  if(new Set(ordem).size !== ordem.length) {
    return { erro: 'Animal repetido', lista: null };
  }
  if(!ordem.every(nome => this.animais[nome])) {
    return { erro: 'Animal inválido', lista: null };
  }

  let adotadosP1 = 0;
  let adotadosP2 = 0;
  const resultado = [];

  for(const nome of ordem) {
    const animal = this.animais[nome];
    let destino = 'abrigo';

    const p1ok = this.satisfaz(animal, p1) && adotadosP1 < 3;
    const p2ok = this.satisfaz(animal, p2) && adotadosP2 < 3;

    if(p1ok && !p2ok) {
      destino = 'pessoa 1';
      adotadosP1++;
    } else if(!p1ok && p2ok) {
      destino = 'pessoa 2';
      adotadosP2++;
    } else if(p1ok && p2ok) {
      destino = 'abrigo';
    }
    resultado.push({ animal: nome, destino });
  }

  resultado.sort((a, b) => a.animal.localeCompare(b.animal));

  return { erro: null, lista: resultado };
}

  satisfaz(animal, brinquedosPessoa) {
    if(animal.tipo === 'jabuti' && animal === this.animais['Loco']) {
      return true;
    }

    const seq = animal.brinquedos;
    let i = 0;
    for (const b of brinquedosPessoa) {
      if (b === seq[i]) {
        i++;
        if (i === seq.length) return true;
      }
    }
    return i === seq.length;
}
}

export { AbrigoAnimais as AbrigoAnimais };