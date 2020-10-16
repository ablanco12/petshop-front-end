import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

class CheckedIn extends Component {
  state = {};
  render() {
    const { appointments, pets, services } = this.props;
    console.log("appointment", appointments);
    console.log("pets", pets);

    const data = [];

    if (appointments.length > 0 && pets.length > 0)
      pets.forEach((pet) => {
        appointments.forEach((a) => {
          services.forEach((s) => {
            if (
              a.pet_id === pet.id &&
              a.service_id === s.id &&
              a.finish === null
            ) {
              data.push({
                appointmentId: a.id,
                petName: pet.name,
                petId: a.pet_id,
                service: s.name,
                date: a.date,
              });
            }
          });
        });
      });

    return (
      <Card.Group>
        {data.length > 0 ? (
          data.reverse().map((d) => (
            <Card>
              <Card.Content>
                <Card.Header>Name: {d.petName}</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description><b>Service:</b> {d.service}</Card.Description>
                <Card.Description><b>Date:</b> {d.date}</Card.Description>
                <br />
                <Button
                  basic
                  color="pink"
                  onClick={() => this.props.finishOnClick(d)}
                >
                  Done
                </Button>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card>
            <Card.Content>
              <Card.Header>No animals are checked in</Card.Header>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    );
  }
}
export default CheckedIn;
