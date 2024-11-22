<template>
  <div class="container">
    <header class="header">
      <div class="logo-container">
        <img
          src="https://play-lh.googleusercontent.com/OHhHNVlfxpiFXxX-uN_hhyoB0M8rr6wXqoS8CXt62LOWk_QALFW9GcNu9ZaDQz2givwZ"
          alt="PROMCOSER Logo"
          class="logo"
        />
      </div>
      <div class="header-content">
        <h1 class="title">Lista de Películas</h1>
      </div>
    </header>

    <div class="filters">
      <div class="filter-item">
        <label for="titleFilter">Título:</label>
        <input
          id="titleFilter"
          v-model="filters.title"
          type="text"
          placeholder="Buscar por título"
        />
      </div>
      <div class="filter-item">
        <label for="voteAverageFilter">Promedio de Votos:</label>
        <select id="voteAverageFilter" v-model="filters.voteAverage">
          <option value="normal">Normal</option>
          <option value="min">Mínimo</option>
          <option value="max">Máximo</option>
        </select>
      </div>
      <div class="filter-item">
        <label for="voteCountFilter">Conteo de Votos:</label>
        <select id="voteCountFilter" v-model="filters.voteCount">
          <option value="normal">Normal</option>
          <option value="min">Mínimo</option>
          <option value="max">Máximo</option>
        </select>
      </div>
    </div>

    <main>
      <table class="movie-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Poster</th>
            <th>Promedio de Votos</th>
            <th>Conteo de Votos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in filteredAndSortedMovies" :key="movie.id">
            <td>{{ movie.title }}</td>
            <td>
              <img
                :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
                :alt="`${movie.title} poster`"
                class="movie-poster"
              />
            </td>
            <td>{{ movie.vote_average }}</td>
            <td>{{ movie.vote_count }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      filters: {
        title: "",
        voteAverage: "normal",
        voteCount: "normal",
      },
    };
  },
  computed: {
    filteredAndSortedMovies() {
      let result = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.filters.title.toLowerCase())
      );

      if (this.filters.voteAverage !== "normal") {
        result.sort((a, b) => {
          if (this.filters.voteAverage === "min") {
            return a.vote_average - b.vote_average;
          } else {
            return b.vote_average - a.vote_average;
          }
        });
      }

      if (this.filters.voteCount !== "normal") {
        result.sort((a, b) => {
          if (this.filters.voteCount === "min") {
            return a.vote_count - b.vote_count;
          } else {
            return b.vote_count - a.vote_count;
          }
        });
      }

      return result;
    },
  },
  methods: {
    fetchMovies() {
      this.$api2
        .get("/discover/movie")
        .then((response) => {
          this.movies = response.data.results;
        })
        .catch((error) => {
          console.error("Error al obtener las películas:", error);
        });
    },
  },
  mounted() {
    this.fetchMovies();
  },
};
</script>

<style>
:root {
  --primary-color: #0066cc;
  --primary-hover: #0052a3;
  --secondary-color: #ff3333;
  --secondary-hover: #cc0000;
  --background-color: #f8f9fa;
  --text-color: #333;
  --border-color: #e0e0e0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background: linear-gradient(to bottom, #ffffff, var(--background-color));
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: flex-start;
  padding: 24px;
}

.logo-container {
  width: 200px;
  height: 80px;
  margin-right: 20px;
}

.logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.header-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  color: #0066cc;
  margin: 0 0 15px 0;
  font-size: 28px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-item label {
  margin-bottom: 5px;
}

.filter-item input,
.filter-item select {
  padding: 5px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.movie-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.movie-table th,
.movie-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.movie-table th {
  background-color: rgba(0, 102, 204, 0.05);
  color: var(--primary-color);
  font-weight: bold;
}

.movie-table tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.movie-poster {
  width: 92px;
  height: 138px;
  object-fit: cover;
}
</style>
