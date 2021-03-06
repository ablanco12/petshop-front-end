import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

class AddPet extends Component {
  render() {
    const {
      petInfo,
      submitingPet,
      breeds,
      petInfoInputChange,
      petBreedOnChange,
    } = this.props;

    const breedOption =
      breeds.length > 0 &&
      breeds.map((breed) => ({
        key: breed.id,
        text: breed.name,
        value: breed.id,
      }));
    return (
      <div>
        <Form onSubmit={submitingPet}>
          <h1>Pet Information</h1>
          <Form.Group unstackable widths={2}>
            <Form.Input
              
              placeholder="Name"
              id="name"
              name="name"
              value={petInfo.name}
              onChange={petInfoInputChange}
            />
            <Form.Input
              
              placeholder="Color"
              onChange={petInfoInputChange}
              id="color"
              name="color"
              value={petInfo.color}
            />
            <Dropdown
              placeholder="Breed"
              options={breedOption}
              search
              selection
              fluid
              allowAdditions
              onChange={petBreedOnChange}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <div className="field">
              <label>Special Concerns</label>
              <textarea
                
                rows="2"
                name="specialconcerns"
                onChange={petInfoInputChange}
                value={petInfo.specialconcerns}
                id="specialconcerns"
              ></textarea>
            </div>
            <Form.Input
              type="date"
              label="Rabies"
              placeholder="mm/dd/yyyy"
              name="rabies"
              onChange={petInfoInputChange}
              value={petInfo.rabies}
            />
          </Form.Group>
          <button className="ui button">Submit</button>
          <Link to="/client">
            <button className="back-button ui button">Back</button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default AddPet;

/* <form className="needs-validation" noValidate onSubmit={submitingPet}>
          <div className="form-row">
            <div className="col-md-4 mb-3">
              <label for="validationCustom01">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={petInfo.name}
                onChange={petInfoInputChange}
                required
              ></input>
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="dropdown mt-4">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {this.props.breedName === "" ? "Breed" : this.props.breedName}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {breeds.map((breed) => (
                    <a
                      className="dropdown-item"
                      onClick={() => petBreedOnChange(breed)}
                      id={breed.id}
                      key={breed.id}
                    >
                      {breed.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="valid-feedback">Looks good!</div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-6 mb-3">
              <label for="validationCustom03">Color</label>
              <input
                type="text"
                className="form-control"
                onChange={petInfoInputChange}
                id="color"
                name="color"
                value={petInfo.color}
                required
              ></input>
              <div className="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label for="validationCustom05">special concerns</label>
              <input
                type="text"
                className="form-control"
                name="specialconcerns"
                onChange={petInfoInputChange}
                value={petInfo.specialconcerns}
                id="specialconcerns"
                required
              ></input>
              <div className="invalid-feedback">
                Please provide a corncerns.
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={petInfo.rabies}
                id="invalidCheck"
                required
              ></input>
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </form> */

// {breeds.map((breed) => (
//   <option
//     value=""
//     onClick={() => petBreedOnChange(breed)}
//     id={breed.id}
//     key={breed.id}
//   >
//     {breed.name}
//   </option>
// ))}

// <select className="ui dropdown">

/* <option value="">Breed</option>
{breeds.map((breed) => (
  <option
    onClick={() => petBreedOnChange(breed)}
    id={breed.id}
    key={breed.id}
  >
    {breed.name}
  </option>
))}
</select> */
