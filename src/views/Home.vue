<template>
  <h1 class="m-6 text-4xl font-bold w-full text-center">도서 관리 시스템</h1>
  <div class="w-full flex-none justify-between md:flex">
    <div class="flex m-5">
      <select class="mr-2 border-2 border-light-blue-500 border-opacity-25 p-1.5" name="searchType" v-model="searchType">
        <option value="">전체</option>
        <option value="isbn">코드번호</option>
        <option value="title">도서명</option>
        <option value="author">저자</option>
        <option value="state">상태</option>
      </select>
      <input class="mr-3 bg-gray-50 p-1 border-2" type="text" name="search" v-model="searchText">
      <button class="bg-gray-300 rounded p-1 px-5" @click="search()">검색</button>
    </div>
    <div class="flex m-5">
      <select class="mr-2 border-2 border-light-blue-500 border-opacity-25 p-1.5" name="sorting-target" v-model="sortTarget">
        <option value="isbn">코드번호</option>
        <option value="title">도서명</option>
        <option value="author">저자</option>
        <option value="state">상태</option>
      </select>
      <select class="mr-2 border-2 border-light-blue-500 border-opacity-25 p-1.5" name="sorting" v-model="sortType">
        <option value="ascending">오름차순</option>
        <option value="descending">내림차순</option>
      </select>
      <button class="bg-gray-300 rounded p-1 px-5" @click="sorting()">정렬</button>
    </div>
  </div>
  <table class="table-auto w-full text-center">
    <thead>
      <tr class="font-medium text-lg bg-green-200">
        <th class="w-1/8">코드<br/>번호</th>
        <th class="w-2/6">도서명</th>
        <th class="w-1/6">저자</th>
        <th class="w-1/6">상태</th>
        <th class="w-1/6">상태<br/>변경</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books" :key="book.isbn" class="hover:bg-gray-200" @click="goBook(book.id)">
        <td class="p-1">{{book.isbn}}</td>
        <td class="p-2">{{book.title}}</td>
        <td class="p-1">{{book.author}}</td>
        <td class="p-0.5">{{book.state === 'rent' ? '대여' : '반납'}}</td>
        <td class="p-0.5">
          <button v-if="book.state === 'rent'" class="bg-blue-200 p-1 rounded-sm" @click.stop="bookStateChange(book)">
            반납
          </button>
          <button v-else class="bg-red-200 p-1 rounded-sm" @click.stop="bookStateChange(book)">
            대여
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="w-full bg-yellow-200 p-1 mt-2 text-yellow-900" @click="goCreate()">등록하기</button>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      books: [],
      searchText: '',
      searchType: '',
      sortTarget: 'title',
      sortType: 'ascending'
    }
  },
  created() {
    this.booksFetch();
  },
  methods: {
    goBook(bookId) {
      this.$router.push(`/books/${bookId}`);
    },
    goCreate() {
      this.$router.push('/books/create');
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
      if (a[this.sortTarget] > b[this.sortTarget]) {
        return 1;
      }
      if (a[this.sortTarget] < b[this.sortTarget]) {
        return -1;
      }
      return 0;
    },
    descending(a, b) {
      if (a[this.sortTarget] < b[this.sortTarget]) {
        return 1;
      }
      if (a[this.sortTarget] > b[this.sortTarget]) {
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
table tbody tr {
  border: 1px solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
}

table tr td {
  word-break: keep-all;
}
</style>
