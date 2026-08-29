import { Entity, Column, PrimaryGeneratedColumn, ForeignKey, ManyToOne, JoinColumn } from "typeorm";
import { Decimal128 } from "typeorm/driver/mongodb/bson.typings.js";
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