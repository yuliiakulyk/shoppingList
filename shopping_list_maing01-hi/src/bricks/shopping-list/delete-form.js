//@@viewOn:imports
import { createVisualComponent, Utils, Content, useLsi } from "uu5g05";
import Config from "./config/config.js";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const DeleteForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteForm",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const lsi = useLsi(importLsi, [DeleteForm.uu5Tag]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DeleteForm);

    return currentNestingLevel ? (
      <Form
        {...elementProps}
        onSubmit={props.onSubmit}>
        <Uu5Elements.Text>{lsi.doYouReallyWantToDelete}</Uu5Elements.Text>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
          <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
          <SubmitButton colorScheme={"red"}>{lsi.submit}</SubmitButton>
        </div>
      </Form>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DeleteForm };
export default DeleteForm;
//@@viewOff:exports
