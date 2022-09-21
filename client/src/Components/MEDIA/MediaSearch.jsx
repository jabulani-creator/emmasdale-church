import Wrapper from "../../assets/wrappers/SearchContainer";
import { useAppContext } from "../../context/appContext";
import { FormRow, FormRowSelect } from "../index";
import { FaSearch } from "react-icons/fa";

const MediaSearch = () => {
  const {
    search,
    department,
    handleChange,
    imageSortOptions,
    clearFilters,
    isLoading,
  } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <div className="form-row">
            <input
              type="text"
              placeholder="Search"
              name="search"
              value={search}
              onChange={handleSearch}
              className="form-inputS"
            />
            <button type="submit" className="submit-btnS">
              <FaSearch />
            </button>
          </div>

          <FormRowSelect
            name="department"
            value={department}
            handleChange={handleSearch}
            list={imageSortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default MediaSearch;
