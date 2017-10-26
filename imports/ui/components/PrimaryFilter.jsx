// @flow
import React, { Component } from "react";
import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "./ReactBootstrapLib";

class PrimaryFilter extends Component {
  state = {
    vegan: false,
    vegetarian: false,
    glutenFree: false,
    rawFood: false,
    juice: false,
    supplements: false,
  };

  handleButtonClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    // $FlowFixMe
    const { name } = event.currentTarget;

    this.setState({
      [name]: !this.state[name],
    });
  };

  render() {
    return (
      <div>
        <div>Eat / Drink</div>
        <div>
          <Button
            name="vegan"
            onClick={this.handleButtonClick}
            active={this.state.vegan}
          >
            Vegan
          </Button>

          <Button
            name="vegetarian"
            onClick={this.handleButtonClick}
            active={this.state.vegetarian}
          >
            Vegetarian
          </Button>

          <Button
            name="glutenFree"
            onClick={this.handleButtonClick}
            active={this.state.glutenFree}
          >
            Gluten Free
          </Button>
        </div>
        <div>
          <Button
            name="rawFood"
            onClick={this.handleButtonClick}
            active={this.state.rawFood}
          >
            Raw Food
          </Button>

          <Button
            name="juice"
            onClick={this.handleButtonClick}
            active={this.state.juice}
          >
            Juice
          </Button>

          <Button
            name="supplements"
            onClick={this.handleButtonClick}
            active={this.state.supplements}
          >
            Supplements
          </Button>
        </div>
        <div>Venue</div>
      </div>
    );
  }
}

export default PrimaryFilter;
