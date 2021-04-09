<template>
  <h1 class="m-6 text-4xl font-bold w-full text-center">도서 관리 시스템</h1>
  <div class="w-full flex justify-between">
    <div class="m-5">
      <select class="mr-5 border-2 border-light-blue-500 border-opacity-25 p-1.5" name="searchType" v-model="searchType">
        <option value="">전체</option>
        <option value="isbn">코드번호</option>
        <option value="title">도서명</option>
        <option value="author">저자</option>
        <option value="status">상태</option>
      </select>
      <input class="mr-5 bg-gray-50 p-1 border-2" type="text" name="search" v-model="searchText">
      <button class="bg-gray-300 rounded p-1 px-5" @click="search()">검색</button>
    </div>
    <div class="m-5">
      <select class="mr-5 border-2 border-light-blue-500 border-opacity-25 p-1.5" name="sorting" v-model="sortType">
        <option value="">전체</option>
        <option value="ascending">오름차순</option>
        <option value="descending">내림차순</option>
      </select>
      <button class="bg-gray-300 rounded p-1 px-5" @click="sorting()">정렬</button>
    </div>
  </div>
  <table class="table-auto m-4 text-center">
    <thead>
      <tr class="font-medium text-lg bg-green-200">
        <th class="w-1/6">코드번호</th>
        <th class="w-1/3">도서명</th>
        <th class="w-1/6">저자</th>
        <th class="w-1/6">상태</th>
        <th class="w-1/4">상태 변경</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.id" class="hover:bg-gray-200" @click="goBook(book.id)">
        <td class="p-1">{{book.isbn}}</td>
        <td class="p-2">{{book.title}}</td>
        <td class="p-1">{{book.author}}</td>
        <td class="p-0.5">{{book.state === 'rent' ? '대여' : '반납'}}</td>
        <td class="p-0.5">
          <button v-if="book.state === 'rent'" class="bg-blue-200 p-1 rounded-sm" @click.stop="bookStateChange(book)">
            반납하기
          </button>
          <button v-else class="bg-red-200 p-1 rounded-sm" @click.stop="bookStateChange(book)">
            대여하기
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      books: [],
      searchText: '',
      searchType: '',
      sortType: ''
    }
  },
  created() {
    this.booksFetch();
  },
  methods: {
    goBook(bookId) {
      this.$router.push(`/${bookId}`);
    },
    bookStateChange(book) {
      fetch('/api/book', {method: 'PATCH', body: {id: book.id, state: book.state}})
        .then((res) => res.json())
        .then(data => {
          const newBooks = [...this.books];
          const findIndex = this.books.findIndex(book => book.isbn === data.isbn);
          newBooks.splice(findIndex, 1, data);
          this.books = newBooks;
        })
        .catch(err => console.error(err))
    },
    booksFetch() {
      fetch("/api/books")
        .then((res) => res.json())
        .then((data) => {
          this.books = data.books
        })
    },
    search() {
      fetch('/api/books/search', {method: 'POST', body: {type: this.searchType, text: this.searchText}})
        .then(res => res.json())
        .then(data => {
          this.books = data;
        });
    },
    ascending(a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    },
    descending(a, b) {
      if (a.title < b.title) {
        return 1;
      }
      if (a.title > b.title) {
        return -1;
      }
      return 0;
    },
    sorting() {
      switch (this.sortType) {
        case 'ascending':
          this.books = [...this.books.sort(this.ascending)];
          break;
        case 'descending':
          this.books = [...this.books.sort(this.descending)];
          break;
      }
    }
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

table tbody tr {
  border: 1px solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
}

table tr td {
  word-break: keep-all;
}
</style>
