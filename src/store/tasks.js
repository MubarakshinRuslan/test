export default{
    state:{
        tasks:[
            {
                key: '1',
                id: '1',
                name: 'First task',
                startDate: '2022/01/01',
                endDate: '2022/02/01',
                user:'user1',
                isStarted: true,
                tags: {
                    isExpired: false,
                    isDificult: true,
                }
            },
            {
                key: '2',
                id: '123',
                name: 'Second task',
                startDate: '2021/01/01',
                endDate: '2021/03/01',
                user:'user1',
                isStarted: true,
                tags: {
                    isExpired: true,
                    isDificult: false,
                }
            },
            {
                key: '3',
                id: '1431',
                name: 'Third task',
                startDate: '2022/05/01',
                endDate: '2023/01/01',
                user:'user2',
                isStarted: false,
                tags: {
                    isExpired: false,
                    isDificult: true,
                }
            },
        ]
    },
    mutations:{

    },
    actions:{

    },
    getters:{
        tasks (state) {
            return state.tasks
        },
        startedTasks (state) {
          return state.tasks.filter(i => {
            return i.isStarted
          })  
        }
    }
}
