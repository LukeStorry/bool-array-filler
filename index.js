import {
  html,
  render,
  Component
} from "https://unpkg.com/htm/preact/standalone.module.js";

const Counter = ({ count }) =>
  html`
    <h3>Count: ${count}</h3>
  `;

const Button = ({ onClick }) =>
  html`
    <button onClick=${onClick}>Increment</button>
  `;

class App extends Component {
  Increment = () => {
    const { count = 0 } = this.state;
    this.setState({ count: count + 1 });
  };

  render = () => html`
    <section>
      <${Counter} count=${this.state.count} />
      <${Button} onClick=${this.Increment} />
    </section>
  `;
}

render(
  html`
    <${App} />
  `,
  document.body
);
