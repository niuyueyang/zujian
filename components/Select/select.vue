<template>
  <div class="x-select">
    <div class="x-select-input" :class="classNames" @click.prevent="toggleMenu" @mouseover="mouseover" @mouseout="mouseout">

      <!--多选模式下，所有选中值展示-->
<!--      <div class="x-select-array" v-show="multiple && checkArray.length" >
        <div class="wrap" id="wrap" ref="wrap" style="height: auto;overflow: hidden;">
          <div class="x-select-array-content" v-for="(item,index) in checkArray" :key="index">
            <span class="x-con-array">{{item}}</span>
            <span class="x-clearable-array" @click.stop="clearValue(item)">
            <i class="x-icon-x"></i>
          </span>
          </div>
        </div>
      </div>-->

        <input type="text"
               id="int"
               :key="Math.random()"
               :style="{'height':height+'px'}"
               class="x-input"
               ref="selectInput"
               readonly
               :class="{'is-focus': isActive}"
               :disabled="disabled"
               @focus.stop="focus"
               :placeholder="placeholder"
               :value="checkValue"/>
<!--        <transition-group name="fade" tag="div" class="x-select-icon">
          <div class="x-clearable" v-show="isClear" key="1" @click.stop="clearValue">
            <i class="x-icon-x"></i>
          </div>
          <i class="x-arrow" key="2" v-show="!isClear" :class="{'is-active': isActive}"></i>
        </transition-group>-->
      </div>
    <transition name="fade-up">
      <div class="x-select-option" :style="dropStyle" v-show="isActive" ref="optionEl">
<!--        <div class="x-select-search">
          <h-input
                  v-if="search"
                  iconBefore="x-icon-search"
                  size="sm"
                  :clearable="true"
                  v-model="searchKey"
                  @input="searchEv"
          />
        </div>-->
        <ul>
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
    import './../../assets/select.less'
    import emit from "./../../utils/emit";

    let TimeId = null;

    export default {
      name: "hSelect",
      mixins: [emit],
      provide() {
        return {
          rootSelect: this
        };
      },
      props: {
        value: [String, Array],
        size: {
          type: String,
          default: 'md',
          validator: value => ['lg', 'sm', 'md'].some(item => value === item)
        },
        multiple: Boolean,
        placeholder: String,
        disabled: Boolean,
        search: [String, Boolean]
      },
      data() {
        return {
          isActive: false,
          checkValue: "",
          checkArray: [],
          dropStyle: null,
          isfocus: false,
          isClear: false,
          searchKey: "",
          dim: "",
          height:0
        };
      },
      computed: {
        classNames(){
          let className='';
          if(this.size){
              className+='x-select-input-'+this.size;
          }
          if(this.disabled){
              className+='x-select-input-disabled';
          }
          return className;
        },
      },
      mounted() {
        if(this.value&&this.value!=''){
            if(this.$slots.default.length>0){
                var slots = this.$slots.default;
                for(let i=0;i<slots.length;i++){
                    var item = slots[i];
                    if(item.componentOptions.propsData.value==this.value){
                        console.log('selected')
                        item.componentInstance.select();
                    }
                }
            }
        }
        this.getRect();

        document.addEventListener("click", e => {
          if (!this.$el.contains(e.target)) {
            this.close();
          }
        });

        this.$on("select", ({ label,text, check }) => {
          if (this.multiple) {
            if (check) {
              this.checkArray.push(text);
            } else {
              alert('已经选过了');
            }
            this.checkValue = this.checkArray.length ? " " : "";
            this.$emit("input", this.checkArray);
          }
          else {
            this.checkValue = text;
            this.close();
            this.$emit("input", label);
          }
        });

        const search = this.search;
        if (search) {
          this.dim = "x" + search.replace(search[0], search[0].toUpperCase());
        }

      },
      methods: {
        getRect() {
          const Rect = this.$el.getBoundingClientRect();
          console.log(Rect)
          const T = Rect.height + 5;

          this.dropStyle = {
            minWidth: Rect.width + "px",
            top: T + "px"
          };
        },
        toggleMenu(){
          if(!this.disabled){
             if(this.isfocus&&this.isActive){
                 this.close();
             }
             else{
                 this.show();
                 this.getRect();
             }
          }
        },
        close() {
          this.isfocus = false;
          this.isActive = false;
        },
        show() {
          this.searchKey = "";
          this.isActive = true;
          this.isfocus = true;
        },
        focus() {
          this.isActive = true;
        },
        mouseover() {
          if (!this.multiple && this.checkValue.length) {
            this.isClear = true;
          }
        },
        mouseout() {
          this.isClear = false;
        },
        clearValue(item){
            let emitValue;
            if(this.multiple){
                var index=this.checkArray.indexOf(item);
                this.checkArray.splice(index,1)
                // this.$slots.default[index].close()
                emitValue=item;
                this.$emit('input',this.checkArray);
                this.checkValue = this.checkArray.length?" ":"";
                this.broadcast('hOption',"clearValue",emitValue,{val:emitValue,array:this.checkArray})
            }
            else{
              emitValue=this.checkValue;
              this.$emit('input',(this.checkValue=""))
              this.broadcast('hOption',"clearValue",{val:emitValue,array:this.checkArray})
            }
        },
        searchEv() {
          clearTimeout(TimeId);
          TimeId = setTimeout(() => {
            this.broadcast(this.dim, "matched", this.searchKey);
          }, 100);
        }
      },
      updated(){
          this.$nextTick(() => {
              this.height=typeof this.$refs['wrap'] != 'undefined' ? this.$refs['wrap'].getBoundingClientRect().height+5:0;
          })

      }
    };
</script>
