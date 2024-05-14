// Migrating to Pinia
import { defineStore } from "pinia";
import { Post, TimelinePost } from "../posts";
import { Period } from "../constants";
import { DateTime } from "luxon";

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1500));
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },

    async fetchPosts() {
      const res = await window.fetch("http://localhost:8000/posts");
      const data = (await res.json()) as Post[];
      await delay();

      let ids: string[] = [];
      let all = new Map<string, Post>()
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },

    createPost(post: TimelinePost) {
      console.log(post)
    }
  },

  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw new Error(`Post with id ${id} not found`);
          }

          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ days: 1 });
          }

          if (state.selectedPeriod === "This week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }

          return post;
        });
    },
  },
});

// create a store using VUE JS composition API with reactive and readonly
// import { reactive, readonly } from 'vue'

// ref number, string
// computed
// reactive {}, Map, Set, Array

// interface PostsState {
//   foo: string
// }

// export class PostsStore {
//   #state: PostsState

//   constructor() {
//     this.#state = reactive<PostsState>({
//       foo: 'foo'
//     })
//   }

//   getState() {
//     return readonly(this.#state)
//   }

//   updateFoo(foo: string) {
//     this.#state.foo = foo
//   }
// }

// const store = new PostsStore()

// // inject/provide
// export function usePosts () {
//   return store
// }
