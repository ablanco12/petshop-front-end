import React, { Component } from "react";
import { Dropdown, Checkbox, Form } from "semantic-ui-react";
// import SearchCheckIn from "./SearchCheckIn";

class CheckInForm extends Component {
  render() {
    const {
      services,
      servicesOnClick,
      selectPetOnClick,
      pets,
      checkIn,
    } = this.props;

    const serviceOption =
      services.length > 0 &&
      services.map((service) => ({
        key: service.id,
        text: service.name,
        value: service.id,
      }));

    const petOption =
      pets.length > 0 &&
      pets.map((pet) => ({
        key: pet.id,
        text: pet.name,
        value: pet.id,
      }));

    const CheckboxExampleCheckbox = () => (
      <Checkbox className="profile-checkbox" label="Make my profile visible" />
    );

    return (
      <div className=" ">
        <Form className="container" onSubmit={checkIn}>
          <Form className="row m-0">
            <div className="col-6">
              <Dropdown className=""
                placeholder="Pet"
                options={petOption}
                search
                selection
                fluid
                allowAdditions
                onChange={selectPetOnClick}
              />
            </div>
            <div className="col-6">
              <Dropdown className=""
                placeholder="Service"
                options={serviceOption}
                search
                selection
                fluid
                allowAdditions
                onChange={servicesOnClick}
              />
            </div>

            <div className="col-12 py-3">
              {CheckboxExampleCheckbox()}
            </div>
          </Form>
          <div className="col-12">
            <button className="ui secondary button next-btn">Check In</button>
            <button className="ui button cancel">Cancel</button>
          </div>
        </Form>

      </div>
    );
  }
}

export default CheckInForm;

{
  /* <SearchCheckIn
          handleResultSelect={this.props.handleResultSelect}
          handleSearchChange={this.props.handleSearchChange}
          pets={this.props.pets}
          isLoading={this.props.isLoading}
          results={this.props.results}
          value={this.props.value}
        /> */
}
