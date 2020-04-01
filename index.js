import {
  html,
  render,
  Component
} from "https://unpkg.com/htm/preact/standalone.module.js";

const Input = ({ array, updateCallback }) => {

  const updateCell = (rowIndex, colIndex) => () => {
    array[rowIndex][colIndex] = array[rowIndex][colIndex] ? 0 : 1;
    updateCallback(array);
  };
  
  const createRow = (row, rowIndex) => html`
    <div>
      ${row.map(
        (active, colIndex) => html`
          <button
            class=${active ? "active" : ""}
            onClick=${updateCell(rowIndex, colIndex)}
          />
        `
      )}
    </div>
  `;

  return html`
    <section>
      ${array.map(createRow)}
    </section>
  `;
};

const Output = ({ object }) =>
  html`
    <section>
      <h3>Output</h3>
      <pre>
        <code>
          ${JSON.stringify(object, null, 2)
        .replace(/,\n */g, ", ")
        .replace(/\[\n */g, "[")
        .replace(/\n *]/g, "]\n")
        .replace(/\n,/g, ",\n")}
        </code>
      </pre>
    </section>
  `;

class App extends Component {
  componentWillMount = () =>
    this.setState({
      array: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    });

  render = () => html`
    <${Input}
      array=${this.state.array}
      updateCallback=${array => this.setState({ array })}
    />
    <${Output} object=${this.state.array} />
  `;
}

render(
  html`
    <h1>Bool Array Filler</h1>
    <main><${App} /></main>
  `,
  document.body
);
