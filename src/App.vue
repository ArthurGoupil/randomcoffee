<template>
  <div class="columns">
    <div class="column is-half first-column">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <h1>Bienvenue dans la génération de random coffees</h1>
      <!-- Gère la liste des membres -->
      <members
        @click-on-send="generateParentMemberList"
        class="column is-half is-offset-one-quarter"
        >
      </members>
      <div v-if="parentMemberList.length > 1" class="container">
        <!-- Gère la sélection de la date -->
        <div style="display: flex; justify-content: center;">
          <date-picker 
            :disabled-dates="disabledDates" 
            :language="fr"
            :placeholder="datePickerPlaceholder"
            v-model="datePicked"  
            @selected="dateSelected = true"
          >
          </date-picker>
        </div>
        <div v-if="new Date(datePicked) < new Date().setDate(new Date().getDate() - 3)">
          Hey Doc ! On irait pas faire un Random Coffee dans le passé ? Non Marty, pas cette fois ...
        </div>
      </div>
    </div>
    <!-- Génère les randomcoffees avec la date associée -->
    <div class="column second-column">
      <display-random-coffees 
        v-if="parentMemberList.length > 1 && dateSelected && new Date(datePicked) > new Date().setDate(new Date().getDate() - 3)"
        :date-picked="datePicked"
        :child-member-list="parentMemberList"
      >
      </display-random-coffees>
    </div>
  </div>
</template>
<script>
import members from './components/members';
import displayRandomCoffees from './components/displayRandomCoffees';
import datePicker from 'vuejs-datepicker';
import {fr} from 'vuejs-datepicker/dist/locale';

export default {
  components: {
    members,
    displayRandomCoffees,
    datePicker
  },
  props: {
  },
  data() {
    return {
      disabledDates: { // permet de ne sélectionner qu'un lundi
        days: [2, 3, 4, 5, 6, 0]
      },
      datePickerPlaceholder: 'Choisis une date',
      fr: fr,
      dateSelected: false,
      datePicked:'',
      parentMemberList: []
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    // Récupère la liste des membres avec l'emit du composant members
    generateParentMemberList(memberList) {
      this.parentMemberList = memberList;
    }
  },
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
  text-align: center;
  color: white;
}
::placeholder {
  font-family: Raleway !important; 

}
.vdp-datepicker input {
  font-family: Raleway; 
  font-size: 16px;
  color: #302E2E;
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
</style>
