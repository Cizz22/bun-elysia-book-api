import AuthorRepository from "../repositories/author.repo";
import { Prisma } from "@prisma/client";

export default class AuthorController {
    constructor(private readonly authorRepository: AuthorRepository) { }

    async insertAuthor(author: Prisma.AuthorCreateInput) {
        const createdAuthor = await this.authorRepository.insertAuthor(author);

        return {
            message: "Author created successfully",
            data: createdAuthor,
        }
    }

    async getAllAuthors() {
        const authors = await this.authorRepository.getAllAuthors();

        return {
            message: "Authors retrieved successfully",
            data: authors,
        }
    }

    async getAuthorById(id: number) {
        const author = await this.authorRepository.getAuthorById(id);

        return {
            message: "Author retrieved successfully",
            data: author,
        }
    }

    async updateAuthor(id: number, author: Prisma.AuthorUpdateInput) {
        const updatedAuthor = await this.authorRepository.updateAuthor(id, author);

        return {
            message: "Author updated successfully",
            data: updatedAuthor,
        }
    }

    async deleteAuthor(id: number) {
        await this.authorRepository.deleteAuthor(id);

        return {
            message: "Author deleted successfully",
        }
    }

    async addBookToAuthor(authorId: number, bookId: number) {
        const addBook = await this.authorRepository.updateAuthor(authorId, {
            books: {
                connect: {
                    id: bookId,
                },
            },
        })
    }

    async getAuthorBooks(authorId: number) {
        const authorBooks = await this.authorRepository.getAuthorBooks(authorId);

        return {
            message: "Author books retrieved successfully",
            data: authorBooks,
        }
    }
}
