interface ListaEstoque {
  itens: Item[],
  id: string,
  titulo: string,
}

export interface Item {
  id: string,
  codigo: number,
  quantidade: number,
}

export default ListaEstoque;
