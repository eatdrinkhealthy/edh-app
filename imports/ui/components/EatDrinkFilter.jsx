// @flow
import React, { Component } from "react";
import Pill from "./Pill";

class EatDrinkFilter extends Component {
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
          <Pill
            name="vegan"
            onClick={this.handleButtonClick}
            active={this.state.vegan}
          >
            Vegan
          </Pill>

          <Pill
            name="vegetarian"
            onClick={this.handleButtonClick}
            active={this.state.vegetarian}
          >
            Vegetarian
          </Pill>

          <Pill
            name="glutenFree"
            onClick={this.handleButtonClick}
            active={this.state.glutenFree}
          >
            Gluten Free
          </Pill>
        </div>
        <div>
          <Pill
            name="rawFood"
            onClick={this.handleButtonClick}
            active={this.state.rawFood}
          >
            Raw Food
          </Pill>

          <Pill
            name="juice"
            onClick={this.handleButtonClick}
            active={this.state.juice}
          >
            Juice
          </Pill>

          <Pill
            name="supplements"
            onClick={this.handleButtonClick}
            active={this.state.supplements}
          >
            Supplements
          </Pill>
        </div>
      </div>
    );
  }
}

export default EatDrinkFilter;
