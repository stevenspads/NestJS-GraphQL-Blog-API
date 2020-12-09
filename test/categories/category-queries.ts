import { CategoryInput } from "../../src/category/models/category.input";
import { QueryHelper } from "../../src/shared/helpers/query-helper";

// Get One Category 

export const categoryQuery = (id: number) => (
  `{category(id: ${id}) {
    id
    name
  }}`
);

// Get All Categories

export const categoriesQuery = `{categories {
  id
  name
}}`;

// Create Category

export const createCategory: CategoryInput = {
  id: 999999,
  name: 'Category',
};

const createCategoryObject: string = QueryHelper.getAsString(createCategory);

export const createCategoryQuery = `
  mutation {
    createCategory(input: ${createCategoryObject}) {
      id
      name
    }
  }`;

// Update Category

export const updateCategory: CategoryInput = {
  id: 999999,
  name: 'Category Updated',
};

const updateCategoryObject: string = QueryHelper.getAsString(updateCategory);

export const updateCategoryQuery = (id: number) => (`
  mutation {
    updateCategory(id: ${id}, input: ${updateCategoryObject}) {
      id
      name
    }      
  }`
);

// Delete Category

export const deleteCategoryQuery = (id: number) => (
  `mutation {
    deleteCategory(id: ${id}) {
      id
      name
    }
  }`
);
