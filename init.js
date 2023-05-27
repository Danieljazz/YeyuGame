const init = () => {
  console.log("Hi");
  const world = new World({ el: document.querySelector("canvas") });
  world.init();
};

init();
