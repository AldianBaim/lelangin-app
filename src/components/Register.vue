<template>
  <v-form
    ref="form"
    class="d-flex justify-center align-center teal lighten-3 card-mobile"
    style="height: 100vh"
    lazy-validation
    @submit.prevent="register()"
  >
    <v-card
      min-width="600"
      class="mx-3"
      elevation="9"
      rounded="tl-xl br-xl"
      flat
      :loading="$store.state.loading"
    >
      <v-card-title>
        <h2 class="mx-auto">Form Register</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col md="6" sm="12" xs="12">
            <v-text-field
              prepend-icon="mdi-face"
              label="Fullname"
              v-model="user.username"
              :rules="name"
            ></v-text-field>
          </v-col>
          <v-col md="6" sm="12" xs="12">
            <v-text-field
              prepend-icon="mdi-home"
              label="Address"
              v-model="user.address"
              :rules="address"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          label="Email"
          prepend-icon="mdi-email"
          type="email"
          :rules="emailRules"
          v-model="user.email"
        ></v-text-field>
        <v-text-field
          label="Phone number"
          prepend-icon="mdi-phone"
          type="text"
          :rules="phoneRules"
          v-model="user.phone_number"
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
        <v-text-field
          label="Confirm password"
          prepend-icon="mdi-lock"
          type="password"
          :rules="[confirmPasswordRules, passwordConfirm]"
          v-model="confirmPassword"
        ></v-text-field>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="purple white--text" type="submit"
          ><v-icon class="mr-1">mdi-account-circle</v-icon> Register</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn type="submit" color="info white--text" to="/login"
          ><v-icon class="mr-1">mdi-login</v-icon> Login</v-btn
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
        username: "",
        email: "",
        phone_number: "",
        address: "",
        password: "",
      },

      // Validation
      confirmPassword: "",
      showPassword: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
          "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
      ],
      phoneRules: [
        (v) => !!v || "Phone number is required",
        (v) => v.length < 12 || "Phone number max 12 digits",
      ],
      confirmPasswordRules: [(v) => !!v || "Password is required"],
      name: [(v) => !!v || "Name is required"],
      address: [(v) => !!v || "address is required"],
    };
  },
  methods: {
    ...mapActions(["doRegister"]),
    register() {
      this.doRegister(this.user);
    },
  },
  computed: {
    passwordConfirm() {
      return () =>
        this.user.password === this.confirmPassword || "Password dont match";
    },
  },
};
</script>

<style scoped>
.bg {
  background: url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80);
  background-size: cover;
}
@media screen and (max-width: 410px) {
  .card-mobile {
    padding-top: 50px !important;
  }
}
</style>