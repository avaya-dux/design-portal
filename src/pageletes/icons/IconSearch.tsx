import { TextInput } from "@avaya/neo-react";
import { searchFor } from "./helpers/iconPageState";

export const IconSearch = () => {

  return (
    <div className="icon__actions__search">
      <TextInput
        aria-label="Search icons"
        label="it's a component!"
        startIcon="search"
        clearable={true}
        onChange={(e) => {
          e.preventDefault();
          searchFor.set(e.target.value);
        }}
      />
    </div>
  );
}
