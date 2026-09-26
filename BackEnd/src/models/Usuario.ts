import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Pedidos } from "./Pedido";

@Entity('usuarios')
export class Usuarios {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100, nullable: false })
    nome: string

    @Column({ length: 100, nullable: false })
    email: string

    @Column({ length: 255, nullable: false })
    senha: string

    @OneToMany(() => Pedidos, (pedido) => pedido.usuario)
    pedidos: Pedidos[]
}