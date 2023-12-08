//@@viewOn:imports
import { createVisualComponent, Utils, Content, AppBackgroundProvider, useAppBackground } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
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

const DarkModeToggle = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DarkModeToggle",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const [background, setBackground] = useAppBackground();
    const darkMode = background === "dark";

    return (
      <Uu5Elements.Toggle
        value={!darkMode}
        onChange={() =>
          setBackground({
            backgroundColor: darkMode ? null : Uu5Elements.UuGds.ColorPalette.getValue(["building", "dark", "main"]),
          })
        }
        iconOff="uugdsstencil-weather-moon"
        iconOn="uugdsstencil-weather-sun"
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DarkModeToggle };
export default DarkModeToggle;
//@@viewOff:exports
