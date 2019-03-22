import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {

    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {

        return this.itens;
    }

    public incluirItem(oferta: Oferta): void {

        const itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        );

        // Return a reference of the Array's element
        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {

            itemCarrinhoEncontrado.quantidade += 1;
        } else {
            // Insert item to the shopping cart.
            this.itens.push(itemCarrinho);
        }
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {

        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {

            itemCarrinhoEncontrado.quantidade += 1;
        }
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {

        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

        if (itemCarrinhoEncontrado) {

            itemCarrinhoEncontrado.quantidade -= 1;

            // Remove the item of the Shopping Cart
            if (itemCarrinhoEncontrado.quantidade === 0) {

                const x = this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        }
    }

    public totalCarrinhoCompras(): number {

        let total = 0;

        this.itens.map((item: ItemCarrinho) => {
            total = total + (item.quantidade * item.valor);
        });

        return total;
    }

    public limparCarrinho(): void {

        this.itens = [];
    }
}

export { CarrinhoService };
