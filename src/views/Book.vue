<template>
  <div class="w-full h-screen mt-10 flex flex-col items-center">
    <div class="flex w-4/5 mb-2">
      <label class="p-2" for="isbn">코드번호 : </label>
      <input class="w-11/12 p-1" type="text" id="isbn" v-model="book.isbn">
    </div>
    <div class="flex w-4/5 mb-2">
      <label class="p-2" for="title">제목 : </label>
      <input class="w-11/12 p-1" type="text" id="title" v-model="book.title">
    </div>
    <div class="flex w-4/5 mb-2">
      <label class="p-2" for="author">저자 : </label>
      <input class="w-11/12 p-1" type="text" id="author" v-model="book.author">
    </div>
    <div class="flex w-4/5 mb-2">
      <label class="p-2" for="state">상태</label>
      <select class="p-1 w-11/12" id="state" v-model="book.state">
        <option value="rent">대여</option>
        <option value="return">반납</option>
      </select>
    </div>
    <div class="flex">
      <button class="p-2 mr-5 bg-gray-600 rounded text-gray-100" @click="goBack()">목록으로</button>
      <button class="p-2 bg-green-500 rounded text-white" @click="save()">저장</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Book',
    data() {
      return {
        book: {
          isbn: null,
          title: '',
          author: '',
          state: null
        }
      }
    },
    created() {
      fetch(`/api/books/${this.$route.params.id}`)
        .then(res => res.json())
        .then(data => {
          this.book = data;
        });
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      save() {

      }
    }
  }
</script>

<style>
  div {
    font-size: 1.2rem;
  }

  label {
    font-size: 1.4rem;
    font-weight: 600;
  }
</style>