import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        addTodo: function( mutations/* 고정 */, newTodoItem ){
            mutations.commit("addTodo", newTodoItem );
        },
        doneToggle: function( mutations/* 고정 */, id ){
            mutations.commit("doneToggle", id );
        },
        removeTodo: function( mutations/* 고정 */, id, index ){
            mutations.commit("removeTodo", id, index );
        },
        clearAll: function( mutations/* 고정 */){
            mutations.commit("clearAll");
        },
    },
    mutations: {
        /* 왜 mutations 를 사용하나? state 를 바꾸기 위해서
         * mutations 에는 메서드만 등록 가능하다.
         * 첫번째인자: 무조건 state 로 고정.
         * 두번째인자: 값. mutations.commit() 호출시 넘겨지는 값.
         * */
        addTodo: function(state/* 고정 */, newTodoItem/* mutations.commit 호출시 넘겨지는 값 */){
            //console.log(event.target); // TodoInput 의 Button 정보

            // todoItems에서 최대 id 값을 구하는 방법.
            // 방법1. todoItems.reduce() 를 사용하여 newId를 구하는 방법
            // 방법2. 방법2. todoItems.reduce() 를 사용하여 최대 id 값을 찾기
            // 방법3. todoItems.map()과 Math.max()를 사용하여 max id를 찾는 방법

            // 방법1. todoItems.reduce() 를 사용하여 최대 id 값을 갖고있는 object 를 찾기
            let maxObj = null;
            if (state.todoItems.length > 0) {
                // state.todoItems.reduce()를 사용하여 최대 id 값을 갖고있는 element 를 찾는다.
                maxObj = state.todoItems.reduce((prevObj, curtObj) => {
                    if (prevObj.id >= curtObj.id) {
                        return prevObj;
                    } else {
                        return curtObj;
                    }
                });
            } else {
                // 빈 배열인 경우
                maxObj = {
                    id: 0
                };
            }
            var newid = maxObj.id + 1;

            // 방법2. todoItems.reduce() 를 사용하여 최대 id 값을 찾기
            let maxid = 0;
            if (state.todoItems.length > 0) {
                maxid = state.todoItems.reduce((maxid, obj) => {
                    return maxid >= obj.id ? maxid : obj.id;
                });
            } else {
                // 빈 배열인 경우
                maxid = 0;
            }
            newid = maxid + 1;

            // 추가할 객체 생성:
            // input에 입력된 값 ==> newTodoItem ;
            var newTodo = {
                id: newid,
                todo: newTodoItem,
                done: false
            };

            // state.todoItems 에 newTodo를 추가하시오.
            state.todoItems.push(newTodo);
            //state.todoItems[state.todoItems.length] = newTodo;
            //this.$set( state.todoItems, state.todoItems.length, newTodo );

        },
        doneToggle: function(state/* 고정 */, id/* mutations.commit 호출시 넘겨지는 값 */){
             // 방법1
            // state.todoItems[index].done = !state.todoItems[index].done ;

            // 방법2
            // this.$set( state.todoItems[index], "done", !state.todoItems[index].done );

            // 방법3
            // 복제 후 재할당 해야함
            const indexFind = state.todoItems.findIndex((item) => {
                return item.id === id;
            });
debugger;
            if (indexFind >= 0) {
                const newobj = {
                    ...state.todoItems[indexFind],
                    done: !state.todoItems[indexFind].done
                };

                state.todoItems[indexFind] = newobj;
                //this.$set(state.todoItems, indexFind, newobj);
            }
        },
        removeTodo: function(state/* 고정 */, id, index/* mutations.commit 호출시 넘겨지는 값 */){
            // 참조 타입 변수이면 재할당(=== 깊은 복사) 필요.
            // 방법1: array.splice() 을 사용하는 방법
            // 방법2: array.map() 을 사용하는 방법
            state.todoItems.splice(index, 1);
        },
        clearAll: function(state/* 고정 */){
            // 전체 삭제
            // state.todoItems = [];
            state.todoItems = [];
        }
    },
    state: {
        /* vue인스턴스나 컴포넌트의 data 프로퍼티에 해당 */
        todoItems: [
            { id: 1, todo: "영화보기", done: false },
            { id: 2, todo: "주말 산책", done: true },
            { id: 3, todo: "ES6 학습", done: false }
        ]
    },
    getters: {
        /* state 변경 정보를 컴포넌트에 전달하는 역활.
         * 메서드로 만들어야 하며 메서드명은 state 의 이름을 그대로 사용
         * 첫번째인자: 무조건 state
         * 컴포넌트에서는 computed를 사용하여 store의 state 변경 정보를 자동으로 가져오게 된다.
         * 예시) message()=> store.getters.인자;
         */
        todoItems: function(state/* 고정 */){
            return state.todoItems;
        },
    },
});
