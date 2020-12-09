import { PostInput } from "../../src/post/models/post.input";
import { QueryHelper } from "../../src/shared/helpers/query-helper";

// Get One Post 

export const postQuery = (id: number) => (
  `{post(id: ${id}) {
    id
    date
    title    
    body
    category {
      id
      name
    }
  }}`
);

// Get All Categories

export const postsQuery = `{posts {
  id
  date
  title    
  body
  category {
    id
    name
  }
}}`;

// Create Category

export const createPost: PostInput = {
  id: 999999,
  date: new Date('2020-10-10'),
  title: 'Post',
  body: 'Test',
  category: {
    id: 1,
    name: 'Category',
  }
};

const createPostObject: string = QueryHelper.getAsString(createPost);

export const createPostQuery = `
  mutation {
    createPost(input: ${createPostObject}) {
      id
      date
      title    
      body
      category {
        id
        name
      }
    }
  }`;

// Update Category

export const updatePost: PostInput = {
  id: 999999,
  date: new Date('2020-10-10'),
  title: 'Post Updated',
  body: 'Test Updated',
  category: {
    id: 2,
    name: 'Category 2',
  }
};

const updatePostObject: string = QueryHelper.getAsString(updatePost);

export const updatePostQuery = (id: number) => (`
  mutation {
    updatePost(id: ${id}, input: ${updatePostObject}) {
      id
      date
      title    
      body
      category {
        id
        name
      }
    }      
  }`
);

// Delete Post

export const deletePostQuery = (id: number) => (
  `mutation {
    deletePost(id: ${id}) {
      id
      date
      title    
      body
      category {
        id
        name
      }
    }
  }`
);
