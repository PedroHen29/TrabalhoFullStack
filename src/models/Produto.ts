import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}