# Queries

## Categories 

### Select One Category

```
{category(id: 1) {
  id,
  name,
}}
```

### Select All Categories

```
{categories
{
  id,
  name,
}}
```

### Create Category

```
mutation{
  createCategory(input: { id: 1, name: "Category" }) {
    id,
    name,
  }
}
```

### Update Category
 
```
mutation{
  updateCategory(id: 1, input: { name: "Updated Category" }) {
    id,
    name,
  }
}
```

### Delete Category

```
mutation{
  deleteCategory(id: 2) {
    id,
    name,
  }
}
```

## Posts 

### Select One Post

```
{post(id: 1) {
  id,
  date,
  title,
  body,
  category {
    id, 
    name
  }
}}
```

### Select All Posts

```
{posts
{
  id,
  date,
  title,
  category {
    id,
    name
  }
}}
```

### Select All Paginated Posts

```
{posts(offset:0, limit: 10, orderBy: "title", sortOrder: ASC) {
  id,
  date,
  title,
  body,
  category {
    id,
    name
  }
}}
```

### Create Post

```
mutation{
  createPost(input: { id: 1, date: "2020-10-10", title: "Title Test", body: "Body Test", category: { id: 1, name: "Category 1" } }) {
    id,
    date,
    title,
    category {
      id, 
      name
    },
    body,
  }
}
```

### Update Post

```
mutation{
  updatePost(id: 1, input: { title: "Update", category: { id: 2, name: "Category 2" }}) {
    id,
    date,
    title,
    category {
      id, 
      name
    },
    body,
  }
}
```

### Delete Post

```
mutation{
  deletePost(id: 2) {
    id,
    date,
    title,
    category {
      id, 
      name
    },
    body,
  }
}
```
