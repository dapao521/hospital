<script setup>
import { defineComponent ,ref} from 'vue';

defineComponent({
name: 'MyComponent',
// 组件的其他选项和逻辑
});

// 等级高粱
const activeindex = ref('')
const change = (item)=>{
    activeindex.value = item
}

// 地区高亮
const activeindex1 = ref('')
const changediqu = (item)=>{
    activeindex1.value = item
}
</script>


<template>
  <div class="level">
    <h1>医院</h1>
    <div class='content'>
        <div class="left">等级：</div>
        <ul>
        <li :class="{active : activeindex === ''}" @click="activeindex = ''">全部</li>
        <li v-for="item in 6" :key="item" @click="change(item)" :class="{active:item===activeindex}">三级甲等</li>

    </ul>
    </div>

  </div>

  <div class="rehion">
    <div class="left">地区:</div>
  <ul>
    <li :class="{active : activeindex1 === ''}" @click="activeindex1 = ''">全部</li>
    <li v-for="item in 30" :key="item" @click="changediqu(item)" :class="{active:item===activeindex1}">地球村</li>

  </ul>
    
  </div>
</template>


<style lang='scss' scoped>
.level {
    color: #7f7f7f;
    h1{
       
        font-weight: bolder;
        margin: 10px 0;
    }
    .content{
        display: flex;
        .left{
            margin-left: 10px;
            margin-right: 10px;
        }
        ul{
            display: flex;
            li{
                margin-right: 15px;
                cursor: pointer;
                &.active{
                    color: #409eff;
                }
                &:hover{
                    color: #409eff;
                }
            }
          
        }
    }
}

.rehion{
    margin-top: 20px;
    color: #7f7f7f;
    display: flex;
    .left{
        margin-left: 10px;
        margin-right: 10px;
        width: 100px;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            margin-right: 15px;
            margin-bottom: 10px;
            &.active{
                color: #409eff;
            }
            cursor: pointer;
            &:hover{
                color: #409eff;
            }
        }
    }
}
</style>
