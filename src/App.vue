<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- <MyHeader :addTodo="addTodo" /> -->
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter
          :todos="todos"
          :checkAllTodos="checkAllTodos"
          :clearAlltodos="clearAlltodos"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'
import pubsub from 'pubsub-js'

export default {
  name: 'App',
  components: {
    MyHeader,
    MyList,
    MyFooter,
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todos')) || [],
    }
  },
  methods: {
    //  添加一个todo事项
    addTodo(todoObj) {
      this.todos.unshift(todoObj)
    },
    // 改变事项的完成状态
    checkTodo(msgName, id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done
      })
    },
    // 删除一个事项
    deleteTodo(msgName, id) {
      if (confirm('确定删除吗?'))
        this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    //  检查全选todo
    checkAllTodos(done) {
      this.todos.forEach((todo) => {
        todo.done = done
      })
    },
    //  清除已完成
    clearAlltodos() {
      return (this.todos = this.todos.filter((todo) => {
        return !todo.done
      }))
    },
  },
  watch: {
    todos: {
      handler(newVal) {
        localStorage.setItem('todos', JSON.stringify(newVal))
      },
      deep: true,
    },
  },
  mounted() {
    // this.$bus.$on('checkTodo', this.checkTodo)
    // this.$bus.$on('deleteTodo', this.deleteTodo)
    this.pubId1 = pubsub.subscribe('checkTodo', this.checkTodo)
    this.pubId2 = pubsub.subscribe('deleteTodo', this.deleteTodo)
  },
  beforeDestroy() {
    // this.$bus.$off('checkTodo')
    // this.$bus.$off('deleteTodo')
    pubsub.unsubscribe(this.pubId1)
    pubsub.unsubscribe(this.pubId2)
  },
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
