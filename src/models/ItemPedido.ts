import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Pedidos } from "./Pedido"
import { Produtos } from "./Produto"

@Entity('itens_pedido')
export class ItemPedido {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantidade: number

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precoUnitario: number
    
    @ManyToOne(() => Pedidos)
    @JoinColumn({name: 'pedidoId'})
    pedido: Pedidos

    @ManyToOne(() => Produtos)
    @JoinColumn({name: 'produtoId'})
    produto: Produtos
}