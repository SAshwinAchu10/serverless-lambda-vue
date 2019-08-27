<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap>
      <v-flex md12>
        <div>
          <material-card
            color="general"
            title="User">
            <v-spacer/>
            <v-toolbar
              id="core-toolbar"
              dark
              style="background: #424242;"
              flat
              prominent>
              
              <div class="v-toolbar-title">
                <v-select
                  :items="items"
                  select:
                  selected-type
                  item-text="state"
                  item-value="abbr"
                  label="Select Type"
                  class="role-select"
                  persistent-hint
                  return-object
                  single-line
                  @change="select"/>
                  
              </div>
              <v-spacer/>
            </v-toolbar>
            <v-dialog
              v-model="dialog"
              max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="secondary"
                  dark
                  class="mb-2"
                  v-on="on">New User</v-btn>
                  <v-btn @click="refresh" class="ma-2" color="black" dark>
                      <v-icon dark>refresh</v-icon>
                  </v-btn>
              </template>
              <v-card>
                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy">
                  <v-card-text>Add New User</v-card-text>
                  <v-card-text>
                    <v-container grid-list-md >
                      <v-layout wrap>
                        <v-flex
                          xs12
                          sm6
                          md4>
                          <v-text-field
                            v-model="editedItem.name"
                            :rules="nameRules"
                            label="Name" />
                        </v-flex>
                        <v-flex
                          xs12
                          sm6
                          md4>
                          <v-text-field
                            v-model="editedItem.email"
                            :error-messages="errorMessages"
                            :rules="[rules.required, rules.email]"
                            required
                            label="Email" />
                        </v-flex>
                        <v-flex
                          xs12
                          sm6
                          md4>
                          <v-text-field
                            v-model="editedItem.type"
                            :rules="nameRules"
                            required
                            label="Type"/>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      color="blue darken-1"
                      flat
                      @click="close">Cancel</v-btn>
                    <v-btn
                      color="blue darken-1"
                      flat
                      @click="save">Save</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
            <v-data-table
              :headers="headers"
              :items="UserList"
              :rows-per-page-items ="rowsAmount"
              :search="search"
              class="elevation-1"
            >
              <template
                slot="headerCell"
                slot-scope="{ header }">
                <span
                  class="subheading font-weight-light text-general text--darken-3"
                  v-text="header.text" />
              </template>

              <template v-slot:items="props">
                <td>
                  {{ props.item._id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.type }}</td>
              </template>
            </v-data-table>
            <v-snackbar
              v-model="snack"
              :timeout="3000"
              :color="snackColor">
              {{ snackText }}
              <v-btn
                flat
                @click="snack = false">Close</v-btn>
            </v-snackbar>
          </material-card>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ['Employee', 'Admin', 'Manager'],
    errorMessages: '',
    max25chars: v => v.length <= 25 || 'Input too long!',
    UserList: [],
    rules: {
      required: value => !!value || 'Required.',
      counter: value => value.length <= 20 || 'Max 20 characters',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      }
    },
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
    ],
    selectedType: 'Select',
    rowsAmount: [15, 20, 25, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 }],
    dialog: false,
    search: '',
    headers: [
      { text: 'Id', align: 'left', value: '_id' },
      { text: 'Name', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Type', value: 'type' }

    ],
    editedIndex: -1,
    editedItem: {
      name: '',
      type: '',
      username: '',
      password: '',
      email: '',
      isAdmin: true,
      isActive: true
    },
    defaultItem: {

    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    name () {
      this.errorMessages = ''
    }
  },
  created () {
    this.getUsers()
  },

  

  methods: {
    getUsers () {
      this.$http.get('/user')
        .then(response => {
          console.log('res', response)
          this.UserList = response.data
        })
        .catch(error => console.log(error))
    },
    select (e) {
      this.$http.get('/user/q?type=' + e.toLowerCase())
        .then(response => {
          this.UserList = response.data
        })
        .catch(error => console.log(error))
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    refresh(){
      this.getUsers()
    },

    save () {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          Object.assign(this.UserList[this.editedIndex], this.editedItem)
          let tableItem = this.editedItem
          let endpoint = `users/${this.editedItem.username}`
          let method = 'patch'
          this.$store.dispatch('updateTableItem', { endpoint, tableItem, method })
            .then((response) => this.saveInline())
            .catch(error => {
              console.log('err')
            })
        } else {
          this.$http.post('/user', this.editedItem)
            .then(response => {
              this.UserList.push(response.data)
              this.close()
            })
            .catch(error => console.log(error))
        }
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>

<style>
table.v-table thead tr {
    color: red !important;
}

tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
}

div.v-toolbar-title {
    margin-left: 82% !important;
}

div.v-menu__content.theme--light.menuable__content__active {
    left: 0px !important;
}
button.ma-2.v-btn.theme--dark.black{
      margin-left: 1%!important;
}
</style>
