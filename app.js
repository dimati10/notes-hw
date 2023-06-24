const App = {
    data() {
        return {
            title: 'Notes',
            input: {
                value: '',
                placeholder: 'Type ur note'
            },
            notes: [
                {
                    id: 1,
                    title: 'task1',
                    isEdit: false,
                    editingVal: ''
                },
                {
                    id: 2,
                    title: 'task2',
                    isEdit: false,
                    editingVal: ''
                },
                {
                    id: 3,
                    title: 'task3',
                    isEdit: false,
                    editingVal: ''
                },
            ],
        }
    },
    mounted() {
        this.getNotes();
    },
    watch: {
        notes: {
            handler(updatedList) {
                localStorage.setItem('notes', JSON.stringify(updatedList));
            },
            deep: true
        }
    },
    methods: {
        getNotes() {
            const localNotes = localStorage.getItem('notes');
            if (localNotes) {
                this.notes = JSON.parse(localNotes);
                this.notes.forEach(item => {
                    item.isEdit = false;
                    if (item.editingVal) {
                        item.title = item.editingVal;
                    }
                });
            }
        },

        onSubmit() {
            this.notes.push({
                id: Date.now(),
                title: this.input.value,
                isEdit: false,
                editingVal: ''
            });
            this.input.value = '';
        },

        remove(note) {
            console.log(`note: ${note.id} has been removed`);
            this.notes = this.notes.filter(n => n.id !== note.id);
        },

        edit(note) {
            note.isEdit = true;
            note.editingVal = note.title;
        },

        onEdit(note) {
            note.isEdit = false;
            note.editingVal = '';
        }
    }
}

Vue.createApp(App).mount('#app');