const Operations = {
  bold() {
    document.execCommand("bold");
  },

  italic() {
    document.execCommand("italic");
  },

  underline() {
    document.execCommand("underline");
  },

  strikeThrough() {
    document.execCommand("strikeThrough");
  },

  createLink() {
    if (this.getSelectionParentNode().tagName === "A") {
      document.execCommand("unlink");
      return;
    }

    let href = prompt("Enter the URL to link to:");
    document.execCommand("createLink", false, href);
  },

  insertUnorderedList() {
    document.execCommand("insertUnorderedList");
  },

  insertOrderedList() {
    document.execCommand("insertOrderedList");
  },

  justifyLeft() {
    document.execCommand("justifyLeft");
  },

  justifyRight() {
    document.execCommand("justifyRight");
  },

  justifyCenter() {
    document.execCommand("justifyCenter");
  },

  justifyFull() {
    document.execCommand("justifyFull");
  },

  getSelectionParentNode() {
    return getSelection().anchorNode.parentNode;
  },
};

const App = {
  init() {
    this.operations = Object.create(Operations);
    this.buttons = document.querySelector(".buttons");

    this.bind();

    return this;
  },

  bind() {
    this.buttons.addEventListener(
      "click",
      this.handleOperationClick.bind(this)
    );

    document.addEventListener("selectionchange", (event) => {
      this.toggleButtons();
    });
  },

  handleOperationClick(event) {
    let button = event.target.closest("button");
    this.selectButton(button);

    this.operations[button.dataset.type](button);
    this.toggleButtons();
  },

  selectButton(button) {
    button.classList.add("selected");
  },

  toggleButtons() {
    for (let button of this.buttons.children) {
      let operation = button.dataset.type;

      if (document.queryCommandState(operation)) {
        this.selectButton(button);
      } else {
        button.classList.remove("selected");
      }
    }
  },
};

App.init();
