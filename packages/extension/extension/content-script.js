const script = document.createElement('script');

// type module to avoid altering current page
script.type = 'module';

// browser is for firefox, else fallback to chrome
const target = browser ?? chrome;

script.src = target.runtime.getURL('immutable-object-formatter.js');
script.onload = function () {
  this.remove();
};
(document.head || document.documentElement).appendChild(script);
