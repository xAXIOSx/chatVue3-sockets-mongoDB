<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-snackbar
        v-model="snackbar"
        color="primary"
        :timeout="6000"
        elevation="24"
        top
      >
        {{ message }}
      </v-snackbar>

      <v-card class="main-card">
        <v-card-title><h1>Fast Entry</h1></v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="NickName"
              required
            ></v-text-field>

            <v-text-field
              v-model="room"
              :counter="5"
              :rules="roomRules"
              label="Room ID"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="primary"
              class="mr-4"
              @click="submit"
            >
              Enter to room...
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  layout: "empty",
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  head: {
    title: "Entry"
  },

  data: () => ({
    valid: true,
    snackbar: false,
    message: "",
    name: "",
    nameRules: [
      v => !!v || "Please enter NickName",
      v => (v && v.length <= 10) || "NickName must be less than 10 characters"
    ],
    room: "",
    roomRules: [
      v => !!v || "Please enter room ID",
      v => (v && v.length <= 5) || "Too long room id"
    ]
  }),

  mounted() {
    const { message } = this.$route.query;
    if (message === "noUser") {
      this.message = "Enter data";
    } else if (message === "leftChat") {
      this.message = "You got out";
    }

    this.snackbar = !!this.message;
  },

  methods: {
    ...mapMutations(["setUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        console.log(user);

        this.$socket.emit("userJoined", user, data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }
    }
  }
};
</script>

<style>
.main-card {
  min-width: 600px;
  margin-top: 20px;
}
@media (max-width: 768px) {
  .main-card {
    min-width: 400px;
  }
}
@media (max-width: 576px) {
  .main-card {
    min-width: 200px;
  }
}
</style>
