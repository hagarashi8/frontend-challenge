import { ofetch } from "ofetch";
import { computed, ref } from "vue";

const base = "https://api.thecatapi.com/v1";
const limit = 100;
const order = "desc";

export type CatRecord = {
  id: string;
  url: string;
};

export const useCats = () => {
  const cats = ref<CatRecord[]>([]);

  const url = `${base}/images/search`;
  const headers = {
    "x-api-key": import.meta.env.VITE_CAT_KEY,
  };
  let page = 0;

  const loadCats = async () => {
    const query = {
      limit,
      order,
      page,
    };
    const data = await ofetch<CatRecord[]>(url, {
      query,
      headers,
    });
    cats.value = cats.value.concat(data);
    page += 1;
  };

  const getCat = async (id: string, signal: AbortSignal) => {
    return await ofetch<CatRecord>(`${base}/images/${id}`, { signal });
  };

  return { cats, loadCats, getCat };
};

export const useFavorites = () => {
  const store = JSON.parse(localStorage.getItem("favorites") ?? "[]");
  console.log(store);

  const favs = ref<Set<string>>(new Set(store));

  const isFav = (id: string) =>
    computed(() => {
      return favs.value.has(id);
    });

  const toggleFav = (cat: string) => {
    if (favs.value.has(cat)) {
      favs.value.delete(cat);
    } else {
      favs.value.add(cat);
    }

    localStorage.setItem("favorites", JSON.stringify([...favs.value.values()]));
    favs.value = favs.value;
  };

  return { favs, isFav, toggleFav };
};
