<template>
  <div id="chat">
    <div class="chat__field">
      <Message
        v-for="m in messages"
        :key="m.id"
        :name="m.name"
        :text="m.text"
        :time="m.time"
        :owner="m.id === user.id || m.name == user.name"
      />
    </div>
    <div class="chat__form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Message from "@/components/Message.vue";
import ChatForm from "@/components/ChatForm.vue";
export default {
  middleware: ["chat"],
  head() {
    return {
      title: `Room | ${this.user.room}`
    };
  },
  components: { Message, ChatForm },
  computed: mapState(["user", "messages"])
};
</script>

<style scoped>
#chat {
  margin-top: -10px;
  background: url("../static/bumaga-myataya-fon.jpg");
  background-attachment: fixed;
  height: 100%;
}
.chat__field {
  /* transform: translateY(-20px); */
  height: 100%;
  position: relative;
}

.chat__form {
  min-height: 75px;
}

</style>
