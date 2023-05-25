<template>
  <div class="">
    <div v-if="name === 'admin'" class="system">
      <p class="text-xc-center">{{ text }}</p>
      <hr />
    </div>
    <div v-else>
      <div class="message-wrapper">
        <div class="message" :class="{ owner }">
          <small><strong>{{ name }}</strong></small>
          <p>{{ text }}</p>
          <div class="time" style="text-align:end">{{ time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    time: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="stylus" scoped>
.system{
    margin: 1rem auto;
    width 85%;
    p {
            margin-bottom: 1rem;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
    }
}

.message-wrapper {
    padding: 0 15px;
    display: grid;
}
.message {
    width: 800px;
    min-height: 150px;
    padding: 15px;
    color: white;
    font-weight: 400;
    font-size: 25px;
    border-radius: 10px;
    margin: 15px 0;
    position: relative;
    background: #6678D9;
    word-break: break-all;
    justify-self: start;
    p {
        font-weight: 400;
    }
}
.time {
    font-size: 15px
    color: rgb(49, 49, 49);
}
.owner {
    background: #D97575;
    justify-self: end;
}
@media(max-width: 1919px){
    .message {
        width:700px;
    }

}
@media(max-width: 730px){
    .message {
        width:400px;
    }

}
@media(max-width: 425px){
    .message {
        width:300px;
    }

}
</style>
