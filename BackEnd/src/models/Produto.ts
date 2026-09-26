import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemPedido } from "./ItemPedido";


@Entity('produtos')
export class Produtos {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 100})
    nome: string

    @Column({type: 'decimal', precision: 10, scale: 2})
    preco: number

    @Column()
    estoque: number

    @OneToMany(() => ItemPedido, item => item.produto)
    itens: ItemPedido[]
}