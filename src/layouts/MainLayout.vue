<template>
  <div class="login-container">
    <div class="wrapper">
      <div class="title">
        <span>Acceso a Lista de Peliculas</span>
      </div>
      <form action="#">
        <div class="row">
          <i class="fas fa-user"></i>
          <input v-model="email" type="text" placeholder="Email" required />
        </div>
        <div class="row">
          <i class="fas fa-lock"></i>
          <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div class="pass"><a href="#">¿Olvidaste tu contraseña?</a></div>
        <div class="row button">
          <input type="button" value="Iniciar Sesión" @click="iniciarSesion" />
        </div>
        <div class="signup-link">
          ¿No eres miembro? <a href="#">Regístrate ahora</a>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url("https://www.revistagente.com/wp-content/uploads/2021/08/Diseno-sin-titulo-1-9-620x464.png.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 30px;
}

.wrapper {
  max-width: 440px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.wrapper .title {
  height: 120px;
  background: linear-gradient(60deg, #ff6b6b, #feca57);
  border-radius: 16px 16px 0 0;
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.wrapper form {
  padding: 30px 35px;
}

.wrapper form .row {
  height: 60px;
  margin-bottom: 20px;
  position: relative;
}

.wrapper form .row input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 60px;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 17px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
}

form .row input:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 5px rgba(255, 107, 107, 0.5);
}

form .row input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.wrapper form .row i {
  position: absolute;
  width: 50px;
  height: 100%;
  color: #fff;
  font-size: 20px;
  background: linear-gradient(60deg, #ff6b6b, #feca57);
  border: 1px solid #ff6b6b;
  border-radius: 30px 0 0 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper form .pass {
  margin: 10px 0 20px 0;
}

.wrapper form .pass a {
  color: #ff6b6b;
  font-size: 17px;
  text-decoration: none;
}

.wrapper form .pass a:hover {
  text-decoration: underline;
}

.wrapper form .button input {
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  background: linear-gradient(60deg, #ff6b6b, #feca57);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

form .button input:hover {
  background: linear-gradient(60deg, #feca57, #ff6b6b);
}

.wrapper form .signup-link {
  text-align: center;
  margin-top: 30px;
  font-size: 17px;
  color: #333;
}

.wrapper form .signup-link a {
  color: #ff6b6b;
  text-decoration: none;
}

form .signup-link a:hover {
  text-decoration: underline;
}
</style>

<script>
export default {
  name: "MovieLoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    iniciarSesion() {
      let endpointURL = "/api/v1/user/signin";
      let user = {
        email: this.email,
        password: this.password,
      };
      this.$api
        .post(endpointURL, user)
        .then((response) => {
          console.log(JSON.stringify(response) + "ydaleU");
          this.$q.notify({
            message: "Inicio de sesión exitoso",
            color: "positive",
            timeout: 5000,
            position: "top",
          });
          this.$router.push("/peliculas");
        })
        .catch((error) => {
          this.$q.notify({
            message: "Ocurrió un error al iniciar sesión",
            color: "negative",
            timeout: 5000,
            position: "bottom",
          });
        });
    },
  },
};
</script>
