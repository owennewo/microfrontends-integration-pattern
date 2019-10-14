var templateHTML = `
<p>html element says: {{text}} </p>
<button type="submit" class="btn btn-secondary">Send text</button>`;

class ChildHtmlElement extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this.replaceContent(this.getAttribute('text'));
      
    }

    

    static get observedAttributes() {
        return ['text'];
      }
      
      attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
          case 'text':
            console.log('attribute has change to \'' + newValue +'\'');
            this.replaceContent(newValue);
            break;
         default:
             console.log('unknown attribute: ' + name);
        }
      }

      replaceContent(text) {
        while (this._shadowRoot.firstChild) this._shadowRoot.firstChild.remove();
      
        const template = document.createElement('template');
        template.innerHTML = templateHTML.replace('{{text}}', text);
        
        var node = template.content.cloneNode(true);

        node.lastChild.addEventListener('click', this.onClick);
        this._shadowRoot.appendChild(node);
      }

      onClick() {
        this.dispatchEvent(new CustomEvent('onHelloEvt',
        {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: 'sending message'}
        ));
      }
  }

  window.customElements.define('custom-html-element', ChildHtmlElement);