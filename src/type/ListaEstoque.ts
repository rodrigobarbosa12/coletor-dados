interface ListaEstoque {
  itens: Item[],
  id: string,
  titulo: string,
}

export interface Item {
  id: string,
  nome: string,
  codigo: string,
  quantidade: number,
}

export default ListaEstoque;
