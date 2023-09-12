
import { Elysia, t } from "elysia"

import BookController from "../controllers/book.controller"
import BookRepository from "../repositories/book.repo"

const bookRepo = new BookRepository()
const bookController = new BookController(bookRepo)

export const bookPlugin = new Elysia()
    .group("/books", app => app
        .post("/", async ({ body, set }) => {
            const result = await bookController.insertBook(body)

            set.status = 201
            return result
        },
            {
                body: t.Object({
                    title: t.String(),
                    year: t.Number(),
                }),
            }
        )
        .get("/", async ({ set }) => {
            const result = await bookController.getAllBooks()

            set.status = 200
            return result
        })
        .get("/:id", async ({ params, set }) => {
            const result = await bookController.getBookById(+params.id)

            set.status = 200
            return result
        })
        .put("/:id", async ({ params, body, set }) => {
            const result = await bookController.updateBook(+params.id, body)

            set.status = 200
            return result
        },
            {
                body: t.Object({
                    title: t.String(),
                    year: t.Number(),
                }),
            }
        )
        .delete("/:id", async ({ params, set }) => {
            const result = await bookController.deleteBook(+params.id)

            set.status = 200
            return result
        })
    )