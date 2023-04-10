import React, {useState} from "react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const Settings = () => {
  const [settings, setSettings] = useState({
    themeMode: "dark",
    messageDissapears: "15",
    language: "english",
    notifications: true,
  });
  const [themeMode, setThemeMode] = useState("dark");
  const [notifi, setNotifi] = useState(true);

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            "&$checked": {
              color: "#2196f3", // change color when checked
            },
            "&$checked + $track": {
              backgroundColor: "#2196f3", // change track color when checked
            },
          },
          track: {
            backgroundColor: "#ccc", // change track color when not checked
          },
          checked: {},
        },
      },
    },
  });
  function settingsData(e) {
    setSettings({...settings, [e.target.name]: e.target.value});
  }

  function submitForm(e) {
    e.preventDefault();
    console.log("submited");
    // save settings to database {settings}
  }
  return (
    <ThemeProvider theme={theme}>
      <form className="settings" onSubmit={submitForm}>
        <h2 className="panel-header">Settings</h2>
        <div className="theme-mode">
          <h3>Theme mode</h3>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={themeMode === "dark" ? true : false}
                  onClick={() => {
                    if (themeMode === "dark") {
                      setThemeMode("light");
                      setSettings({...settings, themeMode: "light"});
                    } else {
                      setThemeMode("dark");
                      setSettings({...settings, themeMode: "dark"});
                    }
                  }}
                />
              }
              label={`${themeMode} mode`}
            />
          </FormGroup>
        </div>
        <div className="messageDissapears">
          <h3>Message dissapears in</h3>
          <div className="options">
            <label
              className={
                settings.messageDissapears === "10" ? "labelchecked" : ""
              }
            >
              <input
                type="radio"
                name="messageDissapears"
                id="messageDissapears"
                value={10}
                onChange={settingsData}
                checked={settings.messageDissapears === "10" ? true : false}
              />
              10 seconds
            </label>
            <label
              className={
                settings.messageDissapears === "15" ? "labelchecked" : ""
              }
            >
              <input
                type="radio"
                name="messageDissapears"
                id="messageDissapears"
                value={15}
                onChange={settingsData}
                checked={settings.messageDissapears === "15" ? true : false}
              />
              15 seconds
            </label>
            <label
              className={
                settings.messageDissapears === "30" ? "labelchecked" : ""
              }
            >
              <input
                type="radio"
                name="messageDissapears"
                id="messageDissapears"
                value={30}
                onChange={settingsData}
                checked={settings.messageDissapears === "30" ? true : false}
              />
              30 seconds
            </label>
          </div>
        </div>
        <div className="language">
          <h3>Language</h3>
          <select
            name="language"
            id="language"
            onChange={settingsData}
            value={settings.language === "english" ? "english" : "bosnian"}
          >
            <option value="english">English</option>
            {/* <option value="bosnian">Bosnian</option> */}
          </select>
        </div>
        <div className="notifications">
          <h3>Notifications</h3>

          <label>
            <span>off</span>
            <Switch
              checked={notifi}
              onClick={() => {
                if (notifi) {
                  setNotifi(false);
                  setSettings({...settings, notifications: false});
                } else {
                  setNotifi(true);
                  setSettings({...settings, notifications: true});
                }
              }}
            />
            <span>on</span>
          </label>
        </div>
        <button>Save changes</button>
      </form>
    </ThemeProvider>
  );
};

export default Settings;
