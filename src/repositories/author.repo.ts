import { PrismaClient, Prisma } from "@prisma/client";
import { HttpException } from "../exceptions/http.exception";

const prisma = new PrismaClient();

export default class AuthorRepository {
    async insertAuthor(author: Prisma.AuthorCreateInput) {
        try {
            const createdAuthor = await prisma.author.create({
                data: author,
            });

            if (!createdAuthor) {
                throw new HttpException(500, "Author not created");
            }

            return createdAuthor;
        } catch (err) {
            throw err;
        }
    }

    async getAllAuthors() {
        try {
            const authors = await prisma.author.findMany();

            return authors;
        } catch (err) {
            throw err;
        }
    }

    async getAuthorById(id: number) {
        try {
            const author = await prisma.author.findUnique({
                where: {
                    id: id,
                },
            });

            if (!author) {
                throw new HttpException(404, "Author not found");
            }

            return author;
        } catch (err) {
            throw err;
        }
    }

    async updateAuthor(id: number, author: Prisma.AuthorUpdateInput) {
        try {
            const updatedAuthor = await prisma.author.update({
                where: {
                    id: id,
                },
                data: author,
            });

            if (!updatedAuthor) {
                throw new HttpException(500, "Author not updated");
            }

            return updatedAuthor;
        } catch (err) {
            throw err;
        }
    }

    async deleteAuthor(id: number) {
        try {
            const deletedAuthor = await prisma.author.delete({
                where: {
                    id: id,
                },
            });

            if (!deletedAuthor) {
                throw new HttpException(500, "Author not deleted");
            }

            return deletedAuthor;
        } catch (err) {
            throw err;
        }
    }

    async getAuthorBooks(authorId: number) {
        try {
            const authorBooks = await prisma.author.findUnique({
                where: {
                    id: authorId,
                },
                include: {
                    books: true,
                },
            });

            if (!authorBooks) {
                throw new HttpException(404, "Author books not found");
            }

            return authorBooks;
        } catch (err) {
            throw err;
        }
    }
}