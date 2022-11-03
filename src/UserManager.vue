<template>
    <div>
        <a-divider />
        <div>
            <h1>Редактор пользователей</h1>
        </div>
        <a-divider />
        <div>
            <a-space size="small"> 
                <a-button @click="addUser()">Добавить пользователя</a-button>
                <a-button @click="currentUserEdit()">Изменить пользователя</a-button>
                <a-button>Удалить пользователя</a-button>
            </a-space> 
        </div>
        <a-divider />
        <div>
            Таблица
            <a-table
             bordered 
             :data-source="dataSource" 
             :columns="columns"
             :row-selection="{onChange: onSelectChange}"
            >
            </a-table>
        </div>
    </div>
</template>
<script>
    import jobList from './data/jobList.json'
    export default{
        data(){
            return{
                dataSource: jobList,
                columns:[
                    {
                        title: '№ п/п',
                        dataIndex: 'id',
                    },
                    {
                        title: 'Должность',
                        dataIndex: 'Job'
                    },
                    {
                        title: 'Описание должности',
                        dataIndex:'JobDescription'
                    }
                ]
            }
        },
        computed:{
            hasSelected(){
                return this.selectedRowKeys.length>0;
            },
        },
        methods: {
            addUser(){
                console.log('add user method is used!')
            },
            currentUserEdit(){
                console.log('user edit method is used!')
            },
            onSelectChange(selectedRowKeys){
                console.log('selectedRowKeys changed:', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            }
        }
    }
</script>