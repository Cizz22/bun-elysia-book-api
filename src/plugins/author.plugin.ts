import { Elysia, t } from 'elysia'

import AuthorController from '../controllers/author.controller'
import AuthorRepository from '../repositories/author.repo'

const authorRepo = new AuthorRepository()
const authorController = new AuthorController(authorRepo)

export const authorPlugin = new Elysia()
    .group('/authors', app => app
        .post('/', async ({ body, set }) => {
            const result = await authorController.insertAuthor(body)

            set.status = 201
            return result
        }, {
            body: t.Object({
                name: t.String(),
                age: t.Number(),

            })
        })
        .get('/', async ({ set }) => {
            const result = await authorController.getAllAuthors()

            set.status = 200
            return result
        })

        .group('/:id', app => app
            .get('/', async ({ params, set }) => {
                const result = await authorController.getAuthorById(+params.id)

                set.status = 200
                return result
            })
            .get('/books', async ({ params, set }) => {
                const result = await authorController.getAuthorBooks(+params.id)

                set.status = 200
                return result
            })
            .post('/books', async ({ params, body, set }) => {
                const result = await authorController.addBookToAuthor(+params.id, body.bookId)

                set.status = 200
                return result
            }, {
                body: t.Object({
                    bookId: t.Number(),
                })
            })
            .delete('/', async ({ params, set }) => {
                const result = await authorController.deleteAuthor(+params.id)

                set.status = 200
                return result
            })
            .put('/', async ({ params, body, set }) => {
                const result = await authorController.updateAuthor(+params.id, body)

                set.status = 200
                return result
            }, {
                body: t.Object({
                    name: t.String(),
                    age: t.Number(),
                }),
            })
        )




    )
