import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ length: 50, nullable: true })
    cpf: string

    @Column({ length: 50, nullable: true })
    telefone: string
}