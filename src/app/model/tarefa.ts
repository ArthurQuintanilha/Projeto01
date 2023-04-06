export class Tarefa {

    id: number;

    descricao: string; termino: string;

    situacao: boolean;

    constructor() {

        this.id = 0;
        this.descricao = "";
        this.termino = new Date().toISOString();
        this.situacao = false;
    }
}