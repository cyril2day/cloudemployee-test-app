<script setup lang='ts'>


const props = defineProps({
   formType: {
      type: String,
      default: 'Sub Business Function'
   }
})
const emit = defineEmits(['formSubmit', 'onNameChanged'])

const data = ref('')

function submit() {
   emit('formSubmit', { name: data.value, type: props.formType })
}

function handleNameChanged() {
   emit('onNameChanged', data.value)
}

onKeyStroke('Enter', (e) => {
   e.preventDefault()

   submit()
})
</script>

<template>
   <div ref='createForm' class='form__wrapper'>
      <!-- Form Header -->
      <div class='form-header'>
         <slot name='form-header'>
            <h3>Create {{ props.formType }}</h3>
         </slot>
      </div>

      <!-- Form Contents -->
      <div class='form-item'>
         <label for='name'>Name</label>
         <input
            v-model='data'
            autocomplete='off'
            type='text'
            name='name'
            id='name'
            @keyup='handleNameChanged'
            @blur='handleNameChanged'
         />
      </div>
      <slot></slot>

      <!-- Form Actions -->
      <slot name='form-actions'>
         <div class='form-item'>
            <button @click='submit' id='formSubmit'>SUBMIT</button>
         </div>
      </slot>
   </div>
</template>

<style lang="scss">
.form__wrapper {
   max-height: 500px;
   margin: 30px 40px;
}

.form-item {
   margin-top: 20px;
   box-sizing: border-box;

   input, select, button {
      width: 100%;
      padding: 10px;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
   }

   button {
      margin: 20px auto;
      border-radius: 5px;
      border:none;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      background: var(--blue2);
      color: var(--white);
      font-family: 'Rubik-Medium';
      font-size: 1.2em;
      transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;

      &:active {
         transform: translateY(3px);
      }
   }
}


.form-actions {
   margin: 20px;
   align-self: center;
}
</style>
