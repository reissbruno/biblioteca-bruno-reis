export interface Loan {
  paraQuem: string;
  contato?: string;
  dataEmprestimo: string;
  dataPrevistaDevolucao?: string;
  observacoes?: string;
}

export interface LoanHistory {
  paraQuem: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  observacoes?: string;
  atrasoDias: number;
}

export type BookStatus = 'disponivel' | 'emprestado';
export type BookFormat = 'fisico' | 'digital';

export interface Book {
  id: string;
  titulo: string;
  subtitulo?: string;
  autores: string[];
  editora: string;
  paginas: number;
  capaUrl?: string;
  formato: BookFormat;
  ano?: number;
  edicao?: string;
  isbn10?: string;
  isbn13?: string;
  idioma: string;
  tags: string[];
  sinopse?: string;
  avaliacao: number;
  status: BookStatus;
  emprestimoAtual?: Loan;
  historicoEmprestimos: LoanHistory[];
  favorito: boolean;
  criadoEm: string;
  atualizadoEm: string;
}
