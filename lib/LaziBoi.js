import LaziBoiItem from "./LaziBoiItem.js";

export default (() => {

  const instances = [];

  function add(element, options) {
    const item = new LaziBoiItem(element, options);
    instances.push(item);
    return item;
  }

  function remove(instance) {
    instances.splice(instances.indexOf(instance), 1);
  }

  function getAll() {
    return instances;
  }

  function disableAll() {
    instances.forEach((instance) => instance.disable());
  }

  function enableAll() {
    instances.forEach((instance) => instance.enable());
  }

  function destroyAll() {
    while (instances.length) {
      instances[0].destroy();
    }
  }

  function tick() {
    window.requestAnimationFrame(() => {
      instances.forEach((instance) => instance.tick());
      tick();
    });
  }

  tick();

  return {
    add,
    remove,
    getAll,
    disableAll,
    enableAll,
    destroyAll,
  };
})();
