const state = {
    selectedQuery: "omelet",
    recipesByQuery: {
        omelet: {
            isFetching: true,
            didInvalidate: false,
            items: []
        },
        reactjs: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [
                {
                    id: 42,
                    title: "All Purpose Ground Meat Mix",
                    href: "http://www.recipezaar.com/All-Purpose-Ground-Meat-Mix-31008",
                    ingredients: "celery, garlic, green pepper, ground beef, onions, black pepper, salt",
                    thumbnail: "http://img.recipepuppy.com/45141.jpg"
                },
                {
                    id: 500,
                    title: "Moms Meat Loaf Recipe",
                    href: "http://www.grouprecipes.com/76908/moms-meat-loaf.html",
                    ingredients: "green beans, barley, eggs, ground beef, seasoning, bread crumbs",
                    thumbnail: "http://img.recipepuppy.com/334313.jpg"
                }
            ]
        }
    }
};
