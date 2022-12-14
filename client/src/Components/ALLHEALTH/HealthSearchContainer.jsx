import {FormRow, FormRowSelect} from '../index'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/SearchContainer'

export const HealthSearchContainer = () => {
  const {
    isLoading,
    search,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
  } = useAppContext()

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    clearFilters()
  }
  return (
    <Wrapper>
       <form className="form">
        <h4>search form</h4>
        <div className="form-center">
        <FormRow
          type='text'
          name='search'
          value={search}
          handleChange={handleSearch}
          />
          <FormRowSelect 
          name='sort'
          value={sort}
          handleChange={handleSearch}
          list={sortOptions}
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
  )
}
