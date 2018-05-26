import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    sayHi() {

    },
    fetch() {
        const arr =[];
        console.log(this);
        for (var i = 0; i < localStorage.length; i++) {
            arr.push(localStorage.key(i));
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        message: 'Hello Vuex',
        todoItems: storage.fetch()
    },
    getters: {
        getMessage(state) {
            return state.message;
        }
    },
    mutations: {
        addTodo(state ,todoItem) {
			localStorage.setItem(todoItem, todoItem);
			state.todoItems.push(todoItem);
		},
        removeTodo(state ,obj) {
            localStorage.removeItem(obj.item);
            state.todoItems.splice(index, 1);
        },
        removeAllItem: function(state) {
            state.todoItems = [];
        
        }
    }
});