<template>
  <div class="w-full h-screen mt-10 flex flex-col items-center">
    <div class="flex w-4/5 mb-2">
      <label class="p-1 pr-2 mr-3 border-2 border-gray-400 rounded" for="isbn">코드번호</label>
      <input class="w-10/12 p-2 border-2 border-red-200" type="number" id="isbn" v-model="book.isbn">
    </div>
    <div class="flex w-4/5 mb-2">
      <label class="p-1 pr-2 mr-3 border-2 border-gray-400 rounded" for="title">제목</label>
      <input class="w-10/12 p-2 border-2 border-red-200" type="text" id="title" v-model="book.title">
    </div>
    <div class="flex w-4/5 mb-2">
      <label class="p-1 pr-2 mr-3 border-2 border-gray-400 rounded" for="author">저자</label>
      <input class="w-10/12 p-2 border-2 border-red-200" type="text" id="author" v-model="book.author">
    </div>
    <div class="flex w-4/5 mb-2">
      <label class="p-1 pr-2 mr-3 border-2 border-gray-400 rounded" for="state">상태</label>
      <select class="p-2 w-10/12 border-2 border-red-200" id="state" v-model="book.state">
        <option value="rent">대여</option>
        <option value="return">반납</option>
      </select>
    </div>
    <div class="flex mt-10">
      <button class="p-2 mr-5 bg-gray-600 rounded text-gray-100" @click="goBack()">목록으로</button>
      <button class="p-2 bg-green-500 rounded text-white" @click="save()">{{this.book?.id ? '수정' : '등록'}}</button>
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
      if (this.$route.params.id) {
        fetch(`/api/books/${this.$route.params.id}`)
          .then(res => res.json())
          .then(data => {
            this.book = data;
          })
          .catch(() => alert('도서 정보를 가져오는데  실패하였습니다.'));
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      save() {
        if (!this.book.isbn || !this.book.title || !this.book.author || !this.book.state) {
          alert('모든 칸을 입력해주세요.');
          return;
        }

        if (this.book?.id) {
          fetch('/api/book/update', {method: 'POST', body: {id: this.$route.params.id, ...this.book}})
            .then(res => res.json())
            .then(() => {
              alert('수정되었습니다.');
              this.$router.back();
            })
            .catch(() => alert('저장에 실패하였습니다.'))
        } else {
          fetch('/api/book/create', {method: 'POST', body: {...this.book}})
            .then(res => res.json())
            .then(data => {
              alert(`${data.book.title} 도서가 등록되었습니다.`);
              this.$router.back();
            })
            .catch(() => alert('등록에 실패하였습니다.'))
        }
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