import BookRepository from "../repositories/book.repo";
import { Prisma } from "@prisma/client";

export default class BookController {
    constructor(private readonly bookRepository: BookRepository) { }

    async insertBook(book: Prisma.BookCreateInput) {
        const createdBook = await this.bookRepository.insertBook(book);

        return {
            message: "Book created successfully",
            data: createdBook,
        }
    }

    async getAllBooks() {
        const books = await this.bookRepository.getAllBooks();

        return {
            message: "Books retrieved successfully",
            data: books,
        }
    }

    async getBookById(id: number) {
        const book = await this.bookRepository.getBookById(id);

        return {
            message: "Book retrieved successfully",
            data: book,
        }
    }

    async updateBook(id: number, book: Prisma.BookUpdateInput) {
        const updatedBook = await this.bookRepository.updateBook(id, book);

        return {
            message: "Book updated successfully",
            data: updatedBook,
        }
    }

    async deleteBook(id: number) {
        await this.bookRepository.deleteBook(id);

        return {
            message: "Book deleted successfully",
        }
    }

}