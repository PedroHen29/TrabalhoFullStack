import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Usuarios } from "./Usuario";

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

}