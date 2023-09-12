import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger"

import { HttpException } from "./exceptions/http.exception";

import { bookPlugin } from "./plugins/book.plugin";
import { authorPlugin } from "./plugins/author.plugin";



const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: "Book API",
        version: "1.0.0",
      }
    }
  }))
  .onError(({ error, set }) => {
    if (error instanceof HttpException) {
      set.status = error.code
      return {
        message: error.message
      }
    }
  })
  .get("/", ({ set }) => {
    set.status = 200
    return {
      message: "Api is running"
    }
  })
  .use(bookPlugin)
  .use(authorPlugin)
  .listen(Bun.env.PORT || 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);







