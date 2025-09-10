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

  encontraPessoas(b1, b2, ordem) {
    const p1 = b1.split(',').map(s => s.trim());
    const p2 = b2.split(',').map(s => s.trim());
    const ordemArr = ordem.split(',').map(s => s.trim());

    let resultado = this.processaAdocao(p1, p2, ordemArr);

    if(resultado.lista) { 
      resultado.lista = resultado.lista.map(item => `${item.animal} - ${item.destino}`);
    }

    return resultado;

  }

  processaAdocao(p1, p2, ordem) {
    //verifica duplicados
    if(new Set(p1).size !== p1.length || new Set(p2).size !== p2.length) {
      return { erro: 'Brinquedo inválido', lista: null };
    }
    if(new Set(ordem).size !== ordem.length || !ordem.every(nome => this.animais[nome])) {
      return { erro: 'Animal inválido', lista: null };
    }
    //verifica animais inválidos
    if(!ordem.every(nome => this.animais[nome])) {
      return { erro: 'Animal inválido', lista: null };
    }
    //verifica brinquedos inválidos
    if(!p1.every(b => this.brinquedosValidos.has(b)) || 
      !p2.every(b => this.brinquedosValidos.has(b))) {
      return { erro: 'Brinquedo inválido', lista: null };
    }

    let adotadosP1 = 0;
    let adotadosP2 = 0;
    const resultado = [];

    for(const nome of ordem) {
      const animal = this.animais[nome];
      let destino = 'abrigo';

      const p1ok = this.satisfaz(animal, p1) && adotadosP1 < 3;
      const p2ok = this.satisfaz(animal, p2) && adotadosP2 < 3;

      if (p1ok && !p2ok) {
        destino = 'pessoa 1';
        adotadosP1++;
      } else if (!p1ok && p2ok) {
        destino = 'pessoa 2';
        adotadosP2++;
      } else if (p1ok && p2ok) {
        destino = 'abrigo';
      }
      resultado.push({ animal: nome, destino });
    }
    //ordena lista por nome do animal
    resultado.sort((a, b) => a.animal.localeCompare(b.animal));
    
    return { erro: null, lista: resultado };
  }

  satisfaz(animal, brinquedosPessoa) {
    if(animal === this.animais['Loco']) return true;

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