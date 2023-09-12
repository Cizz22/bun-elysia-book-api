import { PrismaClient, Prisma } from "@prisma/client";
import { HttpException } from "../exceptions/http.exception";

const prisma = new PrismaClient()

export default class BookRepository {
    async insertBook(book: Prisma.BookCreateInput) {
        try {
            const createdBook = await prisma.book.create({
                data: book,
            });

            if (!createdBook) {
                throw new HttpException(500, "Book not created");
            }

            return createdBook;
        } catch (err) {
            throw err;
        }
    }

    async getAllBooks() {
        try {
            const books = await prisma.book.findMany();

            return books;
        } catch (err) {
            throw err;
        }
    }

    async getBookById(id: number) {
        try {
            const book = await prisma.book.findUnique({
                where: {
                    id: id,
                },
            });

            if (!book) {
                throw new HttpException(404, "Book not found");
            }

            return book;
        } catch (err) {
            throw err;
        }

    }

    async updateBook(id: number, book: Prisma.BookUpdateInput) {
        try {
            const updatedBook = await prisma.book.update({
                where: {
                    id: id,
                },
                data: book,
            });

            if (!updatedBook) {
                throw new HttpException(500, "Book not updated");
            }
            return updatedBook;
        } catch (err) {
            throw err;
        }
    }

    async deleteBook(id: number) {
        try {
            const deletedBook = await prisma.book.delete({
                where: {
                    id: id,
                },
            });

            if (!deletedBook) {
                throw new HttpException(500, "Book not deleted");
            }
        } catch (err) {
            throw err;
        }
    }
}

