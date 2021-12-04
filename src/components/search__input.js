import "./search__input.css";

const Search = ({ setSearchQuery, setFormSubmit }) => {
  const submitEvent = (event) => {
    event.preventDefault();
    if (event.target.elements["q"].value.trim().length > 0) {
      setSearchQuery(event.target.elements["q"].value);
      setFormSubmit(true);
    }
  };

  return (
    <form action="#" onSubmit={(event) => submitEvent(event)}>
      <div className="inp">
        <input type="text" name="q" placeholder="search by name" autoComplete="off" />
      </div>
    </form>
  );
};

export default Search;
