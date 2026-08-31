import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Usuarios } from "./Usuario";
import { ItemPedido } from "./ItemPedido";

@Entity('pedidos')
export class Pedidos{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    data: Date

    @Column({type: 'decimal', precision: 10, scale: 2})
    valorTotal: number

    @ManyToOne(() => Usuarios)
    @JoinColumn({name: 'usuarioId'})
    usuario: Usuarios

    @OneToMany(() => ItemPedido, item => item.pedido)
    itens: ItemPedido[]
}