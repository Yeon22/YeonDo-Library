<template>
  <h1 class="m-6 text-4xl font-bold w-full text-center">도서 관리 시스템</h1>
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
      <tr v-for="book in books" :key="book.isbn">
        <td class="p-1">{{book.isbn}}</td>
        <td class="p-2">{{book.title}}</td>
        <td class="p-1">
          {{book.author}}
        </td>
        <td class="p-0.5">{{book.state === 'rent' ? '대여' : '반납'}}</td>
        <td class="p-0.5">
          <button v-if="book.state === 'rent'" class="bg-blue-200 p-1 rounded-sm" @click="bookReturn(book.isbn)">
            반납하기
          </button>
          <button v-else class="bg-red-200 p-1 rounded-sm" @click="bookRent(book.isbn)">
            대여하기
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'App',
  methods: {
    bookRent(isbn) {
      console.log('rent', isbn)
    },
    bookReturn(isbn) {
      console.log('return', isbn)
    }
  },
  data() {
    return {
      books: [],
    }
  },
  created() {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => {
        this.books = data.books
      })
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

table tr td {
  word-break: keep-all;
}
</style>
