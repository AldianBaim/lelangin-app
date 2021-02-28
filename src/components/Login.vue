<template>
  <v-form
    ref="form"
    class="d-flex justify-center teal align-center"
    style="height: 100vh"
    lazy-validation
    @submit.prevent="login()"
  >
    <v-card
      width="500"
      class="pb-2 px-3"
      elevation="9"
      rounded="tl-xl br-xl"
      flat
      :loading="$store.state.loading"
    >
      <v-card-title>
        <h2 class="mx-auto">Form login</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          type="email"
          :rules="emailRules"
          v-model="user.email"
        ></v-text-field>
        <v-text-field
          label="Password"
          prepend-icon="mdi-key"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :rules="passwordRules"
          v-model="user.password"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn type="submit" color="teal white--text"
          ><v-icon class="mr-1">mdi-login</v-icon> Login</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="purple white--text" to="/register"
          ><v-icon class="mr-1">mdi-account-circle</v-icon> Register</v-btn
        >
      </v-card-actions>
    </v-card>
    <div class="text-center">
      <v-snackbar
        v-model="$store.state.snackbar"
        :multi-line="$store.state.multiLine"
        absolute
        color="deep-purple accent-4"
        shaped
        timeout="5000"
      >
        {{ $store.state.text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="$store.state.snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      showPassword: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    ...mapActions(["doLogin"]),
    login() {
      this.doLogin(this.user);
    },
  },
};
</script>

<style>
.box {
  position: absolute;
  content: "";
  top: 40%;
  left: 50%;
  width: 70px;
  height: 70px;
  transform: translate(-50%, 100%);
  background: rgb(191, 111, 111);
  border-radius: 50%;
  backdrop-filter: blur(1px);
  z-index: 1;
}

.box2 {
  position: absolute;
  content: "";
  top: -5%;
  left: 69%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: translate(-50%, 100%);
  background: rgb(61, 220, 61);
  backdrop-filter: blur(1px);
  z-index: 1;
}

.box3 {
  position: absolute;
  content: "";
  top: 9%;
  left: 35%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transform: translate(-50%, 100%);
  background: rgb(205, 228, 102);
  backdrop-filter: blur(1px);
  z-index: 1;
}
@media screen and (min-width: 1440px) {
  .box2 {
    top: 10%;
  }
}
@media screen and (max-width: 400px) {
  .box2 {
    top: -10%;
    left: 80%;
  }
  .box3 {
    left: 12%;
  }
}
@media screen and (max-width: 430px) {
  .box3 {
    left: 20%;
    top: 20%;
  }
}

@media screen and (max-width: 380px) {
  .box2 {
    top: -1%;
  }
}
</style>