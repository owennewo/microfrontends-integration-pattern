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
    'custom-element-angular8': {
      'url': `http://${this.host}:5001/main.js`,
      'customElementName': 'custom-element-angular8',
      'containerElementId': 'container-angular8'
    },
    
    'custom-element-react': {
      'url': `http://${this.host}:5002/main.js`,
      'customElementName': 'custom-element-react',
      'containerElementId': 'container-react'
    },
    'custom-element-angular9': {
      'url': `http://${this.host}:5003/main.js`,
      'customElementName': 'custom-element-angular9',
      'containerElementId': 'container-angular9'
    },
    'custom-element-html': {
      'url': `http://${this.host}:5004/main.js`,
      'customElementName': 'custom-element-html',
      'containerElementId': 'container-html'
    },
    'custom-element-angularjs': {
      'url': `http://${this.host}:5005/main.js`,
      'customElementName': 'custom-element-angularjs',
      'containerElementId': 'container-angularjs'
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
