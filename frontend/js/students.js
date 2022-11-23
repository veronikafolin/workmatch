const studentscomp = { 
    template: `
    <div>
    <h2>Students page</h2>
        <div v-for="student in students">
            name: {{student.name}}
            surname: {{student.surname}}
            email: {{student.email}}
        </div>
    </div>`,

    data(){
        return{
            students: []
        }
    }, 
    methods: {
        list_students(){
            axios.get('http://localhost:3000/api/students')
            .then(res =>{
                this.students = res.data
            })
            .catch(err => {console.log(err)});
        },
        init(){
            this.list_students()
        }
    },
    mounted(){
        this.init()
    }
}