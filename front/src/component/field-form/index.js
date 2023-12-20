import { useState, memo, useContext } from "react";

import "./index.css";
import { THEME_TYPE, ThemeContext } from "../../App";

 function Component({ placeholder, button, onSubmit }) {
    const [value, setValue] = useState("");

    const handleChange = (e) => setValue(e.target.value);

    const handleSubmit = () => {
        if (value.length === 0) return null;

        if (onSubmit) {
            onSubmit(value);
         } else {
            throw new Error("onSubmit props is undefined")
         }

        setValue("");
    };

    const isDisabled = value.length === 0;

    const theme = useContext(ThemeContext)

    return(
        <div className="field-form">
            <textarea
                onChange={handleChange}
                value={value}
                rows={2}
                placeholder={placeholder}
                className="field-form__field"
                style={{
                    color: theme.value === THEME_TYPE.DARK && "white", caretColor: theme.value === THEME_TYPE.LIGHT && "#0050ff"
                }}
            ></textarea>
            <button
                disabled={isDisabled}
                onClick={handleSubmit}
                className="field-form__button"
            >
                {button}
            </button>
            <button onClick={theme.toggle} className={`field-form__button`}>
                Change theme
            </button>
        </div>
    )
}

export default memo(Component);