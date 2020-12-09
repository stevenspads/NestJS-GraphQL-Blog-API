import { CategoryInput } from "./../../category/models/category.input";
import { PostInput } from "./../../post/models/post.input";

export class QueryHelper {
  public static getAsString(input: CategoryInput | PostInput) {
    // match quotes for keys before a colon (ex: "id":) and replace them with just the key and the colon (ex: id:)
    return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
  }
}
