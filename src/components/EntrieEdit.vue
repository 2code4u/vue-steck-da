<script setup lang="ts">
  import { computed, defineModel, defineEmits } from 'vue';

  const emit = defineEmits(['save']);

  const modelOrg = defineModel()

  const isValid = computed(() => {
    const value = modelOrg.value || {}
    return Boolean(value.address && value.phone && value.fio && value.name)
  })

  function save() {
    emit('save')
  }
</script>

<template>
  <v-card
    width="360"
    height="600"
    class="pa-4"
  >
    <v-card-title>
      Редактировать организацию
    </v-card-title>

    <v-text-field
      v-model="modelOrg.name"
      label="Название"
      variant="outlined"
    />
    <v-text-field
      v-model="modelOrg.fio"
      label="ФИО директора"
      variant="outlined"
    />
    <v-text-field
      v-model="modelOrg.phone"
      v-mask="'+7 ### ### ####'"
      label="Номер телефона"
      variant="outlined"
    />
    <v-text-field
      v-model="modelOrg.address"
      label="Адрес"
      variant="outlined"
    />

    <v-btn
      variant="flat"
      color="indigo-darken-3"
      block
      :disabled="!isValid"
      @click="save"
    >
      <span class="ml-2">
        ОК
      </span>
    </v-btn>
  </v-card>
</template>
