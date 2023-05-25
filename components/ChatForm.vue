<template>
  <div class="chat__board">
    <input
      type="text"
      placeholder="Enter your message..."
      v-model="text"
      @keydown.enter="send"
    />
    <button type="button">
      <img src="../static/send.png" alt="" @click="send" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    send() {
      this.$socket.emit(
        "createMessage",
        {
          text: this.text,
          id: this.$store.state.user.id
        },
        data => {
          if (typeof data === "string") {
          } else {
            this.text = "";
          }
        }
      );
    }
  }
};
</script>

<style>
.chat__board {
  z-index: 10;
  position: fixed;
  bottom: 0;
  background: white;
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* transform: translateX(-25px); */
}

.chat__board ::-webkit-input-placeholder {
  color: #959595;
}

.chat__board input {
  width: 80%;
  min-height: 70px;
  margin: 20px 0;
  font-size: 40px;
  font-weight: 400;
  color: #393939;
  border: none;
  outline: none;
}

.chat__board button {
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
}

.chat__board button img {
  width: 90px;
}

@media (max-width: 1700px) {
  .chat__board {
    width: 83%;
  }
}
@media (max-width: 1500px) {
  .chat__board {
    width: 80%;
  }
}
@media (max-width: 1400px) {
  .chat__board {
    width: 78%;
  }
}
@media (max-width: 1264px) {
  .chat__board {
    width: 100%;
  }
}
@media (max-width: 730px) {
  .chat__board input {
    font-size: 35px;
  }
  .chat__board button img {
    width: 80px;
  }
}
@media (max-width: 425px) {
  .chat__board input {
    font-size: 30px;
  }
  .chat__board button img {
    width: 70px;
  }
}
</style>
