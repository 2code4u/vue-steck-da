
<script setup lang="ts">
  import { computed, onBeforeMount, ref } from 'vue'
  import { useEntriesStore } from '@/stores/entries'

  import EntriesFilterBar from '@/components/EntrieFilterBar.vue'
  import EntriesEdit from '@/components/EntrieEdit.vue'

  const entriesStore = useEntriesStore()

  const list = computed(() => {
    return entriesStore.list
  })

  const headers = [
    { title: 'Название', key: 'name', sortRaw},
    { title: 'ФИО Директора', key: 'fio', sortRaw },
    { title: 'Номер телефона', key: 'phone', sortable: false },
    { title: 'Адрес', key: 'address', sortable: false },
    { key: 'actions', sortable: false },
  ]

  const editItem = ref({})
  const isEdit = ref(false)

  let currentSort = ref('asc')

  function sortOnField(isSorted: boolean, header: string | null) {
    if (isSorted) {
      entriesStore.loadList({'sort': {'type': currentSort.value, 'field': header || ''}})
    }
  }

  function sortRaw(val: string, next: string) {
    if (val === list.value[0]) {
      currentSort.value = 'asc'
    } else
    if (next === list.value[0]) {
      currentSort.value = 'desc'
    }
    return 0
  }

  function rowClick(e, {item}) {
    console.log(item)

    editItem.value = {...item}
    isEdit.value = true
  }

  async function updateRow() {
    await entriesStore.updateList({...editItem.value})
    isEdit.value = false
    entriesStore.loadList({})
  }

  onBeforeMount(() =>{
    entriesStore.initStore()
  })
</script>

<template>
  <v-card class="ma-4">
    <v-toolbar color="primary" class="mb-4">
      <v-toolbar-title>
        Мои организации
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>

    <EntriesFilterBar />
    
    <v-overlay
      contained
      v-model="isEdit"
      class="align-center justify-center"
    >
      <EntriesEdit
        v-if="isEdit"
        v-model="editItem" 
        @save="updateRow"
       />
    </v-overlay>

    <v-divider :thickness="2"></v-divider>

    <v-data-table
        :headers="headers"
        :items="list"
        :items-length="list?.length"
        @click:row="rowClick"
      >
      <template v-slot:header.name="{ column, getSortIcon, isSorted }">
        <div @click="sortOnField(isSorted(column), column.key)">
          <span
            class="me-2 cursor-pointer"
            v-text="column.title" 
          />
  
          <v-icon
            v-show="isSorted(column)"
            :icon="getSortIcon(column)"
            color="medium-emphasis"
          />
        </div>
      </template>

      <template v-slot:header.phone="{ column, getSortIcon, isSorted }">
        <div @click="sortOnField(isSorted(column), column.key)">
          <span
            class="me-2 cursor-pointer"
            v-text="column.title" 
          />
  
          <v-icon
            v-show="isSorted(column)"
            :icon="getSortIcon(column)"
            color="medium-emphasis"
          />
        </div>
      </template>
      
      <template v-slot:header.fio="{ column, getSortIcon, isSorted }">
        <div @click="sortOnField(isSorted(column), column.key)">
          <span
            class="me-2 cursor-pointer"
            v-text="column.title" 
          />
  
          <v-icon
            v-show="isSorted(column)"
            :icon="getSortIcon(column)"
            color="medium-emphasis"
          />
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon
          @click.stop="entriesStore.removeElement(item.id)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<style>
  .v-data-table tr th {
    font-size: 24px !important;
  }
</style>