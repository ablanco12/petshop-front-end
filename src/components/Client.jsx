import React, { Component } from "react";
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";
import { Link } from "react-router-dom";
import defaultImg from '../assets/img/flat-dog-default-2.png';
// import AddPet from "./AddPet";

class Client extends Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init(elems, {});
    });
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems, {});
    });

  }

  render() {

    return (
      <div className="row my-4">
        <div className="col-12">
          <ul className="collapsible">
            {this.props.filteredClients.length ? (
              this.props.filteredClients.map((client) => (
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons non-vip-icon">star_border</i>
                    ({client.id}) - {client.lastname}, {client.firstname}
                    <i className="material-icons options-icon">more_vert</i>
                  </div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col-md-6 mt-3">
                            <p className="card-text mb-3">
                              <span className="phone-title">
                                <i className="material-icons info-icon">contact_phone</i>
                            Home Phone
                            </span>
                              <br />
                              <span className="phone-number">{client.homephone}</span>
                            </p>
                          </div>
                          <div className="col-md-6 mt-3">
                            <p className="card-text">
                              <span className="phone-title">
                                <i className="material-icons info-icon">contact_phone</i>
                          Alternate Phone
                          </span>
                              <br />
                              <span className="phone-number">{client.workphone}</span>
                            </p>
                          </div>
                          <div className="col-md-12 mt-3">
                            <p className="card-text">
                              <span className="phone-title">
                                <i className="material-icons info-icon">contact_mail</i>
                          Email Address
                          </span>
                              <br />
                              <span className="phone-number">n/a</span>
                            </p>
                          </div>
                        </div>





                      </div>
                      <div className="col-md-3 options-right">
                        <a
                          className="list-option w-100 text-left"
                          onClick={() => this.props.clientPetOnClick(client)}
                        >
                          Pets list
                    <i className="card-icon material-icons left">list</i>
                        </a>
                        <a
                          className="list-option w-100 text-left"
                          onClick={() => this.props.clientOnClickEdit(client)}
                        >
                          Edit
                    <i className="card-icon material-icons left">edit</i>
                        </a>
                        <a
                          className="list-option w-100 text-left"
                          id={client.id}
                          onClick={() => this.props.addingPetToAClient(client)}
                        >
                          Add a Pet
                    <i className="card-icon material-icons left">add_circle_outline</i>
                        </a>
                        <a
                          className="list-option-delete w-100 text-left"
                          onClick={() => this.props.deleteClientHandleClick(client)}
                        >
                          Delete Client
                    <i className="card-icon material-icons left">remove_circle_outline</i>
                        </a>
                      </div>
                    </div>

                  </div>


                  {/* <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={defaultImg} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4 mb-5">
                    ({client.id}),
                      {client.lastname}, {client.firstname}
                    <i className="material-icons right">more_vert</i></span>
                  <hr />
                  <p className="card-text mb-3">
                    <span className="phone-title">Home Phone:</span>
                    <span className="phone-number">{client.homephone}</span>
                  </p>
                  <p className="card-text">
                    <span className="phone-title">Work Phone:</span>
                    <span className="phone-number">{client.workphone}</span>
                  </p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4 mb-5">
                    Options
                    <i className="material-icons right">close</i>
                  </span>
                  <a
                    className="list-option w-100 text-left"
                    onClick={() => this.props.clientPetOnClick(client)}
                  >
                    Pets list
                    <i className="card-icon material-icons left">list</i>
                  </a>
                  <a
                    className="list-option w-100 text-left"
                    onClick={() => this.props.clientOnClickEdit(client)}
                  >
                    Edit
                    <i className="card-icon material-icons left">edit</i>
                  </a>
                  <a
                    className="list-option w-100 text-left"
                    id={client.id}
                    onClick={() => this.props.addingPetToAClient(client)}
                  >
                    Add a Pet
                    <i className="card-icon material-icons left">add_circle_outline</i>
                  </a>
                  <a
                    className="list-option-delete w-100 text-left"
                    onClick={() => this.props.deleteClientHandleClick(client)}
                  >
                    Delete Client
                    <i className="card-icon material-icons left">remove_circle_outline</i>
                  </a>
                </div>
              </div> */}

                  {/* <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    ({client.id}),
                      {client.lastname}, {client.firstname}
                  </h5>
                  <p className="card-text">home phone: {client.homephone}</p>
                  <p className="card-text">workphone: {client.workphone}</p>
                  <a
                    className="btn btn-secondary"
                    onClick={() => this.props.clientPetOnClick(client)}
                  >
                    Pets list
                    </a>
                  <a
                    className="btn btn-primary ml-1"
                    id={client.id}
                    onClick={() => this.props.addingPetToAClient(client)}
                  >
                    Add a Pet
                    </a>
                  <a
                    className="btn btn-danger ml-1"
                    onClick={() => this.props.deleteClientHandleClick(client)}
                  >
                    Delete Client
                    </a>
                  <a
                    className="btn btn-primary ml-1"
                    onClick={() => this.props.clientOnClickEdit(client)}
                  >
                    Edit
                    </a>
                </div>
              </div> */}
                </li>

              ))
            )
              : (
                <div className="col-12 text-center py-5">
                  <h1>No Clients</h1>
                </div>
              )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Client;
