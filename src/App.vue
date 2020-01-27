<template>
  <div class="columns">
    <div class="column is-half first-column">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//fonts.googleapis.com/css?family=Raleway"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <img
        class="centered"
        style="width: 300px;"
        src="../public/logo-mys-white.png"
        alt="Logo MySezame white"
      />
      <h1>Ici, tu peux générer une session de Random Coffees.</h1>
      <div class="subtitle">
        Ajoute tous les membres et choisis la date de début.
      </div>
      <!-- Gère la liste des membres -->
      <members class="column is-half is-offset-one-quarter"> </members>
      <div v-if="memberList.length > 1" class="container">
        <!-- Gère la sélection de la date -->
        <div style="display: flex; justify-content: center; ">
          <date-picker
            :disabled-dates="disabledDates"
            :language="fr"
            :placeholder="datePickerPlaceholder"
            v-model="datePicked"
            @selected="dateSelected = true"
            @input="setDate"
          >
          </date-picker>
        </div>
        <div class="has-text-centered" style="background: #009191;">
          <button
            type="button"
            v-if="!isInThePast"
            :disabled="isReadyToDisplay || !dateSelected"
            @click="setIsReadyToDisplay"
            class="button is-primary is-rounded"
            style="margin: 15px 0px 13px;"
          >
            Générer le calendrier de Random Coffees
          </button>
        </div>
        <div
          v-if="isInThePast"
          style="color: white; margin-top:3%; text-align: center;"
        >
          Hey Doc ! On irait pas faire un Random Coffee dans le passé ?
          <img
            style="margin-top: 1%;"
            class="centered"
            src="../public/bttf.gif"
            alt="Back to the Future"
          />
        </div>
      </div>
    </div>
    <!-- Génère les randomcoffees avec la date associée -->
    <div class="column second-column">
      <img
        class="fixed-bottom"
        src="../public/mys-rc-color.png"
        alt="Logo RC white"
      />

      <display-random-coffees> </display-random-coffees>
    </div>
  </div>
</template>
<script>
import members from './components/members';
import displayRandomCoffees from './components/displayRandomCoffees';
import datePicker from 'vuejs-datepicker';
import { fr } from 'vuejs-datepicker/dist/locale';

export default {
  components: {
    members,
    displayRandomCoffees,
    datePicker
  },
  props: {},
  data() {
    return {
      disabledDates: {
        // permet de ne sélectionner qu'un lundi
        days: [2, 3, 4, 5, 6, 0]
      },
      datePickerPlaceholder: 'Choisis une date de début',
      fr: fr,
      dateSelected: false,
      datePicked: ''
    };
  },
  computed: {
    // On importe la memberList pour checker sa longueur dans le v-if du display-random-coffee
    memberList() {
      return this.$store.state.memberList;
    },
    isReadyToDisplay() {
      return this.$store.state.isReadyToDisplay;
    },
    isInThePast() {
      return (
        new Date(this.datePicked) < new Date().setDate(new Date().getDate() - 3)
      );
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    // Méthode qui envoie la date choisie dans le store à chaque changement d'input
    setDate() {
      this.$store.commit('setDate', {
        datePicked: this.datePicked
      });
    },
    setIsReadyToDisplay() {
      this.$store.commit('setIsReadyToDisplay', true);
    }
  }
};
</script>

<style>
html {
  background: linear-gradient(90deg, #009191 50%, #ffffff 50%) !important;
}
body {
  font-family: Raleway !important;
}
button {
  font-family: Raleway !important;
}
.first-column {
  padding-left: 30px !important;
  padding-top: 70px !important;
  padding-bottom: 0 !important;
}
.second-column {
  padding-left: 0 !important;
}
.columns {
  margin-bottom: 0 !important;
}
h1 {
  font-size: 20px !important;
  text-align: center;
  color: white;
}
::placeholder {
  font-family: Raleway !important;
}
.vdp-datepicker input {
  font-family: Raleway;
  font-size: 16px;
  color: #302e2e;
  text-align: center;
  border-radius: 50px !important;
  border: none;
  padding: 10px;
}
.vdp-datepicker input:focus {
  border-radius: 50px !important;
}
.vdp-datepicker ::placeholder {
  color: #c2c2c2;
}
img.centered {
  margin-bottom: 7%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
img.fixed-bottom {
  height: 100px;
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 7%;
  margin-bottom: 5%;
}
.subtitle {
  color: white !important;
  text-align: center;
  font-size: 15px !important;
}
</style>
