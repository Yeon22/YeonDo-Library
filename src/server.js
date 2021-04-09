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

      this.get("/books", schema => schema.books.all());

      this.get('/books/:id', (schema, request) => {
        return schema.books.find(request.params.id).attrs;
      });

      this.patch('/book', (schema, request) => {
        const {state, id} = request.requestBody;
        return this.db.books.update(id, {state: state === 'rent' ? 'return' : 'rent'});
      });

      this.post('/books/search', (schema, request) => {
        const {type, text} = request.requestBody;
        switch (type) {
          case 'title':
            return this.db.books.filter(book => book.title.includes(text));
          case 'isbn':
            return this.db.books.filter(book => String(book.isbn).includes(text));
          case 'author':
            return this.db.books.filter(book => book.author.includes(text));
          default:
            return this.db.books.filter(book => book.title.includes(text) || String(book.isbn).includes(text) || book.state.includes(text) || book.author.includes(text));
        }
      });
    },
  });

  return server;
}
