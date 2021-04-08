import { Server, Model } from "miragejs";
import isbn from './assets/isbn.json';

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    environment,

    models: {
      book: Model,
    },

    seeds(server) {
      const books = isbn;
      for (let index = 0; index < books.length; index++) {
        server.create("book", books[index]);
      }
    },

    routes() {
      this.namespace = "api";

      this.get("/books", schema => schema.books.all())
    },
  });

  return server;
}
