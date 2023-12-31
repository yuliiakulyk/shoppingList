import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// NOTE During frontend development it's possible to redirect uuApp command calls elsewhere, e.g. to production/staging
// backend, by configuring it in *-hi/env/development.json:
//   "uu5Environment": {
//     "callsBaseUri": "https://uuapp-dev.plus4u.net/vnd-app/awid"
//   }

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  ShoppingList: {
    list(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/list");
      return Calls.call("get", commandUri, dtoIn);
    },
    load(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/load");
      return Calls.call("get", commandUri, dtoIn);
    },
    update(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/update");
      return Calls.call("post", commandUri, dtoIn);
    },
    create(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/create");
      return Calls.call("post", commandUri, dtoIn);
    },
    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/delete");
      console.log('called delete with dtoIn', dtoIn);
      return Calls.call("post", commandUri, dtoIn);
    },
    addItem(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/addItem");
      return Calls.call("post", commandUri, dtoIn);
    },
    removeItem(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/removeItem");
      return Calls.call("post", commandUri, dtoIn);
    },
    markItemSolved(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/markItemSolved");
      return Calls.call("post", commandUri, dtoIn);
    },
    archive(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/archive");
      return Calls.call("post", commandUri, dtoIn);
    },
    setOwner(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/setOwner");
      return Calls.call("post", commandUri, dtoIn);
    },
    leave(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/leave");
      return Calls.call("post", commandUri, dtoIn);
    },
    addMember(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/addMember");
      return Calls.call("post", commandUri, dtoIn);
    },
    removeMember(dtoIn) {
      const commandUri = Calls.getCommandUri("shoppingList/removeMember");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  getCommandUri(useCase, baseUri = Environment.appBaseUri) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
