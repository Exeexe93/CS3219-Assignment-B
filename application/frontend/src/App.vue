<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4">Welcome to CS3219 Assignment B!</h1>
      <p class="lead">This website is running using Vue and bootstrap!</p>
      <hr class="my-4" />
      <p>
        You could get/post/update/delete contacts through this website to
        comunicate with the backend!
      </p>
      <p>
        Things to take note: Contact Id is used only for update and delete an
        contact!!!
      </p>
    </div>
    <div
      class="alert alert-dismissible fade show"
      v-bind:class="message == '' ? 'alert-light' : 'alert-danger'"
      role="alert"
    >
      {{ message }}
    </div>
    <form>
      <div class="form-group row center-align">
        <label for="contactid" class="col-sm-2 col-form-label"
          >Contact id</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control"
            id="contactid"
            placeholder="5f6b65816f53972bf8fc9662"
            v-model="contactid"
          />
        </div>
      </div>
      <div class="form-group row center-align">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="John Lee"
            v-model="name"
            required
          />
        </div>
      </div>
      <div class="form-group row center-align">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-3">
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="email@example.com"
            v-model="email"
            required
          />
        </div>
      </div>
      <div class="form-group row center-align">
        <label for="phone" class="col-sm-2 col-form-label">Phone no.</label>
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control"
            id="phone"
            placeholder="81234569"
            v-model="phone"
            required
          />
        </div>
      </div>
      <div class="form-group row center-align">
        <label for="gender" class="col-sm-2 col-form-label">Gender</label>
        <div class="col-sm-3">
          <select class="custom-select mr-sm-2" id="gender" v-model="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary mb-3"
        v-on:click="addContact"
      >
        Add new Contact
      </button>
      <button
        type="submit"
        class="btn btn-primary mb-3 ml-5"
        v-on:click="updateContact"
      >
        Update Contact
      </button>
      <button
        type="submit"
        class="btn btn-primary mb-3 ml-5"
        v-on:click="deleteContact"
      >
        Delete Contact
      </button>
    </form>
    <button v-on:click="getContacts" class="btn btn-primary">
      Get All Contacts
    </button>
    <div class="divider" />
    <ul class="list-group">
      <li
        v-for="contact in contacts"
        :key="contact._id"
        class="list-group-item list-group-item-primary"
      >
        <div class="d-flex flex-column w-100 justify-content-between">
          <small>Contact id: {{ contact._id }}</small>
          <small>Name: {{ contact.name }}</small>
          <small>Email: {{ contact.email }}</small>
          <small>Gender: {{ contact.gender }}</small>
          <small>Phone: {{ contact.phone }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      contacts: [],
      contactid: "",
      name: "",
      email: "",
      gender: "",
      phone: "",
      message: "",
    };
  },
  methods: {
    getContacts() {
      axios
        .get("http://localhost:8080/api/contacts")
        .then((response) => {
          this.contacts = response.data.data;

          for (var contact in this.contacts) {
            console.log(this.contacts[contact].gender);
            if (this.contacts[contact].gender == "") {
              this.contacts[contact].gender = "Unknown";
            }
            if (this.contacts[contact].phone == "") {
              this.contacts[contact].phone = "Unknown";
            }
          }

          // Clear the data after submit
          this.name = "";
          this.email = "";
          this.gender = "";
          this.phone = "";
          this.message = "";
        })
        .catch((error) => {
          this.message = error.message;
        });
    },
    addContact(e) {
      e.preventDefault();
      const data = {
        name: this.name,
        email: this.email,
        gender: this.gender,
        phone: this.phone,
      };
      axios
        .post("http://localhost:8080/api/contacts", data)
        .then((response) => {
          if (response.data.message == "New contact created!") {
            this.getContacts();

            // Clear the data after submit
            this.name = "";
            this.email = "";
            this.gender = "";
            this.phone = "";
            this.message = "";
          } else {
            if (response.data.errors.name && response.data.errors.email) {
              this.message = "Name and email are required!";
            } else if (response.data.errors.name) {
              this.message = "Please input your name!";
            } else if (response.data.errors.email) {
              this.message = "Please input your email!";
            }
          }
        })
        .catch(() => {
          this.message =
            "Please submit again! We have problem sending to the database.";
        });
    },
    updateContact(e) {
      e.preventDefault();
      if (this.contactid == "") {
        this.message =
          "Please input contact id to indicate which contact to update";
      } else {
        var data = {};

        // Check for whether the user keep in the value
        if (this.name != "") {
          data["name"] = this.name;
        }
        if (this.email != "") {
          data["email"] = this.email;
        }
        if (this.phone != "") {
          data["phone"] = this.phone;
        }
        if (this.gender != "") {
          data["gender"] = this.gender;
        }

        axios
          .put("http://localhost:8080/api/contacts/" + this.contactid, data)
          .then((response) => {
            console.log(response.data);

            if (response.data.message == "Contact Info updated") {
              this.getContacts();
            }
          })
          .catch((err) => {
            this.message = err.message;
          });
      }
    },
    deleteContact(e) {
      e.preventDefault();
      if (this.contactid == "") {
        this.message =
          "Please input contact id to indicate which contact to delete";
      } else {
        axios
          .delete("http://localhost:8080/api/contacts/" + this.contactid)
          .then((response) => {
            console.log(response.data);
            if (response.data.message == "Contact deleted") {
              this.getContacts();
            }

            this.contactid = "";
            this.name = "";
            this.email = "";
            this.phone = "";
            this.gender = "";
            this.message = "";
          })
          .catch((err) => {
            this.message = err.message;
          });
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.divider {
  height: 40px;
}

.center-align {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
