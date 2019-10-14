# Micro frontends

This is a forked version of https://github.com/dpizzuto/microfrontends-integration-pattern

This repo contains 3 'bootstrap' projects and 5 'custom elemenent' projects.  Typically you'll start one bootstrap project on one port and the 5x custom element projects on separate ports.  Why all these ports?  Each bootstrap and custom elements process can be developed by different teams and be deployed separately.  They'll be deployed as separate kubernetes pods with isolated CI/CD process.

My modifications aim to 
 - [done] show a bootstrap project that is angular based, the original was 'raw html'
 - [done] check whether custom elements works in IE11 (i.e. ensure polyfill works correct)
   - bootstrap-angular app in needs to be started with ng serve --configuration=es5 (because of ng8 differential loading)
 - [done] add html client
 - [done] see whether different angular versions can be used in the same bootstrap
 - [done] see whether there are any problems with this approach with ivy (angular 9)
 - [todo] implement an angularjs custom element
 - [todo] fixup the Dockerfiles / docker compose
 - [todo] writes some kubernetes yaml to deploy the 3 bootstrap
 
Both this project and the original make use of https://github.com/manfredsteyer/ngx-build-plus as a builder for the angular2+ custom element projects.
 
The bootstrap projects will load the 5x custom element javascript bundles lazily and insert a custom element tag e.g. 
`<custom-element-angular9 text='This is an attribute'></customer-element-angular>` 
