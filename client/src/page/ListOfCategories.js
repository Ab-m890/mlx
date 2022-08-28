import React from 'react'

import allCategories from '../api/categories/categories'

const ListOfCategories = () => {

    const categories = allCategories

    return(
        <h1>All categories</h1>
    )
}

export default ListOfCategories