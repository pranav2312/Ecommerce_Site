import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

function Filter() {
    const state = useContext(GlobalState)
    const [categories] = state.CategoriesApi.categories
    const [products, setProducts] = state.ProductsApi.products
    const [category, setCategory] = state.ProductsApi.category
    const [sort, setSort] = state.ProductsApi.sort
    const [search, setSearch] = state.ProductsApi.search
    const handleCategory = (e) => {
        setCategory(e.target.value)

        setSearch('');
    }
    return (
        <div className="filter_menu" >
            <div className="row">
                <span>
                    Filters:
                </span>
                <select name="category" value={category} onChange={handleCategory}><option value="">All Services</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>

            </div>
            <input type="text" value={search} placeholder="Enter your Search!" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
            <div className="row">
                <span>
                    Sort By:
                </span>
                <select value={sort} onChange={e=>setSort(e.target.value)}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-sold">Best Provider</option>
                    
                    
                </select>

            </div>
        </div>
    )
}

export default Filter
