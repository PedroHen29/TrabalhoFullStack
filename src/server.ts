import express, { Application } from "express";
import { AppDataSource } from "./database/dataSource";
import usuarioRouter from "./routes/usuarioRoutes";
import pedidoRouter from "./routes/pedidoRoutes"
import {
    errorMiddleware,
    notFoundMiddleware
} from "./middlewares/errorMiddleware";

const app: Application = express()

const PORT: number = Number("3000")

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Servidor rodando ')
})

app.use('/usuarios', usuarioRouter)
app.use('/pedidos', pedidoRouter)

app.use(notFoundMiddleware)

app.use(errorMiddleware)

AppDataSource.initialize().then(() => {

    console.log('Servidor iniciado');

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    })

}).catch((error) => {

    console.error('Erro ao tentar se conectar', error)

})