<template>
  <div style="text-align:center;">
    <input class="boxes input is-rounded" v-model="prenom" placeholder="Prénom"/>
    <input class="boxes input is-rounded" v-model="nom" placeholder="Nom (facultatif)" />
    <button 
      type="button" 
      :disabled="isValidateDisabled" 
      @click="addMember"
      class="button is-rounded"
      style="margin: 15px 0px 13px;"
    >
      <span class="icon is-small" style="color: #CD9403">
        <i class="fas fa-coffee"></i>
      </span>
      <span style="color: #0075AD">
        Ajouter un copain
      </span>
    </button>
    <!-- affiche la liste des membres -->
    <ul>
      <transition-group name="list" tag="p">
        <li
          v-for="(item, index) in memberList"
          :key="index"
          class="list-item members"
        >
          {{ item.prenom }} {{ item.nom }}
          <a
            @click="deleteMember(index)"
            style="margin-left: 10px;"
          >
            <span class="icon is-small delete-button" style="font-size: 14px;">
              <i class="fas fa-trash fa-xs"></i>
            </span>
            <span class="delete-button" style="font-size: 12px;">
              Supprimer
            </span>
          </a> 
        </li>
      </transition-group>
    </ul>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      prenom: '',
      nom: '',
      idCount: 0,
    };
  },
  computed: {
    // Permet de savoir si un prénom a été entré, sinon la propriété "disabled" du bouton est en "true"
    isValidateDisabled() {
      return this.prenom.length === 0;
    },
    // Import de la memberList pour pouvoir listes tous les membres
    memberList() {
      return this.$store.state.memberList;
    }
  },
  watch: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
    reset() {
      this.prenom = '';
      this.nom = '';
    },
    // Ajoute un membre à la memberList du store
    addMember() {
      this.$store.commit('addMember', {
        member: { prenom: this.prenom, nom: this.nom, id: this.idCount++ }
      });
      this.reset();
    },
    // Supprime un membre de la memberList du store quand on clique sur "Supprimer"
    deleteMember(index) {
      this.$store.commit('deleteMember', {
        index
      });
    }
  },
}
</script>

<style>
.boxes {
  margin-bottom: 10px;
  padding: 5px;
  font-family: Raleway !important; 
}
 .list-item {
  display: inline-block;
  margin-right: 10px;
  padding: .2em 1em !important;
  border-bottom: none !important;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
li.members {
  color: white !important;
}
.delete-button {
  color: #7cbebe !important;
}
</style>