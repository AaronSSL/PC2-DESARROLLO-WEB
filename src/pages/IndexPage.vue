<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
  </q-page>

  <LoginForm />
</template>

<script>
import { defineComponent } from "vue";
import LoginForm from "src/components/auth/ListaPelicula.vue";

export default defineComponent({
  name: "IndexPage",
  components: { LoginForm },
});
</script>
