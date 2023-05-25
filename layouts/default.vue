<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>List of members</v-subheader>
        <v-list-tile v-for="u in users" :key="u.id">
          <v-list-tile-content>
            <v-list-tile-title>{{ u.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon :color="u.id == user.id ? 'primary' : 'grey'"
              >circle</v-icon
            >
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <!-- <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-btn icon @click="exit">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>Room '{{ user.room }}'</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div style="height:100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      drawer: true
    };
  },
  computed: mapState(["user", "users"]),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/");
        this.clearData();
      });
    }
  }
};
</script>

<style></style>
