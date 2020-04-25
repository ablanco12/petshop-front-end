import React, { Component, Fragment } from "react";
import Home from "./components/Home";
import FormApplication from "./components/FormApplication";
import CustomNav from "./components/CustomNav";
import Current from "./components/Current";
import Client from "./components/Client";
import SignUp from "./components/SignUp";
import AddPet from "./components/AddPet";
import PetList from "./components/PetList";
import EditPet from "./components/EditPet";

import "./App.css";

import { Switch, Route, withRouter } from "react-router-dom";

class App extends Component {
  state = {
    accounts: {
      username: "",
      password: "",
    },
    clientInfo: {
      firstname: "",
      lastname: "",
      homephone: "",
      workphone: "",
    },
    petInfo: {
      name: "",
      color: "",
      specialconcerns: "",
      rabies: "",
    },
    clients: "",
    client_id: "",
    clientName: "",
    breedId: "",
    breedName: "",
    clientPets: "",
  };

  componentDidMount() {
    this.fetchingAllClients();
    this.fetchingAllBreed();
  }

  fetchingAllClients = () => {
    fetch(`http://localhost:3000/clients`)
      .then((resp) => resp.json())
      .then((clients) => {
        this.setState({
          clients,
        });
      });
  };

  fetchingAllBreed = () => {
    fetch(`http://localhost:3000/breeds`)
      .then((resp) => resp.json())
      .then((breeds) => {
        this.setState({
          breeds,
        });
      });
  };

  submitingPet = (event) => {
    this.props.history.push("pet");
    const { petInfo, breedId, client_id, clientName } = this.state;
    event.preventDefault();
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pet: {
          name: petInfo.name,
          color: petInfo.color,
          specialconcerns: petInfo.specialconcerns,
          rabies: petInfo.rabies,
          breed_id: breedId,
          client_id: client_id,
        },
      }),
    };
    fetch(`http://localhost:3000/pets`, configObj)
      .then((resp) => resp.json())
      .then((pet) => {
        this.setState({
          petInfo: {
            name: "",
            color: "",
            specialconcerns: "",
            rabies: "",
          },
        });
        const client_id = this.state.client_id;
        this.fetchingClientPets(client_id);
      });
  };

  submitingEditPet = (event) => {
    event.preventDefault();
    const { petInfo, client_id, breedId } = this.state;
    const petId = petInfo.id;
    const configObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pet: {
          name: petInfo.name,
          color: petInfo.color,
          specialconcerns: petInfo.specialconcerns,
          rabies: petInfo.rabies,
          breed_id: breedId,
          client_id: client_id,
        },
      }),
    };
    fetch(`http://localhost:3000/pets/${petId}`, configObj)
      .then((resp) => resp.json())
      .then((pet) => {
        console.log(pet);
        this.fetchingClientPets(client_id);
        this.setState({
          petInfo: {
            name: "",
            color: "",
            specialconcerns: "",
            rabies: "",
          },
        });
      });
    this.props.history.push("/pet");
  };
  petBreedOnChange = (breed) => {
    const breedId = breed.id;
    const breedName = breed.name;
    this.setState({ breedId });
    this.setState({ breedName });
  };

  petInfoInputChange = (event) => {
    const petInfo = { ...this.state.petInfo };
    petInfo[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ petInfo });
  };

  handleLoginChange = (event) => {
    const login = { ...this.state.login };
    login[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ login });
  };

  handleChange = (event) => {
    const accounts = { ...this.state.accounts };
    accounts[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ accounts });
  };

  formHandleChange = (event) => {
    const clientInfo = { ...this.state.clientInfo };
    clientInfo[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ clientInfo });
  };

  handleClick = (event) => {
    const { login } = this.state;
    event.preventDefault();
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: login.username,
          password: login.password,
        },
      }),
    };
    fetch(`http://localhost:3000/login`, configObj)
      .then((resp) => resp.json())
      .then((json) => {
        // console.log("json", json);
        if (!json.hasOwnProperty("error")) {
          window.localStorage.setItem("token", json.jwt);
          window.localStorage.setItem("username", json.user.username);
          window.localStorage.setItem("userId", `${json.user.id}`);
          // window.location.assign("http://localhost:3000/users");
          this.setState({ current_user: json.user });
          // console.log("fetching", json);
        } else {
          this.setState({ error: json.error });
        }
      })
      .then((data) => {
        const localUserId = localStorage.getItem("userId");

        if (localUserId) {
          this.fetchCurrentUser(localUserId);
        }
      })
      .catch((error) => console.log("username or password did not match"));
    this.setState({
      username: "",
      password: "",
    });

    this.props.history.push("/");
  };

  fetchingClientPets = (client_id) => {
    console.log("client info");
    fetch(`http://localhost:3000/clients/${client_id}`)
      .then((resp) => resp.json())
      .then((pets) => {
        console.log("my response", pets);
        this.setState({
          clientPets: pets,
        });
      });
  };

  addingPetToAClient = (client) => {
    const client_id = client.id;
    this.fetchingClientPets(client_id);
    this.setState({ client_id });
    this.setState({ clientName: client.firstname });
    this.props.history.push("/addPet");
  };

  addingUser = (event) => {
    event.preventDefault();

    const { accounts } = this.state;
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: accounts.username,
          password: accounts.password,
        },
      }),
    };
    fetch(`http://localhost:3000/signup`, configObj)
      .then((resp) => resp.json())
      .then((json) => {
        console.log("json", json);
        this.props.history.push("/");
      });
  };

  clientPetOnClick = (client) => {
    const client_id = client.id;
    this.fetchingClientPets(client_id);
    this.setState({ client_id });
    this.setState({ clientName: client.firstname });
    this.props.history.push("/pet");
  };

  petOnClickDelete = (pet) => {
    const petId = pet.id;
    const pets = this.state.clientPets.filter((d) => d.id !== petId);
    this.setState({ clientPets: pets });
    fetch(`http://localhost:3000/pets/${petId}`, {
      method: "DELETE",
    });
  };

  deletePetHandleClick = (client) => {
    const clientId = client.id;
    const clients = this.state.clients.filter((c) => c.id !== clientId);
    this.setState({ clients });
    fetch(`http://localhost:3000/clients/${clientId}`, {
      method: "DELETE",
    });
  };

  petOnClickEdit = (pet) => {
    this.setState({ petInfo: pet });
    this.props.history.push("/editPet");
  };

  addingClient = (event) => {
    event.preventDefault();
    const { clientInfo } = this.state;
    fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client: {
          lastname: clientInfo.lastname,
          firstname: clientInfo.firstname,
          homephone: clientInfo.homephone,
          workphone: clientInfo.workphone,
        },
      }),
    })
      .then((r) => r.json())
      .then((client) => {
        console.log("after submitting", client);
        this.setState({
          clientInfo: {
            firstname: "",
            lastname: "",
            homephone: "",
            workphone: "",
          },
        });
        this.fetchingAllClients();
      });
    this.props.history.push("/client");
  };

  render() {
    return (
      <Fragment>
        <div>
          <CustomNav />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route
              exact
              path="/form"
              render={() => (
                <FormApplication
                  addingClient={this.addingClient}
                  clientInfo={this.state.clientInfo}
                  formHandleChange={this.formHandleChange}
                />
              )}
            />
            <Route exact path="/current" render={() => <Current />} />
            <Route
              exact
              path="/client"
              render={() => (
                <Client
                  deletePetHandleClick={this.deletePetHandleClick}
                  clients={this.state.clients}
                  addingPetToAClient={this.addingPetToAClient}
                  clientPetOnClick={this.clientPetOnClick}
                  clientPets={this.state.clientPets}
                />
              )}
            />
            <Route exact path="/customnav" render={() => <CustomNav />} />
            <Route
              exact
              path="/signup"
              render={() => (
                <SignUp
                  handleChange={this.handleChange}
                  accounts={this.state.accounts}
                  addingUser={this.addingUser}
                />
              )}
            />
            <Route
              exact
              path="/addPet"
              render={() => (
                <AddPet
                  petOnClickEdit={this.petOnClickEdit}
                  petInfo={this.state.petInfo}
                  breeds={this.state.breeds}
                  submitingPet={this.submitingPet}
                  petInfoInputChange={this.petInfoInputChange}
                  clientPets={this.state.clientPets}
                  petBreedOnChange={this.petBreedOnChange}
                  breedName={this.state.breedName}
                />
              )}
            />
            <Route
              exact
              path="/editPet"
              render={() => (
                <EditPet
                  petInfo={this.state.petInfo}
                  breeds={this.state.breeds}
                  submitingEditPet={this.submitingEditPet}
                  petInfoInputChange={this.petInfoInputChange}
                  clientPets={this.state.clientPets}
                  petBreedOnChange={this.petBreedOnChange}
                  breedName={this.state.breedName}
                />
              )}
            />
            <Route
              exact
              path="/pet"
              render={() => (
                <PetList
                  clientPets={this.state.clientPets}
                  clientName={this.state.clientName}
                  petOnClickDelete={this.petOnClickDelete}
                  petOnClickEdit={this.petOnClickEdit}
                />
              )}
            />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(App);
