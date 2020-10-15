import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

class History extends Component {
  render() {
    const { pets, services } = this.props;
    return (
      <div className="row my-4">
        <div className="col-12">
          <ul className="collapsible">
            {pets.length > 0 && services.length ? (
              pets.map((pet) => (
                <li>
                  <div className="collapsible-header">
                    {pet.name}
                    <i className="material-icons options-icon">more_vert</i>
                  </div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="row">
                          {pet.appointments.map((appointment) => (
                            <div className="w-100">
                              <h2>
                                <span>Last Appointment</span>
                                <span style={{ float: "right" }}>
                                  {appointment.date}
                                </span>
                              </h2>
                              <hr/>
                              <h4 className="history-title">Service</h4>
                              <div>
                                {pet.services.map(
                                  (service) =>
                                    service.id === appointment.service_id && (
                                      <Card.Meta>
                                        <ul className="service-list">
                                          <li>
                                            <h3 className="ml-3 history-info">{service.name}</h3>
                                          </li>
                                        </ul>
                                      </Card.Meta>
                                    )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-md-4 options-right">
                        <a className="list-option w-100 text-left">
                          Appointment History
                          <i className="card-icon material-icons left">
                            history
                          </i>
                        </a>
                        <a className="list-option w-100 text-left">
                          Some Other Option
                          <i className="card-icon material-icons left">
                            history
                          </i>
                        </a>

                        <a className="list-option-delete w-100 text-left">
                          Delete Pet
                          <i className="card-icon material-icons left">
                            remove_circle_outline
                          </i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <Card>
                <Card.Content>
                  <Card.Header>No Pets</Card.Header>
                </Card.Content>
              </Card>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default History;

// ready

// {pet.services.map((service) => (
//   <Card>
//     <Card.Description>
//       <strong>Service Type: {service.name}</strong>
//     </Card.Description>
//     <Card.Description></Card.Description>
//   </Card>
// ))}
