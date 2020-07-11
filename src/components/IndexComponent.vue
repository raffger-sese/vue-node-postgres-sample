<template>
  <div>
    <h3>Observations Report</h3>
    <div class="row">
      <div class="col-md-10"></div>
    </div>
    <br />
    <div>
      <label for="datepicker">Choose a date:</label>
      <b-form-datepicker
        id="datepicker"
        v-model="date"
        class="mb-2"
      ></b-form-datepicker>
    </div>
    <br />
    <div>
      <label for="limit">Limit : </label>
      <input
        v-model="limit"
        placeholder=""
        type="number"
        @change="refreshScreen"
      />
    </div>
    <br />
    <div
      class="static"
      v-bind:class="{ 'alert alert-danger': errorMessage !== '' }"
    >
      {{ errorMessage }}
    </div>
    <div>
      <button class="btn btn-primary" @click.prevent="getObservations()">
        Generate Report
      </button>
    </div>
    <br />
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Country</th>
          <th>Confirmed</th>
          <th>Deaths</th>
          <th>Recovered</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key="country._id">
          <td>{{ country.country }}</td>
          <td>{{ country.confirmed }}</td>
          <td>{{ country.deaths }}</td>
          <td>{{ country.recovered }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      countries: [],
      date: "",
      limit: 0,
      errorMessage: "",
    };
  },

  methods: {
    refreshScreen() {
      this.getObservations();
    },
    getObservations() {
      if (this.date === "" || this.limit <= 0 ) {
        this.errorMessage = "Please supply valid date and/or limit.";
      } else {
        let uri = "http://localhost:3000/top/confirmed";
        this.axios
          .get(uri, {
            params: {
              observation_date: this.date,
              max_results: this.limit,
            },
          })
          .then((response) => {
            this.errorMessage = "";
            this.countries = response.data.countries;
          });
      }
    },
  },
};
</script>
