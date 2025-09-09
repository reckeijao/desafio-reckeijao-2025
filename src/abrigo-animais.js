class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex:  { tipo: "cão",    brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato",   brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato",   brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato",   brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão",    brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão",    brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] }
    };

    this.brinquedosValidos = new Set(["RATO","BOLA","LASER","CAIXA","NOVELO","SKATE"]);
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const lista1 = brinquedosPessoa1.split(",").map(x => x.trim().toUpperCase());
    const lista2 = brinquedosPessoa2.split(",").map(x => x.trim().toUpperCase());
    const ordem = ordemAnimais.split(",").map(x => x.trim());

    // valida duplicados e inválidos
    if (new Set(lista1).size !== lista1.length || new Set(lista2).size !== lista2.length) {
      return { erro: "Brinquedo inválido", lista: null };
    }
    if (![...lista1, ...lista2].every(b => this.brinquedosValidos.has(b))) {
      return { erro: "Brinquedo inválido", lista: null };
    }
    if (new Set(ordem).size !== ordem.length || !ordem.every(a => this.animais[a])) {
      return { erro: "Animal inválido", lista: null };
    }

    let adotadosP1 = 0, adotadosP2 = 0;
    const resultado = [];

    for (const nome of ordem) {
      const animal = this.animais[nome];
      let destino = "abrigo";

      const p1ok = this.verificaBrinquedos(animal, lista1);
      const p2ok = this.verificaBrinquedos(animal, lista2);

      const podeP1 = p1ok && adotadosP1 < 3;
      const podeP2 = p2ok && adotadosP2 < 3;

      if (podeP1 && !podeP2) { destino = "pessoa 1"; adotadosP1++; }
      else if (!podeP1 && podeP2) { destino = "pessoa 2"; adotadosP2++; }
      else if (podeP1 && podeP2) { destino = "abrigo"; }

      resultado.push(`${nome} - ${destino}`);
    }

    return { erro: null, lista: resultado.sort() };
  }

  verificaBrinquedos(animal, listaPessoa) {
    if (animal.tipo === "jabuti" && animal === this.animais["Loco"]) return true;

    let idx = 0;
    for (const b of listaPessoa) {
      if (b === animal.brinquedos[idx]) idx++;
      if (idx === animal.brinquedos.length) return true;
    }
    return idx === animal.brinquedos.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
