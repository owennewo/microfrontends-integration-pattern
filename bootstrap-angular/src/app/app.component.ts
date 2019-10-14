import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bootstrap-angular';

  textToSend = 'Lorem Ipsum';

  host = '192.168.1.27';
  // host = 'localhost';

  scripts = {
    'ng-component-1': {
      'url': `http://${this.host}:5001/main.js`,
      'customElementName': 'ng-el',
      'containerElementId': 'ng-container1'
    },
    
    'react-component': {
      'url': `http://${this.host}:5002/main.js`,
      'customElementName': 'react-el',
      'containerElementId': 'react-container'
    },
    'ng-component-2': {
      'url': `http://${this.host}:5003/main.js`,
      'customElementName': 'ng-el2',
      'containerElementId': 'ng-container2'
    },
    'custom-html-element': {
      'url': `http://${this.host}:5004/main.js`,
      'customElementName': 'custom-html-element',
      'containerElementId': 'custom-html-container'
    }
  };

  loadScript(script: any) {
    console.log("load script:" + script.url)
    
    // grab the container
    const container =  document.getElementById(script.containerElementId)
    
    // clear out all children
    while (container.firstChild) container.removeChild(container.firstChild);
    

    // add custom element script
    const scriptElement = document.createElement('script');   
    scriptElement.src = script.url;
    container.appendChild(scriptElement);

    
    // add custome element tag
    const customElement = document.createElement(script.customElementName);
    customElement.setAttribute('text', this.textToSend);
    
    customElement.addEventListener('onHelloEvt', (e) => this.helloEvent(script.customElementName));
    script.customElement = customElement;
    
    container.appendChild(customElement);
  }
  
  tellComponents() {
    let count = 0;
    for (let script in this.scripts) {
      console.log(script);
      
      if (this.scripts[script].customElement) {
        this.scripts[script].customElement.setAttribute('text', this.textToSend);
        count++;
      }
    }

    this.logMessage('You', `Text -> ${this.textToSend} to ${count} components`)
  }

   helloEvent(who) {
    this.logMessage(who, 'message');
  }
   logMessage(source, msg) {
    const msgContainer = document.getElementById('messages');
    msgContainer.innerHTML += `<p><strong>${source}</strong> sent ${msg}`;
  }
}
