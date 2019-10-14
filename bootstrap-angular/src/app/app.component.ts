import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bootstrap-angular';

  textToSend = 'Lorem Ipsum';

  scripts = {
    'ng-component-1': {
      'url': 'http://localhost:5001/main.js',
      'customElementName': 'ng-el',
      'containerElementId': 'ng-container1'
    },
    
    'react-component': {
      'url': 'http://localhost:5002/main.js',
      'customElementName': 'react-el',
      'containerElementId': 'react-container'
    },
    'ng-component-2': {
      'url': 'http://localhost:5003/main.js',
      'customElementName': 'ng-el2',
      'containerElementId': 'ng-container2'
    }
  };

  constructor() {
    //this.loadNG();
  }

  // addScript(scriptName: string) {
  //   console.log("load loadNG")
  //   this.loadScript('http://localhost:5001/main.js', 'ng-el', 'ng-container');
  // }

  loadScript(script: any) {
    console.log("load script:" + script.url)
    
    // grab the container
    const container =  document.getElementById(script.containerElementId)
    
    // clear out all children
    while (container.firstChild) container.removeChild(container.firstChild);
    

    const scriptElement = document.createElement('script');   
    scriptElement.src = script.url;
    container.appendChild(scriptElement);

    
    // Child React App Element
    const customElement = document.createElement(script.customElementName);
    customElement.setAttribute('text', this.textToSend);
    // customElement.setAttribute('onHelloEvt', 'onHelloEvt');
    customElement.addEventListener('onHelloEvt', (e) => this.helloEvent(script.customElementName));
    // customElement.addEventListener('helloEvt', (e) => this.helloEvent(script.customElementName));
    script.customElement = customElement;
    
    container.appendChild(customElement);
  }
  
  tellComponents() {

    for (let script in this.scripts) {
      console.log(script);
      if (this.scripts[script].customElement) {
        this.scripts[script].customElement.setAttribute('text', this.textToSend);
      }
    }

    // const text = document.getElementById('yourText').nodeValue;

    // // Child React App Element
    // const reactEl = document.createElement('react-el');
    // reactEl.setAttribute('text', text);
    // reactEl.setAttribute('onHelloEvt', 'onHelloEvt');
    // reactEl.addEventListener('onHelloEvt', (e) => this.helloEvent('React'));
    // const reactElContainer =  document.getElementById('react-container')
    // if (reactElContainer.children.length > 0) {
    //   reactElContainer.removeChild(reactElContainer.children[0]);
    // }
    // reactElContainer.appendChild(reactEl);

    // //Child Angular child element
    // const ngEl = document.createElement('ng-el');
    // ngEl.setAttribute('text', text);
    // ngEl.addEventListener('helloEvt', (e) => this.helloEvent('Angular'));
    // const ngElContainer =  document.getElementById('ng-container')
    // if (ngElContainer.children.length > 0) {
    //   ngElContainer.removeChild(ngElContainer.children[0]);
    // }
    // ngElContainer.appendChild(ngEl);
    // this.logMessage('You', `Text -> ${text}`)

    // //Child Angular2 child element
    // const ngEl2 = document.createElement('ng-el2');
    // ngEl2.setAttribute('text', text);
    // ngEl2.addEventListener('helloEvt', (e) => this.helloEvent('Angular2'));
    // const ng2ElContainer =  document.getElementById('ng2-container')
    // if (ng2ElContainer.children.length > 0) {
    //   ng2ElContainer.removeChild(ng2ElContainer.children[0]);
    // }
    // ng2ElContainer.appendChild(ngEl2);
    this.logMessage('You', `Text -> ${this.textToSend}`)
  }

   helloEvent(who) {
    this.logMessage(who, 'message');
  }
   logMessage(source, msg) {
    const msgContainer = document.getElementById('messages');
    msgContainer.innerHTML += `<p><strong>${source}</strong> sent ${msg}`;
  }
}
