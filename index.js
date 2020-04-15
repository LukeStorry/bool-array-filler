import {
  html,
  render,
  Component,
} from "https://unpkg.com/htm/preact/standalone.module.js";

const Resizer = ({ array, updateCallback }) => {
  const setWidth = (n) => {
    if (n > array[0].length) {
      const newCells = Array(n - array[0].length).fill(0);
      array = array.map((r) => r.concat(newCells));
    }

    if (n < array[0].length) array = array.map((r) => r.slice(0, n - array[0].length));

    updateCallback(array);
  };

  const setHeight = (n) => {
    if (n > array.length) {
      const newRow = () => Array(array[0].length).fill(0);
      const newRows = Array.from({ length: n - array.length }, newRow);
      array = array.concat(newRows);
    }
    
    if (n < array.length) array = array.slice(0, n - array.length);

    updateCallback(array);
  };

  const clamped = (n) => Math.min(Math.max(n, 1), 99);

  return html`
    <div class="resizer">
      <div>
        <label>Width</label>
        <input
          onChange=${(e) => setWidth(clamped(e.target.value))}
          type="number"
          value=${array[0].length}
          min="1"
          max="99"
        />
      </div>
      <div>
        <label>Height</label>
        <input
          onChange=${(e) => setHeight(clamped(e.target.value))}
          type="number"
          value=${array.length}
          min="1"
          max="99"
        />
      </div>
    </div>
  `;
};

const Input = ({ array, updateCallback }) => {
  const updateCell = (rowIndex, colIndex) => () => {
    array[rowIndex][colIndex] ^= 1;
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
      <${Resizer} array=${array} updateCallback=${updateCallback} />
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
      array: Array.from({ length: 12 }, () =>
        Array.from({ length: 12 }, () => 0)
      ),
    });

  render = () => html`
    <${Input}
      array=${this.state.array}
      updateCallback=${(array) => this.setState({ array })}
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
