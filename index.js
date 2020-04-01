import {
  html,
  render,
  Component
} from "https://unpkg.com/htm/preact/standalone.module.js";

const ResizerButtons = ({ array, updateCallback }) => {
  const addWidth = () => updateCallback(array.map(r => r.concat([0])));

  const removeWidth = () => updateCallback(array.map(r => r.slice(0, -1)));

  const addHeight = () =>
    updateCallback(array.concat([Array(array[0].length).fill(0)]));

  const removeHeight = () => updateCallback(array.slice(0, -1));

  return html`
    <div>
      <button onClick=${addWidth}>+ width</button>
      <button onClick=${removeWidth}>- width</button>
      <button onClick=${addHeight}>+ height</button>
      <button onClick=${removeHeight}>- height</button>
    </div>
  `;
};

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
            class=${active ? "active cell" : "cell"}
            onClick=${updateCell(rowIndex, colIndex)}
          />
        `
      )}
    </div>
  `;

  return html`
    <section>
      ${array.map(createRow)}
      <${ResizerButtons} array=${array} updateCallback=${updateCallback} />
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
