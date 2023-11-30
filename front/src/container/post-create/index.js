import "./index.css";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";

export default function Container({ onCreate, placeholder, button, id}) {
    const handleSubmit = (value) => {
        alert(value);
    }

    return(
        <Grid>
            <FieldForm
                placeholder={placeholder}
                button={button}
                onSubmit={handleSubmit} 
            />
        </Grid>
    )
} 