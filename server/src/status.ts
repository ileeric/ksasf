class Category {
    constructor(
        public name: string,
        public selected = false
    ) { }

    toggleSelected() {
        this.selected = !this.selected
    }
}

const categoryData = {
    first: [
        new Category("B-1"), new Category("C-1"), new Category("C&M-1"), new Category("E&E-1"), new Category("P-1"),
        new Category("B-2"), new Category("C-2"), new Category("C&M-2"), new Category("E&E-2"), new Category("P-2"),
        new Category("B-3"), new Category("C-3"), new Category("C&M-3"), new Category("E&E-3"), new Category("P-4"),
        new Category("B-4"), new Category("C-4"), new Category("C&M-4"), new Category("E&E-4"), new Category("P-5"),
    ],
    second: [
        new Category("B-5"), new Category("C-5"), new Category("C&M-5"), new Category("E&E-5"), new Category("P-6"),
        new Category("B-6"), new Category("C-6"), new Category("C&M-6"), new Category("E&E-6"), new Category("P-7"),
        new Category("B-7"), new Category("C-7"), new Category("C&M-7"), new Category("E&E-7"), new Category("E&C-1"),
        new Category("B-8"), new Category("C-8"), new Category("C&M-8"), new Category(""), new Category("E&C-2")
    ]
}

type CategoryData = typeof categoryData

export { categoryData, type CategoryData }