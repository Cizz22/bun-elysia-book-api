import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger"
import { bookPlugin } from "./plugins/book.plugin";
import { HttpException } from "./exceptions/http.exception";

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
  .listen(Bun.env.PORT || 3000)

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );







