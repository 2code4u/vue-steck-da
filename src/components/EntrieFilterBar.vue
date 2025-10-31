<script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import { useEntriesStore } from '@/stores/entries'

  const entriesStore = useEntriesStore()

  const emptyForm = {
    name: '',
    fio: '',
    phone: '',
    address: '',
  }

  const overlay = ref(false)
  const fioSearch = ref('')
  const newOrg = reactive({
    name: '',
    fio: '',
    phone: '',
    address: '',
  })

  const isValid = computed(() =>{
    return Boolean(newOrg.address && newOrg.phone && newOrg.fio && newOrg.name)
  })

  function showAddNew() {
    overlay.value = !overlay.value
  }

  async function addNew() {
    if (isValid) {
      await entriesStore.addElement(newOrg)
      await entriesStore.loadList({})
      Object.assign(newOrg, emptyForm)
      showAddNew()
    }
  }

  function searchOnText() {
    entriesStore.loadList({type: fioSearch.value})
  }
</script>

<template>
  <v-form @submit="entriesStore.loadList({})">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="fioSearch"
            label="Найти по ФИО"
            clearable
            variant="outlined"
            @input="searchOnText"
          />
        </v-col>

        <v-col
          md="2" 
        />

        <v-col
          cols="12"
          md="4"
          class="d-flex"
        >
          <v-btn
            variant="flat"
            color="indigo-darken-3 w-100"
            @click="showAddNew"
          >
            <span class="ml-2">
              Добавить
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-overlay
      v-model="overlay"
      contained
      class="align-center justify-center"
    >
      <v-card
        width="360"
        height="600"
        class="pa-4"
      >
        <v-card-title>
          Добавить организацию
        </v-card-title>

        <v-text-field
          v-model="newOrg.name"
          label="Название"
          variant="outlined"
        />
        <v-text-field
          v-model="newOrg.fio"
          label="ФИО директора"
          variant="outlined"
        />
        <v-text-field
          v-model="newOrg.phone"
          v-mask="'+7 ### ### ####'"
          label="Номер телефона"
          variant="outlined"
        />
        <v-text-field
          v-model="newOrg.address"
          label="Адрес"
          variant="outlined"
        />

        <v-btn
          variant="flat"
          color="indigo-darken-3"
          block
          :disabled="!isValid"
          @click="addNew"
        >
          <span class="ml-2">
            ОК
          </span>
        </v-btn>
      </v-card>
    </v-overlay>
  </v-form>
</template>