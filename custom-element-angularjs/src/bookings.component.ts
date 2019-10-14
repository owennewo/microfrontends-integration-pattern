import { ServiceBus } from './service-bus';

export const bookingsComponent: angular.IComponentOptions = {
    controller: ['serviceBus', '$scope', '$location', function(serviceBus: ServiceBus, $scope: angular.IScope, $location: angular.ILocationService) {
        const that = this;

        this.select = function(b) {
            console.log("selected");
            const data = {
                domainEvent: 'booking-selected',
                booking: b
            }
            serviceBus.send({ type: 'message', data });
        }

        // $scope.clickMe = function (clicked) {
        //     alert(" My Click function is called.");
        // $scope.IsDisplay = clicked == true ? false : true;
        // };

        serviceBus.registerFor('appState', msg => {
            console.debug('got appState in AngularJS component', msg.data);
            that.title = msg.data.passenger.name + "'s Bookings";
            $scope.$digest();
        });

        $scope.$on('$locationChangeSuccess', () => {
            this.show = location.hash === '#/booking-list';
        });
        
        
    }],
    template: `
    <div >
        This is some text
        <button ng-click="$ctrl.select('foo')">send</button>
        
    </div>        
    `
};