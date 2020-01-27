<template>
  <div>
    <!-- Affiche tous les éléments de randomCoffeesList (date et matchs de chaque journée) quand on clique sur le bouton -->
    <img
      v-if="this.isReadyToDisplay === true"
      class="centered"
      style="margin-top: 1%;"
      src="../../public/coffee.gif"
      alt="Back to the Future"
    />
    <ul style="text-align: center; color: #302E2E">
      <transition-group name="list" tag="p">
        <li
          v-for="(elements, index) in randomCoffeesList"
          :key="index"
          class="list-item"
        >
          <strong>Semaine du {{ elements.date }}</strong>
          <ul>
            <li v-for="(match, indexMatch) in elements.rc" :key="indexMatch">
              {{ match[0].prenom }} {{ match[0].nom }} ☕ {{ match[1].prenom }}
              {{ match[1].nom }}
            </li>
          </ul>
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
import moment from 'moment';
import { match } from 'minimatch';
import { stringify } from 'querystring';
moment.locale('fr');

export default {
  components: {},

  props: {},

  data() {
    return {
      pairMemberList: [],
      weekRandomCoffeesPerDay: [],
      randomCoffeesList: [],
      memberListCopy: []
    };
  },

  computed: {
    // Import de la memberList
    memberList() {
      return this.$store.state.memberList;
    },
    datePicked() {
      return this.$store.state.datePicked;
    },
    isReadyToDisplay() {
      return this.$store.state.isReadyToDisplay;
    }
  },

  watch: {
    memberList() {
      this.memberListCopy = [];
      this.memberList.forEach(member => {
        this.memberListCopy.push(member);
      });
    },
    isReadyToDisplay() {
      if (this.isReadyToDisplay === true) {
        this.getCleanCalendar();
      }
    }
  },

  mounted() {},

  created() {},

  methods: {
    // Donne un id à chaque élément du tableau égal à l'index (car id plus facilement manipulable que l'index)
    giveIdsToArrayElements(inputArray) {
      inputArray.forEach((item, index) => {
        item.id = index;
      });
    },

    // Remplit un array vide (qui doit être initialisé parallèlement) avec les éléments d'un input array en leur attribuant une id et en ajoutant un dernier membre "Exempt" si impair
    getEvenLengthArrayWithIds(inputArray, outputArray) {
      inputArray.forEach(item => {
        outputArray.push(item);
      });
      this.giveIdsToArrayElements(outputArray);
      if (outputArray.length % 2 === 1) {
        outputArray.push({ prenom: 'Exempt', id: outputArray.length });
      }
    },

    // Permet de faire un tirage sans remise : renvoie un élément aleatoire dans une liste et supprime l'élément du bucket
    takeRandomElementFromArray(bucketArray) {
      let randomIndex = Math.floor(Math.random() * bucketArray.length);
      return bucketArray.splice(randomIndex, 1)[0];
    },

    // Permet mélanger un array
    copyAndShuffleArray(inputArray) {
      const bucketArray = [];
      for (let i = 0; i < inputArray.length; i++) {
        bucketArray.push(inputArray[i]);
      }
      const outputArray = [];
      for (let i = 0; i < inputArray.length; i++) {
        outputArray.push(this.takeRandomElementFromArray(bucketArray));
      }
      return outputArray;
    },

    // Permet de faire une rotation d'ids - sans jamais changer l'id du dernier élément de l'array - et ainsi programmer des matchs selon la méthode Robin Round Tournament
    rotateIds(inputArray) {
      inputArray.forEach(item => {
        if (item.id !== inputArray.length - 1) {
          item.id++;
          if (item.id === inputArray.length - 1) {
            item.id = 0;
          }
        }
      });
    },

    // (Ré)initialise les arrays en vue de la génération des random coffees
    resetArrays() {
      this.randomCoffeesList = [];
      this.pairMemberList = [];
    },

    // Permet de remplir l'array randomCoffeesList avec les bonnes informations (date et matchs pour chaque journée)
    getCleanCalendar() {
      this.resetArrays();
      const shuffledMemberListCopy = this.copyAndShuffleArray(
        this.memberListCopy
      );
      this.getEvenLengthArrayWithIds(
        shuffledMemberListCopy,
        this.pairMemberList
      );
      const numberOfDays = this.pairMemberList.length - 1;
      const numberOfRcsPerDay = this.pairMemberList.length / 2;
      for (let i = 0; i < numberOfDays; i++) {
        this.weekRandomCoffeesPerDay[i] = [];
        for (let j = 0; j < numberOfRcsPerDay; j++) {
          this.weekRandomCoffeesPerDay[i].unshift([
            this.pairMemberList[
              this.pairMemberList.findIndex(element => element.id === j)
            ],
            this.pairMemberList[
              this.pairMemberList.findIndex(
                element => element.id === this.pairMemberList.length - 1 - j
              )
            ]
          ]);
        }
        this.randomCoffeesList.push({
          date: moment(this.datePicked)
            .add(7 * i, 'days')
            .format('D MMMM YYYY'),
          rc: this.weekRandomCoffeesPerDay[i]
        });
        this.rotateIds(this.pairMemberList);
      }
    }
  }
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
  border-bottom: none !important;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
li {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}
</style>
