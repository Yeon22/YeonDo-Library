import { Server, Model, Response } from "miragejs";
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

      this.post('/book/update', (schema, request) => {
        if (!request.requestBody?.id) {
          return new Response(400, null, {errors: ['Bad Request']});
        }

        return this.db.books.update(request.requestBody.id, {...request.requestBody})
      });

      this.post('/book/create', (schema, request) => {
        const {isbn, title, author, state} = request.requestBody;
        if (!isbn || !title || !author || !state) {
          return new Response(400, null, {errors: ['Bad Request']});
        }

        if (this.db.books.findBy({isbn: Number(isbn)})) {
          return new Response(400, null, {erros: ['Already Exist']});
        }

        return schema.books.create({...request.requestBody, isbn: Number(isbn)});
      });

      this.post('/books/search', (schema, request) => {
        const {type, text} = request.requestBody;
        const searchText = text.toLowerCase();
        const searchState = text.includes('반납') ? 'return' : text.includes('대여') ? 'rent' : '';

        switch (type) {
          case 'title':
            return this.db.books.filter(book => book.title.toLowerCase().includes(searchText));
          case 'isbn':
            return this.db.books.filter(book => String(book.isbn).includes(text));
          case 'author':
            return this.db.books.filter(book => book.author.toLowerCase().includes(searchText));
          case 'state':
            return this.db.books.filter(book => book.state === searchState);
          default:
            return this.db.books.filter(book => book.title.toLowerCase().includes(searchText) || String(book.isbn).includes(text) || book.author.toLowerCase().includes(searchText) || book.state === searchState);
        }
      });
    },
  });

  return server;
}
