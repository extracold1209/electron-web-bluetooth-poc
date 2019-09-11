// this file is run on browser
const log = console.log;

async function onButtonClick() {
    let filters = [];
  
    let filterService = document.querySelector('#service').value;
    if (filterService.startsWith('0x')) {
      filterService = parseInt(filterService);
    }
    if (filterService) {
      filters.push({services: [filterService]});
    }
  
    let filterName = document.querySelector('#name').value;
    if (filterName) {
      filters.push({name: filterName});
    }
  
    let filterNamePrefix = document.querySelector('#namePrefix').value;
    if (filterNamePrefix) {
      filters.push({namePrefix: filterNamePrefix});
    }
  
    let options = {};
    if (document.querySelector('#allDevices').checked) {
      options.acceptAllDevices = true;
    } else {
      options.filters = filters;
    }
  
    try {
      log('Requesting Bluetooth Device...');
      log('with ' + JSON.stringify(options));
      const device = await navigator.bluetooth.requestDevice(options);
  
      log('> Name:             ' + device.name);
      log('> Id:               ' + device.id);
      log('> Connected:        ' + device.gatt.connected);
    } catch(error)  {
      log('Argh! ' + error);
    }
  }

  function isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
      return true;
    } else {
      log('Web Bluetooth API is not available.\n' +
          'Please make sure the "Experimental Web Platform features" flag is enabled.');
      return false;
    }
  }

document.querySelector('form').addEventListener('submit', function(event) {
    event.stopPropagation();
    event.preventDefault();
    if (isWebBluetoothEnabled()) {
      onButtonClick();
    }
  });