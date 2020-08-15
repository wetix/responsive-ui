import Notification from "./Notification.svelte";

const message = {
  open(config = {}) {
    const component = new Notification({
      target: document.body,
    });
    return {
      close() {
        component.destroy();
      },
    };
  },
};

export { message };
