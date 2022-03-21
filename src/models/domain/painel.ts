export interface Painel {
    codigo?: number;
    valorCota?: number;
    premioPrincipal?: number;
    premioSecundario?: number;
    premioPeFrio?: number;
    premioAcumulado?: number;
    taxaAdministrativa?: number;
    mesReferencia?: string;
    aberturaSistema?: string;
    fechamentoSistema?: string;
    primeiroSorteio?: string;
    totalParticipantes?: number;
}