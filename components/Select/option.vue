<template>
  <li @click='select' class="x-option" v-show="isShow">
    <div class="x-option-row" :class="className">
      <div class="x-option-text" :data-value="value">
        <slot ref="inner"></slot>
      </div>
    </div>
  </li>
</template>

<script>
import emit from './../../utils/emit'

export default {
  name: 'hOption',
  inject: ['rootSelect'],
  mixins: [emit],
  props: {
    value: String,
    disabled: Boolean
  },
  data () {
    return {
      isActive: false,
      isShow: true,
      optionValue:this.value
    }
  },
  computed: {
    className () {
      return {
        'select': this.isActive,
        'is-disabled': this.disabled
      }
    }
  },
  mounted () {
    this.$on('clearValue', (value) => {
      if (this.$slots.default[0].text === value) {
        this.isActive = false
      }
    })

    this.$on('groupValue', (status) => {
      if (this.disabled) {
        return
      }
      switch (status) {
        case 0:
          this.isActive = true
          this.emitParent()
          break
        case 1:
          if (!this.isActive) {
            this.isActive = status !== 2
            this.emitParent()
          }
          break
        case 2:
          this.isActive = false
          this.emitParent()
          break
        default:
      }
    })

    this.$on('matched', (param) => {
        this.isShow = !(this.value.indexOf(param) === -1)
        this.dispatch('hOptionGroup', 'groupshow', true)
    })
  },
  methods: {
    close(){
        this.isActive = false;
    },
    select () {
      if (!this.disabled) {
        if (this.rootSelect.multiple) {
            if(this.isActive==true){
                this.$message.info('已经选过了');
            }
            else{
                this.isActive = true;
                this.emitParent()
            }
        } else {
          this.rootSelect.$children.map(item => { item.isActive = false })
          this.isActive = true
          this.emitParent()
        }
      }
    },
    emitParent () {
        console.log(this.$slots.default[0].text)
      this.dispatch('hSelect', 'select', {label: this.value,text:this.$slots.default[0].text, check: this.isActive})
    }
  }
}
</script>
