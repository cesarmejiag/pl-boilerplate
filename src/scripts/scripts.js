/**
 * Make your magic here!
 */
import Person from './Person';
import './contact';

(() => {
    'use strict'

    // Register service worker.
    if ("serviceWorker" in navigator) {
        const swPath = 'sw.js';

        navigator.serviceWorker.register(swPath)
            .then(res => { console.log('Service worker registered.') })
            .catch(res => { console.log('Can not find service worker.') })
    }


    const sum = (a, b) => a + b;
    console.log(sum(1, 2));

    const cesar = new Person('César', 'Mejía');
    console.log(cesar.greetings());

})()