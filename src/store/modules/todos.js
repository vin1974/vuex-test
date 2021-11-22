import axios from 'axios';

const state = {
    todos: []
};

const getters = {
    allTodos: (state)=> state.todos
};

const actions = {
    async fetchTodos( { commit }){
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        commit('setTodos', response.data);
    },
    async addTodo({commit}, title){
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        });

        commit('newTodo', response.data)
    },
    async deleteTodo({commit}, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('delTodo', id);
    },
    async filterTodos({commit}, e){
        //get selected number
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
        // console.log(limit);

        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit('setTodos', response.data);
    },
    async updateTodo({commit}, todo){
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)

        commit('updateTodo', response.data);
    }

};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    delTodo: (state, id) => state.todos = state.todos.filter((todo) => todo.id !== id),
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
        console.log('index is...', index)
        if (index !== -1) {
            state.todos.splice(index, 1, updTodo);
        }
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}