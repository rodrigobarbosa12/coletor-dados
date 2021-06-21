interface ListaEstoque {
  itens: Item[],
  id: string,
  titulo: string,
}

export interface Item {
  id: string,
  codigo: string,
  quantidade: number,
}

export default ListaEstoque;
