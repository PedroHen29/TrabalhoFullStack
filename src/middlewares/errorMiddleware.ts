import { ErrorRequestHandler, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    
    if (err instanceof ZodError) {

        if (err instanceof ZodError) {
        return res.status(400).json({
        message: 'Dados inválidos.',
        errors: err.issues.map((erro) => ({
            campo: erro.path.join('.'),
            message: erro.message
        }))
    })

}

    }

    if (err instanceof AppError) {

        return res.status(err.statusCode).json({
            message: err.message
        })

    }

    return res.status(500).json({
        message: 'Ocorreu um erro.'
    })

}

const notFoundMiddleware = (req: Request, res: Response) => {

    return res.status(404).json({
        message: 'Rota não encontrada.'
    })

}

export { errorMiddleware, notFoundMiddleware };